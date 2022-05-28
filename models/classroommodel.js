const mongoose = require("mongoose");


var classroomSchema = new mongoose.Schema({
  userRef: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  classroomname: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  branch: {
    type: String,
    maxlength: 100,
    trim: true,
  },
  sem: {
    type: String,
    maxlength: 100,
    trim: true,
  },
  
},{
    timestamps:true
});




module.exports = mongoose.model("Classroom", classroomSchema);
