import MainDrawer from "./Menu/MainDrawer.js";
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import SignUpPage2 from './SignUpPage2';
import React, { useState, Fragment } from 'react';
import './index.css';
import { Routes, Route } from "react-router-dom";


function App() {
    const [user, setUser] = useState(undefined);
  return (

      <Routes>
            <Route path="/" element={ <Login user={user} setUser={setUser} />} />     
          <Route path="/home" element={<MainDrawer/>}/>
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signUp/signUpPage2" element ={<SignUpPage2/>}/>
      </Routes>
  )
}
export default App;
