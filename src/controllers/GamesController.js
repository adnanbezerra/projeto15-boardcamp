import connection from "../database/postgre.js";

export async function getGames(req, res) {
    const gameNameLike = req.query.name;

    if (gameNameLike) {
        res.status(200).send(await getGamesWithQuery(gameNameLike));
    } else {
        res.status(200).send(await getGamesWithoutQuery());
    }
}

export async function postGames(req, res) {
    const newGame = req.body;

    const {name, image, stockTotal, categoryId, pricePerDay} = newGame;

    await connection.query(`
            INSERT INTO games 
            (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES ('${name}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay})
            `);

    res.sendStatus(201);
}

// Support functions

async function getGamesWithQuery(gameNameLike) {
    gameNameLike.toLowerCase();
    const games = await connection.query(`
            SELECT games.*, categories.name AS categoryName 
            FROM games 
            JOIN categories 
            ON games."categoryId"=categories.id 
            WHERE LOWER(games.name) LIKE $1`,
        [`${gameNameLike}%`]);
    return games.rows;
}

async function getGamesWithoutQuery() {
    const games = await connection.query('SELECT games.*, categories.name AS categoryName FROM games JOIN categories ON games."categoryId"=categories.id');
    return games.rows;
}