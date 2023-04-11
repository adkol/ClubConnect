import { Link } from "react-router-dom";
import React, { Component }  from 'react';
function Comment(props)
{
  var data=props.eventData;

    return(
      <div>
       <p>{data.firstName}</p>
       <p>{data.lastName}</p>
       <p>{data.content}</p>
        <br/></div>
   )
}

function ClubEvent(props)
{


    return(
      <div className="EventContainer">


       <h1>{props.eventName}</h1>
       <Link to="/clubinfo" state={{clubName:props.clubName,clubID:props.clubID}}><h2>{props.clubName}</h2></Link>
       <p>{props.description}</p>

        <br/></div>
   )
}

function Event(props)
{

  console.log(props);
    return(
      <div className="EventContainer">

            <div className="dateBox">
                <p>{props.date}</p>
            </div>
        <Link to="/eventinfo" state={{clubName:props.clubName,clubID:props.clubID,description:props.description, comments:props.comments, date:props.date, eventName:props.eventName}}><h1>{props.eventName}</h1></Link>
       <Link to="/clubinfo" state={{clubName:props.clubName,clubID:props.clubID}}><h2>{props.clubName}</h2></Link>
       <p>{props.description}</p>

        <br/></div>
   )
}
export default Event;
export {ClubEvent};