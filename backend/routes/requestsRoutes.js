const express = require('express');

const router = express.Router();

const RequestCtrl = require('../controllers/requests');
const AuthHelper = require('../Helpers/authHelper');

router.post('/add-request', AuthHelper.VerifyToken, RequestCtrl.AddRequest);
router.post('/cancel-request', AuthHelper.VerifyToken, RequestCtrl.CancelRequest);
router.post('/cancel-application', AuthHelper.VerifyToken, RequestCtrl.CancelApplication);
router.post('/mark/:id', AuthHelper.VerifyToken, RequestCtrl.MarkNotification);

module.exports = router;
