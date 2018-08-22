
import * as React from 'react';

import './Login.css';

export default
class Login extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        return(
            <div className = 'loginBox'>

                <div className = 'about' >
                    <div className = 'aboutContent' >
                    
                        <div className = 'activities' >
                            <div> follow your interests </div>
                            <div> hear what people talk about </div>
                            <div> join the conversions </div>
                        </div>
                    
                        <div className = 'videoBox' > 
                            <video width="400" controls>
                                <source src="mov_bbb.mp4" type="video/mp4" />
                                <source src="mov_bbb.ogg" type="video/ogg" />
                            </video>
                        </div>

                    </div>
                </div>

                <div className = 'login' >
                    
                    <div>                
                        <form action = '' method = 'post'>
                            <input type = 'email'  placeholder = 'email' />
                            <input type = 'password' placeholder = 'password' />
                            <input type = 'submit' value = 'LOGIN' />
                        </form>
                    </div>

                    <div className = 'signUp' >
                        <img src = '' alt = 'give me src' />
                        <div className  = 'describe' > 
                            Share your posts to choosen community 
                        </div>
                    </div>

                    <div>
                        <div> join us today </div>
                        <button> Sign Up </button> 
                        <button> Log in </button>
                    </div>
                         
                </div>
            </div>
        );
    }
}