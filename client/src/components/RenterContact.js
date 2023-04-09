import React, {useState, useEffect, useRef} from "react"; 
import Axios from 'axios';
import '../components/Popup.css'
function RenterContact(props){
    const [renterName, setRenterName] = useState("");
    const [renterPhone, setRenterPhone] = useState("");
    const [renterEmail, setRenterEmail] = useState("");
    function getContact(user) {
      
        Axios.post("http://localhost:3001/api/UserInfo", {
          username: user
      }).then((response) => {
        
        setRenterName(response.data[0].FirstName);
        setRenterPhone(response.data[0].PhoneNumber);
        setRenterEmail(response.data[0].EmailAddress);
      }) 
    
    } 
    getContact(props.user)
    return  (
      <div>
        <div> Contact: {renterName} </div>
        <div> Phone: {renterPhone} </div>
        <div> Email: {renterEmail} </div>
      </div>             
    ) }

export default RenterContact 