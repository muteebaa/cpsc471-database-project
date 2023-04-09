import React from "react";
import '../components/Popup.css'
function DetailsPopup(props){
    function handleClose(){
        props.setTrigger2(false);
        props.setTrigger(false);   
    }
    return (props.trigger) ? (
        <div className="popup">
            <div className="inner">
                <button className="close" onClick={handleClose}>&#x2715;</button>
                {props.children}
            </div>

        </div>
    ) : "";
}

export default DetailsPopup 