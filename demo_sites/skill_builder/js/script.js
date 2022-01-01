const favoriteIcons = document.querySelectorAll(".add-favorite-icon");

for (let favoriteIcon of favoriteIcons) {
  favoriteIcon.addEventListener("click", function () {
    favoriteIcon.classList.toggle("text-primary");
    favoriteIcon.classList.toggle("text-danger");

    console.log("pressed");
  });
}

const menuBtn = document.querySelector(".navigation__button");
const menuBg = document.querySelector(".navigation__background");
const mainMenu = document.querySelector(".navigation__nav");
const menuIcon = document.querySelector(".menu_icon");
const navLinks = document.querySelectorAll(".navigation__link");

menuBtn.addEventListener("click", function () {
  menuBg.classList.toggle("background-scale");
  mainMenu.classList.toggle("navigation__nav__width");
  menuIcon.classList.toggle("fa-times");
  menuIcon.classList.toggle("text-danger");
  menuIcon.classList.toggle("fa-bars");
});

for (const navLink of navLinks) {
  navLink.addEventListener("click", function () {
    menuBg.classList.remove("background-scale");
    mainMenu.classList.remove("navigation__nav__width");
  });
}

const warningClose = document.querySelector(".warning-close");
const warningText = document.querySelector(".warning-text");

warningClose.addEventListener("click", function () {
  warningText.classList.add("d-none");
});

const htmlCousrePopup = document.getElementById("html-popup");
const popupClose = document.querySelector(".popup-close");
const htmlCourse = document.getElementById("html-course");

popupClose.addEventListener("click", function () {
  htmlCousrePopup.classList.add("d-none");
});

htmlCourse.addEventListener("click", function () {
  htmlCousrePopup.classList.remove("d-none");
});
