"""
HTI Automation & Security Systems - MongoDB Client & Review Storage Handler
Provides connection to local/cloud MongoDB with automated fallback and SQLite synchronization.
"""

import os
import datetime
import logging
from typing import List, Dict, Any, Optional

try:
    import pymongo
    from bson.objectid import ObjectId
    PYMONGO_AVAILABLE = True
except ImportError:
    PYMONGO_AVAILABLE = False
    ObjectId = None

logger = logging.getLogger("hti.mongodb")

# Configuration from environment with robust defaults
MONGO_URI = os.getenv("MONGODB_URI", os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
MONGO_DB_NAME = os.getenv("MONGODB_DB", "hti_website_db")
REVIEWS_COLLECTION = "customer_reviews"

_mongo_client: Optional[Any] = None
_mongo_db: Optional[Any] = None


def get_mongo_db():
    """Returns connected MongoDB database or None if unavailable."""
    global _mongo_client, _mongo_db
    if not PYMONGO_AVAILABLE:
        return None

    if _mongo_db is not None:
        try:
            # Quick ping to verify connection health
            _mongo_client.admin.command('ping')
            return _mongo_db
        except Exception:
            _mongo_client = None
            _mongo_db = None

    try:
        _mongo_client = pymongo.MongoClient(
            MONGO_URI,
            serverSelectionTimeoutMS=2000,
            connectTimeoutMS=2000,
            socketTimeoutMS=3000
        )
        _mongo_client.admin.command('ping')
        _mongo_db = _mongo_client[MONGO_DB_NAME]
        logger.info(f"Connected successfully to MongoDB database: {MONGO_DB_NAME}")
        return _mongo_db
    except Exception as e:
        logger.warning(f"MongoDB connection notice: {e}. Falling back to SQLite sync mode.")
        _mongo_client = None
        _mongo_db = None
        return None


def is_mongodb_online() -> bool:
    """Checks if MongoDB is currently reachable."""
    db = get_mongo_db()
    return db is not None


def serialize_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Converts MongoDB document to JSON-safe dictionary."""
    if not doc:
        return doc
    clean = dict(doc)
    if "_id" in clean:
        clean["id"] = str(clean["_id"])
        del clean["_id"]
    return clean


def init_default_reviews_if_empty(sqlite_reviews: List[Dict[str, Any]]):
    """Populates MongoDB with existing approved reviews if the collection is empty."""
    db = get_mongo_db()
    if db is None:
        return

    try:
        coll = db[REVIEWS_COLLECTION]
        if coll.count_documents({}) == 0 and sqlite_reviews:
            docs = []
            for r in sqlite_reviews:
                doc = {
                    "author": r.get("author", "Verified Client"),
                    "company": r.get("company", ""),
                    "location": r.get("location", ""),
                    "email": r.get("email", ""),
                    "rating": int(r.get("rating", 5)),
                    "quote": r.get("quote", ""),
                    "date": r.get("date", datetime.date.today().strftime("%d %b %Y")),
                    "status": "Approved" if r.get("is_published", True) is not False else "Rejected",
                    "is_published": r.get("is_published", True) is not False,
                    "client_id": str(r.get("client_id", "")) if r.get("client_id") else "",
                    "client_name": r.get("client_name", ""),
                    "created_at": datetime.datetime.utcnow().isoformat(),
                    "updated_at": datetime.datetime.utcnow().isoformat()
                }
                docs.append(doc)
            if docs:
                coll.insert_many(docs)
                logger.info(f"Initialized {len(docs)} existing testimonials into MongoDB collection '{REVIEWS_COLLECTION}'.")
    except Exception as e:
        logger.error(f"Error initializing default reviews in MongoDB: {e}")


def insert_customer_review(review_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Inserts a newly submitted customer review with 'Pending' status.
    Returns the created review dictionary.
    """
    now_iso = datetime.datetime.utcnow().isoformat()
    now_date_str = datetime.date.today().strftime("%d %b %Y")

    doc = {
        "author": review_data.get("author", "").strip(),
        "company": review_data.get("company", "").strip(),
        "location": review_data.get("location", "").strip(),
        "email": review_data.get("email", "").strip().lower(),
        "rating": int(review_data.get("rating", 5)),
        "quote": review_data.get("quote", "").strip(),
        "date": review_data.get("date") or now_date_str,
        "status": "Pending",
        "is_published": False,
        "client_id": review_data.get("client_id", ""),
        "client_name": review_data.get("client_name", ""),
        "created_at": now_iso,
        "updated_at": now_iso
    }

    db = get_mongo_db()
    if db is not None:
        try:
            res = db[REVIEWS_COLLECTION].insert_one(doc)
            doc["id"] = str(res.inserted_id)
            if "_id" in doc:
                del doc["_id"]
            logger.info(f"Inserted review into MongoDB with ID {doc['id']} and status Pending.")
            return doc
        except Exception as e:
            logger.error(f"Failed to insert review into MongoDB: {e}")

    # Fallback ID generation if MongoDB temporarily unavailable
    doc["id"] = f"rev_{int(datetime.datetime.utcnow().timestamp() * 1000)}"
    return doc


def get_all_reviews_from_mongo() -> Optional[List[Dict[str, Any]]]:
    """Fetches all customer reviews from MongoDB sorted newest first."""
    db = get_mongo_db()
    if db is None:
        return None

    try:
        cursor = db[REVIEWS_COLLECTION].find().sort([("created_at", pymongo.DESCENDING)])
        return [serialize_doc(doc) for doc in cursor]
    except Exception as e:
        logger.error(f"Error fetching reviews from MongoDB: {e}")
        return None


def get_approved_reviews_from_mongo() -> Optional[List[Dict[str, Any]]]:
    """Fetches only approved/published reviews from MongoDB."""
    db = get_mongo_db()
    if db is None:
        return None

    try:
        cursor = db[REVIEWS_COLLECTION].find({
            "$or": [
                {"status": "Approved"},
                {"is_published": True, "status": {"$ne": "Rejected"}}
            ]
        }).sort([("created_at", pymongo.DESCENDING)])
        return [serialize_doc(doc) for doc in cursor]
    except Exception as e:
        logger.error(f"Error fetching approved reviews from MongoDB: {e}")
        return None


def update_review_status_in_mongo(review_id_or_author: str, new_status: str) -> bool:
    """
    Updates the review status in MongoDB ('Approved', 'Rejected', or 'Pending').
    Sets is_published = True when Approved, False when Rejected or Pending.
    """
    db = get_mongo_db()
    if db is None:
        return False

    is_pub = (new_status.lower() == "approved")
    update_fields = {
        "status": new_status,
        "is_published": is_pub,
        "updated_at": datetime.datetime.utcnow().isoformat()
    }

    coll = db[REVIEWS_COLLECTION]
    try:
        # Try match by ObjectId
        if ObjectId and ObjectId.is_valid(review_id_or_author):
            res = coll.update_one({"_id": ObjectId(review_id_or_author)}, {"$set": update_fields})
            if res.matched_count > 0:
                return True

        # Try match by string id or author
        res = coll.update_one({"id": review_id_or_author}, {"$set": update_fields})
        if res.matched_count > 0:
            return True

        res = coll.update_one({"author": review_id_or_author}, {"$set": update_fields})
        return res.matched_count > 0
    except Exception as e:
        logger.error(f"Error updating review status in MongoDB: {e}")
        return False
