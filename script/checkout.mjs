import {
  addToCart,
  clearCart,
  getTotalNumberOfItemsInCart,
  removeFromCart,
} from './utilitys/cart.mjs';
import { formatCurrency } from './utilitys/formatCurrency.mjs';


const clearCartButton = document.getElementById('clear-cart');
clearCartButton.classList.add('button');
clearCartButton.addEventListener('click', () => {
  clearCart();
  renderCheckoutPage();
});

function generateHtmlForJacket(jacket) {
  const jacketWrapper = document.createElement('div');

  const jacketTitle = document.createElement('h3');
  jacketTitle.textContent = jacket.title;

  const jacketQuantity = document.createElement('p');
  jacketQuantity.textContent = 'Quantity: ' + jacket.quantity;

  const jacketImageContainer = document.createElement('img');
  jacketImageContainer.src = jacket.image.url;
  jacketImageContainer.alt = jacket.image.alt;

  

  const jacketPrice = document.createElement('p');
  jacketPrice.textContent = 'Price: ' + jacket.price;


  const jacketPriceTotal = document.createElement('p');
  jacketPriceTotal.textContent =
    'Total: ' + formatCurrency(jacket.price * jacket.quantity);

  const quantityAdjustmentContainer = document.createElement('p');

  const incrementButton = document.createElement('button');
  incrementButton.textContent = 'Add item';
  incrementButton.classList.add('button');
  incrementButton.addEventListener('click', () => {
    addToCart(jacket);
    renderCheckoutPage();
  });

  const decrementButton = document.createElement('button');
  decrementButton.textContent = 'Remove item';
  decrementButton.classList.add('button');
  decrementButton.addEventListener('click', () => {
    removeFromCart(jacket);
    renderCheckoutPage();
  });

  quantityAdjustmentContainer.append(incrementButton, decrementButton);

  jacketWrapper.append(
    jacketTitle,
    jacketImageContainer,
    jacketQuantity,
    jacketPrice,
    jacketPriceTotal,
    quantityAdjustmentContainer,  
  );
  return jacketWrapper;
}

function displayCartItems() {
  const displayContainer = document.getElementById('cart-items-display');
  displayContainer.textContent = '';
  const cart = JSON.parse(localStorage.getItem('cart'));

  cart.forEach(function (currentItem) {
    const itemHtml = generateHtmlForJacket(currentItem);
    displayContainer.appendChild(itemHtml);
  });
}


function displayCartCounter() {
  const cartCounterContainer = document.getElementById('cart-counter');
  cartCounterContainer.classList.add ('cart-counter');
  console.log(cartCounterContainer);
  const totalNumberOfItems = getTotalNumberOfItemsInCart();
  cartCounterContainer.textContent = 'Items in cart: ' + totalNumberOfItems;
}

function displayTotalPrice() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  let totalPrice = 0;

  if (cart) {
      totalPrice = cart.reduce((total, item) => {
          return total + (item.price * item.quantity);
      }, 0);
  }

  const totalPriceElement = document.getElementById('total-price');
  totalPriceElement.classList.add ('cart-counter');
  totalPriceElement.textContent = 'Total Price: ' + formatCurrency(totalPrice);
}

const orderButton = document.getElementById('order-button');
orderButton.textContent = 'Place order';
orderButton.classList.add('jacket-buy-button');
orderButton.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length > 0) {
        alert('Order successful!');
    }else {
      alert('Cart empty!');
  }
});

function renderCheckoutPage() {
  displayCartCounter();
  displayCartItems();
  displayTotalPrice();
}


function main() {
  renderCheckoutPage();
}

main();
