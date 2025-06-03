const addToCartBtn = document.querySelectorAll('.add-to-cart');

const cartCount = document.querySelector(".cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  // sum all the quantities
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount;
  cartCount.style.display = totalCount > 0 ? "block" : "none";
}

function saveCart () {
  // save cart 
  // call updateCartCount
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}


// loop through all the add btns

function setupAddToCartButtons() {
addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const imgSrc = productCard.querySelector("img").getAttribute("src"); 
    // get item data from the button
    const item = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: parseFloat(e.target.dataset.price),
      quantity: 1,
      image: imgSrc
    }
    // check if item is already in the cart
    if(cart.some(cartItem => cartItem.id === item.id)) {
      // if it is, increase the quantity
      cart = cart.map(cartItem => {
        if (cartItem.id === item.id) {
          cartItem.quantity++;
        }
        return cartItem;
      })
    }
    else {
      // if not, add it to the cart
      cart.push(item);
    }
    // save the cart
    saveCart();
  })
})

}



// call updateCartCount on page load
updateCartCount();
// call setupAddToCartButtons to add event listeners
setupAddToCartButtons();