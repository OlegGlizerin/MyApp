
const mongoDb = require('../../connection').mongoDb;

let items = ['Soccer','Fashion','Dogs','Cats','Pusy','Tits','Chicks','But',]




let myobj = {
  date : '2018-08-24 friday 01:00',
  ownerId: 1,
  ownerName: 'Philka',
  ownerLastName: 'Zadrot',
  type: 'Advertise',
  content: 'My first post',
  comments: [],
  Likes: 7,
  catalogs: []
}

function x(){

  

  for(let i = 0; i < 100000; i++) {
    let arr2 = []
    var item;
    let k = 0;
    
    
    k = Math.floor(Math.random()*4) + 1;
    

    for(let n = 0 ; n< k; n++) {
        item = items[Math.floor(Math.random()*items.length)];
        arr2.push(item);
    }

    myobj.catalogs = myobj.catalogs.concat(arr2);
    myobj._id = i + 10000;
    mongoDb.get().db('dnaze').collection("Posts").insertOne(myobj, function(err, res) {
      if (err) throw err;
      
      
    });
  }
  mongoDb.close();  
}

mongoDb.connect()
.then(()=>{
    x();
})
.catch( err => {
    console.log( 'failed to connect to mongodb:', err.message );
});

