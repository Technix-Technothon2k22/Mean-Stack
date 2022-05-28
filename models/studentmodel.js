const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema(
  {
    classroom_Ref:{
        type:Array,
        trim:true
    },
    loggedin_user_Ref:{
        type:String,
        required:true,
        trim:true
    }
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
