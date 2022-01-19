const navIcons = document.querySelectorAll('.nav-icon');
const sections = document.querySelectorAll('section');
const navList = document.querySelector('.nav-list');
const moreBtn = document.querySelector('.more-btn');
const footer = document.querySelector('footer');

// smooth scrolling on nav-item click
navList.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('nav-link')) {
        const id = e.target.parentElement.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// more about me button action
moreBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Intersection observer options
const options = {
    root: null,
    threshold: 0.1,
};

// Intersection observer function
const activeNav = function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        navIcons.forEach((icon) => {
            // Romove active Class
            icon.classList.remove('nav-active');
            // Add active Class
            if (entry.target.id === icon.dataset.nav) {
                icon.classList.add('nav-active');
            }
        });
    }
};

// Intersection observer
const observer = new IntersectionObserver(activeNav, options);
sections.forEach((section) => {
    observer.observe(section);
});

// remove loader after everything load
window.addEventListener('load', function () {
    document.querySelector('.loader__box').remove();
});
