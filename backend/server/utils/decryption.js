const crypto = require("crypto");

const decryptData = (encryptedData , iv , encryptionKey) =>{
    // convert it and encryptionData to Buffer if they are not already in the correct format
    try{
      if(typeof iv==='object' &&iv.type==='Buffer'&&Array.isArray(iv.data)){
        iv = Buffer.from(iv.data);
      }

      if(typeof encryptedData === 'object'&&encryptedData.type==='Buffer'&&Array.isArray(encryptedData.data)){
        encryptedData = Buffer.from(encryptedData.data);
      }

      // create a decipher object with the same alorithm and key
      const decipher = crypto.createDecipheriv('aes-256-cbc' , Buffer.from(encryptionKey), iv);
      const decryptedData = Buffer.concat([decipher.update(encryptedData) , decipher.final()]);
      return decryptedData;
    }
    catch(error){
        console.error(error);
    }
}

module.exports = {decryptData};