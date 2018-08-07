const axios = require('axios');


const createPostConfig = {
    url: 'http://localhost:4700/posts',
    method: 'post',
    headers:{
        'content-type': 'application/json'
    }
    
}

const createCommentConfig = {
    url: 'http://localhost:4700/comments',
    method: 'post',
    headers:{
        'content-type': 'application/json'
    }
}


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

const PostApi = {
    createPost: async function( postData ) {
        createPostConfig.data =  JSON.stringify( postData );
        try{
            var res = await axios( createPostConfig );
            console.log(res);
        }
        catch( err){
            console.log('createPost error:', err.message );
        } 
    },

    createComment: async function( commentData ) {
        createCommentConfig.data =  JSON.stringify( {
            postId: 1,
            commentContent: commentData
        });

        try{
            var res = await axios( createCommentConfig );
            console.log(res);
        }
        catch( err){
            console.log('createComment error:', err.message );
        }
    }
}

export default PostApi;