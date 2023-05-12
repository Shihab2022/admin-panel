import { Box, Button, Card, CardContent, CardHeader, Container, Divider, TextField } from '@mui/material';
import React from 'react';

export default function ChangePassword(){
    return (
        <>
          <Container>
          <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider/>
        <CardContent>
          <TextField
            fullWidth
            label="Enter Your Current Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Enter Your New Password"
            margin="normal"
            name="confirm"
            type="password"
            variant="outlined"
          />
          <TextField
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
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            fullWidth
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
          </Container>
        </>
    );
};
