import {InputLabel, MenuItem, Stack, Typography} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {GraphList} from "./Graphs/GraphList";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import API from '../API_Interface/API_Interface'

const findSelectedComponent = (selectedItem, foodData, timeframe) => {
    const component = [...GraphList(foodData, timeframe)].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the graph item.")
    return {
        title: null,
        component: null
    }
};

export default function Graphs() {
    const [selectedItem, setSelectedItem] = useState('Calorie Count');
    const [timeframe, setTimeframe] = useState(7)
    const [foodLog, setFoodLog] = useState([]);


    useEffect(() => {
        const api = new API();

        async function getFood() {
            const foodJSONString = await api.allFoodByUser(1);
            console.log(foodJSONString.data);
            setFoodLog(foodJSONString.data);
        }

        getFood();
    }, []);

    const handleGraphChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value);
    };

    const handleTimeChange = (event: SelectChangeEvent) => {
        setTimeframe(event.target.value);
    };

    return foodLog.length > 0 && <Fragment>
        <Stack spacing={2}>
            <FormControl fullWidth>
                <InputLabel id="graph-label">Graph</InputLabel>
                <Select
                    labelId="graph-label"
                    id="graph-select"
                    value={selectedItem}
                    label="Graph"
                    onChange={handleGraphChange}
                >
                    <MenuItem value={"Calorie Count"}>Calories</MenuItem>
                    <MenuItem value={"Fat Count"}>Fat</MenuItem>
                    <MenuItem value={"Protein Count"}>Protein</MenuItem>
                    <MenuItem value={"Carb Count"}>Carbs</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="timeframe-label">Timeframe</InputLabel>
                <Select
                    labelId="timeframe-label"
                    id="timeframe-select"
                    value={timeframe}
                    label="Timeframe"
                    onChange={handleTimeChange}
                >
                    <MenuItem value={7}>Last 7 days</MenuItem>
                    <MenuItem value={14}>Last 14 days</MenuItem>
                    <MenuItem value={30}>Last 30 days</MenuItem>
                    <MenuItem value={90}>Last 90 days</MenuItem>
                </Select>
            </FormControl>
            {findSelectedComponent(selectedItem, foodLog, timeframe).component}

        </Stack>
    </Fragment>
}