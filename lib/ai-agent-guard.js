'use strict';

const TOOL_NAME_PATTERN = /^[a-z][a-z0-9_]{0,63}$/;
const VALID_ROLES = new Set(['system', 'user', 'assistant', 'tool']);

function isAllowedTool(tool, allowedTools) {
  return typeof tool === 'string'
    && TOOL_NAME_PATTERN.test(tool)
    && Array.isArray(allowedTools)
    && allowedTools.includes(tool);
}

function validateChatMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { valid: false, error: 'Messages must be a non-empty array.' };
  }
  if (messages.length > 40) {
    return { valid: false, error: 'Too many messages. Start a new conversation.' };
  }

  for (const message of messages) {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
      return { valid: false, error: 'Each message must be an object.' };
    }
    if (!VALID_ROLES.has(message.role)) {
      return { valid: false, error: 'A message has an unsupported role.' };
    }

    const hasToolCalls = message.role === 'assistant'
      && Array.isArray(message.tool_calls)
      && message.tool_calls.length > 0;
    const validContent = typeof message.content === 'string'
      || (message.content === null && hasToolCalls);

    if (!validContent) {
      return { valid: false, error: 'Message content must be text, except assistant tool-call messages.' };
    }
    if (typeof message.content === 'string' && message.content.length > 12000) {
      return { valid: false, error: 'A message exceeds the 12,000-character limit.' };
    }
    if (message.role === 'tool' && (typeof message.tool_call_id !== 'string' || !message.tool_call_id)) {
      return { valid: false, error: 'Tool results must include their tool-call ID.' };
    }
    if (message.tool_calls && !hasToolCalls) {
      return { valid: false, error: 'Invalid assistant tool-call structure.' };
    }
  }

  return { valid: true };
}

function checkRateLimit(key, now, buckets, maxRequests, windowMs) {
  const safeKey = String(key || 'unknown');
  let bucket = buckets.get(safeKey);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(safeKey, bucket);
  }

  bucket.count += 1;

  // Opportunistically prune expired buckets to keep memory bounded.
  if (buckets.size > 5000) {
    for (const [entryKey, entry] of buckets) {
      if (now >= entry.resetAt) buckets.delete(entryKey);
    }
  }

  return {
    allowed: bucket.count <= maxRequests,
    remaining: Math.max(0, maxRequests - bucket.count),
    resetAt: bucket.resetAt
  };
}

module.exports = { isAllowedTool, validateChatMessages, checkRateLimit };
