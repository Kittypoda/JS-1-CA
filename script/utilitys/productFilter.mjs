import { displayJackets } from "/index.mjs";

export const filterFunctions = () => {
    let jacketList = JSON.parse(localStorage.getItem("jacketList"));
    addEventListenerOnjacketGenre(jacketList);
};

function addEventListenerOnjacketGenre(jacketList) {
    document.querySelectorAll(".sortjacketsByGender ul li").forEach((gender) => {
        gender.addEventListener("click", () => filterjacketByGender(genre.textContent, jacketList));
    });
}

function filterjacketByGender(gender, jacketList) {
    const jacketContainer = document.getElementById('jacket-container');
    if (genre === "All jackets") {
        jacketContainer.innerHTML = '';
        displayjackets(jacketList);
    } else {
        jacketContainer.innerHTML = '';
        let filteredjacketList = jacketList.filter((jacket) => jacket.gender === gender);
        displayjackets(filteredjacketList);
    }
};