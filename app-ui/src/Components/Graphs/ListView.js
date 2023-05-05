import {Typography} from "@mui/material";

function ListView(props) {
    const attribute = props['attribute']

    return <Typography>
        List View For {attribute} Here
    </Typography>
}
export default ListView