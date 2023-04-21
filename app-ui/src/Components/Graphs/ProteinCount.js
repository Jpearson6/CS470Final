import React, {useEffect, useRef, useState} from "react";
import * as Plot from "@observablehq/plot";

const placeholderData = () => {
    return [
        {
            "date":new Date("2023-04-14"),
            "protein":20,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-14"),
            "protein":4,
            "food": "fries"
        },
        {
            "date":new Date("2023-04-14"),
            "protein":0,
            "food": "coke"
        },
        {
            "date":new Date("2023-04-15"),
            "protein":21,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-16"),
            "protein":18,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-17"),
            "protein":24,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-18"),
            "protein":18,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-19"),
            "protein":16,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-20"),
            "protein":17,
            "food": "burger"
        }
    ]
}

function ProteinCount() {
    const chartRef = useRef();
    const [data, setData] = useState(placeholderData);

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
                Plot.barY(data, {x: "date", y: "protein", fill: "food"})
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

export default ProteinCount;