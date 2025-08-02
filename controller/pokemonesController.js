import PokemonModel from "../model/pokemonesModel.js";

export function GetIndex (req, res, next) {
    PokemonModel.GetAll((pokemones) => {
        res.render("pokemones/index", {
            pokemonList: pokemones,
            hasPokemon: pokemones.length > 0,
            "page-title": "Index Pokemones list"});
    });
};

export function GetCreate (req, res, next) {
    res.render("pokemones/save", {editMode: false ,"page-title": "New Index Pokemones list"});
};

export function PostCreate (req, res, next) {
    const nombre = req.body.nombre;
    const imagen = req.body.imagen;
    const region = req.body.region;
    const tipoPrimario = req.body.tipoPrimario;

    const pokemones = new PokemonModel(
        0, nombre, imagen, region, tipoPrimario); 
    
    pokemones.Save();
    res.redirect("/pokemones/index")
};

export function GetEdit (req, res, next) {
    const id = req.params.pokemonesId;
    PokemonModel.GetById(id, (pokemonList) => {
        if (!pokemonList) {
            return res.redirect("pokemones/index");
        }
         res.render("pokemones/save", {
            editMode: true,
            pokemonList: pokemonList,
            "page-title": `Edit Index Series ${pokemonList.name}`});
    }) 
};

export function PostEdit (req, res, next) {
    const nombre = req.body.nombre;
    const imagen = req.body.imagen;
    const region = req.body.region;
    const tipoPrimario = req.body.tipoPrimario;
    const id = req.body.pokemonesId;

    const pokemones = new PokemonModel(
        Number(id), nombre, imagen, region, tipoPrimario); 
    
    pokemones.Save();
    res.redirect("/pokemones/index")
};

export function Delete (req, res, next) {
    const id = req.body.pokemonesId;

    PokemonModel.Delete(id);
    res.redirect("/pokemones/index")
};

