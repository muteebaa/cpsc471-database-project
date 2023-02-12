import React, {useState, useEffect} from "react"; 
//import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
 import LoanerLogin from './LoanerLogin'
// import ErrorPage from "./Pages/ErrorPafe";

function Home() {
  return (
    // <Router> 
    <div className="App">  
      <h1> RentMyRide </h1>
      
       <nav>
        <Link to="/loaner-login"> Loaner Login </Link>
      </nav>  
    </div>
      
//     {/* <Routes>
//        {/* <Route path='/loaner-login' element={< LoanerLogin />} />
     
//     </Routes>
//   </Router> */}
  
  
  );
}

export default Home;
