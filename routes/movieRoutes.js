const express  = require('express');
const movieController = require('../controllers/movieControllers')

const movierouter = express.Router();

movierouter.post('/',movieController.addMovie);
movierouter.get('/',movieController.getMovie);
movierouter.get('/:id',movieController.getMovieById);
movierouter.delete('/:id',movieController.deleteMovieById);

module.exports = movierouter;