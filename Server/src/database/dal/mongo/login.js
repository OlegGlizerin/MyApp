
const mongoDb = require('../../connection').mongoDb;
const JWT = require('jsonwebtoken');

module.exports.login = function(req, res){

  let usersCol = mongoDb.get().db('dnaze').collection('Users');
  usersCol.findOne({ 
    "loginData.email": req.body.email, 
    'loginData.password': req.body.password 
  },
  function(err, result){
    console.log("_id",result);
    if( !err && result){
        JWT.sign(
            {
                id: result._id
            },
            'secret', {
                    expiresIn: '365d'
            },
            ( err, token ) => {
                if(!err) {
                    
                    console.log( token );
                    res.send({ 
                        token: token,
                        message: 'User success loggedin.' 
                    });
                }
                else {
                    console.log('failed to login: ', err);
                }
            }
        );
    }
    else if(!result) {
      console.log( 'User does not exist.');
      res.status( 403 ).send('Please fix your login data.'); 
    }
    else{
        console.log( 'Error happend in login.', err.message );
        res.sendStatus( 403 );            
    }        
  });
}