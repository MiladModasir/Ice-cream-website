// cart.js
let cart = [];
let currentTotal = 0;
let promoApplied = false;

const savedCart = localStorage.getItem("cart");
if (savedCart) {
  cart = JSON.parse(savedCart);
}

const cartContainer = document.querySelector(".cart-items");
const totalDisplay = document.getElementById("cart-total");

function renderCart() {
  cartContainer.innerHTML = "";
  currentTotal = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🍦</p>";
    totalDisplay.textContent = "0.00";
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="quantity-decrease" data-id="${item.id}">-</button>
          <input type="number" value="${item.quantity}" readonly />
          <button class="quantity-increase" data-id="${item.id}">+</button>
        </div>
        <button class="delete-btn" data-id="${item.id}">🗑️</button>
      </div>
    `;

    currentTotal += item.price * item.quantity;
    cartContainer.appendChild(cartItem);
  });

  totalDisplay.textContent = currentTotal.toFixed(2);
}

function setupCartContainer(){
  cartContainer.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("quantity-increase")) {
      cart = cart.map(item => {
        if (item.id === id) item.quantity = Number(item.quantity) + 1;
        return item;
      });
    }

    if (e.target.classList.contains("quantity-decrease")) {
      cart = cart.map(item => {
        if (item.id === id) item.quantity = Number(item.quantity) - 1;
        return item;
      }).filter(item => item.quantity > 0);
    }

    if (e.target.classList.contains("delete-btn")) {
      cart = cart.filter(item => item.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  const applyBtn = document.getElementById("apply-promo");
  applyBtn.addEventListener("click", () => {
    if (promoApplied) return alert("Promo already applied!");

    const code = document.getElementById("promo-code").value.trim().toUpperCase();

    if (code === "SWEET10") {
      const discounted = currentTotal * 0.9;
      totalDisplay.textContent = discounted.toFixed(2);
      alert("Promo code applied! You saved 10%.");
      promoApplied = true;
    } else {
      alert("Invalid promo code");
    }
  });
}

function init() {
  renderCart();
  setupCartContainer();
}

init();
