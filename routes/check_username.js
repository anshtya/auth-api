const express = require('express');
const router = express.Router();
const checkUsername = require('../controllers/check_username');

router.post('/checkusername', checkUsername);

module.exports = router;