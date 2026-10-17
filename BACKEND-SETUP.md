# RRA Website - Backend Deployment Guide

## Overview
The AI assistant now uses a secure backend proxy for API calls. API keys are stored server-side, not exposed to clients.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys
Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
OPENAI_API_KEY=sk-your-actual-openai-key
ANTHROPIC_API_KEY=sk-ant-your-actual-anthropic-key
PORT=3000
```

### 3. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000` (or your configured PORT).

### 4. Access the Website
Open `http://localhost:3000` in your browser.

## Production Deployment

### Option 1: Node.js Hosting (Heroku, Railway, Render)

1. Upload all files to your hosting provider
2. Set environment variables in the hosting dashboard:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `PORT` (usually provided automatically)
3. Deploy

### Option 2: VPS/Dedicated Server

1. Install Node.js on your server
2. Upload project files
3. Install dependencies: `npm install`
4. Create `.env` file with your API keys
5. Start with PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name rra-website
   pm2 save
   pm2 startup
   ```
6. Configure Nginx as reverse proxy (optional but recommended)

### Option 3: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t rra-website .
docker run -p 3000:3000 --env-file .env rra-website
```

## Security Notes

✅ **API keys are secure** - Stored in environment variables, never sent to client
✅ **CORS enabled** - Can be restricted to specific domains if needed
✅ **Error handling** - API errors don't expose sensitive information
✅ **Rate limiting** - Consider adding rate limiting for production

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No* | OpenAI API key (required if using OpenAI) |
| `ANTHROPIC_API_KEY` | No* | Anthropic API key (required if using Anthropic) |
| `PORT` | No | Server port (defaults to 3000) |

*At least one API key must be configured for AI features to work.

## Testing

1. Start the server: `npm start`
2. Open `http://localhost:3000`
3. Click the AI assistant button (bottom-right)
4. Ask a question like "How do I register for TIN?"
5. The assistant should respond with AI-powered guidance

## Troubleshooting

**Error: "OpenAI API key not configured"**
- Check your `.env` file has `OPENAI_API_KEY` set
- Restart the server after changing `.env`

**Error: "Cannot find module 'express'"**
- Run `npm install` to install dependencies

**Port already in use**
- Change `PORT` in `.env` to a different port (e.g., 3001)
- Or stop the process using the current port

**AI responses not working**
- Check server logs for errors
- Verify API keys are valid
- Check API quota/billing status

## File Structure

```
├── server.js          # Backend server with AI proxy
├── package.json       # Node.js dependencies
├── .env.example       # Example environment variables
├── .env              # Your actual API keys (gitignore this!)
├── index.html        # Main website
├── js/
│   └── ai-assistant.js  # Frontend AI chat (calls /api/ai-chat)
└── ... (other static files)
```

## API Endpoint

### POST /api/ai-chat

**Request Body:**
```json
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user", "content": "..." }
  ],
  "maxTokens": 1000,
  "temperature": 0.7
}
```

**Response:**
- OpenAI: Standard OpenAI chat completion response
- Anthropic: Standard Anthropic messages response

### GET /api/health

Returns server status and which APIs are configured.
