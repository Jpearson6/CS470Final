import { Dialog, Stack, Typography, Paper, TextField, Alert } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import FoodSearch from "./FoodSearch/FoodSearch";
import BasicDatePicker from "./FoodSearch/DatePicker";
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import API from '../API_Interface/API_Interface';

const DisplayCurrentMeal = (props) => {
    const { addFoodList, setAddFoodList, logDate, setLogDate, addFood } = props;
    let tempList = [];
    const [sumP, setSumP] = useState(0);
    const [sumF, setSumF] = useState(0);
    const [sumCb, setSumCb] = useState(0);
    const [sumCl, setSumCl] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let sumProtein = 0;
    let sumFat = 0;
    let sumCarbs = 0;
    let sumCalories = 0;
    let foodName = "";
    let protein = null;
    let fat = null;
    let carbs = null;
    let calories = null;

    const handleOpen = () => {
        setIsModalVisible(true);
        setTimeout(() => {
            setIsModalVisible(false);
        }, 1500)
    };

    useEffect(() => {
        addFoodList.forEach((element) => {
            sumProtein += Number(element["Protein"]);
            sumFat += Number(element["Fat"]);
            sumCarbs += Number(element["Carbs"]);
            sumCalories += Number(element["Calories"]);
        })
        setSumP(sumProtein);
        setSumF(sumFat);
        setSumCb(sumCarbs);
        setSumCl(sumCalories);
    }, [addFoodList])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="Food table">
                <TableHead>
                    <TableRow display={'flex'} justifycontent={'space-between'}>
                        <TableCell colSpan={3} key={"header"}>
                            <Typography key={"header"}>
                                Current Meal to be added
                            </Typography>
                        </TableCell>
                        <TableCell colSpan={4} key={"date-picker"} align={"right"}>
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
                        <TableCell align="center">
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
                                    <TableCell>
                                        {
                                            idx == 0 &&
                                            <Button paddingtop={2} onClick={() => {
                                                tempList = addFoodList.slice(1);
                                                setAddFoodList(tempList);
                                            }}>
                                                <RemoveCircleRoundedIcon fontSize="large" />
                                            </Button>
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
                        }}>
                            <TextField label="Food Name" />
                        </TableCell>
                        <TableCell key={"customProtein"} align="center" onChange={(event) => {
                            protein = event.target.value;
                        }}>
                            <TextField label="Protein(g)" />
                        </TableCell>
                        <TableCell key={"customFat"} align="center" onChange={(event) => {
                            fat = event.target.value;
                        }}>
                            <TextField label="Fat(g)" />
                        </TableCell>
                        <TableCell key={"customCarbs"} align="center" onChange={(event) => {
                            carbs = event.target.value;
                        }}>
                            <TextField label="Carbs(g)" />
                        </TableCell>
                        <TableCell display={"flex"} flex-direction={"column"} key={"customCalories"} justifyContent="center" onChange={(event) => {
                            calories = event.target.value;
                        }}>
                            <TextField label="Calories(g)" />
                        </TableCell>
                        <TableCell>
                            <Button paddingtop={1} onClick={() => {
                                if (!isNaN(calories) && !isNaN(protein) && !isNaN(carbs) && !isNaN(fat)
                                    && foodName.length > 0 && calories != null && protein != null
                                    && carbs != null && fat != null) {
                                    tempList = [{
                                        "FoodName": foodName,
                                        "Calories": calories,
                                        "Protein": protein,
                                        "Carbs": carbs,
                                        "Fat": fat
                                    }, ...addFoodList];
                                    setAddFoodList(tempList);
                                }
                            }}>
                                <AddCircleRoundedIcon fontSize="large" />
                            </Button>
                        </TableCell>
                    </TableRow>
                    {
                        addFoodList.length > 0 &&
                        <TableRow>
                            <TableCell align="center">
                                Totals
                            </TableCell>
                            <TableCell align="center">
                                {sumP}
                            </TableCell>
                            <TableCell align="center">
                                {sumF}
                            </TableCell>
                            <TableCell align="center">
                                {sumCb}
                            </TableCell>
                            <TableCell align="center">
                                {sumCl}
                            </TableCell>
                            <TableCell align="center">

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
                                setAddFoodList([]);
                                handleOpen();
                            }}>
                                <Button>
                                    Log Meal
                                </Button>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
            <Dialog open={isModalVisible} PaperProps={{ sx: { position: "fixed", top: 10, left: "50vw", m: 0 } }}>
                <Alert severity="success">Meal Has Been Added</Alert>
            </Dialog>
        </TableContainer>
    )
}


export default function AddMeal(props) {
    const { userId } = props;
    const [addFoodList, setAddFoodList] = useState([])
    const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);

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