document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navShell = document.querySelector(".nav-shell");

    window.addEventListener("scroll", function () {
        if (!navShell) return;

        if (window.scrollY > 20) {
            navShell.style.background = "rgba(255,255,255,0.92)";
            navShell.style.boxShadow = "0 14px 40px rgba(0,0,0,0.08)";
        } else {
            navShell.style.background = "rgba(255,255,255,0.82)";
            navShell.style.boxShadow = "0 12px 34px rgba(0,0,0,0.08)";
        }
    });

    /* =========================
       HERO CAROUSEL
    ========================= */

    const heroCarousel = document.querySelector("#heroCarousel");

    if (heroCarousel && window.bootstrap) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 4000,
            ride: "carousel",
            pause: false,
            wrap: true,
            touch: true
        });

        const indicators = document.querySelectorAll(".hero-indicators button");

        heroCarousel.addEventListener("slid.bs.carousel", function (event) {
            indicators.forEach((btn, index) => {
                btn.classList.remove("active");
                btn.removeAttribute("aria-current");

                if (index === event.to) {
                    btn.classList.add("active");
                    btn.setAttribute("aria-current", "true");
                }
            });
        });
    }

    /* =========================
       REVEAL ANIMATION
    ========================= */

    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                element.classList.add("active");
            }
        });
    }

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll, { passive: true });

    /* =========================
       PORTRAIT LIQUID GALLERY
       Fotografie jednotlivých galerií měň v tomto objektu.
    ========================= */

    const photoGalleries = {
        hynek: {
            title: "Hynek",
            photos: [
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Hynek-5.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Hynek-2.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Hynek-9.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Hynek-8.jpg?ver=0",
               
            ]
        },
        foceni2: {
            title: "Amálka",
            photos: [
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_3389.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_3261_2.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Untitled_4.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_3238.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Untitled-2_3.jpg?ver=0"
            ]
        },
        foceni3: {
            title: "Sabča",
            photos: [
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_0917.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_0256.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_1365.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_0795.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/IMG_0347.jpg?ver=0"
            ]
        },
        foceni4: {
            title: "Anička",
            photos: [
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Untitled-19.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Untitled-16.jpg?ver=0",
                "https://img43.rajce.idnes.cz/d4302/19/19864/19864657_681ea3faf3f983f24a2ae4b5e2a65928/images/Untitled_5.jpg?ver=0",
               
            ]
        }
    };

    const gallery = document.querySelector("#liquidGallery");
    const galleryPanel = gallery?.querySelector(".liquid-gallery-panel");
    const galleryTitle = document.querySelector("#liquidGalleryTitle");
    const mainImage = document.querySelector("#liquidMainImage");
    const counter = document.querySelector("#liquidCounter");
    const progress = document.querySelector("#liquidProgress");
    const closeButton = document.querySelector("#liquidClose");
    const previousButton = document.querySelector("#liquidPrev");
    const nextButton = document.querySelector("#liquidNext");
    const photoStage = document.querySelector("#liquidPhotoStage");
    const galleryCards = document.querySelectorAll(".portrait-preview");

    let activePhotos = [];
    let activeIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = 0;
    let touchStartY = 0;

    function updateGalleryPhoto() {
        if (!activePhotos.length) return;

        const nextSrc = activePhotos[activeIndex];
        mainImage.classList.add("is-changing");

        const preload = new Image();

        preload.onload = function () {
            mainImage.src = nextSrc;
            mainImage.alt = `${galleryTitle.textContent} – fotografie ${activeIndex + 1}`;
            mainImage.classList.remove("is-changing");
        };

        preload.onerror = function () {
            mainImage.src = nextSrc;
            mainImage.alt = "Fotografii se nepodařilo načíst";
            mainImage.classList.remove("is-changing");
        };

        preload.src = nextSrc;

        counter.textContent = `${activeIndex + 1} / ${activePhotos.length}`;
        progress.style.width = `${((activeIndex + 1) / activePhotos.length) * 100}%`;

        const showNavigation = activePhotos.length > 1;
        previousButton.hidden = !showNavigation;
        nextButton.hidden = !showNavigation;
    }

    function openGallery(galleryName) {
        const selectedGallery = photoGalleries[galleryName];

        if (!selectedGallery || !selectedGallery.photos.length) return;

        activePhotos = selectedGallery.photos;
        activeIndex = 0;
        lastFocusedElement = document.activeElement;

        galleryTitle.textContent = selectedGallery.title;
        gallery.classList.add("is-open");
        gallery.setAttribute("aria-hidden", "false");
        document.body.classList.add("gallery-open");

        updateGalleryPhoto();
        closeButton.focus();
    }

    function closeGallery() {
        if (!gallery.classList.contains("is-open")) return;

        gallery.classList.remove("is-open");
        gallery.setAttribute("aria-hidden", "true");
        document.body.classList.remove("gallery-open");

        if (lastFocusedElement) lastFocusedElement.focus();
    }

    function showNextPhoto() {
        if (activePhotos.length < 2) return;
        activeIndex = (activeIndex + 1) % activePhotos.length;
        updateGalleryPhoto();
    }

    function showPreviousPhoto() {
        if (activePhotos.length < 2) return;
        activeIndex = (activeIndex - 1 + activePhotos.length) % activePhotos.length;
        updateGalleryPhoto();
    }

    galleryCards.forEach((card) => {
        card.addEventListener("click", () => {
            openGallery(card.dataset.gallery);
        });
    });

    closeButton.addEventListener("click", closeGallery);
    gallery.querySelectorAll("[data-gallery-close]").forEach((element) => {
        element.addEventListener("click", closeGallery);
    });

    nextButton.addEventListener("click", showNextPhoto);
    previousButton.addEventListener("click", showPreviousPhoto);

    document.addEventListener("keydown", (event) => {
        if (!gallery.classList.contains("is-open")) return;

        if (event.key === "Escape") closeGallery();
        if (event.key === "ArrowRight") showNextPhoto();
        if (event.key === "ArrowLeft") showPreviousPhoto();
    });

    // Swipe ovládání na telefonech a tabletech.
    photoStage.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    photoStage.addEventListener("touchend", (event) => {
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaY = event.changedTouches[0].clientY - touchStartY;

        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
            if (deltaX < 0) showNextPhoto();
            else showPreviousPhoto();
        }
    }, { passive: true });

    // Zavření klávesou Tab zůstává uvnitř otevřené galerie.
    galleryPanel.addEventListener("keydown", (event) => {
        if (event.key !== "Tab") return;

        const focusable = galleryPanel.querySelectorAll(
            'button:not([hidden]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

});
