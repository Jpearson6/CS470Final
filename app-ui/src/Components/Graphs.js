import {InputLabel, MenuItem, Stack, Typography} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {GraphList} from "./Graphs/GraphList";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import API from '../API_Interface/API_Interface'

const findSelectedComponent = (selectedItem, foodData) => {
    const component = [...GraphList(foodData)].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the graph item.")
    return {
        title: null,
        component: null
    }
};

export default function Graphs(props) {
    const { userId } = props;
    const [selectedItem, setSelectedItem] = useState('');

    const [foodLog, setFoodLog] = useState([]);
    //console.log(`in EmployeeTable routes contains is ${JSON.stringify(employees)}`);


    useEffect(() => {
        const api = new API();

        async function getFood() {
            const foodJSONString = await api.allFoodByUser(userId);
            console.log(foodJSONString.data);
            setFoodLog(foodJSONString.data);
        }

        getFood();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value);
    };

    return foodLog.length > 0 && <Fragment>
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
            {findSelectedComponent(selectedItem, foodLog).component}

        </Stack>
    </Fragment>
}