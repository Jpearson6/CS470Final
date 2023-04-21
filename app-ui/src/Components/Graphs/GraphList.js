import CalorieCount from "./CalorieCount";
import FatCount from "./FatCount";
import ProteinCount from "./ProteinCount";
import CarbCount from "./CarbCount";


const GraphList = () => {
    return [
        {
            title: 'Calorie Count',
            component: <CalorieCount />
        },
        {
            title: 'Fat Count',
            component: <FatCount />
        },
        {
            title: 'Protein Count',
            component: <ProteinCount />
        },
        {
            title: 'Carb Count',
            component: <CarbCount />
        }
    ];
};

export {GraphList}