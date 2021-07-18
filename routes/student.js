// init code 
const express = require('express');
const router = express.Router();

const studentRoute = require('../controllers/student');  


// defaulte route
router.all('/',studentRoute.default);

// register a student route
router.post('/register', studentRoute.registerStudent);


// exporting the router
module.exports=router;