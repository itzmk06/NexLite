const express=require("express");
const {connectToDb}=require("./config/database/databaseConnect.js");
const { User } = require("./models/user.js");
require("dotenv").config();

const app=express();
const PORT=8080;
app.use(express.json());

app.post("/signup",async(req,res,next)=>{
    const newUser=await User(req?.body);
    try {
        await newUser.save();
        res.status(200).send("user created successfully!");
    } catch (error) {
        res.status(400).send("unable to create user!",error?.message);
    }
});

app.get("/getUserByMail",async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email});
        res.status(200).send(user);
    }catch(error){
        res.status(404).send("Can't find user by email, try again later: ",error.message);
    }
});

app.get("/getUserById",async(req,res)=>{
    const {_id}=req.body;
    try {
        const user=await User.findById({_id});
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send("Can't find user, try again later: ",error.message);
    }
});

app.get("/users",async(req,res)=>{
    try {
        const users=await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send("Can't find users :",error.message);
    }
});

app.delete("/deleteUser",async(req,res)=>{
    const {userId}=req.body;
    try {
        await User.findByIdAndDelete({_id:userId});
        res.status(200).send("user deleted successfully!");
    } catch (error) {
        res.status(500).send("Unable to delete user!");
    }
});

app.patch("/updateUserDetails",async(req,res)=>{
    const {userId,...data}=req.body;
    try {
        await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after"})
        res.status(200).send("user updated successfully!");
    } catch (error) {
        res.status(500).send("Unable to update user!");
    }
});

app.put("/updateUser",async(req,res)=>{
    const {userId,...data}=req.body;
    if(!userId){
        res.status(404).send("Invalid update request!");
    }
    try {
        const updatedUser=await User.findByIdAndUpdate({_id:userId},data,{new:"True"});
        if(!updatedUser){
            res.status(404).send("User not found!");
        }
        res.send("user data updated successfully!");
    } catch (error) {
        res.status(500).send("Unable to update user!");
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
