const mongoose = require("mongoose");

const User = new mongoose.Schema({
    userAddress: {
        type: String,
        unique:true,
        required: true
    },
    encryptionKey: {
        type: Buffer,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model("users" , User);

module.exports = UserModel;