import CalorieCount from "./CalorieCount";
import FatCount from "./FatCount";
import ProteinCount from "./ProteinCount";
import CarbCount from "./CarbCount";


const GraphList = (foodData, timeframe) => {
    return [
        {
            title: 'Calorie Count',
            component: <CalorieCount foodData = {foodData} timeframe = {timeframe} />
        },
        {
            title: 'Fat Count',
            component: <FatCount foodData = {foodData} timeframe = {timeframe}/>
        },
        {
            title: 'Protein Count',
            component: <ProteinCount foodData = {foodData} timeframe = {timeframe}/>
        },
        {
            title: 'Carb Count',
            component: <CarbCount foodData = {foodData} timeframe = {timeframe}/>
        }
    ];
};

export {GraphList}