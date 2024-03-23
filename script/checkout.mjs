import {
  addToCart,
  clearCart,
  getTotalNumberOfItemsInCart,
  removeFromCart,
} from './utilitys/cart.mjs';
import { formatCurrency } from './utilitys/formatCurrency.mjs';


const clearCartButton = document.getElementById('clear-cart');
clearCartButton.classList.add('jacket-buy-button');
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

  

  const jacketPrice = document.createElement('div');
  jacketPrice.textContent = 'Price: ' + jacket.price;

  const jacketPriceTotal = document.createElement('div');
  jacketPriceTotal.textContent =
    'Total: ' + formatCurrency(jacket.price * jacket.quantity);

  const quantityAdjustmentContainer = document.createElement('div');

  const incrementButton = document.createElement('button');
  incrementButton.textContent = '+';
  incrementButton.classList.add('jacket-buy-button');
  incrementButton.addEventListener('click', () => {
    addToCart(jacket);
    renderCheckoutPage();
  });

  const decrementButton = document.createElement('button');
  decrementButton.textContent = '-';
  decrementButton.classList.add('jacket-buy-button');
  decrementButton.addEventListener('click', () => {
    removeFromCart(jacket);
    renderCheckoutPage();
  });

  quantityAdjustmentContainer.append(incrementButton, decrementButton);

  jacketWrapper.append(
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
  totalPriceElement.textContent = 'Total Price: ' + formatCurrency(totalPrice);
}

const orderButton = document.getElementById('order-button');
orderButton.textContent = 'order';
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
