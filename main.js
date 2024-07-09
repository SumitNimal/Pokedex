const URL = 'https://pokeapi.co/api/v2/pokemon?limit=';
const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/`;
//
const max_Pokemon = 600;
let pokemonArray = [];


const searchBarELement = document.querySelector('.search-bar');
async function fetchAll(){
    let resposnse  = await fetch(`${URL}${max_Pokemon}`);
    let data = await resposnse.json();
    pokemonArray = data.results;
}
fetchAll().then((result) => {
    console.log("Application Loaded");
    let searchedString = searchBarELement.value;
    searchedPokemonsByName(searchedString);

    //implementing searching
    searchBarELement.addEventListener('keyup',() => {
        searchedString = searchBarELement.value;
        searchedPokemonsByName(searchedString);
    });
})


function searchedPokemonsByName(name){
    name = name.toLowerCase();
    document.querySelector('.item-box').innerHTML = '';
    for(let i = 0;i< max_Pokemon ;i++){
        if(pokemonArray[i].name.startsWith(name)){
            // i  = pokemonId

            //styling item/pokemon
            const Item = document.createElement('div');
            Item.innerHTML = `
            <img src = "${imageURL}${i+1}.svg" class = "pokemon-image">
            <h3 class="pokemon-name">${pokemonArray[i].name.toUpperCase()}</h3>
            <p class="pokemon-id">#${i+1}</p>
            `;
            Item.classList.add("item");
            Item.dataset.pokemonId = i+1;

            //listening pokemon/Item
            Item.addEventListener('click',() => {
                window.location.href = `./details/index.html?id=${i + 1}`
            });

            // appending item in box
            document.querySelector('.item-box').appendChild(Item);
        }
    }
}
