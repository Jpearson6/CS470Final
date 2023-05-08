import {Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import React, {Fragment, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import API from '../API_Interface/API_Interface'
import {SelectChangeEvent} from "@mui/material/Select";


export default function WeightGoals (props) {
    const updateDisplayCallBack = props.updateDisplayCallBack;
    const userId = props.userId;

    const [userData, setUserData] = useState([]);
    const [currWeight, setCurrWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState("");
    const [weeklyGoal, setWeeklyGoal] = useState("");
    const [activityLevel, setActivityLevel] = useState("");

    useEffect(() => {
        const api = new API();
        async function getUserInfo() {
            const allData = (await api.getUserById(userId)).data;
            console.log("hey");
            console.log(allData[0]);
            setUserData(allData);

            setCurrWeight(allData[0]['Weight']);
            setGoalWeight(allData[0]['GoalWeight']);
            setActivityLevel(allData[0]['ActivityLevel']);
            setWeeklyGoal(allData[0]['LbsPerWeek']);

        }

        getUserInfo();
    }, []);

    const handleCurrWeightChange = event => {
        setCurrWeight(event.target.value);
    };

    const handleGoalWeightChange = event => {
        setGoalWeight(event.target.value);
    };

    const handleWeeklyGoalChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        setWeeklyGoal(event.target.value);
    };

    const handleActivityLevelChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);

        setActivityLevel(event.target.value);
    };

    const handleSave = () =>{
        const api = new API();
        let weight = Number(currWeight);
        let gWeight = Number(goalWeight);
        let wGoal = Number(weeklyGoal);
        api.updateCurrWeight(userId, weight);
        api.updateActivityLevel(userId, activityLevel);
        api.updateWeeklyGoal(userId, wGoal);
        api.updateGoalWeight(userId, gWeight);
        //api.updateWeightGoals(userId, weight, gWeight, wGoal, activityLevel);
        updateDisplayCallBack('overall');
    }

    return (
        userData.length > 0 &&
        <Fragment>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Typography fontSize="40px">
                    Update Your Weight Goals
                </Typography>
            </Box>
            <Grid container spacing={0} columns={16}>
                <Grid item xs={8}>
            <Box display='flex' justifyContent='center' alignItems='center' mt={10}>
                <Stack spacing={2}>

                    <TextField
                        id="outline-multiline-static"
                        label = "Starting Weight"
                        placeholder=""
                        defaultValue={currWeight}
                        multiline
                        onChange={handleCurrWeightChange}
                        style={{width:200}}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        }}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Goal Weight"
                        placeholder=""
                        defaultValue={goalWeight}
                        multiline
                        onChange={handleGoalWeightChange}
                        style={{width:200}}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        }}
                    />

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Weekly Goal</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Weekly Goal"
                            defaultValue={weeklyGoal}
                            onChange={handleWeeklyGoalChange}
                            style = {{width: 300}}
                        >
                            <MenuItem value="-0.5">Lose 0.23 kg / 0.5 lbs per week</MenuItem>
                            <MenuItem value="-1">Lose 0.45 kg / 1 lb per week</MenuItem>
                            <MenuItem value="0">Maintain weight</MenuItem>
                            <MenuItem value="0.5">Gain 0.23 kg / 0.5 lbs per week</MenuItem>
                            <MenuItem value="1">Gain 0.45 kg / 1 lb per week</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Activity Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Activity Level"
                            defaultValue={activityLevel}
                            onChange={handleActivityLevelChange}
                            style = {{width: 300}}
                        >
                            <MenuItem value="Sedentary">Sedentary</MenuItem>
                            <MenuItem value="Lightly Active">Lightly Active</MenuItem>
                            <MenuItem value="Moderately Active">Moderately Active</MenuItem>
                            <MenuItem value="Very Active">Very Active</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSave} variant="outlined">
                        Save
                    </Button>
                    <Button onClick={() => updateDisplayCallBack('overall')} variant="outlined">
                        Cancel
                    </Button>
                </Stack>
            </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>
                        <img src="https://lap-associates.com/wp-content/uploads/2021/01/goal-weight-1.jpg" width={400} height={400}  alt="" />
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}