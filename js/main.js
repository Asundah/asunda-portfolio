/* ===========================
   Amos Asunda — Portfolio JS
   =========================== */
(function () {
  "use strict";

  const WHATSAPP_NUMBER = "254143280725";

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const closeMenu = () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navMenu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Scroll spy ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            link.style.color = active ? "var(--accent)" : "";
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Typewriter ---------- */
  const typeEl = document.getElementById("typewriter");
  const phrases = [
    "web applications.",
    "REST APIs.",
    "M-Pesa integrations.",
    "Django backends.",
    "clean, responsive UIs.",
  ];

  if (
    typeEl &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const tick = () => {
      const current = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typeEl.textContent = current.slice(0, charIndex);
      let delay = deleting ? 45 : 95;
      if (!deleting && charIndex === current.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 600);
  } else if (typeEl) {
    typeEl.textContent = phrases[0];
  }

  /* ---------- Skill card pointer glow ---------- */
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  /* ---------- Contact form → WhatsApp ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        note.style.color = "#f87171";
        note.textContent = "Please fill in all fields.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.style.color = "#f87171";
        note.textContent = "Please enter a valid email address.";
        return;
      }

      const waText = encodeURIComponent(
        `Hi Amos, I'm ${name} (${email}).\n\n${message}`,
      );
      const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

      note.style.color = "var(--accent)";
      note.textContent = "Opening WhatsApp...";
      window.open(waURL, "_blank", "noopener");
      form.reset();
    });
  }
})();
