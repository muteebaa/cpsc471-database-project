import React, {useState, useEffect} from "react"; 
//import './App.css';
import Axios from 'axios';
import {Outlet, Navigate, useParams, Link} from 'react-router-dom';
import { useAuth } from "./auth";


export const RequireAuth = ({children}) => {
  const auth = useAuth()

  console.log(auth.user)
  if (!auth.user) {
    return <Navigate to='/loaner-login' />
  }

  return children
}

// const useAuth = () => {
//   const user = {loggedIn: false}
//     // Axios.post('http://localhost:3001/api/Login', {
//     //   username: username, 
//     //   pw: pw
//     // }).then(()=>{
//     //     navigate('/loaner-page/{username}')
//     //   alert('success!');
//     // });
//   // Axios.get('http://localhost:3001/api/Login').then((response)=>{
//   //       if(response.data){
//   //         console.log(response.data)
//   //        //isAuth = true;
//   //        user = {loggedIn: true}
//   //        return user && user.loggedIn;
//   //      //     var test = '/loaner-page';
//   //     //      console.log(test)

//   //     //  navigate(test)
//   //       }
//   //       else {
//   //         console.log('fail')
//   //         return user && user.loggedIn;
//   //       }
//   //   });
// }


// function ProtectedRoutes() {
  
//  const isAuth = useAuth();
//  // let auth = {'token': false}

//  console.log('ok we here');

//  console.log('ok um');
 
 
// //   var navigate = useNavigate();
// // isAuth = Authenticate();
// // if(isAuth){
// // var test = '/loaner-page';
// //   console.log(test)
// //   navigate(test)
// //   console.log("okkk")
// // }

// //else { return  < Navigate to ='/loaner-login'/>}
  
//  return (
//   <div className="App">  
//       <h1> Loaner ummm Page </h1>
  
//     </div>
//     // console.log('ok we here');
//  // isAuth ? <Outlet/> : <Navigate to='/loaner-login'/>
    
    
//   // < Route 
//   //   {...rest} 
//   //   render={(props) => {
//   //       if (isAuth) { return < Component /> }
//   //       else { return  < Navigate to = {{pathname: '/', state: {from: props.location} }} />; }
//   //   }}
//   // />
//   );
// }

// export default ProtectedRoutes;
