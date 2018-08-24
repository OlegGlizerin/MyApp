const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();
let addRequestId = require('express-request-id')();
const fs = require('fs');

app.use(cors());
app.use(bodyParser.text({ type: 'text/html' }));
app.use('/', bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use(addRequestId);
app.use('/posts', router.posts);
// app.use('/comments', router.mainComments);

app.use('/signUp', router.signUp);

app.use('/login', router.login);

// fs.writeFile('log.txt', '', function(){console.log('log.txt file clear.')})

module.exports  = app;
