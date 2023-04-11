import React, {useState, useEffect, Fragment} from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {InputAdornment} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    InputLabel,
    Link, MenuItem, Radio,
    RadioGroup,
    Select,
    Stack,
    Typography
} from "@mui/material";


export default function SignUpPage2() {
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
        navigate("/home");
    };


    return (
        <Fragment>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

                <Typography variant="h3" sx={{ fontFamily: 'Monospace' }}>
                    FoodTrace
                </Typography>
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>

                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Age"
                        multiline
                        placeholder=""
                        maxRows={3}
                        style={{width:200}}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Height"
                        placeholder=""
                        multiline
                        style={{width:200}}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Weight"
                        placeholder=""
                        multiline
                        style={{width:200}}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                        }}
                    />
                </div>
                <Divider/>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <Stack direction="row" spacing={2}>

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Divider/>
                    <Stack spacing={2}>

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Activity Level</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Activity Level"
                                style = {{width: 300}}
                            >
                                <MenuItem value="sedentary">Sedentary</MenuItem>
                                <MenuItem value="lightly active">Lightly Active</MenuItem>
                                <MenuItem value="moderately active">Moderately Active</MenuItem>
                                <MenuItem value="very active">Very Active</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Weight Goal</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Weight Goal"
                                style = {{width: 300}}
                            >
                                <MenuItem value="sedentary">Weight Loss</MenuItem>
                                <MenuItem value="lightly active">Maintain Weight</MenuItem>
                                <MenuItem value="moderately active">Weight Gain</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            </Box>


            <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={(e) => handleClick()}
                >Finish Signing Up</Button>
            </Box>

        </Fragment>

    );
}