import React, {useState, useEffect} from "react"; 
//import './App.css';
import Nav from "./NavBar";
import "../styles/RenterPage.css"
import videoBG from "../styles/background12.mp4";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';
import { useAuth } from "./auth";
import Axios from 'axios';

import '../components/Calendar.css'
function RenterPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth()
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [phoneNumber, setPhoNumber] = useState("");
    const [emailAddress, setEmail] = useState("");
    const [regNo, setRegNo] = useState("");
    const [image, setImage] = useState([]);

    const [fname,setFileName] = useState("");
    const [file,setFile] = useState("");

    const [reservations, setReservations] = useState([])

    const bookings = [
      {
        from: new Date('01-16-2022'),
        to: new Date('01-27-2022'),
        middayCheckout: true,
      },
      {
        from: '06-25-2022',
        to: '07-03-2022',
        middayCheckout: false,
      }
    ]

    const info = () => {
      Axios.post("http://localhost:3001/api/UserInfo", {
      username: auth.user
      }).then((response) => {
        console.log(response.data)
        console.log("userrrrr RENTER PAGE" + auth.user)
        setFName(response.data[0].FirstName);
        setLName(response.data[0].LastName);
        setPhoNumber(response.data[0].PhoneNumber);
        setEmail(response.data[0].EmailAddress);
      }

    )

    Axios.post("http://localhost:3001/api/renterHistory", {
      username: auth.user
      }).then((response) => {
          setReservations(response.data);
          console.log(response.data);
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

 info();
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
      {reservations.map( (getR)=>(
                  
        <div className="comment">
          <div> Reservation Number: {  getR.reservationNumber  } </div> 
          <div> Start date: {  getR.start_date  } </div> 
          <div> Start date: {  getR.start_date  } </div> 
        </div>
      ))} 
     
      <div class="button">
 
      <button onClick={carsForRent}>Reserve / Look for cars</button>
      </div>
      </div>
      </div>
      </body>
  );
}

export default RenterPage;

