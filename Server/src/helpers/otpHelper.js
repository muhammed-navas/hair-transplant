export const generateOtp=()=>{
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    return {otp,otpExpiry};
}