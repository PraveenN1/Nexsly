const jwt = require("jsonwebtoken");
const User=require("../models/user.js");
const { generateUsername } = require("../utils/generateUsername.js");
const { sendOTP } = require("./otp.js");

async function loginUser(req,res){
    const {email}=req.body;

    if(!email){
        return loginGuest(req,res);
    }
    const findUser = await User.findOne({email});
    
    if(!findUser){
        res.status(404).json({error:"User not found"});
    }
    
    req.body.email=email;
    return sendOTP(req,res);
}

async function loginGuest(req,res){
    try{
        const username=await generateUsername();

        const user=await User.create({
            username,
            isGuest:true,
        });

        const token=jwt.sign(
            {userId:user._id,username:user.username,isGuest:user.isGuest},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        console.log("guestdetails",token);

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        });

        res.status(201).json({
            message:'Guest Login Successful',
            token,
            user,
        });
        res.redirect("/");
        req.user=user;
        console.log(req.user);
    }catch(error){
        console.error(error);
        res.status(500).json({error:`Something went wrong`});
    }
}

async function logOutUser(req,res){
    return res.clearCookie("token").json({message:"Logged Out"}).redirect("/");
}

module.exports={loginUser,loginGuest,logOutUser};