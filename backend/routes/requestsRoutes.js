const express = require('express');

const router = express.Router();

const RequestCtrl = require('../controllers/requests');
const AuthHelper = require('../Helpers/authHelper');

router.post('/add-request', AuthHelper.VerifyToken, RequestCtrl.AddRequest);

module.exports = router;
