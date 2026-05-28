const loader = document.getElementById("loader");
const themeBtn = document.getElementById("themeBtn");
const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
const topBtn = document.getElementById("top-btn");
const typingText = document.getElementById("typingText");
const toast = document.getElementById("toast");

const navLinks = document.querySelectorAll(".site-nav a");
const searchInput = document.querySelector(".search-panel input");
const contactForm = document.querySelector(".contact-form");
const subscribeForm = document.querySelector(".subscribe form");

// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1000);
});

/* Saved Theme */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.querySelector("i").className = "fa-regular fa-sun";
}

/* Theme Toggle */
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  const icon = themeBtn.querySelector("i");

  icon.className = isDark ? "fa-regular fa-sun" : "fa-regular fa-moon";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* Search Toggle */
searchBtn.addEventListener("click", () => {
  searchPanel.classList.toggle("active");
  siteNav.classList.remove("active");
  searchInput.focus();
});

/* Mobile Menu Toggle */
menuBtn.addEventListener("click", () => {
  siteNav.classList.toggle("active");
  searchPanel.classList.remove("active");

  const icon = menuBtn.querySelector("i");
  icon.className = siteNav.classList.contains("active")
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
});

/* Close Menu on Link Click */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("active");
    menuBtn.querySelector("i").className = "fa-solid fa-bars";
  });
});

/* Active Navbar Link on Scroll */
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("main[id]");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

/* Scroll Reveal Effect */
const revealElements = document.querySelectorAll(
  ".hero-container, .hero-section-img, .impact-card, .program-card, .program-main-card, .program-side-card, .program-wide-card, .volunteer-content, .volunteer-img, .contact-form, .footer-grid",
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      element.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Search Section */
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = searchInput.value.toLowerCase().trim();

    const sections = {
      about: "hero",
      impact: "impact",
      program: "program",
      programs: "program",
      volunteer: "volunteer",
      contact: "contact",
    };

    if (sections[value]) {
      document.getElementById(sections[value]).scrollIntoView({
        behavior: "smooth",
      });
      searchPanel.classList.remove("active");
      searchInput.value = "";
    } else {
      alert(
        "Section not found. Try: about, impact, program, volunteer, contact",
      );
    }
  }
});

/* Contact Form */
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Application submitted successfully!");
  contactForm.reset();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* Subscribe Form */
subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Thank you for subscribing!");
  subscribeForm.reset();
});

// Top Button
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

// Typing Effect
const words = ["Education", "Opportunities", "Leadership", "Innovation"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex++);
  } else {
    typingText.textContent = currentWord.substring(0, charIndex--);
  }

  if (!isDeleting && charIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 120);
}
typeEffect();