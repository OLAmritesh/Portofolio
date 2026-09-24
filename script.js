const navLinks = document.querySelectorAll(".nav-links");
const sections = document.querySelectorAll("main section[id]");

function setActiveLink() {
    let currentId = sections[0]?.id;

    sections.forEach((section) => {
        const top = section.offsetTop - 110;
        if (window.scrollY >= top) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nav === currentId);
    });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

const navbar = document.getElementById("navbar");

function handleNavbarShadow() {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 8px 20px #3d5d91";
    } else {
        navbar.style.boxShadow = "none";
    }
}

window.addEventListener("scroll", handleNavbarShadow);
handleNavbarShadow();

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Semua kolom wajib diisi ya.";
            formStatus.style.color = "#c0392b";
            return;
        }

        formStatus.textContent = "Terima kasih! Pesanmu sudah dicatat.";
        formStatus.style.color = "#3d5d91";
        contactForm.reset();
    });
}

const sayHiTriggers = document.querySelectorAll(".say-hi-trigger");
const sayHiPanel = document.getElementById("sayHiPanel");

sayHiTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        sayHiPanel.classList.toggle("is-open");
    });
});

document.addEventListener("click", (e) => {
    const clickedTrigger = [...sayHiTriggers].some((t) => t.contains(e.target));
    if (!sayHiPanel.contains(e.target) && !clickedTrigger) {
        sayHiPanel.classList.remove("is-open");
    }
});

const reactionButtons = document.querySelectorAll(".social-links .social-link[data-emoji]");
const reactionCountEl = document.getElementById("reactionCount");

function updateReactionCount() {
    const count = Number(localStorage.getItem("reactionCount") || 0);
    if (reactionCountEl) {
        reactionCountEl.textContent = count > 0 ? `${count} reaction` : "";
    }
}

reactionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const current = Number(localStorage.getItem("reactionCount") || 0);
        localStorage.setItem("reactionCount", current + 1);
        updateReactionCount();

        const original = btn.textContent;
        btn.textContent = "✓";
        setTimeout(() => { btn.textContent = original; }, 600);
    });
});

updateReactionCount();

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll(".nav-links").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("is-open");
        });
    });
}