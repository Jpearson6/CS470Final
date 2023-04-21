import {InputLabel, MenuItem, Stack, Typography} from "@mui/material";
import {Fragment, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {GraphList} from "./Graphs/GraphList";
import Select, { SelectChangeEvent } from '@mui/material/Select';

const findSelectedComponent = (selectedItem) => {
    const component = [...GraphList()].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the graph item.")
    return {
        title: null,
        component: null
    }
};

export default function Graphs() {
    const [selectedItem, setSelectedItem] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value);
    };

    return <Fragment>
        <Stack>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Graph</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedItem}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"Calorie Count"}>Calories</MenuItem>
                    <MenuItem value={"Fat Count"}>Fat</MenuItem>
                    <MenuItem value={"Protein Count"}>Protein</MenuItem>
                    <MenuItem value={"Carb Count"}>Carbs</MenuItem>
                </Select>
            </FormControl>
            {findSelectedComponent(selectedItem).component}

        </Stack>
    </Fragment>
}