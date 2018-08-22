
const mongoDb = require('../../connection').mongoDb;




module.exports.register = function(req, res){
    const user = organizeUsers3MainObjects(req.body);
    let usersCol = mongoDb.get().db('dnaze').collection('Users');
    let users = usersCol.find().toArray(( err, users)=>{
        if( err ){
            console.log( 'error on find users:', err.message);
            res.send('hara sing up')
        }
        usersCol.insertOne( user, ( err, result) => {
            // console.log(result);
            res.send('ok');
        });
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