const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function RegisterUser(req,res) {
    try{
         console.log(req.body);
         const exists = await User.findOne({ email:req.body.email });
         if(exists)
            return res.status(400).json({message:"User already exists"});
         const hashedPassword = await bcrypt.hash(req.body.password,10);
         req.body.password = hashedPassword;
         const user = await User.create(req.body);
        
        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:user
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
   
}

async  function LoginUser(req,res){
    try{
        const user = await User.findOne({ email:req.body.email});
        
        if(!user)
            return res.status(404).json({
                message:"User not found . Kindly pls register"
        });
        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isMatch)
            return res.status(401).json({
          message:"Credentials invalid"
        })
         const token = jwt.sign(
            { id : user._id},
            process.env.JWT_SECRET,
            { expiresIn:"1d"}
         );
        return res.status(200).json({
            success:true,
            message:"Login successfull",
            token:token 
        });
    }catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {
    RegisterUser,
    LoginUser
};