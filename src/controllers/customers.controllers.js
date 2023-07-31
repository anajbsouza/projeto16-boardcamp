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
    const { name, phone, birthday, cpf } = req.body;
    try {
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
    const { id } = req.params;
    const { name, phone, birthday, cpf } = req.body;
    try {
        await db.query(`
            UPDATE customers 
            SET name=$1, phone=$2, birthday=$3, cpf=$4
            WHERE id=$5
        `)
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
} 