const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();
var addRequestId = require('express-request-id')();
var fs = require('fs')
app.use(cors());
app.use(bodyParser.text({ type: 'text/html' }))
app.use('/', bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.use(addRequestId);
app.use('/posts', router.posts);
app.use('/comments', router.mainComments);

fs.writeFile('log.txt', '', function(){console.log('log.txt file clear.')})

module.exports  = app;
