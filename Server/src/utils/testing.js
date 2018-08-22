
this.x = require('tedious');
this.anObject = { name:"An object" };



var aFunction = function(t, callback) {
    //var innerThis = this; // "this" is node global object
    //console.log(innerThis);
    console.log(t, t === module.exports, t === this, this);
    return callback;
};

function y (callback, a) {
    callback(a);
}


