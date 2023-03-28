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
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [pwError, setPWError] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  var navigate = useNavigate();
  const auth = useAuth();

  const validate = () => {
    var checker = true
    
    if(username == ""){
      
      setUsernameError("Please enter a username")
      checker = false
    }
    else{
      setUsernameError("")
    }

    if(phone == "" ){
      
      setPhoneError("Please enter a valid phone number")
      checker = false
    }
    else{
      setPhoneError("")
    }

    if(pw == "" || pw.length < 8 || pw == fName || pw == lName){
      
      setPWError("Please enter a password with more than eight characters which is not same as your first and last name")
      checker = false
    }
    else{
      setPWError("")
    }


    if(email == ""){
      
      setEmailError("Please enter a valid email")
      checker = false
    }
    else{
      setEmailError("")
    }

    if(fName == ""){
      
      setFnameError("Please enter your first name")
      checker = false
    }
    else{
      setFnameError("")
    }

    if(lName == ""){
      
      setLnameError("Please enter your last name")
      checker = false
    }
    else{
      setLnameError("")
    }

    return checker
    
    
  }

  const regUser = () => {

    const isValid = validate();
    if(isValid){
      
      var type = document.getElementById("userType").value;
      console.log(type);
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

    }
   

  

  };


  return (
    
    <div class="App">  
      <h1> RentMyRide </h1>
      <nav>
        <Link to="/"> back </Link>
      </nav>  

      <div class="login">
      <div> First Name </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setFname(e.target.value);
          }}
        />
        <div style={{color: "red"}}>{fNameError}</div>

        <div> Last Name </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setLname(e.target.value);
          }}
        />
        <div style={{color: "red"}}>{lNameError}</div>

     <div> Phone Number </div>
        <input 
          type="number" 
          name="user"
          onChange={
            (e) => {setPhone(e.target.value);
          }}
        />
        <div style={{color: "red"}}>{phoneError}</div>

    <div> Email </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setEmail(e.target.value);
          }}
        />
        <div style={{color: "red"}}>{emailError}</div>

        <div> Username </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setUsername(e.target.value);
          }}
        />
        <div style={{color: "red"}}>{usernameError}</div>

        <div> Password </div>
        <input 
          type="password" 
          name="pw"
          onChange={
            (e) => {setPW(e.target.value);
          }}  
        />
        <div style={{color: "red"}}>{pwError}</div>

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
