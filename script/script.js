// ?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526"


// Basis URL voor de specifieke student
let url = "https://fdnd.directus.app/items/person/315";

// Haal student nr. 315 op
haalPersonOp(315);

async function haalPersonOp(id) {
  let url = `https://fdnd.directus.app/items/person/${id}`;
  let response = await fetch(url);
  let responseJSON = await response.json();
  let person = responseJSON.data;

  let personHTML = `
    <li>
      <h2>${person.name}</h2>
      <img src="${person.avatar}" alt="${person.name}">
    </li>
  `;

  let lijst = document.querySelector("section ul");
  lijst.insertAdjacentHTML('beforeend', personHTML);
}

// Nieuwe functie: haal alle Minor Web personen met fav_animal
async function haalMinorWebMetFavAnimal() {
  let urlBase = "https://fdnd.directus.app/items/person/?limit=-1";
  let response = await fetch(urlBase);
  let responseJSON = await response.json();
  let allePersonen = responseJSON.data;

  // Filter personen uit Minor Web cohort 2526
  let minorWebPersonen = allePersonen.filter(p =>
    p.squads && p.squads.some(s => s.tribe?.name === "CMD Minor Web Dev" && s.cohort === 2526)
  );

  // Filter personen die iets hebben ingevuld bij fav_animal
  let personenMetFavAnimal = minorWebPersonen.filter(p =>
    p.fav_animal && p.fav_animal.trim() !== ""
  );

  console.log("Personen uit Minor Web met fav_animal:", personenMetFavAnimal);

  // Toon ze in dezelfde structuur als persoon 315
  let lijst = document.querySelector("section ul");
  lijst.innerHTML = ""; // eerst leegmaken

  personenMetFavAnimal.forEach(person => {
    let favAnimalHTML = person.fav_animal ? `<p>Favoriete dier: ${person.fav_animal}</p>` : "";

    let personHTML = `
      <li>
        <h2>${person.name}</h2>
        <img src="${person.avatar}" alt="${person.name}">
        ${favAnimalHTML}
      </li>
    `;
    lijst.insertAdjacentHTML('beforeend', personHTML);
  });

  if(personenMetFavAnimal.length === 0){
    lijst.insertAdjacentHTML('beforeend', `<li>Geen resultaten gevonden.</li>`);
  }
}

// ------------------------
// Optioneel: knop toevoegen om te filteren
document.querySelector("#zoekBtn")?.addEventListener("click", () => {
  let filter = document.querySelector("#filter").value;
  if(filter === "favorietedier") {
    haalMinorWebMetFavAnimal();
  } else {
    // toon alleen persoon 315 als geen filter
    document.querySelector("section ul").innerHTML = "";
    haalPersonOp(315);
  }
});



// code met chatgpt
// lightdarkmode knop
document.addEventListener("DOMContentLoaded", () => {
  const zon = document.getElementById("zon");
  const maan = document.getElementById("maan");

  zon.addEventListener("click", () => {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  });

  maan.addEventListener("click", () => {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  });

  // start met systeemvoorkeur
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.add('light-mode');
  }
});




// code met chatgpt
// Zorg dat het script onder de SVG staat of in DOMContentLoaded
const koffie = document.getElementById("koffie");
const koffieom = document.getElementById("koffieom");

koffie.addEventListener("click", () => {
  koffie.style.display = "none";
  koffieom.style.display = "block";
});

koffieom.addEventListener("click", () => {
  koffieom.style.display = "none";
  koffie.style.display = "block";
});
