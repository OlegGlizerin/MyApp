var routeHome = require('./route/home');
var routePost = require('./route/post');
const express = require('express')

var cors = require('cors')
var app = express()

app.use(cors())

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(routeHome);
app.use(routePost);
//routeHome.use("/", routeHome);








app.listen(4000, () => console.log('Example app listening on port 4000!'))







