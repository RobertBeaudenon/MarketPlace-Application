const express = require('express');
const router = express.Router(); //allows us to create the routes

const ImageCtrl = require('../controllers/images');
const AuthHelper = require('../Helpers/authHelper');

router.get('/set-default-image/:imgS3Key', AuthHelper.VerifyToken, ImageCtrl.SetDefaultImage);
router.post('/upload-image', AuthHelper.VerifyToken, ImageCtrl.UploadImage);

module.exports = router;
