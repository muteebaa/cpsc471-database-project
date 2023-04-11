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
    const min = props.availableStart;
    const max = props.availableEnd;
    const [date, setDate] = useState(new Date());
    const current = new Date();
    const date1 = `${current.getFullYear()}-${current.getMonth() + 1<10?`0${current.getMonth() + 1}`:`${current.getMonth() + 1}`}-${current.getDate()<10?`0${current.getDate()}`:`${current.getDate()-1}`}`;
    const date2 = `${current.getFullYear()}-${current.getMonth() + 1<10?`0${current.getMonth() + 1}`:`${current.getMonth() + 1}`}-${current.getDate()<10?`0${current.getDate()}`:`${current.getDate()}`}`;  
  

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
        if (date < s || date > e || date < new Date(date2)) {
            return false;
        }
        
        if (props.sDate == "start"){
                for (let i = 0; i < prevReservations.length; i++) {
                    const start = new Date(prevReservations[i].start_date);
                    const end = new Date(prevReservations[i].end_date);  
                    
                    if (date >= start  && date <= end) {
                        return false;
                    }
                } 
        
            return true;  
        }

        else{
            const nStart = new Date(props.sDate);
            if (date< nStart ) {
                return false;
            }
            
            for (let i = 0; i < prevReservations.length; i++) {
                const start = new Date(prevReservations[i].start_date);
                const end = new Date(prevReservations[i].end_date);
         
                if(date >= start && start > nStart){
                    return false;
                }
   
            }
            return true;
        }
          
        
    };

    const checkDate = (selected, check) => {
        for (let i = 0; i < prevReservations.length; i++) {
            const start = new Date(prevReservations[i].start_date);
            const end = new Date(prevReservations[i].end_date);
           
            if (new Date(selected) < start  && check > start) {   
                return false;
            }
            else{return true;}
        }     
        return true;
    };

    const handleDateChange = (date) => {
            if(props.sDate =="start"){
                props.setDate(date.toISOString().substring(0, 10));
            }
            else{
                var one = new Date(props.sDate)
                var two = new Date(date.toISOString().substring(0, 10))
                var days = ((two-one)/86400000)+1; 
                props.setPrice(days * props.cost)
                props.setDate(date.toISOString().substring(0, 10));
            }
    };

    getReservations()
 
    return (
        <div >
            <DatePicker
                onChange={handleDateChange}
                mode="range"
                timeFormat={false}
                isValidDate={disableDates}
                placeholder="Select date"
                className="test"
            />
        </div>
    ) ;
}

export default Calendar 