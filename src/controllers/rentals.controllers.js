import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

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
}

export async function createRental(req, res) {
    try {
        res.send('oi');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function finishRental(req, res) {
    try {
        res.send('oi');

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