document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navShell = document.querySelector(".nav-shell");

    window.addEventListener("scroll", function () {

        if (!navShell) return;

        if (window.scrollY > 20) {

            navShell.style.background =
                "rgba(255,255,255,0.92)";

            navShell.style.boxShadow =
                "0 14px 40px rgba(0,0,0,0.08)";

        } else {

            navShell.style.background =
                "rgba(255,255,255,0.82)";

            navShell.style.boxShadow =
                "0 12px 34px rgba(0,0,0,0.08)";
        }

    });

    /* =========================
       HERO CAROUSEL
    ========================= */

    const heroCarousel =
        document.querySelector("#heroCarousel");

    if (heroCarousel) {

        new bootstrap.Carousel(heroCarousel, {

            interval: 4000,
            ride: "carousel",
            pause: false,
            wrap: true,
            touch: true

        });

        const indicators =
            document.querySelectorAll(
                ".hero-indicators button"
            );

        heroCarousel.addEventListener(
            "slid.bs.carousel",
            function (event) {

                indicators.forEach((btn, index) => {

                    btn.classList.remove("active");
                    btn.removeAttribute("aria-current");

                    if (index === event.to) {

                        btn.classList.add("active");
                        btn.setAttribute(
                            "aria-current",
                            "true"
                        );
                    }
                });
            }
        );
    }

    /* =========================
       REVEAL ANIMATION
    ========================= */

    const reveals =
        document.querySelectorAll(".reveal");

    function revealOnScroll() {

        const windowHeight =
            window.innerHeight;

        reveals.forEach((element) => {

            const elementTop =
                element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {

                element.classList.add("active");
            }

        });
    }

    revealOnScroll();

    window.addEventListener(
        "scroll",
        revealOnScroll
    );

});
