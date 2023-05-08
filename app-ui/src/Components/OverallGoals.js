import { Link, Stack, Table, TableRow, Typography} from "@mui/material";
import React, {Fragment, useState, useMemo, useEffect} from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import API from "../API_Interface/API_Interface";

export default function OverallGoals(props) {

    console.log("here");
    const api = new API();
    api.updateActivityLevel(2 , "Moderately Active");
    const updateDisplayCallBack = props.updateDisplayCallBack;
    const userId = props.userId;
    const [user, setUser] = useState([]);


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