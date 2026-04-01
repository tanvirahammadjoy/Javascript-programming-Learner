// ==================== TYPING ANIMATION ====================
const words = ["inspire", "innovate", "engage", "transform", "empower"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicTextEl = document.getElementById("dynamicText");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    dynamicTextEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicTextEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
    return;
  }

  const speed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, speed);
}

typeEffect();

// ==================== PARTICLE SYSTEM ====================
const canvas = document.getElementById("particleCanvas");
let ctx = canvas.getContext("2d");
let particles = [];
let particleCount = 80;
let mouseX = null;
let mouseY = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse interaction
    if (mouseX && mouseY) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 100;
        this.x += Math.cos(angle) * force * 1.5;
        this.y += Math.sin(angle) * force * 1.5;
      }
    }

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let particle of particles) {
    particle.update();
    particle.draw();
  }

  // Draw connections
  ctx.beginPath();
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
  mouseX = null;
  mouseY = null;
});

resizeCanvas();
initParticles();
animateParticles();

// ==================== INTERACTIVE BUTTONS ====================
const viewWorkBtn = document.getElementById("viewWorkBtn");
const contactBtn = document.getElementById("contactBtn");
const scrollIndicator = document.getElementById("scrollIndicator");

viewWorkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Smooth scroll simulation (create ripple effect)
  createRippleEffect(viewWorkBtn);
  showNotification("✨ Exploring projects section...", "info");
  // Simulate scroll to projects (in real portfolio, you'd scroll to actual section)
  setTimeout(() => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      showNotification("Projects section coming soon! 🚀", "success");
    }
  }, 200);
});

contactBtn.addEventListener("click", () => {
  createRippleEffect(contactBtn);
  showNotification("📧 Let's connect! hello@yourdomain.com", "success");
});

scrollIndicator.addEventListener("click", () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
});

function createRippleEffect(button) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple-effect");
  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.backgroundColor = "rgba(255,255,255,0.5)";
  ripple.style.width = "100px";
  ripple.style.height = "100px";
  ripple.style.transform = "translate(-50%, -50%) scale(0)";
  ripple.style.animation = "ripple 0.6s ease-out";
  ripple.style.pointerEvents = "none";

  button.style.position = "relative";
  button.style.overflow = "hidden";

  const rect = button.getBoundingClientRect();
  ripple.style.left = rect.width / 2 + "px";
  ripple.style.top = rect.height / 2 + "px";

  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.padding = "12px 24px";
  notification.style.borderRadius = "12px";
  notification.style.fontFamily = "Inter, sans-serif";
  notification.style.fontSize = "0.9rem";
  notification.style.fontWeight = "500";
  notification.style.zIndex = "10000";
  notification.style.backdropFilter = "blur(12px)";
  notification.style.backgroundColor =
    type === "success" ? "rgba(16, 185, 129, 0.9)" : "rgba(99, 102, 241, 0.9)";
  notification.style.color = "white";
  notification.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  notification.style.animation = "slideIn 0.3s ease-out";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add ripple and notification animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
      @keyframes ripple {
        to {
          transform: translate(-50%, -50%) scale(3);
          opacity: 0;
        }
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
document.head.appendChild(styleSheet);

// ==================== SOCIAL LINKS INTERACTION ====================
const socialLinks = document.querySelectorAll(".social-icon");
socialLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const platform = link.querySelector("i").classList[1].replace("fa-", "");
    showNotification(`🔗 Opening ${platform} profile (demo)`, "info");
  });
});

// ==================== PARALLAX EFFECT ON MOUSE MOVE ====================
const heroContent = document.querySelector(".hero-content");
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroContent.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

// ==================== INTERSECTION OBSERVER FOR ENTRY ANIMATION ====================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 1s ease-out forwards";
      }
    });
  },
  { threshold: 0.1 },
);

observer.observe(heroContent);

// ==================== ADDITIONAL: Dynamic Background Color Shift ====================
let hue = 240;
setInterval(() => {
  hue = (hue + 0.3) % 360;
  const gradient = `radial-gradient(circle at 30% 50%, rgba(99,102,241,0.4), rgba(${Math.sin((hue * Math.PI) / 180) * 100 + 100}, ${Math.cos((hue * Math.PI) / 180) * 100 + 100}, 255, 0.2))`;
  document.querySelector(".orb-1").style.background = gradient;
}, 100);

// Log to console
console.log(
  "✨ Hero section enhanced with typing animation, particle system, and interactive elements!",
);
