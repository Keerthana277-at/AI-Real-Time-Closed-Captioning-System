const User = require("../models/User");

async function RegisterUser(req,res) {
    try{
         console.log(req.body);
         const exists = await User.findOne({ email:req.body.email });
         if(exists)
            return res.status(400).json({message:"User already exists"});
         const user = await User.create(req.body);
        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:user
        })
    }catch(error){
        console.log(error);
    }
   
}

module.exports = {
    RegisterUser
};