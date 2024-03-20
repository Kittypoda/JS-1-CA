import {
  addToCart,
  clearCart,
  getTotalNumberOfItemsInCart,
  removeFromCart,
} from './utilitys/cart.mjs';
import { formatCurrency } from './utilitys/formatCurrency.mjs';

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
  clearCart();
  renderCheckoutPage();
});

function generateHtmlForJacket(jacket) {
  const jacketWrapper = document.createElement('div');

  const jacketTitle = document.createElement('h3');
  jacketTitle.textContent = jacket.title;

  const jacketQuantity = document.createElement('div');
  jacketQuantity.textContent = 'Quantity: ' + jacket.quantity;

  const jacketImageContainer = document.createElement('img');
  jacketImageContainer.src = jacket.image.url;
  jacketImageContainer.alt = jacket.image.alt;

  const jacketPrice = document.createElement('div');
  jacketPrice.textContent = 'Price: ' + jacket.price;

  const jacketPriceTotal = document.createElement('div');
  jacketPriceTotal.textContent =
    'Total: ' + formatCurrency(jacket.price * jacket.quantity);

  const quantityAdjustmentContainer = document.createElement('div');

  const incrementButton = document.createElement('button');
  incrementButton.textContent = '+';
  incrementButton.addEventListener('click', () => {
    addToCart(jacket);
    renderCheckoutPage();
  });

  const decrementButton = document.createElement('button');
  decrementButton.textContent = '-';
  decrementButton.addEventListener('click', () => {
    removeFromCart(jacket);
    renderCheckoutPage();
  });

  quantityAdjustmentContainer.append(incrementButton, decrementButton);

  jacketWrapper.append(
    jacketImageContainer,
    jacketTitle,
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
  console.log(cartCounterContainer);
  const totalNumberOfItems = getTotalNumberOfItemsInCart();
  cartCounterContainer.textContent = totalNumberOfItems;
}

function renderCheckoutPage() {
  displayCartCounter();
  displayCartItems();
}

function main() {
  renderCheckoutPage();
}

main();