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

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  function addCar() {
    console.log("add car called")
    
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    console.log(file)
    Axios.post("http://localhost:3001/api/test", {
      username: auth.user,
      make: make,
      model: model,
      photo: file,
      photoName: photoName,
      reg: regNo,
      price: price,
      colour: colour,
      features: features
    }, config).then((response) => {
      console.log(response)
    })
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

      <div>
        {/* <form method="POST" encType="multpart/form-data" action={addCar}> */}
          <input type="text" placeholder="regNo" name="regNo" 
          onChange={
            (e) => {setRegNo(e.target.value);
          }}/>
          <input type="number" placeholder="price" name="price"    onChange={
            (e) => {setPrice(e.target.value);
          }}/>
          <input type="text" placeholder="color" name="color"   onChange={
            (e) => {setColour(e.target.value);
          }} />
          <input type="text" placeholder="make" name="make" onChange={(e)=>{setMake(e.target.value)}} />
          <input type="text" placeholder="model" name="model" onChange={(e)=>{setModel(e.target.value)}} />
          <input type="text" placeholder="add features with a comma" name="features" onChange={(e)=>{setFeatures(e.target.value)}} />

          
          <input type="file" onChange={
            (e) => { setFile(e.target.files[0] )
              setPhotoName(e.target.files[0].name )
          }}  />
          <button onClick={addCar}>Add car</button>
        {/* </form> */}
        <button onClick={showRentHistory}>Show Rent History</button>
      </div>
      

      <button onClick={handleLogout}>Logout</button>
      </>



  );
}

export default LoanerPage;
