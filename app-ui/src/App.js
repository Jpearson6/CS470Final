import MainDrawer from "./Menu/MainDrawer.js";
import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import SignUpPage2 from "./SignUpPage2";
import React, { useState, Fragment } from "react";
import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";


function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "Login":
        if (action.user)
          return {
            ...state,
            user: action.user,
          };
        return state;
      default:
        return state;
    }
  };

  const initState = null;
  const [state, dispatch] = useReducer(reducer, initState);

  const setUser = (user) => {
    dispatch({ type: "Login", user: user });
  };
  console.log(state)

  return (
    <Routes>
      <Route path="/" element={<Login setUser={(user) => setUser(user)} />} />
      <Route path="/home" element={<MainDrawer user = {state?.user}/>} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signUp/signUpPage2" element={<SignUpPage2 />} />
    </Routes>
  );
}
export default App;
