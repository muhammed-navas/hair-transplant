import mongoose from "mongoose";

const stockSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:0
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model('Stock',stockSchema);