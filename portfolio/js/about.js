(function () {
  // ======================== 1) Dynamic Greeting based on time ====================
  const greetingSpan = document.getElementById("greetingMessage");
  if (greetingSpan) {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) greeting = "🌅 Good morning! Ready to build?";
    else if (hour < 18) greeting = "☀️ Good afternoon! Let’s innovate.";
    else greeting = "🌙 Good evening! Cozy coding session.";
    greetingSpan.textContent = greeting;
  }

  // ======================== 2) Fun Fact Toggle with smooth animation ============
  const factToggle = document.getElementById("funFactToggle");
  const factContent = document.getElementById("funFactContent");
  const toggleIcon = document.getElementById("toggleIcon");
  if (factToggle && factContent) {
    factToggle.addEventListener("click", () => {
      factContent.classList.toggle("show");
      if (factContent.classList.contains("show")) {
        toggleIcon.style.transform = "rotate(180deg)";
      } else {
        toggleIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  // ======================== 3) Counter animation on scroll / intersection observer =====
  const statNumbers = [
    { element: document.getElementById("statProjects"), target: 28 },
    { element: document.getElementById("statClients"), target: 15 },
    { element: document.getElementById("statYears"), target: 4 },
    { element: document.getElementById("statCoffee"), target: 100 },
  ];

  let animated = false;
  function animateNumbers() {
    if (animated) return;
    animated = true;
    statNumbers.forEach((stat) => {
      if (!stat.element) return;
      let start = 0;
      const end = stat.target;
      const duration = 1200;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = end / steps;
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          stat.element.innerText = end;
          clearInterval(timer);
        } else {
          stat.element.innerText = Math.floor(current);
        }
      }, stepTime);
    });
  }

  // use intersection observer to trigger counter when about section visible
  const aboutSection = document.getElementById("about");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animateNumbers();
        }
      });
    },
    { threshold: 0.3 },
  );
  if (aboutSection) observer.observe(aboutSection);

  // fallback: if observer not supported or already visible
  if (
    aboutSection &&
    aboutSection.getBoundingClientRect().top < window.innerHeight - 100 &&
    !animated
  ) {
    animateNumbers();
  }

  // ======================== 4) Interactive Mood Changer ==========================
  const moodTextSpan = document.getElementById("moodText");
  const changeMoodBtn = document.getElementById("changeMoodBtn");
  const moods = [
    "✨ Currently: building cool stuff",
    "🎨 Designing interactions",
    "☕ Debugging with coffee",
    "🚀 Shipping features fast",
    "💡 Learning WebGPU",
    "🎧 Lo-fi + code mode",
    "🤝 Open to collabs",
  ];
  let moodIndex = 0;
  if (changeMoodBtn && moodTextSpan) {
    changeMoodBtn.addEventListener("click", () => {
      moodIndex = (moodIndex + 1) % moods.length;
      moodTextSpan.textContent = moods[moodIndex];
      // add a small haptic feedback style
      const widget = document.getElementById("moodWidget");
      widget.style.transform = "scale(1.02)";
      setTimeout(() => {
        if (widget) widget.style.transform = "";
      }, 150);
    });
  }

  // ======================== 5) Buttons interactive demo (alerts / console playful) ====
  const resumeBtn = document.getElementById("resumeBtn");
  const contactBtn = document.getElementById("contactBtn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // simulate download / show toast style alert (modern subtle)
      const fakeAlert = document.createElement("div");
      fakeAlert.innerText =
        '📄 Demo: Resume preview — "Alex_Morgan_Resume_2025.pdf" would open.';
      fakeAlert.style.position = "fixed";
      fakeAlert.style.bottom = "20px";
      fakeAlert.style.left = "20px";
      fakeAlert.style.right = "20px";
      fakeAlert.style.maxWidth = "300px";
      fakeAlert.style.backgroundColor = "#1e293b";
      fakeAlert.style.color = "#f1f5f9";
      fakeAlert.style.padding = "12px 18px";
      fakeAlert.style.borderRadius = "40px";
      fakeAlert.style.fontSize = "0.85rem";
      fakeAlert.style.zIndex = "1000";
      fakeAlert.style.fontWeight = "500";
      fakeAlert.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
      fakeAlert.style.backdropFilter = "blur(8px)";
      document.body.appendChild(fakeAlert);
      setTimeout(() => fakeAlert.remove(), 2200);
    });
  }
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const notification = document.createElement("div");
      notification.innerText =
        "📧 hello@alexmorgan.dev — drop a message! (demo interaction)";
      notification.style.position = "fixed";
      notification.style.bottom = "20px";
      notification.style.right = "20px";
      notification.style.backgroundColor = "#0f172a";
      notification.style.color = "#e2e8f0";
      notification.style.padding = "10px 20px";
      notification.style.borderRadius = "32px";
      notification.style.fontSize = "0.8rem";
      notification.style.zIndex = "1000";
      notification.style.fontFamily = "Inter, sans-serif";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2500);
    });
  }

  // ======================== 6) Live timestamp updater (JS interactivity) =========
  const timestampSpan = document.getElementById("liveTimestamp");
  function updateTimestamp() {
    if (timestampSpan) {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        month: "short",
        day: "numeric",
      });
      timestampSpan.innerText = formatted;
    }
  }
  updateTimestamp();
  setInterval(updateTimestamp, 1000);

  // ======================== 7) Additional subtle effect: hover on stats ===========
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-3px)";
      item.style.backgroundColor = "#ffffffcc";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
      item.style.backgroundColor = "";
    });
  });

  // bonus: dynamic background wave on chips? not needed but nice
  // add some console greeting
  console.log(
    "✨ About section interactive — counters, fun fact toggle, mood switcher active",
  );
})();
