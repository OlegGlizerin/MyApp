
import * as React from 'react';
import axios  from 'axios';

import './Login.css';

export default
class Login extends React.Component{
    constructor( props ){
        super( props );

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            formData: {
                email: "",
                password: ""
            },
            errorText: ""
        }
    }

    

    onChange( event ) {
        const field = event.target.name;
        const value = event.target.value;

        let newForm = this.state.formData;
        newForm[field] = value;

        this.setState({
            formData: newForm
        });

        console.log('field: ', field, ', value: ', value);
    }
    

    login(event) {
        event.preventDefault();
        console.log(this.state.formData)
        
        const config = {
            url: 'http://localhost:4700/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(this.state.formData),
        }
        axios( config ).then(( res ) => {
            console.log('token from server in logein:', res.data.token)
            
            this.props.updateToken(res.data.token);
        })
        .catch(( err ) => {
            if(err) {
                console.log('Login failed.', err.message, err.response.data);
                this.setState({
                    errorText: err.response.data
                })
            }
        });
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
                        <form onSubmit = { this.login } >
                            <input type = 'email' name = 'email' onChange = {this.onChange} placeholder = 'email' />
                            <input type = 'password' name = 'password' onChange = {this.onChange} placeholder = 'password' />
                            <input type = 'submit' value = 'Login' />
                        </form>
                    </div>

                    <label className = 'loginErrorsLabel'> {this.state.errorText} </label>

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