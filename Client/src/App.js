import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import './App.css';

import Login  from './Componenets/Login/Login';
import SignUp from './Componenets/SignUp/SignUp';

import Post from './Componenets/Post/Post'; 
// props =>  userName,catalog,title,content
import Home from './Home';

class App extends Component {
    constructor( props ){
        super( props );

       
        
        this.state = {
            posts: [],
            comments: [],
            postsContent: ";",
            token: ""
        }
        // this.loadPosts();

    }
    
        
    
    // render() {
    //     var postContent = this.state.posts.map((post) => {
            
    //         return <Post
    //                     key = { post.postId }
    //                     userId = {post.userId} 
    //                     postSubject = {post.postSubject} 
    //                     postContent = {post.postContent}
    //                     userName = { 'Philip' || post.userName}
    //                     catalogName = {post.catalogName}
    //                     likes = {post.likes}
    //                     createDate = {post.createDate}
    //                     commentContent = {post.commentContent}
    //                 />;     
    //     });
    //     return (
    //         <div className = "App">
    //             <div className = 'content'>               
    //                 <div className='posts'>
    //                     {postContent}
    //                 </div>             
    //             </div>  
    //             <button type="button" className="morePosts"  onClick={(e) => {this.loadPosts()}} >More posts...</button>       
    //         </div>    
    //     );
    // }

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

    updateToken(token) {
        console.log("updateToken,",token);
        
            this.setState( {
                token: token
            });
        
        
    }
    
    render(){
       
        return(
            <Router>
                <div className = "App">
                    <Switch>
                        <HomeRoute exact path= '/' component = { Home } token = { this.state.token }/>
                        <Route path = '/login' component = { Login } />
                        <Route path = '/signup' component = { 
                            () => {
                            console.log("token in App:", this.state.token)
                            return (<RegisterRoute 
                                        token = { this.state.token } 
                                        updateToken = {  this.updateToken.bind(this) }
                                    />)
                                } 
                            } 
                        />
                        <Route component = { Page404 } />
                    </Switch>
                </div>
            </Router>
        );
    }
}
const foo = () => {
    return <SignUp user={ this.state.user }/>
}



const HomeRoute = ( props )  => (
    <Route 
        component = { () => ( 
            props.token ? <props.component token = { props.token }/> :
            <Redirect
                to= "/login"
            />
        )} 
    />
);

const RegisterRoute = ( props )  => (
    <Route 
        component = { 
            () => {
                console.log("token in RegisterRoute: ", props.token)
                return (!props.token ? <SignUp 
                        token = { props.token } 
                        updateToken = { props.updateToken } /> : <Redirect to= "/" />)
                } 
            } 
    />
);

    
    
const Page404 = ( props )  => <div>not found 404</div> ;    

export default App;
