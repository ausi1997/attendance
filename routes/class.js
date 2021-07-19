// init code 
const express = require('express');
const router = express.Router();

const classRoute = require('../controllers/class');  


// defaulte route
router.all('/',classRoute.defaultroute);

// create a class route
router.post('/create', classRoute.createClass);


// exporting the router
module.exports=router;