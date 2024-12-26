// Created by Leo on 2024-08-29


// Defines an array to store information about the items in the shopping cart. Each item is an object containing attributes such as the item name, price, and quantity
let cart = [];


// Function: Adds the item to the cart
function addToCart(productName, price) {
  // Find an item with the same name in the shopping cart array
  let existingProduct = cart.find(item => item.name === productName);
  if (existingProduct) {
    // If the item already exists, increase its quantity by 1
    existingProduct.quantity++;
  } else {
    // If the item does not exist, create a new item object and add it to the shopping cart array with the initial number set to 1
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  // Update the shopping cart display on the page
  updateCartDisplay();
}


// Function: Removes the specified item from the cart
function removeFromCart(productName) {
  cart = cart.filter(item => item.name!== productName);
  updateCartDisplay();
}

// Function: Update the contents of the shopping cart displayed on the page
function updateCartDisplay() {
  const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
  cartTableBody.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const row = cartTableBody.insertRow();
    const productCell = row.insertCell(0);
    const quantityCell = row.insertCell(1);
    const priceCell = row.insertCell(2);
    const actionCell = row.insertCell(3);
    productCell.textContent = item.name;
    quantityCell.textContent = item.quantity;
    priceCell.textContent = `$${item.price * item.quantity}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFromCart(item.name));
    actionCell.appendChild(removeButton);
    total += item.price * item.quantity;
  });
  document.getElementById('totalPrice').textContent = `Total Price: $${total}`;
}

// Function: Simulate checkout operation, currently only pop-up prompt box to indicate checkout completion, and empty the cart
function checkout() {
  alert('Checkout completed.');
  cart = [];
  updateCartDisplay();
}

function clearCart() {
  cart = [];
  updateCartDisplay();
}


// Get all button elements on the page with the.addButton class and add a click event listener for each button
document.querySelectorAll('.addButton').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.getAttribute('data-product');
    const price = parseFloat(this.getAttribute('data-price'));
    addToCart(productName, price);
  });
});


document.getElementById('checkoutButton').addEventListener('click', checkout);
document.getElementById('clearCartButton').addEventListener('click', clearCart);

