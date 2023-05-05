import MainDrawer from "./Menu/MainDrawer.js";
import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Macros from "./Components/Macros";
import WeightGoals from "./Components/WeightGoals";
import React, { useState, Fragment } from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<MainDrawer {...user} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home/weightGoals" element={<WeightGoals />} />
        <Route path="/nutritionGoals" element={<Macros />} />
      </Routes>
    </LocalizationProvider>
  );
}
export default App;
