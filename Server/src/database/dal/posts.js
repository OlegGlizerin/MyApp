const poolInstance = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const date = require('../../utils');
const mainComments = require('./mainComments');
const fs = require('fs');

let lineNum = 1;

let likes = [];


//public functions
module.exports.getAllPosts = function(req, res){
    let date = new Date().toLocaleString('en-GB');
    var msg = 'new connection: ' + req.id  + ', ' + date + '\n';
    fs.appendFile('log.txt', lineNum++ + ': ' + msg, (err)=>{
        if( err)
            console.log('erron on write to log' + date + ' :', err.message + '\n' );
    });
 
    poolInstance.ssms.on('error', function(err) {
        console.error(err);
    });
    poolInstance.ssms.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        
        request = getAllPostsRequest(connection, req.body, req, res);
        connection.execSql(request); 
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
        // connectionForRequest.close();
    }
}

function f( err, rowCount, con ,req){
    if(err) {
        console.error(err);
    }
    let date = new Date().toLocaleString('en-GB');
    var msg = 'close connection: ' + req.id + ', ' + date + '\n';
    fs.appendFile('log.txt', lineNum++ + ': ' + msg, (err)=>{
        if( err)
            console.log('erron on write to log' + date + ' :', err.message + '\n' );
    });
    con.release();
}



function getAllPostsRequest(connection, postIdsFromReq, req, res) {
    query = "exec getAllPosts " + postIdsFromReq;
    let posts = [];

    let request = new Request(query, ( err, rowCount ) => { f( err, rowCount,  connection, req) } ); 
    request.on('doneProc', function (rowCount, more, rows) { 
   
        var newPosts = parseComments(posts);
        res.send(newPosts);
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

//concatenate comments to posts
function parseComments(posts){

    const res = [];
    let c;
    res.push(posts.shift());
    res[0].commentContent = [res[0].commentContent];
    while( c = posts.shift()){
        if(res[res.length-1].postId === c.postId){
            res[res.length-1].commentContent.push(c.commentContent);
        }
        else{
            
            res.push(c);
        }
           
    }  
    return res;    
}

// function parseComments(posts) {
//     let newPosts = []
//     let currentPostId;
//     let commentContent = []
//     let newPost = [];
//     posts.forEach(element => {
//         if(currentPostId) {
//             currentPostId = element.postId;
//         }

//         if(element.postId != currentPostId) {
//             newPosts.push(commentContent);
//         }
//         else {
//             if(!newPosts.includes(element.postId)) {
//                 newPost.postId = element.postId,
//             newPost.userId = element.userId,
//             newPost.userName = element.userName,
//             newPost.postSubject = element.postSubject,
//             newPost.postContent = element.postContent,
//             newPost.createdate = element.createDate,
//             newPost.catalogName = element.catalogName,
//             newPost.likes = element.likes,
//             newPost.AllComments = 
//             }
            
            
//         }

        

//     });
// }


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