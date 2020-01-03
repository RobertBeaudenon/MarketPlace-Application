const express = require('express');

const router = express.Router();

const RatingCtrl = require('../controllers/rating');
const AuthHelper = require('../Helpers/authHelper');

router.post('/add-rating', AuthHelper.VerifyToken, RatingCtrl.AddRating);

module.exports = router;
