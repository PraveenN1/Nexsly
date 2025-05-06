const { encryptField, decryptField } = require("../utils/encryption");

// Sample data for testing encryption and decryption
const sampleData = "This is a test message";

// Encrypt the data
const encryptedData = encryptField(sampleData);
console.log("Encrypted Data:", encryptedData);

// Decrypt the data
const decryptedData = decryptField(encryptedData);
console.log("Decrypted Data:", decryptedData);

// Test to ensure the decrypted data matches the original
if (decryptedData === sampleData) {
  console.log("Test passed: Decrypted data matches the original!");
} else {
  console.log("Test failed: Decrypted data does not match the original.");
}
