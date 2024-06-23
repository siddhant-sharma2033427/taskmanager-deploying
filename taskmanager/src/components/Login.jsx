import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import {Link} from "react-router-dom"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//importing api from api.js
import { login } from '../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("handle submit pressed");
            const token = await login({ email, password });
            console.log("token", token);
            if (token.data.success === true) {
                localStorage.setItem('token', token.data.authtoken);
                navigate('/');
            }
        } catch (error) {
            console.log("error occurred");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const paperStyle = { padding: 20, height: '70vh', width: '280px', margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };
    const textFieldStyle = { margin: '8px 0' };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Email'
                        placeholder='Enter Email'
                        variant="outlined"
                        fullWidth
                        required
                        style={textFieldStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        style={textFieldStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
                        Login
                    </Button>
                </form>
                <Typography>
                    Don't you have an account?
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;
