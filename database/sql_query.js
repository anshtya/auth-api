const userTableQuery = 'CREATE TABLE IF NOT EXISTS users (user_email VARCHAR, user_password CHAR(8));';

const userInsertQuery = (email, password) => {
    return `INSERT INTO users VALUES ('${email}', '${password}');`
}

const userCheckQuery = (email) => {
    return `SELECT FROM users WHERE user_email = '${email}';`
}

module.exports = { userTableQuery, userInsertQuery, userCheckQuery };