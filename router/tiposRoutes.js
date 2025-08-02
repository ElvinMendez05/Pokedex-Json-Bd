import express from 'express';
import { GetIndex, GetCreate, PostCreate, 
    Delete, GetEdit, PostEdit } from '../controller/tiposController.js';

const router = express.Router();

//Genero route
router.get('/index', GetIndex);
router.get('/create', GetCreate);
router.post('/create', PostCreate);
router.post('/delete', Delete);
router.get('/edit/:tiposId', GetEdit);
router.post('/edit/:tiposId', PostEdit);

export default router;