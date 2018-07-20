
import React, { Component } from 'react';
import './App.css';

import Post from './Componenets/Post/Post'; 
// props =>  userName,catalog,title,content

class App extends Component {
    constructor( props ){
        super( props );
        this.loadPosts();
        
        this.state = {
            posts: [],
            comments: [],
        }

    }
    loadPosts(){
        
        console.log('load posts')
        //ToDo2ss
        fetch('http://localhost:5000/posts',{
            method: 'get',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(function(res) {
            return res.json();                
        })
        .then((data)=>{
            this.setState({
                posts: data,
            });
            console.log(data);
            // this.loadComments();
            
        })
        .catch( err=>{
            console.log( err);
        });
        
    }
    render() {
        var postContent = this.state.posts.map((post) => {
            return <Post
                        key = {post.postId}
                        userId = {post.userId} 
                        postSubject = {post.postSubject} 
                        postContent = {post.postContent}
                    />;     
        });
        return (
            <div className = "App">
                <div className = 'content'>               
                    <div className='posts'>
                        {postContent}
                    </div>             
                </div>         
            </div>    
        );
    }

    loadComments(){
        //ToDo2ss
        console.log('load comments')
        fetch('http://localhost:5000/comments',{
            method: 'get',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(function(res) {
            console.log('comments response.');
            console.log(res);
            return res.json();                
        })
        .then((data)=>{
            this.setState({
                comments: data,
            });
            console.log('In App.js, in loadComments. print data received:')
            console.log(data);
        })
        .catch( err=>{
            console.log( err);
        });
        
    }
  
}

export default App;
