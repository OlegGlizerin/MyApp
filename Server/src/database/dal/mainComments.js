
const connection = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

let posts = [];
let query;

module.exports.getAll = function(req, res){ 
    query = "select * from MainComments";
    request = new Request(query, requestError);     
    request.on('doneProc', function (rowCount, more, rows) {       
        res.send(posts.reverse());
        posts = []; 
    });

    request.on('row', function (columns) {
        // on 4 same fucntion OUTSIDE function
        let post = {}; 
        columns.forEach(function (column) {
            post[column.metadata.colName] = column.value;
        });
        posts.push(post);
    });   
    
    connection.ssms.execSql(request); 
       
}

var allRows = [];

module.exports.create = function(req, res){
    query = 
        `insert into Posts(userId, postSubject, postContent) values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}')`;

    var request2 = new Request(query, requestError);
        
 
    connection.ssms.execSql(request2);
    

    res.send(allRows);
    allRows = [];
}

function requestError(err, rowCount, rows) {
    if (err) {
        console.log(err);
    }
    else{

    }
}



    
