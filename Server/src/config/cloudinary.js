import {v2 as cloudinary} from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadIcon=async(buffer)=>{
    return new Promise((resolve,reject)=>{
        const uploadStream=cloudinary.uploader.upload_stream((error,result)=>{
            if(error){
                return reject (error);
            }
            resolve(result?.secure_url || '');
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

export default uploadIcon;