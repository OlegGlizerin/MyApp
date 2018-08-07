
import React, { Component } from 'react';
import './App.css';

import Post from './Componenets/Post/Post'; 
// props =>  userName,catalog,title,content

class App extends Component {
    constructor( props ){
        super( props );
       
        
        this.state = {
            posts: [],
            comments: [],
            postsContent: ";"
        }
        this.loadPosts();

    }
    loadPosts(){
        console.log(this.state.postsContent)
        console.log('load posts')
        //ToDo2ss
        fetch('http://localhost:4700/posts',{
            method: 'post',
            
            headers: {
               
                'Content-Type': 'text/html'
                
            },
            //instead of quotes ''
            body: JSON.stringify(this.state.postsContent)
        })
        .then(function(res) {
            console.log(res);
            return res.json();                
        })
        .then((data)=>{

            let existingPosts = this.state.postsContent;

            data.forEach(post => {
                existingPosts += post.postId + ";"
            });
         
            this.setState({
                postsContent : existingPosts,
                posts: this.state.posts.concat(data)
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
                        userName = {post.userName}
                        catalogName = {post.catalogName}
                        likes = {post.likes}
                        createDate = {post.createDate}
                        commentContent = {post.commentContent}
                    />;     
        });
        return (
            <div className = "App">
                <div className = 'content'>               
                    <div className='posts'>
                        {postContent}
                    </div>             
                </div>  
                <button type="button" className="morePosts"  onClick={(e) => {this.loadPosts()}} >More posts...</button>       
            </div>    
        );
    }

    loadComments(){
        //ToDo2ss
        console.log('load comments')
        fetch('http://localhost:4700/comments',{
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
