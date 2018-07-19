
const poolInstance = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const mainComments = require('./mainComments');

let posts = [];
let connectionForRequest;
let request;

//public functions
module.exports.getAllPosts = function(req, res){
    poolInstance.ssms.on('error', function(err) {
        console.error(err);
    });
    poolInstance.ssms.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connectionForRequest = connection;
        request = getAllPostsRequest(close, res);
        connectionForRequest.execSql(request); 
    });
}


module.exports.create = function(req, res){
    let query = 
        `insert into Posts(userId, postSubject, postContent) values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}')`;

        poolInstance.ssms.acquire(function (err, connection) {
        connectionForRequest = connection;
        request = new Request(query, requestError);
        connectionForRequest.execSql(request);
        res.send("Ok");
    });
}





//private functions 
function close(err, rowCount, rows) {
    if (err) {
        console.log(err);
    }
    else{
        connectionForRequest.release();
        connectionForRequest.close();
    }
}




function getAllPostsRequest(close, res) {
    query = "select * from Posts";

    request = new Request(query, close); 
    request.on('doneProc', function (rowCount, more, rows) { 
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
    return request;
}



    
