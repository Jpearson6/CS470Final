import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, InputAdornment, TextField } from "@mui/material";
import { useState, Fragment, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import API from '../../API_Interface/API_Interface'


function SearchBar(props) {
    const { searchFood, searchTerm, setSearchTerm } = props;


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        searchFood(event.target.value);
    };

    return (
        <Container maxWidth="md">
            <TextField
                id="search"
                type="search"
                label="Search"
                value={searchTerm}
                onChange={handleChange}
                sx={{ width: "100%", marginTop: 2 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Container>
    );
}

function DisplayFood(props) {
    const { foodList, selectedFood, addFood, close } = props;
    let tempSelectedFood = [];
    return (
        foodList.length > 0 &&
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="Food table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Food Name
                        </TableCell>
                        <TableCell>
                            Protein(g)
                        </TableCell>
                        <TableCell>
                            Fat(g)
                        </TableCell>
                        <TableCell>
                            Carbs(g)
                        </TableCell>
                        <TableCell>
                            Calories(cal)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        foodList.map((food, idx) => {
                            return (
                                <TableRow key={idx} hover={true}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                                    onClick={() => {
                                        tempSelectedFood = Object.keys(food['foodNutrients']).reduce((obj, i) => {
                                            if (["0", "1", "2", "3"].includes(i)) {
                                                obj[i] = food['foodNutrients'][i]
                                            }
                                            return obj;
                                        }, {});
                                        let tempSelectedFood1 = { foodName: food['description'], ...tempSelectedFood }
                                        addFood(food['description'], tempSelectedFood['3']['value'], tempSelectedFood['0']['value'], tempSelectedFood['2']['value'], tempSelectedFood['1']['value'])

                                    }}
                                >
                                    <TableCell key={"name" + idx}>
                                        {
                                            food['description']
                                        }
                                    </TableCell>
                                    <TableCell key={"protein" + idx}>
                                        {
                                            food["foodNutrients"][0]["value"]
                                        }
                                    </TableCell>
                                    <TableCell key={"fat" + idx}>
                                        {
                                            food["foodNutrients"][1]["value"]
                                        }
                                    </TableCell>
                                    <TableCell key={"carbs" + idx}>
                                        {
                                            food["foodNutrients"][2]["value"]
                                        }
                                    </TableCell>
                                    <TableCell key={"cal" + idx}>
                                        {
                                            food["foodNutrients"][3]["value"]
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default function FoodSearch(props) {
    const { userId, addFoodList, setAddFoodList } = props;
    const [foodList, setFoodList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFood, setSelectedFood] = useState([]);

    async function searchFood(food) {
        const api = new API();
        const foodJSONString = await api.searchFood(food);
        setFoodList(foodJSONString.data.foods);
    }

    async function addFood(FoodName, Calories, Protein, Carbohydrates, Fat) {
        let tempList = [{
            "FoodName": FoodName,
            "Calories": Calories,
            "Protein": Protein,
            "Carbs": Carbohydrates,
            "Fat": Fat
        }, ...addFoodList];
        setAddFoodList(tempList);
    }


    return (
        <Fragment>
            <SearchBar sx={{
                width: 400
            }}
                searchFood={(food) => searchFood(food)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <DisplayFood foodList={foodList} selectedFood={selectedFood} addFood={addFood} />
        </Fragment>
    )
}