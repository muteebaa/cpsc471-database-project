import React, {useState, useEffect} from "react"; 
import './App.css';
import Axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoanerLogin from './Pages/LoanerLogin'
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPafe";
import LoanerPage from "./Pages/LoanerPage";
import ProtectedRoute from "./Pages/ProtectedRoute";


function App() {
  const [username, setUsername] = useState("");
  const [pw, setPW] = useState("");

  // const loginFunc = () => {
  // //  alert('called');
  //   Axios.post('http://localhost:3001/api/Login', {
  //     username: username, 
  //     pw: pw
  //   }).then(()=>{
  //  //   alert('success!');
  //   });

  // };

  return (
    <Router> 
    
      
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/loaner-login' element={< LoanerLogin />} />
        <Route path='*' element={< ErrorPage />} />

        {/* protected routes */}
        <Route path='/loaner-page/:username' element={< LoanerPage />} />
      </Routes>
      {/* <ProtectedRoute/> */}
    </Router>
    
    // <div className="App">  
    // <h1> RentMyRide </h1>

    //     <div className="login">
    //     <div> Username </div>
    //     <input 
    //       type="text" 
    //       name="user"
    //       onChange={
    //         (e) => {setUsername(e.target.value);
    //       }}
    //     />

    //     <div> Password </div>
    //     <input 
    //       type="text" 
    //       name="pw"
    //       onChange={
    //         (e) => {setPW(e.target.value);
    //       }}  
    //     />
        
    //     <div> <button onClick={loginFunc}> Login </button> </div>
    
    //   </div> 
   
      

    // </div>
  );
}

export default App;
