import { API_RAIN_URL } from "./constants.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";
import { addToCart } from "./utilitys/cart.mjs";

function generateJacketHtml(jacket) {
  const jacketWrapper = document.createElement('div');
  jacketWrapper.classList.add('jacket-wrapper');

  const jacketContainer = document.createElement('div');
  jacketContainer.classList.add('jacket-container');

  const heading = document.createElement('h3');
  heading.textContent = jacket.title;

  const jacketPriceContainer = document.createElement('div');

  const jacketImageContainer = document.createElement('img');
  jacketImageContainer.src = jacket.image.url;
  jacketImageContainer.alt = jacket.image.alt;
  

  const jacketPrice = document.createElement('div');
  jacketPrice.textContent = jacket.price;

  const jacketDiscountedPrice = document.createElement('div');
  jacketDiscountedPrice.textContent = jacket.discountedPrice;

  const jacketBuyButton = document.createElement('button');
  jacketBuyButton.textContent = 'Buy';
  jacketBuyButton.classList.add('jacket-buy-button');
  jacketBuyButton.addEventListener('click', () => {
    console.log('button clicked');
    addToCart(jacket);
  });


  jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);
  jacketContainer.append(jacketImageContainer,heading, jacketPriceContainer, jacketBuyButton);
  jacketWrapper.appendChild(jacketContainer);

  return jacketWrapper;
}

function displayJackets(jackets) {
  const jacketsDisplayContainer = document.getElementById('jackets-display');
  console.log(jacketsDisplayContainer);
  jacketsDisplayContainer.textContent = '';
  jackets
  
    .forEach((jacket) => {
      const jacketHtml = generateJacketHtml(jacket);
      jacketsDisplayContainer.appendChild(jacketHtml);
    });
}

async function renderHomePage() {
  const responseData = await doFetch(API_RAIN_URL);
  const jackets = responseData.data;
  console.log(jackets);
  displayJackets(jackets);
}

function main() {
  renderHomePage()
  const jackets = doFetch(API_RAIN_URL);
  
}

main();
