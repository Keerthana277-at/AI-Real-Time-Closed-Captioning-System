const { speechToText } = require("../services/speechService");
const aiService = require("../services/aiService");
console.log("AI Service:",aiService);
async function transcribeSpeech(req,res) {
    try{

        const file = req.file;
        console.log("TRANSCRIBE CONTROLLER CALLED");

        console.log("FILE:", req.file);
        const text = await speechToText(file);
        const simplifiedText = await aiService.simplifyText(text);
        return res.status(200).json({
            success:true,
            message:"Transcribed successfully",
            text : text,
            simplifiedText:simplifiedText
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