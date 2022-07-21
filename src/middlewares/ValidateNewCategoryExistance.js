import connection from "../database/postgre.js";

export async function ValidateNewCategoryExistance(req, res, next) {
    const name = req.body.name;
    const checkName = await connection.query("SELECT * FROM categories WHERE name = $1", [name]);

    if (isNameExistent(checkName)) return res.sendStatus(409);

    next()
}

function isNameExistent(checkName) {
    return checkName.rows.length !== 0;
}