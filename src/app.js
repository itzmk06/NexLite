const express=require("express");
const app=express();
const PORT=8080;
const {authAdmin}=require("./middleware/auth.js")

// no need of auth 
app.use("/user/login",(req,res)=>{
    console.log("User logged in succesfull!");
    res.send("Login sucessfull");
});

// for admin - one of of auth 
// app.use("/admin",authAdmin);

// or 
app.get("/admin/getData",authAdmin,(req,res)=>{
    console.log("Data sent for admin");
    res.status(200).send("This is data!");
});

app.get("/user/getData",(req,res,next)=>{
    throw new Error("This is error");
    res.status(200).send("This is your result!");
});

// you can handle error here only 
app.get("/user/getProfile",(req,res,next)=>{
    try {
        throw new Error("This is error!");
    } catch (error) {
        res.status(500).send("We handled error here only!");
    }
})

// this will handle all the errors 
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong!");
    }
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
});