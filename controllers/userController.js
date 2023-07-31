const Bookings = require("../models/Bookings");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const getAllUser = async (req, res, next) => {

    let users;
    try {
        users = await User.find({});
    } catch (error) {
        console.log(error)
    }

    if (!users) {
        return res.status(500).json({ message: 'unexpected error' })
    } else {
        return res.status(200).json({ users })
    }
}

const signup = async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: 'Invalid data' })
    }

    let user;
    const hashedPassword = bcrypt.hashSync(password)
    try {
        user = new User({ name, email, password: hashedPassword });
        user = await user.save();
    } catch (error) {
        console.log(error)
    }

    if (!user) {
        return res.status(422).json({ message: 'Invalid Inputes' })
    }

    return res.status(201).json({ id:user._id })
}

const updateUser = async (req, res, next) => {

    const id = req.params.id;

    const { name, email, password } = req.body;

    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: 'Invalid data' })
    }

    let user;
    const hashedPassword = bcrypt.hashSync(password);

    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword })
    } catch (error) {
        console.log(error)
    }

    if (!user) {
        return res.status(500).json({ message: 'somthing went wrong' })
    }

    return res.status(201).json({ message:'updated sucessfully' })
    
}

const deleteUser = async (req, res, next) => {
    
    const id = req.params.id;
    let user;
    
    try {
        user = await User.findByIdAndRemove(id)
    } catch (error) {
        console.log(error)
    }
    
    if (!user) {
        return res.status(500).json({ message: 'somthing went wrong' })
    }
    return res.status(201).json({ message:'deleted sucessfully' })
}

const login = async (req, res, next) => {

    const {email, password } = req.body;

    if ( !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: 'Invalid data' })
    }

    let existUser;
    try {
        existUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }
    
    if(!existUser)
    {
        return res.status(404).json({ message: 'user not found' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'password Incorrect' });
    }

    return res.status(201).json({ message:'login sucessfully',id: existUser._id });
}

const getBookingsOfUser = async (req,res,next) => {
    const id = req.params.id;
    let bookings;

    try {
        bookings = await Bookings.find({user:id}).populate("movie").populate("user");
    } catch (error) {
        console.log(error)
    }

    if (!bookings) {
        return res.status(500).json({ message: 'Unable Get Booking' });
    }

    return res.status(200).json({ bookings });
}

const getUserById = async (req,res,next) => {

    const id = req.params.id;
    let user;

    try {
        user = await User.findById(id);
    } catch (error) {
        console.log(error)
    }

    if (!user) {
        return res.status(500).json({ message: 'unexpected error' })
    } else {
        return res.status(200).json({ user })
    }
    
}


exports.getAllUser = getAllUser;
exports.signup = signup;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.getBookingsOfUser = getBookingsOfUser;
exports.getUserById = getUserById;