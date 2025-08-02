import path from "path";
import { projectRoot } from '../utils/paths.js';
import { saveDataInFile, GetAllDataFromFile } from '../utils/fileHandrler.js';

const dataPath = path.join(projectRoot, "data", "regiones.json");

class Regiones {
    constructor(id, nombre, regionesId) {
        this.id = id;
        this.nombre = nombre;
        this.regionesId = regionesId;

    }

    Save() {
        GetAllDataFromFile(dataPath, (regionList) => {
            if (this.id !== 0) {
                const editRegionIndex = regionList.findIndex(
                (regionList) => regionList.id === Number(this.id)
                );
                regionList[editRegionIndex] = this;
                saveDataInFile(dataPath, regionList);
            } else {
                this.id = Math.random() * 10000;
                regionList.push(this);
                saveDataInFile(dataPath, regionList);
            }
        });
    }

    static GetAll(callback) {
        GetAllDataFromFile(dataPath, callback);
    }

    static GetById(id, callback) {
    GetAllDataFromFile(dataPath, (regionList) => {
      const region = regionList.find(
        (region) => region.id === Number(id)
      );
      if (region) {
        callback(region);
      } else {
        callback(null);
       }
     });
    }

    static Delete(id) {
        GetAllDataFromFile(dataPath, (regionList) => {
            const newRegionList = regionList.filter((regiones) => regiones.id !== Number(id) );
            saveDataInFile(dataPath, newRegionList);
        })
    }
}

export default Regiones;
