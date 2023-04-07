import React, {useState, useEffect, useRef} from "react"; 
//import './App.css';
import Axios from 'axios';
import Nav from "./NavBar";
import "../styles/LoanersListingPage.css";
import { useAuth } from "./auth";
import videoBG from "../styles/background13.mp4";

import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';
import ReservationsPopup from "../components/ReservationsPopup";

function LoanersListingsPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const [resPopup, setResPopup] = useState(false);
    const auth = useAuth();
    const [data, setData] = useState([])
    const [reservations, setReservations] = useState([]);
    
    const [isActive, setIsActive] = useState(false);
    const idMatch = (value) => value.username === auth.user;

    var navigate = useNavigate();

 //   useEffect(() => {
   
      const info = () => {
      
  
        Axios.post("http://localhost:3001/api/Cars", {
        
      }).then((response) => {
  
        let tempData = response.data
        for(const car of response.data){

      

          
          tempData = tempData.filter(idMatch)
          

        }

        setData(tempData)
           
        
      })}
      
   // })
    function DetailPage(link){
    
      navigate(link)
    }

    function handleClick(e) {
      console.log("HANDLING");
      setResPopup(true);
  
      // 👇️ add class on click
      // event.currentTarget.classList.add('bg-salmon');
  
      // 👇️ remove class on click
      // event.currentTarget.classList.remove('bg-salmon');
    };

    function history(reg_number) {
      
      Axios.post("http://localhost:3001/api/getHistory", {
        reg_number: reg_number
    }).then((response) => {
      console.log(response.data);
      setReservations(response.data);
      setIsActive(true);
      
    }) 
  
  }

useEffect(()=>{
  info();
}, [])

  return (
    

    <body>
       <div>
     
     
      
    </div>

      <video class="Video" src={videoBG} autoPlay loop playsInline />
      <Nav></Nav> 

      <div class="CarPage">
        <div class="Welcome">
        <h1> Rent Your Ride </h1>
        <div> Welcome {auth.user} </div>
        <div> Please select one of your cars </div>
        </div>
        <div class="Cars">
      
        {
          
          data.map( (getD)=>(

            
            <div key={getD.regNumber}>
              <div class = "Car">
              <a>{getD.make} {getD.model}</a>
              <div class="button">
              <br></br>
                <br></br>
                </div>
                <div class="Picture"><strong></strong><img class="Picture" src={require(`../imgs/${  getD.photo  }`)} width="300" height="215" /> </div>
                <br></br>
                <button class="button4" onClick={() => DetailPage("/editYourCar/"+getD.regNumber)}>Edit Listing</button>
                <button class="button4" onClick={() => DetailPage("/CarDetails/"+getD.regNumber)}>View Live Listing</button>

              
                <button class="button4" onClick={() =>{ history(getD.regNumber); handleClick();}}>View reservations</button>
               

                <div className='.res' >
                <ReservationsPopup trigger={resPopup} setTrigger={setResPopup}>
                <h1>Reservations</h1>
                <div className="allReservations"> 
               
                {reservations.map( (getR)=>(
                  
                 <div className="reservationInfo">
                  <div> Renter: {  getR.user  } </div> 
                  <div> Start date: {getR.start_date.substring(0, 10)} </div>
                  <div> End date: {getR.end_date.substring(0, 10)} </div>

                  <div> Contact: </div>
                  <div> Phone: {getR.start_date.substring(0, 10)} </div>
                  <div> Email: {getR.end_date.substring(0, 10)} </div>
                 
                </div>
                
                 
                ))}  </div></ReservationsPopup>
                
                </div>
                <div id="overlay"></div>
                

                <br></br>

              </div>
              <br>
              
              </br>
                
            
            </div>
            

          )
          
          )
        }

    
        
      </div>
      </div>
      
      </body>



  );
}

export default LoanersListingsPage;