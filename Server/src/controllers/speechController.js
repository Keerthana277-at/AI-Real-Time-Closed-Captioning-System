const { speechToText } = require("../services/speechService");
const aiService = require("../services/aiService");
console.log("AI Service:",aiService);
const caption = require("../models/Caption");
const Caption = require("../models/Caption");
async function transcribeSpeech(req,res) {
    try{

        const file = req.file;
        console.log("TRANSCRIBE CONTROLLER CALLED");

        console.log("FILE:", req.file);
        const text = await speechToText(file);
        const simplifiedText = await aiService.simplifyText(text);
        const translatedText = await aiService.translateText(simplifiedText); 
        const caption = await Caption.create({
            user:req.user.id,
            originalText:text,
            simplifiedText:simplifiedText,
            translatedText:translatedText,
            language:"Tamil"
        });
        return res.status(200).json({
            success:true,
            message:"Transcribed successfully",
            caption:caption
        }); 
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
       
}

module.exports = {
    transcribeSpeech
};