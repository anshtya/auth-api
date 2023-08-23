const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/db');
const app = express();

//routes
const authRoutes = require('./routes/auth');

//loads environment variables
dotenv.config();

//Connecting Postgres
pool.connect((err, client, done) => {
  if (err) throw err;
  done();
});

app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
});