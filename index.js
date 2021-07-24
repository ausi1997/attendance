// init code 
//importing the modules
const express = require('express');

// making express app
const app = express();

// connecting the database
const db = require('./models/db');


 // parse requests of content-type - application/json
 app.use(express.json());

 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({ extended: true }));
 

// importing the student routes

const studentRoute = require('./routes/student');

// importing the teacher routes

const teacherRoute = require('./routes/teacher');

// class route

const classRoute = require('./routes/class');

// attendance route

const attendanceRoute = require('./routes/attendance');

app.get('/',(req,res)=>{
    res.send('Attendance Management System');
})

// student route
app.use('/student',studentRoute);

// teacher route
app.use('/teacher', teacherRoute);

// class route
app.use('/class', classRoute);

// attendance route
app.use('/attendance', attendanceRoute);

const PORT = 8005;
// assinging the port
app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
});
