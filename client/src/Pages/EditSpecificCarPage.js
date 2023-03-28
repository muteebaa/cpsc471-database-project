import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';

import { useAuth } from "./auth";

import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function EditSpecificCarPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const { id }  = useParams();
    const auth = useAuth();
    const [data, setData] = useState([]);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [regNumber, setRegNumber] = useState("");
    const [price, setPrice] = useState("");
    const [features, setFeatures] = useState("");
    const [colour, setColour] = useState("");
    const [photo, setPhoto] = useState("image-unknown.png");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [recalls, setRecalls] = useState("");
    const [status, setStatus] = useState("");
    const [damage, setDamage] = useState("");
    const [extendedEndDate, setExtendedEndDate] = useState("");
    
  

    var navigate = useNavigate();

    useEffect(() => {
      const info = async () => {
      
  
        Axios.post("http://localhost:3001/api/Cars", {
        
      }).then((response) => {
        for(const car of response.data){
          if (car.regNumber == id){
            setPhoto(car.photo)
            setMake(car.make)
            setModel(car.model)
            setYear(car.year)
            setRegNumber(car.regNumber)
            setPrice(car.price)
            setFeatures(car.features)
            setColour(car.colour)
            setPhoto(car.photo)
            setAddress(car.pickupAddress)
            setType(car.type)
            setDescription(car.description)
            setStartDate(car.startDate)
            setEndDate(car.endDate)
            setRecalls(car.recalls)
            setDamage(car.damage)
            setStatus(car.status)
  
            console.log(car.startDate)
          }
        }
           
        
      })}
  
      info()
      
    })

    const EditCar = () => {

        
        
      Axios.post("http://localhost:3001/api/editCarEndDate", {
        regNumber: regNumber,
        extendedEndDate: extendedEndDate
        
  
      }).then((response) => {
          
      })
      alert(`Your car is now rentable till ${extendedEndDate}. Thank you!`);
      navigate('/CarsForRent') 
      
      
    }


 

  return (
    

    <> <div class="App">
        <h1> Extend your {year} {make} {model}'s time on our website </h1>
        
      
        <div class="Registraion Number">Registration Number : {regNumber}</div>
       <div class="Make">Make : {make}</div>
       <div class="Model">Model : {model}</div>
       <div class="Year">Year : {year}</div>
       <div class="Type">Type : {type}</div>
       <div class="Colour">Colour : {colour}</div>
       <div class="Features">Features : {features}</div>
       <div class="Pickup Address">Pickup Address : {address}</div>
       <div class="Price">Price : {price} per day</div>
       <div class="Description">Description : {description}</div>
       <div class="Recalls">Number of pending recalls : {recalls}</div>
       <div class="Status">The car has a {status} status</div>
       <div class="Damage">Any damage on the car : {damage}</div>
       <div class="CurrentStartDate">Current Start Date : {startDate}</div>
       <div class="Damage">Current End Date : {endDate}</div>
       <div class="EndDate">
            Extended End Date:
            <input type="date" placeholder="EndDate" name="EndDate" min={endDate}  onChange={(e)=>{setExtendedEndDate(e.target.value)}} />
            
        </div>
       <br></br>
       <div class="Picture"><strong></strong><img src={require(`../imgs/${  photo  }`)} width="300" height="215" /> </div>
       <button onClick={EditCar}>Save the extended date</button>
       
       
       

    
        
      </div>
      
      </>



  );
}

export default EditSpecificCarPage;
