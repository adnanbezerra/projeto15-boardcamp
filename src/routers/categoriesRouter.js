import { Router } from "express";
import { getCategorias, postCategorias } from "../controllers/CategoriesController";

const router = Router();

router.get('/categorias', getCategorias);
router.post('/categorias', postCategorias);

export default router;