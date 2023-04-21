import React, {useEffect, useRef, useState} from "react";
import * as Plot from "@observablehq/plot";

const placeholderData = () => {
    return [
        {
            "date":new Date("2023-04-14"),
            "fat":17,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-14"),
            "fat":14,
            "food": "fries"
        },
        {
            "date":new Date("2023-04-14"),
            "fat":0,
            "food": "coke"
        },
        {
            "date":new Date("2023-04-15"),
            "fat":18,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-16"),
            "fat":16,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-17"),
            "fat":13,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-18"),
            "fat":21,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-19"),
            "fat":16,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-20"),
            "fat":19,
            "food": "burger"
        }
    ]
}

function FatCount() {
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
                Plot.barY(data, {x: "date", y: "fat", fill: "food"})
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

export default FatCount;