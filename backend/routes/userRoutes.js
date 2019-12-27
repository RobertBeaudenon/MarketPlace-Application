const express = require('express');

const router = express.Router();

const UserCtrl = require('../controllers/users');
const AuthHelper = require('../Helpers/authHelper');

router.get('/users', AuthHelper.VerifyToken, UserCtrl.GetAllUsers);
router.get('/user/:id', AuthHelper.VerifyToken, UserCtrl.GetUser);
router.get('/username/:username', AuthHelper.VerifyToken, UserCtrl.GetUserByName);

module.exports = router;
