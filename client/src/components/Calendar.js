import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
// import DatePicker from 'react-datepicker';
import DatePicker from 'react-datetime';
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import '../components/Calendar.css'
import InvalidDatePopup from "./InvalidDatePopup";
function Calendar(props){
    const [prevReservations,setPrevReservations] = useState([]);
    const [date, setDate] = useState(new Date());
    const [popup, setPopup] = useState(false);

    const getReservations = () =>{
        Axios.post('http://localhost:3001/api/unavailableDates', {
        regNo:  props.regNumber
        }).then((response)=>{    
            setPrevReservations(response.data)
        });    
    }
    const disableDates = date => {
        const s = new Date(props.availableStart);
        const e = new Date(props.availableEnd);
        if (date < s || date > e) {
            return false;
        }
        
        for (let i = 0; i < prevReservations.length; i++) {
            const start = new Date(prevReservations[i].start_date);
            const end = new Date(prevReservations[i].end_date);
            if (date >= start  && date <= end) {
                return false;
            }
        }     
        return true;
    };

    const checkDate = (selected, check) => {
        for (let i = 0; i < prevReservations.length; i++) {
            const start = new Date(prevReservations[i].start_date);
            const end = new Date(prevReservations[i].end_date);
            console.log(start)
            if (new Date(selected) < start  && check > start) {
                console.log("we in here")     
                return false;
            }
            else{return true;}
        }     
    }
    const handleDateChange = (date) => {
        console.log(props.selectedStartDate);
        if(checkDate(props.selectedStartDate, date) || props.selectedStartDate =='null'){
            setPopup(false);
            props.setDate(date.toISOString().substring(0, 10));
        }
        else{
            setPopup(true);
        }

    }
    const [startDate, setStartDate] = useState(new Date());
    getReservations()
    return (
        <div >
            <DatePicker
                onChange={handleDateChange}
                // mode="range"
                timeFormat={false}
                isValidDate={disableDates}
                placeholder="Select date"
            />
            <InvalidDatePopup trigger={popup} setTrigger={setPopup}>
                Your date range is invalid.
            </InvalidDatePopup>
            
            {/* <DatePicker selected={startDate}  />                      */}
        </div>
    ) ;
}

export default Calendar 