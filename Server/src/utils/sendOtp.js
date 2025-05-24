import nodemailer from 'nodemailer';

export const sendOtpToUser = async (email, otp) => {
    try {
       
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.FROM_EMAIL, 
            to: email, 
            subject: 'Your OTP Code', 
            text: `Your OTP code is ${otp}. It will expire in 10 minutes.`, 
        };

   
        await transporter.sendMail(mailOptions);

        console.log('OTP email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Error sending OTP email');
    }
};