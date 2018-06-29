const express = require('express');



const routeLogin = express.Router();

routeLogin.get("/users", get);


function get(req, res, next) {
   
    res.json("logged in.");
    console.log("logged in.");
    //ToDo: add db logic
}


module.exports = routeLogin;