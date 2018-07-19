
const poolInstance = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

let mainComments = [];
let query;
let connectionForRequest;
let request;


//Public Functions

//Get all comments from DB
//-----------------------------------------
module.exports.getAll = function(req, res){ 
    
    poolInstance.ssms.acquire(function (err, connection) {
        if (err) {
            console.error(err); 
            return;
        }
        connectionForRequest = connection;
        request = getAllCommentsRequest(close, res);
        connectionForRequest.execSql(request); 
    });
}
//-----------------------------------------




// TODO: Make it work good
//Create Comment
//-----------------------------------------
module.exports.create = function(req, res){
    query = `insert into MainComments(userId, postSubject, postContent) values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}')`; 
    poolInstance.ssms.acquire(function (err, connection) {
        connectionForRequest = connection;
        request = new Request(query, requestError);
        connectionForRequest.execSql(request);
        res.send("Ok");
    });
}
//-----------------------------------------



//private functions
//-----------------------------------------
function getAllCommentsRequest(callBack, res) {
    query = "select * from MainComments";
    request = new Request(query, callBack);     
        request.on('doneProc', function (rowCount, more, rows) {   
            res.send(mainComments);
            mainComments = []; 
        });
        request.on('row', function (columns) {
            let comment = {}; 
            columns.forEach(function (column) {
                comment[column.metadata.colName] = column.value;
            });
            mainComments.push(comment);
        });   
    return request;
}
//-----------------------------------------

//Callback request - handling release and close connectivity
//-----------------------------------------
function close(err, rowCount, rows) {
    if (err) {
        console.log(err);
    }
    else{
        
        connectionForRequest.release();
        connectionForRequest.close();
    }
}
//-----------------------------------------