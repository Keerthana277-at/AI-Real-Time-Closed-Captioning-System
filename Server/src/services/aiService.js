const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey:process.env.GROQ_API_KEY
});

async function simplifyText(text) {
    const response = await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        messages: [
            {
                role:"user",
                content:`
                    simplify the following sentence into simple English.
                    Return only the simplified sentence.
                    ${text}
                `
            }
        ]
    });

    return response.choices[0].message.content;

}

module.exports = {
    simplifyText
};