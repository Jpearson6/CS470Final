import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Grid, IconButton, Box } from '@mui/material';
import API from '../API_Interface/API_Interface.js';
import Pic from '../picture/Avt.js';
import { useMemo } from 'react';


const userStyle = {
    display: 'flex',
    position: 'relative'
}



const UserProfile = (props) => {
  const { userId } = props;
  const [user, setUser] = useState(null);
  
  

  useEffect(() => {
    if(!userId) return;
    const api = new API();

    async function fetchUser() {
        try {
            const userInfo = await api.getUserById(userId);
            const userData = userInfo.data[0];
            setUser(userData);
            
            // if(lbPerweek === 0){
            //     setStatus('You are maintain')
            // } else if (lbPerweek > 0){
            //     setStatus('You are gain weight')
            // } else {
            //     setStatus('You are losing weight')
            // }

        } catch(error) {
            console.error(error);
        }
    }

    fetchUser();
}, [userId])



  if (!user) {
    return <div>Loading...</div>;
  }



  const birthDate = new Date(user.dob);
  //console.log(`birthDay :${birthDate}`)
  const age = Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
  const height = user.Height;
  const weight = user.Weight;
  const sex = user.Sex;
  const activeLv = user.ActivityLevel
  const lbPerweek = user.LbsPerWeek
  let status
  if(lbPerweek === 0) {
    status = 'You are maintain'
  } else if(lbPerweek < 0){
    status = 'You are losing weight'
  } else {
    status = 'You are gaining weight'
  }
  

  

  return (
    <Box component="span" sx = {userStyle}>
       <Box>
        <Pic/>   
       </Box>
       <Box sx={{   alignItems: 'center', 
                    position: "relative",
                    margin : "40px",
                    left : '40px' }}>
            <Box sx = {{background : 'white'}}>
                <Typography variant="h6">Age: {age}</Typography>
            </Box>  

            <Box sx = {{background : 'white', top: '30px', position: 'relative'}}>
                <Typography variant="h6">Sex: {sex}</Typography>
            </Box> 

            <Box sx = {{background : 'white', top: '60px', position: 'relative'}}>
                <Typography variant="h6">Height: {height}</Typography>
            </Box>

            <Box sx = {{background : 'white', top: '90px', position: 'relative'}}>
                <Typography variant="h6">Weight: {weight}</Typography>
            </Box>

            <Box sx = {{background : 'white', top: '120px', position: 'relative'}}>
                <Typography variant="h6">Activity Level: {activeLv}</Typography>
            </Box>
            <Box sx = {{background : 'white', top: '150px', position: 'relative'}}>
                <Typography variant="h6">Weekly Macros : {status}</Typography>
            </Box>

       </Box>       
    </Box>
  );
};

export default UserProfile;
