const User = require("../models/user");
const Otp = require("../models/Otp");
const sendOtpEmail = require("../utils/sendOtpEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { generateUsername } = require("../utils/generateUsername.js");

async function sendOTP(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const code = crypto.randomInt(100000, 999999).toString();
  await Otp.create({ email, code });
  await sendOtpEmail(email, code);

  res.json({ message: "OTP sent to email" });
}

async function verifyOTP(req, res) {
  const { email, code } = req.body;

  const otpDoc = await Otp.findOne({ email, code });
  if (!otpDoc) return res.status(400).json({ error: "Invalid or expired code" });

  let user = await User.findOne({ email });
  const username = await generateUsername();
  if (!user) user = await User.create({ username, email });

  await Otp.deleteMany({ email });

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Login successful", token, user });
}

module.exports = {
  sendOTP,
  verifyOTP,
};
