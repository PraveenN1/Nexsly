const express = require('express');
const rateLimit = require('express-rate-limit');
const {sendOTP,verifyOTP}=require("../controllers/otp")
const {loginUser,loginGuest,logOutUser}=require("../controllers/auth");

const router = express.Router();

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: 'Too many OTP requests, try again later.'
});

// POST /auth/send-code
router.post('/send-code', otpLimiter, sendOTP);
// POST /auth/verify-code
router.post('/verify-code',verifyOTP);

//POST /auth/user-login
router.post('/user-login',loginUser);

//POST /auth/guest-login
router.post('/guest-login',loginGuest);

//POST /auth/user-logout
router.post('/user-logout',logOutUser);

module.exports = router;
