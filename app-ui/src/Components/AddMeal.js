import {Dialog, DialogTitle, ListItemButton, Stack} from "@mui/material";
import {Fragment, useState} from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import FoodSearch from "./FoodSearch/FoodSearch";

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Food Search</DialogTitle>
            <FoodSearch onClick = {handleListItemClick}/>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function AddMeal() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const [foodList, setFoodList] = useState(["Apple", "Burger", "Coke"])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return <Fragment>
        <Stack>
            <List sx={{ pt: 0 }}>
                {foodList.map((food) => (
                    <ListItem disableGutters>
                        <ListItemButton key={food}>
                            <ListItemText primary={food} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </Stack>
    </Fragment>
}