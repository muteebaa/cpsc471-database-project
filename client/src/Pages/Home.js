import React, {useState, useEffect} from "react"; 
import "../styles/Home.css"
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
 import LoanerLogin from './LoanerLogin'
// import ErrorPage from "./Pages/ErrorPafe";

function Home() {


  return (
    <body>
     
    <div class="App">  
      <h1 class="line-1"> RentMyRide </h1>
      <br></br>
       <nav>
        <a class="link" href="/loaner-login"> Loaner Login </a>
      </nav> 
      <br></br> 
      <nav>
        <a class="link" href="/renter-login"> Renter Login </a>
      </nav> 
      <br></br> 
      <nav>
        <a class="link" href="/registration"> Registration </a>
      </nav> 
      <br></br>
      <nav>
        <a class="link" href="/CarsForRent"> Search for cars as a guest </a>
      </nav>  

    </div>

    </body>
      
//     {/* <Routes>
//        {/* <Route path='/loaner-login' element={< LoanerLogin />} />
     
//     </Routes>
//   </Router> */}
  
  
  );
}

export default Home;
