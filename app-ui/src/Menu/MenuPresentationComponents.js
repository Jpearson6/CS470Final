import Homepage from "../Components/Homepage";
import Food from "../Components/Food";
import Graphs from "../Components/Graphs";
import Users from "../Components/Users";
import Macros from "../Components/Macros";
import WeightGoals from "../Components/WeightGoals";
import Goals from "../Components/Goals";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FoodSearch from "../Components/FoodSearch/FoodSearch";

const presentationComponents = () => {
    return [
        {
            title: 'Homepage',
            component: <Homepage />,
            icon: <HomeIcon />
        },
        {
            title: 'Food',
            component: <FoodSearch />,
            icon: <LocalDiningIcon />
        },
        {
            title: 'Graphs',
            component: <Graphs />,
            icon: <SsidChartIcon />
        },
        {
            title: 'Users',
            component: <Users />,
            icon: <SupervisedUserCircleIcon />
        },
        {
            title: 'Macros',
            component: <Macros />,
            icon: <SupervisedUserCircleIcon />
        },
        {
            title: 'Goals',
            component: <Goals />,
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