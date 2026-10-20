// Mobile navigation, reveal animations, skill bars, and footer year.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
const skillFills = document.querySelectorAll(".skill-fill");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width || "0%";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach((fill) => skillObserver.observe(fill));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
  skillFills.forEach((fill) => { fill.style.width = fill.dataset.width || "0%"; });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
