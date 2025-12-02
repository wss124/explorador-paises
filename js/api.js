async function tryJson(url){
  try{
    const res = await fetch(url);
    if(!res.ok){
      console.warn("HTTP error", res.status, url);
      return null;
    }
    return await res.json();
  }catch(err){
    console.warn("Fetch error", url, err);
    return null;
  }
}

export async function fetchAll(){
  const url =
    "https://restcountries.com/v3.1/all?fields=" +
    "name,capital,flags,region,subregion,population,area,languages,currencies,cca3";

  const data = await tryJson(url);

  if(Array.isArray(data)) return data;

  console.error("Erro ao carregar lista de países.");
  return [];
}

export async function fetchByCode(code){
  const url = "https://restcountries.com/v3.1/alpha/" + code;

  const data = await tryJson(url);

  if(Array.isArray(data) && data[0]) return data[0];

  console.error("Erro: país não encontrado", code);
  return null;
}
