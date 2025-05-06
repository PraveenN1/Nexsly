const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

async function sendOtpEmail(email,code){
    const info=await transporter.sendMail({
        from:`"Advice Hub" <${process.env.EMAIL_USER}>`,
        to:email,
        subject:"Your Login OTP for Advice Hub",
        text:`Your OTP is: ${code}`
    })
    console.log("OTP email sent:", info.response);
}

module.exports=sendOtpEmail;