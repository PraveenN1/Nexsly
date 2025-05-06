const {Schema,model} = require('mongoose');

const otpSchema = new Schema({
  email: String,
  code: String,
  createdAt: { type: Date, default: Date.now, expires: 300 } 
});

module.exports = model('Otp', otpSchema);
