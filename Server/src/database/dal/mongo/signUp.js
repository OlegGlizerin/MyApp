
const mongoDb = require('../../connection').mongoDb;
const JWT = require('jsonwebtoken');


module.exports.register = function(req, res){
    const user = organizeUsers3MainObjects(req.body);
    let usersCol = mongoDb.get().db('dnaze').collection('Users');
    usersCol.find({ "loginData.email": user.loginData.email }).toArray(( err, users)=>{
        if( !err ){
            // email adress empty
            if( users.length === 0 ){
                usersCol.insertOne( user, ( err, result ) => {
                    if( !err ){
                        JWT.sign(
                            {
                                id: result.insertedId
                            },
                            'secret', {
                                    expiresIn: '365d'
                            },
                            ( err, token ) => {
                                if(!err) {

                                    console.log( token );
                                    res.send({ 
                                        token: token,
                                        message: 'User success sign up.' 
                                    });
                                }
                                else {
                                    console.log('failed in sign in: ', err);
                                }
                            }
                        );
                    }
                    else{
                        console.log( 'error on inser new user:', err.message );
                        res.sendStatus( 403 );
                    }
                }); 
            }
            else{
                console.log('users exits cant sign up');
                res.status(403).json({
                    message: 'user email exists'
                }); 
            }
               
        }
        else{
            console.log( 'error on find users:', err.message );
            res.sendStatus( 403 );            
        }        
    });
}

function organizeUsers3MainObjects(user) {
    return {
        loginData: {
            email: user.email,
            password: user.password1
        },
        personalData: {
            age: user.age,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            country: user.country
        },
        catalogs : [
            user.answer1, 
            user.answer2, 
            user.answer3
        ]
    }
}