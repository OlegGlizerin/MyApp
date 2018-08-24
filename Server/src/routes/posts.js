const express = require('express');
const router = express.Router();
const dal = require('../database/dal/mongo');
const JWT = require('jsonwebtoken');

// return all posts
router.post('/', verifyToken, dal.post.getPosts);

// add new post
//router.post('/create', dal.posts.create);

// get all likes of post
//router.get('/like', dal.posts.getAllLikes);

// like post
//router.post('/like', dal.posts.setLike);

// unlike post
//router.delete('/like', dal.posts.unLike);


function verifyToken( req, res, next ){
    const token = req.headers.authentication;
    //console.log(req.headers);
    JWT.verify( token, 'secret', ( err, result) => {
        if( !err ){
            //console.log( 'Token payload: ', result );
            req.paylod = result;
            next();
        }
        else{
            console.log( 'Failed to verify token: ', err.message );

            res.sendStatus( 403 );
        }
    });

    
}

module.exports = router;



