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
    const {foodList , selectedFood , addFood} = props;
    let tempSelectedFood = [];
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
                            <TableCell key={idx} onClick={() =>{
                                tempSelectedFood = Object.keys(food['foodNutrients']).reduce((obj, i) => {
                                    //console.log(i);
                                    if(["0" , "1" , "2" , "3"].includes(i)){
                                        obj[i] = food['foodNutrients'][i]
                                    }
                                    return obj;
                                }, {});
                                let tempSelectedFood1 = {foodName: food['description'] ,  ...tempSelectedFood}
                                console.log(tempSelectedFood1);
                                addFood(food['description'], tempSelectedFood['3']['value'], tempSelectedFood['0']['value'], tempSelectedFood['2']['value'], tempSelectedFood['1']['value'] )

                            }}>
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
    const [selectedFood, setSelectedFood] = useState([]);

    useEffect(() => {
        if(foodList.length === 0)
            return;
        //console.log("foodList contains ", foodList);
    }, [foodList]);

    async function searchFood(food) {
        const api = new API();
        const foodJSONString = await api.searchFood(food);
        //console.log(`Food from the API Call ${JSON.stringify(foodJSONString.data.foods)}`);
        setFoodList(foodJSONString.data.foods);
    }

    async function addFood(FoodName, Calories, Protein, Carbohydrates, Fat) {
        const api = new API();
        api.addFoodByUser(1, FoodName, Calories, Protein, Carbohydrates, Fat);
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
            <DisplayFood foodList={foodList} selectedFood={selectedFood} addFood={addFood}/>
        </Fragment>
    )
}