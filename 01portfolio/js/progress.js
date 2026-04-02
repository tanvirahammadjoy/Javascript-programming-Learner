export function initProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  function update() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? Math.round((scrolled / total) * 100) : 0;
    bar.style.width = `${pct}%`;
    bar.setAttribute("aria-valuenow", pct);
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}
