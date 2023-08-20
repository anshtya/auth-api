const express = require('express');
const app = express();
const port = 3000;

//routes
const authRoutes = require('./routes/auth');

app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});