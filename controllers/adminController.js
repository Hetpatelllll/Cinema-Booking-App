const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const addAdmin = async (req, res, next) => {

    const { email, password } = req.body;
    let existingAadmin;

    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: 'Invalid inputs' })
    }    

    try {
        existingAadmin = await Admin.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    if (existingAadmin) {
        return res.status(500).json({ message: 'Admin already exist' })
    }

    let admin;
    const hashPassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({ email, password: hashPassword });
        admin = await admin.save();
    } catch (error) {
        console.log(error)
    }

    if (!admin) {
        return res.status(500).json({ message: 'unable to store the admin' })
    }

    return res.status(200).json({ admin })
}

const adminLogin = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email && email.trim() === "" && !password && password.trim() === " ") {
        return res.status(422).json({ message: 'Invalid inputs' })
    } 

    let existAdmin;
    try {
        existAdmin = await Admin.findOne({email});
    } catch (error) {
        console.log(error);
    }

    if (!existAdmin) {
        return res.status(400).json({ message: 'Admin not found' })
    }
    
    const isPassswordCorrect = bcrypt.compareSync(password,existAdmin.password);
    
    if(!isPassswordCorrect)
    {
        return res.status(400).json({ message: 'Incorrect Password' });
    }

    const SECRET_KEY = process.env.SECRET_KEY || 'my-secret-key';

    const token = jwt.sign({id:existAdmin._id}, SECRET_KEY ,{
        expiresIn: "7d"
    })

    return res.status(200).json({ message: 'Authentication Complete',token,id:existAdmin._id });

}

const getAdmin = async (req,res,next)=>{
    let admins;
    try {
        admins = await Admin.find();

    } catch (error) {
        console.log(error)
    }

    if (!admins) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ admins })

}

const getAdminById = async (req, res, next) => {
    const id = req.params.id;
  
    let admin;
    try {
      admin = await Admin.findById(id).populate("addMovie");
    } catch (err) {
      return console.log(err);
    }
    if (!admin) {
      return console.log("Cannot find Admin");
    }
    return res.status(200).json({ admin });
  };

exports.addAdmin = addAdmin;
exports.adminLogin = adminLogin;
exports.getAdmin = getAdmin;
exports.getAdminById = getAdminById;