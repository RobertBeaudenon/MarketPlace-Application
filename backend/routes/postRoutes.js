const express = require('express');
const router = express.Router(); //allows us to create the routes

const PostCtrl = require('../controllers/posts');

router.post('/post/add-post', PostCtrl.AddPost);

module.exports = router;
