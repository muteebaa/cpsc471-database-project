import React from "react";

function ReviewForm(props){

    function setValues(){
        props.loc(document.getElementById("location").value)
        props.comment(document.getElementById("written").value)
        props.cond(document.getElementById("condition").value)
    }
    
    return (
        <div >
            <div style={{display: "flex", flexDirection:"column", gap:"10px", padding:"10% 10%"}}>
                <div>
                    <label for="location">Location Rating</label>
                    <input type="range" min='0' max='100' id='location' />
                </div>
                <div>
                    <label for="condition">Condition Rating</label>
                    <input type="range" min='0' max='100' id='condition'/>
                </div>
                <div>
                    <label for="written">Written Comments</label>
                    <input type="textarea" id='written'/>
                </div>
               <button 
                style={{maxWidth:"50px"}} 
                onClick={()=>
                    {setValues();
                    props.sub(true);}
                    
                }
                >
                submit
                </button>
            </div>

        </div>
    ) ;
}

export default ReviewForm 