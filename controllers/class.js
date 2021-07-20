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

    const classe = new Class({  // creating a new post
                
        Standard,
        ClassTeacher,
    });
    classe.save().then(result=>{  // saving the data in database
        res.json({
            message:"successfully...",
            classe:result
        });
    })
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
                result
            });
        })
    }
    catch(err){
          return res.send('error' + err);
    }
}