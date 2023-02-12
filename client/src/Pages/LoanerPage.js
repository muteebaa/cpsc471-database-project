import React, {useState, useEffect} from "react"; 
//import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function LoanerPage() {
    var navigate = useNavigate();
    var { username } = useParams();

  return (
    <div className="App">  
      <h1> Loaner Home Page </h1>
      <div> This is the profile page for {username} </div>
    </div>
  );
}

export default LoanerPage;
