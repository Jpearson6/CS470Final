import {InputLabel, MenuItem, Stack, Typography} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {GraphList} from "./Graphs/GraphList";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import API from '../API_Interface/API_Interface'
import ListView from "./Graphs/ListView";

const findSelectedGraph = (selectedItem, foodData, timeframe, type) => {
    if (type === "List") {
        return {
            title: "List View",
            component:<ListView attribute={selectedItem} />}
    }
    const component = [...GraphList(foodData, timeframe)].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the graph item.")
    return {
        title: null,
        component: null
    }
};

export default function Graphs(props) {
    const [selectedItem, setSelectedItem] = useState('Calorie Count');
    const [timeframe, setTimeframe] = useState(7);
    const [type, setType] = useState("Graph");
    const { userId } = props;

    const [foodLog, setFoodLog] = useState([]);


    useEffect(() => {
        const api = new API();

        async function getFood() {
            const foodJSONString = await api.allFoodByUserTimeSpan(userId , timeframe);
            //console.log(foodJSONString.data);
            setFoodLog(foodJSONString.data);
        }

        getFood();
    }, [timeframe]);

    const handleGraphChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value);
    };

    const handleTimeChange = (event: SelectChangeEvent) => {
        setTimeframe(event.target.value);
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
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
            <Stack direction={"row"} spacing={1}>
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
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="type-label">Display Type</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type-select"
                        value={type}
                        label="DisplayType"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value={"Graph"}>Graph View</MenuItem>
                        <MenuItem value={"List"}>List View</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            {findSelectedGraph(selectedItem, foodLog, timeframe, type).component}

        </Stack>
    </Fragment>
}