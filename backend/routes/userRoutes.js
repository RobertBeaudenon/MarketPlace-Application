const express = require('express');

const router = express.Router();

const UserCtrl = require('../controllers/users');
const AuthHelper = require('../Helpers/authHelper');

router.get('/users', AuthHelper.VerifyToken, UserCtrl.GetAllUsers);

module.exports = router;
