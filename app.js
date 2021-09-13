const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generateProkemonPromises = () => Array(700).fill().map((_, index) => 
        fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const backImage = (element, id) => {
    (!element.getAttribute('src').includes("shiny")) ? element.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`) : element.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`)
}

const frontImage = (element, id) => {

    element.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`)
}

const generateHTML = pokemons => pokemons.reduce((acc, { name, id, types, sprites : {front_default} }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    acc += `
        <li class="card">
        <img onMouseOut = "frontImage(this, ${id})" onMouseOver="backImage(this, ${id})" class = "card-image ${elementTypes[0]}" alt = "${name}" src = "${front_default}">
            <h2>${id} . ${name}</h2>
            <p class = 'card_subtitle'>${elementTypes.join(' | ')}</p>
        </li>
    `
        return acc
}, '')

insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = pokemons
}

    const pokemonPromises = generateProkemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
