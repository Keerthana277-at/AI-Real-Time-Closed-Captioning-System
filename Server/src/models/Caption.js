const mongoose = require("mongoose");
const user = require("./User");
const captionSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    originalText:{
        type:String,
        required:true
    },
    simplifiedText:{
        type:String,
   
    },
    translatedText:{
        type:String,
        
    },
    language:{
        type:String,
        default:"English"
    }  
},
    {
        timestamps:true
    }
)

const Caption = mongoose.model("Caption",captionSchema);
module.exports =  Caption;
