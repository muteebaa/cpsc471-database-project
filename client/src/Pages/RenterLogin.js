import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
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
    
    <div className="App">  
      <h1> Renter Login </h1>
      <nav>
        <Link to="/"> back </Link>
      </nav>  

      <div className="login">
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
          type="password" 
          name="pw"
          onChange={
            (e) => {setPW(e.target.value);
          }}  
        />
        
        <div> <button onClick={handleLogin}> Login </button> </div>

        <div className="registerPage"><a href="/registration">Dont have an account? Register right now</a></div>

    
      </div>

    </div>
  );
}

export default RenterLogin;
