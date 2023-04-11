import MainDrawer from "./Menu/MainDrawer.js";
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import SignUpPage2 from './SignUpPage2';
import React from 'react';
import './index.css';
import { Routes, Route } from "react-router-dom";


function App() {

  return (

      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<MainDrawer/>}/>
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signUp/signUpPage2" element ={<SignUpPage2/>}/>
      </Routes>
  )
}
export default App;
