const Classroom=require("../models/classroommodel");
const cloudinary=require('../utils/cloudinary');
const upload=require('../utils/multer');
const TaskModel=require("../models/tasks");
const StudentModel=require("../models/studentmodel");
const ClassroomModel=require("../models/classroommodel");




exports.displayclassesforstudent=(req,res)=>{
    var classes=[]


    const loggedin_user_Ref=req.body.loggedin_user_Ref;
    console.log(loggedin_user_Ref);


    StudentModel.find({
        loggedin_user_Ref
    },(err,result)=>{
        if(err)
        {
            res.status(400).json({
                success:false
            });
        }
        console.log("result ===>>>>>>>",result)


        // console.log(result[0].classroom_Ref
        result[0].classroom_Ref.map((v,i)=>{

            ClassroomModel.find({
                _id:v
            },(err,class_res)=>{
                if(err)
                {
                    res.status(400).json({
                        err:"can't fetch classes"
                    });
                }
                else{
                    classes.push(class_res[0]);
                    // console.log(class_res[0]);
                    // res.status(200).json({
                    //     class_res
                    // })
                    // console.log(classes);
                    console.log(result[0].classroom_Ref.length)

                    if( result[0].classroom_Ref.length-1 == i){
                        res.status(200).json({
                            classes
                        })
                    }
                }
            })
           

        })
      
        // console.log("mssjdcfusd"+classes);
      
      
    })
}

exports.retreivealltask=(req,res)=>{

    const classroom_reference=req.query.class_ref;

    TaskModel.find({
        classroomRef:classroom_reference
    },(err,result)=>{
        if(err)
        {
            res.status(400).json({
                error:"Error in finding class"
            });
        }else{
            res.status(200).json({
                result
            })
        }
    });

}

exports.createclassroom=(req,res)=>{

    const classroom= new Classroom(req.body);
    classroom.save((err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err:err
            });
        }
        res.json({
           classroom_ref:user._id,
           user_Ref:user.userRef
        });
    });
}

exports.getUserById=(req,res,next,id)=>{
    console.log('heyy');
    req.user.user_id=id;
    next();
}


exports.deletetaskforstudent=(req,res)=>{

    const task_ref=req.query.task_ref;
    TaskModel.deleteOne({
        _id:task_ref
    },(err,result)=>{
        if(err)
        {
            res.status(400).json({
                success:false
            });
        }else{
            res.status(200).json(result);
        }
    })

}


exports.displaytaskforstudent=(req,res)=>{

    const classsroom_ref=req.query.class_ref;
    TaskModel.find({
        classroomRef:classsroom_ref
    },(err,result)=>{
        if(err){
            res.status(400).json({
                success:false
            })
        }
        else{
            res.status(200).json({
                task_of_student:result
            });
        }
    })
}


exports.getClassrooms=(req,res)=>{

    console.log(req.query.userId)
  
   
    Classroom.find({userRef: req.query.userId}).exec((err,classrooms)=>{
        if(err || !classrooms)
        {
            return res.status(400).json({
                error:"No user was Found in DB"
            })
        }
        else{
            return res.status(200).json({
                classrooms:classrooms
            })
        }
    });


}

exports.addmultiplefileandTask=async(req,res)=>{

   try {
       console.log('heyy');
       const result=await cloudinary.uploader.upload(req.file.path);
        let task=new TaskModel({
            classroomRef:req.body.classroomRef,
            taskTitle:req.body.taskTitle,
            taskDescription:req.body.taskDescription,
            cloudinary_id:result.public_id,
            avatar:result.secure_url,
         
        });
        //save user
        await task.save();
        res.status(200).json({
           task
        })
       
   } catch (error) {
       console.log("errrr");
   }
}