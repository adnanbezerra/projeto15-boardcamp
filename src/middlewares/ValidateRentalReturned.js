import connection from "../database/postgre.js";

async function ValidateDeleteReturned(req, res, next) {
    const deleteId = parseInt(req.params.id);
    const isPost = req.route.methods.post;

    const rentalToBeDeleted = await connection.query("SELECT * FROM rentals WHERE id=$1", [deleteId]);

    if (isPost) {
        if (rentalToBeDeleted.rows[0].returnDate === null) next();
        else return res.sendStatus(400);
    } else {
        if (rentalToBeDeleted.rows[0].returnDate === null) return res.sendStatus(400);
        else next();
    }

    next();
}

export default ValidateDeleteReturned;