
const ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;

var poolConfig = {
    min: 10,
    max: 200,
    log: true,
    idleTimeoutMillis: 50, evictionRunIntervalMillis: 5, softIdleTimeoutMillis: 5
};

var connectionConfig = {
    userName: 'myapplicationdb',
    password: 'Rc4Q71N13~~5',
    server: 'mssql2.gear.host'

    
};



function connection() { 
    var pool = new ConnectionPool(poolConfig, connectionConfig);
   
   return pool;

}

const connect = connection();

module.exports = connect;




