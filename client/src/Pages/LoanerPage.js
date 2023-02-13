import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function LoanerPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth()
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [phoneNumber, setPhoNumber] = useState("");
    const [emailAddress, setEmail] = useState("");
    const [item, setItem] = useState([]);


    const info = () => {
      Axios.post("http://localhost:3001/api/UserInfo", {
      username: auth.user
    }).then((response) => {
      setFName(response.data[0].FirstName);
      setLName(response.data[0].LastName);
      setPhoNumber(response.data[0].PhoneNumber);
      setEmail(response.data[0].EmailAddress);
    })
      
    

  }

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }


  return (
    

    <><div>
      {info()}
    </div> <div className="App">
        <h1> Loaner Home Page </h1>
        <div> Welcome {auth.user} </div>
      </div>
      <div className="Information">
        <h1> About: </h1>
        <div> First Name : {firstName} </div>
        <div> Last Name : {lastName} </div>
        <div> PhoneNumber : {phoneNumber} </div>
        <div> Email : {emailAddress} </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
      </>



  );
}

export default LoanerPage;
