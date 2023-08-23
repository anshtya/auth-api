const userTableQuery = 'CREATE TABLE IF NOT EXISTS users(email VARCHAR, password CHAR(8));';

module.exports = { userTableQuery };