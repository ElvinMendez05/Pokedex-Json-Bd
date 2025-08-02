import RegionModel from "../model/regionesModel.js";

export function GetIndex (req, res, next) {
    RegionModel.GetAll((regiones) => {
        res.render("regiones/index", {
            regionList: regiones,
            hasRegion: regiones.length > 0,
            "page-title": "Index Regiones list"});
    });
};

export function GetCreate (req, res, next) {
    res.render("regiones/save", {editMode: false ,"page-title": "New Index Regiones list"});
};

export function PostCreate (req, res, next) {
    const nombre = req.body.nombre;

    const regiones = new RegionModel(
        0, nombre); 
    
    regiones.Save();
    res.redirect("/regiones/index");
};

export function GetEdit (req, res, next) {
    const id = req.params.regionesId;
    RegionModel.GetById(id, (regionList) => {
        if (!regionList) {
            return res.redirect("regiones/index");
        }
         res.render("regiones/save", {
            editMode: true,
            regionList: regionList,
            "page-title": `Edit Index Regiones ${regionList.name}`});
    }) 
};

export function PostEdit (req, res, next) {
    const nombre = req.body.nombre;
    const id = Number(req.body.regionesId);

    const regiones = new RegionModel(
        Number(id), nombre); 
    
    regiones.Save();
    res.redirect("/regiones/index")
};

export function Delete (req, res, next) {
    const id = req.body.regionesId;

    RegionModel.Delete(id);
    res.redirect("/regiones/index")
};
