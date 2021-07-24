// init code 
const express = require('express');
const router = express.Router();

const attendanceRoute = require('../controllers/attendance');

// default route

router.get('/',attendanceRoute.default);

// new attendaance record

router.post('/create',attendanceRoute.newAttendance);

// view attendance

router.get('/viewAttendance/:Class',attendanceRoute.viewAttendance);

// mark present route 

router.put('/present/:_id', attendanceRoute.markPresent);

// mark absent route

router.put('/absent/:_id', attendanceRoute.markPresent);


module.exports=router;