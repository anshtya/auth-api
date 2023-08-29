const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../database/db');
const {
    userInsertQuery,
    userCheckQuery,
    userGetHashQuery
} = require('../database/sql_query');

dotenv.config();

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const result = await pool.query(userCheckQuery(email, username));
        const rowCount = result.rowCount;

        if (rowCount != 0) {
            res.status(400).json({ "error": "User already exists. Please sign-in instead" });
        } else {
            const hash = await bcrypt.hash(password, 10);

            await pool.query(userInsertQuery(username, email, hash));
            const token = jwt.sign({
                user_email: email,
                username: username
            }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });

            res.status(201).json({ "access_token": `${token}` });
        }
    } catch (error) {
        console.error('error: ', error)
        res.status(500).json({ "error": "An error occured" });
    }
};

const signIn = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const result = await pool.query(userCheckQuery(email, username));
        const rowCount = result.rowCount;
        if (rowCount == 0) {
            res.status(401).json({ "error": "User doesn't exist. Please sign-up" });
        } else {
            const result = await pool.query(userGetHashQuery(email, username));
            const hash = result.rows[0].user_password;
            const isPasswordValid = await bcrypt.compare(password, hash);

            if (isPasswordValid) {
                const token = jwt.sign({
                    user_email: email,
                    username: username
                }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });

                res.status(200).json({ "access_token": `${token}` });
            } else {
                res.status(401).json({ "error": "Incorrect password" });
            }
        }
    } catch (error) {
        console.error('error: ', error)
        res.status(500).json({ "error": "An error occured" });
    }
};

module.exports = { signUp, signIn }