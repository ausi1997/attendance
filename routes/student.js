// init code 
const express = require('express');
const router = express.Router();

const studentRoute = require('../controllers/student');  


// defaulte route
router.all('/',studentRoute.default);

// register a student route
router.post('/register', studentRoute.registerStudent);

// view all student

router.get('/viewAll', studentRoute.viewAll);

// view all student of a specific class 

router.get('/view/:Class', studentRoute.viewByClass);

// add a student in a class

router.put('/addStudent', studentRoute.addStudent);

// search a student 
router.get('/search/:Registration_No',studentRoute.searchStudent);


// exporting the router
module.exports=router;