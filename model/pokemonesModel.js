import path from "path";
import { projectRoot } from '../utils/paths.js';
import { saveDataInFile, GetAllDataFromFile } from '../utils/fileHandrler.js';

const dataPath = path.join(projectRoot, "data", "pokemones.json");

class Pokemones {
    constructor(id, nombre, imagen, region, tipoPrimario) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.region = region;
        this.tipoPrimario = tipoPrimario;
    }

    Save() {
        GetAllDataFromFile(dataPath, (pokemonList) => {
            if (this.id !== 0) {
                const editPokemonIndex = pokemonList.findIndex(
                (pokemonList) => pokemonList.id === Number(this.id)
                );
                pokemonList[editPokemonIndex] = this;
                saveDataInFile(dataPath, pokemonList);
            } else {
                this.id = Math.random() * 10000;
                pokemonList.push(this);
                saveDataInFile(dataPath, pokemonList);
            }
        });
    }

    static GetAll(callback) {
        GetAllDataFromFile(dataPath, callback);
    }

    static GetById(id, callback) {
    GetAllDataFromFile(dataPath, (pokemonList) => {
      const pokemon = pokemonList.find(
        (pokemon) => pokemon.id === Number(id)
      );
      if (pokemon) {
        callback(pokemon);
      } else {
        callback(null);
       }
     });
    }

    static Delete(id) {
        GetAllDataFromFile(dataPath, (pokemonList) => {
            const newPokemonList = pokemonList.filter((pokemones) => pokemones.id !== Number(id) );
            saveDataInFile(dataPath, newPokemonList);
        })
    }
}

export default Pokemones;
