import connection from "../database/postgre.js";

export async function getCustomers(req, res) {
    const customerCpf = parseInt(req.query.cpf);

    if (customerCpf) {
        res.send(await getCustomersWithCpf(customerCpf)).status(200);
    } else {
        res.send(await getCustomersWithoutCpf()).status(200);
    }
}

export async function getCustomerById(req, res) {
    const id = req.params.id;

    const customer = await connection.query(`SELECT * FROM customers WHERE id=$1`, [id]);

    if (customer.rows[0]) res.send(customer.rows).status(200);
    res.sendStatus(404);
}

export async function postCustomer(req, res) {
    const newCustomer = req.body;

    const { name, phone, cpf, birthday } = newCustomer;

    await connection.query(`
        INSERT INTO customers
        (name, phone, cpf, birthday)
        VALUES
        ('${name}', '${phone}', '${cpf}', '${birthday}')`);

    res.sendStatus(201);
}

export async function putCustomer(req, res) {
    const userId = parseInt(req.params.id);
    const newUserInfo = req.body;
    const { name, phone, cpf, birthday } = newUserInfo;

    await connection.query(`
        UPDATE customers
        SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}'
        WHERE id=${userId}
    `)

    res.sendStatus(200);
}

// Support functions

async function getCustomersWithCpf(customerCpf) {
    const customer = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1`, [`${customerCpf}%`]);
    return customer.rows;
}

async function getCustomersWithoutCpf() {
    const customer = await connection.query(`SELECT * FROM customers`);
    return customer.rows;
}