const jwt = require("jsonwebtoken");
const {JWT_SECRETKEY} = require("../config/serverConfig");
async function authenticateToken(req, res, next) {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            throw new Error("No Token Found");
        }

        const decoded = jwt.verify(token , JWT_SECRETKEY);
        console.log(decoded);
        req.address = decoded.address;
        next();
    }
    catch (err) {
       res.status(401).json({message:"Unauthorized Used"});
    }

}

module.exports = { authenticateToken }