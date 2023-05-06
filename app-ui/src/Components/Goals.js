import React, {Fragment, useState, useMemo} from "react";
import OverallGoals from './OverallGoals';
import WeightGoals from './WeightGoals';
import Macros from './Macros';

export default function Goals(props) {
    const {userId} = props;

    const [displayOverall, setDisplayOverall] = useState(true);
    const[editWeightGoals, setEditWeightGoals] = useState(false);
    const[editNutriGoals, setEditNutriGoals] = useState(false);

    function updateDisplay (displayString){
        if(displayString === 'overall'){
            setDisplayOverall(true);
            setEditWeightGoals(false);
            setEditNutriGoals(false);
        }
        else if(displayString === 'editWeight'){
            setDisplayOverall(false);
            setEditWeightGoals(true);
            setEditNutriGoals(false);
        }
        else{
            setDisplayOverall(false);
            setEditWeightGoals(false);
            setEditNutriGoals(true);
        }
    }


    return(
        <Fragment>
            {displayOverall && <OverallGoals userId={userId} updateDisplayCallBack={(displayString) => updateDisplay(displayString)}/>}
            {editWeightGoals && <WeightGoals userId={userId} updateDisplayCallBack={(displayString) => updateDisplay(displayString)}/>}
            {editNutriGoals && <Macros userId={userId} updateDisplayCallBack={(displayString) => updateDisplay(displayString)}/>}
        </Fragment>
    )

}