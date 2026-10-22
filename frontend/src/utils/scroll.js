/**
 * Scroll helpers.
 *
 * Chrome's scroll anchoring nudges the scroll position when the browser
 * decides to keep an anchored element stable. That makes programmatic
 * scrolls (e.g. "Back to top") land a few pixels off - the page would stop
 * at y = 14 instead of y = 0.
 *
 * Disabling anchoring only for the duration of the scroll keeps normal
 * user-initiated scrolling exactly as it was.
 *
 * The nudge is applied *after* the scroll animation ends, which is exactly
 * when the anchoring override used to be released - so the requested position
 * had to be re-asserted once more. The end of the animation is detected by
 * watching for the scroll position to stop changing rather than by relying on
 * the `scrollend` event, which fires too early to be a reliable signal.
 */
const withAnchorDisabled = (scrollFn, settle) => {
  const root = document.documentElement;
  const previous = root.style.overflowAnchor;
  root.style.overflowAnchor = 'none';

  let released = false;
  let lastY = null;
  let stableFrames = 0;
  let frames = 0;

  const release = () => {
    if (released) return;
    released = true;
    root.style.overflowAnchor = previous;
    window.removeEventListener('wheel', release);
    window.removeEventListener('touchstart', release);
    window.removeEventListener('keydown', release);
  };

  scrollFn();

  const watch = () => {
    if (released) return;
    frames++;
    const y = window.scrollY;
    if (y === lastY) {
      stableFrames++;
    } else {
      stableFrames = 0;
      lastY = y;
    }
    // Give the animation a moment to start, then treat a stable position as
    // the end of the scroll.
    if (frames > 12 && stableFrames >= 6) {
      if (settle) settle();
      release();
      return;
    }
    if (frames < 240) requestAnimationFrame(watch);
    else release();
  };
  requestAnimationFrame(watch);

  // Restore sooner if the user interrupts the smooth scroll
  window.addEventListener('wheel', release, { once: true, passive: true });
  window.addEventListener('touchstart', release, { once: true, passive: true });
  window.addEventListener('keydown', release, { once: true, passive: true });
};

/** Smooth-scroll the page back to the very top. */
export const scrollToTop = (behavior = 'smooth') => {
  withAnchorDisabled(
    () => {
      window.scrollTo({ top: 0, left: 0, behavior });
    },
    () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }
  );
};

/** Height of the sticky header, used to keep a scrolled-to section clear of it. */
const resolveHeaderOffset = () => {
  const navEl = document.querySelector('.navbar-wrapper');
  return navEl ? navEl.offsetHeight : 116;
};

/** Smooth-scroll to a specific element, accounting for the sticky header. */
export const scrollToElement = (element, offset = null) => {
  if (!element) return;
  const headerOffset = typeof offset === 'number' ? offset : resolveHeaderOffset();
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  // When the element is already at (or above) the top of the document there
  // is nothing to scroll to - go all the way up instead.
  if (top <= 0) {
    scrollToTop();
    return;
  }
  withAnchorDisabled(
    () => {
      window.scrollTo({ top, behavior: 'smooth' });
    },
    () => {
      // Re-measure instead of re-asserting the original offset: content that
      // finished loading while the animation was running would otherwise
      // leave the target sitting at the wrong place. The header height is
      // resolved again too - it changes with the responsive breakpoint.
      if (!element.isConnected) return;
      const liveOffset = typeof offset === 'number' ? offset : resolveHeaderOffset();
      const current = element.getBoundingClientRect().top + window.scrollY - liveOffset;
      if (Math.abs(current - top) > 0.5) {
        window.scrollTo({ top: current, behavior: 'auto' });
      }
    }
  );
};
