import React, { useState } from 'react';
import { Login}  from './components/login';
import { Feed } from './components/feed';
import  ClubInfo  from './components/clubInfo';
// "proxy": "http://localhost:3001",
export class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {loggedIn: false };
        
        }
        loginCallback = (childData,event) => {
            this.setState({username: childData.username, password:childData.password, loggedIn: true})
            console.log("callback")
            console.log(this.state.username);

    }
    render()
    {
        // if(!this.state.loggedIn)
        // {
        //     return (
        //         <Login loginCallback={this.loginCallback}></Login>
        //     )
        // }
        // else
        if(true)
        {
            return <div>

                {/* <Feed userName={this.state.userName} userID={this.state.userID}/> */}
                <ClubInfo></ClubInfo>
                </div>
            //return <Chat></Chat>
        }
    }

};