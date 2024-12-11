const express=require("express");
const app=express();
const PORT=8080;

app.use("/user",(req,res,next)=>{
    console.log("Response 1!");
    res.send("Response 1");
    // next();
},(req,res,next)=>{
    console.log("Response 2!");
    res.send("Response 2");
})


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})