import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';

import { useAuth } from "./auth";
 

function RegisterUser() {
  const [username, setUsername] = useState("");
  const [pw, setPW] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  var navigate = useNavigate();
  const auth = useAuth();

  

  const regUser = () => {
    console.log('handling reg');
    var type = document.getElementById("userType").value;

    Axios.post('http://localhost:3001/api/insert', {
        username: username, 
        pw: pw,
        type: type,
        fName: fName,
        lName: lName,
        phone: phone,
        email: email
        }).then((response)=>{    
            if (response.data == "Successful registration"){
                if (type == '0'){
                    console.log(' loaner ');
                    auth.login(username, pw)
                    navigate('/loaner-page');
                }
                else{
                    console.log(' renter ');
                    auth.login(username, pw)
                    navigate('/renter-page');
                }
            }
        });

  

  };


  return (
    
    <div className="App">  
      <h1> RentMyRide </h1>
      <nav>
        <Link to="/"> back </Link>
      </nav>  

      <div className="login">
      <div> First Name </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setFname(e.target.value);
          }}
        />

        <div> Last Name </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setLname(e.target.value);
          }}
        />

     <div> Phone Number </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setPhone(e.target.value);
          }}
        />

    <div> Email </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setEmail(e.target.value);
          }}
        />

        <div> Username </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setUsername(e.target.value);
          }}
        />

        <div> Password </div>
        <input 
          type="text" 
          name="pw"
          onChange={
            (e) => {setPW(e.target.value);
          }}  
        />

        <div> User Type </div>
        <select id="userType">
            <option value="0" >Loaner</option>
            <option value="1">Renter</option>
            
        </select>
        
        <div> <button onClick={regUser}> Register </button> </div>
    
      </div>

    </div>
  );
}

export default RegisterUser;
