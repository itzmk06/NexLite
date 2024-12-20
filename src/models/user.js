const mongoose = require("mongoose");
const validator=require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [3, "Username must be at least 3 characters long!"],
        maxLength: [30, "Username cannot exceed 30 characters!"],
        validate(value) {
            if (["admin", "root", "programmer", "developer", "nexlab", "nexlite"].includes(value)) {
                throw new Error("Please select a different username!");
            }
        },
    },
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [1, "First name must be at least 1 character long!"],
        maxLength: [50, "First name cannot exceed 50 characters!"],
        trim: true,
    },
    lastName: {
        type: String,
        minLength: [1, "Last name must be at least 1 character long!"],
        maxLength: [50, "Last name cannot exceed 50 characters!"],
        trim: true,
        default: "",
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        trim: true,
        minLength: [6, "Email must be at least 6 characters long!"],
        maxLength: [254, "Email cannot exceed 254 characters!"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`${value} is not valid email id!`);
            }
        }
    },
    age: {
        type: Number,
        required: [true, "Age is required!"],
        min: [18, "Age must be at least 18!"],
        max: [120, "Age cannot exceed 120!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [8, "Password must be at least 8 characters long!"],
        maxLength: [64, "Password cannot exceed 64 characters!"],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/.test(value);
            },
            message: "Password must include an uppercase letter, a lowercase letter, a number, and a special character.",
        },
    },
    gender: {
        type: String,
        required: [true, "Gender is required!"],
        lowercase: true,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender must be 'male', 'female', or 'other'.");
            }
        },
    },
    about: {
        type: String,
        minLength: [10, "About section must be at least 10 characters long!"],
        maxLength: [500, "About section cannot exceed 500 characters!"],
    },
    skills:{
        type:[String],
        validate:{
            validator:function(arr){
                return arr.length>=0&&arr.length<=100
            },
            message:"Skills should not exceed 100"
        },
        lowercase:true,
        trim:true,
    },
    portfolio: {
        type: String,
        minLength: [10, "Portfolio URL must be at least 10 characters long!"],
        maxLength: [2083, "Portfolio URL cannot exceed 2083 characters!"],
        validate: {
            validator: function (value) {
                return /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/.test(value);
            },
            message: "Please provide a valid URL!",
        },
    },
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = { User };
