import {Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, InputAdornment, TextField } from "@mui/material";
import { useState , Fragment, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Axios from 'axios';


const params = {
    api_key: 'lsbtkmq13XtiD3eAfTGpbhJbJFUGwX8UToxafkaJ',
    pageSize: 5,
    dataType: ["Survey (FNDDS)"]
}


function SearchBar( props ) {
    const {searchFood, getApiUrl, searchTerm, setSearchTerm} = props;

  const handleClick = () => {
    //console.log("Api Url is " , api_url);
    //searchFood();
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    //let tempApiUrl = getApiUrl(event.target.value);
    searchFood(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 20 }}>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: 600 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon onClick={handleClick}/>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}

function DisplayFood (props) {
    const {foodList} = props;
    return(
        foodList.length > 0 &&
        <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="Employee table">
            <TableHead>
                <TableRow>
                    <Typography>
                        Food Name
                    </Typography>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                        foodList.map((food, idx) => {
                            return(
                            <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell key={idx}>
                                    {
                                        food['description']
                                    }
                                </TableCell>
                            </TableRow>
                        )})
                    }
            </TableBody>
        </Table>
    </TableContainer>
    )

}

export default function FoodSearch() {
    const [foodList, setFoodList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if(foodList.length === 0)
            return;
        console.log("foodList contains ", foodList);
    }, [foodList]);

    const searchFood = (food) => {
        let api_url = getApiUrl(food);
        Axios.get(api_url).then((response) => {
            let tempList = response.data.foods;
            setFoodList(tempList);
        });
    }
    const getApiUrl = (food) => {
        return(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(food)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=5`)
    }

    return (
        <Fragment>
            <Typography>
                Search Food Here
            </Typography>
            <SearchBar 
                searchFood={(food) => searchFood(food)}
                getApiUrl={(food) => getApiUrl(food)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
            <DisplayFood foodList={foodList}/>
        </Fragment>
    )
}