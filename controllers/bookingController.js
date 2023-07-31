const mongoose = require("mongoose");
const Bookings = require("../models/Bookings");
const Movie = require("../models/Movie");
const User = require("../models/User");

const newBooking = async (req,res,next) => {

    const {movie,date,seatNumber,user} = req.body;

    let existingMovie;
    let existingUser;

    try {

        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);

    } catch (error) {
        console.log(error)
    }

    if(!existingMovie)
    {
        return res.status(404).json({message:"Movie Not Found with Given id"})
    }

    if(!existingUser)
    {
        return res.status(404).json({message:"User Not Found with Given id"})
    }
    
    let booking;

    try {
        booking = new Bookings({movie,date:new Date(`${date}`),seatNumber,user});

        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        session.commitTransaction();

        // booking = await booking.save();
    } catch (error) {
        console.log(error)
    }

    if (!booking) {
        return res.status(500).json({ message: 'Unable to create booking' })
    }

    return res.status(201).json({ booking });
}

const getBookingById = async (req,res,next)=>{

    const id = req.params.id;
    let booking;
    
    try {
        booking = await Bookings.findById(id);
    } catch (error) {
        console.log(error)
    }

    if(!booking)
    {
        return res.status(500).json({message:"Unexpected Error"})
    }
    return res.status(200).json({ booking });

}

const deleteBooking = async (req,res,next) => {

    const id = req.params.id;
    let booking;

    try {
        // Also delete booking from movie and user as well
        // session is used to perform a operation of multiple databases
        booking = await Bookings.findByIdAndRemove(id).populate("user movie"); 
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({session});                                   
        session.commitTransaction();
    } catch (error) {
        console.log(error)
    }

    if(!booking)
    {
        return res.status(500).json({message:"Unable to Delete"})
    }
    return res.status(200).json({ message:"successfully Delete" });
}


exports.newBooking = newBooking;
exports.getBookingById = getBookingById;
exports.deleteBooking = deleteBooking;
