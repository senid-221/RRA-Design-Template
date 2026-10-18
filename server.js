const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, initDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const DATABASE_URL = process.env.DATABASE_URL || '';

// Initialize database on startup
initDatabase();

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
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await pool.query('SELECT 1');
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'error';
  }
  
  res.json({
    status: 'ok',
    openai: !!OPENAI_API_KEY,
    anthropic: !!ANTHROPIC_API_KEY,
    database: dbStatus
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, tin, category, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !category || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert contact submission into database
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, tin, category, subject, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at`,
      [name, email, phone || null, tin || null, category, subject, message]
    );

    res.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Insert or update newsletter subscription
    const result = await pool.query(
      `INSERT INTO newsletter_subscriptions (email)
       VALUES ($1)
       ON CONFLICT (email) 
       DO UPDATE SET is_active = true, subscribed_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [email]
    );

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

// Serve index.html for root route only
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`OpenAI API: ${OPENAI_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`Anthropic API: ${ANTHROPIC_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`Database: ${DATABASE_URL ? 'Configured' : 'Not configured'}`);
});
