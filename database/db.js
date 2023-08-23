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

const createTables = () => {
    pool.connect((err, _client, done) => {
        if (err) throw err;

        tableQueries.forEach(query => {
            pool.query(query, (err, _result) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                }
            })
        });
        done();
    });
};

const initDb = () => {
    createTables();
};

module.exports = initDb;