import { db } from "../database/database.connection.js"

export async function validateCreateRental(req, res, next) {
    const { customerId, gameId } = req.body;

    const customers = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId]);
    if (customers.rowCount === 0) return res.sendStatus(400);

    const games = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId]);
    if (games.rowCount === 0) return res.sendStatus(400);

    const checkGameStock = await db.query(`
        SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;
    `, [gameId]);
    if (checkGameStock.rowCount >= games.rows[0].stockTotal) return res.sendStatus(400);

    res.locals.pricePerDay = games.rows[0].pricePerDay;
    next();
}

export async function validateReturnRental(req, res, next) {
    const { id } = req.params;

    const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
    if (rental.rowCount === 0) return res.status(404).send({ message: "Aluguel inexistente!" });
    if (rental.rows[0].returnDate !== null) return res.status(400).send({ message: "Aluguel já foi devolvido!" });

    const { originalPrice, daysRented, rentDate } = rental.rows[0];
    res.locals.pricePerDay = originalPrice / daysRented
    res.locals.rentDate = rentDate
    res.locals.daysRented = daysRented

    next();
}

export async function validateDeleteRental(req, res, next) {
    const { id } = req.params

    const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
    if (rental.rowCount === 0) return res.sendStatus(404);
    if (rental.rows[0].returnDate === null) return res.sendStatus(400);
    next();
}