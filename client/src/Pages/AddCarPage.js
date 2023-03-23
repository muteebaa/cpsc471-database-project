import React, {useState, useEffect} from "react"; 
//import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';
import { useAuth } from "./auth";
import Axios from 'axios';

function RenterPage() {
    var navigate = useNavigate();
    var { username } = useParams();
    const auth = useAuth()
  
    const [regNo, setRegNo] = useState("");

    const [fname,setFileName] = useState("");
    const [file,setFile] = useState("");
    const [photoName,setPhotoName] = useState("");
    const [price,setPrice] = useState("");
    const [colour,setColour] = useState("");
    const [pic,setPic] = useState("");

    const carinfo = () => {
      Axios.post("http://localhost:3001/api/carinfo", {
      regNo: 677
    }).then((response) => {
      console.log(response.data)
        setPic(response.data)
  
    })
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
      photo: file,
      photoName: photoName,
      reg: regNo,
      price: price,
      colour: colour
    }, config).then((response) => {
      console.log(response)
    })

    if(true){
      navigate('/carinfo')
    }
  }


  return (
    <div>
      <nav>
        <Link to="/loaner-page"> Back </Link>
      </nav>  
          <input type="text" placeholder="regNo" name="regNo" 
          onChange={
            (e) => {setRegNo(e.target.value);
          }}/>
          <input type="text" placeholder="price" name="price"    onChange={
            (e) => {setPrice(e.target.value);
          }}/>
          <input type="text" placeholder="color" name="color"   onChange={
            (e) => {setColour(e.target.value);
          }} />
          <input type="text" placeholder="name" name="name" onChange={(e)=>{setFileName(e.target.value)}} />
          <input type="file" onChange={
            (e) => { setFile(e.target.files[0] )
              setPhotoName(e.target.files[0].name )
          }}  />
          <button onClick={addCar}>Add car</button>
          <button onClick={carinfo}>show car</button>
      </div> 
  );
}

export default RenterPage;

