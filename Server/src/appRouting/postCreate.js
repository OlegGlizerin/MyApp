



var allRows = [];
const express = require('express');
const dbConnection = require('../dalManager/appDbConnection')

routePost = express.Router();

routePost.post("/postCreate", postContent);


function postContent(req, res, next) {


    executeStatement1();

    res.send(allRows);
    allRows = [];

}



module.exports = routePost;









var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;


function executeStatement1() {
    //console.log()
    //console.log(routePost, 1);
    request = new Request("insert into Posts(postid,userid, postSubject, postContent) values (4,2,'new','qwe')", function (err, rowCount, rows) {
        if (err) {
            //console.log(err);
        }
        else {
            console.log(rowCount);

        }
    });
    
    // request.on('row', function (columns) {
    //     var post = {
            
    //     };
      
    //     columns.forEach(function (column) {
    //         post[column.metadata.colName] = column.value;
    //         console.log(post)
    //     });
    //     allRows.push(post);
    // });


    
    //console.log(allRows.values);
    dbConnection.execSql(request);
    
}  

