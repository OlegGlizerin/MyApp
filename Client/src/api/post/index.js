
const axios = require('axios');


const createPostConfig = {
    url: 'http://localhost:5000/posts',
    method: 'post',
    data: null,
    headers:{
        'content-type': 'application/json'
    }
}

async function createPost( postData ){
    createPostConfig.data =  JSON.stringify(postData);
    try{
        var res = await axios( createPostConfig );
        console.log(res);
    }
    catch( err){
        console.log('createpost error:', err.message );
    }
}

module.exports.createPost = createPost;



