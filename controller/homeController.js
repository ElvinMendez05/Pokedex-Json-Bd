// export function GetHome(req, res, next) {
//   res.render("home/home", { "page-title": "Home" });
// }

// import SeriesModel from '../models/seriesModel.js';
// import GeneroModel from '../models/generoModel.js';

// export function GetHome(req, res, next) {
//   const nombreFiltro = req.query.nombre?.toLowerCase() || "";
//   const generoFiltro = req.query.genero || "";

//   SeriesModel.GetAll((series) => {
//     GeneroModel.GetAll((generos) => {
//       let seriesFiltradas = series;

//       if (nombreFiltro) {
//         seriesFiltradas = seriesFiltradas.filter(serie =>
//           serie.nombre.toLowerCase().includes(nombreFiltro)
//         );
//       }

//       if (generoFiltro) {
//         seriesFiltradas = seriesFiltradas.filter(serie =>
//           serie.genero === generoFiltro
//         );
//       }

//       res.render("home/home", {
//         "page-title": "Home",
//         seriesList: seriesFiltradas,
//         hasSeries: seriesFiltradas.length > 0,
//         generos: generos
//       });
//     });
//   });
// }

import PokemonModel from '../model/pokemonesModel.js';
import RegionModel from '../model/regionesModel.js';

export function GetHome(req, res, next) {
  const nombreFiltro = req.query.nombre?.toLowerCase() || "";
  const regionesSeleccionadas = req.query.regiones || []; // puede ser string o array

  // Aseguramos que regionesSeleccionadas siempre sea array
  const regionesFiltro = Array.isArray(regionesSeleccionadas)
    ? regionesSeleccionadas
    : [regionesSeleccionadas];

  PokemonModel.GetAll((pokemones) => {
    RegionModel.GetAll((regiones) => {
      let pokemonesFiltrados = pokemones;

      // Filtro por nombre
      if (nombreFiltro) {
        pokemonesFiltrados = pokemonesFiltrados.filter(p =>
          p.nombre.toLowerCase().includes(nombreFiltro)
        );
      }

      // Filtro por regiones seleccionadas
      if (regionesFiltro.length > 0 && regionesFiltro[0] !== "") {
        pokemonesFiltrados = pokemonesFiltrados.filter(p =>
          regionesFiltro.includes(p.region)
        );
      }

      res.render("home/home", {
        "page-title": "Inicio Pokémon",
        pokemonList: pokemonesFiltrados,
        hasPokemon: pokemonesFiltrados.length > 0,
        regiones: regiones,
        regionesSeleccionadas: regionesFiltro,
        nombreBuscado: req.query.nombre || ""
      });
    });
  });
}
