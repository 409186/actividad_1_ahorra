import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { firstLetterMayus } from "../Searching/Search.utils";
import { useState } from 'react';
import './favorite.css'

const Favorites = () => {
    const favorite = sessionStorage.getItem("favorites")

    const [listFavorites, setListFavorites] = useState(JSON.parse(favorite))

    const handleChange = (e) => {
        if(!listFavorites) return

        if(e.target.value === "a-z"){
            let newListFavorite = [...listFavorites]
            newListFavorite.sort((a, b) => {
                if(a.name < b.name){
                    return -1
                }
                if(a.name > b.name){
                    return 1
                }
                return 0
            })
            setListFavorites(newListFavorite)
        }

        if(e.target.value === "type"){
            let newListFavorite = [...listFavorites]
            newListFavorite.sort((a, b) => {
                if(a.types[0].type.name < b.types[0].type.name){
                    return -1
                }
                if(a.types[0].type.name > b.types[0].type.name){
                    return 1
                }
                return 0
            })
            setListFavorites(newListFavorite)
        }
    }

    const handleDeleteFavorite = (pokemon) => {
        const newPokemon = listFavorites.filter(pok => pok.id !== pokemon.id)
        setListFavorites(newPokemon)
        sessionStorage.setItem("favorites", JSON.stringify(newPokemon))
    }

    return (
        <>
            <select onChange={handleChange} className='filter_pokemon' defaultValue={""}>
                <option value="" hidden>select filter</option>
                <option value="a-z">A-Z</option>
                <option value="type">Tipo</option>
            </select>
            <div className='card_container'>
                {favorite && listFavorites.map((pok) => (
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
                                Tipo: {pok.types.map(a => <ul><li>{a.type.name}</li></ul>)}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex", justifyContent: 'center' }}>
                            <Button variant="contained" onClick={() => handleDeleteFavorite(pok)} size="small">Eliminar de favoritos</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Favorites
