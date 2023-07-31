const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    actors:[{type:String,}],
    releaseDate:{
        type: Date,
    },
    posterUrl:{
        type: String,
    },
    featured:{
        type: Boolean,
    },
    bookings: [{type:mongoose.Types.ObjectId,ref:"Booking"}],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"admin"
    }
})

module.exports = mongoose.model('Movie',MovieSchema);