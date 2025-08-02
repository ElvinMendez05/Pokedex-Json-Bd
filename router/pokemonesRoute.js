import express from 'express';
import { GetIndex, GetCreate, PostCreate, 
    Delete, GetEdit, PostEdit } from '../controller/pokemonesController.js';

const router = express.Router();

//Genero route
router.get('/index', GetIndex);
router.get('/create', GetCreate);
router.post('/create', PostCreate);
router.post('/delete', Delete);
router.get('/edit/:pokemonesId', GetEdit);
router.post('/edit/:pokemonesId', PostEdit);

export default router;