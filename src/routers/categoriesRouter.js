import { Router } from "express";
import { getCategories, postCategories } from "../controllers/CategoriesController.js";
import { ValidateNewCategoryExistance } from "../middlewares/ValidateNewCategoryExistance.js";
import validateNewCategoryName from "../middlewares/ValidateNewCategoryName.js";

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', validateNewCategoryName, ValidateNewCategoryExistance, postCategories);

export default router;