import React, {useState, useEffect} from "react"; 
//import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';
import { useAuth } from "./auth";


function LoanerPage() {
  var navigate = useNavigate();
  var { username } = useParams();
  const auth = useAuth()

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  return (
    <div className="App">  
      <h1> Loaner Home Page </h1>
      <div> This is the profile page for {auth.user} </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LoanerPage;
