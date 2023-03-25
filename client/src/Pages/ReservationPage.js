import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';


import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams, useLocation} from 'react-router-dom';


function ReservationPage() {
  var navigate = useNavigate();
  const auth = useAuth();
  const reservationNumber = 555;
  const { state } = useLocation();
  const [availableStartDate,setAvailableStartDate] = useState("");
  const [availableEndDate,setAvailableEndDate] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");

  function carInfo()   {
    

    Axios.post("http://localhost:3001/api/Cars", {
    
  }).then((response) => {

    
    console.log(response.data.length)
    for(const car of response.data){
      if (car.regNumber == state.car_regNo){
        setAvailableStartDate(car.startDate)
        setAvailableEndDate(car.endDate)
        console.log(car.startDate)
      }
    }
       
    
  })}

  function reserve(){
    var insurance = document.getElementById("insurance").value;
    console.log(insurance);

    Axios.post('http://localhost:3001/api/reserve', {
      reservationNumber:Math.floor(Math.random() * (500 - 1 + 1)) + 500,
      startDate: startDate, 
      endDate: endDate,
      regNo: state.car_regNo,
      user: "temp-value",
      insurance: insurance
      }).then((response)=>{    
          // if (response.data == "Successful reservation"){
            alert(response.data);
          // }
      });
  }


  return (
    <>
    <div>
      {carInfo()}
    </div>
    <div>
    <h1> Make Car Reservation </h1>
    {/* <div>{state.car_regNo}</div> */}
    <div> Start Date: </div>
    <input type="date" placeholder="StartDate" name="StartDate" min={availableStartDate} max={availableEndDate} onChange={(e)=>{setStartDate(e.target.value)}} />

    <div> End Date: </div>
    <input type="date" placeholder="StartDate" name="StartDate" min={availableStartDate} max={availableEndDate} onChange={(e)=>{setEndDate(e.target.value)}} />
    
    <div> Insurance: </div>
    <select name="insurance" id="insurance">
    <option value="comprehensive">Comprehensive</option>
    <option value="third-party">Third-party</option>
    </select>

    <div> Payment Details: </div>
    <label for='cardName'>Card Holder Name</label>
    <input type='text' id='cardName'/>
    <label for='cardNo'>Card Number</label>
    <input type='text' id='cardNo'/>
    <label for='cvc'>CVC</label>
    <input type='text' id='cvc'/>
 

    <button onClick={reserve}> Reserve </button>
            
    </div>  
    </>
  );}



export default ReservationPage;

