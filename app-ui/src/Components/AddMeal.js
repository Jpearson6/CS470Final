import { Dialog, DialogTitle, ListItemButton, Stack, Typography, Paper, Box, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import FoodSearch from "./FoodSearch/FoodSearch";
import BasicDatePicker from "./FoodSearch/DatePicker";
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import API from '../API_Interface/API_Interface';

const DisplayCurrentMeal = (props) => {
    const { addFoodList, setAddFoodList, logDate, setLogDate, addFood } = props;
    let tempList = [];
    let sum = 0;
    let foodName = "";
    let protein = null;
    let fat = null;
    let carbs = null;
    let calories = null;


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="Food table">
                <TableHead>
                    <TableRow display={'flex'} justifyContent={'space-between'}>
                        <TableCell colSpan={3} key={"header"}>
                            <Typography key={"header"}>
                                Current Meal to be added
                            </Typography>
                        </TableCell>
                        <TableCell colSpan={3} key={"date-picker"} align={"right"}>
                            <BasicDatePicker logDate={logDate} setLogDate={setLogDate} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">
                            Food Name
                        </TableCell>
                        <TableCell align="center">
                            Protein(g)
                        </TableCell>
                        <TableCell align="center">
                            Fat(g)
                        </TableCell>
                        <TableCell align="center">
                            Carbs(g)
                        </TableCell>
                        <TableCell align="center">
                            Calories(cal)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        addFoodList.length > 0 &&
                        addFoodList.map((food, idx) => {
                            return (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, align: "center" }}
                                >
                                    <TableCell align="center" key={"nameAdd" + idx}>
                                        {
                                            food["FoodName"]
                                        }
                                    </TableCell>
                                    <TableCell align="center" key={"ProteinAdd" + idx}>
                                        {
                                            food["Protein"]
                                        }
                                    </TableCell>
                                    <TableCell align="center" key={"FatAdd" + idx}>
                                        {
                                            food["Fat"]
                                        }
                                    </TableCell>
                                    <TableCell align="center" key={"CarbsAdd" + idx}>
                                        {
                                            food["Carbs"]
                                        }
                                    </TableCell>
                                    <TableCell align="center" key={"CaloriesAdd" + idx}>
                                        {
                                            food["Calories"]
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell key={"customFood"} align="center" onChange={(event) => {
                            foodName = event.target.value;
                            console.log(foodName);
                        }}>

                            <TextField placeholder="Food Name" />

                        </TableCell>
                        <TableCell key={"customProtein"} align="center" onChange={(event) => {
                            protein = event.target.value;
                            console.log(protein);
                        }}>

                            <TextField placeholder="Protein(g)" />


                        </TableCell>
                        <TableCell key={"customFat"} align="center" onChange={(event) => {
                            fat = event.target.value;
                            console.log(fat);
                        }}>

                            <TextField placeholder="Fat(g)" />

                        </TableCell>
                        <TableCell key={"customCarbs"} align="center" onChange={(event) => {
                            carbs = event.target.value;
                            console.log(carbs);
                        }}>

                            <TextField placeholder="Carbs(g)" />

                        </TableCell>
                        <TableCell display={"flex"} flex-direction={"column"} key={"customCalories"} justifyContent="center" onChange={(event) => {
                            calories = event.target.value;
                            console.log(calories);
                        }}>
                            <Box display={"flex"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
                                <TextField placeholder="Calories(g)" />

                                <Button paddingTop={1} onClick={() => {
                                    if (!isNaN(calories) && !isNaN(protein) && !isNaN(carbs) && !isNaN(fat)) {
                                        tempList = [{
                                            "FoodName": foodName,
                                            "Calories": calories,
                                            "Protein": protein,
                                            "Carbs": carbs,
                                            "Fat": fat
                                        }, ...addFoodList];
                                        setAddFoodList(tempList);
                                        console.log(tempList)
                                    }
                                }}>

                                    <AddCircleRoundedIcon fontSize="large" />
                                </Button>
                            </Box>

                        </TableCell>
                    </TableRow>
                    {
                        addFoodList.length > 0 &&
                        <TableRow>
                            <TableCell align="center">
                                Totals
                            </TableCell>
                            <TableCell align="center">
                                protein
                            </TableCell>
                            <TableCell align="center">
                                Totals
                            </TableCell>
                            <TableCell align="center">
                                Totals
                            </TableCell>
                            <TableCell align="center">
                                Totals
                            </TableCell>
                        </TableRow>
                    }
                    {
                        addFoodList.length > 0 &&
                        <TableRow>
                            <TableCell key={"logfood"} colSpan={5} display={"flex"} align={"center"} onClick={() => {
                                addFoodList.forEach(element => {
                                    addFood(element["FoodName"], element["Calories"], element["Protein"], element["Carbs"], element["Fat"]);
                                });
                            }}>
                                <Button>
                                    Log Meal
                                </Button>
                            </TableCell>
                        </TableRow>
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default function AddMeal(props) {
    const { userId } = props;
    const [addFoodList, setAddFoodList] = useState([])
    const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        console.log("log date is: ", logDate);
    }, [logDate])
    //console.log(logDate);

    async function addFood(FoodName, Calories, Protein, Carbohydrates, Fat) {
        const api = new API();
        api.addFoodByUser(userId, logDate, FoodName, Calories, Protein, Carbohydrates, Fat);
    }

    return <Fragment>
        <Stack align={"center"}>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button variant="contained" {...bindTrigger(popupState)}>
                            Search Food Here
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Paper position={'absolute'} style={{ maxHeight: 350, height: 350, width: '60vw', overflow: 'auto' }}>
                                <FoodSearch userId={userId} addFoodList={addFoodList} setAddFoodList={setAddFoodList} />
                            </Paper>

                        </Popover>
                    </div>
                )}
            </PopupState>
            <DisplayCurrentMeal
                addFoodList={addFoodList}
                setAddFoodList={setAddFoodList}
                logDate={logDate}
                setLogDate={setLogDate}
                addFood={addFood}
            />
        </Stack>
    </Fragment>
}