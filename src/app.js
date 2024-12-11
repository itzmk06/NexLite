const express=require("express");
const app=express();
const PORT=8080;

app.get("/user",(req,res)=>{
    console.log(req.query);
    res.status(200).send("data fetched!");
});

app.get("/ab?c",(req,res)=>{
    res.status(200).send("working!");
});


app.get("/a(bc)?c",(req,res)=>{
    res.status(200).send("working!");
});


app.get("/ab+c",(req,res)=>{
    res.status(200).send("working multiple b!");
});

app.get("/ab*c",(req,res)=>{
    res.status(200).send("working anything btw b and c!");
});

app.get(/a/,(req,res)=>{
    res.status(200).send("find a ");
});

app.get(/.*fly$/,(req,res)=>{
    res.status(200).send("ends with fly !");
});

app.get("/user/:id",(req,res)=>{
    console.log(req.params);
    res.status(200).send(req.params);
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`);
})