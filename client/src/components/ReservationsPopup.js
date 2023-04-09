import React, {useState, useEffect, useRef} from "react"; 
import Axios from 'axios';
import '../components/Popup.css'
import RenterContact from "./RenterContact";
function ReservationsPopup(props){
   
    return (props.trigger) ? (
        <div className="popup">
            <div className="inner">
                <button className="close" onClick={()=>props.setTrigger(false)}>close</button>
                {props.children}
                
                {props.reservations.map( (getR)=>(
                  
                  <div className="reservationInfo">
                   <div> Renter: {  getR.user  } </div> 
                   {console.log(getR.start_date)}
                   <div> Start date: {getR.start_date.substring(0, 10)} </div>
                   <div> End date: {getR.end_date.substring(0, 10)} </div>


                   <RenterContact user={getR.user}> </RenterContact>
                
                   {/* <div> Contact: {renterName} </div>
                   <div> Phone: {renterPhone} </div>
                   <div> Email: {renterEmail} </div> */}

                   <br></br>
                  
                 </div>))
                 } 
            </div>

        </div>
    ) : "";
}

export default ReservationsPopup 