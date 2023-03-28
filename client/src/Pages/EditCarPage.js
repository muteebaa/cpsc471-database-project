import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';

import { useAuth } from "./auth";

import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function EditCarPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth();
    const [data, setData] = useState([])
    
  
    const idMatch = (value) => value.username === auth.user;

    var navigate = useNavigate();

    useEffect(() => {
      const info = async () => {
      
  
        Axios.post("http://localhost:3001/api/Cars", {
        
      }).then((response) => {
  
        let tempData = response.data
        for(const car of response.data){

      

          
          tempData = tempData.filter(idMatch)
          

        }

        setData(tempData)
           
        
      })}
  
      info()
      
    })


 

  return (
    

    <> <div class="App">
        <h1> Rent Your Ride </h1>
        <div> Welcome {auth.user} </div>
      
        {
          
          data.map( (getD)=>(

            
            <div key={getD.regNumber}>
              <div class = "Car">
              <a href={"/editYourCar/"+getD.regNumber}>{getD.make} {getD.model}</a>
              <br></br>
                <div class="Price"><strong>Price: </strong>{  getD.price  } per day</div>
                <br></br>
                <div class="Picture"><strong></strong><img src={require(`../imgs/${  getD.photo  }`)} width="300" height="215" /> </div>
                <br></br>
                <br></br>
              </div>
              <br>
              
              </br>
                
            
            </div>
            

          )
          
          )
        }

    
        
      </div>
      
      </>



  );
}

export default EditCarPage;
