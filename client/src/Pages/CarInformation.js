import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';

import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function CarInformation() {
  
 /* const [data, setData] = useState([])

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

*/


  return (
      // <Router> 
      <><div>
      
    </div>
      
        <h1> CarInformationPage </h1>
        
            
            
            

          
          
          
        
      </>
  );}



export default CarInformation;

