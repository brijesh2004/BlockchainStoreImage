const crypto = require("crypto");

// generate a secure excryption key
const generateEncryptionKey = (length) =>{
    return crypto.randomBytes(length/2).toString('hex'); // Generating random bytes and convert
}

module.exports = {generateEncryptionKey};