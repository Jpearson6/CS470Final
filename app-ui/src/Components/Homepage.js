import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import {CircularProgressbar, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {Fragment, useEffect, useState} from "react";
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import * as PropTypes from "prop-types";
import API from "../API_Interface/API_Interface";


export default function Homepage(props) {
    const [macros, setMacros] = useState([]);
    const userId = props.userId;

    useEffect(() => {
        const api = new API();
        async function getMacros() {
            const macrosJSONString = await api.getMacros(userId);
            console.log(`macros from the DB ${JSON.stringify(macrosJSONString)}`);
            setMacros(macrosJSONString.data);
        }

        getMacros();
    }, []);

    console.log(macros);

    //harcoded calsConsumed and calGoal for testing
    let calsConsumed = 2100;
    let calGoal = 2200;
    let percentageComplete = (calsConsumed / calGoal) * 100;

    //hardcoded fatConsumed and fatGoal for testing
    let fatConsumed = 50;
    let fatGoal = 70;
    let fatPercentageComplete = (fatConsumed / fatGoal) * 100;

    //hardcoded carbConsumed and carbGoal for testing
    let carbConsumed = 200;
    let carbGoal = 250;
    let carbPercentageComplete = (carbConsumed / carbGoal) * 100;

    let proteinConsumed = 150;
    let proteinGoal = 200;
    let proteinPercentageComplete = (proteinConsumed / proteinGoal) * 100;



    return (
        <Fragment>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Typography fontSize="40px">
                    Daily Summary
                </Typography>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Button>
                    + Log a Meal
                </Button>
            </Box>
            <Grid container spacing={0} columns={16}>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center' >
                        <Typography fontSize="25px">
                            Calories:
                        </Typography>

                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={3}>

                        <CircularProgress size="15rem" variant="determinate" value={percentageComplete} />
                        <Typography fontSize="20px" position='absolute'>{calsConsumed} / {calGoal} kCal</Typography>
                    </Box>

                </Grid>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="25px">
                            Fat:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={3}>

                        <CircularProgress size="15rem" variant="determinate" value={fatPercentageComplete} color='error'/>
                        <Typography fontSize="20px" position='absolute'>{fatConsumed} / {fatGoal} g</Typography>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center' mt={5}>
                        <Typography fontSize="25px">
                            Carbohydrates:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={3}>

                        <CircularProgress size="15rem" variant="determinate" value={carbPercentageComplete} color='info'/>
                        <Typography fontSize="20px" position='absolute'>{carbConsumed} / {carbGoal} g</Typography>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center' mt={5}>
                        <Typography fontSize="25px">
                            Protein:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={3}>

                        <CircularProgress size="15rem" variant="determinate" value={proteinPercentageComplete} color='success'/>
                        <Typography fontSize="20px" position='absolute'>{proteinConsumed} / {proteinGoal} g</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )

}