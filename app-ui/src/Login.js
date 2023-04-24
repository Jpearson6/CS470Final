import React, {useState, useEffect, Fragment} from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {Link, Typography} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import API from './API_Interface/API_Interface'


import SignUp from './SignUp';
import MainDrawer from "./Menu/MainDrawer";


function Login({setUser}) {
    const [userInput, setUserInput] = useState(''); //Email
    const [userInput2, setUserInput2] = useState(''); //Password
    const [noitice, setNotice] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);

    const handleEmailInputChange = event => {
        setUserInput(event.target.value);
        setAuthFailed(false);
        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(()=>{
        if (!verifyUser || userInput.length === 0 || userInput2.length === 0) return
        const api = new API();
        async function getUserInfo(){
            api.getUserInfo(userInput,userInput2)
                .then(userInfo => {
                    console.log(`api returns user info: ${JSON.stringify(userInfo)}`)
                    const user = userInfo.user;
                    if(userInfo.status === 'OK'){
                        navigate("/home");
                        setUser(user);
                    }else {
                        console.log("Wrong username or password")
                        setNotice('Wrong user or password')
                        setVerifyUser(false)
                        setAuthFailed(true)
                    }
                })
        }
        getUserInfo()
    
    },[verifyUser,setUser,userInput,userInput2])
    

    const handlePasswordInputChange = event => {
        
        setUserInput2(event.target.value);
        setAuthFailed(false);

        if (event.key === "Enter") {
            setVerifyUser(true);
        }
    };

    const navigate = useNavigate();

    function handleClick() {
        if (userInput && userInput2) {
            setVerifyUser(true);
        } else {
            setAuthFailed(true);
        }
        
    };

    function handleSignUpClick() {
        navigate("/signUp");
    };

    return (
        <Fragment>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>
               <Typography variant="h3" sx={{ fontFamily: 'Monospace' }}>
                   FoodTrace
               </Typography>
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <Typography variant="h5" sx={{ fontFamily: 'Monospace' }}>
                    {noitice}
                </Typography>

            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Email Address"
                    placeholder=""
                    value={userInput}
                    onChange={handleEmailInputChange}
                    style={{ width: 300 }}
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
                    style={{ width: 300 }}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <Button
                    variant="contained"
                    size="medium"
                    onClick= {handleClick}
                >
                    Sign In
                </Button>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={handleSignUpClick}>
                        Sign up
                    </span>
                </p>
            </Box>
        </Fragment>
    );
}


export default Login;