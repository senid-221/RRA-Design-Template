(function() {
  'use strict';

  var AI_CONFIG = {
    provider: 'openai',
    model: 'gpt-4o',
    maxTokens: 2000,
    temperature: 0.7
  };

  var chatOpen = false;
  var messagesEl, inputEl, sendBtn, fabBtn, chatEl, quickActionsEl;
  var conversationHistory = [];
  var isProcessing = false;

  function init() {
    var fabHtml = '<button class="ai-fab" id="aiFab" aria-label="Open AI Agent">' +
      '<img src="images/rra-icon.png" alt="RRA" class="ai-fab__logo">' +
      '<span class="ai-fab__badge">AI</span>' +
      '</button>';

    var chatHtml = '<div class="ai-chat" id="aiChat" role="dialog" aria-label="AI Agent">' +
      '<div class="ai-chat__header">' +
        '<div class="ai-chat__avatar"><img src="images/rra-icon.png" alt="RRA" class="ai-chat__avatar-img"></div>' +
        '<div class="ai-chat__header-info">' +
          '<h3 class="ai-chat__title">RRA AI Agent <span class="ai-chat__title-badge">Agent</span></h3>' +
          '<p class="ai-chat__status"><span class="ai-chat__status-dot"></span> Online — Intelligent Assistant</p>' +
        '</div>' +
        '<button class="ai-chat__close" id="aiChatClose" aria-label="Close"><i class="lucide" data-lucide="x" class="ai-chat__close-icon"></i></button>' +
      '</div>' +
      '<div class="ai-chat__messages" id="aiMessages"></div>' +
      '<div class="ai-chat__quick-actions" id="aiQuickActions"></div>' +
      '<div class="ai-chat__input-area">' +
        '<div class="ai-chat__input-wrap">' +
          '<textarea class="ai-chat__input" id="aiInput" placeholder="Ask me anything about RRA services..." rows="1"></textarea>' +
        '</div>' +
        '<button class="ai-chat__send" id="aiSend" aria-label="Send"><i class="lucide" data-lucide="send" class="ai-chat__send-icon"></i></button>' +
      '</div>' +
    '</div>';

    document.body.insertAdjacentHTML('beforeend', fabHtml);
    document.body.insertAdjacentHTML('beforeend', chatHtml);

    fabBtn = document.getElementById('aiFab');
    chatEl = document.getElementById('aiChat');
    messagesEl = document.getElementById('aiMessages');
    inputEl = document.getElementById('aiInput');
    sendBtn = document.getElementById('aiSend');
    quickActionsEl = document.getElementById('aiQuickActions');

    fabBtn.addEventListener('click', toggleChat);
    document.getElementById('aiChatClose').addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', handleSend);
    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    inputEl.addEventListener('input', autoResize);

    renderQuickActions();
    addBotMessage('Hello! I\'m your RRA AI Agent with advanced capabilities. I can help you with tax services, business registration, customs, social security, and more. I can also calculate taxes, check deadlines, and guide you through complex processes. What would you like to do today?', []);

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    chatEl.classList.toggle('open', chatOpen);
    fabBtn.classList.toggle('active', chatOpen);
    if (chatOpen) {
      inputEl.focus();
      scrollToBottom();
    }
  }

  function autoResize() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  }

  function renderQuickActions() {
    var actions = [
      { icon: 'calculator', text: 'Calculate Tax', query: 'Help me calculate my taxes' },
      { icon: 'file-text', text: 'File VAT Return', query: 'How do I file a VAT return?' },
      { icon: 'building', text: 'Register Business', query: 'I want to register a business' },
      { icon: 'credit-card', text: 'Make Payment', query: 'How do I make a tax payment?' },
      { icon: 'calendar', text: 'Check Deadlines', query: 'What are the tax deadlines?' },
      { icon: 'help-circle', text: 'Get TIN', query: 'How do I get a TIN?' }
    ];

    var html = '';
    actions.forEach(function(action) {
      html += '<button class="ai-chat__quick-action" data-query="' + action.query + '">' +
        '<i class="lucide ai-chat__quick-action-icon" data-lucide="' + action.icon + '"></i>' +
        action.text +
        '</button>';
    });
    quickActionsEl.innerHTML = html;

    quickActionsEl.querySelectorAll('.ai-chat__quick-action').forEach(function(btn) {
      btn.addEventListener('click', function() {
        handleQuery(btn.getAttribute('data-query'));
      });
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function handleSend() {
    if (isProcessing) return;
    var text = inputEl.value.trim();
    if (!text) return;
    addUserMessage(text);
    inputEl.value = '';
    inputEl.style.height = 'auto';
    processQuery(text);
  }

  function handleQuery(query) {
    if (isProcessing) return;
    addUserMessage(query);
    processQuery(query);
  }

  function addUserMessage(text) {
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var html = '<div class="ai-message ai-message--user">' +
      '<div class="ai-message__avatar"><i class="lucide" data-lucide="user" class="ai-message__avatar-icon"></i></div>' +
      '<div class="ai-message__content">' +
        '<div class="ai-message__bubble">' + escapeHtml(text) + '</div>' +
        '<span class="ai-message__time">' + time + '</span>' +
      '</div>' +
    '</div>';
    messagesEl.insertAdjacentHTML('beforeend', html);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    scrollToBottom();
  }

  function addBotMessage(html, actions, toolInfo) {
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var actionsHtml = '';
    if (actions && actions.length) {
      actionsHtml = '<div class="ai-message__actions">';
      actions.forEach(function(a, i) {
        var btnClass = a.primary ? 'ai-message__action-btn ai-message__action-btn--primary' : 'ai-message__action-btn';
        actionsHtml += '<button class="' + btnClass + '" data-action-idx="' + i + '">' + escapeHtml(a.text) + '</button>';
      });
      actionsHtml += '</div>';
    }

    var toolHtml = '';
    if (toolInfo) {
      toolHtml = '<div class="ai-message__tool">' +
        '<i class="lucide ai-message__tool-icon" data-lucide="wrench"></i>' +
        'Used: ' + escapeHtml(toolInfo) +
        '</div>';
    }

    var msgHtml = '<div class="ai-message ai-message--bot">' +
      '<div class="ai-message__avatar"><img src="images/rra-icon.png" alt="RRA" class="ai-message__avatar-img"></div>' +
      '<div class="ai-message__content">' +
        toolHtml +
        '<div class="ai-message__bubble">' + html + '</div>' +
        actionsHtml +
        '<span class="ai-message__time">' + time + '</span>' +
      '</div>' +
    '</div>';

    messagesEl.insertAdjacentHTML('beforeend', msgHtml);

    if (actions && actions.length) {
      var msgEl = messagesEl.lastElementChild;
      msgEl.querySelectorAll('.ai-message__action-btn').forEach(function(btn) {
        var idx = parseInt(btn.getAttribute('data-action-idx'));
        btn.addEventListener('click', function() { actions[idx].action(); });
      });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    scrollToBottom();
  }

  function showThinking(text) {
    var html = '<div class="ai-message ai-message--bot" id="aiThinking">' +
      '<div class="ai-message__avatar"><img src="images/rra-icon.png" alt="RRA" class="ai-message__avatar-img"></div>' +
      '<div class="ai-message__content">' +
        '<div class="ai-message__thinking">' +
          '<i class="lucide ai-message__thinking-icon" data-lucide="loader"></i>' +
          '<span>' + escapeHtml(text || 'Thinking...') + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
    messagesEl.insertAdjacentHTML('beforeend', html);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    scrollToBottom();
  }

  function removeThinking() {
    var thinking = document.getElementById('aiThinking');
    if (thinking) thinking.remove();
  }

  function showTyping() {
    var html = '<div class="ai-message ai-message--bot" id="aiTyping">' +
      '<div class="ai-message__avatar"><img src="images/rra-icon.png" alt="RRA" class="ai-message__avatar-img"></div>' +
      '<div class="ai-message__content"><div class="ai-message__bubble"><div class="ai-typing">' +
        '<span class="ai-typing__dot"></span><span class="ai-typing__dot"></span><span class="ai-typing__dot"></span>' +
      '</div></div></div></div>';
    messagesEl.insertAdjacentHTML('beforeend', html);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    scrollToBottom();
  }

  function removeTyping() {
    var typing = document.getElementById('aiTyping');
    if (typing) typing.remove();
  }

  function scrollToBottom() {
    requestAnimationFrame(function() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getSystemPrompt() {
    return 'You are the RRA AI Agent, an intelligent assistant for Rwanda Revenue Authority. You have advanced capabilities including:\n\n' +
      '- Tool calling: You can use tools to look up services, calculate taxes, check deadlines, and navigate users to pages\n' +
      '- Multi-step reasoning: You can break down complex queries into steps\n' +
      '- Context awareness: You remember the conversation history\n\n' +
      'YOUR KNOWLEDGE BASE:\n' +
      'Tax Services: VAT (18%), Income Tax (0-30%), PAYE, Excise Duty, Withholding Tax, EBM\n' +
      'Customs: Import/Export, e-Single Window, Trade Portal, Duties Calculator\n' +
      'Business Registration: Company registration, TIN, Trade License (via RDB)\n' +
      'Social Security: Pension, Medical Insurance, Voluntary Contributions (via RSSB)\n' +
      'Licensing: Various business licenses (via RURA)\n\n' +
      'OFFICIAL PLATFORMS:\n' +
      '- MyRRA (tax filing): https://myrra.rra.gov.rw/\n' +
      '- eTax (TIN registration): https://etax.rra.gov.rw/nidAssignedTIN/\n' +
      '- e-Single Window (customs): https://sw.gov.rw/\n' +
      '- Trade Portal: https://rwandatrade.rw/\n' +
      '- RDB (business registration): https://urs.rdb.rw/auth/register\n' +
      '- RSSB (social security): https://www.rssb.gov.rw/\n' +
      '- RURA (licensing): https://www.rura.gov.rw/\n\n' +
      'AVAILABLE TOOLS:\n' +
      '- lookup_tax_service: Get info about tax services\n' +
      '- lookup_customs_service: Get info about customs services\n' +
      '- lookup_business_registration: Get info about business registration\n' +
      '- lookup_social_security: Get info about RSSB services\n' +
      '- get_platform_url: Get official platform URLs\n' +
      '- calculate_tax_estimate: Calculate VAT, PAYE, income tax, corporate tax\n' +
      '- get_deadline_info: Get tax filing deadlines\n' +
      '- navigate_to_page: Navigate to website pages\n\n' +
      'BEHAVIOR RULES:\n' +
      '1. Use tools when appropriate to provide accurate, up-to-date information\n' +
      '2. Provide step-by-step guidance for complex processes\n' +
      '3. Always include official platform URLs when relevant\n' +
      '4. Be concise but comprehensive\n' +
      '5. Respond in the same language the user uses (English or Kinyarwanda)\n' +
      '6. Format responses clearly with numbered steps when appropriate\n' +
      '7. Offer to help with related tasks after answering\n' +
      '8. If unsure, guide users to contact RRA directly or visit the FAQ page';
  }

  async function callAIAgent(userMessage) {
    var messages = [{ role: 'system', content: getSystemPrompt() }];
    
    conversationHistory.forEach(function(msg) {
      messages.push({ role: msg.role, content: msg.content });
    });
    messages.push({ role: 'user', content: userMessage });

    var response = await fetch('/api/ai-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider: AI_CONFIG.provider,
        model: AI_CONFIG.model,
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error('API request failed: ' + response.status);
    }

    var data = await response.json();
    return data;
  }

  async function executeTool(toolName, args) {
    var response = await fetch('/api/ai-agent/execute-tool', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tool: toolName,
        args: args
      })
    });

    if (!response.ok) {
      throw new Error('Tool execution failed');
    }

    var data = await response.json();
    return data.result;
  }

  function parseAIResponse(response) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    var urls = response.match(urlRegex) || [];

    var lines = response.split('\n');
    var html = '';
    var inSteps = false;

    lines.forEach(function(line) {
      var stepMatch = line.match(/^\d+[\.\)]\s+(.+)/);
      if (stepMatch) {
        if (!inSteps) {
          html += '<div class="ai-message__steps">';
          inSteps = true;
        }
        var stepText = stepMatch[1].replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" class="ai-message__step-link">$1</a>');
        html += '<div class="ai-message__step"><span class="ai-message__step-num">' + (html.split('ai-message__step-num').length) + '</span><span class="ai-message__step-text">' + stepText + '</span></div>';
      } else {
        if (inSteps) {
          html += '</div>';
          inSteps = false;
        }
        var formattedLine = line.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" style="color:var(--navy);font-weight:600;">$1</a>');
        if (line.trim()) {
          html += '<p style="margin:8px 0;">' + formattedLine + '</p>';
        }
      }
    });

    if (inSteps) html += '</div>';

    return { html: html, urls: urls };
  }

  function getActionButtons(urls, context) {
    var actions = [];
    var uniqueUrls = [];

    urls.forEach(function(url) {
      if (uniqueUrls.indexOf(url) === -1) {
        uniqueUrls.push(url);
        var platform = 'Open Link';
        if (url.includes('myrra.rra.gov.rw')) platform = 'Open MyRRA';
        else if (url.includes('etax.rra.gov.rw')) platform = 'Open eTax';
        else if (url.includes('sw.gov.rw')) platform = 'Open e-Single Window';
        else if (url.includes('rwandatrade.rw')) platform = 'Open Trade Portal';
        else if (url.includes('rdb.rw')) platform = 'Go to RDB';
        else if (url.includes('rssb.gov.rw')) platform = 'Go to RSSB';
        else if (url.includes('rura.gov.rw')) platform = 'Go to RURA';

        actions.push({
          text: platform,
          action: function() { window.open(url, '_blank', 'noopener'); },
          primary: platform.includes('MyRRA') || platform.includes('RDB')
        });
      }
    });

    if (actions.length === 0 && context) {
      var lower = context.toLowerCase();
      if (lower.includes('tax') || lower.includes('vat') || lower.includes('paye') || lower.includes('ebm')) {
        actions.push({ text: 'Go to MyRRA', action: function() { window.open('https://myrra.rra.gov.rw/', '_blank', 'noopener'); }, primary: true });
      } else if (lower.includes('business') || lower.includes('register') || lower.includes('company')) {
        actions.push({ text: 'Go to RDB', action: function() { window.open('https://urs.rdb.rw/auth/register', '_blank', 'noopener'); }, primary: true });
      } else if (lower.includes('social') || lower.includes('pension') || lower.includes('rssb')) {
        actions.push({ text: 'Go to RSSB', action: function() { window.open('https://www.rssb.gov.rw/', '_blank', 'noopener'); }, primary: true });
      }
    }

    return actions;
  }

  async function processQuery(text) {
    if (isProcessing) return;
    isProcessing = true;
    sendBtn.disabled = true;
    
    conversationHistory.push({ role: 'user', content: text });
    showThinking('Analyzing your request...');

    try {
      var responseData = await callAIAgent(text);
      removeThinking();

      var message = responseData.choices[0].message;
      var toolCalls = message.tool_calls;

      if (toolCalls && toolCalls.length > 0) {
        showThinking('Using tools to gather information...');
        
        var toolResults = [];
        for (var i = 0; i < toolCalls.length; i++) {
          var toolCall = toolCalls[i];
          var toolName = toolCall.function.name;
          var toolArgs = JSON.parse(toolCall.function.arguments);
          
          var toolResult = await executeTool(toolName, toolArgs);
          toolResults.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: toolName,
            content: JSON.stringify(toolResult)
          });
        }

        removeThinking();
        showThinking('Processing results...');

        conversationHistory.push({ role: 'assistant', content: message.content, tool_calls: toolCalls });
        toolResults.forEach(function(tr) {
          conversationHistory.push(tr);
        });

        var followUpMessages = [{ role: 'system', content: getSystemPrompt() }];
        conversationHistory.forEach(function(msg) {
          if (msg.tool_calls) {
            followUpMessages.push({ role: 'assistant', content: msg.content, tool_calls: msg.tool_calls });
          } else if (msg.name) {
            followUpMessages.push({ role: 'tool', tool_call_id: msg.tool_call_id, name: msg.name, content: msg.content });
          } else {
            followUpMessages.push({ role: msg.role, content: msg.content });
          }
        });

        var finalResponse = await fetch('/api/ai-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: AI_CONFIG.provider,
            model: AI_CONFIG.model,
            messages: followUpMessages
          })
        });

        var finalData = await finalResponse.json();
        var finalMessage = finalData.choices[0].message.content;

        removeThinking();
        conversationHistory.push({ role: 'assistant', content: finalMessage });

        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-20);
        }

        var parsed = parseAIResponse(finalMessage);
        var actions = getActionButtons(parsed.urls, text);
        var toolNames = toolCalls.map(function(tc) { return tc.function.name; }).join(', ');

        addBotMessage(parsed.html, actions, toolNames);

      } else {
        var responseText = message.content;
        conversationHistory.push({ role: 'assistant', content: responseText });

        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-20);
        }

        var parsed = parseAIResponse(responseText);
        var actions = getActionButtons(parsed.urls, text);

        addBotMessage(parsed.html, actions);
      }

    } catch (error) {
      console.error('AI Agent Error:', error);
      removeThinking();
      processQueryLocal(text);
    }

    isProcessing = false;
    sendBtn.disabled = false;
  }

  function processQueryLocal(text) {
    var lower = text.toLowerCase();
    var bestMatch = null;
    var bestScore = 0;

    aiKnowledge.services.forEach(function(service) {
      var score = 0;
      service.keywords.forEach(function(kw) {
        if (lower.indexOf(kw) !== -1) {
          score += kw.length;
        }
      });
      if (lower.indexOf(service.title.toLowerCase()) !== -1) score += 20;
      if (lower.indexOf(service.category.toLowerCase()) !== -1) score += 5;
      if (lower.indexOf(service.platform.toLowerCase()) !== -1) score += 5;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = service;
      }
    });

    if (bestMatch && bestScore >= 3) {
      showServiceResult(bestMatch);
    } else {
      var fallback = 'I apologize, but I\'m having trouble connecting to my AI services right now. However, I can still help you! Here are some options:\n\n' +
        '1. Visit our <a href="faq.html" style="color:var(--navy);font-weight:600;">FAQ page</a> for common questions\n' +
        '2. Go to <a href="https://myrra.rra.gov.rw/" target="_blank" style="color:var(--navy);font-weight:600;">MyRRA</a> for tax services\n' +
        '3. Contact RRA directly for assistance\n\n' +
        'Would you like me to help you with something specific?';
      
      addBotMessage(fallback, [
        { text: 'Go to MyRRA', action: function() { window.open('https://myrra.rra.gov.rw/', '_blank', 'noopener'); }, primary: true },
        { text: 'View FAQ', action: function() { window.location.href = 'faq.html'; } }
      ]);
    }
  }

  function showServiceResult(service) {
    var stepsHtml = '<div class="ai-message__steps">';
    service.steps.forEach(function(step, i) {
      var linkMatch = step.match(/(https?:\/\/[^\s]+)/);
      var stepText = step;
      if (linkMatch) {
        stepText = step.replace(linkMatch[0], '<a href="' + linkMatch[0] + '" target="_blank" rel="noopener" class="ai-message__step-link">' + linkMatch[0] + '</a>');
      }
      stepsHtml += '<div class="ai-message__step">' +
        '<span class="ai-message__step-num">' + (i + 1) + '</span>' +
        '<span class="ai-message__step-text">' + stepText + '</span>' +
        '</div>';
    });
    stepsHtml += '</div>';

    var header = '<strong>' + service.title + '</strong> <span style="opacity:0.7">(' + service.category + ')</span><br>' +
      '<span style="font-size:13px">' + service.description + '</span>';

    var actions = [
      {
        text: 'Open ' + service.platform,
        action: function() { window.open(service.url, '_blank', 'noopener'); },
        primary: true
      }
    ];

    addBotMessage(header + stepsHtml, actions);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
