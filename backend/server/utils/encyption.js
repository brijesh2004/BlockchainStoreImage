const crypto = require("crypto");
const encryptFile = (fileBuffer , encryptionKey)=>{
    // generate a random initialization vector
    const iv = crypto.randomBytes(16);

    // create a cipher object with AES-256-CBC algorithm and the provided encryption key
    const cipher= crypto.createCipheriv('aes-256-cbc' ,Buffer.from(encryptionKey) , iv);

    // Encrypt the file data
    const encryptedData = Buffer.concat([cipher.update(fileBuffer) , cipher.final()]);

    // Return the encrypted data and initialization vector
    return {encryptedData , iv};
}
module.exports = {encryptFile};