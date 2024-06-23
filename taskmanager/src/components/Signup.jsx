import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, IconButton, InputAdornment } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//importing api from api.js
import { createUser } from '../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }
        try {
            console.log("handle submit pressed");
            const data = await createUser({ email, password, name });
            console.log(data.data.authtoken);
            if (data.data.success === true ) {
                localStorage.setItem('token', data.data.authtoken);
                navigate('/');
            } else {
                console.log("Error: ", data.message);
            }
        } catch (error) {
            console.log("Error occurred:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const paperStyle = { padding: 20, width: '280px', margin: '20px auto' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };
    const textFieldStyle = { margin: '8px 0' };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign up</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Name'
                        placeholder='Enter Name'
                        variant="outlined"
                        fullWidth
                        required
                        style={textFieldStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <TextField
                        label='Confirm Password'
                        placeholder='Enter password again'
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        style={textFieldStyle}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={toggleConfirmPasswordVisibility}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
                        Sign up
                    </Button>
                </form>
                <Typography>
                    Already have an account?
                    <Link href="/login">
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;
