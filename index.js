// init code 
//importing the modules
const express = require('express');

// making express app
const app = express();

// connecting the database
const db = require('./models/db');

app.get('/',(req,res)=>{
    res.send('Attendance Management System');
})

const PORT = 8005;
// assinging the port
app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
});
