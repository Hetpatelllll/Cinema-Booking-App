import React, { useEffect, useState } from 'react'
import { AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../api-helpers/apiHelpers';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [value, setValue] = useState();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data.movies)).catch(err => console.log(err));
    }, [])

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout())
    }

    const handleSearch = (e,value)=>{
        const movie = movies.find((key)=>key.title === value);
        if(isUserLoggedIn)
        {
            navigate(`/booking/${movie._id}`)
        }
    }

    return (
        <div>
            <AppBar position='sticky' sx={{ bgcolor: "#2b2d42" }} >
                <Toolbar>
                    <Box width={"20%"} >
                        <IconButton LinkComponent={Link} to="/" >
                            <MovieIcon />
                        </IconButton>
                    </Box>
                    <Box width={"30%"} margin={"auto"} >
                        <Autocomplete
                            onChange={handleSearch}
                            freeSolo
                            options={movies && movies.map((option) => option.title)}
                            renderInput={(params) => <TextField sx={{ input: { color: "white" } }} variant='standard' {...params} placeholder="Search Movie" />}
                        />
                    </Box>
                    <Box display={'flex'}>
                        <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, val) => setValue(val)} >
                            <Tab LinkComponent={Link} to="/movies" label="MOVIES" />

                            {!isAdminLoggedIn && !isUserLoggedIn && (<>
                                <Tab LinkComponent={Link} to="/admin" label="ADMIN" />
                                <Tab LinkComponent={Link} to="/auth" label="Sign Up" />
                            </>)}

                            {isUserLoggedIn &&
                                (<>
                                    <Tab LinkComponent={Link} to="/user" label="PROFILE" />
                                    <Tab onClick={() => logout(false)} LinkComponent={Link} to="/" label="Logout" />
                                </>)
                            }
                            {isAdminLoggedIn &&
                                (<>
                                    <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                                    <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                                    <Tab onClick={() => logout(true)} LinkComponent={Link} to="/" label="Logout" />
                                </>)
                            }
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header