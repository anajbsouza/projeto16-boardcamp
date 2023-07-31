import { db } from "../database/database.connection";

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`);
        res.send(games.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function createGames(req, res) {
    try {
        res.send('oi');
    } catch (err) {
        res.status(500).send(err.message);
    }
}