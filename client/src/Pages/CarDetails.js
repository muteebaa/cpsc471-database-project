import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';


import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function CarDetails(props) {

  const { id }  = useParams();

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



  useEffect(() => {
    const info = async () => {
    

      Axios.post("http://localhost:3001/api/Cars", {
      
    }).then((response) => {

      
      console.log(response.data.length)
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
        }
      }
         
      
    })}

    info()
    
  })

  return (
      // <Router> 
      <><div>
      
    </div>
      
        <h1> Car Detail Page </h1>

       <div className="Registraion Number">Registration Number : {regNumber}</div>
       <div className="Make">Make : {make}</div>
       <div className="Model">Model : {model}</div>
       <div className="Year">Year : {year}</div>
       <div className="Type">Type : {type}</div>
       <div className="Colour">Colour : {colour}</div>
       <div className="Features">Features : {features}</div>
       <div className="Pickup Address">Pickup Address : {address}</div>
       <div className="Price">Price : {price} per day</div>
       <div className="Description">Description : {description}</div>
       <br></br>
       <div className="Picture"><strong></strong><img src={require(`../imgs/${  photo  }`)} width="300" height="215" /> </div>
        
      </>
  );}



export default CarDetails;

