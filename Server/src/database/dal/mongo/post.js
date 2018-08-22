
const mongoDb = require('../../connection').mongoDb;

module.exports.getPosts = function( req, res ){
    mongoDb.get().db('dnaze').collection("Posts").find().toArray( (err, posts ) => {
        if( err){
            res.sendStatus(403);
        }
        else {
            console.log(posts);
            res.json( posts );
        }
        
    });

}