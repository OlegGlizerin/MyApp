



var allRows = [];
const express = require('express');

routePost = express.Router();

routePost.post("/posts", postContent);

var connection;
function postContent(req, res, next) {

    var x = req.body;
    var Connection = require('tedious').Connection;
    var config = {
        userName: 'sa',
        password: 'root',
        server: 'localhost',
        // If you are on Microsoft Azure, you need this:  
        options: { encrypt: true, database: 'dnazeDB' }
    };
    connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        console.log("Connected");
        executeStatement1();
  
        
    });

    console.log(allRows.length);
    res.send(allRows);
    allRows = [];
    // console.log("posted post.");
}



module.exports = routePost;









var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;


function executeStatement1() {
    request = new Request("select * from Posts", function (err, rowCount, rows) {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(rowCount);

        }
    });
    
    request.on('row', function (columns) {
        var post = {
            
        };
      
        columns.forEach(function (column) {
            post[column.metadata.colName] = column.value;
            console.log(post)
        });
        allRows.push(post);
    });


    
    //console.log(allRows.values);
    connection.execSql(request);
    
}  

