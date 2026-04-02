export function initEasterEgg() {
  // Konami code easter egg
  const code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let progress = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === code[progress]) {
      progress++;
      if (progress === code.length) {
        activateEasterEgg();
        progress = 0;
      }
    } else {
      progress = 0;
    }
  });

  // Hidden console message
  console.log(
    "%c👋 Hey, curious dev!",
    "color: #60a5fa; font-size: 20px; font-weight: bold;",
  );
  console.log(
    "%cThanks for inspecting this portfolio.\nLet's connect: you@example.com",
    "color: #94a3b8; font-size: 13px;",
  );
}

function activateEasterEgg() {
  const msg = document.createElement("div");
  msg.setAttribute("role", "alert");
  msg.setAttribute("aria-live", "assertive");
  msg.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%;
    transform: translateX(-50%);
    background: var(--color-primary); color: #fff;
    padding: 1rem 2rem; border-radius: 2rem;
    font-weight: 700; font-size: 1.1rem;
    z-index: 9999; box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    animation: slideUp 0.4s cubic-bezier(0.4,0,0.2,1);
  `;
  msg.textContent = "🎮 Konami code unlocked! You found the easter egg!";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 4000);
}
