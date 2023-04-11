import React, { useState } from 'react';

export class Login extends React.Component{

    constructor(props) {
        super(props);
    }
    render(){  

        // const [username, setUserName] = useState();
        // const [password, setPassword] = useState();
    if(this.state.noAccount)
    {
        return (
            <div className='loginDiv'>
    <this.signupForm/>
        </div>
        );
    }
    else{
        return (
            <div className='loginDiv'>
        <this.loginForm/>
        
        </div>
        );
    }
  }
}