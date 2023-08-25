const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    user_name VARCHAR(15) UNIQUE NOT NULL,
    user_email VARCHAR UNIQUE NOT NULL,
    user_password VARCHAR NOT NULL,
    user_bio VARCHAR(150) DEFAULT '' NOT NULL
);`;

const userInsertQuery = (username, email, password) => {
    return `INSERT INTO users (user_name, user_email, user_password) 
    VALUES ('${username}', '${email}', '${password}');`
};

const userCheckQuery = (email, username) => {
    return `SELECT FROM users WHERE user_email = '${email}' OR user_name = '${username}';`
};

const userGetHashQuery = (email, username) => {
    return `SELECT user_password FROM users WHERE user_email = '${email}' OR user_name = '${username}';`
};

const userGetUserName = (username) => {
    return `SELECT user_name FROM users WHERE user_name = '${username}';`
}

module.exports = { userTableQuery, userInsertQuery, userCheckQuery, userGetHashQuery, userGetUserName };