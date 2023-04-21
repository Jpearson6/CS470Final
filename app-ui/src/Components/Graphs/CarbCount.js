import React, {useEffect, useRef, useState} from "react";
import * as Plot from "@observablehq/plot";

const placeholderData = () => {
    return [
        {
            "date":new Date("2023-04-14"),
            "carbs":29,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-14"),
            "carbs":48,
            "food": "fries"
        },
        {
            "date":new Date("2023-04-14"),
            "carbs":0,
            "food": "coke"
        },
        {
            "date":new Date("2023-04-15"),
            "carbs":34,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-16"),
            "carbs":26,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-17"),
            "carbs":36,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-18"),
            "carbs":31,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-19"),
            "carbs":42,
            "food": "burger"
        },
        {
            "date":new Date("2023-04-20"),
            "carbs":35,
            "food": "burger"
        }
    ]
}

function CarbCount() {
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
                Plot.barY(data, {x: "date", y: "carbs", fill: "food"})
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

export default CarbCount;