import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';

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
 
    const [regNo, setRegNo] = useState("");

    const [make,setMake] = useState("");
    const [model,setModel] = useState("");
    const [file,setFile] = useState("");
    const [photoName,setPhotoName] = useState("");
    const [price,setPrice] = useState("");
    const [features,setFeatures] = useState("");
    const [colour,setColour] = useState("");
    const [pickupAddress,setAddress] = useState("");
    const [year,setYear] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [recalls,setRecalls] = useState("");
    const [status,setStatus] = useState("");
    const [damage,setDamage] = useState("");
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1<10?`0${current.getMonth() + 1}`:`${current.getMonth() + 1}`}-${current.getDate()<10?`0${current.getDate()}`:`${current.getDate()}`}`;
    

    const [regNoError, setRegNoError] = useState("");
    const [makeError,setMakeError] = useState("");
    const [modelError,setModelError] = useState("");
    const [photoNameError,setPhotoNameError] = useState("");
    const [priceError,setPriceError] = useState("");
    const [featuresError,setFeaturesError] = useState("");
    const [colourError,setColourError] = useState("");
    const [pickupAddressError,setAddressError] = useState("");
    const [yearError,setYearError] = useState("");
    const [descriptionError,setDescriptionError] = useState("");
    const [typeError,setTypeError] = useState("");
    const [dateError,setDateError] = useState("");
    const [recallsError,setRecallsError] = useState("");
    const [statusError,setStatusError] = useState("");
    const [damageError,setDamageError] = useState("");

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
    }) 

  }


  const validate = () => {

    var checker = true;

    const SDate = startDate.split('-');
    const EDate = endDate.split('-');

    if(startDate != '' && endDate != ''){
      if(SDate[0] > EDate[0]){
        setDateError("End Date should be later than start date")
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
          setDateError("End Date should be later than start date")
          checker = false;
        }
        else{
          if(SDate[2] > EDate[2]){
            setDateError("End Date should be later than start date")
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

    


    if(regNo == ""){
      
      setRegNoError("Please enter a registration number")
      checker = false
    }
    else{
      setRegNoError("")
    }

    if(price == ""){
      
      setPriceError("Please enter a price")
      checker = false
    }
    else{
      setPriceError("")
    }

    if(model == ""){
      
      setModelError("Please enter a model")
      checker = false
    }
    else{
      setModelError("")
    }

    if(year == ""){
      
      setYearError("Please enter a year")
      checker = false
    }
    else{
      setYearError("")
    }

    if(features == ""){
      
      setFeaturesError("Please enter features for your car")
      checker = false
    }
    else{
      setFeaturesError("")
    }

    if(pickupAddress == ""){
      
      setAddressError("Please enter features of car")
      checker = false
    }
    else{
      setAddressError("")
    }

    if(description == ""){
      
      setDescriptionError("Please enter a description of your car")
      checker = false
    }
    else{
      setDescriptionError("")
    }

    if(photoName == ""){
      
      setPhotoNameError("Please upload a picture of your car")
      checker = false
    }
    else{
      setPhotoNameError("")
    }

    if(recalls == ""){
      
      setRecallsError("Please provide an answer")
      checker = false
    }
    else{
      setRecallsError("")
    }

    if(recalls == ""){
      
      setStatusError("Please provide the status of your car")
      checker = false
    }
    else{
      setStatusError("")
    }

    if(colour == ""){
      
      setColourError("Please select the colour of your car")
      checker = false
    }
    else{
      setColourError("")
    }

    if(damage == ""){
      
      setDamageError("Please write N/A if there is nothing wrong")
      checker = false
    }
    else{
      setDamageError("")
    }

    if(type == ""){
      
      setTypeError("Please select the type of your car")
      checker = false
    }
    else{
      setTypeError("")
    }

    if(make == ""){
      
      setMakeError("Please select the make of your car")
      checker = false
    }
    else{
      setMakeError("")
    }

    return checker
  }

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  function addCarPage(){
    navigate('/add-car');
  }
  function showRentHistory() {
    
  }

  return (
    

    <><div>
      {info()}
    </div> <div className="App">
        <h1> Loaner Home Page </h1>
        <div> Welcome {auth.user} </div>
      </div>
      <div className="Information">
        <h1> About: </h1>
        <div> First Name : {firstName} </div>
        <div> Last Name : {lastName} </div>
        <div> PhoneNumber : {phoneNumber} </div>
        <div> Email : {emailAddress} </div>

    
      </div>
      
      <button onClick={addCarPage}>Add Car</button>
      <button onClick={handleLogout}>Logout</button>
      </>



  );
}

export default LoanerPage;
