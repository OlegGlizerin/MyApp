



var allRows = [];
const express = require('express');
const dbConnection = require('../dalManager/appDbConnection')

routePost = express.Router();

routePost.post("/posts", postContent);


function postContent(req, res, next) {

    executeStatement1();

    console.log(allRows.length);
    res.send(allRows);
    allRows = [];
    
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
            console.log(rowCount);

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
    dbConnection.execSql(request);
    
}  

