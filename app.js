const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userrouter = require('./routes/userRoutes');
const adminrouter = require('./routes/adminRoutes');
const movierouter = require('./routes/movieRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const cors = require('cors')

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/user',userrouter);
app.use('/admin',adminrouter);
app.use('/movie',movierouter);
app.use('/booking',bookingRouter);

mongoose.connect('mongodb+srv://hetfadadu123:hetfadadu123@cluster0.j8aaevp.mongodb.net/movie-booking-app?retryWrites=true&w=majority')
.then(()=>console.log("Connected Database")).catch((err)=>{console.log(err)})

// app.use('/user', (req, res, next) => {
//     res.send('hii')
// })


app.listen(5000, () => {
    console.log("App listen on port 5000")
})