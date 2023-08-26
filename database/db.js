const dotenv = require('dotenv');
const { Pool } = require('pg');
const { userTableQuery } = require('./sql_query');

//loads environment variables
dotenv.config();

//Postgres setup
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const tableQueries = [userTableQuery];

const createTables = async () => {
    const client = await pool.connect();
    try {
        for (const query of tableQueries) {
            await client.query(query);
        }
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating table: ', error);
    } finally {
        client.release();
    }
};

const initDb = () => {
    createTables();
};

module.exports = { initDb, pool };