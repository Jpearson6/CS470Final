import {Fragment, useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";


const FoodTableAttributes = [
    {
        title: 'Date',
        attributeDBName: 'Date',
        align: 'left'
    },
    {
        title: 'Food Name',
        attributeDBName: 'FoodName',
        align: 'left'
    },
    {
        title: 'Calories',
        attributeDBName: 'Calories',
        align: 'left'
    },
    {
        title: 'Fat',
        attributeDBName: 'Fat',
        align: 'left'
    },
    {
        title: 'Protein',
        attributeDBName: 'Protein',
        align: 'left'
    },
    {
        title: 'Carbs',
        attributeDBName: 'Carbohydrates',
        align: 'left'
    }
]
export default function OneDayList(props) {
    const [food, setFood] = useState(props.foodData);

    const TRow = (FoodObject) => {
        const thisIsDumb = FoodObject['foodObject']

        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                FoodTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            thisIsDumb[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }

    return <Fragment>
        <Typography padding={3} variant={"h5"}> List View ) </Typography>
        {
            food.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="route table">
                    <TableHead>
                        <TableRow>
                            {
                                FoodTableAttributes.map((attr, idx) =>
                                    <TableCell  key={idx}
                                                align={attr.align}>
                                        {attr.title}
                                    </TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            food.map((food, idx) => (
                                <TRow foodObject={food} key={idx} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </Fragment>
}