import "../styles/Navbar.css"
import React, {useState, useEffect} from "react"; 
import { useAuth } from "./auth";
import {BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams} from 'react-router-dom';




export default function Navbar(){
    var navigate = useNavigate();
    const auth = useAuth();

    function Pages(link){
        
        navigate(link)
    }



    return <nav class="navbar">
        
        
        <a href="/" class="Title">Home</a>
        <ul>
            <br></br>
            <li>
            {
                    (() => {
                        if(auth.user) {
                            
                            
                        }
                        else{
                            return(
                                <a href="/loaner-login">Loaner Login</a>
                            )
                        }
                    })()  
                }
                
            </li>
            <li>
            {
                    (() => {
                        if(auth.user) {
                            
                            
                        }
                        else{
                            return(
                                <a href="/renter-login">Renter Login</a>
                            )
                        }
                    })()  
                }
                
            </li>
            
            <li>
                {
                    (() => {
                        if(auth.user) {
                            return(
                                <a href="/">Logout</a> 
                            )
                            
                        }
                    })()  
                } 
            </li>
            
        </ul>
    </nav>
    
}