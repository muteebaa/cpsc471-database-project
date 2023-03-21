import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';

import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function CarsForRent() {
  
  const [data, setData] = useState([])

  useEffect(() => {
    const info = async () => {
    

      Axios.post("http://localhost:3001/api/Cars", {
      
    }).then((response) => {
      setData(response.data)
      
      console.log("response")
    })}

    info()
    
  })

  const MoreInfo = () => {}



  return (
      // <Router> 
      <><div>
      
    </div>
      
        <h1> RentMyRide </h1>
        {
          data.map( (getD)=>(

            
            <div key={getD.regNumber}>
              <div className = "Car">
              <a href={"/CarDetails/"+getD.regNumber}>{getD.make} {getD.model}</a>
              <br></br>
                <div className="Price"><strong>Price: </strong>{  getD.price  } per day</div>
                <br></br>
                <div className="Picture"><strong></strong><img src={require(`../imgs/${  getD.photo  }`)} width="300" height="215" /> </div>
                <br></br>
                <br></br>
              </div>
              <br>
              
              </br>
                
            
            </div>
            

          )
          
          )
        }
      </>
  );}



export default CarsForRent;

