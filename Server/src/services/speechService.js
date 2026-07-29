const Groq = require("groq-sdk");
const { model } = require("mongoose");
const fs = require("fs");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function speechToText(files) {
    const transcription = await groq.audio.transcriptions.create({
        file: fs.createReadStream(files.path),
        model: "whisper-large-v3"
    });

    return transcription.text;
}

module.exports = {
    speechToText
};