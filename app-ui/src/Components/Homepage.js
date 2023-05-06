import { CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react";
import React from 'react';
import getDailyCalories from "./DailyCalorieGoal";
import API from '../API_Interface/API_Interface';
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Fragment, useEffect, useState} from "react";
import React from 'react';
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

export default function Homepage(props) {
    const api = new API();
    const { userId } = props;
    let percentageComplete = 0;
    //harcoded calsConsumed and calGoal for testing
    async function getUserInfo(){
        const calorieGoal = await getDailyCalories(userId);
        const macroGoal = await api.getMacros(userId);
        const calsConsumed = await api.todaysCaloriesByUser(userId);
        const carbsConsumed = await api.todaysCarbsByUser(userId);
        const fatConsumed = await api.todaysFatByUser(userId);
        const proteinConsumed = await api.todaysProteinByUser(userId);
        console.log(macroGoal.data);
        console.log(calsConsumed);
        console.log(calorieGoal);
        console.log(carbsConsumed);
        console.log(fatConsumed);
        console.log(proteinConsumed);
    }
    getUserInfo();
    
    let calGoal = 2200;
    percentageComplete = (2100 / calGoal) * 100;

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