
const express = require('express');
const router = express.Router();
const dal = require('../database/dal/mongo');

// return all messages

router.post('/', dal.signUp.register);


module.exports = router;