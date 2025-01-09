async function FetchAllPokemon(){
    const url = "https://pokeapi.co/api/v2/pokemon/"
    const pokemonList = document.getElementById("pokemons")
    for (let i = 1; i < 1025; i++) {
        try{
            const response = await fetch(url+`${i}`)

            if(!response.ok){
                throw new Error(`Response Status: ${response.status}`)
            }
            const json = response.json()
            const data = await json;
            const option = document.createElement("option");
            option.value = data.name;
            option.text = data.name;
            pokemonList.appendChild(option);

            
        }
        catch(error){
            console.log(error.message)
        }
    }

    document.getElementById("pokemons").addEventListener("change", UpdateInformation);
}

FetchAllPokemon();

async function UpdateInformation(){
    const url = "https://pokeapi.co/api/v2/pokemon/"
    
    let value = document.getElementById("pokemons").value

    let response = await fetch(url+`${value}`)
    const json = response.json()
    const data = await json;

    const name = document.getElementById("name")
    const typings = document.getElementById("typings")
    const hp = document.getElementById("hp")
    const attack = document.getElementById("attack")
    const defense = document.getElementById("defense")
    const spAttack = document.getElementById("sp-attack")
    const spDefense = document.getElementById("sp-defense")
    const speed = document.getElementById("speed")
    const image = document.getElementById("image")
    // get pokedex number
    number = data.id

    // Apply update animation
    const elements = [name, typings, hp, attack, defense, spAttack, spDefense, speed, image];
    elements.forEach(el => el.classList.add('update-animation'));

    setTimeout(() => {
        name.innerHTML = data.name
        name.classList.add('name'); // Add class for styling

        hp.innerHTML = data.stats[0].stat.name+" : "+data.stats[0].base_stat
        hp.classList.add('stats'); // Add class for styling

        attack.innerHTML = data.stats[1].stat.name+" : "+data.stats[1].base_stat
        attack.classList.add('stats'); // Add class for styling

        defense.innerHTML = data.stats[2].stat.name+" : "+data.stats[2].base_stat
        defense.classList.add('stats'); // Add class for styling

        spAttack.innerHTML = data.stats[3].stat.name+" : "+data.stats[3].base_stat
        spAttack.classList.add('stats'); // Add class for styling

        spDefense.innerHTML = data.stats[4].stat.name+" : "+data.stats[4].base_stat
        spDefense.classList.add('stats'); // Add class for styling

        speed.innerHTML = data.stats[5].stat.name+" : "+data.stats[5].base_stat
        speed.classList.add('stats'); // Add class for styling

        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`

        // Display typings with specific colors
        typings.innerHTML = ''; // Clear previous typings
        typings.classList.add('typings'); // Add class for styling
        data.types.forEach(typeInfo => {
            const type = typeInfo.type.name;
            const typeElement = document.createElement('span');
            typeElement.innerHTML = type;
            typeElement.style.color = getTypeColor(type);
            typings.appendChild(typeElement);
        });

        // Remove update animation class after animation ends
        elements.forEach(el => el.classList.remove('update-animation'));
    }, 500); // 0.5s delay
}

// Function to get color based on Pokémon type
function getTypeColor(type) {
    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };
    return typeColors[type] || '#000000'; // Default to black if type not found
}