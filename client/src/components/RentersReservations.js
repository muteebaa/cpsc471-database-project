import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
// import DatePicker from 'react-datepicker';
import DatePicker from 'react-datetime';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import '../components/ReservationsCalendar.css'
import DetailsPopup from "./DetailsPopup";
function RentersReservations(props){
    const [prevReservations,setPrevReservations] = useState([]);
    const min = props.availableStart;
    const max = props.availableEnd;
    const [date, setDate] = useState(new Date());
    const [reservations, setReservations] = useState([])
    const [details, setDetails] = useState([])
    const [resPopup, setResPopup] = useState(false);
    const [noReservation, setNoReservation] = useState(false);
    const getReservations = () =>{
        Axios.post("http://localhost:3001/api/renterHistory", {
            username: props.user
            }).then((response) => {
                setReservations(response.data);
                console.log(response.data);
            }
        );
    }
   
    const disableDates = date => {      
        for (let i = 0; i < reservations.length; i++) {
          const start = new Date(reservations[i].start_date);
          const end = new Date(reservations[i].end_date);
          
          if (date >= start  && date <= end) {
              return false;
          }
          
        } 
        return true; 
    }  

    const displayDetails = (date) =>{
        Axios.post("http://localhost:3001/api/reservationDetails", {
            user: props.user,
            date: date.toISOString().substring(0, 10)
            }).then((response) => {
                console.log(response.data.length)
                if (response.data.length==0){setNoReservation(true)}
                else { setDetails(response.data); }
                setResPopup(true);
            }
        );
    
    }

    const [startDate, setStartDate] = useState(new Date());
    var colors = ['#ff0000', '#00ff00', '#0000ff'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    getReservations()
 
    return (
        <div >
            <DatePicker
                onChange={displayDetails}
                timeFormat={false}
                // isValidDate={disableDates}
                placeholder="Select date"
            />
            <DetailsPopup trigger={resPopup} setTrigger={setResPopup} setTrigger2={setNoReservation}>
                {noReservation ? <div> No reservations on this day.</div> :
                    <div>
                    {details.map( (getR)=>(
                    
                    <div className="reservationInfo">
                    <div> Reservation Details </div>
                    
                    <div> Cars Registration Number: {getR.reg_number} </div>
                    <div> Reservation Number: {getR.reservationNumber} </div>
                    <div> Start date: {getR.start_date.substring(0, 10)} </div>
                    <div> End date: {getR.end_date.substring(0, 10)} </div> 

                    <br></br>                
                    </div>
                    
                    
                    ))}
                    </div>
                }
            </DetailsPopup>
         
            
            {/* <DatePicker selected={startDate}  />                      */}
        </div>
    ) ;
}

export default RentersReservations;