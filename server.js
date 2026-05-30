import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
// import {marked} from "marked";

dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));



app.post("/generate", async (req, res) => {
  const { name, email, phone, education, skills, experience } = req.body;


 const prompt = `
You are a senior executive resume strategist and ATS optimization expert.

Create a premium, high-impact, ATS-optimized resume using ONLY the information provided below.

STRICT RULES:
- Do NOT add, assume, or invent any information.
- Do NOT include placeholders.
- Do NOT create fake achievements or metrics.
- Do NOT add sections not supported by the provided data.
- Do NOT include explanations, comments, or extra text.
- Use only the given information, but present it strategically and professionally.

OBJECTIVE:
Transform the provided raw details into a compelling, recruiter-ready resume that:
- Highlights value and impact
- Uses strong action verbs
- Emphasizes achievements (if mentioned)
- Aligns skills with experience
- Sounds confident and results-driven
- Is optimized for Applicant Tracking Systems (ATS)

TONE:
Professional, polished, confident, and corporate-level.

FORMATTING REQUIREMENTS (Markdown Only):
- Use ### for headings 
- Use - for bullet points
- Use ** for bold
- Wrote candidate’s name in bold at the top
- Keep spacing clean and structured
- No decorative symbols
- No emojis
- No horizontal lines
- No extra commentary

STRUCTURE (Only include sections that have data):
1. Name (bold at top)
2. Contact Information
3. Professional Summary (2–4 powerful lines).Must remember that summary should contain only 150 character in a line and after that shift to next line.
4. Skills
5. Experience
6. Education

CANDIDATE INFORMATION:

Name: ${name}
Email: ${email}
Phone: ${phone}
Education: ${education}
Skills: ${skills}
Experience: ${experience}

Return ONLY the final resume in proper Markdown format. 
`;


// const prompt =`You are a senior executive resume strategist and ATS optimization expert.

// Create a premium, high-impact, ATS-optimized resume using ONLY the information provided below.

// STRICT RULES:
// - Do NOT add, assume, or invent any information.
// - Do NOT include placeholders.
// - Do NOT create fake achievements or metrics.
// - Do NOT add sections not supported by the provided data.
// - Do NOT include explanations, comments, or extra text.
// - Use only the given information, but present it strategically and professionally.
// - Ensure the complete resume fits cleanly within ONE A4-sized page.
// - Avoid unnecessary spacing, long paragraphs, or repetitive wording.
// - Keep bullet points concise and impactful.
// - Prioritize readability, ATS compatibility, and compact professional formatting.
// - Ensure no section gets cut off or appears incomplete when exported as PDF in A4 format.

// OBJECTIVE:
// Transform the provided raw details into a compelling, recruiter-ready resume that:
// - Highlights value and impact
// - Uses strong action verbs
// - Emphasizes achievements (only if explicitly mentioned)
// - Aligns skills with experience
// - Sounds confident and results-driven
// - Is optimized for Applicant Tracking Systems (ATS)
// - Maintains a concise one-page executive resume format

// TONE:
// Professional, polished, confident, and corporate-level.

// FORMATTING REQUIREMENTS (Markdown Only):
// - Use ### for headings
// - Use - for bullet points
// - Use ** for bold
// - Write candidate’s name in bold at the top
// - Keep spacing clean, compact, and structured
// - No decorative symbols
// - No emojis
// - No horizontal lines
// - No extra commentary
// - Keep Professional Summary to 2–3 short lines maximum
// - Each summary line must stay within approximately 150 characters before moving to the next line
// - Keep Experience bullet points short and ATS-focused
// - Use minimal vertical spacing to preserve A4 layout balance

// STRUCTURE (Only include sections that have data):
// 1. Name (bold at top)
// 2. Contact Information
// 3. Professional Summary
// 4. Skills
// 5. Experience
// 6. Education

// CANDIDATE INFORMATION:

// Name: ${name}
// Email: ${email}
// Phone: ${phone}
// Education: ${education}
// Skills: ${skills}
// Experience: ${experience}

// Return ONLY the final resume in proper Markdown format.`;



  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  model: "meta-llama/llama-3-8b-instruct",
  messages: [{ role: "user", content: prompt }]
})
    });

    const data = await response.json();
res.json({
  resume: data.choices[0].message.content
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "API error" });
  }
});

// app.listen(3000, () => {
//   console.log("✅ Server running on http://localhost:3000");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// });