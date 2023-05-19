import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ChangePassword() {
  const [data,setData]=useState({})
  const user = useSelector((state) => state.user.info);
  console.log('user',user);
  console.log('data',data);
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update Your Password
          </Typography>
        </Stack>
        <Card>
          {/* <CardHeader subheader="Update password" title="Password" /> */}
          <Divider />
          <CardContent>
            <TextField
            onChange={(e)=>setData({...data,password:e.target.value})}
              required
              fullWidth
              label="Enter Your Current Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <TextField
            onChange={(e)=>setData({...data,newPassword:e.target.value})}
              required
              fullWidth
              label="Enter Your New Password"
              margin="normal"
              name="confirm"
              type="password"
              variant="outlined"
            />
            <TextField
            onChange={(e)=>setData({...data,confirmNewPassword:e.target.value})}
              required
              fullWidth
              label="Confirm Password"
              margin="normal"
              name="confirmNewPassword"
              type="password"
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button color="primary" fullWidth variant="contained">
              Update
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}
