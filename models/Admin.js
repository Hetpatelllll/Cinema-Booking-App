const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    email:{
        type: String,
        unique: true,
        required:true,
    },
    password:{
        type: String,
        minLength: 6,
        required:true,
    },
    addMovie:[{
        type: mongoose.Types.ObjectId,
        ref: "Movie",
    }]

})

module.exports = mongoose.model('admin',adminSchema);