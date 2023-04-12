import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
// import DatePicker from 'react-datetime';
import Calendar from "../components/Calendar";
import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams, useLocation} from 'react-router-dom';
// import 'react-datetime/css/react-datetime.css';
import '../components/Calendar.css'
import "../styles/ReservationPage.css"
import '../components/Calendar.css'
import videoBG from "../styles/background3.mp4";
import Nav from "./NavBar";
function ReservationPage() {
  var navigate = useNavigate();
  const auth = useAuth();
 
  const [Drange,setDrange] = useState(null);
  const [rangeLength,setRangeLength] = useState("");
  const { state } = useLocation();
  const [make,setMake] = useState("");
  const [model,setModel] = useState("");
  const [year,setYear] = useState("");
  const [availableStartDate,setAvailableStartDate] = useState("");
  const [availableEndDate,setAvailableEndDate] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [cardNumber,setCardNumber] = useState("");
  const [cardName,setCardName] = useState("");
  const [cardCvc,setCardCvc] = useState("");
  const [cardExpiryDate,setCardExpiryDate] = useState("");
  const [cardNumberError,setCardNumberError] = useState("");
  const [cardNameError,setCardNameError] = useState("");
  const [cardCvcError,setCardCvcError] = useState("");
  const [cardExpiryDateError,setCardExpiryDateError] = useState("");
  const [dateError,setDateError] = useState("");
  const [pickUp,setPickup] = useState("");
  const [cost,setCost] = useState("");
  const [price,setPrice] = useState("0");
  
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    const carInfo = async () => {
      
    

        Axios.post("http://localhost:3001/api/Cars", {
        
      }).then((response) => {
    
        
        console.log(response.data.length)
        for(const car of response.data){
          if (car.regNumber == state.car_regNo){
            setAvailableStartDate(car.startDate)
            setAvailableEndDate(car.endDate)
            setYear(car.year)
            setMake(car.make)
            setModel(car.model)
            setPickup(car.pickupAddress)
            setCost(car.price)
          }
        }
           
        
      })
      
    }
   
    carInfo()

  }, [])

  

  const validate = () => {

    var checker = true;

    const SDate = startDate.split('-');
    const EDate = endDate.split('-');

    if(startDate != '' && endDate != ''){
      if(SDate[0] > EDate[0]){
        setDateError("End Date should be later same or than start date")
        checker = false;

      }
      else if(SDate[0] < EDate[0]){
        setDateError("");
        checker = true;
      }
      else{
        if(SDate[1] < EDate[1]){
          setDateError("");
          checker = true;
        }
        else if(SDate[1] > EDate[1]){
          setDateError("End Date should be same or later than start date")
          checker = false;
        }
        else{
          if(SDate[2] > EDate[2]){
            setDateError("End Date should be same or later than start date")
            checker = false;
          }
          else{
            setDateError("");
            checker = true;

          }
        }

        
      }
    }
    else{
      setDateError("Please enter the start and end date")
      checker = false
    }
    if(cardName == ""){
      
      setCardNameError("Please enter the card holder's name")
      checker = false
    }
    else{
      setCardNameError("")
    }

    if(cardNumber == ""){
      
      setCardNumberError("Please enter your card number")
      checker = false
    }
    else{
      setCardNumberError("")
    }

    if(cardExpiryDate == ""){
      
      setCardExpiryDateError("Please enter the expiry date")
      checker = false
    }
    else{
      setCardExpiryDateError("")
    }

    if(cardCvc == ""){
      
      setCardCvcError("Please enter the CVC")
      checker = false
    }
    else{
      setCardCvcError("")
    }

    return checker

    
  }



 

  function reserve(){
    const isValid = validate();
    if (isValid){
      console.log("VALIDDD")
      

      var insurance = document.getElementById("insurance").value;
      console.log(insurance);
  
      Axios.post('http://localhost:3001/api/reserve', {
        reservationNumber:Math.floor(Math.random() * (500 - 1 + 1)) + 500,
        startDate: startDate, 
        endDate: endDate,
        regNo: state.car_regNo,
        user: auth.user,
        insurance: insurance,
        make: make,
        year: year,
        model: model,
        pickUp: pickUp
        }).then((response)=>{    
            // if (response.data == "Successful reservation"){
              alert(`Your reservation was successfull. Thank you!`);
              navigate('/renter-page') 
            // }
        });

    }
   
  }

  
  
  
  //   !customDates.includes(current.format('YYYY-MM-DD'));
  // }
  return (
    <body>
    <video class="Video" src={videoBG} autoPlay muted loop playsInline/>
    <Nav></Nav>
    <div class="HomePage">
    <div class="Page2">
    <div class="Welcome">
    <h1> Make Car Reservation </h1>
    </div>
    <br></br>
    <div class="Information">
    <div>Car Reservation for {year} {make} {model} </div>
    <br></br>
    <div> Start Date: </div>
    <div class="Calendar">
    <Calendar regNumber={state.car_regNo} sDate={"start"} availableStart={availableStartDate} availableEnd={availableEndDate} setDate={setStartDate} setEnd={setEndDate} setPrice={setPrice} cost={cost}></Calendar>
      </div>
      <br></br>
    <div> End Date: </div>
    <div class="Calendar">
      {startDate=="" ? <div style={{color:"white"}}>Please select start date.</div>:
      <div class="Calendar">
      <Calendar regNumber={state.car_regNo} sDate={startDate} availableStart={availableStartDate} availableEnd={availableEndDate} setDate={setEndDate} selectedStartDate={startDate} setPrice={setPrice} cost={cost}>  </Calendar>
      </div>
      }
    </div>
    <br></br>
    <div style={{color: "red"}}>{dateError}</div> 
    <div> Insurance: </div>
    <select class="Input" name="insurance" id="insurance">
    <option value="comprehensive">Comprehensive</option>
    <option value="third-party">Third-party</option>
    </select>
    <br></br>
    <br></br>
    <div> Payment Details: </div>
    <br></br>
    <div>Total Cost: ${price}</div>
    <br></br>
    <label for='cardName'>Card Holder Name</label>
    <input class="Input" type='text' id='cardName' onChange={(e)=>{setCardName(e.target.value)}}/>
    <div style={{color: "red"}}>{cardNameError}</div>
    <br></br>
    <label for='cardNo'>Card Number</label>
    <input class="Input" type='number' id='cardNo' onChange={(e)=>{setCardNumber(e.target.value)}}/>
    <div style={{color: "red"}}>{cardNumberError}</div>
    <br></br>
    <label for='expiryDate'>ExpiryDate</label>
    <input class="Input" type='date' id='expiryDate' onChange={(e)=>{setCardExpiryDate(e.target.value)}}/>
    <div style={{color: "red"}}>{cardExpiryDateError}</div>
    <br></br>
    <label for='cvc'>CVC</label>
    <input class="Input" type='text' id='cvc' onChange={(e)=>{setCardCvc(e.target.value)}}/>
    <div style={{color: "red"}}>{cardCvcError}</div>
    <br></br>

    <button onClick={reserve}> Reserve </button>
    </div>    
    </div>
    </div>  
    </body>
  );}



export default ReservationPage;

