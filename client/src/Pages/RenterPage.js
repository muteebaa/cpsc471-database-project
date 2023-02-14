import React, {useState, useEffect} from "react"; 
//import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';
import { useAuth } from "./auth";
import Axios from 'axios';

function RenterPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth()
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [phoneNumber, setPhoNumber] = useState("");
    const [emailAddress, setEmail] = useState("");
    const [regNo, setRegNo] = useState("");
    const [image, setImage] = useState([]);

    const [fname,setFileName] = useState("");
    const [file,setFile] = useState("");

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
    console.log(fname)
    console.log(file)
    Axios.post("http://localhost:3001/api/test", {
      fname: fname,
      photo: file
    }).then((response) => {
      console.log(response)
    })
  }

  function handleImage(e){
    console.log(e.target.files)
    setImage(e.target.files[0])
  }

  return (
    
    <><div>
      {info()}
    </div> <div className="App">
        <h1> Renter Home Page </h1>
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
          <input type="text" placeholder="price" name="price" />
          <input type="text" placeholder="color" name="color" />
          <input type="text" placeholder="name" name="name" onChange={(e)=>{setFileName(e.target.value)}} />
          <input type="file" onChange={
            (e) => { setFile(e.target.files[0].name)
          }}  />
          <button onClick={addCar}>Add car</button>
        {/* </form> */}
      </div>
      

      <button onClick={handleLogout}>Logout</button>
      </>
  );
}

export default RenterPage;

