export async function validateCreateGame(req, res, next) {
    try {
        res.send('oi');
    } catch (err) {
        res.status(500).send(err.message)
    }
}