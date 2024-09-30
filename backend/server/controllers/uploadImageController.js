const ethers = require('ethers');
const UserModel = require('../models/User');
const {PINATA_APIKEY , PINATA_SECRETKEY} = require("../config/serverConfig");
const {generateEncryptionKey} = require('../utils/generateKey');
const {encryptFile} = require("../utils/encyption");

async function uploadImageController(req , res , next){
    try{
        //  console.log(req.file);
         const address = req.address;
         const userAddress = address.toLowerCase();
         const user = await UserModel.findOne({userAddress:userAddress});
         if(!user){
            throw new Error("User Does Not exist")
         }

         if(user.encryptionKey===null){
            const encryptionKey = generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save();
         }

         const {encryptedData , iv} = encryptFile(req.file.buffer ,user.encryptionKey);
         console.log(encryptedData);
         console.log(iv);
            // Use the api keys by specifying your api key and api secret
            const pinataSDK = require('@pinata/sdk');
            const pinata = new pinataSDK({ pinataApiKey: PINATA_APIKEY, pinataSecretApiKey: PINATA_SECRETKEY });

            // upload to pinata server
            const resPinata = await pinata.pinJSONToIPFS({encryptedData , iv});
            console.log(resPinata);
        //     const res = await pinata.testAuthentication()
        //    console.log(res)
          // "message": "Congratulations! You are communicating with the Pinata API"!"
        res.status(200).json({IpfsHash:resPinata.IpfsHash , message:"Image Uploaded"});
    }
    catch(err){
        console.log(err);
      res.status(500).json({error:'Error'});
    }
}
module.exports ={uploadImageController};


// to see the image 
// https://gateway.pinata.cloud/ipfs/QmSdh9Jqq9bWszD95AEtiiim9ZWW1u7sVnprV6e5ViZugP