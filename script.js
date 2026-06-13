/*---- DARK MODE TOGGLE ----*/
const themeToggles = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);
loadStars(savedTheme);

themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
        loadStars(next);
    });
});

function updateIcon(theme) {
    themeToggles.forEach(btn => {
        btn.innerHTML = theme === 'dark'
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon"></i>';
    });
}

/* ---- STARS BACKGROUND ---- */
function loadStars(theme) {
    tsParticles.load("stars", {
        background: { color: { value: "transparent" } },
        particles: {
            number:  { value: 120, density: { enable: true } },
            color: {
                value: theme === 'dark'
                    ? ["#ffffff", "#ffddaa", "#ffeedd"]
                    : ["#ff6b00", "#ffaa66", "#e75f00"]
            },
            shape:   { type: "circle" },
            opacity: {
                value: { min: 0.5, max: theme === 'dark' ? 0.8 : 0.6 },
                animation: { enable: true, speed: 0.5, sync: false }
            },
            size: {
                value: { min: 1, max: theme === 'dark' ? 2.5 : 3.5 },
                animation: { enable: true, speed: 0.5, sync: false }
            },
            move: {
                enable:    true,
                speed:     0.3,
                direction: "none",
                random:    true,
                outModes:  { default: "out" }
            }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" }
            },
            modes: {
                grab: { distance: 100, links: { opacity: 0.2 } }
            }
        }
    });
}

/* ---- SLIDER ---- */
const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active-slide"));
    slides[index].classList.add("active-slide");
}

document.querySelector(".next").onclick = () => {
    current++;
    if (current >= slides.length) current = 0;
    showSlide(current);
};

document.querySelector(".prev").onclick = () => {
    current--;
    if (current < 0) current = slides.length - 1;
    showSlide(current);
};

setInterval(() => {
    current++;
    if (current >= slides.length) current = 0;
    showSlide(current);
}, 4000);

/* ---- SCROLL REVEAL ---- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));