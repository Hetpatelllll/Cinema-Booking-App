const express  = require('express');
const userController = require('../controllers/userController')

const userrouter = express.Router();

userrouter.get('/',userController.getAllUser);
userrouter.get('/:id',userController.getUserById);
userrouter.post('/signup',userController.signup);
userrouter.put('/:id',userController.updateUser);
userrouter.delete('/:id',userController.deleteUser);
userrouter.post('/login',userController.login);
userrouter.get('/bookings/:id',userController.getBookingsOfUser);

module.exports = userrouter;