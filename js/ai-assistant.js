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
  var attachedFiles = [];
  var isRecording = false;
  var recognition = null;
  var recordStartTime = 0;
  var recordTimer = null;
  var emojiPickerOpen = false;
  var gifPickerOpen = false;
  var lastSpeechTime = 0;
  var silenceTimeout = null;
  var isLiveVoiceMode = false;
  var currentUtterance = null;

  var EMOJIS = [
    '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃',
    '😉','😊','😇','🥰','','🤩','😘','😗','😚','😙',
    '','😋','😛','😜','🤪','😝','','🤗','🤭','',
    '🤔','','🤐','🤨','','😑','😶','','😏','😒',
    '🙄','😬','🤥','','😔','😪','','😴','😷','',
    '🤕','','🤮','','🥶','🥴','😵','🤯','🤠','',
    '🥸','😎','🤓','🧐','😕','','😟','🙁','','😯',
    '😲','','🥺','🥹','','😧','😨','😰','','😢',
    '','😱','😖','😣','😞','😓','😩','😫','🥱','',
    '😡','😠','','😈','👿','','☠️','💩','','👹',
    '👍','👎','👊','','🤛','🤜','','🙌','🫶','👐',
    '🤲','','🙏','✌️','','🫰','🤟','','👌','',
    '👈','','👆','','☝️','🫵','','🤚','️','✋',
    '❤️','🧡','💛','','💙','💜','','🤍','🤎','💔',
    '❣️','','💞','💓','💗','💖','💘','💝','','☮️',
    '','⭐','🌟','✨','💫','🎉','','🎈','🎁','🏆',
    '','📎','📁','📂','📄','📋','📊','📈','📉','📝',
    '✅','','⭕','🚫','','💢','💥','💬','👁️','🗨️'
  ];

  var GIF_PLACEHOLDERS = [
    { url: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif', query: 'thinking' },
    { url: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', query: 'yes' },
    { url: 'https://media.giphy.com/media/l3q2KddjinuxguI7m/giphy.gif', query: 'no' },
    { url: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif', query: 'excited' },
    { url: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif', query: 'celebrate' },
    { url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', query: 'thumbs up' },
    { url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif', query: 'clap' },
    { url: 'https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif', query: 'wave' }
  ];

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
        '<button class="ai-chat__live-voice-btn" id="aiLiveVoiceBtn" aria-label="Live voice mode" title="Live voice conversation">' +
          '<i class="lucide" data-lucide="phone"></i>' +
        '</button>' +
        '<button class="ai-chat__close" id="aiChatClose" aria-label="Close"><i class="lucide" data-lucide="x" class="ai-chat__close-icon"></i></button>' +
      '</div>' +
      '<div class="ai-chat__messages" id="aiMessages"></div>' +
      '<div class="ai-chat__quick-actions" id="aiQuickActions"></div>' +
      '<div class="ai-voice-indicator" id="aiVoiceIndicator">' +
        '<div class="ai-voice-indicator__dot"></div>' +
        '<span class="ai-voice-indicator__text">Listening...</span>' +
        '<span class="ai-voice-indicator__time" id="aiVoiceTime">0:00</span>' +
        '<button class="ai-voice-indicator__cancel" id="aiVoiceCancel" aria-label="Cancel recording"><i class="lucide" data-lucide="x" style="width:14px;height:14px;"></i></button>' +
      '</div>' +
      '<div class="ai-chat__attachment-bar" id="aiAttachmentBar"></div>' +
      '<div class="ai-chat__input-area">' +
        '<div class="ai-chat__input-row">' +
          '<div class="ai-chat__input-tools">' +
            '<button class="ai-chat__tool-btn" id="aiAttachBtn" aria-label="Attach file" title="Attach file"><i class="lucide" data-lucide="paperclip"></i></button>' +
            '<button class="ai-chat__tool-btn" id="aiEmojiBtn" aria-label="Emoji" title="Emoji"><i class="lucide" data-lucide="smile"></i></button>' +
            '<button class="ai-chat__tool-btn" id="aiGifBtn" aria-label="GIF" title="GIF"><i class="lucide" data-lucide="image"></i></button>' +
            '<button class="ai-chat__tool-btn" id="aiVoiceBtn" aria-label="Voice input" title="Voice input"><i class="lucide" data-lucide="mic"></i></button>' +
          '</div>' +
          '<div class="ai-chat__input-wrap">' +
            '<textarea class="ai-chat__input" id="aiInput" placeholder="Ask me anything about RRA services..." rows="1"></textarea>' +
            '<div class="ai-emoji-picker" id="aiEmojiPicker"></div>' +
            '<div class="ai-gif-picker" id="aiGifPicker"></div>' +
          '</div>' +
          '<button class="ai-chat__send" id="aiSend" aria-label="Send"><i class="lucide" data-lucide="arrow-up" class="ai-chat__send-icon"></i></button>' +
        '</div>' +
      '</div>' +
      '<input type="file" id="aiFileInput" style="display:none" multiple accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx">';

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

    document.getElementById('aiAttachBtn').addEventListener('click', function() {
      document.getElementById('aiFileInput').click();
    });
    document.getElementById('aiFileInput').addEventListener('change', handleFileSelect);

    document.getElementById('aiEmojiBtn').addEventListener('click', toggleEmojiPicker);
    document.getElementById('aiGifBtn').addEventListener('click', toggleGifPicker);
    document.getElementById('aiVoiceBtn').addEventListener('click', toggleVoiceRecording);
    document.getElementById('aiVoiceCancel').addEventListener('click', stopVoiceRecording);
    document.getElementById('aiLiveVoiceBtn').addEventListener('click', toggleLiveVoiceMode);

    document.addEventListener('click', function(e) {
      var emojiBtn = document.getElementById('aiEmojiBtn');
      var emojiPicker = document.getElementById('aiEmojiPicker');
      var gifBtn = document.getElementById('aiGifBtn');
      var gifPicker = document.getElementById('aiGifPicker');

      if (emojiPickerOpen && !emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
        closeEmojiPicker();
      }
      if (gifPickerOpen && !gifBtn.contains(e.target) && !gifPicker.contains(e.target)) {
        closeGifPicker();
      }
    });

    renderQuickActions();
    renderEmojiPicker();
    renderGifPicker();
    addBotMessage('Muraho! Hello! I\'m your RRA AI Agent. I can help you with taxes, business registration, customs, and social security. You can type or use voice input - I speak both English and Kinyarwanda. What would you like to know today?', []);

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

  function renderEmojiPicker() {
    var picker = document.getElementById('aiEmojiPicker');
    var html = '<div class="ai-emoji-picker__search"><input type="text" placeholder="Search emoji..." id="emojiSearch"></div>';
    html += '<div class="ai-emoji-picker__grid" id="emojiGrid">';
    EMOJIS.forEach(function(emoji) {
      html += '<button class="ai-emoji-picker__emoji" data-emoji="' + emoji + '">' + emoji + '</button>';
    });
    html += '</div>';
    picker.innerHTML = html;

    picker.querySelectorAll('.ai-emoji-picker__emoji').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var emoji = btn.getAttribute('data-emoji');
        inputEl.value += emoji;
        inputEl.focus();
        closeEmojiPicker();
      });
    });

    var searchInput = document.getElementById('emojiSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var query = searchInput.value.toLowerCase();
        picker.querySelectorAll('.ai-emoji-picker__emoji').forEach(function(btn) {
          btn.style.display = btn.getAttribute('data-emoji').includes(query) || !query ? '' : 'none';
        });
      });
    }
  }

  function renderGifPicker() {
    var picker = document.getElementById('aiGifPicker');
    var html = '<div class="ai-gif-picker__search"><input type="text" placeholder="Search GIFs..." id="gifSearch"><button id="gifSearchBtn">Search</button></div>';
    html += '<div class="ai-gif-picker__grid" id="gifGrid">';
    GIF_PLACEHOLDERS.forEach(function(gif) {
      html += '<div class="ai-gif-picker__gif" data-url="' + gif.url + '" data-query="' + gif.query + '">' +
        '<img src="' + gif.url + '" alt="' + gif.query + '" loading="lazy"></div>';
    });
    html += '</div>';
    picker.innerHTML = html;

    picker.querySelectorAll('.ai-gif-picker__gif').forEach(function(el) {
      el.addEventListener('click', function() {
        var url = el.getAttribute('data-url');
        var query = el.getAttribute('data-query');
        inputEl.value += ' [GIF: ' + query + ']';
        inputEl.focus();
        closeGifPicker();
      });
    });

    var searchBtn = document.getElementById('gifSearchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', function() {
        var query = document.getElementById('gifSearch').value.trim();
        if (query) {
          inputEl.value += ' [GIF: ' + query + ']';
          inputEl.focus();
          closeGifPicker();
        }
      });
    }
  }

  function toggleEmojiPicker() {
    emojiPickerOpen = !emojiPickerOpen;
    document.getElementById('aiEmojiPicker').classList.toggle('open', emojiPickerOpen);
    document.getElementById('aiEmojiBtn').classList.toggle('active', emojiPickerOpen);
    if (gifPickerOpen) closeGifPicker();
    if (emojiPickerOpen) {
      document.getElementById('emojiSearch').focus();
    }
  }

  function closeEmojiPicker() {
    emojiPickerOpen = false;
    document.getElementById('aiEmojiPicker').classList.remove('open');
    document.getElementById('aiEmojiBtn').classList.remove('active');
  }

  function toggleGifPicker() {
    gifPickerOpen = !gifPickerOpen;
    document.getElementById('aiGifPicker').classList.toggle('open', gifPickerOpen);
    document.getElementById('aiGifBtn').classList.toggle('active', gifPickerOpen);
    if (emojiPickerOpen) closeEmojiPicker();
    if (gifPickerOpen) {
      document.getElementById('gifSearch').focus();
    }
  }

  function closeGifPicker() {
    gifPickerOpen = false;
    document.getElementById('aiGifPicker').classList.remove('open');
    document.getElementById('aiGifBtn').classList.remove('active');
  }

  function toggleVoiceRecording() {
    if (isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  }

  function toggleLiveVoiceMode() {
    isLiveVoiceMode = !isLiveVoiceMode;
    var btn = document.getElementById('aiLiveVoiceBtn');

    if (isLiveVoiceMode) {
      btn.classList.add('active');
      btn.title = 'Exit live voice mode';
      document.querySelector('.ai-chat__status').innerHTML = '<span class="ai-chat__status-dot ai-chat__status-dot--live"></span> Live Voice Conversation';

      if (!chatOpen) {
        toggleChat();
      }

      addBotMessage('Muraho! Live voice mode yatangiye. Vuga ikibazo cyawe, nzakumva nzagusubize mvuga. Kanda phone icon kugirango usohoke.', []);

      setTimeout(function() {
        startVoiceRecording();
      }, 1000);
    } else {
      btn.classList.remove('active');
      btn.title = 'Live voice conversation';
      document.querySelector('.ai-chat__status').innerHTML = '<span class="ai-chat__status-dot"></span> Online — Intelligent Assistant';

      if (isRecording) {
        stopVoiceRecording();
      }

      window.speechSynthesis.cancel();
      addBotMessage('Live voice mode yarangiye. Ushobora kwandika cyangwa gukoresha voice input bisanzwe.', []);
    }
  }

  function detectLanguage(text) {
    var kinWords = ['muraho', 'murakoze', 'ndashaka', 'ubwoko', 'imitsi', 'sosiyete', 'kwandikisha', 'uburyo', 'iki', 'ikihe', 'n\'iki', 'wowe', 'jye', 'we', 'bose', 'rimwe', 'kabiri', 'gatatu', 'kane', 'gatanu', 'umunsi', 'amafaranga', 'igiciro', 'gukora', 'kugura', 'kugurisha', 'umukoresha', 'umurimo', 'ishuri', 'ivuriro', 'umupfumu', 'umuganga', 'imana', 'urukundo', 'amahoro', 'umutekano', 'igihugu', 'umuryango', 'umwana', 'umugore', 'umugabo', 'abantu', 'ikibazo', 'igisubizo', 'nimbere', 'inyuma', 'hejuru', 'hasi', 'ibumoso', 'iburyo', 'ejo', 'ejo hashize', 'ubu', 'hashize', 'kera', 'vuba', 'hano', 'hariya', 'kuri', 'mu', 'na', 'cyangwa', 'ariko', 'kubera', 'nka', 'nk\'', 'by\'', 'bya', 'by\'', 'wa', 'wa ', 'ba', 'ba ', 'cyane', 'gake', 'neza', 'nabi', 'byoroshye', 'bigoye'];
    var lower = text.toLowerCase();
    var kinScore = 0;
    kinWords.forEach(function(word) {
      if (lower.indexOf(word) !== -1) kinScore++;
    });
    return kinScore >= 1 ? 'rw-RW' : 'en-US';
  }

  async function speakText(text) {
    var lang = detectLanguage(text);

    try {
      console.log('Calling /api/tts with:', { textLength: text.length, language: lang });
      var response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          language: lang
        })
      });

      console.log('TTS response status:', response.status);

      if (!response.ok) {
        var errorData = await response.json().catch(function() { return { error: 'Unknown error' }; });
        console.error('TTS API error:', errorData);
        throw new Error('TTS API failed: ' + response.status + ' - ' + (errorData.error || 'Unknown'));
      }

      var data = await response.json();
      console.log('TTS response data:', { success: data.success, hasAudio: !!data.audioContent, audioSize: data.audioContent ? data.audioContent.length : 0 });

      if (data.audioContent) {
        var audio = new Audio('data:audio/mp3;base64,' + data.audioContent);
        audio.onended = function() {
          console.log('Speech finished');
          if (isLiveVoiceMode) {
            setTimeout(function() {
              if (isLiveVoiceMode && !isRecording) {
                console.log('Restarting voice recording...');
                startVoiceRecording();
              }
            }, 1000);
          }
        };
        audio.onerror = function(e) {
          console.error('Audio playback error:', e);
          if (isLiveVoiceMode) {
            setTimeout(function() {
              if (isLiveVoiceMode && !isRecording) {
                startVoiceRecording();
              }
            }, 500);
          }
        };
        await audio.play().catch(function(playError) {
          console.error('Audio play() failed:', playError);
          throw playError;
        });
        console.log('Audio playing');
      } else {
        console.error('No audio content in response');
        throw new Error('No audio content received');
      }

    } catch (error) {
      console.error('TTS Error:', error);
      console.log('Falling back to browser speech synthesis');
      
      // Fallback to browser speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'rw-RW' ? 'en-US' : lang;
        utterance.onend = function() {
          if (isLiveVoiceMode) {
            setTimeout(function() {
              if (isLiveVoiceMode && !isRecording) {
                startVoiceRecording();
              }
            }, 1000);
          }
        };
        window.speechSynthesis.speak(utterance);
      } else if (isLiveVoiceMode) {
        setTimeout(function() {
          if (isLiveVoiceMode && !isRecording) {
            startVoiceRecording();
          }
        }, 500);
      }
    }
  }

  function startVoiceRecording() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addBotMessage('Voice input is not supported in your browser. Please use Chrome or Edge for voice features.', []);
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'rw-RW';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 3;

    recognition.onstart = function() {
      isRecording = true;
      recordStartTime = Date.now();
      document.getElementById('aiVoiceIndicator').classList.add('recording');
      document.getElementById('aiVoiceBtn').classList.add('active');
      document.querySelector('.ai-voice-indicator__text').textContent = 'Listening...';
      updateRecordTimer();
    };

    recognition.onresult = function(event) {
      var transcript = '';
      var isFinal = false;
      for (var i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }
      inputEl.value = transcript;
      autoResize();

      lastSpeechTime = Date.now();

      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
        silenceTimeout = null;
      }

      if (transcript.length > 10) {
        var detectedLang = detectLanguage(transcript);
        if (detectedLang !== recognition.lang) {
          recognition.lang = detectedLang;
          document.querySelector('.ai-voice-indicator__text').textContent = 'Listening...';
        }
      }

      if (transcript.trim().length > 0) {
        silenceTimeout = setTimeout(function() {
          var timeSinceLastSpeech = Date.now() - lastSpeechTime;
          if (timeSinceLastSpeech >= 4900 && transcript.trim().length > 0) {
            stopVoiceRecording();
          }
        }, 5000);
      }
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
      stopVoiceRecording();
      if (event.error === 'not-allowed') {
        addBotMessage('Microphone access was denied. Please allow microphone access in your browser settings to use voice input.', []);
      } else if (event.error === 'no-speech') {
        document.querySelector('.ai-voice-indicator__text').textContent = 'No speech detected. Try again...';
        setTimeout(function() {
          if (isRecording) recognition.start();
        }, 1000);
      }
    };

    recognition.onend = function() {
      if (isRecording && inputEl.value.trim().length === 0) {
        setTimeout(function() {
          if (isRecording) recognition.start();
        }, 500);
      }
    };

    recognition.start();
  }

  function stopVoiceRecording() {
    if (silenceTimeout) {
      clearTimeout(silenceTimeout);
      silenceTimeout = null;
    }
    if (recognition) {
      recognition.stop();
      recognition = null;
    }
    isRecording = false;
    clearInterval(recordTimer);
    document.getElementById('aiVoiceIndicator').classList.remove('recording');
    document.getElementById('aiVoiceBtn').classList.remove('active');
    document.getElementById('aiVoiceTime').textContent = '0:00';
    document.querySelector('.ai-voice-indicator__text').textContent = 'Listening...';

    if (inputEl.value.trim()) {
      setTimeout(function() {
        handleSend();
      }, 300);
    }
  }

  function updateRecordTimer() {
    recordTimer = setInterval(function() {
      var elapsed = Math.floor((Date.now() - recordStartTime) / 1000);
      var minutes = Math.floor(elapsed / 60);
      var seconds = elapsed % 60;
      document.getElementById('aiVoiceTime').textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
  }

  function handleFileSelect(event) {
    var files = Array.from(event.target.files);
    files.forEach(function(file) {
      if (file.size > 10 * 1024 * 1024) {
        addBotMessage('File "' + file.name + '" is too large. Maximum size is 10MB.', []);
        return;
      }
      attachedFiles.push(file);
    });
    renderAttachmentBar();
    event.target.value = '';
  }

  function renderAttachmentBar() {
    var bar = document.getElementById('aiAttachmentBar');
    if (attachedFiles.length === 0) {
      bar.classList.remove('has-files');
      bar.innerHTML = '';
      return;
    }

    bar.classList.add('has-files');
    var html = '';
    attachedFiles.forEach(function(file, index) {
      var icon = 'file';
      if (file.type.startsWith('image/')) icon = 'image';
      else if (file.type.includes('pdf')) icon = 'file-text';
      else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) icon = 'file-text';
      else if (file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) icon = 'table';

      var size = file.size < 1024 * 1024
        ? (file.size / 1024).toFixed(1) + ' KB'
        : (file.size / (1024 * 1024)).toFixed(1) + ' MB';

      html += '<div class="ai-chat__attachment-chip">' +
        '<i class="lucide" data-lucide="' + icon + '" style="width:14px;height:14px;color:var(--navy);"></i>' +
        '<span class="ai-chat__attachment-chip-name">' + escapeHtml(file.name) + '</span>' +
        '<span style="color:var(--text-muted);font-size:11px;">' + size + '</span>' +
        '<button class="ai-chat__attachment-chip-remove" data-index="' + index + '" aria-label="Remove file"><i class="lucide" data-lucide="x" style="width:10px;height:10px;"></i></button>' +
        '</div>';
    });
    bar.innerHTML = html;

    bar.querySelectorAll('.ai-chat__attachment-chip-remove').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var idx = parseInt(btn.getAttribute('data-index'));
        attachedFiles.splice(idx, 1);
        renderAttachmentBar();
      });
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function handleSend() {
    if (isProcessing) return;
    var text = inputEl.value.trim();
    if (!text && attachedFiles.length === 0) return;

    var messageText = text;
    var files = attachedFiles.slice();

    if (files.length > 0) {
      var fileNames = files.map(function(f) { return f.name; }).join(', ');
      messageText = (messageText ? messageText + '\n\n' : '') + '[Attached: ' + fileNames + ']';
    }

    addUserMessage(messageText, files);
    inputEl.value = '';
    inputEl.style.height = 'auto';
    attachedFiles = [];
    renderAttachmentBar();
    processQuery(messageText, files);
  }

  function handleQuery(query) {
    if (isProcessing) return;
    addUserMessage(query);
    processQuery(query);
  }

  function addUserMessage(text, files) {
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var fileHtml = '';

    if (files && files.length > 0) {
      fileHtml = '<div class="ai-message__attachment">';
      fileHtml += '<i class="lucide ai-message__attachment-icon" data-lucide="paperclip"></i>';
      fileHtml += '<span class="ai-message__attachment-name">' + files.map(function(f) { return escapeHtml(f.name); }).join(', ') + '</span>';
      fileHtml += '</div>';

      files.forEach(function(file) {
        if (file.type.startsWith('image/')) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var previewEl = document.createElement('div');
            previewEl.className = 'ai-message__attachment-preview';
            previewEl.innerHTML = '<img src="' + e.target.result + '" alt="' + escapeHtml(file.name) + '">';
            var lastMsg = messagesEl.lastElementChild;
            if (lastMsg) {
              var bubble = lastMsg.querySelector('.ai-message__bubble');
              if (bubble) bubble.appendChild(previewEl);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    var html = '<div class="ai-message ai-message--user">' +
      '<div class="ai-message__avatar"><i class="lucide" data-lucide="user" class="ai-message__avatar-icon"></i></div>' +
      '<div class="ai-message__content">' +
        '<div class="ai-message__bubble">' + escapeHtml(text) + fileHtml + '</div>' +
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

    // Text-to-speech in live voice mode or when recording was active
    if (isLiveVoiceMode || isRecording) {
      var plainText = html.replace(/<[^>]*>/g, '').replace(/https?:\/\/[^\s]+/g, 'link');
      speakText(plainText);
    }
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
    return 'You are the RRA AI Agent, a natural conversational assistant for Rwanda Revenue Authority. You speak both English and Kinyarwanda fluently.\n\n' +
      'INTRODUCTION:\n' +
      'On the FIRST message only, introduce yourself briefly and professionally: "Muraho! Ndi RRA AI Agent. Nagufasha nte?" then wait for their response. Do not make promotional claims about developers or the government.\n\n' +
      'CONVERSATION STYLE:\n' +
      '- Be natural and conversational, not robotic\n' +
      '- Listen carefully to what the user says\n' +
      '- Wait for them to finish speaking completely before responding\n' +
      '- Respond naturally based on what they actually said\n' +
      '- Ask follow-up questions to understand better\n' +
      '- Keep responses short and conversational (2-3 sentences max for voice)\n' +
      '- Detect language automatically and respond in the same language\n\n' +
      'YOUR ROLE:\n' +
      'You help with RRA services: taxes (VAT, PAYE, Income Tax), customs, business registration, social security, licensing. Use web_search to get current information before answering questions about procedures, deadlines, or requirements.\n\n' +
      'AVAILABLE TOOLS:\n' +
      '- web_search: Search for current RRA information (use this first!)\n' +
      '- lookup_tax_service: Get tax service details\n' +
      '- lookup_customs_service: Get customs info\n' +
      '- lookup_business_registration: Get registration steps\n' +
      '- lookup_social_security: Get RSSB info\n' +
      '- get_platform_url: Get official platform URLs\n' +
      '- get_login_portal: Get login portal for specific service\n' +
      '- calculate_tax_estimate: Calculate taxes\n' +
      '- get_deadline_info: Get filing deadlines\n' +
      '- navigate_to_page: Navigate to website pages\n\n' +
      'IMPORTANT:\n' +
      '- Use the language of the latest user message: professional, natural Kinyarwanda when the user writes Kinyarwanda; English when the user writes English. Do not mix languages unnecessarily.\n' +
      '- Use web_search first for current laws, rates, deadlines, requirements, and procedures when live search is available.\n' +
      '- Never invent search results, official statements, phone numbers, deadlines, tax rates, or portal links.\n' +
      '- If live search is unavailable or returns an error, explicitly say current details could not be verified; distinguish verified knowledge from uncertainty.\n' +
      '- Prefer official RRA or relevant government sources and include source URLs when returned by tools.\n' +
      '- Direct users to the correct official platforms (MyRRA, E-Tax, RDB, RSSB, etc.); do not claim to submit forms, make payments, or access private accounts.\n' +
      '- For tax calculations, ask for missing inputs and state assumptions; do not present an estimate as an official assessment.\n' +
      '- If you do not know something, say so and offer the appropriate official contact route.\n' +
      '- Stay on topic: Rwanda taxes, customs, business registration, social security, and related government services.\n' +
      '- Be concise, respectful, accessible, and conversational.';
  }

  async function callAIAgent(userMessage) {
    var messages = [{ role: 'system', content: getSystemPrompt() }];

    conversationHistory.forEach(function(msg) {
      // Preserve tool_calls and tool_call_id metadata so multi-turn tool conversations remain valid.
      messages.push(Object.assign({}, msg));
    });
    messages.push({ role: 'user', content: userMessage });

    // Add timeout to prevent hanging connections
    var controller = new AbortController();
    var timeoutId = setTimeout(function() { controller.abort(); }, 30000); // 30 second timeout

    try {
      var response = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          provider: AI_CONFIG.provider,
          model: AI_CONFIG.model,
          messages: messages
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('API request failed: ' + response.status);
      }

      var data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server took too long to respond');
      }
      throw error;
    }
  }

  async function executeTool(toolName, args) {
    var controller = new AbortController();
    var timeoutId = setTimeout(function() { controller.abort(); }, 15000); // 15 second timeout

    try {
      var response = await fetch('/api/ai-agent/execute-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tool: toolName,
          args: args
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Tool execution failed');
      }

      var data = await response.json();
      return data.result;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Tool execution timeout');
      }
      throw error;
    }
  }

  // Render model output as text first. Only validated HTTP(S) URLs become links.
  // This prevents model-generated HTML from being interpreted as executable markup.
  function renderSafeInlineText(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/gi;
    return String(text || '').split(urlRegex).map(function(part) {
      if (/^https?:\/\//i.test(part)) {
        var safeUrl = escapeHtml(part);
        return '<a href="' + safeUrl + '" target="_blank" rel="noopener noreferrer" class="ai-message__step-link">' +
          escapeHtml(part) + '</a>';
      }
      return escapeHtml(part);
    }).join('');
  }

  function parseAIResponse(response) {
    var safeResponse = String(response || '');
    var urlRegex = /(https?:\/\/[^\s]+)/gi;
    var urls = safeResponse.match(urlRegex) || [];
    var lines = safeResponse.split('\n');
    var html = '';
    var inSteps = false;
    var stepNumber = 0;

    lines.forEach(function(line) {
      var stepMatch = line.match(/^\d+[\.)]\s+(.+)/);
      if (stepMatch) {
        if (!inSteps) {
          html += '<div class="ai-message__steps">';
          inSteps = true;
          stepNumber = 0;
        }
        stepNumber += 1;
        html += '<div class="ai-message__step"><span class="ai-message__step-num">' +
          stepNumber + '</span><span class="ai-message__step-text">' +
          renderSafeInlineText(stepMatch[1]) + '</span></div>';
      } else {
        if (inSteps) {
          html += '</div>';
          inSteps = false;
        }
        if (line.trim()) {
          html += '<p style="margin:8px 0;">' + renderSafeInlineText(line) + '</p>';
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

  async function processQuery(text, files) {
    if (isProcessing) return;
    isProcessing = true;
    sendBtn.disabled = true;

    conversationHistory.push({ role: 'user', content: text });
    showThinking('Thinking...');

    try {
      var responseData = await callAIAgent(text);
      removeThinking();

      var message = responseData.choices[0].message;
      var toolCalls = message.tool_calls;

      if (toolCalls && toolCalls.length > 0) {
        showThinking('Searching for information...');

        var toolResults = [];
        for (var i = 0; i < toolCalls.length; i++) {
          var toolCall = toolCalls[i];
          var toolName = toolCall.function.name;
          var toolArgs = JSON.parse(toolCall.function.arguments);

          showThinking('Gathering information...');
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

        var finalController = new AbortController();
        var finalTimeoutId = setTimeout(function() { finalController.abort(); }, 30000);

        try {
          var finalResponse = await fetch('/api/ai-agent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: AI_CONFIG.provider,
              model: AI_CONFIG.model,
              messages: followUpMessages
            }),
            signal: finalController.signal
          });

          clearTimeout(finalTimeoutId);
          if (!finalResponse.ok) {
            throw new Error('AI follow-up request failed: ' + finalResponse.status);
          }

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

        } catch (error) {
          clearTimeout(finalTimeoutId);
          if (error.name === 'AbortError') {
            throw new Error('Request timeout - server took too long to respond');
          }
          throw error;
        }

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
      
      // Show user-friendly error message
      var errorMsg = 'Sorry, I\'m having trouble connecting right now. ';
      if (error.message && error.message.includes('timeout')) {
        errorMsg += 'The request took too long. Please try again or rephrase your question.';
      } else {
        errorMsg += 'Please try again in a moment.';
      }
      
      addBotMessage(errorMsg, []);
      
      // Still try local fallback as backup
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
