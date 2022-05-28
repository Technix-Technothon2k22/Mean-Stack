const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema(
  {
    classroomRef: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    taskTitle: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    taskDescription: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    cloudinary_id: {
      type: String,
    },
    avatar: {
        type: String,
      },
    deadline:{
        type:Date,
        // required:true
      }
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
