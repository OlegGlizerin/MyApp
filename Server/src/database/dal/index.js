
// const posts = require('./posts');
// const mainComments = require('./mainComments');
// const signUp = require('./signUp');


const posts = require('./mongo/MONGOPosts');
const mainComments = require('./mongo/MONGOMainComments');
const signUp = require('./mongo/MONGOSignUp');
const login = require('./mongo/login');


module.exports.posts = posts;
module.exports.mainComments = mainComments;
module.exports.signUp = signUp;
module.exports.login = login;
