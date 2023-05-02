import Homepage from "../Components/Homepage";
import Graphs from "../Components/Graphs";
import Users from "../Components/Users";
import Macros from "../Components/Macros";
import WeightGoals from "../Components/WeightGoals";
import Goals from "../Components/Goals";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddMeal from "../Components/AddMeal";

const presentationComponents = (userId) => {
    return [
        {
            title: 'Homepage',
            component: <Homepage userId={userId}/>,
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
            title: 'Macros',
            component: <Macros userId={userId}/>,
            icon: <SupervisedUserCircleIcon />
        },
        {
            title: 'Goals',
            component: <Goals userId={userId}/>,
            icon: <SupervisedUserCircleIcon />
        },
        {
            title: 'Weight Goals',
            component: <WeightGoals />,
            icon: <SupervisedUserCircleIcon />
        },
    ];
};

export {presentationComponents}