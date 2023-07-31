const express  = require('express');
const bookingController = require('../controllers/bookingController')

const bookingRouter = express.Router();

bookingRouter.post('/',bookingController.newBooking);
bookingRouter.get('/:id',bookingController.getBookingById);
bookingRouter.delete('/:id',bookingController.deleteBooking);

module.exports = bookingRouter;