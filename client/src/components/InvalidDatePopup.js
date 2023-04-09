import React from "react";
import '../components/Popup.css'
function InvalidDatePopup(props){
    return (props.trigger) ? (
        <div className="popup errorPopup">
            <div className="inner error">
                <button className="close" onClick={()=>props.setTrigger(false)}>&#x2715;</button>
                {props.children}
            </div>

        </div>
    ) : "";
}

export default InvalidDatePopup 