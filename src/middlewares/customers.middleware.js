import { db } from "../database/database.connection.js";

export async function validateCustomerCpf(req, res, next) {
    const { cpf } = req.body;
    const { id } = req.params;
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
        if (customer.rowCount === 0) return next();
        if (customer.rowCount > 0 && customer.rows[0].id === Number(id)) return next();
        return res.status(409).send({ message: "Esse usuário já existe!" });
    } catch (err) {
        res.status(500).send(err.message)
    }
}