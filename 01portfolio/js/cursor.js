export function initCursor() {
  const isTouchDevice = window.matchMedia("(hover: none)").matches;
  if (isTouchDevice) return;

  const cursor = document.getElementById("cursor");
  const dot = cursor?.querySelector(".cursor-dot");
  const ring = cursor?.querySelector(".cursor-ring");
  if (!cursor || !dot || !ring) return;

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;
  let rafId;

  document.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    },
    { passive: true },
  );

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor states
  const interactiveEls =
    'a, button, [role="button"], input, textarea, select, label, .filter-btn';

  document.addEventListener(
    "mouseover",
    (e) => {
      if (e.target.closest(interactiveEls)) {
        document.documentElement.dataset.cursor = "link";
      } else if (e.target.closest("p, h1, h2, h3, li")) {
        document.documentElement.dataset.cursor = "text";
      } else {
        delete document.documentElement.dataset.cursor;
      }
    },
    { passive: true },
  );

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cancelAnimationFrame(rafId);
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    animateRing();
  });
}
