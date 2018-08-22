
const mongoDb = require('../../connection').mongoDb;

module.exports.getAllPosts = function(req, res){
  
  mongoDb.get().db('dnaze').collection("Posts").find({}, function(err, docs) {
        docs.each(function(err, doc) {
          if(doc) {
            console.log(doc);
          }
          else {
            
          }
        });
      });

      res.send('See console for a list of available collections');
}