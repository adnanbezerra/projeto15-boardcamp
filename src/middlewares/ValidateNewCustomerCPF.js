import connection from "../database/postgre.js";

async function ValidateNewCustomerCPF(req, res, next) {
    const { cpf } = req.body;

    const checkCpf = await connection.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);

    if(isCpfExistent(checkCpf)) return res.sendStatus(409);

    next();
}

function isCpfExistent(cpf) {
    return cpf.rows.length !== 0;
}

export default ValidateNewCustomerCPF;