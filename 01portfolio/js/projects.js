import { openModal } from "./modal.js";

const projects = [
  {
    title: "Dev Portfolio",
    description:
      "A fully responsive portfolio built with semantic HTML, CSS custom properties, and vanilla JS modules.",
    longDescription:
      "A production-quality developer portfolio built entirely without frameworks — just carefully crafted HTML, CSS, and modular JavaScript. Focuses on accessibility, performance, and design polish.",
    image: "assets/images/portfolio.jpg",
    alt: "Screenshot of portfolio website homepage",
    tags: ["JavaScript", "CSS", "HTML"],
    features: [
      "Dark/light mode with system preference detection",
      "Command palette with keyboard navigation",
      "Intersection Observer scroll animations",
      "Fully accessible — WCAG AA compliant",
      "Zero dependencies, zero frameworks",
    ],
    liveUrl: "[example.com](https://example.com)",
    repoUrl: "[github.com](https://github.com/yourname/portfolio)",
  },
  {
    title: "Weather Dashboard",
    description:
      "Live weather app using the OpenWeatherMap API with geolocation, forecasts, and animated conditions.",
    longDescription:
      "A feature-rich weather dashboard that uses the browser's Geolocation API and OpenWeatherMap to display real-time weather, 5-day forecasts, and animated weather icons.",
    image: "assets/images/weather.jpg",
    alt: "Screenshot of weather dashboard app",
    tags: ["JavaScript", "API", "CSS"],
    features: [
      "Geolocation-based weather detection",
      "5-day forecast with animated icons",
      "Unit toggle (°C / °F)",
      "Saved locations with localStorage",
    ],
    liveUrl: "[example.com](https://example.com/weather)",
    repoUrl: "[github.com](https://github.com/yourname/weather)",
  },
  {
    title: "Task Manager",
    description:
      "Drag-and-drop task board with localStorage persistence, tag filtering, and keyboard navigation.",
    longDescription:
      "A lightweight Kanban-style task manager with full drag-and-drop support, persistent state via localStorage, keyboard navigation, and a clean accessible interface.",
    image: "assets/images/tasks.jpg",
    alt: "Screenshot of task manager Kanban board",
    tags: ["JavaScript", "CSS"],
    features: [
      "Drag-and-drop between columns",
      "Full keyboard navigation",
      "Tag-based task filtering",
      "Auto-saves to localStorage",
    ],
    liveUrl: "[example.com](https://example.com/tasks)",
    repoUrl: "[github.com](https://github.com/yourname/tasks)",
  },
];

function createCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card reveal";
  article.setAttribute("role", "listitem");
  article.dataset.tags = project.tags.join(",");
  article.style.setProperty("--stagger-index", index);

  article.innerHTML = `
    <img
      src="${project.image}"
      alt="${project.alt}"
      loading="lazy"
      width="600"
      height="400"
    />
    <div class="project-card-content">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags" aria-label="Technologies used">
        ${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        <button
          class="button"
          type="button"
          data-project="${project.title}"
          aria-label="View details for ${project.title}"
        >Details</button>
        <a
          class="button button-ghost"
          href="${project.repoUrl}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View ${project.title} source code on GitHub"
        >Code</a>
      </div>
    </div>
  `;

  article.querySelector("[data-project]").addEventListener("click", () => {
    openModal(project);
  });

  return article;
}

export function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  projects.forEach((p, i) => fragment.appendChild(createCard(p, i)));
  grid.appendChild(fragment);
}

export function initFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      grid.querySelectorAll(".project-card").forEach((card) => {
        const match = filter === "all" || card.dataset.tags.includes(filter);
        card.toggleAttribute("data-hidden", !match);
      });
    });
  });
}
