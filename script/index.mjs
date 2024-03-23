import { API_RAIN_URL } from "./constants.mjs";
import { doFetch } from "./utilitys/doFetch.mjs";
import { addToCart } from "./utilitys/cart.mjs";


const femaleGenderButton = document.getElementById('gender-female');
const maleGenderButton = document.getElementById('gender-male');
const allGenderButton = document.getElementById('gender-all');


let chosenGender = '';

femaleGenderButton.addEventListener('click', () => {
  chosenGender = 'Female';
  renderHomePage();
});
maleGenderButton.addEventListener('click', () => {
  chosenGender = 'Male';
  renderHomePage();
});
allGenderButton.addEventListener('click', () => {
  chosenGender = '';
  renderHomePage();
});


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
  

  const jacketPrice = document.createElement('h3');
  jacketPrice.textContent = 'Before: ' + jacket.price + ' NOK';

  const jacketDiscountedPrice = document.createElement('div');
  jacketDiscountedPrice.textContent = 'Now: ' + jacket.discountedPrice + 'NOK';
  jacketDiscountedPrice.classList.add('now');

  const jacketBuyButton = document.createElement('button');
  jacketBuyButton.textContent = 'Add to cart';
  jacketBuyButton.classList.add('jacket-buy-button');
  jacketBuyButton.addEventListener('click', () => {
    console.log('button clicked');
    addToCart(jacket);
  });

  const jacketPageButton = document.createElement('a');
  jacketPageButton.href = './html/product-page.html';
  jacketPageButton.textContent = 'See more';
  jacketPageButton.classList.add('jacket-page-button');
  console.log('product');
  jacketPageButton.addEventListener('click', () => {
    localStorage.setItem('jacket', JSON.stringify(jacket));
  });

  

  jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);
  jacketContainer.append(heading,jacketImageContainer, jacketPriceContainer, jacketBuyButton, jacketPageButton);
  jacketWrapper.appendChild(jacketContainer);

  return jacketWrapper;
}

function displayJackets(jackets) {
  const jacketsDisplayContainer = document.getElementById('jackets-display');
  console.log(jacketsDisplayContainer);
  jacketsDisplayContainer.textContent = '';
  jackets
  .filter((jacket) => {
    if (jacket.gender === chosenGender || chosenGender === '') {
      return true;
    }
  })
  
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
