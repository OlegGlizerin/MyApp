
const poolInstance = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const date = require('../../utils');
const mainComments = require('./mainComments');

let posts = [];
let likes = [];
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
        `insert into Posts values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}', '${date.currentDate}', '${date.currentDate}');insert into catalogspostsextended values ((select IDENT_CURRENT('Posts')), (select catalogid from catalogs where catalogName = '${req.body.catalogName}'))`;

        poolInstance.ssms.acquire(function (err, connection) {
        connectionForRequest = connection;
        request = new Request(query, close);
        connectionForRequest.execSql(request);
        res.send("200 Ok : insert into posts.");
    });
   

}


module.exports.getAllLikes = function(req, res){
    poolInstance.ssms.on('error', function(err) {
        console.error(err);
    });
    poolInstance.ssms.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connectionForRequest = connection;
        request = getAllLikesRequest(close, res);
        connectionForRequest.execSql(request); 
    });
}

module.exports.setLike = function(req, res){
    let query = 
        `insert into PostsLikes values (${req.body.postId}, '${req.body.userId}')`;

        poolInstance.ssms.acquire(function (err, connection) {
        
        connectionForRequest = connection;
        request = new Request(query, close);
        connectionForRequest.execSql(request);
        
        res.send("200 Ok : liked");
    });
}

module.exports.unLike = function(req, res) {
    let query = 
        `delete from PostsLikes where postId = ${req.body.postId} and userId = ${req.body.userId}`;
        console.log(req.body.userId);
        poolInstance.ssms.acquire(function (err, connection) {
        connectionForRequest = connection;
        request = new Request(query, close);
        connectionForRequest.execSql(request);
        res.send("200 Ok : unliked");
    });
}





//private functions 
function close(err, rowCount, rows) {
    if (err) {
        console.log(err.message);
    }
    else{
        connectionForRequest.release();
        connectionForRequest.close();
    }
}




function getAllPostsRequest(close, res) {
    query = "select p.userId, u.userName,p.postSubject, p.postContent, p.createDate, p.postId, c.catalogName from Posts as p left join Users as u on p.userId = u.userId left join CatalogsPostsExtended as cpe on p.postId=cpe.postId left join Catalogs as c on c.catalogId = cpe.catalogId";


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


function getAllLikesRequest(close, res) {
    query = "select pl.postsLikesId, pl.postId, u.userName from PostsLikes as pl left join posts as p on pl.postId = p.postId left join Users as u on u.userId = pl.userId";

    console.log('here');
    request = new Request(query, close); 
    request.on('doneProc', function (rowCount, more, rows) { 
        console.log(likes);
        res.send(likes);
        likes = [];
    });
    request.on('row', function (columns) {
        let like = {}; 
        columns.forEach(function (column) {
            like[column.metadata.colName] = column.value;
        });
        likes.push(like);
    });
    return request;
}



    
