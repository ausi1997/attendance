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

// view all student

exports.viewAll = async(req,res)=>{
    try{
          await Student.find({},(error,result)=>{
              if(!error){
                  return res.json({
                      result
                  })
              }
          })
    }
    catch(err){
        return res.send('error' + err);
    }
}

// add student to a class

exports.addStudent = async(req,res)=>{
    try{
       await Student.findOneAndUpdate({Registration_No:req.body.Registration_No},{
           Class:req.body.Class
       },(error,result)=>{
           if(!error){
               return res.json({
                   message:'Student added successfully',
                   result
               })
           }
       }).select("-Password")
    }
    catch(err){
        return res.send('error' + err);
    }
}

// view all students of a class 

exports.viewByClass = async(req,res)=>{
    try{
   await Student.find({Class:req.params.Class},(error,result)=>{
       if(!error){
           return res.json({
               result
           })
       }
   })
    }
    catch(err){
        return res.send('error' + err);
    }
}

// get student by his registration No

exports.searchStudent = async(req,res)=>{
    await Student.findOne({Registration_No:req.params.Registration_No},(error,studentdata)=>{
        if(!error){
            return res.json({
                _id:studentdata._id,
                Name:studentdata.Name
            })
        }
    }).populate('student', '_id Name')
}