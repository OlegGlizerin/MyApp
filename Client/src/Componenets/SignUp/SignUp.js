
import * as React from 'react';
import axios  from 'axios';
import './SignUp.css';

export default
class SignUp extends React.Component{
    // 1) fisnih sing up process , ajax and database TODO:
    // fisnih sing up process , ajax and database TODO:
    // fisnih sing up process , ajax and database TODO:
    // fisnih sing up process , ajax and database TODO:
    // fisnih sing up process , ajax and database TODO:
    
    //2) finish login, ajax and database
    
    //3) coockie + save session for logged in users
    
    constructor( props ){
        super( props );

        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
        this.signUp = this.signUp.bind( this );
        this.onChange = this.onChange.bind( this );
        

        this.state = {
            currentStep: 0,
            formData: {
                firstName: '',
                lastName: '',
                country: '',
                age: 0,
                gender: '',
                answer1: '',
                answer2: '',
                answer3: '',
                email: '',
                password1: '',
                password2: '',


            },
            steps: 
            [
                {
                    header: 'Personal details',
                    buttons: [
                        {
                            type: 'button',
                            value: 'Next',
                            onClick: this.next
                        }
                    ],
                    fields: 
                    [ 
                        {
                            type: 'text', 
                            placeholder: 'First Name',
                            name: 'firstName'
                        },
                        {
                            type: 'text', 
                            placeholder: 'Last Name',
                            name: 'lastName'

                        },
                        {
                            type: 'text', 
                            placeholder: 'Country',
                            name: 'country'

                        },
                        {
                            type: 'number', 
                            placeholder: 'age',
                            name: 'age'

                        },
                        {
                            type: 'text', 
                            placeholder: 'gender',
                            name: 'gender'

                        }
                    ]
                },
                {
                    header: 'Interests',
                    buttons: [
                        {
                            type: 'button',
                            value: 'Back',
                            onClick: this.back
                        },
                        {
                            type: 'button',
                            value: 'Next',
                            onClick: this.next
                        }
                    ],
                    fields: 
                    [ 
                        {
                            type: 'text', 
                            placeholder: 'Question 1',
                            label: 'What is your main hobby?',
                            name: 'answer1'                            
                        },
                        {
                            type: 'text', 
                            placeholder: 'Last Name',
                            label: 'What is the hottest subject today?',
                            name: 'answer2'


                        },
                        {
                            type: 'text', 
                            placeholder: 'Country',
                            label: 'What content from the above would you like to see?',
                            name: 'answer3'

                        }
                    ]
                },
                {
                    header: 'Login details',
                    buttons: [
                        {
                            type: 'button',
                            value: 'Back',
                            onClick: this.back
                        },
                        {
                            type: 'submit',
                            value: 'Sign up',
                            
                        }
                    ],
                    fields: 
                    [ 
                        {
                            type: 'email', 
                            placeholder: 'Email',
                            name: 'email'

                        },
                        {
                            type: 'password', 
                            placeholder: 'Password',
                            name: 'password1'
                        },
                        {
                            type: 'password', 
                            placeholder: 'Repeat password',
                            name: 'password2'
                        }
                    ]
                }
            ]
        }
    }

    signUp( event ){
        event.preventDefault();
        console.log(this.state.formData)
        const config = {
            url: 'http://localhost:4700/signUp',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(this.state.formData),
        }
        axios( config ).then( ( res ) => {
            // console.log(res.data.token);
            this.props.updateToken(res.data.token);
            console.log( res );
        });
        
    }

    onChange( event ){
        const field = event.target.name;
        const value = event.target.value;
        let tempForm = this.state.formData;
        tempForm[field] = value;
        this.setState({
            formData: tempForm
        });
        console.log(event.target,this.state.formData);
    }


    createInputField(type, callback, name, placeholder, label, i) {
        return (
            <div className='questions' key={i}>
                <label> {label}</label>
                <input 
                    type={type} 
                    placeholder={placeholder}
                    onChange = { callback }
                    name = { name }
                    value = { this.state.formData[name] }
                    autoComplete = "off"
                />
            </div>
        )
    }

    back(e) {
        this.setState({
            currentStep: this.state.currentStep -= 1
        })
        e.preventDefault();
    }

    next(e) {
        this.setState({
            currentStep: this.state.currentStep += 1
        })
        e.preventDefault();
    }

 

    render(){
        const inputFields = this.state.steps[this.state.currentStep].fields.map((field, i) => {
            return this.createInputField(field.type, this.onChange, field.name, field.placeholder, field.label, i);
        });
        return(
            <div className = 'signup'>
                <div className = 'header'>
                    Create your account
                </div>

                <div className = 'signUpForm'>

                    <form 
                        className = 'userDetailsForm' 
                        onSubmit = { this.signUp }
                    >
                            
                        <div className='stepHeader'>
                            {
                                this.state.steps[this.state.currentStep].header
                            }
                        </div>
                        
                        {
                            inputFields
                        }


                        {/* There is 1 button only in the first step, so we using lonelyButtonHelper Div 
                        for flex the next button to the right. */}
                        <div className='buttonsDirection'>
                            {
                                this.state.steps[this.state.currentStep].buttons[1] ? 
                                <input 
                                    type = {this.state.steps[this.state.currentStep].buttons[0].type}
                                    value = {this.state.steps[this.state.currentStep].buttons[0].value} 
                                    onClick = {this.state.steps[this.state.currentStep].buttons[0].onClick} 
                                    
                                />
                                :
                                <div className='lonelyButtonHelper'>
                                <div></div>
                                <input 
                                    type = {this.state.steps[this.state.currentStep].buttons[0].type}
                                    value = {this.state.steps[this.state.currentStep].buttons[0].value} 
                                    onClick = {this.state.steps[this.state.currentStep].buttons[0].onClick} 
                                />
                                </div>
                            }
                            
                            
                            {
                                this.state.steps[this.state.currentStep].buttons[1] &&
                                <input 
                                    type = {this.state.steps[this.state.currentStep].buttons[1].type}
                                    value = {this.state.steps[this.state.currentStep].buttons[1].value} 
                                    
                                    
                                    onClick = {
                                        this.state.steps[this.state.currentStep].buttons[1].onClick 
                                       
                                    }
                                    
                                />
                               
                            }
                        </div>
                            
                    </form>
                </div>
            </div>

        );
    }
}