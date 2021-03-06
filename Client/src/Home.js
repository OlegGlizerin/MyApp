
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Post from './Componenets/Post/Post';
const axios = require('axios');


class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            token: props.token,
            posts: []
        }
        this.loadPosts();
    }

    

    render() {
        const posts = this.state.posts.map(( post ) =>{
            return( 
                <Post
                     ownerName ={ post.ownerName }
                     ownerLastName ={ post.ownerLastName }
                     ownerName ={ post.ownerName }
                     ownerName ={ post.ownerName }
                     ownerName ={ post.ownerName }
                />
            );
        });
        return(
            <div> 
                { posts }
             </div>
        ); 
    }


    loadPosts(){
        
        console.log(this.state.formData)
        const config = {
            url: 'http://localhost:4700/posts',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': this.state.token
            }
        }
        axios( config ).then(( res ) => {
            
            console.log(res.data);
            this.setState({
                posts: res.data
            })
            

        })
        .catch(( err ) => {
            if(err) {
                console.log('Get posts failed.', err.message);
            }
        });
            
        
        // console.log('load posts')
        // //ToDo2ss
        // fetch('http://localhost:4700/posts',{
        //     method: 'post',
            
        //     headers: {
               
        //         'Content-Type': 'text/html',
        //         'Authentication': this.state.token
        //     },
        //     //instead of quotes ''
        //     body: JSON.stringify(this.state.postsContent)
        // })
        // .then(function(res) {
        //     console.log(res);
        //     return res.json();                
        // })
        // .then((data)=>{
        //     console.log("data111111:" ,data);
        //     let existingPosts = this.state.postsContent;

        //     data.forEach(post => {
        //         existingPosts += post.postId + ";"
        //     });
         
        //     this.setState({
        //         postsContent : existingPosts,
        //         posts: this.state.posts.concat(data)
        //     });
        //     console.log(data);
        //     // this.loadComments();
            
        // })
        // .catch( err=>{
        //     console.log( err);
        // });




    }
}



export default Home;