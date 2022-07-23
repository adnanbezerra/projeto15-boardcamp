import connection from "../database/postgre.js";

async function ValidateAlterCpf(req, res, next) {
    const { cpf } = req.body;
    const queryId = parseInt(req.params.id);

    const user = await connection.query('SELECT * FROM customers WHERE cpf=$1', [cpf]);

    if (!user.rows[0]) next();

    if (user.rows[0].id === queryId){
        next();
    } else {
        return res.sendStatus(409);
    }
}

export default ValidateAlterCpf;