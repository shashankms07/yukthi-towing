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

/* =========================================
   TESTIMONIALS SLIDER
========================================= */

(function () {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsWrap = document.getElementById('sliderDots');
    const slider = document.getElementById('testimonialSlider');

    if (!track || !prevBtn || !nextBtn || !dotsWrap || !slider) return;

    const cards = Array.from(track.children);
    let index = 0;
    let autoplayId = null;

    function getPerView() {
        if (window.innerWidth <= 650) return 1;
        if (window.innerWidth <= 1000) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, cards.length - getPerView());
    }

    function buildDots() {
        dotsWrap.innerHTML = '';
        const pages = maxIndex() + 1;
        for (let i = 0; i < pages; i++) {
            const b = document.createElement('button');
            b.setAttribute('aria-label', 'Go to review ' + (i + 1));
            if (i === index) b.classList.add('active');
            b.addEventListener('click', () => {
                index = i;
                update();
                restartAutoplay();
            });
            dotsWrap.appendChild(b);
        }
    }

    function updateDots() {
        const dots = dotsWrap.querySelectorAll('button');
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function update() {
        if (index < 0) index = 0;
        if (index > maxIndex()) index = maxIndex();

        const style = getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap) || 0;
        const cardW = cards[0].getBoundingClientRect().width;
        const offset = index * (cardW + gap);

        track.style.transform = `translateX(${-offset}px)`;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === maxIndex();

        updateDots();
    }

    function next() {
        if (index >= maxIndex()) index = 0;
        else index++;
        update();
    }

    function prev() {
        if (index <= 0) index = maxIndex();
        else index--;
        update();
    }

    prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
    nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });

    /* autoplay */
    function startAutoplay() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        autoplayId = setInterval(next, 5000);
    }
    function stopAutoplay() { clearInterval(autoplayId); }
    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    /* swipe */
    let startX = 0;
    let dragging = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        dragging = true;
        stopAutoplay();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        if (!dragging) return;
        dragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50) prev();
        else if (diff < -50) next();
        startAutoplay();
    });

    /* resize */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            index = Math.min(index, maxIndex());
            buildDots();
            update();
        }, 150);
    });

    /* init */
    buildDots();
    update();
    startAutoplay();
})();