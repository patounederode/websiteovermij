// ?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526"


// Basis URL voor de specifieke student
// let url = "https://fdnd.directus.app/items/person/315";

// Haal student nr. 315 op
haalPersonOp(315);

async function haalPersonOp(id) {
  let url = `https://fdnd.directus.app/items/person/${id}`
  let response = await fetch(url)
  let responseJSON = await response.json()
  let person = responseJSON.data

   // Toon jezelf altijd
  let personHTML = `
    <li>
      <h2>${person.name}</h2>
      <img src="${person.avatar}" alt="${person.name}">
      <p>Favoriete dier: ${person.fav_animal}</p>
      <p>Favoriete fruit: ${person.fav_fruit}</p>
      <p>Favoriete kleur: ${person.fav_color}</p>
      <p>Favoriet Seizoen: ${person.fav_season}</p>
    </li>
  `


  let lijst = document.querySelector("#resultaten")
  lijst.insertAdjacentHTML('beforeend', personHTML)
}



// Chatgpt
async function zoekOpVeld(veldNaam) {
  const veldWaarden = {
    fav_animal: "Kat",
    fav_fruit: "Aardbei",
    fav_color: "#000000",
    fav_season: "Zomer"
  };

  let waarde = veldWaarden[veldNaam];

  let url = `https://fdnd.directus.app/items/person/?limit=-1` +
            `&filter[squads][squad_id][tribe][name]=CMD%20Minor Web Dev` +
            `&filter[squads][squad_id][cohort]=2526` +
            `&filter[${veldNaam}][_eq]=${encodeURIComponent(waarde)}`;

  try {
    let response = await fetch(url);
    let responseJSON = await response.json();
    let personen = responseJSON.data;

    let lijst = document.querySelector("#resultaten");
    lijst.innerHTML = "";

    if (personen.length === 0) {
      lijst.insertAdjacentHTML('beforeend', "<li>Geen resultaten gevonden.</li>");
    } else {
      personen.forEach(person => {
        let personHTML = `
          <li>
            <h2>${person.name}</h2>
            <img src="${person.avatar}" alt="${person.name}">
            <p>${veldNaam.replace(/_/g, " ")}: ${person[veldNaam]}</p>
          </li>
        `;
        lijst.insertAdjacentHTML('beforeend', personHTML);
      });
    }
  } catch (error) {
    console.error(error);
    document.querySelector("#resultaten").innerHTML = "<li>Er is een fout opgetreden bij het ophalen van resultaten.</li>";
  }
}


// Event listener voor knop
document.querySelector("#zoekBtn").addEventListener("click", () => {
  const veld = document.querySelector("#filter").value;
  if (veld) {
    zoekOpVeld(veld);
  }
  else {
    alert("Kies eerst een onderwerp!");
  }
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
