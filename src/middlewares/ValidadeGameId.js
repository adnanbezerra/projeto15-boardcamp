import connection from "../database/postgre.js";

async function ValidateGameId(req, res, next) {
    const gameId = req.body.gameId;

    const { rows: game } = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId])

    res.locals.game = game;

    if (game[0].id) next()
    else return res.status(400).send("foi no gameId")
}

export default ValidateGameId;