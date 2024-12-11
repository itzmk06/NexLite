const express=require("express");
const app=express();
const PORT=8080;


// app.use((req,res)=>{
//     res.send("Hello world from backend!");
// });


app.use("/wow",(req,res)=>{
    res.send("Hello world from wow!");
});


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})