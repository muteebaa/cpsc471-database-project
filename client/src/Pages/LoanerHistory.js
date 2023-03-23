import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function LoanerHistory() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth()
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [phoneNumber, setPhoNumber] = useState("");
    const [emailAddress, setEmail] = useState("");
 
    const info = () => {
      Axios.post("http://localhost:3001/api/UserInfo", {
      username: auth.user
    }).then((response) => {
      console.log(response.data)
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

  const testbutton = () => {
    navigate('/addcar')
  }

  const viewhistory = () => {
    navigate('/loanerhistory')
  }

  return (
    

    <><div>
      {info()}
    </div> 
    
    <div className="App">
    <nav>
        <Link to="/loaner-page"> Back </Link>
      </nav>  
        <h1> Loaner History Page </h1>
        <div> Welcome {auth.user} </div>
       </div>
    </>



  );
}

export default LoanerHistory;
