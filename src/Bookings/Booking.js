import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../api-helpers/apiHelpers';
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../tictketbookinglogo.png'

const Booking = () => {

    const [movie, setMovie] = useState();
    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });

    const id = useParams().id;
    console.log(id)

    useEffect(() => {
        getMovieDetails(id).then((res) => setMovie(res.movie)).catch((err) => console.log(err))
    }, [id])

    // console.log(movie)

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        newBooking({ ...inputs, movie: movie._id }).then((res) => console.log(res)).catch((err) => console.log(err));
        toast.success('Booking Successfully');
    }

    return (


        <div>
            {
                movie && <Fragment>
                    <Typography padding={3} fontFamily={'fantasy'} variant='h4' textAlign={'center'}>Book Tickets Of Movie:{movie.title}</Typography>

                    <Box display={'flex'} justifyContent={'center'}>

                        <Box marginRight={"auto"} display={'flex'} justifyContent={"column"} flexDirection={'column'} paddingTop={3} width={"50%"}>
                            <img width={"80%"} height={"350px"} src={movie.posterUrl} alt="" />
                            <Box width={"80%"} marginTop={3} padding={2}>
                                <Typography paddingTop={2}>{movie.description}</Typography>

                                {/* render actor array */}
                                <Typography fontWeight={"bold"} marginTop={1}>Actors:
                                    {movie.actors.map((actor) => " " + actor + " ")}
                                </Typography>
                                <Typography fontWeight={'bold'} marginTop={1}>
                                    Release Date: {new Date(movie.releaseDate).toDateString()}
                                </Typography>

                            </Box>
                        </Box>

                        <Box width={"50%"} paddingTop={3}  >

                            <img src={logo} alt=""  height={"350px"} width={"700px"} />

                            <form onSubmit={handleSubmit} >
                                <Box padding={5} margin={"auto"} display={'flex'} flexDirection={'column'}>
                                    <FormLabel>Seat No:</FormLabel>
                                    <TextField onChange={handleChange} value={inputs.seatNumber} name='seatNumber' type='string' margin='normal' variant='standard' />
                                    <FormLabel>Booking Date:</FormLabel>
                                    <TextField onChange={handleChange} value={inputs.date} name='date' type='date' margin='normal' variant='standard' />
                                    <Button type='submit' sx={{ mt: 3 }} >Book Now</Button>
                                </Box>
                            </form>
                        </Box>

                    </Box>
                </Fragment>
            }
            <ToastContainer />
        </div>

    )
}

export default Booking