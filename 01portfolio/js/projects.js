const projects = [
  {
    title: "Dev Portfolio",
    description:
      "A fully responsive developer portfolio built with semantic HTML, CSS custom properties, and vanilla JS modules.",
    image: "assets/images/portfolio.jpg",
    alt: "Screenshot of portfolio website",
    tags: ["JavaScript", "CSS", "HTML"],
    liveUrl: "[example.com](https://example.com)",
    repoUrl: "[github.com](https://github.com/yourname/portfolio)",
  },
  {
    title: "Weather Dashboard",
    description:
      "Live weather app using the OpenWeatherMap API with geolocation, forecasts, and animated conditions.",
    image: "assets/images/weather.jpg",
    alt: "Screenshot of weather dashboard",
    tags: ["JavaScript", "API", "CSS"],
    liveUrl: "[example.com](https://example.com/weather)",
    repoUrl: "[github.com](https://github.com/yourname/weather)",
  },
  {
    title: "Task Manager",
    description:
      "Drag-and-drop task board with localStorage persistence, tag filtering, and keyboard navigation.",
    image: "assets/images/tasks.jpg",
    alt: "Screenshot of task manager app",
    tags: ["JavaScript", "CSS"],
    liveUrl: "[example.com](https://example.com/tasks)",
    repoUrl: "[github.com](https://github.com/yourname/tasks)",
  },
];

function createCard(project) {
  const article = document.createElement("article");
  article.className = "project-card reveal";
  article.setAttribute("role", "listitem");
  article.dataset.tags = project.tags.join(",");

  article.innerHTML = `
    <img src="${project.image}" alt="${project.alt}" loading="lazy" width="600" height="400" />
    <div class="project-card-content">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags" aria-label="Technologies used">
        ${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        <a class="button" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"
           aria-label="Live demo of ${project.title}">Live</a>
        <a class="button button-ghost" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer"
           aria-label="View ${project.title} source code">Code</a>
      </div>
    </div>
  `;

  return article;
}

export function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  projects.forEach((p) => fragment.appendChild(createCard(p)));
  grid.appendChild(fragment);
}

export function initFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("projects-grid");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      grid.querySelectorAll(".project-card").forEach((card) => {
        const tags = card.dataset.tags;
        const visible = filter === "all" || tags.includes(filter);
        card.toggleAttribute("data-hidden", !visible);
      });
    });
  });
}
