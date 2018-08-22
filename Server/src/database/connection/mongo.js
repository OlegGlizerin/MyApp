var MongoClient = require('mongodb').MongoClient;  


let connection;

// Connection URL
const url = 'mongodb+srv://glizbrod:1234qwer!@keepitsimple-qnuja.gcp.mongodb.net/';

const options = {
	useNewUrlParser: true,
	poolSize: 10
}

module.exports.connect = () => new Promise((resolve,reject)=>{
	
	MongoClient.connect( url, options, ( err, client ) => {
		if( err ){
			reject( err );
		}
		connection = client;
		resolve();
	});
});


module.exports.get = () => {
	if( !connection ) {
		throw new Error('Call connect first!');
	}
	return connection;
}


// // Create the database connection, default pool size is 5
// function connection() {
// 	return new Promise((resolve,reject)=>{
// 		MongoClient.connect(url, {  
// 			useNewUrlParser: true,
// 			poolSize: 10
// 			// other options can go here
// 			},
// 			function(err, client) {
// 				if(err) {
// 					reject(err);
// 				}
// 				const mongoDb = client.db('dnaze');
// 				console.log('Mongo Initializing Done.');


// 				mongoDb.collection("Posts").find({}, function(err, docs) {
// 					docs.each(function(err, doc) {
// 					  if(doc) {
// 						console.log(doc);
// 					  }
// 					  else {
						
// 					  }
// 					});
// 				  });
				
// 				client.close();


				
// 				resolve(mongoDb);
				
// 			}
// 		);

// 	});
	
// }

// async function f(){
// 	var table = await connection();
// 	console.log(table);
// 	module.exports.mongoDb = table; // i dont if it posible - export like this after async action
// }
// f();





















