import connection from "../database/postgre.js";
import GameDataSchema from "../schemas/GameDataSchema.js";

function ValidateNewGameData(req, res, next) {
    const newGameData = req.body;

    if(!areDataValid(newGameData)) return res.sendStatus(422);

    next()
}

function areDataValid(newGameData) {
    if(!isNameValid(newGameData.name)) return false;
    if(!areStockAndPriceValid(newGameData)) return false;
    if(!isCategoryIdValid(newGameData.categoryId)) return false;

    return true;
}

async function isCategoryIdValid(newGameData) {
    const categoryId = newGameData.categoryId;

    const category = await connection.query("SELECT id FROM categories WHERE id=$1", [categoryId]);

    if(category.rows[0]) return true;
    return false;
}

function areStockAndPriceValid(newGameData) {
    const { stockTotal, pricePerDay } = newGameData;
    
    if(stockTotal > 0 && pricePerDay > 0) return true;

    return false;
}

function isNameValid(newGameData) {
    const newGameName = newGameData.name;

    const validateName = GameDataSchema.validate(newGameName);
    if(validateName.error) return false;

    return true;
}

export default ValidateNewGameData;