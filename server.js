const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

// AI Chat endpoint
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { provider, model, messages, maxTokens, temperature } = req.body;

    if (provider === 'openai') {
      if (!OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API key not configured' });
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: model || 'gpt-4o-mini',
          messages: messages,
          max_tokens: maxTokens || 1000,
          temperature: temperature || 0.7
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return res.status(response.status).json({ error: `OpenAI API error: ${error}` });
      }

      const data = await response.json();
      res.json(data);

    } else if (provider === 'anthropic') {
      if (!ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: 'Anthropic API key not configured' });
      }

      const systemMessage = messages.find(m => m.role === 'system');
      const chatMessages = messages.filter(m => m.role !== 'system');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model || 'claude-3-5-sonnet-20241022',
          max_tokens: maxTokens || 1000,
          system: systemMessage ? systemMessage.content : '',
          messages: chatMessages
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return res.status(response.status).json({ error: `Anthropic API error: ${error}` });
      }

      const data = await response.json();
      res.json(data);

    } else {
      res.status(400).json({ error: 'Invalid provider' });
    }

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    openai: !!OPENAI_API_KEY,
    anthropic: !!ANTHROPIC_API_KEY
  });
});

// Serve index.html for root route only
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`OpenAI API: ${OPENAI_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`Anthropic API: ${ANTHROPIC_API_KEY ? 'Configured' : 'Not configured'}`);
});
