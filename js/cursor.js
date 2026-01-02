document.addEventListener("DOMContentLoaded", () => {
  const ball = document.querySelector(".cursor-ball");
  if (!ball || !window.gsap) return;

  const moveX = gsap.quickTo(ball, "x", {
    duration: 0.3,
    ease: "power3.out"
  });
  const moveY = gsap.quickTo(ball, "y", {
    duration: 0.3,
    ease: "power3.out"
  });

  window.addEventListener("mousemove", (e) => {
    moveX(e.clientX);
    moveY(e.clientY);
  });
});
