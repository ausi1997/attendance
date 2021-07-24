const Attendance = require('../models/attendance');

// default route

exports.default = (req,res)=>{
    Attendance.find()
       return res.json({
           status:true,
           message:'Route is working....'
       });
}

// create record for new attendance 

exports.newAttendance = (req,res)=>{
    Attendance.create({
        Class:req.body.Class,
        Subject:req.body.Subject,
        Teacher:req.body.Teacher
    },(error,result)=>{
        if(!error){
            return res.json({
                message:'Now you can take attendance',
                result
            })
        }
    })
}

// get all attendance record of a specific class

exports.viewAttendance = async(req,res)=>{
    try{
       await Attendance.find({Class:req.params.Class},(error,result)=>{
           if(!error){
               return res.json({
                   result
               })
           }
       })
    }
    catch(err){
        console.log('error' + err);
    }
}

// mark present 

exports.markPresent = async(req,res)=>{
    try{
        await Attendance.findByIdAndUpdate({_id:req.params._id},{
            $push:{Present:req.body._id}
        },{new:true},(error,result)=>{
            if(!error){
                return res.json({
                    message:'Attendance taken successfully',
                    result
                })
            }
        })
    }
    catch(err){
      console.log(err);
    }
}