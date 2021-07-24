// init code 
const express = require('express');
const router = express.Router();

const teacherRoute = require('../controllers/teacher');  


// defaulte route
router.all('/',teacherRoute.default);

// register a teacher route
router.post('/register', teacherRoute.registerTeacher);

// signin a teacher 
router.post('/signin',teacherRoute.signin);

// add a teacher to a specific class
router.put('/addteacher', teacherRoute.addTeacher);

// view all teachers of a class
router.get('/view/:Class',teacherRoute.viewByClass);


// exporting the router
module.exports=router;