import mongoose, { mongo }  from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please add a first name']
    },
    lastName:{
        type:String,
        required:[true,'Please add a last name']
    },
    email:{
        type:String,
        required:[true,'Please add email'],
        unique:true,
        match:[
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        minilength:6,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now(),

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:String,
    otpExpiry:{
        type:Date,
        index:{
            expires:'10m'
        }
    }


});

export default mongoose.model('User',userSchema);