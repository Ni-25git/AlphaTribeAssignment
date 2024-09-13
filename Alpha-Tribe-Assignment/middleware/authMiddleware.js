const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET


const authMiddleware =( req,res,next)=>{
    var token = req.headers.authorization || req.cookies['token'];

    if(!token){
        return res.status(401).json({msg:'Unauthorized'})
    }
    
    try {
        const decoded = jwt.verify(token ,secretKey );
        req.user = decoded;
        next()
    } catch (error) {
        res.status(403).json({msg:'invalid token'})
    }
}

module.exports = authMiddleware;