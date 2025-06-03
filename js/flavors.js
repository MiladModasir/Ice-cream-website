// flavor.js

// Flavor data
const flavors = [
  {
    name: "Vanilla",
    img: "../assets/vanilla.jpg",
    description: "Classic vanilla ice cream with a creamy texture.",
    price: 3.50,
    id: 1
  },
  {
    name: "Chocolate",
    img: "../assets/Chocolate.jpg",
    description: "Rich chocolate ice cream made with real cocoa.",
    price: 3.75,
    id: 2
  },
  {
    name: "Strawberry",
    img: "../assets/strawberry.jpg",
    description: "Fresh strawberry ice cream with real fruit pieces.",
    price: 4.00,
    id: 3
  },
  {
    name: "Cookies and Cream",
    img: "../assets/cookies-and-cream.jpg",
    description: "Creamy vanilla ice cream with strawberry.",
    price: 4.50,
    id: 5
  }
];

// Render all flavors
function displayFlavors() {
  const flavorsContainer = document.querySelector(".flavor-grid");
  flavors.forEach(flavor => {
    const flavorCard = document.createElement("div");
    flavorCard.className = "flavor-card";
    flavorCard.innerHTML = `
      <img src="${flavor.img}" alt="${flavor.name}">
      <h3 class="flavor-name">${flavor.name}</h3>
      <p class="flavor-desc">${flavor.description}</p>
      <p>Price: $${flavor.price.toFixed(2)}</p>
      <button class="add-to-cart" 
              data-id="${flavor.id}" 
              data-name="${flavor.name}" 
              data-price="${flavor.price}" 
              data-img="${flavor.img}">
        Add to Cart
      </button>
    `;
    flavorsContainer.appendChild(flavorCard);
  });
}

// Update cart count bubble
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalCount;
  cartCount.style.display = totalCount > 0 ? "block" : "none";
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Setup listeners for "Add to Cart" buttons
function setupFlavorButtons() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = e.target.dataset.id;
      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);
      const img = e.target.dataset.img;

      const item = { id, name, price, image: img, quantity: 1 };
      const existing = cart.find(i => i.id === id);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push(item);
      }

      saveCart();
    }
  });
}

// Init
let cart = JSON.parse(localStorage.getItem("cart")) || [];
displayFlavors();
setupFlavorButtons();
updateCartCount();
