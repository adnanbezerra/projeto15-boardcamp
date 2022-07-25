import connection from "../database/postgre.js";

async function ValidateCustomerId(req, res, next) {
    const customerId = req.body.customerId;

    const { rows: customer } = await connection.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);

    if (customer[0].id) next();
    else return res.status(400).send("Foi no customerId");
}

export default ValidateCustomerId;