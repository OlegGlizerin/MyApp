
import * as React from 'react';

 /**
  * json{
  *     userId: 1,
        postSubject: '',
        postContent: '',
  *     
  * }
  */

export default

class CreatePost extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
           
            userId: 1,
            postSubject: '',
            postContent: '', 
        }
        this.sendPost = this.sendPost.bind( this );
        this.contentHandler = this.contentHandler.bind( this );
        this.subjectHandler = this.subjectHandler.bind( this );
    }
    sendPost(){
        
        let data = this.state;
      
        console.log(JSON.stringify(data))
        fetch('http://localhost:5000/posts',{
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(function(res) {
            return res.json();                
        })
        .then((data)=>console.log(data))
        .catch( err=>{
            console.log( err)
        });            
    }
    subjectHandler( event ){       
        this.setState({
            postSubject: event.target.value,
        });
    }
    contentHandler( event ){        
        this.setState({
            postContent: event.target.value,
        });
    }
    render(){
        return(
            <div className='formPost' >
                <input type='text' subject={ this.state.subject } onChange={ this.subjectHandler}  />
                <input type='text' content={ this.state.content } onChange={ this.contentHandler}  />
                <input type='submit' value='send post' onClick={this.sendPost} />
            </div>
        );
    }

    
}