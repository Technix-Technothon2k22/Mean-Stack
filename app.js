require('dotenv').config()

const express=require('express');
const app=express();
const port=process.env.PORT || 8000;
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const mongoose=require('mongoose');

//Routes
const authRoutes=require("./routes/auth");
const classroomRoutes=require("./routes/classroom");
const studentRoutes=require("./routes/student");




//DB connections
mongoose.connect("mongodb+srv://sarthak:sunnaik05@cluster0.llq2n.mongodb.net/MEAN_STACK?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
 
}).then(()=>{
    console.log(`DB CONNECTED`);
}).catch((err)=>{
    console.log(err);
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//my routes
app.use('/api',authRoutes);
app.use('/api',classroomRoutes);
app.use('/api',studentRoutes);



//starting a server
app.listen(port,()=>{

    console.log(`app is running at ${port}`);
});