import { fetchByCode } from './api.js';

const grid = document.getElementById("favGrid");
const favs = JSON.parse(localStorage.getItem("favs") || "[]");

if(favs.length === 0){
  grid.innerHTML = "<p>Nenhum favorito ainda.</p>";
} else {

  Promise.all(
    favs.map(code => fetchByCode(code))
  ).then(list=>{

    const valid = list.filter(Boolean);

    valid.forEach(c=>{
      const code = c.cca3;

      const card = document.createElement("article");
      card.className = "card";
      card.onclick = ()=> location.href="country.html?code="+code;

      card.innerHTML = `
        <img src="${c.flags?.png}">
        <h3>${c.name?.common || "Sem nome"}</h3>
        <p class="region">${c.region || ""}</p>
      `;

      grid.appendChild(card);
    });
  });
}
