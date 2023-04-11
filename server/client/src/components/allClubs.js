import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
export class AllClubs extends React.Component{
    constructor(props) {
        super(props);
        this.state={Clubs:[]}
    }

    componentDidMount(){
        this.getData();
    }
    getData(){
        //return all events in database and put it in feed
        var ClubsRes=[
            {
                
                clubName:"Cookie Club",
                clubID:0,
                description:"We bake cookies!"
            },
            {
                clubName:"Brick Club",
                clubID:1,
                description:"Dedicated to studying all types of bricks"
            },
            {
                clubName:"CS Nerd Club",
                clubID:2,
                description:"An intellectually gifted collection of individuals aspiring to expand upon their already profound knowledge in compute science"
            }
        ];

        var newClubs=[]
        ClubsRes.forEach(curr=>{
                newClubs.push(<this.ListClub  clubName={curr.clubName} description={curr.description} clubID={curr.clubID}></this.ListClub>)
                //newFeed.push([curr.eventName,curr.clubName,curr.openToAll,curr.description]);
                //console.log(curr);
            
        })
        this.setState({Clubs:newClubs},()=>console.log(this.state.Clubs));
}

render(){
    return(
        <div>
                {this.state.Clubs}
        </div>
    )
}

    ListClub(props)
    {
        return (
           <Link to="/clubinfo" state={{clubName:props.clubName,clubID:props.clubID}}><h2>{props.clubName}</h2></Link> 
        )
    }
    }