import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { renderProjects, initFilter } from "./projects.js";
import { initAnimations, initActiveNav } from "./animations.js";
import { initForm } from "./form.js";
import { initTypewriter } from "./typewriter.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  renderProjects();
  initFilter();
  initAnimations();
  initActiveNav();
  initForm();
  initTypewriter();

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
