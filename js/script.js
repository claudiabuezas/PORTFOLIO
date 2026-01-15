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


// PELOTEO HOME

(() => {
  const letters = document.querySelectorAll("#heroLoop span span");
  if (!letters.length || !window.gsap) return;

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

    const bounds = { x: 80, yTop: -160 };

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

    letter.addEventListener("mouseenter", startPhysics);
    letter.addEventListener("mouseleave", () => (returning = true));
  });
})();








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
$(document).ready(function () {
  const isMobile = window.innerWidth <= 767;



  const $preview = $(".project-preview");
  const $previewImg = $(".project-preview img");

  if (!isMobile) {
    $(".project-link").on("mouseenter", function () {
      const imgSrc = $(this).data("img");
      if (!imgSrc) return;

      $previewImg.attr("src", imgSrc);

      gsap.to($preview, {
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    $(".project-link").on("mouseleave", function () {
      gsap.to($preview, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    $(document).on("mousemove", function (e) {
      gsap.to($preview, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }


  $(document).on("click touchstart", "[data-target], [data-project]", function () {
    const target = $(this).data("target") || $(this).data("project");
    if (!target) return;

    gsap.to($preview, {
      autoAlpha: 0,
      duration: 0.2
    });

    if (isMobile) {
      $("body").addClass("project-open");

      $(".project-content")
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

  $(document).on("click", ".project-back", function () {
    $("body").removeClass("project-open");
    $(".project-content").empty();

    gsap.to($preview, {
      autoAlpha: 0,
      duration: 0.2
    });
  });

});



// ARCHIVE 

document.addEventListener("DOMContentLoaded", () => {
  const btnExp = document.querySelector(".btn-exp");
  const btnGrid = document.querySelector(".btn-view");
  const viewExp = document.getElementById("EXPERIENCE_VIEW");
  const viewGrid = document.getElementById("GRID_VIEW");

  if (!btnExp || !btnGrid || !viewExp || !viewGrid) return;

  function setView(view, setActive = true) {
    const showExperience = view === "experience";

    viewExp.hidden = !showExperience;
    viewGrid.hidden = showExperience;

    if (!setActive) {
      btnExp.classList.remove("active");
      btnGrid.classList.remove("active");
      return;
    }

    btnExp.classList.toggle("active", showExperience);
    btnGrid.classList.toggle("active", !showExperience);
  }

  setView("experience");

  btnExp.addEventListener("click", (e) => {
    e.preventDefault();
    setView("experience");
  });

  btnGrid.addEventListener("click", (e) => {
    e.preventDefault();
    setView("grid");
  });
});

// Imagenes arrastradas

document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector("#EXPERIENCE_VIEW .stage");
  if (!stage) return;

  const imgs = gsap.utils.toArray("img.draggable", stage);
  let z = 1;

  function placeRandom() {
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    const GAP = 120;
    const placed = [];

    imgs.forEach(img => {
      const w = img.offsetWidth;
      const h = img.offsetHeight;

      let x, y, ok = false;

      for (let i = 0; i < 300 && !ok; i++) {
        x = Math.random() * (W - w);
        y = Math.random() * (H - h);

        ok = placed.every(p =>
          x + w + GAP < p.x ||
          p.x + p.w + GAP < x ||
          y + h + GAP < p.y ||
          p.y + p.h + GAP < y
        );
      }

      gsap.set(img, { x, y, position: "absolute" });
      placed.push({ x, y, w, h });
    });
  }

  Promise.all(
    imgs.map(img => img.decode ? img.decode().catch(() => {}) : Promise.resolve())
  ).then(placeRandom);

  imgs.forEach(img => {
    Draggable.create(img, {
      type: "x,y",
      bounds: stage,
      inertia: false,
      onPress() {
        this.target.style.zIndex = ++z;
      }
    });
  });

  window.addEventListener("resize", placeRandom);
});


