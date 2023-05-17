import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/login");
      };
    return (
        <>
            <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={handleLogout} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>  
        </>
    );
};

export default LogOut;