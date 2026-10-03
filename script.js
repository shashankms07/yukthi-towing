/* =========================================
   YUKTHI TOWING SERVICES
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");


// Open / close mobile menu

menuBtn.addEventListener("click", function () {

    nav.classList.toggle("active");

});


// Close menu when a link is clicked

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("active");

    });

});