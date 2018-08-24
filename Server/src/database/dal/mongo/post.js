
const mongoDb = require('../../connection').mongoDb;
var ObjectId = require('mongodb').ObjectID;

module.exports.getPosts = async function( req, res , data){
    let userId = req.paylod.id;
    let user;
    try {
        user = await mongoDb.get()
            .db('dnaze')
            .collection('Users')
            .findOne({
                "_id": new ObjectId(userId)
            }
        );
    }
    catch(err) {
        console.log('Failed to find user: ', err.message);
    }

    let posts = [];
    let i = 0;
    (function getPostsByCatalogs() {
        try {
             let answer = user.catalogs.map(
                (catalog) => {
                    return new Promise(function(resolve, reject) {
                        let post = mongoDb.get().db('dnaze').collection(catalog).find()
                        .toArray(function(err, posts) {
                            if(err) {
                                reject(err);
                            }
                            else {
                                resolve(posts);
                            }
                        });
                
                        
                    });
            
            });
            Promise.all(answer).then((val) => {
                let postsAfterApply = [].concat.apply([], val);
                res.send(postsAfterApply);
            });
        }
        catch(err) {
            console.log('getPostsByCatalogs error: ',err.message);
        }
    })();

    



    //res.json(posts);
   
    
    // mongoDb.get().db('dnaze').collection("Posts").find().toArray( (err, posts ) => {
    //     if( err){
    //         res.sendStatus(403);
    //     }
    //     else {
    //         console.log(posts);
    //         res.json( posts );
    //     }
        
    // });



}