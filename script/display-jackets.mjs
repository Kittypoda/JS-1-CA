import { addToCart as addToCart } from "./addtocart.mjs";

export function displayJackets(jacketItems) {

    const jacketsData = jacketItems;
    const jacketContainer = document.getElementById('jacket-container');

    jacketsData.forEach(jacket => {
        const jacketElement = createjacketElement(jacket);
        jacketContainer.appendChild(jacketElement);
    });
};

function createjacketElement(jacket) {
    
    const jacketDiv = document.createElement('div');
    jacketDiv.classList.add('jacket-item');
    jacketDiv.setAttribute('id', jacket.id);

    const imageElement = document.createElement('img');
    imageElement.classList.add("jacket-image")
    imageElement.src = jacket.image.url;
    imageElement.alt = jacket.image.alt;

    const titleElement = document.createElement('h3');
    titleElement.textContent = jacket.title;
    titleElement.classList.add('jacket-selection__heading', 'jacket-title');

    const jacketPageLink = document.createElement('a');
    jacketPageLink.textContent = "View jacket info";
    jacketPageLink.href = "./html/jacketpage.html";   
    jacketPageLink.classList.add('cta');
    jacketPageLink.addEventListener('click', () => {
        localStorage.setItem('jacket', JSON.stringify(jacket));
    }); 

    const addToCartButton = document.createElement('button');
    addToCartButton.innerHTML = "Add jacket to cart"; 
    addToCartButton.classList.add('js-add-to-cart', 'cta');
    addToCartButton.addEventListener('click', addToCart)

    jacketDiv.append(imageElement, titleElement, jacketPageLink, addToCartButton);

    return jacketDiv;
};