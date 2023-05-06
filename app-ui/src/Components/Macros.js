import {Grid, InputAdornment, Stack, Typography} from "@mui/material";
import React, {Fragment} from "react";
import * as d3 from 'd3';
import {useState, useRef, useEffect} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import API from '../API_Interface/API_Interface'


export default function Macros(props) {
    const updateDisplayCallBack = props.updateDisplayCallBack;
    const userId = props.userId;
    const[macros, setMacros] = useState([]);

    useEffect(() => {
        const api = new API();
        async function getMacros() {
            const macrosJSONString = await api.getMacros(userId);
            console.log(`macros from the DB ${JSON.stringify(macrosJSONString)}`);
            setMacros(macrosJSONString.data);
        }

        getMacros();
    }, []);

    console.log(macros);

   const [totalCalories, setTotalCalories] = useState("2200");
   const [fatPercentage, setFatPercentage] = useState('20');
   const [carbPercentage, setCarbPercentage] = useState('45');
   const [proteinPercentage, setProteinPercentage] = useState('35');


    const [updatedTotalCals, setUpdatedTotalCals] = useState(totalCalories);
    const [updatedFat, setUpdatedFat] = useState(fatPercentage);
    const [updatedCarb, setUpdatedCarb] = useState(carbPercentage);
    const [updatedProtein, setUpdatedProtein] = useState(proteinPercentage);


    let fatGrams = (fatPercentage/100) * totalCalories / 9;
   let carbGrams = (carbPercentage/100) * totalCalories / 4;
   let proteinGrams = (proteinPercentage/100) * totalCalories / 4;

    let fatString = "Fat: " + Math.round(fatGrams) + ' g';
    let carbString = "Carbs: " + Math.round(carbGrams) + ' g';
    let proteinString = "Protein: " + Math.round(proteinGrams) + ' g';




    const [data, setData] = useState([
        {property: fatString, value: fatPercentage, color: 'red'},
        {property: carbString, value: carbPercentage, color: 'blue'},
        {property: proteinString, value: proteinPercentage, color: 'green'}
    ]);
    const svgRef = useRef();

    useEffect(() => {
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


    }, [data]);

    const handleTotalCalsInputChange = event => {
        setUpdatedTotalCals(event.target.value);
    };

    const handleFatInputChange = event => {
        setUpdatedFat(event.target.value);
    };

    const handleCarbInputChange = event => {
        setUpdatedCarb(event.target.value);
    };

    const handleProteinInputChange = event => {
        setUpdatedProtein(event.target.value);
    };

    const handleSave = () => {
        //check if percentages add up to 100
        let fat = Number(updatedFat);
        let carb = Number(updatedCarb);
        let protein = Number(updatedProtein);

        const total = fat + carb + protein;
        if(total === 100){
            const api = new API();
            api.updateMacros(userId, fat, carb, protein);
            updateDisplayCallBack('overall');
            return true;
        }


        return true;
    }




    return (
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
                            id="outlined-multiline-static"
                            label="Total calories"
                            defaultValue={totalCalories}
                            multiline
                            onChange={handleTotalCalsInputChange}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">calories</InputAdornment>,
                            }}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Fat"
                            defaultValue={fatPercentage}
                            multiline
                            onChange={handleFatInputChange}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Carbohydrates"
                            defaultValue={carbPercentage}
                            multiline
                            onChange={handleCarbInputChange}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Protein"
                            defaultValue={proteinPercentage}
                            multiline
                            onChange={handleProteinInputChange}
                            style={{width:200}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                        <Button onClick={handleSave}>
                            Save
                        </Button>
                        <Button onClick={() => updateDisplayCallBack('overall')}>
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