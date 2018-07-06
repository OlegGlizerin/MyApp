import React, { Component } from 'react';
import './App.css';

import FormPost from './FormPost/FormPost';
import Post from './Post/Post';

class App extends Component {
    constructor( props ){
        super( props );
        this.loadPosts();
        this.state = {
            posts: [],
        }

    }
    loadPosts(){
        let posts = [];
        fetch('http://localhost:5000/posts',{
            method: 'post',
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
        })
        .catch( err=>{
            console.log( err)
        });
        
    }
    render() {
        let arr = this.state.posts;
        console.log(1,arr)
        let result = arr.map(( post )=>{
            return <div key={ post.postId } ><Post 
            userName={post.userId}
            catalog={post.postId}
            title={post.postSubject}
            content={post.postContent} /></div>
        });
        return (
            <div className="App">
                <FormPost />
                { result }
               
            </div>    
        );
    }
}

export default App;
