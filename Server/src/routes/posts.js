const express = require('express');
const router = express.Router();
const dal = require('../database/dal');

// return all posts
router.get('/', dal.posts.getAllPosts);
// return post by id
router.get('/:id', function(req, res){
    res.send('post by id');
});
// add new post
router.post('/', dal.posts.create);
// update post by id
router.post('/:id', function(req, res){
    res.send(' update post');
});
// delete post by id
router.delete('/:id', function(req, res){
    res.send(' delete post');
});

module.exports = router;