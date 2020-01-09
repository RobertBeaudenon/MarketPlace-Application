const express = require('express');
const router = express.Router(); //allows us to create the routes

const PostCtrl = require('../controllers/posts');
const AuthHelper = require('../helpers/authHelper');

router.get('/posts', AuthHelper.VerifyToken, PostCtrl.GetAllPosts);
router.get('/post/:id', AuthHelper.VerifyToken, PostCtrl.GetPost); //get a single post
router.post('/post/add-post', AuthHelper.VerifyToken, PostCtrl.AddPost); //User will only be allowed to post if token is still valid
router.post('/post/add-like', AuthHelper.VerifyToken, PostCtrl.AddLike);
router.post('/post/add-comment', AuthHelper.VerifyToken, PostCtrl.AddComment);

module.exports = router;
