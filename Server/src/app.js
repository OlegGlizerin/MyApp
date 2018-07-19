const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();

app.use(cors());
app.use('/', bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use('/posts', router.posts);
app.use('/comments', router.mainComments);
module.exports  = app;
