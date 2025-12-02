import { fetchAll } from './api.js';
import { renderPagination } from './pagination.js';

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const region = document.getElementById("region");
const pagination = document.getElementById("pagination");

let all = [];
let page = 1;
let favs = new Set(JSON.parse(localStorage.getItem("favs") || "[]"));
const perPage = 12;

function saveFavs() {
    localStorage.setItem("favs", JSON.stringify([...favs]));
}

function toggleFav(code) {
    if (favs.has(code)) favs.delete(code);
    else favs.add(code);
    saveFavs();
}
window.toggleFav = toggleFav;

function normalizeRegion(c) {
    if (c.region === "Americas") return "Americas";
    return c.region || "";
}

function renderGrid(list) {
    grid.innerHTML = "";

    list.forEach(c => {
        const card = document.createElement("article");
        card.className = "card";
        card.onclick = () => location.href = "country.html?code=" + c.code;

        card.innerHTML = `
            <button class="fav-btn ${favs.has(c.code) ? 'active' : ''}">
                ${favs.has(c.code) ? '★' : '☆'}
            </button>

            <img src="${c.flag}" alt="">
            <h3>${c.name}</h3>
            <p class="region">${c.regionFriendly}</p>
        `;

        // Tratar clique da estrela sem abrir o país
        card.querySelector(".fav-btn").onclick = e => {
            e.stopPropagation();
            toggleFav(c.code);
            render();
        };

        grid.appendChild(card);
    });
}
