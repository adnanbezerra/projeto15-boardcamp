import connection from "../database/postgre.js";

async function ValidateDeleteId(req, res, next) {
    const deleteId = parseInt(req.params.id);

    const isThereSuchId = await connection.query("SELECT * FROM rentals WHERE id=$1", [deleteId]);

    if(isThereSuchId.rows[0]) next()
    else return res.sendStatus(404);
}

export default ValidateDeleteId;