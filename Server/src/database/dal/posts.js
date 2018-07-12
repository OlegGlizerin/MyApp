
const connection = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const mainComments = require('./mainComments');

let posts = [];
let result = {};
module.exports.getAll = function(req, res){
    
    request = new Request("select * from Posts",requestError);  
    
    request.on('doneProc', function (rowCount, more, rows) { 
        console.log('fetch post and now gets messages...');
       
          
        
         

    });
    request.on('requestCompleted', function () {
        let comments = [];
        query = "select * from MainComments";
        
        let request2 = new Request(query, requestError);     
        request2.on('doneProc', function (rowCount, more, rows) {       
            result.comments = (comments.reverse());
            comments = []; 
            console.log('done');
            console.log(result)
        });
    
        request2.on('row', function (columns) {
            // on 4 same fucntion OUTSIDE function
            let comment = {}; 
            columns.forEach(function (column) {
                comment[column.metadata.colName] = column.value;
            });
            comments.push(comment);
        });  
        request2.on('requestCompleted', function () { 
                res.send(result)
        });
        
        connection.ssms.execSql(request2); 
        console.log('rC think first') ;
        result.posts = posts;
        // test
        posts = []; 
    });
    request.on('row', function (columns) {
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
    let query = 
        `insert into Posts(userId, postSubject, postContent) values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}')`;

    var request = new Request(query, requestError);
        
 
    connection.ssms.execSql(request);
    

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



    
