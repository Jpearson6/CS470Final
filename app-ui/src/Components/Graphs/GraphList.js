import CalorieCount from "./CalorieCount";
import FatCount from "./FatCount";
import ProteinCount from "./ProteinCount";
import CarbCount from "./CarbCount";


const GraphList = (foodData) => {
    return [
        {
            title: 'Calorie Count',
            component: <CalorieCount foodData = {foodData} />
        },
        {
            title: 'Fat Count',
            component: <FatCount foodData = {foodData} />
        },
        {
            title: 'Protein Count',
            component: <ProteinCount foodData = {foodData} />
        },
        {
            title: 'Carb Count',
            component: <CarbCount foodData = {foodData} />
        }
    ];
};

export {GraphList}