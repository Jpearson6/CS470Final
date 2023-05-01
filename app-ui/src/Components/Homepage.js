import {CircularProgress, Typography} from "@mui/material";
import {CircularProgressbar, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {Fragment} from "react";
import React from 'react';
import Carousel from 'react-material-ui-carousel';



export default function Homepage() {
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
        <div class="App">
            <Carousel autoPlay={false} animation="slide" navButtonsAlwaysVisible={true}>
                <div>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="50px">
                            Daily Summary:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>

                        <CircularProgress size="30rem" variant="determinate" value={percentageComplete} />
                        <Typography fontSize="35px" position='absolute'>{calsConsumed} / {calGoal} Calories</Typography>
                    </Box>
                </div>
                <div>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography fontSize="50px">
                            Fat:
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>

                        <CircularProgress size="30rem" variant="determinate" value={fatPercentageComplete} color='error'/>
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

                        <CircularProgress size="30rem" variant="determinate" value={carbPercentageComplete} color='info'/>
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

                        <CircularProgress size="30rem" variant="determinate" value={proteinPercentageComplete} color='info'/>
                        <Typography fontSize="35px" position='absolute'>{proteinConsumed} / {proteinGoal} Grams</Typography>
                    </Box>
                </div>
            </Carousel>
        </div>
    )


}