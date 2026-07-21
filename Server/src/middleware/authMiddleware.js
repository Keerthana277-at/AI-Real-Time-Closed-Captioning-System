const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next) {
    try{
         const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"Access denied. No token provided."
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log(decoded);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message:"Expaired or invalid token"
        })
    }
   
}

module.exports = authMiddleware;