const express=require("express");
const {connectToDb}=require("./config/database/databaseConnect.js");
const { User } = require("./models/user.js");
const { sendError } = require("./utils/apiError.js");
const { sendSuccess } = require("./utils/apiSuccess.js");
const ALLOWED_UPDATES=["firstName","lastName","password","about","skills","portfolio"];
require("dotenv").config();

const app=express();
const PORT=8080;
app.use(express.json());

app.post("/signup",async(req,res,next)=>{
    const newUser=await User(req?.body);
    try {
        await newUser.save();
        sendSuccess(res,200,"user created successfully",newUser);
    } catch (error) {
        sendError(res,400,"unable to create user",error);
    }
});

app.get("/getUserByMail",async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email});
        sendSuccess(res,200,"fetching user by email",user);
    }catch(error){
        sendError(res,400,"can't find user by email",error);
    }
});

app.get("/getUserById",async(req,res)=>{
    const {_id}=req.body;
    try {
        const user=await User.findById({_id});
        sendSuccess(res,200,"fetching user by id",user);
    } catch (error) {
        sendError(res,400,"can't find user",error);    
    }
});

app.get("/users",async(req,res)=>{
    try {
        const users=await User.find({});
        sendSuccess(res,200,"fetching all users",users);
    } catch (error) {
        sendError(res,400,"can't find users",error);        
    }
});

app.delete("/deleteUser",async(req,res)=>{
    const {userId}=req.body;
    try {
        await User.findByIdAndDelete({_id:userId});
        sendSuccess(res,200,"user deleted successfully!");
    } catch (error) {
        sendError(res,400,"unable to delete user",error);            
    }
});

// ? update operations 
app.patch("/updateUserDetails/:userid",async(req,res)=>{
    const userId=req.params?.userid;
    const data=req.body;
    let isUpdatesAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    try {
        if(!userId){
            throw new Error("userid not found")
        }
        if(!isUpdatesAllowed){
            throw new Error("User update failed!");
        }
        const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true})
        sendSuccess(res,200,"user updated successfully",user);
    } catch (error) {
        sendError(res,400,"unable to update user",error); 
    }
});

app.put("/updateUser/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    let isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    try {
        if(!userId){
            return sendError(res,400,"invalid update request",error); 
        }
        if(!isUpdateAllowed){
            throw new Error("update not allowed!");
        }
        // get the existing data first 
        const existingUserData=await User.findById(userId);
        const updatedUserData={...existingUserData.toObject(),...data};
        const updatedUser=await User.findByIdAndUpdate({_id:userId},updatedUserData,{runValidators:true,new:true});
        if(!updatedUser){
            return sendError(404,"user not found");
        }
        sendSuccess(res,200,"user updated successfully",updatedUser);

    } catch (error) {
        sendError(res,400,"unable to update user",error);     
    }
});

connectToDb()
    .then(()=>{
        console.log("Connection to database sucessfull!");
        app.listen(PORT,()=>{
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log("Failed to connect to Database!");
    })
