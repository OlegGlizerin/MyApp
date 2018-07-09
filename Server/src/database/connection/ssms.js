

const Connection = require('tedious').Connection;
 
module.exports.connection = connection();


function connection() { 
    const config = {
        userName: 'myapplicationdb',
        password: 'Rc4Q71N13~~5',
        server: 'mssql2.gear.host',
        // If you are on Microsoft Azure, you need this:  
        options: { encrypt: true, database: 'myapplicationdb' }
    };
    const dbConnection = new Connection(config);
   
   return dbConnection;

}

