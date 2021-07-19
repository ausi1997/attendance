// init code 
const express = require('express');
const router = express.Router();

const studentRoute = require('../controllers/student');  


// defaulte route
router.all('/',studentRoute.default);

// register a student route
router.post('/register', studentRoute.registerStudent);

// search a student 
router.get('/search/:Registration_No',studentRoute.searchStudent);


// exporting the router
module.exports=router;