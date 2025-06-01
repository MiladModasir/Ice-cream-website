// starts creating the flavoes array(name, img, description, price, id)

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
]

// Function to display flavors
function displayFlavors() {
const flavorsContainer = document.querySelector(".flavor-grid"); // typo fix

flavors.forEach(flavor => { // rename 'flavors' param to 'flavor'
  const flavorCard = document.createElement("div");
  flavorCard.className = "flavor-card";
  flavorCard.innerHTML = `
    <img src="${flavor.img}" alt="${flavor.name}">
    <h3>${flavor.name}</h3>
    <p>${flavor.description}</p>
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


// Call the function to display flavors
displayFlavors();

// cart setup 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalCount;
  cartCount.Style.disply = totalCount > 0 ? "block" : "none";
}

// Save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add event listener to flavor buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);
    const img = e.target.dataset.img;

    const item = {
      id,
      name,
      price,
      image: img,
      quantity: 1
    };

    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push(item);
    }

    saveCart();
  }
});

// Call once on load
updateCartCount();