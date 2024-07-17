document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    let id = parseInt(params.get('id'), 10) || 1;
    
    const loadingDiv = document.querySelector('.loading');
    const boxDiv = document.querySelector('.box');
    document.querySelector('body').style.backgroundColor = 'white';
    // const backButton = document.getElementById('back-button');
    const colorArray = {
        normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
        grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
        ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
        rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
        steel: '#B8B8D0', fairy: '#EE99AC',
    };
    const statNameList = ['HP','ATK','DEF','SATK','SDEF','SPD'];
    const prevPokemonButton = document.getElementById('prev-navigation');
    const nextPokemonButton = document.getElementById('next-navigation');
    const backButton = document.querySelector('.back-image');
    const heightLogo = document.querySelector('.height-logo');
    const weightLogo = document.querySelector('.weight-logo');
    const backLogo = document.getElementById('back-logo');
    const imageDivForOld = document.querySelector('.pokemon-image-div');
    const pokemonNameElement = document.querySelector('.pokemon-name');
    const pokemonImageElementOld = document.querySelector('.pokemon-image-theme-old');
    const pokemonImageElementNew = document.querySelector('.pokemon-image-theme-new');
    const pokemonIdElement = document.getElementById('pokemon-id');
    const pokemonTypesElement = document.querySelector('.pokemon-type-container');
    const statParentElement = document.querySelector('.all-stats-container');
    const boxElementOld = document.querySelector('.box');
    const themeButton = document.querySelector('.theme');

    let themeApplied = JSON.parse(localStorage.getItem('themeapplied')) || 1;
    
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

    
    function disableLogo(){
        weightLogo.style.display = 'none';
        heightLogo.style.display = 'none';
        backLogo.style.display = 'none';
    }

    function displayPokemon(id,data){
        const pokemonColor =  colorArray[data.types[0].type.name];

        if(themeApplied === 1){
            imageDivForOld.style.display = 'none';
        }
        //image , name and id 
        pokemonNameElement.innerText = firstLetterCapital(data.name);
        pokemonImageElementOld.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
        pokemonImageElementNew.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
        pokemonIdElement.innerText = `#${id}`;
    
        //types
        pokemonTypesElement.innerHTML = '';
        for(let i = 0;i < data.types.length ;i++){
            let typeParaElement = document.createElement('p');
            typeParaElement.innerText = firstLetterCapital(data.types[i].type.name);
            typeParaElement.classList.add('pokemon-type');
            
            if(themeApplied === 1)
            typeParaElement.style.backgroundColor = colorArray[data.types[i].type.name];
            pokemonTypesElement.appendChild(typeParaElement);
        }
        let H = '';
        let W = '';
    // old theme
        if(themeApplied === 2){
            disableLogo();
            pokemonImageElementNew.style.display = 'none';
            boxElementOld.style.backgroundColor = pokemonColor;
            document.querySelector('.pokemon-image-div').style.backgroundColor = `${pokemonColor}50`;
            prevPokemonButton.innerHTML = '<p style="font-size: 20px;">&#60;</p>';
            nextPokemonButton.innerHTML = '<p style="font-size: 20px;">&#62;</p>';
            backButton.innerHTML = '<p>&#9664;</p>';
            H = 'H : ';
            W = 'W : ';
        }


    //new specific
    if(themeApplied === 1)
    document.querySelector('body').style.backgroundColor = pokemonColor;
    
        // body-measure
        document.querySelector('#weight-text').innerText = `${W}${(data.weight/10).toFixed(1)} KG`;
        document.querySelector('#height-text').innerText = `${H}${(data.height/10).toFixed(1)} M`;
    
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
        if(themeApplied === 2)
            document.getElementById('theme_specific').setAttribute('href','style_theme_old.css')
        if(themeApplied === 1)
            document.getElementById('theme_specific').setAttribute('href','style_theme_new.css')
        loadingDiv.style.display = 'none';
        boxDiv.style.display = 'flex';
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
    prevPokemonButton.addEventListener('click',()=>{
        if (id > 1) getPokemon(id - 1);
    });
    
    nextPokemonButton.addEventListener('click',()=>{
        if (id < 500) getPokemon(id + 1);
    });
    backButton.addEventListener('click',() => {
        window.history.back();
    });
    themeButton.addEventListener('click',() => {
        loadingDiv.innerHTML = 'Applying Theme!';
        loadingDiv.style.display = 'inline-block';
        boxDiv.style.display = 'none';
        if(themeApplied === 1)
            themeApplied = 2;
        else 
            themeApplied = 1;
        setTimeout(()=>{
            localStorage.setItem('themeapplied',JSON.stringify(themeApplied));
            location.reload()
        },500);
    });
    getPokemon(id);
});

