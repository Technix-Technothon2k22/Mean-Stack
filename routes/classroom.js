var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { isSignedIn } = require("../controllers/auth");
const {createclassroom,addmultiplefileandTask,getClassrooms,retreivealltask,displayclassesforstudent,displaytaskforstudent,deletetaskforstudent} = require("../controllers/classroom");
const cloudinary=require('../utils/cloudinary');
const upload=require('../utils/multer');



router.get("/classrooms",getClassrooms);
router.post("/classroom/create/task",upload.single('image'),addmultiplefileandTask);
router.post('/classroom/student/displayclasses',displayclassesforstudent);
router.get('/classroom/student/displaytask',displaytaskforstudent);
router.delete('/classroom/student/deletetask',deletetaskforstudent);
router.get("/classroom/alltask",retreivealltask);
router.post('/createclassroom',createclassroom);

module.exports = router;
