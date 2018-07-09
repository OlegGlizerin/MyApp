
const connection = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

let posts = [];

module.exports.getAll = function(req, res){
    request = new Request("select * from Posts", function (err, rowCount, rows) {
        if (err)
            console.log(err);
    });   
    request.on('row', function (columns) {
        let post = {};   
        columns.forEach(function (column) {
            post[column.metadata.colName] = column.value;
            console.log(post)
        });
        posts.push(post);
    });
    connection.ssms.execSql(request); 
    console.log(allRows.length);
    res.send(allRows);
    posts = []; // truncate
}
var allRows = [];

module.exports.create = function(req, res){
    let query = 
        `insert into Posts(userid, postSubject, postContent)
        values (${req.body.id},new,qwe)`;

    var request2 = new Request(query, createPost);
        
    console.log(request2) 
    connection.ssms.execSql(request2);
    

    res.send(allRows);
    allRows = [];
}

function createPost(err, rowCount, rows) {
    if (err) {
        console.log(err);
    }
    else{

    }
}



    
