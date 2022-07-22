import connection from "../database/postgre.js";

async function ValidateNewGameExistance(req, res, next) {
    const newGameName = req.body.name;

    const game = await connection.query("SELECT * FROM games WHERE name=$1", [newGameName]);

    if(game.rows.length !== 0) return res.sendStatus(409);

    next();
}

export default ValidateNewGameExistance;