require("dotenv").config();

module.exports ={
    MONGODB_URL:process.env.MONGODB_URL,
    PORT:process.env.PORT||3000,
    PINATA_SECRETKEY:process.env.PINATA_SECRETKEY,
    PINATA_APIKEY:process.env.PINATA_APIKEY,
    JWT_SECRETKEY:process.env.JWT_SECRETKEY
}