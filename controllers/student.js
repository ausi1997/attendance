// init code 
// importing the required modules
const Student = require('../models/student'); // importing the student module
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// defaultroute function
exports.default = async(req,res)=>{
    try{
     await Student.find()    // checking the default route
     return res.json({
         status:true,
         message:'default route is working...'
     });
    }
    catch(err){
     return res.json('Error' + err);
    }
}

// Registering a student function 

// this will be done by the admin

 exports.registerStudent = (req,res)=>{
    try{
         Student.findOne({Registration_No:req.body.Registration_No}) 
         // checking if registration no. is already exist

        .exec((newStudent,existStudent)=>{
            if(existStudent){ // if exist
                return res.json({
                    message:'Student is already registered...'
                });
            }
            else{ // if not
                Student.create({ 
                    // then creating the student in database
                    Name:req.body.Name,   
                   Class:req.body.Class,
                   Registration_No:req.body.Registration_No,
                   Password:bcrypt.hashSync(req.body.Password, 8) // hashing the password
                },(error,result)=>{
                    if(!error){ // if all ok
                        return res.json({
                            status:true,
                            message:'Student Registered Successfully',
                            result
                        });
                    }
                    else{ // if error
                        return res.json({
                            status:false,
                            message:'Registration failed...',
                            error
                        });
                    }
                })
            }
        })
    }
    catch(err){
        return res.json('error' +err);
    }
}