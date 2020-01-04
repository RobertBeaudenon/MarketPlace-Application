const express = require('express');

const router = express.Router();

const RequestCtrl = require('../controllers/requests');
const AuthHelper = require('../Helpers/authHelper');

router.post('/add-request', AuthHelper.VerifyToken, RequestCtrl.AddRequest);
router.post('/cancel-request', AuthHelper.VerifyToken, RequestCtrl.CancelRequest);
router.post('/cancel-application', AuthHelper.VerifyToken, RequestCtrl.CancelApplication);
router.post('/mark/:id', AuthHelper.VerifyToken, RequestCtrl.MarkNotification);
router.post('/mark-all', AuthHelper.VerifyToken, RequestCtrl.MarkAllNotifications);
router.post('/add-task', AuthHelper.VerifyToken, RequestCtrl.AddTask);
router.post('/mark-task/:id', AuthHelper.VerifyToken, RequestCtrl.MarkTask);
router.post('/clean-website', AuthHelper.VerifyToken, RequestCtrl.CleanWebsite);

module.exports = router;
