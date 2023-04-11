import React, {useState, useEffect} from "react";
import "../styles/Home.css";
import Nav from "./NavBar";
import "../styles/Navbar.css";
import videoBG from "../styles/background3.mp4";
import soundBG from "../styles/background9.mp3";
import post from "../styles/HomeBackground.jpg"
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoanerLogin from './LoanerLogin'
import Navbar from "./NavBar";
// import ErrorPage from "./Pages/ErrorPafe";

function Home() {
  

  return (
    
    <body>
      <video class="Video" src={videoBG} autoPlay muted loop playsInline/>
      
     <Nav></Nav> 
    <div class="HomePage">
    
      
    
    <div class="Appp">
    
     <div class="containerLinks">
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

    </div>
    </div>
  
    
    

    </body>
      
//     {/* <Routes>
//        {/* <Route path='/loaner-login' element={< LoanerLogin />} />
     
//     </Routes>
//   </Router> */}
  
  
  );
}

export default Home;
