import React, {useState, useEffect} from "react"; 
import './App.css';
import Axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoanerLogin from './Pages/LoanerLogin'
import RenterLogin from './Pages/RenterLogin'
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import LoanerPage from "./Pages/LoanerPage";
import RenterPage from "./Pages/RenterPage";
import RegPage from "./Pages/RegPage";
import CarsForRent from "./Pages/CarsForRent";
import CarDetails from "./Pages/CarDetails";
import { RequireAuth} from "./Pages/RequireAuth";
import { AuthProvider } from "./Pages/auth";
import Navbar from "./Pages/NavBar";
import Reservation from "./Pages/ReservationPage";
import ReservationPage from "./Pages/ReservationPage";
import AddCarPage from "./Pages/AddCarPage";
import LoanersListingsPage from "./Pages/LoanersListingsPage";
import EditSpecificCarPage from "./Pages/EditSpecificCarPage";

function App() {
  const [username, setUsername] = useState("");
  const [pw, setPW] = useState("");

  // const loginFunc = () => {
  // //  alert('called');
  //   Axios.post('http://localhost:3001/api/Login', {
  //     username: username, 
  //     pw: pw
  //   }).then(()=>{
  //  //   alert('success!');
  //   });

  // };

  return (
    <AuthProvider>

    <Router> 
    
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/loaner-login' element={< LoanerLogin />} />
        <Route path='/renter-login' element={< RenterLogin />} />
        <Route path='/registration' element={< RegPage />} />
        <Route path='/CarsForRent' element={ < CarsForRent /> } />
        <Route path='/CarDetails/:id' element={< CarDetails /> } />



        <Route path='*' element={< ErrorPage />} />

        {/* protected routes */}
        {/* <Route element={<ProtectedRoute  />}> */}
          <Route path='/add-car' element={<RequireAuth> < AddCarPage /> </RequireAuth> } exact/>
          <Route path='/loaner-page' element={<RequireAuth> < LoanerPage /> </RequireAuth> } exact/>
          <Route path='/renter-page' element={<RequireAuth> < RenterPage /> </RequireAuth> } exact/>
          <Route path='/listings' element={<RequireAuth> < LoanersListingsPage /></RequireAuth> } exact/>
          <Route path='/editYourCar/:id' element={<RequireAuth>< EditSpecificCarPage /></RequireAuth>} exact/>
          <Route path='/reservation' element={<RequireAuth>< ReservationPage /></RequireAuth>} exact/>
    
          {/* <Route path='/reservation' element={<RequireAuth> < ReservationPage /> </RequireAuth> } exact/>
          <Route path='/CarsForRent' element={<RequireAuth> < CarsForRent /> </RequireAuth>} exact/>
          <Route path='/CarDetails/:id' element={<RequireAuth> < CarDetails /> </RequireAuth>} exact/> */}

        {/* </Route> */}
       
      </Routes>
      {/* <ProtectedRoute/> */}
    </Router>
    </AuthProvider>
 
    
    // <div className="App">  
    // <h1> RentMyRide </h1>

    //     <div className="login">
    //     <div> Username </div>
    //     <input 
    //       type="text" 
    //       name="user"
    //       onChange={
    //         (e) => {setUsername(e.target.value);
    //       }}
    //     />

    //     <div> Password </div>
    //     <input 
    //       type="text" 
    //       name="pw"
    //       onChange={
    //         (e) => {setPW(e.target.value);
    //       }}  
    //     />
        
    //     <div> <button onClick={loginFunc}> Login </button> </div>
    
    //   </div> 
   
      

    // </div>
  );
}

export default App;
