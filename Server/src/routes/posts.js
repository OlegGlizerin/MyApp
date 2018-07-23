const express = require('express');
const router = express.Router();
const dal = require('../database/dal');

// return all posts
router.get('/', dal.posts.getAllPosts);

// add new post
router.post('/', dal.posts.create);

// get all likes of post
router.get('/like', dal.posts.getAllLikes);

// like post
router.post('/like', dal.posts.setLike);

// unlike post
router.delete('/like', dal.posts.unLike);

module.exports = router;