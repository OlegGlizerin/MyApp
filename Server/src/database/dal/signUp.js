const poolInstance = require('../connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const date = require('../../utils');
const fs = require('fs');
let lineNum = 1;
let query;


//Public Functions




// TODO: Make it work good
//Create user
//-----------------------------------------
module.exports.register = function(req, res){
    let date = new Date().toLocaleString('en-GB');
    let user = req.body;
    let keys = Object.keys(user);
    let newUserId;
    console.log('usser',user);

    
    queryUsers = `insert into Users values('${user.email}', '${user.password1}', '${date}', '${date}', '${keys[0]}', '${keys[2]}'); select @@identity`;

    poolInstance.ssms.on('error', function(err) {
        console.error('In Register function: ', err);
    });
    poolInstance.ssms.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        
        request = new Request(queryUsers, ( err, rowCount ) => { f( err, rowCount,  connection, req) } ); 
        request.on('row', function(columns) {
            newUserId = columns[0].value;
        });
        request.on('requestCompleted', function (rowCount, more, rows) { 
            queryUsersCatalog = `insert into UserCountry values (${newUserId}, '${user[keys[2]]}')`;
            poolInstance.ssms.acquire(function (err, connection) {
                if (err) {
                    console.error(err);
                    return;
                }
                let request2 = new Request(queryUsersCatalog, ( err, rowCount ) => { f( err, rowCount,  connection, req) } ); 
                connection.execSql(request2);
            });
            res.send("New user inserted to db.");
        });
        connection.execSql(request);
        
    });
}






//-----------------------------------------



//private functions
//-----------------------------------------

function f( err, rowCount, con ,req){
    if(err) {
        console.error(err);
    }

    con.release();
}


//-----------------------------------------
