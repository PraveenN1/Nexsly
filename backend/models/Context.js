const mongoose = require("mongoose");
const { encryptField, decryptField } = require("../utils/encryption");

const encryptedField = {
  type: mongoose.Schema.Types.Mixed,
  required: true,
  set: encryptField,
  get: decryptField,
};

const ContextSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ipAddress: encryptedField,
    country: encryptedField,
    city: encryptedField,
    device: encryptedField,
    browser: encryptedField,
    deviceType: encryptedField,
  },
  {
    timestamps: true,
    toJSON: { getters: true }, 
    toObject: { getters: true },
  }
);

const Context=mongoose.model("Content",ContextSchema);
module.exports=Context;