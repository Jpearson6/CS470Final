import React, {useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";

const updateDate = (item) => {
    const date = new Date(item['LogDate']);

    const dayString = (date.getMonth() + 1).toString() + "/" + (date.getDate()).toString();

    return {...item, "dayString":dayString}
}
function FatCount(props) {
    const chartRef = useRef();
    const foodData = props['foodData'].map(item => updateDate(item));

    console.log(foodData);

    useEffect(() => {
        if (foodData === undefined) return;
        const chart = Plot.plot({
            y: {
                grid: true
            },
            x: {
                ticks: 7
            },
            color: {
                legend: true
            },
            marks: [
                Plot.barY(foodData, {
                    x: "dayString",
                    y: "Fat",
                    stroke: "Black",
                    fill: "Green",
                    fillOpacity: .75,
                    title: (d) => `${d.FoodName} \n ${d.Fat}`,
                })
            ]
        });
        chartRef.current.append(chart);
        console.log(chart)
        return () => chart.remove();
    }, [foodData]);


    return (
        <div ref={chartRef} />
    );
}

export default FatCount;