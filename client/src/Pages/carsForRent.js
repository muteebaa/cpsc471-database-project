import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';


function CarsForRent() {
  
  const [data, setData] = useState([])

  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [type, setTypeFilter] = useState("All");
  const [make, setMakeFilter] = useState("All");
  const [colour, setColourFilter] = useState("All");
  const [minYearFilter, setMinYearFilter] = useState("");
  const [maxYearFilter, setMaxYearFilter] = useState("");
  const [noResult, setNoResult] = useState("No Result");


  const minPrice = (value) => parseInt(value.price) >= minPriceFilter; 
  const maxPrice = (value) => parseInt(value.price) <= maxPriceFilter; 
  const minYear = (value) => parseInt(value.year) >= minYearFilter; 
  const maxYear = (value) => parseInt(value.year) <= maxYearFilter;
  const carType = (value) => value.type === type; 
  const carMake = (value) => value.make === make; 
  const carColour = (value) => value.colour === colour; 
  
    
   

  const info = async () => {
    

    Axios.post("http://localhost:3001/api/Cars", {
    
  }).then((response) => {
    let tempData = response.data
    //setData(response.data)
    for(const car of response.data){
      

      if(minPriceFilter !== ""){
        tempData = tempData.filter(minPrice)
      }
      

      if(maxPriceFilter !== ""){
        tempData = tempData.filter(maxPrice)
        
      }
      

      if(type !== "All"){
        tempData = tempData.filter(carType)
        
      }

      if(make !== "All"){
        tempData = tempData.filter(carMake)
        
      }

      if(colour !== "All"){
        tempData = tempData.filter(carColour)
        
      }

      if(minYearFilter !== ""){
        tempData = tempData.filter(minYear)
      }
      

      if(maxYearFilter !== ""){
        tempData = tempData.filter(maxYear)
      }
       
      
      
    }
    

    if(data == ""){
      setNoResult("No Result")
    }
    else{
      setNoResult("")
    }
    setData(tempData)
    
  })}
  useEffect(() => {
    

    info()
    
  })

  const MoreInfo = () => {
    {info()}
  }
  


  return (
      // <Router> 
      <><div>
      
    </div>
      
        <h1> RentMyRide </h1>
        <div>
          Filters
        
          <div className="MinimumPrice">
            Minimum Price: <input type="number" placeholder="Minimum price" name="priceFilter"  onChange={(e)=>{setMinPriceFilter(e.target.value)}} />
          </div>
          <div className="MaximumPrice">
            Maximum Price: <input type="number" placeholder="Maximum price" name="priceFilter"  onChange={(e)=>{setMaxPriceFilter(e.target.value)}} />
          </div>
          <div className="Make">
            Make: <select name="make" placeholder="make"  onChange={(e)=>{setMakeFilter(e.target.value)}}>
                <option value="All">All</option>
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
            </div>
            <div className="Color">
              Colour: <select name="color" placeholder="color"  onChange={(e)=>{setColourFilter(e.target.value)}}>
                <option value="All">All</option>
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
            </div>
          <div className="MinimumYear">
            Minimum Year: <input type="number" placeholder="Minimum year" name="priceFilter"  onChange={(e)=>{setMinYearFilter(e.target.value)}} />
          </div>
          <div className="MaximumYear">
            Maximum Year: <input type="number" placeholder="Maximum year" name="priceFilter"  onChange={(e)=>{setMaxYearFilter(e.target.value)}} />
          </div>
          <div className="Type">
            Type: <select name="type" placeholder="type"  onChange={(e)=>{setTypeFilter(e.target.value)}}>
              <option value="All">All</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        

        <div className="NoResult">
          {noResult}
        </div>
        



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

