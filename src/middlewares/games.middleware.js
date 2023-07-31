export async function validateCreateGame(req, res, next) {
    try {
        const { name } = req.body;
        const games = await db.query(`SELECT * FROM games WHERE name=$1;`, [name]);
        if(games.rowCount !== 0) return res.sendStatus(409);
        next();
    } catch (err) {
        res.status(500).send(err.message)
    }
}