const navIcons = document.querySelectorAll('.nav-icon');
const sections = document.querySelectorAll('section');
const navList = document.querySelector('.nav-list');
const moreBtn = document.querySelector('.more-btn');
const footer = document.querySelector('footer');

navList.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('nav-link')) {
        const id = e.target.parentElement.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

moreBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

const options = {
    root: null,
    threshold: 0.1,
};

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

const observer = new IntersectionObserver(activeNav, options);
sections.forEach((section) => {
    observer.observe(section);
});
