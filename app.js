import express from 'express';
import {engine} from 'express-handlebars';
import { projectRoot } from './utils/paths.js';
import path from 'path';
import homeRoutes from './router/home.js';
import pokemonRoutes from './router/pokemonesRoute.js';
import regionRoutes from './router/regionesRoutes.js';
import tiposRoutes from './router/tiposRoutes.js';

const app = express();

//render engine
app.engine('hbs', engine({
   layoutsDir: "views/layouts",
   defaultLayout: "main",
   extname: "hbs",
   helpers: {
       section: function(name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }, eq: function(a, b) {
        return Number(a) === Number(b);
      },
      
      includes: function (array, value) {
    return Array.isArray(array) && array.includes(value);
  }
   }
}));


app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(projectRoot, 'public')));

//routes 
app.use(homeRoutes);
app.use('/pokemones', pokemonRoutes);
app.use('/regiones', regionRoutes);
app.use('/tipos', tiposRoutes);


app.use((req, res) => {
    res.status(404).render('404', {title: "Page not found"});
});

app.listen(3000);