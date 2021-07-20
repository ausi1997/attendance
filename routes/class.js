// init code 
const express = require('express');
const router = express.Router();

const classRoute = require('../controllers/class');  


// defaulte route
router.all('/',classRoute.defaultroute);

// create a class route
router.post('/create', classRoute.createClass);

// view all class
router.get('/viewAll', classRoute.allClass);

// view one class
router.get('/view/:_id',classRoute.view);


// exporting the router
module.exports=router;