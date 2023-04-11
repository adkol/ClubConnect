const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();
var firebase = require("firebase/app");
// dependencies of firebase authentication
require("firebase/auth");
// dependencies of firebase firestore
require("firebase/firestore");
require("firebase/analytics");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
const bodyParser = require("body-parser"); 
app.use(bodyParser.json());

console.log(path.join(__dirname, './client/build'))
app.use(express.static(path.resolve(__dirname, './client/build')));


//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUZEz0jbOuKiz2E2gt8va3SVgZFUgJ0R4",
  authDomain: "clubconnectdb.firebaseapp.com",
  projectId: "clubconnectdb",
  storageBucket: "clubconnectdb.appspot.com",
  messagingSenderId: "292227933325",
  appId: "1:292227933325:web:6de9dfecfed45625bdeec4",
  measurementId: "G-KN3FKT1DZD"
};

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clubconnectdb-default-rtdb.firebaseio.com"
});


const fireBaseapp = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(fireBaseapp);


var db=admin.database();
db=getFirestore();
// const credentialsRef= db.ref('users'); //collection(db,'users')
// const clubsRef=db.ref('ClubMembers');// collection(db,'ClubMembers')
// const eventsRef=db.ref('ClubEvents');// collection(db,ClubEvents)
const credentialsRef= db.collection('users');
const clubsRef=db.collection('ClubMembers');
const eventsRef=db.collection('ClubEvents');



async function authenticate(usrIn,pwdIn)
{


  const snapshot = await credentialsRef.where("userName","==",usrIn).get();//await getDoc(q);

  var toret=false;

    snapshot.forEach(doc=>{
      if(doc.data().pwd==pwdIn)
      toret=true;
    });

  return toret;
}
async function getEvents(clubID)
{
  const snapshot = await clubsRef.where("clubID","==",clubID).get();//await getDoc(q);
  toret=[];
  snapshot.forEach(doc=>
    {
      toret= doc.data().Events;
    })
  return toret;
}
async function getAllEvents()
{
  const snapshot = await eventsRef.get();
  toret=[];
  snapshot.forEach(doc=>
    {
      toret.push(doc.data());
    })
  return toret;
}
async function getClubData(clubID)
{
  const snapshot = await clubsRef.where("clubID","==",clubID).get()//await getDoc(q);

  toret=[];
  snapshot.forEach(doc=>
    {
      console.log(doc.data());
      toret= doc.data();
    })
  return toret;
}
async function getMembers(clubID)
{
  const snapshot = await clubsRef.where("clubID","==",clubID).get();//await getDoc(q);
  toret=[];
  snapshot.forEach(doc=>
    {
      toret= doc.data().Members;
    })
  return toret;
}
async function getEventData(eventID)
{
  const snapshot = await eventsRef.where("EventID","==",eventID).get();
  toret=false;

  snapshot.forEach(doc=>
    {
      toret= doc.data();
    })
  return toret;
}
var currID=1;

async function signUp(usrName,pwd,FirstName,LastName)
{
  // var highestID=0;
  // const q=credentialsRef.where(credentialsRef,orderBy("userID", "desc"),limit(1));//query(credentialsRef,orderBy("userID", "desc"),limit(1));
  // q.get().then(res=>
  //   {
  //     res.forEach(user=>{
  //       highestID=user.userID;
  //     })
  //   })
  // const docSnap = await getDoc(q);
  // if(docSnap.exists())
  //   highestID=docSnap.userID;
  // highestID=highestID+1;
  const snapshot=await credentialsRef.orderBy('userID', 'desc').limit(1).get();
  snapshot.forEach(doc => {
    doc=doc.data();
    currID=doc.userID;
  });
  currID+=1;
  const toPush=
  {
    userID:currID,
    userName:usrName,
    FirstName:FirstName,
    LastName:LastName,
    pwd:pwd
  }
  await credentialsRef.doc(currID.toString()).set(toPush);
  // await setDoc(credentialsRef, toPush);
  console.log("New credentials added");
  currID+=1;
}

async function addEvent(date,eventName,description,location,openToAll,time,clubID,clubName)
{
  currID=1;
  const snapshot=await eventsRef.orderBy('EventID', 'desc').limit(1).get();
  snapshot.forEach(doc => {
    doc=doc.data();

    currID=doc.EventID+1;
  });



  // const q=query(eventsRef,orderBy("EventID", "desc"),limit(1));
  // const docSnap = await getDoc(q);
  // if(docSnap.exists())
  //   highestID=docSnap.userID;
  // highestID=highestID+1;
  const toPush=
  {
    EventName:eventName,
    clubName:clubName,
    EventID:currID,
    comments:[],
    date:date,
    description:description,
    location:location,
    openToAll:openToAll,
    time:time
  }




  //await setDoc(doc(eventsRef,EventID), toPush);


  var oldEvents=await getEvents(clubID);
  console.log(oldEvents)
  oldEvents.push({EventID:currID,EventName:eventName});
  console.log(oldEvents)
  await eventsRef.doc(currID.toString()).set(toPush);
  var currClub;
  currClub=clubsRef.doc(clubID.toString());
  // console.log(currClub)
  await currClub.update({Events: oldEvents});

  //const currClub = doc(clubsRef, clubID);
  // await updateDoc(currClub, {
  //  Events: oldEvents
  // });

}
app.get("/api_get_events", (req, res) => {
  console.log("api get events")
  getAllEvents().then(result=>{res.json({ events: result })})
  //res.json({ messages: ["Hello","My name is","Adit","testing"] });
});
app.get("/api_get_clubs", (req, res) => {
  res.json({ messages: ["Hello","My name is","Adit","testing"] });
});
app.get("/api_get_club_data", (req, res) => {
  var clubID=parseInt(req.query.clubID);
  console.log(clubID);
  getClubData(clubID).then(result=>res.json({ data: result }))

});


app.post("/api_add_event", (req, res) => {
  var date=req.body.date;
  var eventName=req.body.name;
  var clubID=req.body.clubID;
  var clubName=req.body.clubName;
  var description=req.body.description;
  console.log("adding event....")
  console.log(req.body);
  addEvent(date,eventName,description,"",true,"",clubID,clubName);
});


//addEvent("","test","tesdesc","",true,"",1,"Test")

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



// app.get('/', (req, res) => {
//  // res.json("hello");
//   res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
// });