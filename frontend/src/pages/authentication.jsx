import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Snackbar } from '@mui/material';
import { AuthContext } from '../context/authContext';
import Navbar from '../Navbar';
import Footer from '../footer';


const defaultTheme = createTheme();

export default function Authentication() {


    let [username , setUsername] = React.useState();
    let [password , setPassword] = React.useState();
    let [name , setName] = React.useState();
    let [error , setError ] = React.useState("");
    let [message , setMessage] = React.useState();
    let [formState , setFormState] = React.useState(0);
    let [open , setOpen] = React.useState(0);

    let {handleLogin , handleRegister} = React.useContext(AuthContext);
    

    let handleAuth = async ()=>{
         
        if(formState === 0){
            
            try{

                let res = await handleLogin(username , password);

            }
            catch(err){
                let message = (err.response.data.msg);
                setError(message);
                
            }
        }
        if(formState == 1){
           try{
                let result  = await handleRegister(name , username , password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
            catch(err){

                let message = (err.response.data.msg);
                setError(message);
            }
        }
        

    }

    return (
        <>
        <Navbar/>
        <ThemeProvider theme={defaultTheme}>
        <Grid 
            container 
            component="main" 
            sx={{ 
                height: '100vh', 
                justifyContent: 'center', // horizontal center
                alignItems: 'center',     // vertical center
            }}
            >
            <CssBaseline />
                        <Grid 
                            item 
                            component={Paper} 
                            elevation={6} 
                            square 
                            sx={{ 
                            width: 400,   // fixed width
                            maxWidth: '100%', 
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}
                        >
                            <Box
                            sx={{
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',  // fill the fixed width of Paper
                            }}
                            >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>

                            <div>
                                <Button variant={formState === 0 ? "contained" : ""} onClick={()=>setFormState(0)}>
                                Sign In
                                </Button>
                                <Button variant={formState === 1 ? "contained" : ""} onClick={()=>setFormState(1)}>
                                Sign Up
                                </Button>
                            </div>

                            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                                {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    autoFocus
                                />
                                )}

                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                />
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                />

                                <p style={{ color: "red" }}>{error}</p>

                                <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                                >
                                {formState === 0 ? "Login" : "Register"}
                                </Button>
                            </Box>
                            </Box>
                        </Grid>
            
            </Grid>

            <Snackbar open={open} autoHideDuration={4000}  message={message}/>


        </ThemeProvider>
        <Footer/>

        </>
    );
}