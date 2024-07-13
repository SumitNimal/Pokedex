const URL = 'https://pokeapi.co/api/v2/pokemon?limit=';
const max_Pokemon = 500;
let pokemonArray = [];
const searchBarELement = document.querySelector('.search-bar');

async function fetchAll(){
    let resposnse  = await fetch(`${URL}${max_Pokemon}`);
    let data = await resposnse.json();
    pokemonArray = data.results;
    let searchedString = searchBarELement.value;
    searchedPokemonsByName(searchedString);
    //implementing searching
    searchBarELement.addEventListener('keyup',() => {
        searchedString = searchBarELement.value;
        searchedPokemonsByName(searchedString);
    });
}

function searchedPokemonsByName(name){
    name = name.toLowerCase();
    const pokemonGrid = document.querySelector('.item-box');
    pokemonGrid.innerHTML = '';
    let flag = 0;
    for(let i = 0;i< max_Pokemon ;i++){
        if(pokemonArray[i].name.startsWith(name)){
            // pokemonId = i+1
            //styling item/pokemon
            let pokemonId = i + 1;
            if(!flag) flag = 1;
            const Item = document.createElement('div');
            Item.innerHTML = `
            <img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" class = "pokemon-image">
            <h3 class="pokemon-name">${pokemonArray[i].name.toUpperCase()}</h3>
            <p class="pokemon-id">#${pokemonId}</p>
            `;
            Item.classList.add("item");

            //listening pokemon/Item
            Item.addEventListener('click',() => {
                window.location.href = `./details/index.html?id=${pokemonId}`
            });

            // appending item in box
            pokemonGrid.appendChild(Item);
        }
    }
    //pokemon not found
    if(!flag){
        pokemonGrid.innerHTML = '<p class="no-pokemon">Pokemon not found!</p>';
    }
}
fetchAll();
