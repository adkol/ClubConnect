import React, { useState } from 'react';
import Event from './Event';
import logo from '../Syles/img/logo.jpg'
import '/Users/aditkolli/Desktop/ClubConnect/client/src/Syles/css/style.css'
export class Feed extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            feed:[],
            showLogo:true
        }
        this.state.showLogo=true;
        console.log(this.state.showLogo);
        this.getEvents=this.getEvents.bind(this);
    }
    componentDidMount(){
        this.getEvents();
        //this.state.showLogo=true;
    }
    logoToggle(){
        console.log("logo disappearing...")
        this.setState({showLogo:false});
    }
    getEvents(){
            //return all events in database and put it in feed
            // var res=[
            //     {
            //         eventName:"Making cookies",
            //         clubName:"Cookie Club",
            //         clubID:0,
            //         openToAll:true,
            //         description:" Let's bake some fire cookies!"
            //     },
            //     {
            //         eventName:"Hackathon",
            //         clubName:"CS nerd club",
            //         clubID:2,
            //         openToAll:true,
            //         description:"Sign up for this overnight hackathon using the link below!"
            //     }


            // ];
            var res;
            fetch("http://localhost:3001/api_get_events").then(r=>r.json()).then((data)=>{
                res=data.events;
                console.log(data)
           
          //  fetch("/api_get_events").then((r)=>r.json()).then((data)=>console.log(data))
            
            var newFeed=[]
            
           res.forEach(curr=>{
            console.log(curr.date)
                if(curr.openToAll)
                {
                    newFeed.push(<Event eventName={curr.EventName} clubName={curr.clubName} clubID={curr.clubID} description={curr.description} date={curr.date} comments={curr.comments}></Event>)
                    console.log(curr.comments);
                    //newFeed.push([curr.eventName,curr.clubName,curr.openToAll,curr.description]);
                    //console.log(curr);
                }
            })

            this.setState({feed:newFeed},()=>console.log(this.state.feed));

        })
    }

    render(){  
        //console.log(this.state.feed);
        let element;
        if(!this.state.showLogo)
        {
            console.log(this.state.showLogo);
            element=<div className='FeedContainer'>
            <h2>Feed</h2>
            {this.state.feed}
        </div>
        }
        else
        {
            console.log(this.state.showLogo);
            element=
                <div className='logoContainer'>
                <img className='logoImg' src={logo} onClick={()=>{this.logoToggle()}}></img>
                </div>
            
        }
        return(
           <div>
            {this.state.showLogo ? <div className='logoContainer'>
                <img className='logoImg' src={logo} onClick={()=>{this.logoToggle()}}></img>
                </div> : <div/>} 
                {!this.state.showLogo ? <div className='FeedContainer'>
            <h2>Feed</h2>
            {this.state.feed}</div> : <div/>}
           </div>
        )
    }


}