# RRA AI Assistant - API Configuration Guide

## Overview
The AI assistant now supports real AI APIs (OpenAI and Anthropic) with automatic fallback to local knowledge base.

## Configuration

### 1. OpenAI API (Recommended)

**Get API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy the key (starts with `sk-`)

**Configure in `js/ai-assistant.js`:**
```javascript
var AI_CONFIG = {
  provider: 'openai',
  apiKey: 'sk-your-api-key-here',
  model: 'gpt-4o-mini',  // or 'gpt-4o' for more advanced responses
  maxTokens: 1000,
  temperature: 0.7
};
```

**Pricing:**
- GPT-4o-mini: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- GPT-4o: ~$2.50 per 1M input tokens, ~$10.00 per 1M output tokens
- Typical conversation: ~1000-2000 tokens total

### 2. Anthropic API (Claude)

**Get API Key:**
1. Go to https://console.anthropic.com/
2. Create API key
3. Copy the key (starts with `sk-ant-`)

**Configure in `js/ai-assistant.js`:**
```javascript
var AI_CONFIG = {
  provider: 'anthropic',
  apiKey: 'sk-ant-your-api-key-here',
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 1000,
  temperature: 0.7
};
```

**Pricing:**
- Claude 3.5 Sonnet: ~$3.00 per 1M input tokens, ~$15.00 per 1M output tokens

### 3. Local Mode (No API Key)

If no API key is provided, the assistant uses the local knowledge base with keyword matching:

```javascript
var AI_CONFIG = {
  provider: 'local',
  apiKey: '',
  model: 'local',
  maxTokens: 0,
  temperature: 0
};
```

## Features

### With API Key:
- ✅ Natural language understanding
- ✅ Context-aware responses (remembers conversation)
- ✅ Step-by-step guidance
- ✅ Multi-language support (English/Kinyarwanda)
- ✅ Handles complex queries
- ✅ Provides relevant platform links

### Without API Key (Local Mode):
- ✅ Keyword-based matching
- ✅ Pre-defined service information
- ✅ Step-by-step guides for known services
- ✅ Fallback responses for unknown queries

## Security Note

⚠️ **Important:** API keys in client-side JavaScript are visible to users. For production:

1. **Use a backend proxy** - Create a simple server endpoint that holds the API key
2. **Rate limiting** - Implement usage limits to prevent abuse
3. **Domain restrictions** - Some APIs allow restricting keys to specific domains

### Example Backend Proxy (Node.js/Express):
```javascript
app.post('/api/ai-chat', async (req, res) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
});
```

Then update `callOpenAIAPI` to use `/api/ai-chat` instead of the direct OpenAI URL.

## Testing

1. Open the website
2. Click the AI assistant button (bottom-right)
3. Try asking:
   - "How do I register for TIN?"
   - "What documents do I need for VAT registration?"
   - "How to file PAYE?"
   - "Register a new business"

## Troubleshooting

**Error: "API key not configured"**
- Add your API key to `AI_CONFIG.apiKey`

**Error: "API request failed: 401"**
- Check your API key is correct
- Verify the key hasn't expired

**Error: "API request failed: 429"**
- Rate limit exceeded
- Wait a moment or increase rate limits in your API dashboard

**Responses seem slow**
- Check your internet connection
- Try using `gpt-4o-mini` instead of `gpt-4o` (faster)
- Reduce `maxTokens` if responses are too long

## Conversation Memory

The assistant remembers the last 10 messages in the conversation for context. This is stored in the `conversationHistory` array and automatically managed.

## Customization

### Change System Prompt
Edit the `getSystemPrompt()` function to customize the AI's behavior and knowledge.

### Add More Services
Add services to the `aiKnowledge.services` array in `js/ai-knowledge.js`.

### Adjust Response Style
Modify `temperature` (0.0-1.0):
- Lower (0.2-0.5): More focused, deterministic
- Higher (0.7-1.0): More creative, varied
