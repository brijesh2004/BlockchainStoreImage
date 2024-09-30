const express = require('express');
const {uploadImageController} = require("../controllers/uploadImageController");
const router = express.Router();
const {uploadUserImage} = require("../middleware/multer");
const {authenticateToken} = require("../middleware/authenticate");
router.post('/uploadImage' , authenticateToken , uploadUserImage, uploadImageController);

module.exports = router;