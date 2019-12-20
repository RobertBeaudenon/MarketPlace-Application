const express = require('express');
const router = express.Router(); //allows us to create the routes

const PostCtrl = require('../controllers/posts');
const AuthHelper = require('../Helpers/authHelper');

router.get('/posts', AuthHelper.VerifyToken, PostCtrl.GetAllPosts);
router.post('/post/add-post', AuthHelper.VerifyToken, PostCtrl.AddPost); //User will only be allowed to post if token is still valid

module.exports = router;
