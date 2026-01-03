  // MENU BLEND
  (function () {
  const $navbar = $(".navbar-blur");
  const header = $("header").first()[0];

  if (!$navbar.length || !header) return;

  function updateNavbarBlend() {
    const headerRect = header.getBoundingClientRect();
    const navbarRect = $navbar[0].getBoundingClientRect();

    const isOnHeader =
      navbarRect.bottom > headerRect.top &&
      navbarRect.top < headerRect.bottom;

    $navbar.toggleClass("navbar-on-header", isOnHeader);
  }

  let ticking = false;

  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      updateNavbarBlend();
      ticking = false;
    });
  }

  updateNavbarBlend();
  $(window).on("scroll resize", onScrollOrResize);
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
    duration: 60,     
    ease: "none",
    repeat: -1
  });

});

const letters = document.querySelectorAll('#heroLoop span span');

letters.forEach(letter => {
  let vx = 0, vy = 0;
  let x = 0, y = 0;
  let rafId = null;
  let active = false;
  let returning = false;
  let lastTime = null;

  const origin = { x: 0, y: 0 };

  requestAnimationFrame(() => {
    origin.x = gsap.getProperty(letter, "x");
    origin.y = gsap.getProperty(letter, "y");
    x = origin.x;
    y = origin.y;
  });

  const bounds = {
    x: 80,
    yTop: -160
  };

const letters = document.querySelectorAll('#heroLoop span span');

letters.forEach(letter => {
  let vx = 0, vy = 0;
  let x = 0, y = 0;
  let rotation = 0;
  let scale = 1;
  let rafId = null;
  let active = false;
  let returning = false;
  let lastTime = null;

  const origin = { x: 0, y: 0 };

  requestAnimationFrame(() => {
    origin.x = gsap.getProperty(letter, "x");
    origin.y = gsap.getProperty(letter, "y");
    x = origin.x;
    y = origin.y;
  });

  const bounds = {
    x: 80,
    yTop: -160
  };

  function startPhysics() {
    if (active && !returning) return;

    active = true;
    returning = false;
    lastTime = null;

    vx = gsap.utils.random(-300, 300);
    vy = gsap.utils.random(-900, -600);

    if (!rafId) rafId = requestAnimationFrame(loop);
  }

  function loop(time) {
    if (!active) return;

    if (!lastTime) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    if (!returning) {
      vy += 2000 * dt;

      x += vx * dt;
      y += vy * dt;

      if (x > origin.x + bounds.x || x < origin.x - bounds.x) {
        vx *= -0.85;
        x = gsap.utils.clamp(origin.x - bounds.x, origin.x + bounds.x, x);
      }

      if (y > origin.y) {
        y = origin.y;
        vy *= -0.75;
        vx *= 0.96;
        if (Math.abs(vy) < 200) vy = gsap.utils.random(-700, -500);
      }

      if (y < origin.y + bounds.yTop) {
        y = origin.y + bounds.yTop;
        vy *= -0.8;
      }
    } else {
      vx += (origin.x - x) * 10 * dt;
      vy += (origin.y - y) * 10 * dt;
      vx *= 0.88;
      vy *= 0.88;

      x += vx * dt;
      y += vy * dt;

      if (
        Math.abs(x - origin.x) < 0.3 &&
        Math.abs(y - origin.y) < 0.3 &&
        Math.abs(vx) < 8 &&
        Math.abs(vy) < 8
      ) {
        active = false;
        cancelAnimationFrame(rafId);
        rafId = null;
        gsap.set(letter, { x: origin.x, y: origin.y, rotate: 0, scale: 1 });
        return;
      }
    }

    const speed = Math.sqrt(vx * vx + vy * vy);
    rotation += vx * 0.002;
    rotation *= returning ? 0.85 : 0.92;

    const targetScale = gsap.utils.clamp(0.95, 1.15, 1 + speed / 4000);
    scale += (targetScale - scale) * (returning ? 0.15 : 0.25);

    gsap.set(letter, { x, y, rotate: rotation, scale });

    rafId = requestAnimationFrame(loop);
  }

  function stopPhysics() {
    returning = true;
  }

  letter.addEventListener("mouseenter", startPhysics);
  letter.addEventListener("mouseleave", stopPhysics);
});


  function loop(time) {
    if (!active) return;

    if (!lastTime) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    if (!returning) {
      vy += 2000 * dt;

      x += vx * dt;
      y += vy * dt;

      if (x > origin.x + bounds.x) {
        x = origin.x + bounds.x;
        vx *= -0.85;
      } else if (x < origin.x - bounds.x) {
        x = origin.x - bounds.x;
        vx *= -0.85;
      }

      if (y > origin.y) {
        y = origin.y;
        vy *= -0.75;
        vx *= 0.96;

        if (Math.abs(vy) < 200) {
          vy = gsap.utils.random(-700, -500);
        }
      }

      if (y < origin.y + bounds.yTop) {
        y = origin.y + bounds.yTop;
        vy *= -0.8;
      }
    }

    else {
      vx += (origin.x - x) * 10 * dt;
      vy += (origin.y - y) * 10 * dt;
      vx *= 0.88;
      vy *= 0.88;

      x += vx * dt;
      y += vy * dt;

      if (
        Math.abs(x - origin.x) < 0.3 &&
        Math.abs(y - origin.y) < 0.3 &&
        Math.abs(vx) < 8 &&
        Math.abs(vy) < 8
      ) {
        active = false;
        cancelAnimationFrame(rafId);
        rafId = null;
        gsap.set(letter, { x: origin.x, y: origin.y });
        return;
      }
    }

    gsap.set(letter, { x, y });
    rafId = requestAnimationFrame(loop);
  }

  function stopPhysics() {
    returning = true;
  }

  letter.addEventListener("mouseenter", startPhysics);
  letter.addEventListener("mouseleave", stopPhysics);
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

$(".archive-card").on("click", function () {
  window.location.href = $(this).data("link");
});

// PROJECT
$(function () {

  const preview = document.querySelector(".project-preview");
  const img = preview.querySelector("img");

  const xTo = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3" });

  $(".project-menu li").on("mouseenter", function () {
    img.src = $(this).data("img");
    gsap.to(preview, { opacity: 1, duration: 0.2 });
  });

  $(".project-menu li").on("mouseleave", function () {
    gsap.to(preview, { opacity: 0, duration: 0.2 });
  });

  $(window).on("mousemove", e => {
    xTo(e.clientX + 20);
    yTo(e.clientY + 20);
  });

});

$(function () {
  const params = new URLSearchParams(window.location.search);
  const project = params.get("project");

  if (!project) return;

  $(".project-content").load(`projects/${project}.html`);
});



$(document).ready(function () {

  const isMobile = window.innerWidth <= 767;

  $(document).on("click", "[data-target], [data-project]", function () {
    const target =
      $(this).data("target") ||
      $(this).data("project");

    if (!target) return;


    if (isMobile) {
      $("body").addClass("project-open");

      $(".project-mobile-menu").hide();
      $(".project-content, .project-mobile-content")
        .empty()
        .load(target, function () {
          $(this).scrollTop(0);
        });

    } else {
      $(".project-content")
        .stop(true)
        .fadeOut(200, function () {
          $(this).load(target, function () {
            $(this).fadeIn(200);
          });
        });
    }
  });

  /* ======================
     BOTÓN BACK (MOBILE)
  ====================== */
$(document).on("click", ".project-back", function () {
  $("body").removeClass("project-open");
  $(".project-content").empty();
});


});













