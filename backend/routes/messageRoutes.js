const express = require('express');

const router = express.Router();

const messageCtrl = require('../controllers/message');
const AuthHelper = require('../Helpers/authHelper');

router.post('/chat-messages/:sender_Id/:receiver_Id', AuthHelper.VerifyToken, messageCtrl.SendMessage);
router.get('/chat-messages/:sender_Id/:receiver_Id', AuthHelper.VerifyToken, messageCtrl.GetAllMessages);
router.get('/receiver-messages/:sender/:receiver', AuthHelper.VerifyToken, messageCtrl.MarkReceiverMessages);
router.get('/mark-all-messages', AuthHelper.VerifyToken, messageCtrl.MarkAllMessages);

module.exports = router;
