const express=require("express");
const app=express();
const PORT=8080;

app.use("/",(req,res,next)=>{
    console.log("request accepted!");
    next();
});

app.get("/",(req,res,next)=>{
    console.log("Passing first request handler!");
    next();
},(req,res,next)=>{
    console.log("presenet in second request handler!");
    res.status(200).send("Data sent!");
},(req,res,next)=>{
    console.log("Present in third request handler!");
});



app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})