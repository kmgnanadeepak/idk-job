const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ---------- Resume Analyze Endpoint ---------- */
app.post('/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Groq API key not configured' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `
You are a Resume Analyzer AI.

IMPORTANT:
Return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanations.
Do NOT include text outside JSON.
`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4096
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API Error:', errorData);
      return res.status(response.status).json({
        error: 'Failed to call Groq API',
        details: errorData
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: 'Invalid Groq response' });
    }

    res.json({ response: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

/* ---------- Health Check ---------- */
app.get('/health', (req, res) => {
  res.json({ status: 'Server running', time: new Date().toISOString() });
});

/* ---------- Start Server ---------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
