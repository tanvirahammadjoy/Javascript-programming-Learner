const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");

let previousFocus;

function openModal(project) {
  previousFocus = document.activeElement;

  modalContent.innerHTML = `
    <img src="${project.image}" alt="${project.alt}" />
    <div class="modal-meta">
      ${project.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
    </div>
    <h2 id="modal-title">${project.title}</h2>
    <p>${project.longDescription || project.description}</p>

    <div class="modal-section">
      <h3>Key Features</h3>
      <ul>
        ${(project.features || []).map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <div class="modal-links">
      <a class="button" href="${project.liveUrl}"
        target="_blank" rel="noopener noreferrer">Live Demo</a>
      <a class="button button-ghost" href="${project.repoUrl}"
        target="_blank" rel="noopener noreferrer">View Code</a>
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Focus the close button
  requestAnimationFrame(() => modalClose.focus());
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  previousFocus?.focus();
}

export function initModal() {
  modalClose?.addEventListener("click", closeModal);
  modalBackdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // Focus trap
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = modal.querySelectorAll(
      'button, a, input, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

export { openModal };
