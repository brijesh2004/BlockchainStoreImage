// const ethers = require('ethers');
const {decryptData} = require('../utils/decryption');
const UserModel = require("../models/User");
const axios =  require('axios');


async function returnIpfsResponse(ipfsHash){
   const PINATA_GATEWAY_URL = `https://gateway.pinata.cloud/ipfs`;
   const res = await axios(`${PINATA_GATEWAY_URL}/${ipfsHash}`);
   return res.data;
}

async function getImageController(req , res , next){
    try{
       const address = req.address;
       const userAddress = address.toLowerCase();
       const user = await UserModel.findOne({userAddress:userAddress});
       if(!user){
         throw new Error("User Does Not exist")
      }
       const {page , limit} = req.query;
       const pageNumber = parseInt(page) || 1;
       const limitNumber = parseInt(limit) || 1;
       console.log(pageNumber , limitNumber);
        
       if(pageNumber<1||limitNumber<1){
         throw new Error("Pagination issue");
       }
       const startIndex = (pageNumber-1)*limitNumber;
       const endIndex = pageNumber*limitNumber;

       const ipfsHashArray = req.body.slice(startIndex , Math.min(req.body.length , endIndex));
       const decryptedImageArr = [];

       if(ipfsHashArray.length!==0){
         const encryptedDataArr = await Promise.all(ipfsHashArray.map(async(ipfsHash)=>{
            const res = await returnIpfsResponse(ipfsHash);
            return res;
         }))
         for(const img of encryptedDataArr){
                const decryptedImgData = decryptData(img.encryptedData , img.iv , user.encryptionKey);
                decryptedImageArr.push(decryptedImgData.toString('base64'));
         }
       }
      console.log(decryptedImageArr);
       return res.status(200).json({message:'Image Send' , decryptedImageArr});
    }
    catch(err){

    }
}

module.exports = {getImageController}