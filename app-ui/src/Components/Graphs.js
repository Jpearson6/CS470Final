import {Typography} from "@mui/material";
import API from '../API_Interface/API_Interface'
import { useState , Fragment, useEffect } from "react";

export default function Graphs() {
    console.log("here");
        const [foodLog, setFoodLog] = useState([]);
        //console.log(`in EmployeeTable routes contains is ${JSON.stringify(employees)}`);
    
    
        useEffect(() => {
            const api = new API();
    
            async function getEmployees() {
                const employeesJSONString = await api.allFoodByUser();
                console.log(employeesJSONString.data);
                setFoodLog(employeesJSONString.data);
            }
    
            getEmployees();
        }, []);


    return <Typography>
        Graphs here.
    </Typography>
}