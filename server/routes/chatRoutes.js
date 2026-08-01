const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are the RedRoute Assistant, a helpful chatbot for a blood donor finder web app called RedRoute.
Help users with:
- Blood donation eligibility (age, weight, gap between donations)
- Blood group compatibility (who can donate to whom)
- How to register as a donor on this app
- How to search for donors
- General blood donation myths/facts

Keep answers short, friendly, and in simple language. If asked something unrelated to blood donation or this app, politely redirect back to the topic. Do not give specific medical advice for individual health conditions — suggest consulting a doctor for that.`;

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("CHAT ERROR:", error.message);
    res.status(500).json({ message: "Chat service error" });
  }
});

module.exports = router;