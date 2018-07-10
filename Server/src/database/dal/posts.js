
const connection = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

let posts = [];

module.exports.getAll = function(req, res){
    
    //console.log(connection)
    request = new Request("select * from Posts", function (err, rowCount, rows) {
        if (err)
            console.log(err);
    });   
    
    request.on('doneProc', function (rowCount, more, rows) { 
        
        res.send(posts.reverse());
        //console.log(posts);
        posts = []; // truncate

        console.log("Posts appear.");
    });
    request.on('row', function (columns) {
        console.log("first");
        let post = {}; 
        columns.forEach(function (column) {
            //console.log(column.metadata.colName + ":" + column.value)
            post[column.metadata.colName] = column.value;
            //console.log(post)
        });
        posts.push(post);
        //console.log(posts);
    });

    
    
    connection.ssms.execSql(request); 
    
    
}
var allRows = [];

module.exports.create = function(req, res){
    let query = 
        `insert into Posts(userId, postSubject, postContent) values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}')`;

        console.log(query);
    var request2 = new Request(query, createPost);
        
 
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



    
