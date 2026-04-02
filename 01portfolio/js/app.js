import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { renderProjects, initFilter } from "./projects.js";
import { initAnimations, initActiveNav } from "./animations.js";
import { initForm } from "./form.js";
import { initTypewriter } from "./typewriter.js";
import { initCursor } from "./cursor.js";
import { initMagnetic } from "./magnetic.js";
import { initTilt } from "./tilt.js";
import { initModal } from "./modal.js";
import { initCommand } from "./command.js";
import { initProgress } from "./progress.js";
import { initEasterEgg } from "./easter.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initProgress();
  renderProjects();
  initFilter();
  initModal();
  initAnimations();
  initActiveNav();
  initForm();
  initTypewriter();
  initCursor();
  initMagnetic();
  initTilt();
  initCommand();
  initEasterEgg();

  document.getElementById("year").textContent = new Date().getFullYear();
});
