
const ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;

var poolConfig = {
    min: 2,
    max: 4,
    log: true
};

var connectionConfig = {
    userName: 'myapplicationdb',
    password: 'Rc4Q71N13~~5',
    server: 'mssql2.gear.host'
};

var Connection;

function connection() { 
    var pool = new ConnectionPool(poolConfig, connectionConfig);
    pool.on('error', function(err) {
        console.error(err);
    });
    pool.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        Connection = connection;
    });
   return pool;

}

const connect = connection();
console.log(connect);
module.exports = connect;

