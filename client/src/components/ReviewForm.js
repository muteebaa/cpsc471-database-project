import React from "react";

function ReviewForm(props){

    function setValues(){
        props.loc(document.getElementById("location").value)
        props.comment(document.getElementById("written").value)
        props.cond(document.getElementById("condition").value)
    }
    
    return (
        <div >
            <div class="comment">
                <div className="commenter"> 
                <h2> Leave a Review </h2> </div>
            <div className="commentInfo">
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
                
                <div style={{textAlign:'right', marginRight:'2%'}}>
                   
                    <button 
                        style={{maxWidth:"max-content", textAlign:'center'}} 
                        onClick={()=>
                            {setValues();
                            props.sub(true);}
                            
                        }
                        >
                        submit
                        </button>
                  
                </div>
               
                
                
                </div>
            </div>

        </div>
    ) ;
}

export default ReviewForm 