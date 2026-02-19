// ?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526"


// Basis URL voor de specifieke student
let url = "https://fdnd.directus.app/items/person/315";

// Haal student nr. 315 op
haalPersonOp(315);

async function haalPersonOp(id) {
  let url = `https://fdnd.directus.app/items/person/${id}`
  let response = await fetch(url)
  let responseJSON = await response.json()
  let person = responseJSON.data

  let personHTML = `
    <li>
      <h2>${person.name}</h2>
      <img src="${person.avatar}" alt="${person.name}">
    </li>
  `

  let lijst = document.querySelector("section ul")
  lijst.insertAdjacentHTML('beforeend', personHTML)
}




// code met chatgpt
async function haalMinorWebMetFavAnimal() {
  let url = "https://fdnd.directus.app/items/person/?limit=-1";
  let response = await fetch(url);
  let responseJSON = await response.json();
  let allePersonen = responseJSON.data;

  // Filter Minor Web 2526
  let minorWebPersonen = allePersonen.filter(function(p) {
    return p.squads &&
           p.squads.some(function(s) {
             return s.tribe?.name === "CMD Minor Web Dev" && s.cohort === 2526;
           });
  });

  // Filter personen met fav_animal
  let personenMetFavAnimal = minorWebPersonen.filter(function(p) {
    return p.fav_animal && p.fav_animal.trim() !== "";
  });

  let lijst = document.querySelector("section ul");
  lijst.innerHTML = ""; // eerst leegmaken

  if (personenMetFavAnimal.length === 0) {
    lijst.insertAdjacentHTML('beforeend', "<li>Geen resultaten gevonden.</li>");
  } else {
    personenMetFavAnimal.forEach(function(person) {
      let favAnimalHTML = person.fav_animal ? "<p>Favoriete dier: " + person.fav_animal + "</p>" : "";
      let personHTML = `
        <li>
          <h2>${person.name}</h2>
          <img src="${person.avatar}" alt="${person.name}">
          ${favAnimalHTML}
        </li>
      `;
      lijst.insertAdjacentHTML('beforeend', personHTML);
    });
  }
}

// Event listener voor knop
document.querySelector("#zoekBtn").addEventListener("click", function() {
  haalMinorWebMetFavAnimal();
});



// lightdarkmode knop
// DOMContentLoaded: voer deze code pas uit als de HTML helemaal geladen is
document.addEventListener("DOMContentLoaded", function() {

  let zon = document.getElementById("zon");
  let maan = document.getElementById("maan");

  zon.addEventListener("click", function() {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  });

  maan.addEventListener("click", function() {
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



let koffie = document.getElementById("koffie");
let koffieom = document.getElementById("koffieom");

koffie.addEventListener("click", function() {
  koffie.style.display = "none";
  koffieom.style.display = "block";
});

koffieom.addEventListener("click", function() {
  koffieom.style.display = "none";
  koffie.style.display = "block";
});
