import {Dialog, DialogTitle, ListItemButton, Stack, Typography, Paper, Box} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
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

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open, userId, addFoodList, setAddFoodList } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
            <DialogTitle>Food Search</DialogTitle>
            <FoodSearch userId={userId} addFoodList={addFoodList} setAddFoodList={setAddFoodList} onClick = {handleListItemClick}/>
        </Dialog>
    );
}

const DisplayCurrentMeal = (props) => {
    const { addFoodList , logDate , setLogDate } = props;

    return (
        <TableContainer component={Paper}>
        <Table sx={{minWidth: "100%"}} aria-label="Food table">
            <TableHead>
                <TableRow>
                    <TableCell key={"header"}>
                    <Typography key={"header"}>
                        Current Meal to be added
                    </Typography>
                    </TableCell>
                    <TableCell key={"date-picker"}>
                    <BasicDatePicker logDate={logDate} setLogDate={setLogDate}/>
                    </TableCell>                  
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    addFoodList.length > 0 ?
                    addFoodList.map((food, idx) => {
                        return(
                        <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell colSpan={2} key={idx}>
                                {
                                    food
                                }
                            </TableCell>
                        </TableRow>
                    )})
                    :
                    <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell key={1}>
                                
                                    no food selected
                                
                            </TableCell>
                    </TableRow>
                }
                {
                    addFoodList.length > 0 &&
                    <TableRow>
                        <TableCell colSpan={2} display={"flex"} align={"center"}>
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

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function AddMeal(props) {
    const { userId } = props;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);
    const [addFoodList, setAddFoodList] = useState([])
    const [logDate , setLogDate] = useState(dayjs('2022-04-17'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    useEffect(() =>{
        console.log("log date is: ", logDate);
    }, [logDate])
    //console.log(logDate);

    return <Fragment>
        <Stack>
            <DisplayCurrentMeal 
                addFoodList={addFoodList} 
                logDate={logDate} 
                setLogDate={setLogDate}
            />
            <Button
                variant="outlined" 
                onClick={handleClickOpen}
            >
                Add Food to Current Meal
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                userId={userId}
                addFoodList={addFoodList}
                setAddFoodList={setAddFoodList}
                onClose={handleClose}
            />
        </Stack>
    </Fragment>
}