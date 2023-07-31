import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/apiHelpers'
import Carousel from './Carousell'

const HomePage = () => {

  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err));
  },[])

  // console.log(movies);

  return (
    <Box width={"100%"} height={"100vh"} marginTop={2} margin={"auto"}  >


      <Carousel />

      <Box padding={5} margin="auto" >
        <Typography variant="h4" textAlign={"center"}>Latest Releases</Typography>
      </Box>

      {/* render All movie cards */}
      <Box gap={3} margin="auto" width="80%" flexWrap={"wrap"} display="flex" justifyContent={"center"}  >
        {
          movies && movies.slice(0,4).map((movie,index) => (
            <MovieItem id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index}/>
          ))
        }
      </Box>

      <Box display={"flex"} margin="auto" padding={5}>
        <Button LinkComponent={Link} to="/movies" variant='outlined' sx={{margin:'auto',color:"#2b2d42"}} >View All Movies</Button>
      </Box>

    </Box>
  )
}

export default HomePage