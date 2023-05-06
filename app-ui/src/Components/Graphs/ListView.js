import {Stack} from "@mui/material";
import OneDayList from "./OneDayList";
import {updateDate} from "./DataManip";

export default function ListView(props) {
    const foodData = props['foodData'].map((item) => updateDate(item))

    const groupedData = foodData.reduce((acc, item) => {
        const key = item.Date;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, []);

    console.log(groupedData);

    return <OneDayList foodData={foodData} />
}