const addBtn = document.querySelectorAll(".add-btn");
const scoopList = document.querySelector(".scoop-list");
const totalScoopDisplay = document.querySelector("#scoop-count");
const totalPriceDisplay = document.querySelector("#price-total");
const cards = document.querySelectorAll('.flavor-card');
const popup = document.getElementById('flavor-popup');
const popupImg = document.getElementById('popup-img');
const popupTitle = document.getElementById('popup-title');
const popupDesc = document.getElementById('popup-desc');
const closeBtn = document.getElementById('close-popup');



// loop through all the add buttons
let sundrea = []

addBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // grab the flavoe name
    const flavorName = btn.getAttribute("data-flavor");
    // check if the flavor is already in the sundrea array
    if(sundrea.includes(flavorName)) {
      alert("You already have this flavor in your sundrea!");
      return;
    }
    sundrea.push(flavorName);
    renderSundea();
  });
});
const placeOrderbtn = document.querySelector(".place-order-btn");

placeOrderbtn.addEventListener("click", (e) => {
  if (sundrea.length === 0) {
    e.preventDefault();
    alert("Your sundea is empty!");
    return;
  }

  // If sundrea has items
  e.preventDefault(); 

  setTimeout(() => {
    window.location.href = "order.html"; 
  }, 1500); 
});

    

function renderSundea() {
  // 
  scoopList.innerHTML = ""
  // loop through the sundrea array
  sundrea.forEach((flavor) => {
    // update total scoop and price
    const scoop = document.createElement("li");
    // add a click event to each li
    scoop.addEventListener("click", () =>{
      // on the click get flavor text or use use
      // use .splice() to remove is from sundea
      // call renderSundea() again
      const flavorText = scoop.innerText;
      const index = sundrea.indexOf(flavorText);
      if(index > -1) {
        sundrea.splice(index, 1);
      }
      renderSundea();
    })
    scoop.innerText = flavor;
    scoopList.appendChild(scoop);
  })
  // Calculate scoop count and total price
  const scoopCount = sundrea.length;
  const totalPrice = scoopCount * 3;
  // Update the DOM
  totalScoopDisplay.textContent = scoopCount;
  totalPriceDisplay.textContent = totalPrice.toFixed(2);
  saveSunrdea();
}

// save to local storage
// everyTime rederSundea runs save sundear to local storage
function saveSunrdea () {
  localStorage.setItem("sundrea", JSON.stringify(sundrea));
}

function loadSundrea() {
  const sundreaData = localStorage.getItem("sundrea");
  if(sundreaData) {
    sundrea = JSON.parse(sundreaData);
    renderSundea();
  }
}


// clear sundea btn 
// create a clear Sundea 
// on click empty the sundrea arry
// clear is from local storage 
// call renderSundea() to update Ui

const clearBtn = document.querySelector("#clear-sundea");
clearBtn.addEventListener("click", () => {
  sundrea = [];
  localStorage.removeItem("sundrea");
  renderSundea();
});

cards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img').src;
    const name = card.querySelector('.flavor-name').textContent;
    const desc = card.querySelector('.flavor-desc').textContent;

    popupImg.src = img;
    popupImg.alt = name;
    popupTitle.textContent = name;
    popupDesc.textContent = desc;
    popup.classList.remove('hidden');
  });
});

// Close popup when clicking the overlay
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});

// Close popup with ❌ button
closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});




loadSundrea();


