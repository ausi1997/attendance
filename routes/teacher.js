// init code 
const express = require('express');
const router = express.Router();

const teacherRoute = require('../controllers/teacher');  


// defaulte route
router.all('/',teacherRoute.default);

// register a teacher route
router.post('/register', teacherRoute.registerTeacher);


// exporting the router
module.exports=router;