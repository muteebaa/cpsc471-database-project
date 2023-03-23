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
    const [pickupAddress,setAddress] = useState("");
    const [year,setYear] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");

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
    Axios.post("http://localhost:3001/api/registerCar", {
      username: auth.user,
      make: make,
      model: model,
      year: year,
      photo: file,
      photoName: photoName,
      reg: regNo,
      price: price,
      colour: colour,
      features: features,
      pickupAddress: pickupAddress,
      type: type,
      description: description

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
          <input type="number" placeholder="price per day" name="price"   onChange={
            (e) => {setPrice(e.target.value);
          }}/>
          <select name="color" placeholder="color"  onChange={(e)=>{setColour(e.target.value)}}>
            <option value="Amber">Amber</option>
            <option value="Beige">Beige</option>
            <option value="Black">Black</option>
            <option value="Bronze">Bronze</option>
            <option value="Brown">Brown</option>
            <option value="Burgundy">Burgundy</option>
            <option value="Charcoal">Charcoal</option>
            <option value="Dark Blue">Dark Blue</option>
            <option value="Dark Green">Dark Green</option>
            <option value="Dark Grey">Dark Grey</option>
            <option value="Gold">Gold</option>
            <option value="Green">Green</option>
            <option value="Light Blue">Light Blue</option>
            <option value="Light Green">Light Green</option>
            <option value="Light Grey">Light Grey</option>
            <option value="Maroon">Maroon</option>
            <option value="Orange">Orange</option>
            <option value="Other">Other</option>
            <option value="Pewter">Pewter</option>
            <option value="Purple">Purple</option>
            <option value="Red">Red</option>
            <option value="Silver">Silver</option>
            <option value="Stone">Stone</option>
            <option value="White">White</option>
            <option value="Yellow">Yellow</option>
          </select>
          <select name="make" placeholder="make"  onChange={(e)=>{setMake(e.target.value)}}>
            <option value="Acura">Acura</option>
            <option value="Audi">Audi</option>
            <option value="Alfa Romeo">Alfa Romeo</option>
            <option value="Astom Martin">Aston Martin</option>
            <option value="Bentley">Bentley</option>
            <option value="BMW">BMW</option>
            <option value="Buick">Buick</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Chrysler">Chrysler</option>
            <option value="Dodge">Dodge</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Fiat">Fiat</option>
            <option value="Ford">Ford</option>
            <option value="Genesis">Genesis</option>
            <option value="Geo">Geo</option>
            <option value="GMC">GMC</option>
            <option value="Honda">Honda</option>
            <option value="Hummer">Hummer</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Infiniti">Infiniti</option>
            <option value="Jaguar">Jaguar</option>
            <option value="Jeep">Jeep</option>
            <option value="Kia">Kia</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Lexus">Lexus</option>
            <option value="Lincoln">Lincoln</option>
            <option value="Lotus">Lotus</option>
            <option value="Maserati">Maserati</option>
            <option value="Mazda">Mazda</option>
            <option value="McLaren">McLaren</option>
            <option value="Merecedes-AMG">Merecedes-AMG</option>
            <option value="Merecedes-Benz">Merecedes-Benz</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Nissan">Nissan</option>
            <option value="Other">Other</option>
            <option value="Pontiac">Pontiac</option>
            <option value="Porsche">Porsche</option>
            <option value="Ram">Ram</option>
            <option value="Rolls-Royce">Rolls-Royce</option>
            <option value="Scion">Scion</option>
            <option value="Shelby">Shelby</option>
            <option value="Smart">Smart</option>
            <option value="Subaru">Subaru</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Tesla">Tesla</option>
            <option value="Toyota">Toyota</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Volvo">Volvo</option>
          
          </select>
          <input type="text" placeholder="model" name="model"  onChange={(e)=>{setModel(e.target.value)}} />
          <input type="text" placeholder="year" name="year"  onChange={(e)=>{setYear(e.target.value)}} />
          <select name="type" placeholder="type"  onChange={(e)=>{setType(e.target.value)}}>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
            <option value="Other">Other</option>
          </select>
          
          <input type="text" placeholder="add features with a comma" name="features"  onChange={(e)=>{setFeatures(e.target.value)}} />
          <input type="text" placeholder="pickup address" name="pickupAddress"  onChange={(e)=>{setAddress(e.target.value)}} />
          <input type="text" placeholder="description" name="descriptionn"  onChange={(e)=>{setDescription(e.target.value)}} />

          
          <input type="file"  onChange={
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
