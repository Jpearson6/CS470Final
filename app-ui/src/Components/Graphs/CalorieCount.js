import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import * as Plot from "@observablehq/plot";

function CalorieCount() {
    const chartRef = useRef();
    const [data, setData] = useState();

    useEffect(() => {
        d3.csv("/calories.csv", d3.autoType).then(setData);
    }, []);

    useEffect(() => {
        if (data === undefined) return;
        console.log(data)
        const chart = Plot.plot({
            y: {
                grid: true
            },
            x: {
                ticks: 7
            },
            marks: [
                Plot.ruleY([0,4000]),
                Plot.line(data, {
                    x: "date",
                    y: "count",
                    curve: "linear"
                }),
                Plot.dot(data, {
                    x: "date",      // feature for the x channel
                    y: "count",     // feature for the y channel
                }),
            ]
        });
        chartRef.current.append(chart);
        console.log(chart)
        return () => chart.remove();
    }, [data]);


    return (
        <div ref={chartRef} />
    );
}

export default CalorieCount;