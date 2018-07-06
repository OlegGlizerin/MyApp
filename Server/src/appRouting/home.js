const express = require('express');



const routeHome = express.Router();

routeHome.get("/", get);




function get(req, res, next) {
   
    res.json({"title":1});
    console.log("logged in.");
    //ToDo: add db logic
}


module.exports = routeHome;