const form = document.querySelector(".order-form");
const confirmation = document.querySelector(".confirmation");


form.addEventListener("submit", function (e) {
  e.preventDefault();

  form.style.display = "none";
  confirmation.classList.remove("hidden");

  // Optionally: trigger confetti or emoji effects
  confettiEffect();
});

// Optional: Confetti 🎉
function confettiEffect() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  const colors = ["#bb0000", "#ffffff", "#ff69b4"];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
