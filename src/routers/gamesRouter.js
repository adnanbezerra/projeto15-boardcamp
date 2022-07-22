import { Router } from "express";
import { getGames, postGames } from "../controllers/GamesController.js";
import ValidateNewGameData from "../middlewares/ValidateNewGameData.js";
import ValidateNewGameExistance from "../middlewares/ValidateNewGameExistance.js";

const router = Router();

router.get('/games', getGames);
router.post('/games', ValidateNewGameExistance, ValidateNewGameData, postGames);

export default router;