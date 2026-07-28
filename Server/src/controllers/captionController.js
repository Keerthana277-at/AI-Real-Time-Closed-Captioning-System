const  Caption  = require("../models/Caption");
const { simplifyText } = require("../services/aiService");
const { translateText } = require("../services/translation/translationService");
async function createCaptions(req,res) {
    try{
        req.body.user = req.user.id;

        console.log(req.body);

        console.log(req.user);

        const simplifiedText = await simplifyText(req.body.originalText);

        const translatedText = await translateText(simplifiedText);

        req.body.simplifiedText = simplifiedText;

        req.body.translatedText = translatedText;

        const captions = await Caption.create(req.body);

        return res.status(201).json({
            success : true,
            message:"The captions stored successfully",
            captions
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message :"Internal server error"
        });

    }
    
}

async function getCaptions(req,res) {
    try{
        const captions = await Caption.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });
        
        return res.status(200).json({
            success:"true",
            message:"Captions fetched successfully",
            captions
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

async function deleteCaptions(req,res) {
    try{
        const captions = await Caption.findById(req.params.id);
        if(!captions)
            return res.status(404).json({
                message:"Caption doesn't exist"
        })
        if(captions.user.toString() !== req.user.id){
            
            return res.status(403).json({
                message:"You're not authorized to delete this caption"
            });
        }
        
           await Caption.findByIdAndDelete(captions._id); 
            return res.status(200).json({
                message:"Caption Deleted Successfully"
            });
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        });
    }      
          
}

async function updateCaptions(req,res) {
    try{
         const captions = await Caption.findById(req.params.id);
        if(!captions)
            return res.status(404).json({
                message:"User not found"
        })
        if(captions.user.toString() !== req.user.id)
            return res.status(403).json({
                message:"You're not authorized to update this caption"
        });
        const simplifiedText = await simplifyText(req.body.originalText);

        const translatedText = await translateText(simplifiedText);

        req.body.simplifiedText = simplifiedText;

        req.body.translatedText = translatedText;

        const newCaption = await Caption.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );

        return res.status(200).json({
            success:true,
            message:"Captions updated successfully",
            caption : newCaption
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
   
}

module.exports = { createCaptions,
    getCaptions,
    deleteCaptions,
    updateCaptions
 };