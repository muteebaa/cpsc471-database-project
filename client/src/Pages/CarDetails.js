import React, {useState, useEffect, Suspense} from "react"; 
//import './App.css';
import Axios from 'axios';

import ReviewForm from "../components/ReviewForm";
import "../styles/CarDetails.css";

import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function CarDetails(props) {
  var navigate = useNavigate();
  const auth = useAuth();
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recalls, setRecalls] = useState("");
  const [status, setStatus] = useState("");
  const [damage, setDamage] = useState("");
  
  const [conditionRate, setConditionRate] = useState("");
  const [locationRate, setLocationRate] = useState("");
  const [comment, setComment] = useState("");
  const [revState, setRevState] = useState(false);
  const [subState, setSubState] = useState(false);
  const [prevRenter, setPrevRenter] = useState(false);
  const [renter, setRenter] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
    

 useEffect(() => {
    const info = async () => {
    

      Axios.post("http://localhost:3001/api/Cars", {
      
    }).then((response) => {
      console.log("userrrrr DETAILL PAGE" + auth.user)
      
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
          setStartDate(car.startDate)
          setEndDate(car.endDate)
          setRecalls(car.recalls)
          setDamage(car.damage)
          setStatus(car.status)

          console.log(car.startDate)
        }
      }
         
      
    })
    Axios.post("http://localhost:3001/api/getReviews", {
      regNumber: id
    }).then((response) => {
      setAllReviews(response.data)
    })
    
  }

    info()
    
 }, [])
 
  function reservation() {
    navigate('/reservation',
      {
        state: {
          car_regNo: regNumber,
        }
      });

  }

  function prevRenterCheck() {
   
    Axios.post('http://localhost:3001/api/prevRenter', {
      username: auth.user,
      regNo: regNumber
    }).then((response)=>{
          if(response.data){
            setPrevRenter(true)
          }  
    });
}
  function reviewCheck() {
   
      Axios.post('http://localhost:3001/api/alreadyReviewed', {
        username: auth.user,
        regNo: regNumber
      }).then((response)=>{
            if(response.data== "reviewed"){
              setRevState(true)
            }  
      });
  }

  function renterCheck() {
   
    Axios.post('http://localhost:3001/api/renterCheck', {
      username: auth.user
    }).then((response)=>{
          if(response.data){
            setRenter(true)
          }  
    });
}
  
  function submitReview() {

    if(subState == false)
    
    {setSubState(true);
        Axios.post('http://localhost:3001/api/submitReview', {
        username: auth.user, 
        location: locationRate,
        cond: conditionRate,
        comment: comment,
        regNo: id
      }).then((response)=>{
            console.log(response.data);
      });}
  }
  renterCheck()
  prevRenterCheck()
  reviewCheck()
  console.log(allReviews)

  return (
      // <Router> 
      <><div>
      
    </div>
      
      <h1> Car Detail Page </h1>

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
       <br></br>
       <div class="Picture"><strong></strong><img src={require(`../imgs/${  photo  }`)} width="300" height="215" /> </div>
       
      {renter ? 
        <button onClick={() => { reservation() }}> Make Reservation </button> 
        :
        <div></div>
      }
      <div className="reviewsection">
      
        <div>Reviews </div>
        <div className="allcomments">
        {allReviews.map( (getR)=>(
                  
          <div className="comment">
            <div> Renter: {  getR.username  } </div> 
            <div> comment: {  getR.writting_comments  } </div> 
          </div>
                 
                  
        ))} 
        </div>

          {auth.user ?
              renter ?
                prevRenter ?
                  revState ? 
                    <div>
                        <div className="noreviewmessage">  You have submitted a review for this car.</div>
                        {submitReview()}
                        {useEffect}
                    </div>
                    : 
                    <div> 
                      <ReviewForm cond={setConditionRate} loc={setLocationRate} comment={setComment} sub={setRevState}>
                      </ReviewForm> 
                    </div> 
                :
                <div className="noreviewmessage"> Rent the car to leave a review :</div>
              :
              <div className="noreviewmessage"> Must be a renter to leave a review :</div>

            : 
            <button
              onClick={()=>
                navigate('/renter-login')
              }>
              Sign in to review
            </button>
          }

       
   
        
      </div>

       
      </>
  );}



export default CarDetails;

