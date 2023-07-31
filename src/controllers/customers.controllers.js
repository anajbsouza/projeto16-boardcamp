import { db } from "../database/database.connection.js"

export async function getCustomers(req, res) {
    try {
        const { customers } = await db.query(`SELECT * FROM customers;`);
        res.send(customers.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCustomerById(req, res) {
    try {
        const { id } = req.params;
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
        if (customer.rowCount === 0) return res.sendStatus(404);
        res.send(customer.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function createCustomer(req, res) {
    try {
        const { name, phone, birthday, cpf } = req.body;
        await db.query(`
            INSERT INTO customers (name, phone, birthday, cpf)
            VALUES ($1, $2, $3, $4);
        `, [name, phone, birthday, cpf])
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateCustomer(req, res) {
    try {
        res.send('oi');
    } catch (err) {
        res.status(500).send(err.message);
    }
} 