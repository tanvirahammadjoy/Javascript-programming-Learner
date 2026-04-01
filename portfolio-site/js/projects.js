/**
 * projects.js
 * -----------
 * Single source of truth for all project data.
 * Add or remove objects here — the UI updates automatically.
 * Each object maps to a rendered project card.
 */

const PROJECTS = [
  {
    id: 1,
    icon: "🛒",
    title: "ShopFlow",
    description:
      "A full-stack e-commerce platform with real-time inventory management, Stripe payment integration, and a React storefront.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    id: 2,
    icon: "🌤️",
    title: "WeatherOS",
    description:
      "A clean weather dashboard consuming the OpenWeather API. Features 7-day forecasts, hourly charts, and geolocation support.",
    tags: ["JavaScript", "REST API", "Chart.js", "CSS Grid"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    id: 3,
    icon: "📝",
    title: "Notion Clone",
    description:
      "A block-based note-taking app with drag-and-drop reordering, rich text editing, and real-time sync via Firebase.",
    tags: ["React", "Firebase", "TypeScript", "DnD Kit"],
    liveUrl: null,
    repoUrl: "https://github.com",
  },
  {
    id: 4,
    icon: "🤖",
    title: "ChatBot SDK",
    description:
      "A lightweight embeddable chatbot library under 8kb gzipped. Supports custom personas, webhooks, and a simple plugin API.",
    tags: ["Vanilla JS", "WebSockets", "npm package"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    id: 5,
    icon: "📊",
    title: "AnalyticsDash",
    description:
      "A data visualization dashboard built for a SaaS startup. Renders >100k data points smoothly via canvas-based charting.",
    tags: ["Vue 3", "D3.js", "Python", "FastAPI"],
    liveUrl: null,
    repoUrl: "https://github.com",
  },
  {
    id: 6,
    icon: "🎨",
    title: "DesignTokens CLI",
    description:
      "A Node CLI that transforms Figma tokens (via REST API) into platform-ready CSS, iOS Swift, and Android XML outputs.",
    tags: ["Node.js", "Figma API", "CLI", "Open Source"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
];

/**
 * renderProjects
 * Generates and injects project cards into #projectsGrid.
 * Follows the progressive enhancement pattern — content
 * is meaningful even without JS (add <noscript> fallback if needed).
 */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-label", `Project: ${project.title}`);

    // Build links HTML conditionally
    const liveLink = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="Live demo of ${project.title}">Live ↗</a>`
      : "";
    const repoLink = project.repoUrl
      ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Source code for ${project.title}">Code ↗</a>`
      : "";

    // Build tags HTML
    const tagsHtml = project.tags
      .map((tag) => `<span class="project-card__tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-card__header">
        <span class="project-card__icon" aria-hidden="true">${project.icon}</span>
        <div class="project-card__links" aria-label="Project links">
          ${liveLink}
          ${repoLink}
        </div>
      </div>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__desc">${project.description}</p>
      <div class="project-card__tags" aria-label="Technologies used">
        ${tagsHtml}
      </div>
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", renderProjects);
