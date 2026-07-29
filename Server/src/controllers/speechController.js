const { speechToText } = require("../services/speechService");

async function transcribeSpeech(req,res) {
    try{
        const file = req.file;
        const text = await speechToText(file);
        return res.status(200).json({
            success:true,
            message:"Transcribed successfully",
            file : file
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