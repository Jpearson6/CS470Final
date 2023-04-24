import React, {useState, useEffect, Fragment} from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {createTheme, Link, Typography} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import SignUp from './SignUp';
import MainDrawer from "./Menu/MainDrawer";


export default function Login({setUser}) {
    const [userInput, setUserInput] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);

    const handleEmailInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserInput(event.target.value);
        setAuthFailed(false);
    };

    const handlePasswordInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserInput2(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const navigate = useNavigate();

    function handleClick(){
        navigate("/home")
    };

    function handleSignUpClick(){
        navigate("/signUp")
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#EC5800',
            },
            secondary: {
                main: '#EC5800',
            },
        },
    });


    return (
        <Fragment>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

               <Typography variant="h3" sx={{ fontFamily: 'Monospace' }}>
                   FoodTrace
               </Typography>
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Email Address"
                    placeholder=""
                    value={userInput}
                    onChange={handleEmailInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={1}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Password"
                    placeholder=""
                    value={userInput2}
                    onChange={handlePasswordInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={(e) => handleClick()}
                >Sign In</Button>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <p>
                Don't have an account?{" "}
                    <span className='link' onClick={(e) => handleSignUpClick()}>
                        Sign up
                    </span>
                </p>

            </Box>

        </Fragment>

    );
}