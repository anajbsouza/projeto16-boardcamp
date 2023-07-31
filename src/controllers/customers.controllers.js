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
        res.send('oi');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function createCustomer(req, res) {
    try {
        res.send('oi');
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