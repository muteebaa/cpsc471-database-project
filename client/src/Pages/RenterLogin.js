import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import "../styles/RenterLogin.css"
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';

import { useAuth } from "./auth";
 

function RenterLogin() {
  const [user, setUser] = useState('')

  const [username, setUsername] = useState("");
  const [pw, setPW] = useState("");
  let isAuth = false;
  var navigate = useNavigate();
  const auth = useAuth();


  const handleLogin = () => {
    console.log('handling login');

    Axios.post('http://localhost:3001/api/Login', {
        username: username, 
        pw: pw,
        type: 1
        }).then((response)=>{
            if (response.data.length == 0){
              alert("Wrong Password");
              
            }
            else{
              console.log("ok logging in")
              auth.login(username, pw)
              var test = '/renter-page';
              navigate(test);
            }
           
        });

  

  };


  return (
    
    <div class="App">  
      <h1 class="Heading"> Renter Login </h1>
      <br></br>
      <nav>
        <Link class="link" to="/"> back </Link>
      </nav>  
      <br></br>
      <div class="login">
        <div> Username </div>
        <input 
          type="text" 
          name="user"
          onChange={
            (e) => {setUsername(e.target.value);
          }}
        />
        <br></br>

        <div> Password </div>
        <input 
          type="password" 
          name="pw"
          onChange={
            (e) => {setPW(e.target.value);
          }}  
        />
        <br></br>
        
        <div> <button onClick={handleLogin}> Login </button> </div>
        <br></br>
        <div class="registerPage"><a href="/registration">Dont have an account? Register right now</a></div>

    
      </div>

    </div>
  );
}

export default RenterLogin;
