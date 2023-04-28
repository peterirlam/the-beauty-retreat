/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId) /* toggle = hamburger */,
    nav = document.getElementById(navId); /* navId = entire navbar menu */

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class.
      // mob menu hidden (top: -100%) and show-menu adds a height of 3rem
      nav.classList.toggle("show-menu");
    });
  }
};
/* pass in 'hamburger' (nav-toggle) and full navbar links */
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MOBILE MENU ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class (which hides mobile menu: height -100%)
  navMenu.classList.remove("show-menu");
}
// Add event listener to eadh li
navLink.forEach((e) => e.addEventListener("click", linkAction));

/*========= SCROLL SECTIONS ACTIVE LINK (sections scrolled into view will have the active link styling added to mobile menu)=========*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  // pageYOffset rtns number of px a document has scrolled from upper left corner
  const scrollY = window.pageYOffset;

  sections.forEach((element) => {
    // offsetHeight rtns height of section (content, padding & border)
    const sectionHeight = element.offsetHeight;
    const sectionTop = element.offsetTop - 50;
    sectionId = element.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== ADD BOX SHADOW TO HEADER ON SCROLL ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag (box-shadow)
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header"); /* box-shadow */
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP (Box Icon) ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class (visibility: hidden to visible)
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button"); /* html 36 */
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Retrieving data -
// Previously selected theme (if user selected). Get items from local storage & rtns val as str
// either 'dark' or 'light'. Now goto if statement!
const selectedTheme =
  localStorage.getItem(
    "selected-theme"
  ); /* takes one param: key & rtns value ('dark') */
const selectedIcon = localStorage.getItem("selected-icon");

// We return the current theme & icon using contains() and ternary operator. If user clicks
// moon, then getCurrentTheme rtns 'dark' to setItem
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a theme
if (selectedTheme) {
  /* if 'dark' add dark theme so user pref persists */
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  ); /* var 69 */
  // document.body.classList.add('dark-theme'). So returning use has their theme pref saved and rendered
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme); /* scss 68 */
  themeButton.classList.toggle(iconTheme);
  // Save theme & current icon that user chose as key/value pairs in localStorage
  localStorage.setItem("selected-theme", getCurrentTheme());
  // evals to setItems('selected-theme', 'dark')
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

sr.reveal(
  `.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .treatment__content,
            .contact__data, .contact__button,
            .footer__content`,
  {
    interval: 200,
  }
);

/*=============== SET FOOTER COPYRIGHT TO CURRENT YEAR ============*/
const year = document.querySelector(".year");
const currentYear = new Date().getFullYear();
year.textContent = currentYear;
