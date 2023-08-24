const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { pool } = require('../database/db');
const { userInsertQuery, userCheckQuery } = require('../database/sql_query');

dotenv.config();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        await pool.query(userInsertQuery(email, password));
        const token = jwt.sign({ user_email: email }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
        res.json({ access_token: token });
    } catch (err) {
        res.json({ "error": `${err.message}` });
    }
});
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(userCheckQuery(email, password));
        const rowCount = result.rowCount;
        if (rowCount == 0) {
            res.json({ "error": "User doesn't exist. Please sign-up" });
        } else {
            const token = jwt.sign({ user_email: email }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
            res.json({ "access_token": `${token}` });
        }
    } catch (err) {
        res.json({ "error": `${err.message}` });
    }
});

module.exports = router;