const commands = [
  {
    icon: "🏠",
    label: "Go to Home",
    hint: "Hero",
    action: () => scrollTo("#hero"),
  },
  {
    icon: "👤",
    label: "About Me",
    hint: "Section",
    action: () => scrollTo("#about"),
  },
  {
    icon: "🛠️",
    label: "View Projects",
    hint: "Section",
    action: () => scrollTo("#projects"),
  },
  {
    icon: "✉️",
    label: "Contact Me",
    hint: "Section",
    action: () => scrollTo("#contact"),
  },
  {
    icon: "🌙",
    label: "Toggle Theme",
    hint: "Ctrl+J",
    action: () => document.getElementById("theme-toggle").click(),
  },
  {
    icon: "📄",
    label: "Download Resume",
    hint: "PDF",
    action: () => window.open("assets/resume.pdf"),
  },
  {
    icon: "🐙",
    label: "GitHub",
    hint: "External",
    action: () =>
      window.open("[github.com](https://github.com/yourname)", "_blank"),
  },
  {
    icon: "💼",
    label: "LinkedIn",
    hint: "External",
    action: () =>
      window.open("[linkedin.com](https://linkedin.com/in/yourname)", "_blank"),
  },
];

function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

export function initCommand() {
  const palette = document.getElementById("command-palette");
  const input = document.getElementById("command-input");
  const results = document.getElementById("command-results");
  const backdrop = document.getElementById("command-backdrop");
  if (!palette) return;

  let selectedIndex = 0;

  function renderResults(query = "") {
    const filtered = commands.filter((c) =>
      c.label.toLowerCase().includes(query.toLowerCase()),
    );

    results.innerHTML = filtered
      .map(
        (cmd, i) => `
        <li
          class="command-item"
          role="option"
          data-index="${i}"
          aria-selected="${i === selectedIndex}"
        >
          <span class="command-item-icon" aria-hidden="true">${cmd.icon}</span>
          <span class="command-item-label">${cmd.label}</span>
          <span class="command-item-hint">${cmd.hint}</span>
        </li>
      `,
      )
      .join("");

    results.querySelectorAll(".command-item").forEach((item, i) => {
      item.addEventListener("click", () => {
        filtered[i].action();
        closeCommand();
      });
    });

    return filtered;
  }

  let currentFiltered = commands;

  function openCommand() {
    palette.classList.add("is-open");
    palette.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    input.value = "";
    selectedIndex = 0;
    currentFiltered = renderResults();
    requestAnimationFrame(() => input.focus());
  }

  function closeCommand() {
    palette.classList.remove("is-open");
    palette.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateSelection(newIndex) {
    const items = results.querySelectorAll(".command-item");
    selectedIndex = Math.max(0, Math.min(newIndex, items.length - 1));
    items.forEach((item, i) =>
      item.setAttribute("aria-selected", String(i === selectedIndex)),
    );
    items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }

  // Open: Ctrl+K or Cmd+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      palette.classList.contains("is-open") ? closeCommand() : openCommand();
    }
    if (e.key === "Escape" && palette.classList.contains("is-open"))
      closeCommand();
  });

  // Keyboard nav inside palette
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      updateSelection(selectedIndex + 1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      updateSelection(selectedIndex - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      currentFiltered[selectedIndex]?.action();
      closeCommand();
    }
  });

  input.addEventListener("input", () => {
    selectedIndex = 0;
    currentFiltered = renderResults(input.value);
  });

  backdrop.addEventListener("click", closeCommand);
}
