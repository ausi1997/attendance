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

// login route for a teacher

exports.signin = async(req,res)=>{

            // check teacher ID exist or not
        await  Teacher.findOne({Registration_No:req.body.Registration_No}, (errors,result)=>{
                // check error
                if(errors){
                  return res.json({
                      status:true,
                      message:'does not exist',
                      errors:errors
                  });
                }
                 // result is empty or not
                 if(result){
                    // when result ha ssome doc
                    // then match the password
                    const match = bcrypt.compareSync(req.body.Password, result.Password);
                    // check password is match or not
                    if(match){
                        // password matched
                        let token = jwt.sign({_id:result._id}, 'verySecretValue', {expiresIn: '24h'});
                        const {_id,Name,Subject} = result;
                        return res.json({
                            status:true,
                            message:'Password matched.... login success....',
                            result:result,
                            token:token,  // it give the token in result
                            user:{_id,Name,Subject}
                        });
                    }
                    else{
                        // password not matched
                        return res.json({
                            status:false,
                            message:'Password do not matched....   login failed...',
                        });
                    }
                }
                else{
                    // user doc doesnot exist
                    return res.json({
                        status:false,
                        message:'user not exist....'
                    });
                }
            });
        }

        // add a teacher to a specific class

        exports.addTeacher = async(req,res)=>{
            try{
               await Teacher.findOneAndUpdate({Registration_No:req.body.Registration_No},{
                   Class:req.body.Class
               },(error,result)=>{
                   if(!error){
                       return res.json({
                           message:'Teacher added successfully',
                           result
                       })
                   }
               }).select("-Password")
            }
            catch(err){
                return res.send('error' + err);
            }
        }

        // show all teachers of a specific class 

        exports.viewByClass = async(req,res)=>{
            try{
           await Teacher.find({Class:req.params.Class},(error,result)=>{
               if(!error){
                   return res.json({
                       result
                   })
               }
           }).sort("Name").select("-Password")
            }
            catch(err){
                return res.send('error' + err);
            }
        }