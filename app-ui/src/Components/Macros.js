import {Grid, InputAdornment, Stack, Typography} from "@mui/material";
import React, {Fragment} from "react";
import * as d3 from 'd3';
import {useState, useRef, useEffect} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";


export default function Macros() {
    const [updatedTotalCals, setUpdatedTotalCals] = useState("");
    const [updatedFat, setUpdatedFat] = useState("");
    const [updatedCarb, setUpdatedCarb] = useState("");
    const [updatedProtein, setUpdatedProtein] = useState("");

   const [totalCalories, setTotalCalories] = useState("2200");
   const [fatPercentage, setFatPercentage] = useState("30");
   const [carbPercentage, setCarbPercentage] = useState("40");
   const [proteinPercentage, setProteinPercentage] = useState("30");

   let fatGrams = (fatPercentage/100) * totalCalories / 9;
   let carbGrams = (carbPercentage/100) * totalCalories / 4;
   let proteinGrams = (proteinPercentage/100) * totalCalories / 4;

    let fatString = "Fat: " + Math.round(fatGrams) + ' g';
    let carbString = "Carbs: " + Math.round(carbGrams) + ' g';
    let proteinString = "Protein: " + Math.round(proteinGrams) + ' g';




    const [data, setData] = useState([
        {property: fatString, value: fatPercentage, color: 'blue'},
        {property: carbString, value: carbPercentage, color: 'red'},
        {property: proteinString, value: proteinPercentage, color: 'pink'}
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
            .style('opacity', 0.7);



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


    function updateMacros() {
        console.log(updatedTotalCals);
        console.log(updatedFat);
        console.log(updatedCarb);
        console.log(updatedProtein);

        setTotalCalories(updatedTotalCals);
        setFatPercentage(updatedFat);
        setCarbPercentage(updatedCarb);
        setProteinPercentage(updatedProtein);

        window.location.reload();
    }


    return(
        <Fragment>
            <Stack direction='column'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Stack direction='row' spacing={2}>
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
                        <Button onClick={() => updateMacros()}>
                            Save
                        </Button>
                    </Stack>
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <svg ref={svgRef}></svg>
                </Box>
            </Stack>
        </Fragment>
    )
}