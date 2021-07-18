// init code 
// importing the required modules
const Teacher = require('../models/teacher'); // importing the teacher module
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// defaultroute function
exports.default = (req,res)=>{
    try{
     Teacher.find()    // checking the default route
     return res.json({
         status:true,
         message:'default route is working...'
     });
    }
    catch(err){
     return res.json('Error' + err);
    }
}

// Registering a teacher function 

// this will be done by the admin

 exports.registerTeacher = (req,res)=>{
    try{
         Teacher.findOne({Registration_No:req.body.Registration_No}) 
         // checking if registration no. is already exist

        .exec((newTeacher,existTeacher)=>{
            if(existTeacher){ // if exist
                return res.json({
                    message:'Teacher is already registered...'
                });
            }
            else{ // if not
                Teacher.create({ 
                    // then creating the teacher in database
                    Name:req.body.Name,   
                   Subject:req.body.Subject,
                   Registration_No:req.body.Registration_No,
                   Password:bcrypt.hashSync(req.body.Password, 8) // hashing the password
                },(error,result)=>{
                    if(!error){ // if all ok
                        return res.json({
                            status:true,
                            message:'Teacher Registered Successfully',
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