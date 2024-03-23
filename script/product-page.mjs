const jacketItem = JSON.parse(localStorage.getItem("jacket"));

import { addToCart } from "./utilitys/cart.mjs"


function generatejacketPageItem (jacketItem) {

    let main = document.querySelector("main");

    const jacketContainer = document.createElement("div");
    jacketContainer.classList = "jacket-item";
    jacketContainer.setAttribute('id', jacketItem.id);
    jacketContainer.setAttribute('quantity', jacketItem.quantity);

    const imageElement = document.createElement("img");
    imageElement.classList.add('jacketpage-image');
    imageElement.src = jacketItem.image.url;
    imageElement.alt = jacketItem.image.alt;

    const titleElement = document.createElement("h3");
    titleElement.classList.add('title');
    titleElement.textContent = jacketItem.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add('synopsis');
    descriptionElement.textContent = jacketItem.description;

    const priceElement = document.createElement("div");
    priceElement.classList.add("price-element");

    if (jacketItem.onSale) {
        const priceDiscount = document.createElement("p");
        const priceBefore = document.createElement("p");
        priceDiscount.classList.add("price-discount");
        priceBefore.classList.add("price-before");
        priceDiscount.textContent = `Discounted price: ${jacketItem.discountedPrice}`;
        priceBefore.textContent = `Before: ${jacketItem.price}`;
        priceElement.append(priceDiscount, priceBefore);
    } else {
        const price = document.createElement("p");
        price.classList.add("cart-price");
        price.textContent = `Price: ${jacketItem.price} kr`;
        priceElement.appendChild(price);
    }

    const addToCartButton = document.createElement('button');
    addToCartButton.innerHTML = "Add jacket to cart";
    addToCartButton.href = `../html/checkout.html`; 
    addToCartButton.classList.add('jacket-page-button');
    addToCartButton.addEventListener('click', addToCart);
    

    const releasedElement = document.createElement("p");
    releasedElement.textContent = jacketItem.released;

    main.appendChild(jacketContainer);
    jacketContainer.append(imageElement, titleElement, descriptionElement, 
        releasedElement, priceElement, addToCartButton,);

    return jacketContainer;
};

generatejacketPageItem(jacketItem);