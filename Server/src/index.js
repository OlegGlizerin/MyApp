
const http = require('http');
const app = require('./app');
const port = 4700;


const mongoDb = require('./database/connection').mongoDb;
let server;

mongoDb.connect()
.then(()=>{
    console.log('connected to mongodb success');
    server = http.createServer(app);
    server.listen(port, () => {
        console.log('server run on port:', port);
    });
})
.catch( err => {
    console.log( 'failed to connect to mongodb:', err.message );
});

// connect();
// async function connect() {
//     try{
//         var result = await mongoDb.connect();        
//         server = http.createServer(app);
//         server.listen(port, () => {
//             console.log('server run on port:', port);
//         });
//     }
//     catch(e){
//         console.log( 'failed to connect to mongodb:', e.message );        
//     }
// }




