const express=require("express");
const app=express();
const PORT=8080;

app.get("/user",(req,res)=>{
    console.log("Getting the user data!");
    res.send(200,{"name":"Manoj"})
});

app.post("/user",(req,res)=>{
    console.log("Posting data!");
    res.send(200,"Posted data sucessfully!");
});


app.put("/user",(req,res)=>{
    console.log("updated with put - data!");
    res.send(200,"updated with put - data sucessfully!");
});


app.patch("/user",(req,res)=>{
    console.log("Posting data!");
    res.send(200,"patch - Posted data sucessfully!");
});


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})