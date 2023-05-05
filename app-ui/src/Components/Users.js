import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import API from "../API_Interface/API_Interface.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
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

  //profile defaut
  const initProfile = {
    dob: '',
    sex: "",
    height: 0,
    weight: 0,
    activityLevel: '',
  };

  const [profile, setProfile] = useState(initProfile);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    // khúc này là anh đã có dữ liệu profile ở state rồi thì anh k cần phải khai báo lại chi
    // anh chỉ cần gọi API để update thôi
    // anh có thể console.log(profile) để xem dữ liệu của anh nó như thế nào
    console.log(`User profile ${JSON.stringify(profile)}`);
    // anh có thể gọi API ở đây

    // đừng quên gọi API xong thì set lại setOpen(false) để đóng cái dialog
    // và check tính hợp lệ của dữ liệu

    // check valid
    if (!profile.height || !profile.weight) return;
    const api = new API();
    api.updateUser(userId, profile);
    // xong
    // nhớ là phải đóng cái dialog lại
    setOpen(false);
    // setLoading nếu có
    // set lại cái profile và user nếu có
    fetchUser();
    setProfile(initProfile);
    handleClose();
  };

  const fetchUser = async () => {
    const api = new API();
    try {
      const userInfo = await api.getUserById(userId);
      const userData = userInfo.data[0];
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const api = new API();
    // không khơi tạo function ở đây nhé ah
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const birthDate = new Date(user.dob);
  //console.log(`birthDay :${birthDate}`)
  const age = Math.floor(
    (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );
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


  const handleDateChange = (date) => {
    setProfile({
      ...profile,
      dob: date
    });
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
          <Dialog open={open} onClose={handleClose} maxWidth={false}>
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
              <Stack spacing={2}>

              {/* <DatePicker
                label="Date of birth"
                style={{ width: 245 }}
                value={profile.dob}
                onChange={handleDateChange}
                /> */}




                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Sex
                  </InputLabel>
                  <Select
                    label=""
                    style={{ width: 245 }}
                    value={profile.sex}
                    onChange={(e) =>
                      setProfile({ ...profile, sex: e.target.value })
                    }
                  >
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female </MenuItem>
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
                <InputLabel id="demo-simple-select-label">
                    Activity Level
                </InputLabel>
                <Select
                    label="Activity Level"
                    style={{ width: 245 }}
                    value={profile}
                    onChange={(e) =>
                    setProfile({ ...profile, activityLevel: e.target.value })
                    }
                >
                    <MenuItem value="sedentary">Sedentary</MenuItem>
                    <MenuItem value="lightly active">Lightly Active</MenuItem>
                    <MenuItem value="moderately active">
                    Moderately Active
                    </MenuItem>
                    <MenuItem value="very active">Very Active</MenuItem>
                </Select>
                </FormControl>

                <Button
                  onClick={handleUpdate && handleClose}
                  style={{ textAlign: "center" }}
                >
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
