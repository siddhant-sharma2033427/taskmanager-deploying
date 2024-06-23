import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = ({setAddTask}) => {
    const handleLogout =()=>{
        localStorage.removeItem('token')
        window.location.reload()
    }
    const handleAddTask =()=>{
        setAddTask(true)
        console.log("g")
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontSize:"20px"}}>
                    TaskManager
                </Typography>
                <Button  variant="contained" onClick={handleAddTask} sx={{fontSize:"20px",marginRight:"10px"}}>
                    Add Task
                </Button>
                <Button variant='contained' onClick={handleLogout} sx={{fontSize:"20px"}}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
