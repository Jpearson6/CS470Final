import {InputAdornment, Stack, Typography} from "@mui/material";
import React, {Fragment} from "react";
import * as d3 from 'd3';
import {useState, useRef, useEffect} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import API from '../API_Interface/API_Interface'


export default function Macros(props) {
    const { userId } = props

    async function getMacros() {
        const api = new API();
        const macros = await api.getMacros(userId);
        console.log(`macros from the API Call ${JSON.stringify(macros.data)}`);
    }
    getMacros();

    let fat = 30;
    let carbohydrates = 50;
    let protein = 20;

    let percentSymbol = '%';
    let fatString = "Fat " + fat + percentSymbol;
    let carbString = "Carbohydrates " + carbohydrates + percentSymbol;
    let proteinString = "Protein " + protein + percentSymbol;




    const [data] = useState([
        {property: fatString, value: fat},
        {property: carbString, value: carbohydrates},
        {property: proteinString, value: protein}
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
            .style('margin-top', '400px');

        // setting up chart
        const formattedData = d3.pie().value(d => d.value)(data);
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
        const color = d3.scaleOrdinal().range(d3.schemeSet2);

        //setting up svg data
        svg.selectAll()
            .data(formattedData)
            .join('path')
            .attr('d', arcGenerator)
            .attr('fill', d => color(d.value))
            .style('opacity', 0.7);



        svg.selectAll()
            .data(formattedData)
            .join('text')
                .text(d => d.data.property)
                .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
                .style('text-anchor', 'middle');


    }, [data]);

        //

    return (
       <Fragment>
           <Stack direction="row">
           <Box display="flex" justifyContent="center" alignItems="center" width="125%" mt={10}>
            <svg ref={svgRef}></svg>
           </Box>

           <Box>
               <Stack direction="column" spacing={2}>
               <TextField
                   id="outlined-multiline-static"
                   label="Total calories"
                   placeholder=""
                   multiline
                   style={{width:200}}
                   InputProps={{
                       endAdornment: <InputAdornment position="end">calories</InputAdornment>,
                   }}
               />

               <TextField
                   id="outlined-multiline-static"
                   label="Fat"
                   placeholder=""
                   multiline
                   style={{width:200}}
                   InputProps={{
                       endAdornment: <InputAdornment position="end">%</InputAdornment>,
                   }}
               />

               <TextField
                   id="outlined-multiline-static"
                   label="Carbohydrates"
                   placeholder=""
                   multiline
                   style={{width:200}}
                   InputProps={{
                       endAdornment: <InputAdornment position="end">%</InputAdornment>,
                   }}
               />

               <TextField
                   id="outlined-multiline-static"
                   label="Protein"
                   placeholder=""
                   multiline
                   style={{width:200}}
                   InputProps={{
                       endAdornment: <InputAdornment position="end">%</InputAdornment>,
                   }}
               />
               </Stack>
           </Box>
           </Stack>
       </Fragment>
    );
}