import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';

import { useAuth } from "./auth";
 

function LoanerLogin() {
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
        pw: pw
        }).then((response)=>{
          console.log("what is the response")
          console.log(response.data)

            if (response.data.length == 0){
              alert("Wrong Password");
              console.log(response.data.length)
              
            }
            else{
              console.log("ok logging in")
              auth.login(username, pw)
              var test = '/loaner-page';
              navigate(test);
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
        
        <div> <button onClick={handleLogin}> Login </button> </div>
    
      </div>

    </div>
  );
}

export default LoanerLogin;
