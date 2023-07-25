export const getPokemon = async() => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon")
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

export const getPokemonInfo = async(url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}