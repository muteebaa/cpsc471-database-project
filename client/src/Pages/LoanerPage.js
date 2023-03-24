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

    const [regNoError, setRegNoError] = useState("");
    const [makeError,setMakeError] = useState("");
    const [modelError,setModelError] = useState("");
    const [fileError,setFileError] = useState("");
    const [photoNameError,setPhotoNameError] = useState("");
    const [priceError,setPriceError] = useState("");
    const [featuresError,setFeaturesError] = useState("");
    const [colourError,setColourError] = useState("");
    const [pickupAddressError,setAddressError] = useState("");
    const [yearError,setYearError] = useState("");
    const [descriptionError,setDescriptionError] = useState("");
    const [typeError,setTypeError] = useState("");

    var navigate = useNavigate();

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
  const validate = () => {

    var checker = true;

    if(regNo == ""){
      
      setRegNoError("Please enter a registration number")
      checker = false
    }
    else{
      setRegNoError("")
    }

    if(price == ""){
      
      setPriceError("Please enter a price")
      checker = false
    }
    else{
      setPriceError("")
    }

    if(model == ""){
      
      setModelError("Please enter a model")
      checker = false
    }
    else{
      setModelError("")
    }

    if(year == ""){
      
      setYearError("Please enter a year")
      checker = false
    }
    else{
      setYearError("")
    }

    if(features == ""){
      
      setFeaturesError("Please enter features for your car")
      checker = false
    }
    else{
      setFeaturesError("")
    }

    if(pickupAddress == ""){
      
      setAddressError("Please enter features of car")
      checker = false
    }
    else{
      setAddressError("")
    }

    if(description == ""){
      
      setDescriptionError("Please enter a description of your car")
      checker = false
    }
    else{
      setDescriptionError("")
    }

    if(photoName == ""){
      
      setPhotoNameError("Please upload a picture of your car")
      checker = false
    }
    else{
      setPhotoNameError("")
    }

    if(colour == ""){
      
      setColourError("Please select the colour of your car")
      checker = false
    }
    else{
      setColourError("")
    }

    if(type == ""){
      
      setTypeError("Please select the type of your car")
      checker = false
    }
    else{
      setTypeError("")
    }

    if(make == ""){
      
      setMakeError("Please select the make of your car")
      checker = false
    }
    else{
      setMakeError("")
    }

    return checker
  }

  const handleLogout = () => {
    auth.logout()
    navigate('/')
  }

  function addCar() {
    console.log("add car called")

    const isValid = validate();
    if(isValid){
    
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
        
      })
      alert("Your car was added to our website");
      
      

   }
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

      <div className="AddCar">
          <br></br>
          <strong>Add a Car?</strong>
          <br></br>
          <div className="RegistrationNumber">
            Registration Number 
            <input type="text" placeholder="Registration Number" name="regNo" 
            onChange={
              (e) => {setRegNo(e.target.value);
            }}/>
            <div style={{color: "red"}}>{regNoError}</div>
          </div>
          <br></br>
          <div className="Price">
            Price Per Day 
            <input type="number" placeholder="Price Per Day" name="price"   onChange={
              (e) => {setPrice(e.target.value);
            }}/>
            <div style={{color: "red"}}>{priceError}</div>
          </div>
          <br></br>
          <div className="Colour">
            Colour 
            <select name="color" placeholder="Colour"  onChange={(e)=>{setColour(e.target.value)}}>
              <option value=""></option>
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
            <div style={{color: "red"}}>{colourError}</div>
          </div>
          <br></br>
          <div className="Make">
            Make 
            <select name="make" placeholder="Make"  onChange={(e)=>{setMake(e.target.value)}}>
              <option value=""></option>
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
            <div style={{color: "red"}}>{makeError}</div>
          </div>
          <br></br>

          <div className="Model">
            Model 
            <input type="text" placeholder="Model" name="model"  onChange={(e)=>{setModel(e.target.value)}} />
            <div style={{color: "red"}}>{modelError}</div>
          </div>
          <br></br>
          <div className="Year">
            Year 
            <input type="number" placeholder="Year" name="year"  onChange={(e)=>{setYear(e.target.value)}} />
            <div style={{color: "red"}}>{yearError}</div>
          </div>
          <br></br>
          <div className="Type">
            Type 
            <select name="type" placeholder="Type"  onChange={(e)=>{setType(e.target.value)}}>
              <option value=""></option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Other">Other</option>
            </select>
            <div style={{color: "red"}}>{typeError}</div>
          </div>
          <br></br>
          
          <div className="Features">
            Features 
            <input type="text" placeholder="Add a Feature with Comma" name="features"  onChange={(e)=>{setFeatures(e.target.value)}} />
            <div style={{color: "red"}}>{featuresError}</div>
          </div>
          <br></br>
          <div className="Address">
            Pickup Address  
            <input type="text" placeholder="Pickup Address" name="pickupAddress"  onChange={(e)=>{setAddress(e.target.value)}} />
            <div style={{color: "red"}}>{pickupAddressError}</div>
          </div>
          <br></br>

          <div className="Description">
            Description  
            <input type="text" placeholder="Description" name="description"  onChange={(e)=>{setDescription(e.target.value)}} />
            <div style={{color: "red"}}>{descriptionError}</div>
          </div>
          <br></br>

          
          <input type="file"  onChange={
            (e) => { setFile(e.target.files[0] )
              setPhotoName(e.target.files[0].name )
          }}  />
          <div style={{color: "red"}}>{photoNameError}</div>
          <br></br>
          <button onClick={addCar}>Add car</button>
          <br></br>
        
        <button onClick={showRentHistory}>Show Rent History</button>
      </div>
      

      <button onClick={handleLogout}>Logout</button>
      </>



  );
}

export default LoanerPage;