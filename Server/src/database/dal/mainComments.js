
const poolInstance = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

let mainComments = [];
let query;
let connectivity;

module.exports.getAll = function(req, res){ 

    poolInstance.ssms.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connectivity = connection;

        console.log('get all comments....')
        query = "select * from MainComments";
        request = new Request(query, requestError);     
        request.on('doneProc', function (rowCount, more, rows) {   
            console.log('fetch comments ...');
            console.log(mainComments);    
            res.send(mainComments);
            mainComments = []; 
        });
    
        request.on('row', function (columns) {
            // on 4 same fucntion OUTSIDE function
            let comment = {}; 
            columns.forEach(function (column) {
                comment[column.metadata.colName] = column.value;
            });
            mainComments.push(comment);
        });   
        
        connectivity.execSql(request); 
    });



   
       
}

var allRows = [];

module.exports.create = function(req, res){
    //query = `insert into MainComments(userId, postSubject, postContent) values (${req.body.userId}, '${req.body.postSubject.toString()}', '${req.body.postContent}')`;

    var request2 = new Request(query, requestError);
        
 
    poolInstance.ssms.execSql(request2);
    

    res.send(allRows);
    allRows = [];
}

function requestError(err, rowCount, rows) {
    if (err) {
        console.log(err);
    }
    else{
        
        connectivity.release();
        connectivity.close();
    }
}



    
