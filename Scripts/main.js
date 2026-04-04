// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const savedTheme = localStorage.getItem("theme") || "dark";
let currentTheme = savedTheme;

function applyTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
    themeIcon.className = "fas fa-moon text-xl";
  } else if (theme === "light") {
    html.classList.remove("dark");
    themeIcon.className = "fas fa-sun text-xl";
  }
}

// Apply initial theme
applyTheme(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener("click", () => {
  if (currentTheme === "light") {
    currentTheme = "dark";
  } else {
    currentTheme = "light";
  }

  localStorage.setItem("theme", currentTheme);
  applyTheme(currentTheme);
});

// Image zoom modal
const projectImages = document.querySelectorAll(".project-image");
const imageModal = document.getElementById("image-modal");
const imageModalImg = document.getElementById("image-modal-img");
const imageModalCaption = document.getElementById("image-modal-caption");
const imageModalClose = document.getElementById("image-modal-close");

projectImages.forEach((image) => {
  image.addEventListener("click", () => {
    imageModalImg.src = image.src;
    imageModalImg.alt = image.alt || "Project screenshot";
    imageModalCaption.textContent = image.alt || "Project screenshot";
    imageModal.classList.add("open");
  });
});

imageModalClose.addEventListener("click", () => {
  imageModal.classList.remove("open");
});

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal || event.target === imageModalClose) {
    imageModal.classList.remove("open");
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    imageModal.classList.remove("open");
  }
});

// Contact form handling
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  if (window.emailjs) {
    emailjs.init("mVJm5uUx8Sio4CB_i");
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields", false);
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email", false);
      return;
    }

    if (!window.emailjs) {
      showFormMessage(
        "Email service is unavailable. Please refresh and try again.",
        false,
      );
      return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";

    try {
      await emailjs.sendForm(
        "service_fq4j1om",
        "template_a0awrpc",
        contactForm,
      );
      await emailjs.sendForm(
        "service_fq4j1om",
        "template_dpy2mdc",
        contactForm,
      );

      showFormMessage("Message sent successfully ✅", true);
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      showFormMessage("Something went wrong ❌ Please try again later.", false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, isSuccess) {
  formMessage.textContent = message;
  formMessage.classList.remove("hidden");

  if (!isSuccess) {
    formMessage.classList.remove("bg-green-500/20", "text-green-500");
    formMessage.classList.add("bg-red-500/20", "text-red-500");
  } else {
    formMessage.classList.remove("bg-red-500/20", "text-red-500");
    formMessage.classList.add("bg-green-500/20", "text-green-500");
  }

  setTimeout(() => {
    if (isSuccess) {
      formMessage.classList.add("hidden");
    }
  }, 5000);
}

// Minimal scroll animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe only section titles with fade-in
const animatedElements = document.querySelectorAll(".fade-in");
animatedElements.forEach((element) => {
  observer.observe(element);
});
