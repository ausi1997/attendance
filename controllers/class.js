const Class = require('../models/class');  // importing the class module
// default function

const Student = require('../models/student');

exports.defaultroute = (req,res)=>{
       Class.find()
       return res.json({
           status:true,
           message:'Route is working....'
       });
}
// creating a storage where class details will be stored

// function to create class

exports.createClass = (req,res)=>{
    try{
         Class.findOne({Standard:req.body.Standard}) 
         // checking if standard is already exist

        .exec((newClass,existClass)=>{
            if(existClass){ // if exist
                return res.json({
                    message:'Class  already exist...'
                });
            }
            else{ // if not
                Class.create({ 
                    // then creating the class in database
                    Standard:req.body.Standard,   
                   ClassTeacher:req.body.ClassTeacher,
                },(error,result)=>{
                    if(!error){ // if all ok
                        return res.json({
                            status:true,
                            message:'Class created Successfully',
                            result
                        });
                    }
                    else{ // if error
                        return res.json({
                            status:false,
                            message:'failed...',
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
// function to view all class 
exports.allClass = async(req,res)=>{
    try{
        await Class.find({},(error,result)=>{
            return res.json({
                result
            });
        })
    }
    catch(err){
          return res.send('error' + err);
    }
}

// view one class

exports.view =  async(req,res)=>{
    try{
        await Class.find({_id:req.params._id},(error,result)=>{
            return res.json({
                result:result
            });
        })
    }
    catch(err){
          return res.send('error' + err);
    }
}