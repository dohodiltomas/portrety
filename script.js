document.addEventListener("DOMContentLoaded", function () {
  const navShell = document.querySelector(".nav-shell");
  const heroCarousel = document.querySelector("#heroCarousel");

  // Navbar glass effect při scrollu
  window.addEventListener("scroll", function () {
    if (navShell) {
      if (window.scrollY > 20) {
        navShell.style.background = "rgba(255,255,255,0.92)";
        navShell.style.boxShadow = "0 14px 40px rgba(0,0,0,0.08)";
      } else {
        navShell.style.background = "rgba(255,255,255,0.82)";
        navShell.style.boxShadow = "0 12px 34px rgba(0,0,0,0.08)";
      }
    }
  });

  // Bootstrap carousel init — jen jednou a správně
  if (heroCarousel) {
    const carousel = new bootstrap.Carousel(heroCarousel, {
      interval: 3500,
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
});

document.addEventListener("DOMContentLoaded", function () {

  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

  // spustí se hned při načtení
  revealOnScroll();
});
