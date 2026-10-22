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
 */
const withAnchorDisabled = (scrollFn) => {
  const root = document.documentElement;
  const previous = root.style.overflowAnchor;
  root.style.overflowAnchor = 'none';

  let restoreTimer;
  const restore = () => {
    root.style.overflowAnchor = previous;
    clearTimeout(restoreTimer);
    window.removeEventListener('scrollend', restore);
    window.removeEventListener('wheel', restore);
    window.removeEventListener('touchstart', restore);
  };

  scrollFn();

  // Prefer the scrollend event so anchoring stays disabled for the whole
  // animation, with a timer as a fallback for browsers without it.
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', restore, { once: true });
  }
  restoreTimer = setTimeout(restore, 2500);
  // Restore sooner if the user interrupts the smooth scroll
  window.addEventListener('wheel', restore, { once: true, passive: true });
  window.addEventListener('touchstart', restore, { once: true, passive: true });
};

/** Smooth-scroll the page back to the very top. */
export const scrollToTop = (behavior = 'smooth') => {
  withAnchorDisabled(() => {
    window.scrollTo({ top: 0, left: 0, behavior });
  });
};

/** Smooth-scroll to a specific element, accounting for the sticky header. */
export const scrollToElement = (element, offset = null) => {
  if (!element) return;
  const navEl = document.querySelector('.navbar-wrapper');
  const headerOffset = typeof offset === 'number' ? offset : (navEl ? navEl.offsetHeight : 116);
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  // When the element is already at (or above) the top of the document there
  // is nothing to scroll to - go all the way up instead.
  if (top <= 0) {
    scrollToTop();
    return;
  }
  withAnchorDisabled(() => {
    window.scrollTo({ top, behavior: 'smooth' });
  });
};
