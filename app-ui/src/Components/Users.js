import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText 
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 'auto',
    marginTop: 50,
    maxWidth: 600
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  pos: {
    marginBottom: 12,
  },
});

function Profile(props) {
  const { Id, Email, Password, Name, Sex, Height, Weight, ActivityLevel, DailyCalorieGoal, dob, LbsPerWeek, MacroFat, MacroCarbs, MacroProtein } = props.user;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>{Name}</Typography>
        <List>
          <ListItem>
            <ListItemText primary="ID" secondary={Id} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={Email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Password" secondary={Password} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sex" secondary={Sex} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Height" secondary={Height} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Weight" secondary={Weight} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Activity Level" secondary={ActivityLevel} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Daily Calorie Goal" secondary={DailyCalorieGoal} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Date of Birth" secondary={dob} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Weight Change Goal" secondary={`${LbsPerWeek} lbs per week`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Macronutrient Goals" />
            <List>
              <ListItem>
                <ListItemText primary="Fat" secondary={`${MacroFat} g`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Carbs" secondary={`${MacroCarbs} g`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Protein" secondary={`${MacroProtein} g`} />
              </ListItem>
            </List>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default Profile;
