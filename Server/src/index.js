
const http = require('http');
const app = require('./app');
const port = 4700;
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log('server run on port:',port);
});









