const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const key = "70303be0f810e1e7b85752a1683d8139";

//A Buffer in Node.js is a built-in object used to handle binary data (like bytes) directly — especially useful for tasks like encryption, file I/O, or working with network protocols.
const encryptData = (data) => {
  const iv=crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
    tag: tag.toString("hex"),
  };
};

const decryptData = (encryptedData)=>{
    const iv=Buffer.from(encryptedData.iv,"hex");
    const tag=Buffer.from(encryptedData.tag,"hex");
    const decipher=crypto.createDecipheriv(algorithm,key,iv);
    decipher.setAuthTag(tag);
    let decrypted=decipher.update(encryptedData.encryptedData,'hex','utf-8');
    decrypted+=decipher.final('utf-8');
    return decrypted;
}

module.exports={
    encryptField:(value)=>encryptData(value),
    decryptField: (encryptedData) =>
        decryptData(encryptedData),
    encryptData,
    decryptData
};
