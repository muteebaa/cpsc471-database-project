import React from "react";
import '../components/Popup.css'
function ReservationsPopup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="inner">
                <button className="close" onClick={()=>props.setTrigger(false)}>close</button>
                {props.children}
            </div>

        </div>
    ) : "";
}

export default ReservationsPopup 