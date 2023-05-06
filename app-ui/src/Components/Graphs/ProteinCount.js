import React, {useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";
import {addMissingDates, updateDate} from "./DataManip";
import addTooltips from "./Tooltip";
import {Stack} from "@mui/material";
function ProteinCount(props) {
    const chartRef = useRef();
    const foodData = props['foodData'].map(item => updateDate(item));
    const timeframe = props['timeframe']

    const graphByDay = addMissingDates(foodData.reduce((acc, item) => {
        const key = item.dayString;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {}), timeframe, foodData);

    console.log(foodData)

    useEffect(() => {
        if (graphByDay === undefined) return;
        const chart = addTooltips(
            Plot.plot({
                width: 1000,
                y: {
                    grid: true
                },
                x: {
                    ticks: 7
                },
                color: {
                    legend: true,
                    columns: 5,
                    width: 1000,
                    scheme: "Sinebow"
                },
                marks: [
                    Plot.barY(foodData, {
                        x: "Date",
                        y: "Protein",
                        stroke: "FoodName",
                        fill: "FoodName",
                        fillOpacity: .75,
                        title: (d) => `${d.FoodName} \n ${d.Protein}`,
                    })
                ]
            }),
            { fill: "Gray", opacity: 1, "stroke-width": "3px", stroke: "red" }
        )
        chartRef.current.append(chart);
        return () => {chart.remove()}
    }, [foodData]);


    return (
        <Stack alignSelf={"center"}>
            <div ref={chartRef} />
        </Stack>
    );
}

export default ProteinCount;