const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const studentSchema = new mongoose.Schema({ // defining the student data model
    Name:{
        type:String,
        required:true,
    },
    Class:{
        type:ObjectId,
        ref:'classe'
    },
    Registration_No:{
        type:String,
        unique:true,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
  
  //  timestamps:true
},{
    timestamps:true
});

// creating student model
mongoose.model('student',studentSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('student');