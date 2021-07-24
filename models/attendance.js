const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const attendanceSchema = new mongoose.Schema({ // defining the attendance data model
    Class:{
        type:ObjectId,
        ref:'classe'
    },
    Subject:{
        type:String,
        required:true,
    },
    Teacher:{
        type:String,
    },
    Present:[
        {
             type:ObjectId,
             ref:'student'
        }
    ],
    Absent:[
        {
            type:ObjectId,
            ref:'student'
        }
    ]
  
  //  timestamps:true
},{
    timestamps:true
});

// creating attendance model
mongoose.model('attendance',attendanceSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('attendance');