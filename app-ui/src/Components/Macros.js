import {Grid, InputAdornment, Stack, Typography} from "@mui/material";
import React, {Fragment} from "react";
import * as d3 from 'd3';
import {useState, useRef, useEffect} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import API from '../API_Interface/API_Interface'
import getDailyCalories from "./DailyCalorieGoal";


export default function Macros(props) {
    const updateDisplayCallBack = props.updateDisplayCallBack;
    const userId = props.userId;
    const[macros, setMacros] = useState([]);
    const [totalCalories, setTotalCalories] = useState("");
    const [fatPercentage, setFatPercentage] = useState("");
    const [carbPercentage, setCarbPercentage] = useState("");
    const [proteinPercentage, setProteinPercentage] = useState("");

    const [saveError, setSaveError] = useState(false);
    const [saveHelper, setSaveHelper] = useState("");
/*
    const [data, setData] = useState([
        {property: fatString, value: fatPercentage, color: 'red'},
        {property: carbString, value: carbPercentage, color: 'blue'},
        {property: proteinString, value: proteinPercentage, color: 'green'}
    ]);

 */

    const [data, setData] = useState([]);

    useEffect(() => {
        const api = new API();
        async function getMacros() {
            const macroGoal = (await api.getMacros(userId)).data;
            const calorieGoal = await getDailyCalories(userId);
            console.log(macroGoal);
            console.log(macroGoal[0]['MacroFat']);
            setTotalCalories(Math.round(calorieGoal));
            setFatPercentage(macroGoal[0]['MacroFat']);
            setCarbPercentage(macroGoal[0]['MacroCarbs']);
            setProteinPercentage(macroGoal[0]['MacroProtein']);
            setMacros(macroGoal);

            let fatGrams = (macroGoal[0]['MacroFat']/100) * Math.round(calorieGoal) / 9;
            let carbGrams = (macroGoal[0]['MacroCarbs']/100) *  Math.round(calorieGoal)/ 4;
            let proteinGrams = (macroGoal[0]['MacroProtein']/100) * Math.round(calorieGoal) / 4;

            let fatString = "Fat: " + Math.round(fatGrams) + ' g';
            let carbString = "Carbs: " + Math.round(carbGrams) + ' g';
            let proteinString = "Protein: " + Math.round(proteinGrams) + ' g';

            const updatedData = [
                {property: fatString, value: macroGoal[0]['MacroFat'], color: 'red'},
                {property: carbString, value: macroGoal[0]['MacroCarbs'], color: 'blue'},
                {property: proteinString, value: macroGoal[0]['MacroProtein'], color: 'green'}
            ];

            setData(updatedData);

        }

        getMacros();
    }, []);

    useEffect(() => {
        if(macros > 0){
            console.log(macros);
        }
    }, [macros])



    const svgRef = useRef();

    useEffect(() => {
            if (macros.length > 0) {
                console.log(data);
                // setting up svg container
                const w = 500;
                const h = 500;
                const radius = w / 2;
                const svg = d3.select(svgRef.current)
                    .attr('width', w)
                    .attr('height', h)
                    .style('overflow', 'visible')
                    .style('margin-top', '300px')
                    .style('margin-left', '450px');

                // setting up chart
                const formattedData = d3.pie().value(d => d.value)(data);
                const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
                //const color = d3.scaleOrdinal().range(d3.schemeSet2);

                //setting up svg data
                svg.selectAll()
                    .data(formattedData)
                    .join('path')
                    .attr('d', arcGenerator)
                    .attr('fill', d => d.data.color)
                    .style('opacity', 0.4);


                svg.selectAll()
                    .data(formattedData)
                    .join('text')
                    .text(d => d.data.property)
                    .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
                    .style('text-anchor', 'middle');
            }
    }, [data]);

    const handleFatInputChange = event => {
        setFatPercentage(event.target.value);
    };

    const handleCarbInputChange = event => {
        setCarbPercentage(event.target.value);
    };

    const handleProteinInputChange = event => {
        setProteinPercentage(event.target.value);
    };

    const handleSave = () => {
        //check if percentages add up to 100
        let fat = Number(fatPercentage);
        let carb = Number(carbPercentage);
        let protein = Number(proteinPercentage);

        const total = fat + carb + protein;
        if(total === 100){
            const api = new API();
            api.updateMacros(userId, fat, carb, protein);
            updateDisplayCallBack('overall');
            return true;
        }
        setSaveError(true);
        setSaveHelper("Macro total must equal 100%");


        return true;
    }




    return (
        macros.length > 0 &&
        <Fragment>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Typography fontSize="40px">
                    Update Your Nutritional Goals
                </Typography>
            </Box>
            <Grid container spacing={0} columns={16}>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center' mt={10}>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id="outlined-disabled"
                            label="Total calories"
                            defaultValue={totalCalories}
                            disabled={true}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kCal</InputAdornment>,
                            }}
                        />

                        <TextField
                            error={saveError}
                            id="outlined-multiline-static"
                            label="Fat"
                            defaultValue={fatPercentage}
                            multiline
                            onChange={handleFatInputChange}
                            helperText={saveHelper}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />

                        <TextField
                            error={saveError}
                            id="outlined-multiline-static"
                            label="Carbohydrates"
                            defaultValue={carbPercentage}
                            multiline
                            onChange={handleCarbInputChange}
                            helperText={saveHelper}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />

                        <TextField
                            error = {saveError}
                            id="outlined-multiline-static"
                            label="Protein"
                            defaultValue={proteinPercentage}
                            multiline
                            onChange={handleProteinInputChange}
                            helperText={saveHelper}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                        <Button onClick={handleSave} variant = "outlined">
                            Save
                        </Button>
                        <Button onClick={() => updateDisplayCallBack('overall')} variant="outlined">
                            Cancel
                        </Button>
                    </Stack>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                     <svg ref={svgRef}></svg>
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}