const validators = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email.",
  message: (v) =>
    v.trim().length >= 10 ? "" : "Message must be at least 10 characters.",
};

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (!input || !error) return;
  input.classList.toggle("invalid", !!message);
  error.textContent = message;
}

export function initForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  // Real-time validation on blur
  ["name", "email", "message"].forEach((id) => {
    const input = document.getElementById(id);
    input?.addEventListener("blur", () => {
      showError(id, validators[id]?.(input.value) ?? "");
    });
    input?.addEventListener("input", () => {
      if (input.classList.contains("invalid")) {
        showError(id, validators[id]?.(input.value) ?? "");
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;
    ["name", "email", "message"].forEach((id) => {
      const input = document.getElementById(id);
      const error = validators[id]?.(input?.value ?? "");
      showError(id, error);
      if (error) valid = false;
    });

    if (!valid) return;

    const submitBtn = form.querySelector(".submit-btn");
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      // Replace this with a real endpoint (Formspree, Netlify Forms, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      status.textContent = "✅ Message sent! I'll get back to you soon.";
      status.className = "form-status success";
      form.reset();
    } catch {
      status.textContent = "❌ Something went wrong. Please try again.";
      status.className = "form-status error";
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });
}
