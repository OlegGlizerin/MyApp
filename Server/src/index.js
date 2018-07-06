var routeHome = require('./appRouting/home');
var routePost = require('./appRouting/post');
var routePostCreate = require('./appRouting/postCreate');
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
app.use(routePostCreate);
//routeHome.use("/", routeHome);








app.listen(5000, () => console.log('Example app listening on port 5000!'))







