import React, {useEffect, useRef, useState} from "react";
import * as Plot from "@observablehq/plot";

const placeholderData = () => {
    return [
            {
                "date":new Date("2023-04-14"),
                "calories":1500,
                "food": "burger"
            },
            {
                "date":new Date("2023-04-14"),
                "calories":746,
                "food": "fries"
            },
            {
                "date":new Date("2023-04-14"),
                "calories":230,
                "food": "coke"
            },
            {
                "date":new Date("2023-04-15"),
                "calories":2765,
                "food": "burger"
            },
            {
                "date":new Date("2023-04-16"),
                "calories":2357,
                "food": "burger"
            },
            {
                "date":new Date("2023-04-17"),
                "calories":2486,
                "food": "burger"
            },
            {
                "date":new Date("2023-04-18"),
                "calories":2149,
                "food": "burger"
            },
            {
                "date":new Date("2023-04-19"),
                "calories":3205,
                "food": "burger"
            },
            {
                "date":new Date("2023-04-20"),
                "calories":2759,
                "food": "burger"
            }
    ]
}

function CalorieCount() {
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
                Plot.barY(data, {x: "date", y: "calories", fill: "food"})
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