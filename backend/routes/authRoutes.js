const express = require('express');
const router = express.Router(); //allows us to create the routes

//Authentication route using CreateUser method defined in controllers/auth.js
const AuthCtrl = require('../controllers/auth');
router.post('/register', AuthCtrl.CreateUser);

module.exports = router;
