
const express = require('express');
const router = express.Router();
const dal = require('../database/dal');

// return all messages

router.get('/', dal.mainComments.getAll);

// return post by id
router.get('/:id', function(req, res){
    res.send('comments by id');
});
// add new messages
router.post('/',function(req, res){
    res.send(' new comments');
});
// update messages by id
router.post('/:id', function(req, res){
    res.send(' update comments');
});
// delete messages by id
router.delete('/:id', function(req, res){
    res.send(' delete comments');
});

module.exports = router;