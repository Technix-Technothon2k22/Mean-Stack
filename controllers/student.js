const Studentmodel=require('../models/studentmodel');

exports.joinclass=(req,res)=>{

    const studentmodel= new Studentmodel(req.body);

    Studentmodel.find({
        loggedin_user_Ref:req.body.loggedin_user_Ref
    },(err,user)=>{
        console.log(user)
        if(user.length===0)
        {
            console.log(user.length)
            studentmodel.save((err,user)=>{
                if(err)
                {
                    return res.status(400).json({
                        err:err
                    });
                }
                res.json({
                    classroom_Ref:user.classroom_Ref,
                   student_Ref:user._id
                });
            });
            console.log('heyy');

        }
        else{
            Studentmodel.updateOne({
                loggedin_user_Ref:req.body.loggedin_user_Ref
            },{
                $push:{
                    classroom_Ref:req.body.classroom_Ref
                }
            },(err,user)=>{
                console.log(req.body.classroom_Ref);
                if(err)
                {
                    return res.status(400).json({
                        err:err
                    });
                }
                return res.json({
                  success:"true"
                });

            }
            );
            console.log('11111111');
        }
        console.log(user);
    })

    // console.log(result);
    // res.status(200).json({
    //     hey:",jdk"
    // });

    // studentmodel.save((err,user)=>{
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             err:err
    //         });
    //     }
    //     res.json({
    //        joined_classroom_ref:user.classroom_Ref,
    //        student_Ref:user._id
    //     });
    // });

   
}