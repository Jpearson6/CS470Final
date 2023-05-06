import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import API from "../API_Interface/API_Interface.js";
import Pic from "../picture/Avt.js";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/system";

const userStyle = {
  display: "flex",
  position: "relative",
};

const UserProfile = (props) => {
  const [open, setOpen] = useState(false);
  const { userId } = props;
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const api = new API();
    try {
      const userInfo = await api.getUserById(userId);
      const userData = userInfo.data[0];

      setUser(userData);
      console.log(`User data: ${JSON.stringify(user)}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    //const api = new API();
    // không khơi tạo function ở đây nhé ah
    // eslint-disable-next-line
    fetchUser();
  }, [userId]);

  //profile defaut
  const initProfile = {
    dob: "",
    sex: "",
    height: 0,
    weight: 0,
    activityLevel: "Sedentary",
  };

  const [profile, setProfile] = useState(initProfile);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const birthDate = new Date(user.dob);

  //console.log(`birthDay :${birthDate}`)
  const age = Math.floor(
    (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  const handleDateChange = (newValue) => {
    let tempDate = "";
    tempDate += newValue["$y"];
    tempDate += "-";
    tempDate += newValue["$M"];
    tempDate += "-";
    tempDate += newValue["$D"];
    setProfile({
      ...profile,
      dob: tempDate,
    });
  };

  const height = user.Height;
  const weight = user.Weight;
  const sex = user.Sex;
  const activeLv = user.ActivityLevel;
  const lbPerweek = user.LbsPerWeek;
  let status;
  if (lbPerweek === 0) {
    status = "You are maintain";
  } else if (lbPerweek < 0) {
    status = "You are losing weight";
  } else {
    status = "You are gaining weight";
  }

  const handleUpdate = () => {
    if (!profile.height || !profile.weight) return;
    const api = new API();
    console.log(`User profile ${JSON.stringify(profile)}`);
    api.updateUser(userId, profile);
    setOpen(false);
    fetchUser();
    setProfile(profile);
    handleClose();
  };

  return (
    <Box component="span" sx={userStyle}>
      <Box>
        <Pic />
      </Box>
      <Box
        sx={{
          alignItems: "center",
          position: "relative",
          margin: "40px",
          left: "40px",
        }}
      >
        <Box sx={{ background: "white" }}>
          <Typography variant="h6">Age: {age}</Typography>
        </Box>

        <Box sx={{ background: "white", top: "30px", position: "relative" }}>
          <Typography variant="h6">Sex: {sex}</Typography>
        </Box>

        <Box sx={{ background: "white", top: "60px", position: "relative" }}>
          <Typography variant="h6">Height: {height}</Typography>
        </Box>

        <Box sx={{ background: "white", top: "90px", position: "relative" }}>
          <Typography variant="h6">Weight: {weight}</Typography>
        </Box>

        <Box sx={{ background: "white", top: "120px", position: "relative" }}>
          <Typography variant="h6">Activity Level: {activeLv}</Typography>
        </Box>

        <Box sx={{ background: "white", top: "150px", position: "relative" }}>
          <Typography variant="h6">Weekly Macros : {status}</Typography>
        </Box>

        <Box sx={{ background: "white", top: "180px", position: "relative" }}>
          <Button onClick={handleClickOpen}>Update</Button>

          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={false}
            disableEnforceFocus
          >
            <DialogTitle>
              <Typography
                align="center"
                style={{ fontWeight: "bold", fontSize: 24 }}
              >
                Profile
              </Typography>
            </DialogTitle>
            <DialogContent
              style={{
                width: 400,
                height: 500,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2} alignItems={"center"}>
                <Box style={{ width: 250 }}>
                  <DatePicker
                    width="250px"
                    label="Date of birth"
                    style={{ width: 245 }}
                    onChange={(newValue) => {
                      handleDateChange(newValue);
                    }}
                  />
                </Box>

                <FormControl>
                  <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                  <Select
                    label=""
                    style={{ width: 245 }}
                    value={profile.sex || ""}
                    onChange={(e) => {
                      const sex = e.target.value;
                      if (sex === "Male" || sex === "Female") {
                        setProfile({ ...profile, sex });
                      }
                    }}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Height"
                  style={{ width: 245 }}
                  value={profile.height}
                  onChange={(e) =>
                    setProfile({ ...profile, height: e.target.value })
                  }
                />

                <TextField
                  label="Weight"
                  style={{ width: 245 }}
                  value={profile.weight}
                  onChange={(e) =>
                    setProfile({ ...profile, weight: e.target.value })
                  }
                />

                <FormControl>
                  <InputLabel>Activity Level</InputLabel>
                  <Select
                    label="Activity Level"
                    style={{ width: 245 }}
                    value={profile.activityLevel || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, activityLevel: e.target.value })
                    }
                  >
                    <MenuItem value="Sedentary">Sedentary</MenuItem>
                    <MenuItem value="Lightly Active">Lightly Active</MenuItem>
                    <MenuItem value="Moderately Active">
                      Moderately Active
                    </MenuItem>
                    <MenuItem value="Very Active">Very Active</MenuItem>
                  </Select>
                </FormControl>

                <Button onClick={handleUpdate} style={{ textAlign: "center" }}>
                  {" "}
                  Update{" "}
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
