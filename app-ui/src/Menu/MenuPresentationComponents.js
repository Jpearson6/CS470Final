import Homepage from "../Components/Homepage";
import FoodSearch from "../Components/FoodSearch/FoodSearch";

const presentationComponents = () => {
    return [
        {
            title: 'Homepage',
            component: <Homepage />
        },
        {
            title: "Food Search",
            component: <FoodSearch/>
        }
    ];
};

export {presentationComponents}