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
            console.log('posts response.');
            console.log(res);
            return res.json();                
        })
        .then((data)=>{
            this.setState({
                posts: data,
            });
            console.log(data);
            this.loadComments();
            
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
    render() {
        console.log('in render comments.')
        
        var commentsAndPostsContent = this.state.posts.map((post) => {
            
             console.log(this.state.comments)
            var commentsOfPosts = this.state.comments.filter((comment) => {
                console.log('in map comments')
                return post.postId === comment.postId;
            });
            console.log('printvals')
            console.log(commentsOfPosts);
            return <PostBody 
                            key = {post.postId}
                            userId = {post.userId} 
                            postSubject = {post.postSubject} 
                            postContent = {post.postContent}
                            postComments = {commentsOfPosts}
                        />;
            
            
        });
        return (
            <div className = "App">
                <PostCreateForm />
                <div className = 'content'>
                   
                    <div className='posts'>
                        {commentsAndPostsContent}
                    </div>
                  
                </div>
               
            </div>    
        );
    }
}

export default App;
