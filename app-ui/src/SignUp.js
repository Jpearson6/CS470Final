import React, {useState, useEffect, Fragment} from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function SignUp() {
    const [userInput, setUserInput] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [userInput3, setUserInput3] = useState('');
    const [userInput4, setUserInput4] = useState('');
    const [userInput5, setUserInput5] = useState('');
    const [userInput6, setUserInput6] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);

    const handleFirstNameInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handleLastNameInputChange = event => {
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

    const handleUsernameInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserInput3(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handleEmailInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserInput4(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handlePasswordInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserInput5(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const handleRepeatPasswordInputChange = event => {
        console.log("handleInputChange called.");

        // event.stopPropagation();
        // event.preventDefault();

        setUserInput6(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    const navigate = useNavigate();
    function handleClick() {
        navigate("/signUp/signUpPage2");
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

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="First Name"
                    placeholder=""
                    value={userInput}
                    onChange={handleFirstNameInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Last Name"
                    placeholder=""
                    value={userInput2}
                    onChange={handleLastNameInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Username"
                    placeholder=""
                    value={userInput3}
                    onChange={handleUsernameInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Email Address"
                    placeholder=""
                    value={userInput4}
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
                    value={userInput5}
                    onChange={handlePasswordInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={1}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Confirm Password"
                    placeholder=""
                    value={userInput6}
                    onChange={handleRepeatPasswordInputChange}
                    style = {{width: 300}}
                />
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={(e) => handleClick()}
                >Next</Button>
            </Box>

        </Fragment>

    );
}