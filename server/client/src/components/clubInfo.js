import Event from './Event';
import { ClubEvent } from './Event';
import plus from '../Syles/img/plus.jpg'
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function ClubInfo (props) {
        //this.state={clubName:props.clubName,clubID:0,description:'',Events:[],Members:[],showEvents:false,showMembers:false}

        const [Events, setEvents] = useState([])
        const [Members, setMembers] = useState([])
        const [showEvents, setShowEvents] = useState(false)
        const [showMembers, setShowMembers] = useState(false)
        const location = useLocation();
        const state = location.state;
        const [clubName, setClubName] = useState(state.clubName)
        const [clubID, setClubID] = useState(state.clubID)
        const [description, setDescription] = useState("")



        const [newName,setNewName]=useState("");
        const [newDate,setNewDate]=useState("");
        const [newDescription,setNewDescription]=useState("");

    const displayToggle=()=>{
        setShowEvents(!showEvents);

    }
   React.useEffect(()=>{

        getData();
    },[clubName]);

    const getData=()=>{
        //return all events in database and put it in feed
        var EventsRes=[
            {
                eventName:"Making cookies",
                clubName:"Cookie Club",
                openToAll:true,
                description:" Let's bake some fire cookies!"
            },
            {
                eventName:"Eating cookies",
                clubName:"Cookie Club",
                openToAll:true,
                description:"Eat amazing cookies!"
            }
        ];
        var MembersRes=[
            {
                firstName:"Bob",
                lastName:"Sanders"
            },
            {
                firstName:"Hasbullah",
                lastName:"The GOAT"
            },
            {
                firstName:"Abdu",
                lastName:"Rozik"
            }
        ];
        fetch("http://localhost:3001/api_get_club_data?clubID="+clubID).then(r=>r.json()).then((data)=>{
            data=data.data;
            console.log(data)
            EventsRes=data.Events;
            MembersRes=data.Members;
            console.log(EventsRes)
            console.log(MembersRes)
        var newEvents=[]
        EventsRes=data.Events
        EventsRes.forEach(curr=>{
                newEvents.push(<ClubEvent eventName={curr.EventName} clubName={clubName} description={curr.description} comments={curr.comments} date={curr.date}></ClubEvent>)
                //newFeed.push([curr.eventName,curr.clubName,curr.openToAll,curr.description]);
                //console.log(curr);
            
        })
        var newMembers=[]
        MembersRes.forEach(curr=>{

                newMembers.push(<ListMember firstName={curr.FirstName} lastName={curr.LastName}></ListMember>)
                //newFeed.push([curr.eventName,curr.clubName,curr.openToAll,curr.description]);
                //console.log(curr);
            
        })
        // var clubname='Cookie Club'
        // var clubid=0
        // var description='Welcome to cookie club! We make cookies or something.'
        // this.setState({Members:newMembers,Events:newEvents, clubName:clubname,clubID:clubid,description:description},()=>console.log(this.state.Members));
        //this.setState({Members:newMembers,Events:newEvents},()=>console.log(this.state.Members));
        setMembers(newMembers);
        setDescription(data.Description)
        setEvents(newEvents);
            })

        }
        function handleNameChange(e) {
            setNewName(e.target.value);
        }
        function handleDateChange(e) {
            setNewDate(e.target.value);
        }
        function handleDescChange(e) {
            setNewDescription(e.target.value);
        }
        
        const formSubmit=async (event)=>{
            
            var toSend=JSON.stringify({
                name:newName,
                date:newDate,
                description:newDescription,
                clubName:clubName,
                clubID:clubID
            });
            // var newEvents=Events;
            // newEvents.push(<ClubEvent eventName={newName} clubName={clubName} description={""}></ClubEvent>);
            setEvents([ <ClubEvent eventName={newName} clubName={clubName} description={description} date={newDate} comments={[]}></ClubEvent>,...Events]);
            setNewDate("");
            setNewName("");
            setNewDescription("");

            console.log(Events);
            await fetch("http://localhost:3001/api_add_event", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: toSend
        }).then(function(response) {
            console.log(response)
            
            return response.json();
        });


        getData();
        event.preventDefault();
        }
    return(
      <div>
       <h1>{clubName}</h1>
       <p>{description}</p>
       <div className='ClubEventsMembersContainer'>
       <button className='button-39' onClick={()=>{displayToggle()}}>{showEvents ? "Show members" : "Show events"}</button>
       
       <h2>{showEvents ? "Events" : "Members"}</h2>
        <div>
            {showEvents ? 
            <div>
                <div className="formContainer">
                <h4>Event Name </h4><input className='newEventIn' type="text" value={newName} onChange={handleNameChange}></input>
                <br></br>
                <h4>Date </h4><input className='newEventIn' type="text" value={newDate} onChange={handleDateChange}></input>
                <br></br>
                <h4>Description </h4><input className='newEventIn' type="text" value={newDescription} onChange={handleDescChange}></input>
                <br></br>
                <button className='button-40'><img className="plusImg" src={plus} onClick={formSubmit}/> </button>
                <br></br>
                </div>
            {Events} 
            </div>
            : 
            
            
            
            Members}
        </div>
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



export default ClubInfo;