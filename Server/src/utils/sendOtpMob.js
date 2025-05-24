import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid=process.env.ACCOUNT_SID;
const authToken=process.env.TWILIO_TOKEN;

const client=twilio(accountSid,authToken);

console.log("process.env.TWILIO_NUMBER:",process.env.TWILIO_NUMBER);

export const sendOtpMob=async(mobileNumber,otp)=>{
    try {
        await client.messages.create({
            body:`Your OTP is ${otp}`,
            to:mobileNumber,
            from:process.env.TWILIO_NUMBER
        })

    } catch (error) {
        console.log("catched by this error");
        console.error('Error sending OTP:',error);
        throw new Error('Failed to send OTP');
    }

};