


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

  // OFFCANVAS → DESACTIVAR DIFFERENCE
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





