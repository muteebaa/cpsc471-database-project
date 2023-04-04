import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import Nav from "./NavBar";
import "../styles/CarsForRent.css";
import { useAuth } from "./auth";
import videoBG from "../styles/background13.mp4";

import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function LoanersListingsPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth();
    const [data, setData] = useState([])
    const [reservations, setReservations] = useState([]);
    
  
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

    function history(reg_number) {
      
      Axios.post("http://localhost:3001/api/getHistory", {
        reg_number: reg_number
    }).then((response) => {
      console.log(response.data);
      setReservations(response.data);
      
    }) 
  
  }

  function renterInfo() {
      
    Axios.post("http://localhost:3001/api/reneterDetails", {
    username: auth.user
  }).then((response) => {
    console.log(response.data);
    setReservations(response.data);
    
  }) 

}

 

  return (
    

    <body>
       <div>
      {info()}
     
      
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
                <div class="Price">Price: {  getD.price  } per day</div>
                <br></br>
                <button class="button4" onClick={() => DetailPage("/editYourCar/"+getD.regNumber)}>Click to view live lsiting</button>
                </div>
                <div class="Picture"><strong></strong><img class="Picture" src={require(`../imgs/${  getD.photo  }`)} width="300" height="215" /> </div>
                <br></br>
                
                <div> Reservations: {history(getD.regNumber)} </div>
                <div>
                  {
                reservations.map( (getR)=> (
                  <div key={getR.regNumber}>
      <div class = "Car">
      {/* <a>{getR.make} {getR.model}</a> */}
      <br></br>
        <div> Renter: {  getR.user  } </div>
        <div> Start date: {getR.start_date.substring(0, 10)} </div>
        <div> End date: {getR.end_date.substring(0, 10)} </div>

        <div> Contact: </div>
        <div> Phone: {getR.start_date.substring(0, 10)} </div>
        <div> Email: {getR.end_date.substring(0, 10)} </div>
        
        
        <br></br>
        <div class="button">
        {/* <button class="button4" onClick={() => DetailPage("/CarDetails/"+getD.regNumber)}>Reserve / Find out more</button> */}
        </div>
        <br></br>

      </div>
      <br>
      
      </br>
        
    
    </div>
)  )}

                </div>
                

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
