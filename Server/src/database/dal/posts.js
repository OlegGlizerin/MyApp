
const poolInstance = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const mainComments = require('./mainComments');

let posts = [];
let conectivity;
module.exports.getAllPosts = function(req, res){
    

    poolInstance.ssms.on('error', function(err) {
        console.error(err);
    });
    poolInstance.ssms.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        conectivity = connection;

        request = new Request("select * from Posts",requestError); 
        console.log('get all posts....');
        request.on('doneProc', function (rowCount, more, rows) { 
            console.log('doneProc');
            console.log(posts);    
            res.send(posts);
            
            posts = [];
        });
    
        request.on('row', function (columns) {
            let post = {}; 
            columns.forEach(function (column) {
                post[column.metadata.colName] = column.value;
            });
            posts.push(post);
        });
        
    
        
        
        conectivity.execSql(request); 


    });





    
    
}
var allRows = [];

module.exports.create = function(req, res){
    let query = 
        `insert into Posts(userId, postSubject, postContent) values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}')`;

    var request = new Request(query, requestError);
        
 
    poolInstance.ssms.execSql(request);
    

    res.send(allRows);
    allRows = [];
}

function requestError(err, rowCount, rows) {
    if (err) {
        console.log(err);
    }
    else{
        conectivity.release();
        conectivity.close();
    }
}



    
