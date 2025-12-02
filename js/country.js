import { fetchByCode } from './api.js';

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

const box = document.getElementById("countryBox");
const back = document.getElementById("backBtn");
const favBtn = document.getElementById("favBtn");

back.onclick = ()=> history.back();

let favs = new Set(JSON.parse(localStorage.getItem("favs") || "[]"));

function updateBtn(){
  favBtn.textContent = favs.has(code) ? "Remover dos favoritos" : "Favoritar";
  favBtn.classList.toggle("active", favs.has(code));
}

function toggleFav(){
  favs.has(code) ? favs.delete(code) : favs.add(code);
  localStorage.setItem("favs", JSON.stringify([...favs]));
  updateBtn();
}
favBtn.onclick = toggleFav;

(async function init(){
  const c = await fetchByCode(code);

  if(!c){
    box.innerHTML = `<p>Não foi possível carregar o país.</p>`;
    return;
  }

  const lat = c.latlng?.[0];
  const lng = c.latlng?.[1];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-5}%2C${lat-5}%2C${lng+5}%2C${lat+5}&layer=mapnik&marker=${lat}%2C${lng}`;

  box.classList.add("country-box");

  box.innerHTML = `
    <img src="${c.flags?.png}" alt="">
    <h1>${c.name?.common}</h1>

    <ul class="details-list">
      <li><strong>Capital:</strong> ${c.capital?.join(", ") || "—"}</li>
      <li><strong>Região:</strong> ${c.region || ""} - ${c.subregion || ""}</li>
      <li><strong>População:</strong> ${c.population?.toLocaleString() || "—"}</li>
      <li><strong>Área:</strong> ${c.area?.toLocaleString() || "—"} km²</li>
      <li><strong>Línguas:</strong> ${c.languages ? Object.values(c.languages).join(", ") : "—"}</li>
      <li><strong>Moeda:</strong> ${c.currencies ? Object.values(c.currencies).map(m=>m.name + ` (${m.symbol})`).join(", ") : "—"}</li>
    </ul>

    <iframe class="country-map" src="${mapUrl}"></iframe>
  `;

  updateBtn();
})();
