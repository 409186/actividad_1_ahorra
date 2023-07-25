import {useEffect, useState} from "react"
import { getPokemon, getPokemonInfo } from "../../services/pokemon";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { firstLetterMayus } from './Search.utils';
import './Search.css'

const Search = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([])
  
    const fetchPokemon = async() => {
        const pokemon = await getPokemon()
        const newPokemonInfo = []
        for (const item of pokemon.results) {
            const resultPokemonInfo = await getPokemonInfo(item.url)
            newPokemonInfo.push({
                name: item.name,
                ...resultPokemonInfo
            })
        }
        setData(newPokemonInfo)
    }
  
    const handleSearch = event => {
        setSearch(event.target.value);
    };

    const agregarFavorito = (favorite) => {
        let listPokemonFavorite = sessionStorage.getItem("favorites")
        if(listPokemonFavorite){
            const parsedListFavorites = JSON.parse(listPokemonFavorite)
            parsedListFavorites.push(favorite)
            sessionStorage.setItem("favorites", JSON.stringify(parsedListFavorites))
            return
        }

        let favoritesPokemon = []
        favoritesPokemon.push(favorite)

        sessionStorage.setItem("favorites", JSON.stringify(favoritesPokemon))
    };
  
    useEffect(() => {
        fetchPokemon()
    }, [])
  
    useEffect(() => {
        const filteredResults = data.filter(result =>
            result.name.toLowerCase().includes(search.toLowerCase())
        );
    
        setResults(filteredResults)
    }, [data, search])

return (
    <div>
        <div className="searching">
            <input type="text" placeholder="Buscar" onChange={handleSearch} />
        </div>
        <div className='card_container'>
            {results?.map((pok) => (
                <Card key={pok.id} sx={{ width: "23rem", marginBottom: "1rem" }}>
                    <CardMedia
                        sx={{ height: "19rem" }}
                        image={pok.sprites.front_default}
                        title={pok.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {firstLetterMayus(pok.name)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">ID: {pok.id}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Habilidades: {pok.abilities.map(a => <ul><li>{firstLetterMayus(a.ability.name)}</li></ul>)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tipo: {pok.types.map(a => <ul><li>{firstLetterMayus(a.type.name)}</li></ul>)}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: 'center' }}>
                        <Button variant="contained" onClick={() => agregarFavorito(pok)} size="small">Agregar a favoritos</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default Search
