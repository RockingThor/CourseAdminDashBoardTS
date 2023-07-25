import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseDescription, courseImage, coursePrice, courseTitle } from "../store/selectors/course";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Course, courseState } from "../store/atoms/course";
import axios from "axios";
import { BASE_URL } from "../config";
import { adminId } from "../store/atoms/admins";

function EditCourse(){
    const {id}= useParams();
    const setCourse= useSetRecoilState(courseState);

    const getData =async()=>{
        const response = await axios.post(`${BASE_URL}/course/get`, null, {
            headers: {authorization: `Bearer ${localStorage.getItem('jwtToken')}`, courseid: id}
        });
        if(response.data.course){
            setCourse({isLoading: false, course: response.data.course});
        }else{
            setCourse({isLoading: false, course: null});
            alert("The specific course not found or authentication error");
        }
    }

    useEffect(()=>{
        getData();
    })

    return (
        <div>
            <Top/>
            <Grid container>
                <Grid item lg={6} md={12} sm={12}>
                    <div className="container" style={{display:"flex", justifyContent: "center"}}>
                    <UpdateForm/>
                    </div>
                </Grid>
                <Grid item lg={6} md={12} sm={12}>
                <div className="container" style={{display:"flex", justifyContent: "center"}}>
                    <View/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )

}

function Top(){
    const title= useRecoilValue(courseTitle);
    return(
        <>
            <div style={{height: 250, background: "#212121", top: 0, width: "100%", zIndex: 0, marginBottom: -250, marginTop:10}}>
                <div style={{height: 250, display: "flex", justifyContent:"center", flexDirection:"column"}}>
                    <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                        {title}
                    </Typography>
                </div>
            </div>
        </>
    )
}

function View(){
    const title= useRecoilValue(courseTitle);
    const image= useRecoilValue(courseImage);


    return(
        <div style={{display: "flex", marginTop: 50, justifyContent: "center", width: "100%", }}>
            <Card style={{
                margin: 10,
                width: 350,
                minHeight: 200,
                borderRadius: 20,
                marginRight: 50,
                paddingBottom: 15,
                zIndex:2
            }}>
                <img src={`${BASE_URL}/image/retreive/${image}`} style={{width: 350}} alt="Course Image" />
                <div style={{marginLeft: 10}}>
                    <Typography variant="h5">{title}</Typography>
                    <Price/>
                </div>
            </Card>
        </div>
    )
}

function Price(){
    const course= useRecoilValue(courseState);

    return(
         <>
            <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <Typography variant="subtitle1">
                <b>Rs {course.course?.price} </b>
            </Typography>
        </>
    )
}

function UpdateForm(){
    const {id}=useParams();
    const [course, setCourse]= useRecoilState(courseState);
    const [title, setTitle]= useState(useRecoilValue(courseTitle));
    const [description, setDescription]= useState(useRecoilValue(courseDescription));
    const[price, setPrice]= useState(useRecoilValue(coursePrice));
    const admin= useRecoilValue(adminId);
    const image= useRecoilValue(courseImage);

    const handleSubmitForm= async()=>{
        if(title=="" || description==""||price==""||image==null){
            alert("You can't submit an partially or fully empty form");
            return;
        }
        const newCourse ={
            title: title,
            description: description,
            price: price,
        };
        const newCourseAll:Course ={
            title: title,
            description: description,
            price: price,
            image: image,
            createdBy: admin.adminId
        };
        const response= await axios.put(`${BASE_URL}/course/update`,newCourse, {
            headers: {authorization: `Bearer ${localStorage.getItem('jwtToken')}`, courseid: id}
        });
        if(response){
            setCourse({isLoading:false, course:newCourseAll});
        }else{
            alert("Something is broken");
            return;
        }
    }

    return(
        <div className="container">
            <Card variant="outlined" style={{maxWidth: 600, marginTop: 200, marginLeft: 10}}>
                <div style={{padding: 20}}>
                    <Typography style={{marginBottom: 10}}>
                        Update course details
                    </Typography>
                    <TextField 
                        value={title}
                        style={{}}
                        onChange={(event)=>{
                            setTitle(event.target.value);
                        }}
                        fullWidth={true}
                        label="Title"
                        variant="outlined"
                    />
                    <TextField 
                        value={description}
                        style={{marginTop: 10}}
                        onChange={(event)=>{
                            setDescription(event.target.value);
                        }}
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                    />
                    <TextField 
                        value={price}
                        style={{marginTop:10}}
                        onChange={(event)=>{
                            setPrice(event.target.value);
                        }}
                        fullWidth={true}
                        label="Price"
                        variant="outlined"
                    />
                    <Button 
                        variant="contained"
                        onClick={handleSubmitForm}
                        style={{marginTop:10}}
                    >Update Course</Button>
                </div>
            </Card>
        </div>
    )
}

export default EditCourse;