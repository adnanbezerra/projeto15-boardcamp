import connection from "../database/postgre.js";

export async function getCategories(req, res) {
    const categories = await connection.query('SELECT * FROM categories');

    res.send(categories.rows).status(200);
}

export async function postCategories(req, res) {
    const newCategoryName = req.body.name;

    await connection.query('INSERT INTO categories (name) VALUES ($1)', [newCategoryName]);

    res.sendStatus(201);
}