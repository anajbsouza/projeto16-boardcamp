import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
    try {
        const { rentals } = await db.query(`
            SELECT rentals.*, customers.name AS "nameCustomer", games.name AS "nameGame"
            FROM rentals
            JOIN customers ON rentals."customerID" = customers.id
            JOIN games ON rentals."gamesID" = games.id;
        `)
        const result = rentals.map((rental) => {

            const rentalResponse = {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName
                }
            }

            delete rentalResponse.customerName;
            delete rentalResponse.gameName;
            return rentalResponse;
        })

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const { pricePerDay } = res.locals;

    try {
        await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, null, null);
       `, [customerId, gameId, daysRented, dayjs().format('YYYY-MM-DD'), pricePerDay * daysRented]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function finishRental(req, res) {
    const { id } = req.params;
    const { pricePerDay, daysRented, rentDate } = res.locals;
    let delayFee = null;

    const difference = dayjs().diff(dayjs(rentDate), 'days');

    if (difference > daysRented) {
        delayFee = pricePerDay * (difference - daysRented);
    }

    try {
        await db.query(`
            UPDATE rentals
                SET "returnDate"=$1, "delayFee"=$2
                WHERE id=$3;
        `, [dayjs().format('YYYY-MM-DD'), delayFee, id]);
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRental(req, res) {
    try {
        res.send('oi');
    } catch (err) {
        res.status(500).send(err.message);
    }
} 