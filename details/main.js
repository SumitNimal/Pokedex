
const url = 'https://pokeapi.co/api/v2/pokemon/';
const params = new URLSearchParams(window.location.search);
const id = params.get(`id`);
let pokemonId = parseInt(id,10);
const pokemonContainer = document.querySelector('.pokemon-container');


async function fetchPokemon(pokemonId){
    let response = await fetch(`${url}${pokemonId}`);
    if(!response.ok){
        throw new Error("Error Fetching Pokemon");
    }
    let data = await response.json();
    return data;
}


const pokemonColorWithType = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
};


fetchPokemon(pokemonId).then((data) => {
    showPokemon(data);
});

function showPokemon(data){
    document.querySelector('.name-and-id').innerHTML = `
    <img src="back.svg">
    <p class="pokemon-name">${data.name.toUpperCase()}</p>
    <p class="pokemon-id">#${data.id}</p>
    `;
    document.querySelector('.pokemon-image').src = `
    https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg
    `;
    //
    document.querySelector('.pokemon-type-div').innerHTML = '';
    
    for(let i = 0 ; i < data.types.length ; i++){
        let typePara = document.createElement('p');
        typePara.innerText  = data.types[i].type.name.toUpperCase();
        typePara.classList.add('pokemon-type');
        document.querySelector('.pokemon-type-div').appendChild(typePara);
    }
        //stat creation
    maxStatArr = [255,170,250,145,250,145];
    statArr = ['HP','ATK','DEF','SATK','SDEF','SPD'];
    //
    const statDivParent = document.querySelector('.stats-div');
    
    //
    statDivParent.innerHTML = '';
    
    for(let i=0;i<data.stats.length;i++){
        let statDiv = document.createElement('div');
        statDiv.classList.add('single-stat-div');
        let colorConstant = Math.round((data.stats[i].base_stat/maxStatArr[i])*100)
        statDiv.innerHTML = `
        <div class="stat-name-div">
            <p class="stat-name" style="
            color: ${pokemonColorWithType[data.types[0].type.name]};">
            ${statArr[i]}
            </p>
        </div>
            <p class="stat-strength">${data.stats[i].base_stat.toString().padStart(3, '0')}</p>
        <div class="div-bar" style="
            background: linear-gradient(to right ,${pokemonColorWithType[data.types[0].type.name]}
            ${colorConstant}%,${pokemonColorWithType[data.types[0].type.name]}40  ${colorConstant}%);
            ">
        </div>`;
        statDivParent.appendChild(statDiv);
    }

    //wt and ht
    document.querySelector('#weight').innerText = `${data.weight/10} KG`;
    document.querySelector('#height').innerText = `${data.height/10} M`;

    
    // changing nav arrows
    document.querySelectorAll('.nav-arrow').forEach((element) => {
        element.style.backgroundColor = pokemonColorWithType[data.types[0].type.name];
    });
    // changing color based on pokemon type
    let k = 0;
    document.querySelectorAll('.pokemon-type').forEach((element) => {
        element.style.backgroundColor = pokemonColorWithType[data.types[k].type.name];
        k++;
    });

    //changing pokemon container
    pokemonContainer.style.backgroundImage = `linear-gradient(to bottom,
    ${pokemonColorWithType[data.types[0].type.name]} 40%, 
    rgb(248, 246, 246) 40%)`;
    pokemonContainer.style.display = 'flex';
}

const prevButton = document.querySelector('#prev');
prevButton.addEventListener('click',() => {
    if(pokemonId > 1){
        pokemonId--;
        console.log(pokemonId);
        prevButton.style.pointerEvents = 'none';
        fetchPokemon(pokemonId).then((data) => {
            showPokemon(data);
        });
        setTimeout(() => {
            prevButton.style.pointerEvents = 'auto';
        },700);
    }
});

const nextButton = document.querySelector('#next');
nextButton.addEventListener('click',() => {
    if(pokemonId < 600){
        pokemonId++;
        console.log(pokemonId);
        nextButton.style.pointerEvents = 'none';
        fetchPokemon(pokemonId).then((data) => {
            showPokemon(data);
        });
        setTimeout(() => {
            nextButton.style.pointerEvents = 'auto';
        },700);
    }
});
