import React, { useEffect, useState, useContext } from "react";
import "../components/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from "react-router-dom";
import { getAllMovies } from "../api-helpers/apiHelpers";
import { movieState } from "./Movies/Movies";


const Carousell = () => {

  const [popularMovies, setPopularMovies] = useState([]);
  const movies = useContext(movieState);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMovies().then((data) => setPopularMovies(data.movies)).catch(err => console.log(err));
  })

  

  return (
    <div width={"100%"} height={"100%"} >
      <div className="poster" >
        <Carousel 
          showThumbs={false}
          autoPlay={true}
          transitionTime={2}
          infiniteLoop={true}
          showStatus={false}
        >
          {
            popularMovies.map(movie => (
          
              // <Link style={{ textDecoration: "none", color: "white" }} LinkComponent={Link} to={`/booking/${movie._id}`}>
              <div style={{ textDecoration: "none", color: "white" }}>
              
                <div className="posterImage" >
                  <img src={`${movie && movie.posterUrl}`} />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">{movie ? movie.title : ""}</div>
                  <div className="posterImage__runtime">
                    {movie ? new Date(movie.releaseDate).toDateString() : ""}
                    <span className="posterImage__rating">
                     
                      <i className="fas fa-star" />{" "}
                    </span>
                  </div>
                  <div className="posterImage__description">{movie ? movie.description : ""}</div>
                </div>
                </div>
              //  </Link> 
              
            ))
          }
        </Carousel>
      </div>
    </div>
  )
}

export default Carousell;