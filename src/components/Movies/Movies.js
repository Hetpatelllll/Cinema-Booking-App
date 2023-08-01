import { Box, Typography } from '@mui/material'
import React, { createContext, useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/apiHelpers';
import MovieItem from './MovieItem';

// pass movie state to carousel component
const movieState = createContext();

const Movies = () => {

  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies().then((data) => setMovies(data.movies)).catch(err => console.log(err));
  }, [])

  // console.log(movies)

  return (
    <movieState.Provider value={movies}>

      <Box margin={"auto"} marginTop={4} >
        <Typography variant='h4' margin={"auto"} padding={2} width={"40%"} bgcolor={"#900C3F"} color={"white"} textAlign={"center"}>
          All Movies
        </Typography>

        <Box width={"100%"} margin={"auto"} display={"flex"} justifyContent={"center"} flexWrap={"wrap"} marginTop={6} >
          {
            movies && movies.map((movie, index) => (
              <MovieItem id={movie._id} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} title={movie.title} key={index} />
            )
            )}
        </Box>
      </Box>

    </movieState.Provider>
  )
}

export default Movies;
export {movieState}