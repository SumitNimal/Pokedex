document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let id = parseInt(params.get('id'), 10) || 1;
    
    const loadingDiv = document.querySelector('.loading');
    const containerDiv = document.querySelector('.container');
    const backButton = document.getElementById('back-button');
    const colorArray = {
        normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
        grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
        ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
        rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
        steel: '#B8B8D0', fairy: '#EE99AC',
    };
    const statNameList = ['HP','ATK','DEF','SATK','SDEF','SPD'];
    
    async function fetchPokemon(id){
        try{
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if(!response.ok){
                throw new Error("Error Fetching Pokemon");
                loadingDiv.innerHTML = 'OOPS !';
            }
            let data = await response.json();
            console.log(data);
            return data;
        }
        catch(err){
            loadingDiv.innerHTML = 'Pokemon Not Found!';
        }
    }
    
    
    function firstLetterCapital(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    function displayPokemon(id,data){
        
        const pokemonNameElement = document.querySelector('.pokemon-name');
        const pokemonImageElement = document.getElementById('pokemon-image');
        const pokemonIdElement = document.getElementById('pokemon-id');
        const pokemonTypesElement = document.querySelector('.pokemon-type-container');
        const statParentElement = document.querySelector('.all-stats-container');
        const pokemonColor =  colorArray[data.types[0].type.name];
    
        //image , name and id 
        pokemonNameElement.innerText = firstLetterCapital(data.name);
        pokemonImageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
        pokemonIdElement.innerText = `#${id}`;
    
        //types
        pokemonTypesElement.innerHTML = '';
        for(let i = 0;i < data.types.length ;i++){
            let typeParaElement = document.createElement('p');
            typeParaElement.innerText = firstLetterCapital(data.types[i].type.name);
            typeParaElement.classList.add('pokemon-type');
            typeParaElement.style.backgroundColor = colorArray[data.types[i].type.name];
            pokemonTypesElement.appendChild(typeParaElement);
        }
        document.querySelector('body').style.backgroundColor = pokemonColor;
    
        // body-measure
        document.querySelector('#weight-text').innerText = `${(data.weight/10).toFixed(1)} KG`;
        document.querySelector('#height-text').innerText = `${(data.height/10).toFixed(1)} M`;
    
        //stats
        statParentElement.innerHTML = '';
        for(let i = 0;i < 6 ; i++){
            let statElement = document.createElement('div');
            let statStrength = data.stats[i].base_stat;
    
            statElement.innerHTML = `
                <div class="stat-name-div">${statNameList[i]}</div>
                <div class="stat-strength-div">${statStrength.toString().padStart(3, '0')}</div>
            `;
            let statBarElement = document.createElement('div');
            statBarElement.classList.add('stat-bar-div');
    
            statBarElement.style.background = `linear-gradient(to right, ${pokemonColor} ${statStrength}%, ${pokemonColor}40 ${statStrength}%)`;
            
            statElement.appendChild(statBarElement);
            statElement.classList.add('single-stat-container');
            statParentElement.appendChild(statElement);
        }
        loadingDiv.style.display = 'none';
        containerDiv.style.display = 'flex';
        
    }
    
    function getPokemon(newId){
        fetchPokemon(newId).then((data) => {
            displayPokemon(newId,data);
            if(data){
                window.history.replaceState({}, "", `index.html?id=${newId}`); 
                id = newId;
            }
        })
    }
    document.getElementById('prev-navigation').addEventListener('click',()=>{
        if (id > 1) getPokemon(id - 1);
    });
    
    document.getElementById('next-navigation').addEventListener('click',()=>{
        if (id < 500) getPokemon(id + 1);
    });
    backButton.addEventListener('click',() => {
        window.history.back();
    });
    getPokemon(id);
});

