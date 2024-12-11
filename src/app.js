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


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})