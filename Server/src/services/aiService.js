const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})
async function simplifyText(text) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: `
        Simplify the following sentence into simple English.
        Return only the simplified sentence.

        ${text}
    `
    })
    console.log(response);
    return response;
}  

module.exports ={
    simplifyText
} ;