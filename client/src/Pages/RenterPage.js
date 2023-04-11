import React, {useState, useEffect} from "react"; 
//import './App.css';
import Nav from "./NavBar";
import "../styles/RenterPage.css"
import videoBG from "../styles/background12.mp4";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';
import { useAuth } from "./auth";
import DatePicker from 'react-datetime';
import Axios from 'axios';
import RentersReservations from "../components/RentersReservations";


function RenterPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth()
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [phoneNumber, setPhoNumber] = useState("");
    const [emailAddress, setEmail] = useState("");
    const [regNo, setRegNo] = useState("");
    const [year, setYear] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [image, setImage] = useState([]);

    const [fname,setFileName] = useState("");
    const [file,setFile] = useState("");

    const [reservations, setReservations] = useState([])

    const [list, setList] = useState(true);


    const info = () => {
      Axios.post("http://localhost:3001/api/UserInfo", {
      username: auth.user
      }).then((response) => {

        setFName(response.data[0].FirstName);
        setLName(response.data[0].LastName);
        setPhoNumber(response.data[0].PhoneNumber);
        setEmail(response.data[0].EmailAddress);
      }

      

    )
  }

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  const carsForRent = () => {
    console.log("ok logging in")
             
              var test = '/carsForRent';
              navigate(test);
  }

  function handleView(){
    setList(!list);
  }

  const getReservations = () =>{
    Axios.post("http://localhost:3001/api/renterHistory", {
        username: auth.user
        }).then((response) => {
            setReservations(response.data);
            setRegNo(response.data.reg_number);
            
        }
    );
}
  

 info();
 getReservations();
  return (
    
    <body><div>
      
    </div> 
    <video class="Video" src={videoBG} autoPlay loop playsInline/>
    <Nav></Nav> 
    <div class="HomePage">
    <div class="Page2">
    
    <div class="Welcome">
        <h1 class="Heading"> Renter Home Page </h1>
        <div> Welcome {auth.user} </div>
      </div>
    
      <div class="Information">
        <h1 class="Heading"> About: </h1>
        <div> First Name : {firstName} </div>
        <div> Last Name : {lastName} </div>
        <div> PhoneNumber : {phoneNumber} </div>
        <div> Email : {emailAddress} </div>
      </div>
      <div class="buttonClass">
 
      <button onClick={carsForRent}>Reserve / Look for cars</button>
      </div>

      <button onClick={handleView}> Change View </button>
      
      {list ? <div> 
            {reservations.map( (getR)=>(
              <div className="reservationInfo">
                <div> Reservation Details </div> 
                <div> Registration Number: {getR.reg_number} </div>
                <div> Car: {getR.year} {getR.make} {getR.model} </div>
                <div> PickUp Address: {getR.pickUp} </div>
                <div> Reservation Number: {getR.reservationNumber} </div>
                <div> Start date: {getR.start_date.substring(0, 10)} </div>
                <div> End date: {getR.end_date.substring(0, 10)} </div> 

                <br></br>        
              </div>
            ))} 
      </div> :
      <div>
         <RentersReservations user={auth.user}>

         </RentersReservations>
         
      </div>
      }
     
     
      
      </div>
      </div>
      </body>
  );
}

export default RenterPage;

