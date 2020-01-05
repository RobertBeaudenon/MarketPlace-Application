const express = require('express');

const router = express.Router();

const messageCtrl = require('../controllers/message');
const AuthHelper = require('../Helpers/authHelper');

router.post('/chat-messages/:senderId/:receiverId', AuthHelper.VerifyToken, RequestCtrl.SendMessage);

module.exports = router;
