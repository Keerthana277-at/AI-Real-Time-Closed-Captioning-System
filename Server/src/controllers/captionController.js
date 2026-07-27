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

module.exports = { createCaptions };