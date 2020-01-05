const express = require('express');

const router = express.Router();

const messageCtrl = require('../controllers/message');
const AuthHelper = require('../Helpers/authHelper');

router.post('/chat-messages/:senderId/:receiverId', AuthHelper.VerifyToken, messageCtrl.SendMessage);

module.exports = router;
