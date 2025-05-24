import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    postcode:{
        type:Number,
        required:true
    },
    mobilePhone:{
        type:String,
        required:true
    },
    landMark:{
        type:String
    },
})

export default mongoose.model('Address',addressSchema);