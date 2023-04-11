import Event from './Event';
import { ClubEvent } from './Event';
import plus from '../Syles/img/plus.jpg'
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function EventInfo (props) {
        //this.state={clubName:props.clubName,clubID:0,description:'',Events:[],Members:[],showEvents:false,showMembers:false}

        const [showEvents, setShowEvents] = useState(false)
        const location = useLocation();
        const state = location.state;
        const [clubName, setClubName] = useState(state.clubName)
        const [clubID, setClubID] = useState(state.clubID)

        const [description, setDescription] = useState(state.description)
        const [comments, setComments] = useState(state.comments)
        const [eventName, setEventName] = useState(state.eventName)
        const [date, setDate] = useState(state.date)

    const displayToggle=()=>{
        setShowEvents(!showEvents);

    }








    return(
      <div>
       <h1>{eventName}</h1>
       <h3>{date}</h3>
       <h4>Club: {clubName}</h4>
       <p>{description}</p>
       <div className='CommentsContainer'>
       {comments}
        </div>
    <br/>
        </div> 
   )
}
 function ListMember(props)
{
    return (
        <p>{props.firstName+" "+props.lastName}</p>
    )
}



export default EventInfo;