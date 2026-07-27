const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function translateText(text) {
    const response = await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        messages: [
            {
                role:"user",
                content:`
                    Translate the following text into Tamil.
                    Return only the translated text.

                    ${text}
                `
            }
        ]
    });

    return response.choices[0].message.content;
}

module.exports = {
    translateText
};