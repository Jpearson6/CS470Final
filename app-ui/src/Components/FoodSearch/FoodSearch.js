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
import API from '../../API_Interface/API_Interface'


function SearchBar( props ) {
    const {searchFood, searchTerm, setSearchTerm} = props;


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
              <SearchIcon/>
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

    async function searchFood(food) {
        const api = new API();
        const foodJSONString = await api.searchFood(food);
        console.log(`Food from the API Call ${JSON.stringify(foodJSONString.data.foods)}`);
        setFoodList(foodJSONString.data.foods);
    }

    return (
        <Fragment>
            <Typography>
                Search Food Here
            </Typography>
            <SearchBar 
                searchFood={(food) => searchFood(food)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
            <DisplayFood foodList={foodList}/>
        </Fragment>
    )
}