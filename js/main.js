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
