import React, { Component } from 'react';
import './App.css';



import PostBody from './Componenets/Post/js/PostBody';
import PostCreateForm from './Componenets/Post/js/PostCreateForm';



class App extends Component {
    constructor( props ){
        super( props );
        this.loadPosts();
        this.state = {
            posts: [],
        }

    }
    loadPosts(){
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
        })
        .catch( err=>{
            console.log( err);
        });
        
    }
    render() {
        // let arr = this.state.posts;
        // console.log(1,arr)
        // let result = arr.map(( post )=>{
        //     return <div key={ post.postId } ><Post 
        //     userName={post.userId}
        //     catalog={post.postId}
        //     title={post.postSubject}
        //     content={post.postContent} /></div>
        // });
        var postContent = this.state.posts.map((post) => {
            return <PostBody 
                        key = {post.postId}
                        userId = {post.userId} 
                        postSubject = {post.postSubject} 
                        postContent = {post.postContent}
                    />;
            
        });
        return (
            <div className = "App">
                <PostCreateForm />
                <div className = 'content'>
                   
                    <div className='posts'>
                        {postContent}
                    </div>
                  
                </div>
               
            </div>    
        );
    }
}

export default App;
