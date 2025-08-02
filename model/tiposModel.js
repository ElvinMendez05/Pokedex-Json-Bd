import path from "path";
import { projectRoot } from '../utils/paths.js';
import { saveDataInFile, GetAllDataFromFile } from '../utils/fileHandrler.js';

const dataPath = path.join(projectRoot, "data", "tipos.json");

class Tipos {
    constructor(id, nombre, tiposId) {
        this.id = id;
        this.nombre = nombre;
        this.tiposId = tiposId;
    }

    Save() {
        GetAllDataFromFile(dataPath, (tipoList) => {
            if (this.id !== 0) {
                const editTipoIndex = tipoList.findIndex(
                (tipoList) => tipoList.id === Number(this.id)
                );
                tipoList[editTipoIndex] = this;
                saveDataInFile(dataPath, tipoList);
            } else {
                this.id = Math.random() * 10000;
                tipoList.push(this);
                saveDataInFile(dataPath, tipoList);
            }
        });
    }

    static GetAll(callback) {
        GetAllDataFromFile(dataPath, callback);
    }

    static GetById(id, callback) {
    GetAllDataFromFile(dataPath, (tipoList) => {
      const tipo = tipoList.find(
        (tipo) => tipo.id === Number(id)
      );
      if (tipo) {
        callback(tipo);
      } else {
        callback(null);
       }
     });
    }

    static Delete(id) {
        GetAllDataFromFile(dataPath, (tipoList) => {
            const newTipoList = tipoList.filter((tipos) => tipos.id !== Number(id) );
            saveDataInFile(dataPath, newTipoList);
        })
    }
}

export default Tipos;
