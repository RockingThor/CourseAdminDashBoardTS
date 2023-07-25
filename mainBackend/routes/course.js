const express= require("express");
const {Course, Admin}= require("../models/model");
const {authenticateJwt}= require("../middleware/auth");

const router= express.Router();

router.post('/create',authenticateJwt,async(req,res)=>{
    const {title, description, createdBy, image, price}= req.body;
    const newCourse= new Course({title, description, price,  createdBy, image});
    let response=await newCourse.save();
    if(response){
        return res.status(200).json({id: response._id});
    }else{
        return res.status(403).json({error: "The db didnt respond"});
    }
});

router.post('/get/courses', authenticateJwt,async(req,res)=>{
    const email= req.user.email;
    const user= await Admin.findOne({email});
    const query= {createdBy: {$eq: user}};
    const response= await Course.find(query);
    if(response){
        //console.log(response);
        return res.status(200).json({courses: response});
    }else{
        return res.status(404).json({error: "No courses found"});
    }
});

router.post('/get', authenticateJwt, async(req,res)=>{
    const courseId= req.headers.courseid;
    const course= await Course.findById(courseId);
    if(course){
        return res.status(200).json({course:course});
    }else{
        return res.status(404).json({error: "No course found"});
    }
});

router.put('/update', authenticateJwt, async(req,res)=>{
    const {title, description, price}= req.body;
    const id=req.headers.courseid;
    const response=await Course.findByIdAndUpdate(id,{
        $set:{
            title: title,
            description: description,
            price: price,
        },
    });
    if(response){
        return res.status(205).json({course:response});
    }else{
        return res.status(406).json({error: "something is broken"});
    }
})

module.exports=router;