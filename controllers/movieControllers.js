const jwt = require('jsonwebtoken');
const Movie = require('../models/Movie');
const Admin = require('../models/Admin');
const mongoose = require('mongoose')


const addMovie = async (req, res, next) => {


    const extractedToken =  req.headers.authorization.split(" ")[1];    
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token Not Found" });
    }

    // console.log(extractedToken);

    const SECRET_KEY = process.env.SECRET_KEY || 'my-secret-key';

    let adminId;
    // verify token
    jwt.verify(extractedToken, SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(404).json({ message: `${err.message}` });
        }
        else {
            adminId = decrypted.id;
            return;
        }
    })


    // create new movie
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    if (
        !title &&
        title.trim() === "" &&
        !description &&
        description.trim() == "" &&
        !posterUrl &&
        posterUrl.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    let movie;

    try {
        movie = new Movie({ title, description, releaseDate: new Date(`${releaseDate}`), posterUrl, featured, admin: adminId, actors });

        // create session to store data movie collection as well as admin collection at single time period
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({session})
        adminUser.addMovie.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();

    } catch (error) {
        console.log(error)
    }

    if (!movie) {
        return res.status(500).json({ message: "Request Failed" });
    }

    return res.status(201).json({ movie });

}

const getMovie = async (req,res,next) => {
    let movies;

    try {
        movies = await Movie.find();

    } catch (error) {
        console.log(error)
    }

    if(!movies)
    {
        return res.status(500).json({ message: "Requiest Failed" });   
    }

    return res.status(200).json({ movies });

}

const getMovieById = async (req,res,next) => {

    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);
    } catch (error) {
        console.log(error)
    }

    if(!movie)
    {
        return res.status(500).json({ message: "Invalid Movie Id" });   
    }

    return res.status(200).json({ movie });

}

const deleteMovieById = async (req,res,next) => {

    const id = req.params.id;
    let movie;

    try {
        movie = await Movie.findByIdAndRemove(id);
    } catch (error) {
        console.log(error)
    }

    if(!movie)
    {
        return res.status(404).json({message:"Unable to Delete"});
    }
    return res.status(200).json({message: "Movie Deleted"});
}

exports.addMovie = addMovie;
exports.getMovie = getMovie;
exports.getMovieById = getMovieById;
exports.deleteMovieById = deleteMovieById;




// const authorizationHeader = req.headers.authorization;

//     if (!authorizationHeader) {
//         return res.status(404).json({ message: "Authorization header not found" });
//     }

//     const extractedToken = authorizationHeader.split(" ")[1];

//     if (!extractedToken || extractedToken.trim() === "") {
//         return res.status(404).json({ message: "Token Not Found" });
//     }