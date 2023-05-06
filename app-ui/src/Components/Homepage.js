import { CircularProgress, Typography } from "@mui/material";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Fragment } from "react";
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import getDailyCalories from "./DailyCalorieGoal";
import API from '../API_Interface/API_Interface';



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
        <div className="App">
            <Carousel autoPlay={false} animation="slide" navButtonsAlwaysVisible={true}>
                <div>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="50px">
                            Daily Summary:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>

                        <CircularProgress size="30rem" variant="determinate" value={percentageComplete} />
                        <Typography fontSize="35px" position='absolute'>{2100} / {calGoal} Calories</Typography>
                    </Box>
                </div>
                <div>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="50px">
                            Fat:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>

                        <CircularProgress size="30rem" variant="determinate" value={fatPercentageComplete} color='error' />
                        <Typography fontSize="35px" position='absolute'>{fatConsumed} / {fatGoal} Grams</Typography>
                    </Box>
                </div>
                <div>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="50px">
                            Carbohydrates:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>

                        <CircularProgress size="30rem" variant="determinate" value={carbPercentageComplete} color='info' />
                        <Typography fontSize="35px" position='absolute'>{carbConsumed} / {carbGoal} Grams</Typography>
                    </Box>
                </div>
                <div>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="50px">
                            Protein:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>

                        <CircularProgress size="30rem" variant="determinate" value={proteinPercentageComplete} color='info' />
                        <Typography fontSize="35px" position='absolute'>{proteinConsumed} / {proteinGoal} Grams</Typography>
                    </Box>
                </div>
            </Carousel>
        </div>
    )


}