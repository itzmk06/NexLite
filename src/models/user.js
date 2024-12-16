const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    }
});

const User=mongoose.model("User",userSchema);

module.exports={User};



