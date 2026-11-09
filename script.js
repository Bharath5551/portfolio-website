// ==========================================================
// Bharath S Marambeed — Portfolio interactions
// ==========================================================

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ----- Reveal on scroll (with a small stagger for siblings) -----

const revealEls = document.querySelectorAll(".reveal");

revealEls.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  const i = siblings.indexOf(el);
  if (i > 0) el.style.setProperty("--delay", Math.min(i * 0.08, 0.4) + "s");
});

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// ----- Navbar: background on scroll, progress bar, active link -----

const navbar = document.querySelector(".navbar");
const progress = document.querySelector(".scroll-progress");
const navAnchors = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = navAnchors
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

let ticking = false;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  navbar.classList.toggle("scrolled", y > 20);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

  let current = null;
  const line = window.innerHeight * 0.35;
  sections.forEach((s) => {
    if (s.getBoundingClientRect().top <= line) current = s.id;
  });
  navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

onScroll();

// ----- Mobile menu -----

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("open") && !e.target.closest(".nav-inner")) setMenu(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// ----- Spotlight cards follow the cursor -----

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".spotlight").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
}

// ----- Copy email -----

const copyBtn = document.querySelector(".copy-btn");

if (copyBtn) {
  const label = copyBtn.querySelector(".copy-label");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      label.textContent = "Copied!";
      copyBtn.classList.add("copied");
    } catch {
      window.location.href = "mailto:" + copyBtn.dataset.copy;
      return;
    }
    setTimeout(() => {
      label.textContent = "Copy";
      copyBtn.classList.remove("copied");
    }, 1800);
  });
}

// ----- Certificate lightbox -----

const lightbox = document.querySelector(".lightbox");

if (lightbox && typeof lightbox.showModal === "function") {
  const lbImg = lightbox.querySelector("img");

  document.querySelectorAll(".certificate-thumb, .diagram-frame").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      lbImg.src = btn.dataset.full;
      lbImg.alt = img.alt;
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });
} else {
  document.querySelectorAll(".certificate-thumb, .diagram-frame").forEach((btn) => {
    btn.addEventListener("click", () => window.open(btn.dataset.full, "_blank", "noopener"));
  });
}
