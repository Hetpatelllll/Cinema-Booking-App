const express  = require('express');
const admincontroller = require('../controllers/adminController')

const adminrouter = express.Router();

adminrouter.post('/signup',admincontroller.addAdmin);
adminrouter.post('/login',admincontroller.adminLogin);
adminrouter.get('/',admincontroller.getAdmin);
adminrouter.get('/:id', admincontroller.getAdminById);

module.exports = adminrouter;