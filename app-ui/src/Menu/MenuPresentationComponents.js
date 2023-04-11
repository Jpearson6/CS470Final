import Homepage from "../Components/Homepage";
import Food from "../Components/Food";
import Graphs from "../Components/Graphs";
import Users from "../Components/Users";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const presentationComponents = () => {
    return [
        {
            title: 'Homepage',
            component: <Homepage />,
            icon: <HomeIcon />
        },
        {
            title: 'Food',
            component: <Food />,
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
    ];
};

export {presentationComponents}