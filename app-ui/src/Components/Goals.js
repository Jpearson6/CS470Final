import {InputAdornment, InputLabel, Link, MenuItem, Select, Stack, Table, TableRow, Typography} from "@mui/material";
import React, {Fragment, useState} from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import WeightGoals from "./WeightGoals";
import Macros from "./Macros";
import {useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom/client';

export default function Goals() {

    function handleWeightClick(){

    };
    function handleNutritionClick(){

    };

    return(
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
                                                    Starting Weight:
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    200 lbs
                                                </TableCell>
                                            </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Goal Weight:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                185 lbs
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Weekly Goal:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                Lose 1 lb per week
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Activity Level:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                Very Active
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
                                                2200 calories
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Fat:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                30%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Carbohydrates:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                40%
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Protein:
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                30%
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
                                <Link href="#"  onClick={handleWeightClick} color="primary">
                                    Update
                                </Link>
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
                            <Typography variant="body1">
                                <Link href="#"  color="primary">
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