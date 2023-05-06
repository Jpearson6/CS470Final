import Homepage from "../Components/Homepage";
import Graphs from "../Components/Graphs";
import Users from "../Components/Users";
import Goals from "../Components/Goals";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddMeal from "../Components/AddMeal";
import DescriptionIcon from '@mui/icons-material/Description';
import FoodSearch from "../Components/FoodSearch/FoodSearch";

const presentationComponents = (userId , setSelectedItem) => {
    return [
        {
            title: 'Homepage',
            component: <Homepage userId={userId} setSelectedItem={setSelectedItem}/>,
            icon: <HomeIcon />
        },
        {
            title: 'Add Meal',
            component: <AddMeal userId={userId}/>,
            icon: <LocalDiningIcon />
        },
        {
            title: 'Graphs',
            component: <Graphs userId={userId}/>,
            icon: <SsidChartIcon />
        },
        {
            title: 'Users',
            component: <Users userId={userId}/>,
            icon: <SupervisedUserCircleIcon />
        },
        {
            title: 'Goals',
            component: <Goals userId={userId}/>,
            icon: <DescriptionIcon />
        }
    ];
};

export {presentationComponents}