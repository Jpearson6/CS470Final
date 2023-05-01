import {InputAdornment, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import React, {Fragment} from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function WeightGoals() {
    return (
        <Fragment>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-multiline-static"
                        label = "Starting Weight"
                        placeholder=""
                        multiline
                        style={{width:200}}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                        }}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Goal Weight"
                        placeholder=""
                        multiline
                        style={{width:200}}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                        }}
                    />

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Weekly Goal</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Weekly Goal"
                            style = {{width: 300}}
                        >
                            <MenuItem value="sedentary">Lose 0.5 lbs per week</MenuItem>
                            <MenuItem value="lightly active">Lose 1 lb per week</MenuItem>
                            <MenuItem value="moderately active">Lose 1.5 lbs per week</MenuItem>
                            <MenuItem value="moderately active">Lose 2 lbs per week</MenuItem>
                            <MenuItem value="moderately active">Maintain weight</MenuItem>
                            <MenuItem value="moderately active">Gain 0.5 lbs per week</MenuItem>
                            <MenuItem value="moderately active">Gain 1 lb per week</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Activity Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Activity Level"
                            style = {{width: 300}}
                        >
                            <MenuItem value="sedentary">Sedentary</MenuItem>
                            <MenuItem value="lightly active">Lightly Active</MenuItem>
                            <MenuItem value="moderately active">Moderately Active</MenuItem>
                            <MenuItem value="very active">Very Active</MenuItem>
                        </Select>
                    </FormControl>
                    <Button>
                        Save
                    </Button>
                </Stack>
            </Box>
        </Fragment>
    )
}