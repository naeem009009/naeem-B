// Theme toggle and admin panel behavior
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const adminPanel = document.getElementById('adminPanel');
const adminPanelBtn = document.getElementById('adminPanelBtn');
const adminText = document.getElementById('adminText');
const adminTag = document.getElementById('adminTag');
const saveTextBtn = document.getElementById('saveTextBtn');
const saveTagBtn = document.getElementById('saveTagBtn');
const heroCopy = document.querySelector('.hero-copy');
const heroTitle = document.querySelector('.hero-title');
const contactForm = document.getElementById('contactForm');

function initTheme() {
  const savedTheme = localStorage.getItem('portfolioTheme');
  const theme = savedTheme || 'light';
  body.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = nextTheme;
  localStorage.setItem('portfolioTheme', nextTheme);
  themeToggle.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
}

function showAdminPanel() {
  adminPanel.scrollIntoView({ behavior: 'smooth' });
  adminPanel.setAttribute('aria-hidden', 'false');
}

function updateTextContent() {
  heroCopy.textContent = adminText.value;
  heroTitle.textContent = adminTag.value;
}

function loadAdminStorage() {
  const savedCopy = localStorage.getItem('heroCopyText');
  const savedTag = localStorage.getItem('heroTitleText');

  if (savedCopy) {
    adminText.value = savedCopy;
    heroCopy.textContent = savedCopy;
  }
  if (savedTag) {
    adminTag.value = savedTag;
    heroTitle.textContent = savedTag;
  }
}

themeToggle.addEventListener('click', toggleTheme);
adminPanelBtn.addEventListener('click', showAdminPanel);
saveTextBtn.addEventListener('click', () => {
  const value = adminText.value.trim();
  localStorage.setItem('heroCopyText', value);
  updateTextContent();
});
saveTagBtn.addEventListener('click', () => {
  const value = adminTag.value.trim();
  localStorage.setItem('heroTitleText', value);
  updateTextContent();
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks for reaching out! This is a demo contact form.');
  contactForm.reset();
});

window.addEventListener('load', () => {
  initTheme();
  loadAdminStorage();
  startTypingEffect();
});

const typingWords = ['Student', 'Developer', 'Learner'];
let typingIndex = 0;
let charIndex = 0;
let typingForward = true;

function startTypingEffect() {
  const baseText = heroTitle;
  const currentWord = typingWords[typingIndex];

  if (typingForward) {
    baseText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentWord.length) {
      typingForward = false;
      setTimeout(startTypingEffect, 1200);
      return;
    }
  } else {
    baseText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      typingForward = true;
      typingIndex = (typingIndex + 1) % typingWords.length;
    }
  }

  setTimeout(startTypingEffect, typingForward ? 120 : 60);
}

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.skill-bar span');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.style.getPropertyValue('--value');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

progressBars.forEach((bar) => observer.observe(bar));

// Smooth scroll highlight effect
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});
