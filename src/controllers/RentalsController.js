import connection from "../database/postgre.js";
import dayjs from 'dayjs';

export async function getRentals(req, res) {
    const gameId = req.query.gameId;
    const customerId = req.query.customerId;

    if (gameId) {
        res.send(await getRentalsByGameId(gameId)).status(200);
    } else if (customerId) {
        res.send(await getRentalsByCustomerId(customerId)).status(200);
    } else {
        res.send(await getRentalsWithoutId()).status(200);
    }
}

export async function postRental(req, res) {
    const newRental = req.body;
    const { customerId, gameId, daysRented } = newRental;
    const { rows: priceQuery } = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1`, [gameId]);
    const pricePerDay = priceQuery[0].pricePerDay

    const originalPrice = pricePerDay * daysRented;
    const returnDate = null, delayFee = null;
    const rentDate = dayjs().format('YYYY-MM-DD');

    await connection.query(`
        INSERT INTO rentals
        ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee")
        VALUES
        (${customerId}, ${gameId}, ${daysRented}, '${rentDate}', ${returnDate}, ${originalPrice}, ${delayFee})
        `);

    res.sendStatus(201);
}

export async function returnRental(req, res) {
    const idRental = parseInt(req.params.id);
    const { rows: rental } = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [idRental]);

    const delayFee = calculateDelayFee(rental[0]);
    const today = dayjs().format("YYYY-MM-DD");

    await connection.query(`
        UPDATE rentals SET "returnDate"='${today}', "delayFee"='${delayFee}' WHERE id=${idRental}
        `)

    res.sendStatus(200);
}

export async function deleteRental(req, res) {
    const rentalId = req.params.id;

    await connection.query(`DELETE FROM rentals WHERE id=$1`, [rentalId]);

    res.sendStatus(200);
}

// Support functions

function calculateDelayFee(rental) {

    const DAYS_IN_MILISSECONDS = 86400000;
    const today = dayjs().format("YYYY-MM-DD");

    const rentalDate = rental.rentDate;
    const daysRented = rental.daysRented;
    const gamePrice = rental.originalPrice;

    const formatedDate = dayjs(today);
    const dateDifference = formatedDate.diff(rentalDate) / DAYS_IN_MILISSECONDS;

    let delayFee;
    if (dateDifference > daysRented) {
        delayFee = gamePrice * dateDifference;
    } else {
        delayFee = 0;
    }

    return delayFee;
}

async function getRentalsByCustomerId(customerId) {
    const { rows: rentals } = await connection.query(`SELECT * FROM rentals WHERE "customerId"=$1`, [customerId]);
    const rentalsFinal = [];

    for (let rental of rentals) {
        const { rows: game } = await connection.query(`SELECT * FROM games WHERE id=$1`, [rental.gameId]);
        const { rows: customer } = await connection.query(`SELECT * FROM customers WHERE id=$1`, [rental.customerId]);

        rentalsFinal.push({ ...rental, game, customer });
    }

    return rentalsFinal;
}

async function getRentalsByGameId(gameId) {
    const { rows: rentals } = await connection.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId]);
    const rentalsFinal = []

    for (let rental of rentals) {
        const { rows: game } = await connection.query(`SELECT * FROM games WHERE id=$1`, [rental.gameId]);
        const { rows: customer } = await connection.query(`SELECT * FROM customers WHERE id=$1`, [rental.customerId]);

        rentalsFinal.push({ ...rental, game, customer });
    }

    return rentalsFinal;
}

async function getRentalsWithoutId() {
    const { rows: rentals } = await connection.query(`SELECT * FROM rentals`);
    const rentalsFinal = []

    for (let rental of rentals) {
        const { rows: game } = await connection.query(`SELECT * FROM games WHERE id=$1`, [rental.gameId]);
        const { rows: customer } = await connection.query(`SELECT * FROM customers WHERE id=$1`, [rental.customerId]);

        rentalsFinal.push({ ...rental, game, customer });
    }

    return rentalsFinal;
}