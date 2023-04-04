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
  const [cardNumber,setCardNumber] = useState("");
  const [cardName,setCardName] = useState("");
  const [cardCvc,setCardCvc] = useState("");
  const [cardExpiryDate,setCardExpiryDate] = useState("");
  const [cardNumberError,setCardNumberError] = useState("");
  const [cardNameError,setCardNameError] = useState("");
  const [cardCvcError,setCardCvcError] = useState("");
  const [cardExpiryDateError,setCardExpiryDateError] = useState("");
  const [dateError,setDateError] = useState("");
  

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

  const validate = () => {

    var checker = true;

    const SDate = startDate.split('-');
    const EDate = endDate.split('-');

    if(startDate != '' && endDate != ''){
      if(SDate[0] > EDate[0]){
        setDateError("End Date should be later same or than start date")
        checker = false;

      }
      else if(SDate[0] < EDate[0]){
        setDateError("");
        checker = true;
      }
      else{
        if(SDate[1] < EDate[1]){
          setDateError("");
          checker = true;
        }
        else if(SDate[1] > EDate[1]){
          setDateError("End Date should be same or later than start date")
          checker = false;
        }
        else{
          if(SDate[2] > EDate[2]){
            setDateError("End Date should be same or later than start date")
            checker = false;
          }
          else{
            setDateError("");
            checker = true;

          }
        }

        
      }
    }
    else{
      setDateError("Please enter the start and end date")
      checker = false
    }
    if(cardName == ""){
      
      setCardNameError("Please enter the card holder's name")
      checker = false
    }
    else{
      setCardNameError("")
    }

    if(cardNumber == ""){
      
      setCardNumberError("Please enter your card number")
      checker = false
    }
    else{
      setCardNumberError("")
    }

    if(cardExpiryDate == ""){
      
      setCardExpiryDateError("Please enter the expiry date")
      checker = false
    }
    else{
      setCardExpiryDateError("")
    }

    if(cardCvc == ""){
      
      setCardCvcError("Please enter the CVC")
      checker = false
    }
    else{
      setCardCvcError("")
    }

    return checker

    
  }

    

  function reserve(){
    const isValid = validate();
    if (isValid){
      console.log("VALIDDD")
      

      var insurance = document.getElementById("insurance").value;
      console.log(insurance);
  
      Axios.post('http://localhost:3001/api/reserve', {
        reservationNumber:Math.floor(Math.random() * (500 - 1 + 1)) + 500,
        startDate: startDate, 
        endDate: endDate,
        regNo: state.car_regNo,
        user: auth.user,
        insurance: insurance
        }).then((response)=>{    
            // if (response.data == "Successful reservation"){
              alert(response.data);
            // }
        });

    }
   
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
    <div style={{color: "red"}}>{dateError}</div> 
    
    <div> Insurance: </div>
    <select name="insurance" id="insurance">
    <option value="comprehensive">Comprehensive</option>
    <option value="third-party">Third-party</option>
    </select>
    

    <div> Payment Details: </div>
    <label for='cardName'>Card Holder Name</label>
    <input type='text' id='cardName' onChange={(e)=>{setCardName(e.target.value)}}/>
    <div style={{color: "red"}}>{cardNameError}</div>
    <label for='cardNo'>Card Number</label>
    <input type='number' id='cardNo' onChange={(e)=>{setCardNumber(e.target.value)}}/>
    <div style={{color: "red"}}>{cardNumberError}</div>
    <label for='expiryDate'>ExpiryDate</label>
    <input type='date' id='expiryDate' onChange={(e)=>{setCardExpiryDate(e.target.value)}}/>
    <div style={{color: "red"}}>{cardExpiryDateError}</div>
    <label for='cvc'>CVC</label>
    <input type='text' id='cvc' onChange={(e)=>{setCardCvc(e.target.value)}}/>
    <div style={{color: "red"}}>{cardCvcError}</div>
 

    <button onClick={reserve}> Reserve </button>
            
    </div>  
    </>
  );}



export default ReservationPage;

