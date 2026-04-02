export function initTypewriter() {
  const el = document.querySelector(".typewriter");
  if (!el) return;

  const words = ["fast,", "accessible,", "beautiful,", "performant,"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    el.textContent = deleting
      ? word.slice(0, charIndex--)
      : word.slice(0, charIndex++);

    let delay = deleting ? 60 : 110;

    if (!deleting && charIndex > word.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}
