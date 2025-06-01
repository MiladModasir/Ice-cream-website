const form = document.querySelector(".contact-form");
const confirmation = document.querySelector(".confirmation-message")

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const nameInput = form.querySelector("input[type = 'text']");
  const userName = nameInput.value.trim() || "there";
  confirmation.innerHTML = `Thank you for your message, ${userName}! We will get back to you soon.`;
  confirmation.classList.add("visible");
  form.reset();
  });