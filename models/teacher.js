const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const teacherSchema = new mongoose.Schema({ // defining the teacher data model
    Name:{
        type:String,
        required:true,
    },
    Subject:{
        type:String,
        required:true,
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

// creating teacher model
mongoose.model('teacher',teacherSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('teacher');