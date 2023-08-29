const { pool } = require('../database/db');
const { userGetUserName } = require('../database/sql_query');

const checkUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const result = await pool.query(userGetUserName(username));
        const rowCount = result.rowCount;

        if (rowCount != 0) {
            res.status(400).json({ "error": "Username already exists" });
        } else {
            res.status(200).json({ "message": "OK" });
        }
    } catch (error) {
        console.error('error: ', error)
        res.status(500).json({ "error": "An error occured" });
    }
};

module.exports = checkUsername;