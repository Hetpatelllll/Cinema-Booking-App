import React, { useState } from 'react'
import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';


const labelstyle = { mt: 1, mb: 1 };

const AuthForm = ({onSubmit,isAdmin}) => {

    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({name:"",email:"",password:""});

    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
            [e.target.email] : e.target.value,
            [e.target.password] : e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        // here Identify send login request or signup Request and user can't login in admin form
        onSubmit({inputs, signup : isAdmin ? false : isSignup});
        
    }

    return (
        <Dialog PaperProps={{ style: { borderRadius: 25 } }} open={true}>

            <Box sx={{ ml: "auto", padding: 1 }} >
                <IconButton LinkComponent={Link} to="/" >
                    <CloseRoundedIcon />
                </IconButton>
            </Box>

            <Typography variant='h4' textAlign={'center'}>
            {isSignup ? "SignUp" : "Login"}
            </Typography>

            <form onSubmit={handleSubmit} >
                <Box padding={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={400} margin={'auto'} alignContent={'center'} >

                    {
                      !isAdmin &&  isSignup && ( <> <FormLabel sx={labelstyle} >Name</FormLabel>
                                       <TextField value={inputs.name} onChange={handleChange} margin='normal' variant='standard' type='text' name='name' /> 
                                    </>)
                    }

                    <FormLabel sx={labelstyle} >Email</FormLabel>
                    <TextField value={inputs.email} onChange={handleChange} margin='normal' variant='standard' type='email' name='email' />

                    <FormLabel sx={labelstyle} >Password</FormLabel>
                    <TextField value={inputs.password} onChange={handleChange} margin='normal' variant='standard' type='password' name='password' />

                    <Button type='submit' fullWidth sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }} variant='contained' >{isSignup ? "SignUp" : "Login"}</Button>
                   {!isAdmin && <Button onClick={()=>setIsSignup(!isSignup)} fullWidth sx={{ mt: 2, borderRadius: 10 }} variant='contained'>switch TO {isSignup? "Login":"Sign Up"} </Button>}

                </Box>
            </form>
            
        </Dialog>
    )
}

export default AuthForm