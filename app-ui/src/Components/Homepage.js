import {Fragment, useState} from "react";
import React from 'react';
import getDailyCalories from "./DailyCalorieGoal";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import API from "../API_Interface/API_Interface";

export default function Homepage(props) {
    const api = new API();
    const { userId, setSelectedItem } = props;

    const [calConsumed, setCalConsumed] = useState("");
    const [calGoal, setCalGoal] = useState("");
    const [fatConsumed, setFatConsumed] = useState("");
    const [fatGoal, setFatGoal] = useState("");
    const [carbGoal, setCarbGoal] = useState("");
    const [carbConsumed, setCarbConsumed] = useState("");
    const [proteinGoal, setProteinGoal] = useState("");
    const [proteinConsumed, setProteinConsumed] = useState("");

    const [fatPercentage, setFatPercentage] = useState("");
    const [carbPercentage, setCarbPercentage] = useState("");
    const [proteinPercentage, setProteinPercentage] = useState("");

    let percentageComplete = 0;
    let fatPercentageComplete = 0;
    let carbPercentageComplete = 0;
    let proteinPercentageComplete = 0;
    async function getUserInfo(){
        const calorieGoal = await getDailyCalories(userId);
        const macroGoal = (await api.getMacros(userId)).data;
        const calsConsumed = await api.todaysCaloriesByUser(userId);
        const carbsConsumed = await api.todaysCarbsByUser(userId);
        const fatConsumed = await api.todaysFatByUser(userId);
        const proteinConsumed = await api.todaysProteinByUser(userId);

        setCalConsumed(calsConsumed[0]['Calories']);
        setCalGoal(Math.round(calorieGoal));
        setFatConsumed(Math.round(fatConsumed[0]['Fat']));
        setCarbConsumed(Math.round(carbsConsumed[0]['Carbs']));
        setProteinConsumed(Math.round(proteinConsumed[0]['Protein']));

        setFatPercentage(macroGoal[0]['MacroFat']);
        setCarbPercentage(macroGoal[0]['MacroCarbs']);
        setProteinPercentage(macroGoal[0]['MacroProtein']);


        let fatGrams = (fatPercentage/100) * calorieGoal / 9;
        let carbGrams = (carbPercentage/100) * calorieGoal / 4;
        let proteinGrams = (proteinPercentage/100) * calorieGoal / 4;
        setFatGoal(Math.round(fatGrams));
        setCarbGoal(Math.round(carbGrams));
        setProteinGoal(Math.round(proteinGrams));
    }
    getUserInfo();


    let calColor = 'primary';
    let fatColor= 'error';
    let carbColor = 'info';
    let proteinColor= 'success';
    //percentage complete for circular progress
    percentageComplete = (calConsumed / calGoal) * 100;
    if(percentageComplete > 100) {
        percentageComplete = 100;
    }

    fatPercentageComplete = (fatConsumed / fatGoal) * 100;
    if(fatPercentageComplete > 100) {
        fatPercentageComplete = 100;
    }

    carbPercentageComplete = (carbConsumed / carbGoal) * 100;
    if(carbPercentageComplete > 100) {
        carbPercentageComplete = 100;
    }

    proteinPercentageComplete = (proteinConsumed / proteinGoal) * 100;
    if(proteinPercentageComplete > 100) {
        proteinPercentageComplete = 100;
    }


    return (
        proteinGoal > 0 &&carbGoal > 0 && fatGoal > 0 && calGoal > 0 &&
            <Fragment>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Typography fontSize="40px">
                    Daily Summary
                </Typography>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' >
                <Button onClick={() => {
                    setSelectedItem("Add Meal");
                    console.log("here");
                }}>
                    + Log a Meal
                </Button>
            </Box>
            <Grid container spacing={0} columns={16}>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="25px">
                            Calories:
                        </Typography>

                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={3}>

                        <CircularProgress size="15rem" variant="determinate" value={percentageComplete} color={calColor}/>
                        <Typography fontSize="20px" position='absolute'>{calConsumed} / {calGoal} kCal</Typography>
                    </Box>

                </Grid>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="25px">
                            Fat:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={3}>

                        <CircularProgress size="15rem" variant="determinate" value={fatPercentageComplete} color={fatColor}/>
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

                        <CircularProgress size="15rem" variant="determinate" value={carbPercentageComplete} color={carbColor}/>
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

                        <CircularProgress size="15rem" variant="determinate" value={proteinPercentageComplete} color={proteinColor}/>
                        <Typography fontSize="20px" position='absolute'>{proteinConsumed} / {proteinGoal} g</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Fragment> 
        
    )

}