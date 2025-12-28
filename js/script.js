  // MENU BLEND
  (function () {
    const $navbar = $(".navbar-blur");
    const header = $("header")[0];

    if (!$navbar.length || !header) return;

    function updateNavbarBlend() {
      const headerRect = header.getBoundingClientRect();
      const navbarRect = $navbar[0].getBoundingClientRect();

      const overlappingHeader =
        navbarRect.bottom > headerRect.top &&
        navbarRect.top < headerRect.bottom;

      if (overlappingHeader) {
        $navbar.addClass("navbar-on-header");
      } else {
        $navbar.removeClass("navbar-on-header");
      }
    }

    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateNavbarBlend();
      });
    }

    updateNavbarBlend();
    $(window).on("scroll", onScrollOrResize);
    $(window).on("resize", onScrollOrResize);
  })();

  (function () {
    const $offcanvas = $("#offcanvasNavbar");
    if (!$offcanvas.length) return;

    $offcanvas.on("show.bs.offcanvas", function () {
      $("body").addClass("offcanvas-open");
      $(window).trigger("scroll");
    });

    $offcanvas.on("hidden.bs.offcanvas", function () {
      $("body").removeClass("offcanvas-open");
      $(window).trigger("scroll");
    });
  })();



// PELOTEO HOME
// footer
$(function () {

  const $footer = $("footer");

  function setHeroHeight() {
    const footerHeight = $footer.outerHeight();
    document.documentElement.style.setProperty(
      "--footer-height",
      `${footerHeight}px`
    );
  }

  setHeroHeight();
  $(window).on("resize", setHeroHeight);

// animacion peloteo palabra
  const $loop = $("#heroLoop");
  if (!$loop.length) return;

  const loopWidth = $loop.outerWidth();

  gsap.set($loop, { x: 0 });

  gsap.to($loop, {
    x: -loopWidth / 2,
    duration: 60,     // lento, editorial
    ease: "none",
    repeat: -1
  });

});





// WORK
$(function () {
  const $cards = $(".archive-card");

  $cards.on("mouseenter", function () {
    $cards.removeClass("is-active");
    $(this).addClass("is-active");
  });

  $cards.on("mouseleave", function () {
    $(this).removeClass("is-active");
  });
});

