
import React from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Compass,
  Factory,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";


const pillars = [
  {
    number: "01",
    title: "Automation",
    description:
      "Smarter movement and seamless operations through automated doors, gates, barriers, and industrial access solutions.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=85",
    tags: ["Automatic Doors", "Industrial Access"],
  },
  {
    number: "02",
    title: "Security Systems",
    description:
      "Integrated security solutions designed to support controlled access, surveillance, fire detection, and life safety.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1100&q=85",
    tags: ["Access Control", "Fire & Surveillance"],
  },
  {
    number: "03",
    title: "Hygiene",
    description:
      "Practical hygiene and contamination-control products for cleanrooms, workplaces, and high-traffic facilities.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1100&q=85",
    tags: ["Cleanroom Solutions", "Automatic Dispensers"],
  },
];

const strengths = [
  {
    icon: Award,
    title: "Since 2014",
    description:
      "Serving clients with automation and security solutions since 2014.",
  },
  {
    icon: Wrench,
    title: "Turnkey Execution",
    description:
      "Support spanning site surveys, installation, integration, and commissioning.",
  },
  {
    icon: HeartHandshake,
    title: "Service First",
    description:
      "A customer-focused approach backed by experienced engineering personnel.",
  },
  {
    icon: Factory,
    title: "Corporate Focus",
    description:
      "Solutions for industrial, pharmaceutical, commercial, and other business environments.",
  },
];

const values = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuously exploring modern technologies and practical automation solutions.",
  },
  {
    number: "02",
    icon: Target,
    title: "Perfection",
    description:
      "Paying attention to precision, dependable execution, and the details that matter.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Commitment to Quality",
    description:
      "Prioritising reliable equipment, responsible installation, and customer satisfaction.",
  },
];

export default function AboutUs() {
  return (
    <main className="hti-about">
      {/* HERO */}
      <section className="hti-hero">
        <div className="hti-hero-grid" />
        <div className="hti-hero-content">
          <div className="hti-eyebrow hti-eyebrow-light">
            <span className="hti-eyebrow-dot" />
            ENGINEERING EXCELLENCE SINCE 2014
          </div>

          <h1>
            We engineer
            <br />
            <span>confidence.</span>
          </h1>

          <p className="hti-hero-copy">
            Intelligent automation. Integrated security. Smarter hygiene.
            One engineering partner for the systems that keep your
            facilities moving.
          </p>

          <div className="hti-hero-actions">
            <a href="#hti-pillars" className="hti-button hti-button-red">
              Explore Our Solutions <ArrowRight size={18} />
            </a>
            <a href="#hti-story" className="hti-text-link">
              Discover Our Story <ArrowDownRight size={18} />
            </a>
          </div>

          <div className="hti-hero-bottom">
            <span>MUMBAI, INDIA</span>
            <span className="hti-hero-line" />
            <span>ENGINEERING · AUTOMATION · SECURITY</span>
          </div>
        </div>

        <div className="hti-hero-image">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=90"
            alt="Modern commercial architecture"
          />
          <div className="hti-image-shade" />
          <div className="hti-floating-note">
            <span className="hti-note-icon">
              <Compass size={21} />
            </span>
            <div>
              <strong>Built around your needs.</strong>
              <span>Designed for real-world operations.</span>
            </div>
          </div>
          <span className="hti-image-index">01 / 03</span>
        </div>

        <div className="hti-hero-vertical">HTI AUTOMATION & SECURITY SYSTEMS</div>
      </section>

      {/* INTRODUCTION */}
      <section className="hti-story hti-container" id="hti-story">
        <div className="hti-story-heading">
          <span className="hti-kicker">WHO WE ARE</span>
          <h2>
            Behind every reliable system
            <br />
            is a <span>team that cares.</span>
          </h2>
        </div>

        <div className="hti-story-content">
          <p className="hti-story-lead">
            HTI Automation & Security Systems Pvt. Ltd. is an automation
            and security solutions provider serving clients since 2014.
          </p>
          <p>
            We bring together automation, hygiene, and security systems
            to help businesses create more efficient, controlled, and
            dependable environments. Our approach combines quality
            products, experienced engineering, and a strong focus on
            customer service.
          </p>
          <p>
            From understanding site requirements to installation and
            commissioning, we aim to make the entire process practical,
            coordinated, and reliable.
          </p>
          <a href="#hti-strengths" className="hti-inline-link">
            What sets us apart <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      {/* COMPANY HIGHLIGHT */}
      <section className="hti-highlight">
        <div className="hti-highlight-inner hti-container">
          <div>
            <span className="hti-kicker hti-kicker-light">
              OUR FOUNDATION
            </span>
            <h2>
              Experience that works.
              <br />
              Service that lasts.
            </h2>
          </div>
          <div className="hti-highlight-right">
            <p>
              We believe that dependable engineering is not just about
              supplying equipment. It is about understanding requirements,
              executing carefully, and supporting customers beyond installation.
            </p>
            <div className="hti-highlight-year">
              <span>2014</span>
              <span>Our journey began</span>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS PILLARS */}
      <section className="hti-pillars hti-container" id="hti-pillars">
        <div className="hti-section-heading">
          <div>
            <span className="hti-kicker">WHAT WE DO</span>
            <h2>
              Three disciplines.
              <br />
              <span>One integrated approach.</span>
            </h2>
          </div>
          <p>
            Explore the three core areas through which we support
            commercial and industrial environments.
          </p>
        </div>

        <div className="hti-pillar-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article className="hti-pillar-card" key={pillar.number}>
                <div className="hti-pillar-image">
                  <img src={pillar.image} alt={pillar.title} loading="lazy" />
                  <span className="hti-pillar-number">{pillar.number}</span>
                  <span className="hti-pillar-icon">
                    <Icon size={23} />
                  </span>
                </div>

                <div className="hti-pillar-body">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>

                  <div className="hti-pillar-tags">
                    {pillar.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <a
                    href="/services"
                    className="hti-pillar-link"
                    aria-label={`Explore ${pillar.title} solutions`}
                  >
                    Explore solutions <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* WHY HTI */}
      <section className="hti-strengths" id="hti-strengths">
        <div className="hti-container">
          <div className="hti-section-heading hti-strengths-heading">
            <div>
              <span className="hti-kicker">THE HTI DIFFERENCE</span>
              <h2>
                Built on experience.
                <br />
                <span>Driven by responsibility.</span>
              </h2>
            </div>
            <p>
              Our work is guided by practical engineering, dependable
              products, and a commitment to serving our customers.
            </p>
          </div>

          <div className="hti-strength-grid">
            {strengths.map((item) => {
              const Icon = item.icon;

              return (
                <article className="hti-strength-item" key={item.title}>
                  <div className="hti-strength-icon">
                    <Icon size={23} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <CheckCircle2
                    className="hti-strength-check"
                    size={17}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="hti-values hti-container">
        <div className="hti-values-intro">
          <span className="hti-kicker">WHAT GUIDES US</span>
          <h2>
            Our values are
            <br />
            <span>in every detail.</span>
          </h2>
          <p>
            The principles behind how we approach our work, our
            relationships, and the solutions we deliver.
          </p>
        </div>

        <div className="hti-values-list">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article className="hti-value-row" key={value.number}>
                <span className="hti-value-number">{value.number}</span>
                <div className="hti-value-icon">
                  <Icon size={22} />
                </div>
                <div className="hti-value-copy">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
                <ArrowUpRight className="hti-value-arrow" size={21} />
              </article>
            );
          })}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="hti-contact">
        <div className="hti-contact-orb" />
        <div className="hti-contact-inner hti-container">
          <div className="hti-contact-copy">
            <span className="hti-kicker hti-kicker-light">
              LET'S BUILD SOMETHING RELIABLE
            </span>
            <h2>
              Have a project
              <br />
              in mind?
            </h2>
            <p>
              Tell us about your facility, requirements, or upcoming
              project. Let's explore the right solution together.
            </p>
            <a href="mailto:hti@htisystems.in" className="hti-button hti-button-white">
              Talk to Our Team <ArrowRight size={18} />
            </a>
          </div>

          <div className="hti-contact-card">
            <span className="hti-contact-label">VISIT OUR OFFICE</span>
            <div className="hti-contact-detail">
              <MapPin size={20} />
              <p>
                Unit No - 825, Plot No C-3C, Goodwill Bizhubb,
                <br />
                Next to Ikea, TTC Industrial Area Estate,
                <br />
                Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703
              </p>
            </div>
            <a className="hti-contact-detail" href="tel:+919892756077">
              <Phone size={19} />
              <span>98927 56077</span>
            </a>
            <a className="hti-contact-detail" href="tel:+919594917010">
              <Phone size={19} />
              <span>95949 17010</span>
            </a>
            <a
              className="hti-contact-email"
              href="mailto:hti@htisystems.in"
            >
              hti@htisystems.in <ArrowUpRight size={17} />
            </a>
            <a
              className="hti-contact-email"
              href="https://www.htisystems.in"
              target="_blank"
              rel="noreferrer"
            >
              www.htisystems.in <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
