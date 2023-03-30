import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import "../styles/LoanerPage.css"
import Nav from "./NavBar";
import { useAuth } from "./auth";

import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function LoanerPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth()
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [phoneNumber, setPhoNumber] = useState("");
    const [emailAddress, setEmail] = useState("");
    const [premiumPlan, setPremiumPlan] = useState("true");
    const [premiumPlanValue, setPremiumPlanValue] = useState("");
    const [cardNumber,setCardNumber] = useState("");
    const [cardName,setCardName] = useState("");
    const [cardCvc,setCardCvc] = useState("");
    const [cardExpiryDate,setCardExpiryDate] = useState("");
    const [cardNumberError,setCardNumberError] = useState("");
    const [cardNameError,setCardNameError] = useState("");
    const [cardCvcError,setCardCvcError] = useState("");
    const [cardExpiryDateError,setCardExpiryDateError] = useState("");
    const [premiumPlanError, setPremiumPlanError] = useState("");
    const [usernamee, setUsername] = useState("");
    const [carWash, setCarWash] = useState("");
    const [detail, setDetail] = useState("");

    
 
    
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1<10?`0${current.getMonth() + 1}`:`${current.getMonth() + 1}`}-${current.getDate()<10?`0${current.getDate()}`:`${current.getDate()}`}`;
    

    var navigate = useNavigate();

    const info = () => {
      
      Axios.post("http://localhost:3001/api/UserInfo", {
      username: auth.user
    }).then((response) => {
      console.log(response.data)
      setFName(response.data[0].FirstName);
      setLName(response.data[0].LastName);
      setPhoNumber(response.data[0].PhoneNumber);
      setEmail(response.data[0].EmailAddress);
      setUsername(response.data[0].username);
      
    }) 

  }

  const planInfo = () => {
      
    Axios.post("http://localhost:3001/api/planInfo", {
    username: usernamee
  }).then((response) => {
    if(response.data[0] != null){
      setPremiumPlan("true");
      setCarWash(response.data[0].car_wash);
      setDetail(response.data[0].detailing);


    }
    else{
      setPremiumPlan("false");
    }
    
  }) 

}

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  const validate = () => {

    var checker = true;

    if(premiumPlanValue == ""){
      
      setPremiumPlanError("Please choose a plan")
      checker = false
    }
    else{
      setPremiumPlanError("")
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

  const cancelPremiumPlan = () => {

    Axios.post("http://localhost:3001/api/cancelpremiumplan", {
        username: usernamee

      }).then((response) => {
        
      })
      alert("Your plan was cancelled");
      navigate('/loaner-page') 
    
  }

  const registerPremiumPlan = () => {

    const isValid = validate();

    if(isValid){
      
      
      Axios.post("http://localhost:3001/api/registerpremiumplan", {
        username: usernamee,
        premiumPlan: premiumPlanValue

      }).then((response) => {
        
      })
      alert("Your plan was added to your account. Thank you!");
      navigate('/loaner-page') 
    }
    
  }

  function addCarPage(){
    navigate('/add-car');
  }
  function editCarPage(){
    navigate('/edit-car');
  }
  function showRentHistory() {
    
  }

  return (
    

    <><div>
      {info()}
      {planInfo()}
    </div>
    
    <div class="Page">
    <Nav></Nav>

    <div class="Welcome">
        <h1 class="Heading"> Loaner Home Page </h1>
        <div> Welcome {auth.user} </div>
      </div>
      <div class="Information">
        <h1 class="Heading"> About: </h1>
        <div> First Name : {firstName} </div>
        <div> Last Name : {lastName} </div>
        <div> PhoneNumber : {phoneNumber} </div>
        <div> Email : {emailAddress} </div>

    
      </div>
      <div class="button">
        <button class="button1" onClick={addCarPage}>Add Car</button>
        <button class="button2" onClick={editCarPage}>Extend the End Date for a Car</button>
        <button class="button3" onClick={handleLogout}>Logout</button>
      </div>
      
      
      <div class="premiumplan">
      <h1 class="Heading"> Premium Plan: </h1>     
            {
                (() => {
                    if(`${premiumPlan}`==="true") {
                            return (
                              <>
                                <p>Your Premium Plan is active.</p>
                                <p><strong class="Heading1">Services:</strong></p>

                                  <p><strong class="Heading1">Detailing:</strong> {detail}</p>
                                  <p><strong class="Heading1">Car Wash:</strong> {carWash}</p>


                                <p>Please visit one of our following locations to use your active services</p>

                                  <p><strong class="Heading1">Location: </strong>4624 Valiant Dr NW, Calgary, AB T3A 0X9 <strong> Time: </strong> 8:00 AM - 7:00 PM</p>
                                  <p><strong class="Heading1">Location: </strong>5302 Northland Dr NW, Calgary, AB T2L 2K4 <strong> Time: </strong> 9:00 AM - 8:00 PM</p>
                                  <p><strong class="Heading1">Location: </strong>150 Citadel Way NW, Calgary, AB T3G 5C1 <strong> Time: </strong> 8:00 AM - 5:00 PM</p>
                                  <p><strong class="Heading1">Location: </strong>177 Country Hills Blvd NW, Calgary, AB T3K 5M6 <strong> Time: </strong> 10:00 AM - 7:00 PM</p>


                                <p>Your plan will automatically renew next month unless you cancel it.</p>
                                
                                <p>To cancel your plan, please click the cancel button.</p>
                                <button onClick={cancelPremiumPlan}>Cancel</button>

                              </>
                            )
                        } else {
                            return (
                              <>
                                <p>Tired of washing and detailing your car? Choose our premium plan and let us handle your worries</p>
                                <div> Plan: </div>
                                <select class="Input" name="plan" id="plan" onChange={(e)=>{setPremiumPlanValue(e.target.value)}}>
                                <option value=""></option>
                                <option value="Car_wash">Car Wash</option>
                                <option value="Detailing">Detailing</option>
                                <option value="Both">Both</option>
                                </select>
                                <div style={{color: "red"}}>{premiumPlanError}</div>
                                <div> Payment Details: </div>
                                <label for='cardName'>Card Holder Name</label>
                                <input class="Input" type='text' id='cardName' onChange={(e)=>{setCardName(e.target.value)}}/>
                                <div style={{color: "red"}}>{cardNameError}</div>
                                <label for='cardNo'>Card Number</label>
                                <input class="Input" type='number' id='cardNo' onChange={(e)=>{setCardNumber(e.target.value)}}/>
                                <div style={{color: "red"}}>{cardNumberError}</div>
                                <label for='expiryDate'>ExpiryDate</label>
                                <input class="Input" type='date' id='expiryDate' onChange={(e)=>{setCardExpiryDate(e.target.value)}}/>
                                <div style={{color: "red"}}>{cardExpiryDateError}</div>
                                <label for='cvc'>CVC</label>
                                <input class="Input" type='text' id='cvc' onChange={(e)=>{setCardCvc(e.target.value)}}/>
                                <div style={{color: "red"}}>{cardCvcError}</div>
                                <button onClick={registerPremiumPlan}>Register</button>
                              </>

                            )
                        }
                })()  
            }  
        </div>
        </div>

      </>



  );
}

export default LoanerPage;
