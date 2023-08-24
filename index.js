const express = require('express');
const dotenv = require('dotenv');
const { initDb } = require('./database/db');
const app = express();

//routes
const authRoutes = require('./routes/auth');

//loads environment variables
dotenv.config();

//Setup Postgres Database
initDb();

app.use(express.json());
app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
});