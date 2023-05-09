import { Link, Stack, Table, TableRow, Typography} from "@mui/material";
import React, {Fragment, useState, useMemo, useEffect} from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import API from "../API_Interface/API_Interface";
import getDailyCalories from "./DailyCalorieGoal";

export default function OverallGoals(props) {
    const updateDisplayCallBack = props.updateDisplayCallBack;
    const userId = props.userId;
    const[macros, setMacros] = useState([]);
    const [totalCalories, setTotalCalories] = useState("");
    const [fatPercentage, setFatPercentage] = useState("");
    const [carbPercentage, setCarbPercentage] = useState("");
    const [proteinPercentage, setProteinPercentage] = useState("");
    const [calGoal, setCalGoal] = useState("");

    const[currWeight, setCurrWeight] = useState("");
    const[goalWeight, setGoalWeight] = useState("");
    const[weeklyGoal, setWeeklyGoal] = useState("");
    const[activityLevel, setActivityLevel] =useState("");

    useEffect(() => {
        const api = new API();
        async function getUserInfo() {
            const macroGoal = (await api.getMacros(userId)).data;
            const calorieGoal = await getDailyCalories(userId);
            const allData = await api.getUserById(userId);
            setFatPercentage(macroGoal[0]['MacroFat']);
            setCarbPercentage(macroGoal[0]['MacroCarbs']);
            setProteinPercentage(macroGoal[0]['MacroProtein']);
            setMacros(macroGoal);
            setCalGoal(Math.round(calorieGoal));

            setCurrWeight(allData.data[0]['Weight']);
            setGoalWeight(allData.data[0]['GoalWeight']);
            setActivityLevel(allData.data[0]['ActivityLevel']);

            if(allData.data[0]['LbsPerWeek'] === 0) {
                setWeeklyGoal('Maintain Weight');
            }
            else if(allData.data[0]['LbsPerWeek'] === -0.5) {
                setWeeklyGoal('Lose 0.23 kg / 0.5 lbs per week');
            }
            else if(allData.data[0]['LbsPerWeek'] === -1) {
                setWeeklyGoal('Lose 0.45 kg / 1 lb per week');
            }
            else if(allData.data[0]['LbsPerWeek'] === 0.5) {
                setWeeklyGoal('Gain 0.23 kg / 0.5 lbs per week');
            }
            else if(allData.data[0]['LbsPerWeek'] === 1) {
                setWeeklyGoal('Gain 0.45 kg / 1 lb per week');
            }

        }

        getUserInfo();
    }, []);


    return(
        macros.length > 0 &&
        <Fragment>
            <Stack direction='column'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography fontSize='40px'>
                        Your Goals
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' mt={5}>
                    <Stack direction='row' spacing={35}>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Typography>
                                Weight Goals:
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Typography>
                                Nutrition Goals:
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
                    <Stack direction='row' spacing={10}>
                        <Box display='flex' justifyContent='center' alignItems='center' >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Current Weight:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {currWeight} kg / {Math.round(currWeight * 2.20462)} lbs
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Goal Weight:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {goalWeight} kg / {Math.round(goalWeight * 2.20462)} lbs
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Weekly Goal:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {weeklyGoal}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Activity Level:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {activityLevel}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Daily Calorie Goal:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {calGoal} calories
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Fat:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {fatPercentage}%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Carbohydrates:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {carbPercentage}%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Protein:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {proteinPercentage}%
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Stack>
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Stack direction='row' spacing={40}>
                        <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
                            <Typography variant="body1">
                                <Link href="#" onClick={() => updateDisplayCallBack('editWeight')} color="primary">
                                    Update
                                </Link>
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
                            <Typography variant="body1">
                                <Link href="#" onClick={() => updateDisplayCallBack('editNutri')} color="primary">
                                    Update
                                </Link>
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Fragment>
    )

}