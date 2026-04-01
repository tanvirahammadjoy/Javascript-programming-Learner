/**
 * main.js
 * -------
 * Handles:
 *  1. Dark / Light mode toggle (persisted to localStorage)
 *  2. Smooth-scroll for nav links (with keyboard support)
 *  3. Mobile hamburger menu
 *  4. Scroll-reveal animation via IntersectionObserver
 *  5. Contact form validation (client-side)
 *  6. Active nav link highlight on scroll
 */

/* =====================================================
   1. THEME TOGGLE
   ===================================================== */

const THEME_KEY = "portfolio-theme";
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

/**
 * Apply a theme by setting [data-theme] on <html>
 * and updating the toggle button's aria-pressed.
 */
function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  // aria-pressed="true" = dark mode is active
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * On load: read saved preference, then fall back to
 * the OS-level preference (prefers-color-scheme).
 */
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
})();

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* =====================================================
   2. SMOOTH SCROLL FOR NAV LINKS
   ===================================================== */

/**
 * Smooth-scroll to a target element, accounting for the
 * fixed nav bar height so headings aren't hidden behind it.
 */
function scrollToTarget(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;

  const navHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({ top, behavior: "smooth" });
}

// Attach to every anchor that links to an in-page section
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return; // skip bare '#' links
    e.preventDefault();
    scrollToTarget(href);

    // Close mobile menu if open
    closeMobileMenu();

    // Move focus to the section for accessibility
    const target = document.querySelector(href);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
});

/* =====================================================
   3. MOBILE HAMBURGER MENU
   ===================================================== */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function openMobileMenu() {
  hamburger.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeMobileMenu() {
  hamburger.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.getAttribute("aria-expanded") === "true";
  isOpen ? closeMobileMenu() : openMobileMenu();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});

/* =====================================================
   4. SCROLL REVEAL via IntersectionObserver
   ===================================================== */

/**
 * Elements with class="reveal" start invisible (set in CSS).
 * Once they intersect the viewport they get class="visible"
 * which transitions them in.
 */
function initScrollReveal() {
  // Respect prefers-reduced-motion
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reducedMotion) {
    // Make all reveal elements immediately visible
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Unobserve after reveal — no need to watch it again
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// Project cards are rendered dynamically, so wait for the DOM to be complete
document.addEventListener("DOMContentLoaded", initScrollReveal);

/* =====================================================
   5. CONTACT FORM VALIDATION
   ===================================================== */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

function getField(id) {
  return document.getElementById(id);
}
function getError(id) {
  return document.getElementById(id + "Error");
}

function showError(fieldId, message) {
  const field = getField(fieldId);
  const error = getError(fieldId);
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", fieldId + "Error");
  error.textContent = message;
}

function clearError(fieldId) {
  const field = getField(fieldId);
  const error = getError(fieldId);
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
  error.textContent = "";
}

function validateForm() {
  let valid = true;

  const name = getField("name").value.trim();
  const email = getField("email").value.trim();
  const message = getField("message").value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Name
  if (!name) {
    showError("name", "Please enter your name.");
    valid = false;
  } else {
    clearError("name");
  }

  // Email
  if (!email) {
    showError("email", "Please enter your email address.");
    valid = false;
  } else if (!emailRe.test(email)) {
    showError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    clearError("email");
  }

  // Message
  if (!message) {
    showError("message", "Please enter a message.");
    valid = false;
  } else if (message.length < 10) {
    showError("message", "Message is too short (min 10 characters).");
    valid = false;
  } else {
    clearError("message");
  }

  return valid;
}

if (contactForm) {
  // Clear errors on input
  ["name", "email", "message"].forEach((id) => {
    getField(id).addEventListener("input", () => clearError(id));
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.hidden = true;

    if (!validateForm()) return;

    // -------------------------------------------------------
    // Replace this block with your real form submission logic
    // e.g., fetch('/api/contact', { method: 'POST', body: ... })
    // -------------------------------------------------------
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    setTimeout(() => {
      // Simulate a successful API call
      contactForm.reset();
      formSuccess.hidden = false;
      submitBtn.textContent = "Send Message →";
      submitBtn.disabled = false;
      // Announce success to screen readers (aria-live="polite" handles this)
    }, 1200);
  });
}

/* =====================================================
   6. ACTIVE NAV LINK on SCROLL
   ===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__links a");

function updateActiveLink() {
  const navHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navHeight - 20;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.removeAttribute("aria-current");
    if (link.getAttribute("href") === `#${current}`) {
      link.setAttribute("aria-current", "page");
    }
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
