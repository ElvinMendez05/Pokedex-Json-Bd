import TiposModel from "../model/tiposModel.js";

export function GetIndex (req, res, next) {
    TiposModel.GetAll((tipos) => {
        res.render("tipos/index", {
            tiposList: tipos,
            hasTipos: tipos.length > 0,
            "page-title": "Index Tipos list"});
    });
};

export function GetCreate (req, res, next) {
    res.render("tipos/save", {editMode: false ,"page-title": "New Index Tipos list"});
};

export function PostCreate (req, res, next) {
    const nombre = req.body.nombre;

    const tipos = new TiposModel(
        0, nombre); 
    
    tipos.Save();
    res.redirect("/tipos/index");
};

export function GetEdit (req, res, next) {
    const id = req.params.tiposId;
    TiposModel.GetById(id, (tiposList) => {
        if (!tiposList) {
            return res.redirect("tipos/index");
        }
         res.render("tipos/save", {
            editMode: true,
            tiposList: tiposList,
            "page-title": `Edit Index Tipos ${tiposList.name}`});
    }) 
};

export function PostEdit (req, res, next) {
    const nombre = req.body.nombre;
    const id = Number(req.body.tiposId);

    const tipos = new TiposModel(
        Number(id), nombre); 
    
    tipos.Save();
    res.redirect("/tipos/index")
};

export function Delete (req, res, next) {
    const id = req.body.tiposId;

    TiposModel.Delete(id);
    res.redirect("/tipos/index")
};
