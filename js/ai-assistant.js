(function() {
  'use strict';

  var AI_CONFIG = {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4o-mini',
    maxTokens: 1000,
    temperature: 0.7
  };

  var chatOpen = false;
  var messagesEl, inputEl, sendBtn, fabBtn, chatEl, suggestionsEl;
  var conversationHistory = [];

  function init() {
    var fabHtml = '<button class="ai-fab" id="aiFab" aria-label="Open AI Assistant">' +
      '<img src="images/rra-icon.png" alt="RRA" class="ai-fab__logo">' +
      '</button>';

    var chatHtml = '<div class="ai-chat" id="aiChat" role="dialog" aria-label="AI Assistant">' +
      '<div class="ai-chat__header">' +
        '<div class="ai-chat__avatar"><img src="images/rra-icon.png" alt="RRA" class="ai-chat__avatar-img"></div>' +
        '<div><h3 class="ai-chat__title">RRA AI Assistant</h3><p class="ai-chat__status">Online — RRA · RDB · RURA · RSSB</p></div>' +
        '<button class="ai-chat__close" id="aiChatClose" aria-label="Close"><i class="lucide" data-lucide="x" class="ai-chat__close-icon"></i></button>' +
      '</div>' +
      '<div class="ai-chat__messages" id="aiMessages"></div>' +
      '<div class="ai-chat__suggestions" id="aiSuggestions"></div>' +
      '<div class="ai-chat__input-area">' +
        '<div class="ai-chat__input-wrap">' +
          '<textarea class="ai-chat__input" id="aiInput" placeholder="Ask about RRA, RDB, RURA, RSSB services..." rows="1"></textarea>' +
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
    suggestionsEl = document.getElementById('aiSuggestions');

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

    renderSuggestions();
    addBotMessage('Hello! I\'m your RRA AI Assistant. I can help you with RRA, RDB, RURA, and RSSB services. What would you like to do today?', aiKnowledge.quickReplies.map(function(r) {
      return { text: r.text, action: function() { handleQuery(r.query); } };
    }));

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

  function renderSuggestions() {
    var html = '';
    aiKnowledge.quickReplies.forEach(function(r) {
      html += '<button class="ai-chat__suggestion" data-query="' + r.query + '">' + r.text + '</button>';
    });
    suggestionsEl.innerHTML = html;
    suggestionsEl.querySelectorAll('.ai-chat__suggestion').forEach(function(btn) {
      btn.addEventListener('click', function() {
        handleQuery(btn.getAttribute('data-query'));
      });
    });
  }

  function handleSend() {
    var text = inputEl.value.trim();
    if (!text) return;
    addUserMessage(text);
    inputEl.value = '';
    inputEl.style.height = 'auto';
    sendBtn.disabled = true;
    showTyping();
    setTimeout(function() {
      removeTyping();
      processQuery(text);
      sendBtn.disabled = false;
    }, 800 + Math.random() * 600);
  }

  function handleQuery(query) {
    addUserMessage(query);
    showTyping();
    setTimeout(function() {
      removeTyping();
      processQuery(query);
    }, 600 + Math.random() * 400);
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
        action: function() { window.open(service.url, '_blank', 'noopener'); }
      }
    ];

    if (service.category === 'RRA') {
      actions.push({
        text: 'Go to MyRRA',
        action: function() { window.open('https://myrra.rra.gov.rw/', '_blank', 'noopener'); }
      });
    } else if (service.category === 'RDB') {
      actions.push({
        text: 'Go to RDB',
        action: function() { window.open('https://rdb.rw/', '_blank', 'noopener'); }
      });
    } else if (service.category === 'RSSB') {
      actions.push({
        text: 'Go to RSSB',
        action: function() { window.open('https://www.rssb.gov.rw/', '_blank', 'noopener'); }
      });
    } else if (service.category === 'RURA') {
      actions.push({
        text: 'Go to RURA',
        action: function() { window.open('https://www.rura.gov.rw/', '_blank', 'noopener'); }
      });
    }

    addBotMessage(header + stepsHtml, actions);
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

  function addBotMessage(html, actions) {
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var actionsHtml = '';
    if (actions && actions.length) {
      actionsHtml = '<div class="ai-message__actions">';
      actions.forEach(function(a, i) {
        actionsHtml += '<button class="ai-message__action-btn" data-action-idx="' + i + '">' + escapeHtml(a.text) + '</button>';
      });
      actionsHtml += '</div>';
    }

    var msgHtml = '<div class="ai-message ai-message--bot">' +
      '<div class="ai-message__avatar"><img src="images/rra-icon.png" alt="RRA" class="ai-message__avatar-img"></div>' +
      '<div class="ai-message__content">' +
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
    var servicesList = aiKnowledge.services.map(function(s) {
      return '- ' + s.title + ' (' + s.category + '): ' + s.description + ' | Platform: ' + s.platform + ' | URL: ' + s.url;
    }).join('\n');

    return 'You are the RRA AI Assistant for Rwanda Revenue Authority. You help users with tax services, business registration, social security, and licensing.\n\n' +
      'SERVICES YOU KNOW ABOUT:\n' + servicesList + '\n\n' +
      'OFFICIAL PLATFORMS:\n' +
      '- MyRRA (tax filing, payments): https://myrra.rra.gov.rw/\n' +
      '- eTax (TIN registration): https://etax.rra.gov.rw/nidAssignedTIN/\n' +
      '- e-Single Window (customs): https://sw.gov.rw/\n' +
      '- Trade Portal (duties calculator): https://rwandatrade.rw/\n' +
      '- RDB (business registration): https://rdb.rw/\n' +
      '- RSSB (social security): https://www.rssb.gov.rw/\n' +
      '- RURA (licensing): https://www.rura.gov.rw/\n' +
      '- Non-Fiscal Revenue: https://nonfiscal.rra.gov.rw/\n\n' +
      'RULES:\n' +
      '1. Always provide step-by-step guidance when users ask about a service\n' +
      '2. Include the official platform URL when relevant\n' +
      '3. Be concise but helpful\n' +
      '4. If unsure, guide users to contact RRA directly\n' +
      '5. Respond in the same language the user uses (English or Kinyarwanda)\n' +
      '6. Format responses with clear steps using numbers (1. 2. 3.)\n' +
      '7. Always mention which platform/service provider handles the request (RRA, RDB, RURA, or RSSB)';
  }

  async function callOpenAIAPI(userMessage) {
    var messages = [{ role: 'system', content: getSystemPrompt() }];
    conversationHistory.forEach(function(msg) {
      messages.push({ role: msg.role, content: msg.content });
    });
    messages.push({ role: 'user', content: userMessage });

    var response = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider: AI_CONFIG.provider,
        model: AI_CONFIG.model,
        messages: messages,
        maxTokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature
      })
    });

    if (!response.ok) {
      throw new Error('API request failed: ' + response.status);
    }

    var data = await response.json();
    return data.choices[0].message.content;
  }

  async function callAnthropicAPI(userMessage) {
    var messages = [];
    conversationHistory.forEach(function(msg) {
      if (msg.role !== 'system') {
        messages.push({ role: msg.role, content: msg.content });
      }
    });
    messages.push({ role: 'user', content: userMessage });

    var systemMessage = { role: 'system', content: getSystemPrompt() };
    var allMessages = [systemMessage].concat(messages);

    var response = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider: AI_CONFIG.provider,
        model: AI_CONFIG.model,
        messages: allMessages,
        maxTokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature
      })
    });

    if (!response.ok) {
      throw new Error('API request failed: ' + response.status);
    }

    var data = await response.json();
    return data.content[0].text;
  }

  async function callAI(userMessage) {
    if (AI_CONFIG.provider === 'anthropic') {
      return await callAnthropicAPI(userMessage);
    } else if (AI_CONFIG.provider === 'openai') {
      return await callOpenAIAPI(userMessage);
    } else {
      throw new Error('Unknown provider');
    }
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
        html += '<div class="ai-message__step"><span class="ai-message__step-text">' + stepText + '</span></div>';
      } else {
        if (inSteps) {
          html += '</div>';
          inSteps = false;
        }
        var formattedLine = line.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener" style="color:var(--navy);font-weight:500;">$1</a>');
        if (line.trim()) {
          html += '<p style="margin:8px 0;">' + formattedLine + '</p>';
        }
      }
    });

    if (inSteps) html += '</div>';

    return { html: html, urls: urls };
  }

  function getActionButtons(urls) {
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
        else if (url.includes('rdb.rw')) platform = 'Open RDB';
        else if (url.includes('rssb.gov.rw')) platform = 'Open RSSB';
        else if (url.includes('rura.gov.rw')) platform = 'Open RURA';
        else if (url.includes('nonfiscal.rra.gov.rw')) platform = 'Open Non-Fiscal';

        actions.push({
          text: platform,
          action: function() { window.open(url, '_blank', 'noopener'); }
        });
      }
    });

    return actions;
  }

  async function processQuery(text) {
    conversationHistory.push({ role: 'user', content: text });

    try {
      var response = await callAI(text);
      conversationHistory.push({ role: 'assistant', content: response });

      if (conversationHistory.length > 10) {
        conversationHistory = conversationHistory.slice(-10);
      }

      var parsed = parseAIResponse(response);
      var actions = getActionButtons(parsed.urls);

      if (actions.length === 0) {
        var lower = text.toLowerCase();
        if (lower.includes('tax') || lower.includes('vat') || lower.includes('paye') || lower.includes('ebm')) {
          actions.push({ text: 'Go to MyRRA', action: function() { window.open('https://myrra.rra.gov.rw/', '_blank', 'noopener'); } });
        } else if (lower.includes('business') || lower.includes('register') || lower.includes('company')) {
          actions.push({ text: 'Go to RDB', action: function() { window.open('https://rdb.rw/', '_blank', 'noopener'); } });
        } else if (lower.includes('social') || lower.includes('pension') || lower.includes('rssb')) {
          actions.push({ text: 'Go to RSSB', action: function() { window.open('https://www.rssb.gov.rw/', '_blank', 'noopener'); } });
        } else if (lower.includes('license') || lower.includes('telecom') || lower.includes('rura')) {
          actions.push({ text: 'Go to RURA', action: function() { window.open('https://www.rura.gov.rw/', '_blank', 'noopener'); } });
        }
      }

      addBotMessage(parsed.html, actions);
    } catch (error) {
      console.error('AI API Error:', error);
      processQueryLocal(text);
    }
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
      var fallback = aiKnowledge.fallback[Math.floor(Math.random() * aiKnowledge.fallback.length)];
      addBotMessage(fallback, aiKnowledge.quickReplies.map(function(r) {
        return { text: r.text, action: function() { handleQuery(r.query); } };
      }));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
