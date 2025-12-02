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

        card.querySelector(".fav-btn").onclick = e => {
            e.stopPropagation();
            toggleFav(c.code);
            render();
        };

        grid.appendChild(card);
    });
}

function getFiltered() {
    const q = search.value.toLowerCase();
    const r = region.value;

    return all.filter(c => {
        if (r && r !== c.regionFilter) return false;
        if (q && !c.name.toLowerCase().includes(q)) return false;
        return true;
    });
}

function render() {
    const filtered = getFiltered();
    const total = Math.max(1, Math.ceil(filtered.length / perPage));

    if (page > total) page = total;

    const slice = filtered.slice((page - 1) * perPage, page * perPage);

    renderGrid(slice);

    renderPagination(pagination, page, total, p => {
        page = p;
        render();
    });
}

search.oninput = () => { page = 1; render(); };
region.onchange = () => { page = 1; render(); };

(async function init() {
    const data = await fetchAll();

    all = data.map(c => ({
        name: c.name?.common || "Sem nome",
        official: c.name?.official || "",
        flag: c.flags?.png || "",
        region: c.region || "",
        subregion: c.subregion || "",
        regionFriendly: normalizeRegion(c),
        regionFilter: normalizeRegion(c),
        code: c.cca3
    })).filter(x => x.code);

    all.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    render();
})();
