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
    const {Standard , ClassTeacher} = req.body
   // const {Registration_No} = req.body

     //   Student.findOne(Registration_No , (error,studentData)=>{
       //     if(!error){
         //       return res.json({
           //         studentData
             //   })
          //  }
       // })

    const classe = new Class({  // creating a new post
                
        Standard,
        ClassTeacher,
      //  Students:[
        //    {
          //      studentData
     //       }
       // ]
    });
    classe.save().then(result=>{  // saving the data in database
        res.json({
            message:"successfully...",
            classe:result
        });
    })
    .catch(err=>{
        res.json({
            err
        });
    })
}


// adding a student to a class 

exports.AddStudent = (req,res)=>{
    const Students = [
        {
            _id:req.body._id
        }
    ]

    Class.findOneAndUpdate({Standard:req.body.Standard},{
        $push:{Students:Students}},{new:true},(error,result)=>{
              if(!error){
                  return res.json({
                      result
                  })
              }
        })
}
