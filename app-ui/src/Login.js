import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Link, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import API from './API_Interface/API_Interface';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import Logo from './Components/logo';

import { bgGradient } from './theme/css';

function Login({ setUser }) {
    // State variables to manage email, password, notice, and authentication status
    const [email, setEmail] = useState(''); // Email
    const [password, setPassword] = useState(''); // Password
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [notice, setNotice] = useState(false);

    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Handler for email input changes
    const handleEmailInputChange = (event) => {
        console.log(event.target)
        setEmail(event.target.value);
        setAuthFailed(false);

        // Check if 'Enter' key is pressed to trigger user verification
        if (event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {
        // Check if user verification is needed and if email and password are provided
        if (!verifyUser || email.length === 0 || password.length === 0) return;

        // Create an instance of the API
        const api = new API();

        // Async function to get user information from the API
        async function getUserInfo() {
            try {
                // Call the API to verify the user
                const userInfo = await api.getUserInfo(email, password);

                console.log(`API returns user info: ${JSON.stringify(userInfo)}`);

                // If authentication is successful, set the user and navigate to the home page
                if (userInfo.status === 'OK') {
                    setUser(userInfo.user);
                    navigate("/home");
                } else {
                    // If authentication fails, display an error message
                    console.log("Wrong username or password");
                    setNotice('Wrong user or password');
                    setVerifyUser(false);
                    setAuthFailed(true);
                }
            } catch (error) {
                // Handle API call errors
                console.error('Error in API call:', error);
                setNotice('An error occurred during authentication');
                setAuthFailed(true);
            }
        }

        // Call the async function to verify the user
        getUserInfo();

    }, [navigate, setUser, verifyUser, email, password]);

    // Handler for password input changes
    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
        setAuthFailed(false);

        // Check if 'Enter' key is pressed to trigger user verification
        if (event.key === "Enter") {
            setVerifyUser(true);
        }
    };

    // Handler for sign-in button click
    const handleSignIn = () => {
        // Check if email and password are provided, then trigger user verification
        if (email && password) {
            setVerifyUser(true);
        } else {
            // If email or password is missing, display an error
            setAuthFailed(true);
        }
    };

    // Handler for sign-up link click
    const handleSignUpClick = () => {
        navigate("/signUp");
    };

    // JSX structure for the login component
    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="email" label="Email address" />

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleSignIn}
            >
                Login
            </Button>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: './assets/background/overlay_4.jpg',
                }),
                height: 1,
                minHeight: '100vh',
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                        margin: 'auto', // Center the card horizontally
                        marginTop: '20vh',
                    }}
                >
                    <Typography variant="h4">Sign in to FoodTrace</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Don’t have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5 }}onClick={handleSignUpClick}>
                            Get started
                        </Link>
                    </Typography>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            OR
                        </Typography>
                    </Divider>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}

export default Login;
