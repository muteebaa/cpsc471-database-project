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
                <div className="Make"><strong>Make: </strong>{  getD.make  }</div>
                <div className="Model"><strong>Model: </strong>{  getD.model  }</div>
                <div className="Price"><strong>Price: </strong>{  getD.price  }</div>
                <div className="Color"><strong>Color:</strong>{  getD.photo  }</div>
                <div className="Picture"><strong>Picture: </strong><img src={require(`../imgs/${  getD.photo  }`)} /> </div>

                <div> <button onClick={MoreInfo}> Find out more </button> </div>
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

