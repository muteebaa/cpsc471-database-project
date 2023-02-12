import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function LoanerLogin() {
  const [username, setUsername] = useState("");
  const [pw, setPW] = useState("");
  var navigate = useNavigate();

  const loginFunc = () => {
    Axios.get('http://localhost:3001/api/Login').then((response)=>{
        if(response.data){
            console.log(response.data)
            var test = '/loaner-page/${response.data';
            console.log(test)

        navigate(test)
        }
        else {console.log('fail')}
    });
  //  alert('called');
  
    // Axios.post('http://localhost:3001/api/Login', {
    //   username: username, 
    //   pw: pw
    // }).then(()=>{
    //     navigate('/loaner-page/{username}')
    //   alert('success!');
    // });

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
        
        <div> <button onClick={loginFunc}> Login </button> </div>
    
      </div>

    </div>
  );
}

export default LoanerLogin;
