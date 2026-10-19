const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const { pool, initDatabase } = require('./db');
const { isAllowedTool, validateChatMessages, checkRateLimit } = require('./lib/ai-agent-guard');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: same-origin requests work by default; cross-origin access must be explicitly configured.
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '.')));

// Environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const SERPAPI_KEY = process.env.SERPAPI_KEY || '';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';
const DATABASE_URL = process.env.DATABASE_URL || '';

// Initialize database on startup (non-blocking)
initDatabase().catch(err => {
  console.error('Database initialization failed:', err.message);
});

// Agent tools definition
const AGENT_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'lookup_tax_service',
      description: 'Look up information about a specific tax service including VAT, Income Tax, PAYE, Excise Duty, Withholding Tax, EBM',
      parameters: {
        type: 'object',
        properties: {
          service: { type: 'string', description: 'The tax service name (vat, income_tax, paye, excise, wht, ebm)' },
          action: { type: 'string', description: 'What the user wants to do (register, file, pay, check_status, get_info)' }
        },
        required: ['service']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'lookup_customs_service',
      description: 'Look up customs and trade services including import/export, e-Single Window, trade portal, duties calculator',
      parameters: {
        type: 'object',
        properties: {
          service: { type: 'string', description: 'The customs service (import, export, single_window, trade_portal, duties_calc)' }
        },
        required: ['service']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'lookup_business_registration',
      description: 'Look up business registration services via RDB including company registration, TIN, trade license',
      parameters: {
        type: 'object',
        properties: {
          service: { type: 'string', description: 'The registration service (company, tin, trade_license, cooperative)' },
          business_type: { type: 'string', description: 'Type of business (sole_trader, ltd, cooperative, ngo)' }
        },
        required: ['service']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'lookup_social_security',
      description: 'Look up RSSB social security services including pension, medical insurance, voluntary contributions',
      parameters: {
        type: 'object',
        properties: {
          service: { type: 'string', description: 'The RSSB service (pension, medical, voluntary, employer_registration)' }
        },
        required: ['service']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_platform_url',
      description: 'Get the official URL for a government platform',
      parameters: {
        type: 'object',
        properties: {
          platform: { type: 'string', description: 'Platform name (myrra, etax, rlgms, single_window, trade_portal, rdb, rssb, rura, non_fiscal, data_science)' }
        },
        required: ['platform']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_login_portal',
      description: 'Get the correct login portal for a specific RRA service',
      parameters: {
        type: 'object',
        properties: {
          service: { type: 'string', description: 'Service type (tax_filing, tin_registration, ebm_purchase_code, local_tax, vat_reward, staff)' }
        },
        required: ['service']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'calculate_tax_estimate',
      description: 'Help estimate tax amounts for VAT, PAYE, or income tax based on provided figures',
      parameters: {
        type: 'object',
        properties: {
          tax_type: { type: 'string', description: 'Type of tax (vat, paye, income_tax, corporate_tax)' },
          amount: { type: 'number', description: 'The amount to calculate tax on' }
        },
        required: ['tax_type', 'amount']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_deadline_info',
      description: 'Get information about tax filing deadlines and payment due dates',
      parameters: {
        type: 'object',
        properties: {
          tax_type: { type: 'string', description: 'Type of tax (vat, income_tax, paye, corporate_tax, annual_return)' }
        },
        required: ['tax_type']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'navigate_to_page',
      description: 'Navigate the user to a specific page on the RRA website',
      parameters: {
        type: 'object',
        properties: {
          page: { type: 'string', description: 'Page to navigate to (faq, learning, shop, calculator, tin_lookup, contact)' }
        },
        required: ['page']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'web_search',
      description: 'Search the web for current information about RRA services, tax laws, deadlines, or any Rwanda tax-related topics. Use this to get the most up-to-date information before answering.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query (e.g., "RRA VAT filing deadline 2026", "Rwanda tax rates", "EBM requirements")' },
          max_results: { type: 'number', description: 'Maximum number of results to return (default: 5)' }
        },
        required: ['query']
      }
    }
  }
];

const PLATFORM_URLS = {
  myrra: 'https://myrra.rra.gov.rw/',
  myrra_login: 'https://myrra.rra.gov.rw/login',
  myrra_tin_login: 'https://myrra.rra.gov.rw/tin-login',
  myrra_vat_reward: 'https://myrra.rra.gov.rw/vat-reward',
  myrra_create_account: 'https://myrra.rra.gov.rw/register',
  myrra_purchase_code: 'https://myrra.rra.gov.rw/purchase-code',
  etax: 'https://etax.rra.gov.rw/',
  etax_login: 'https://etax.rra.gov.rw/taxPayerLogin',
  tin_registration: 'https://myrra.rra.gov.rw/register',
  rlgms: 'https://rlgms.rra.gov.rw/',
  rlgms_login: 'https://rlgms.rra.gov.rw/login',
  single_window: 'https://sw.gov.rw/',
  trade_portal: 'https://rwandatrade.rw/',
  rdb: 'https://urs.rdb.rw/auth/register',
  rdb_login: 'https://urs.rdb.rw/',
  rssb: 'https://www.rssb.rw/',
  rssb_member: 'https://imisanzu.rssb.rw/',
  rura: 'https://www.rura.gov.rw/',
  non_fiscal: 'https://nonfiscal.rra.gov.rw/',
  ebm: 'https://www.rra.gov.rw/en/ebm-electronic-billing-machine',
  data_science: 'https://data.rra.gov.rw/',
  staff_portal: 'https://staff.rra.gov.rw/'
};

const PAGE_URLS = {
  faq: 'faq.html',
  learning: 'learning.html',
  shop: 'shop.html',
  calculator: 'calculator.html',
  tin_lookup: 'tin-lookup.html',
  contact: 'contact.html',
  news: 'news.html',
  about: 'about.html'
};

// AI Agent endpoint with tool calling
app.post('/api/ai-agent', (req, res, next) => {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const limit = checkRateLimit(key, Date.now(), aiRequestBuckets, 30, 60_000);
  if (!limit.allowed) {
    res.set('Retry-After', String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))));
    return res.status(429).json({ error: 'Too many AI requests. Please wait and try again.' });
  }
  next();
}, async (req, res) => {
  try {
    const { messages, provider, model } = req.body || {};
    const validation = validateChatMessages(messages);
    if (!validation.valid) return res.status(400).json({ error: validation.error });
    if (model !== undefined && (typeof model !== 'string' || model.length > 100)) {
      return res.status(400).json({ error: 'Invalid model name.' });
    }

    if (provider === 'openai' || !provider) {
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
          model: model || 'gpt-4o',
          messages: messages,
          tools: AGENT_TOOLS,
          tool_choice: 'auto',
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('OpenAI API request failed:', response.status, error.slice(0, 500));
        return res.status(response.status >= 400 && response.status < 500 ? response.status : 502)
          .json({ error: 'The AI provider could not complete the request. Check server configuration and provider quota.' });
      }

      const data = await response.json();
      res.json(data);

    } else if (provider === 'anthropic') {
      if (!ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: 'Anthropic API key not configured' });
      }

      const systemMessage = messages.find(m => m.role === 'system');
      const chatMessages = messages.filter(m => m.role !== 'system');

      const anthropicTools = AGENT_TOOLS.map(t => ({
        name: t.function.name,
        description: t.function.description,
        input_schema: t.function.parameters
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model || 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: systemMessage ? systemMessage.content : '',
          messages: chatMessages,
          tools: anthropicTools
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Anthropic API request failed:', response.status, error.slice(0, 500));
        return res.status(response.status >= 400 && response.status < 500 ? response.status : 502)
          .json({ error: 'The AI provider could not complete the request. Check server configuration and provider quota.' });
      }

      const data = await response.json();
      res.json(data);

    } else if (provider === 'deepseek') {
      if (!DEEPSEEK_API_KEY) {
        return res.status(500).json({ error: 'DeepSeek API key not configured' });
      }

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: model || 'deepseek-chat',
          messages: messages,
          tools: AGENT_TOOLS,
          tool_choice: 'auto',
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return res.status(response.status).json({ error: `DeepSeek API error: ${error}` });
      }

      const data = await response.json();
      res.json(data);

    } else {
      res.status(400).json({ error: 'Invalid provider' });
    }

  } catch (error) {
    console.error('AI Agent Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Separate in-memory rate-limit buckets; for multi-instance deployments use a shared store.
const aiRequestBuckets = new Map();
const toolRequestBuckets = new Map();

// Tool execution endpoint - executes only known, read-only agent tools server-side.
app.post('/api/ai-agent/execute-tool', (req, res, next) => {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const limit = checkRateLimit(key, Date.now(), toolRequestBuckets, 60, 60_000);
  if (!limit.allowed) {
    res.set('Retry-After', String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))));
    return res.status(429).json({ error: 'Too many tool requests. Please wait and try again.' });
  }
  next();
}, async (req, res) => {
  try {
    const { tool, args } = req.body || {};
    if (!isAllowedTool(tool, AGENT_TOOLS.map(item => item.function.name))) {
      return res.status(400).json({ error: 'Unknown or unsupported tool.' });
    }
    if (!args || typeof args !== 'object' || Array.isArray(args)) {
      return res.status(400).json({ error: 'Tool arguments must be a JSON object.' });
    }
    let result = {};

    switch (tool) {
      case 'lookup_tax_service':
        const taxServices = {
          vat: { name: 'Value Added Tax (VAT)', rate: '18%', deadline: '15th of every month', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login, steps: ['Log in to E-Tax Services portal', 'Navigate to "Returns" section', 'Select VAT return for the period', 'Fill in sales and purchases details', 'Submit return and make payment'] },
          income_tax: { name: 'Income Tax (Individual)', rate: '0%-30% graduated', deadline: 'March 31 (annual)', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login, steps: ['Log in to E-Tax Services portal', 'Go to "Returns" section', 'Select Annual Income Tax return', 'Declare all income sources', 'Submit and pay any tax due'] },
          paye: { name: 'PAYE (Pay As You Earn)', rate: '0%-30% graduated', deadline: '15th of every month', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login, steps: ['Log in to E-Tax Services portal', 'Navigate to PAYE section', 'Enter employee salary details', 'Calculate PAYE tax', 'Submit monthly return and pay'] },
          excise: { name: 'Excise Duty', rate: 'Varies by product', deadline: '15th of every month', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login, steps: ['Log in to E-Tax Services portal', 'Go to Excise Duty section', 'Declare excisable goods produced/imported', 'Calculate duty owed', 'Submit return and pay'] },
          wht: { name: 'Withholding Tax', rate: '2%-15%', deadline: '15th of every month', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login, steps: ['Log in to E-Tax Services portal', 'Navigate to WHT section', 'Declare withheld amounts from payments', 'Submit monthly WHT return', 'Pay tax withheld'] },
          ebm: { name: 'Electronic Billing Machine (EBM)', rate: 'N/A', deadline: 'N/A', platform: 'MyRRA Portal', url: PLATFORM_URLS.myrra_purchase_code, steps: ['Log in to MyRRA Portal', 'Request EBM purchase code', 'Protect your business TIN from misuse', 'Purchase EBM from authorized supplier', 'Install and configure EBM', 'Register EBM on RRA system', 'Issue receipts for all transactions'] },
          local_tax: { name: 'Local Government Taxes', rate: 'Varies by district', deadline: 'Varies', platform: 'RLGMS', url: PLATFORM_URLS.rlgms_login, steps: ['Log in to RLGMS (Local Government Tax System)', 'Select your district', 'View property/tax obligations', 'Make payment for local taxes', 'Receive receipt'] }
        };
        result = taxServices[args.service] || { error: 'Service not found' };
        break;

      case 'lookup_customs_service':
        const customsServices = {
          import: { name: 'Import Services', platform: 'e-Single Window', url: PLATFORM_URLS.single_window, steps: ['Register on e-Single Window (sw.gov.rw)', 'Submit import declaration', 'Upload required documents', 'Pay duties and taxes', 'Track clearance status', 'Collect goods after clearance'] },
          export: { name: 'Export Services', platform: 'e-Single Window', url: PLATFORM_URLS.single_window, steps: ['Register on e-Single Window', 'Submit export declaration', 'Obtain necessary permits/certificates', 'Present goods for inspection', 'Clear goods for export'] },
          single_window: { name: 'e-Single Window', platform: 'e-Single Window', url: PLATFORM_URLS.single_window, steps: ['Visit sw.gov.rw', 'Create account or log in', 'Submit trade declarations (import/export)', 'Track clearance status in real-time', 'Access trade documentation'] },
          trade_portal: { name: 'Rwanda Trade Portal', platform: 'Trade Portal', url: PLATFORM_URLS.trade_portal, steps: ['Visit rwandatrade.rw', 'Search for trade information', 'Access trade resources and guides', 'View tariff information', 'Contact trade support'] },
          duties_calc: { name: 'Import Duties Calculator', platform: 'Trade Portal', url: PLATFORM_URLS.trade_portal, steps: ['Visit rwandatrade.rw', 'Open duties calculator tool', 'Enter product description/code', 'Select country of origin', 'Get estimated duties and taxes'] }
        };
        result = customsServices[args.service] || { error: 'Service not found' };
        break;

      case 'lookup_business_registration':
        const regServices = {
          company: { name: 'Company Registration', platform: 'RDB Portal', url: PLATFORM_URLS.rdb, steps: ['Visit RDB Portal (urs.rdb.rw)', 'Create account', 'Reserve company name', 'Fill registration form', 'Upload required documents (ID, address proof)', 'Pay registration fee', 'Receive certificate of registration'] },
          tin: { name: 'TIN Registration', platform: 'MyRRA Portal', url: PLATFORM_URLS.myrra_create_account, steps: ['Visit MyRRA Portal', 'Click "Create TIN Account"', 'Fill in personal/business details', 'Upload ID document (National ID/Passport)', 'Submit application', 'Receive TIN instantly'] },
          trade_license: { name: 'Trade License', platform: 'RDB Portal', url: PLATFORM_URLS.rdb, steps: ['Visit RDB Portal (urs.rdb.rw)', 'Apply for trade license', 'Select business activity type', 'Provide business details', 'Pay license fee', 'Receive trade license'] },
          cooperative: { name: 'Cooperative Registration', platform: 'RDB Portal', url: PLATFORM_URLS.rdb, steps: ['Visit RDB Portal', 'Select cooperative registration', 'Upload member list (minimum 5 members)', 'Provide cooperative bylaws', 'Pay registration fee', 'Receive cooperative certificate'] }
        };
        result = regServices[args.service] || { error: 'Service not found' };
        break;

      case 'lookup_social_security':
        const rssbServices = {
          pension: { name: 'Pension Scheme', platform: 'RSSB', url: PLATFORM_URLS.rssb, steps: ['Register with RSSB (rssb.rw)', 'Enroll all eligible employees', 'Calculate contributions (employer 3%, employee 3%)', 'Submit monthly declaration', 'Pay via bank or mobile money'] },
          medical: { name: 'Medical Insurance (MMI)', platform: 'RSSB', url: PLATFORM_URLS.rssb, steps: ['Register with RSSB', 'Enroll in medical insurance scheme', 'Pay premiums monthly', 'Access healthcare services at contracted facilities', 'Submit claims when needed'] },
          voluntary: { name: 'Voluntary Contributions', platform: 'RSSB Member Portal', url: PLATFORM_URLS.rssb_member, steps: ['Visit RSSB Member Portal (imisanzu.rssb.rw)', 'Register for voluntary contributions', 'Choose contribution amount (min 5,000 RWF/month)', 'Set up payment method', 'Start contributing monthly for future benefits'] },
          employer_registration: { name: 'Employer Registration', platform: 'RSSB', url: PLATFORM_URLS.rssb, steps: ['Visit RSSB office or website', 'Fill employer registration form', 'Provide business documents', 'Provide employee list', 'Receive employer number', 'Start monthly declarations and payments'] }
        };
        result = rssbServices[args.service] || { error: 'Service not found' };
        break;

      case 'get_platform_url':
        result = { platform: args.platform, url: PLATFORM_URLS[args.platform] || null };
        break;

      case 'get_login_portal':
        const loginPortals = {
          tax_filing: { service: 'Tax Filing (VAT, PAYE, Income Tax)', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login, description: 'For filing tax returns and making tax payments' },
          tin_registration: { service: 'TIN Registration', platform: 'MyRRA Portal', url: PLATFORM_URLS.myrra_create_account, description: 'For registering new TIN accounts' },
          ebm_purchase_code: { service: 'EBM Purchase Code', platform: 'MyRRA Portal', url: PLATFORM_URLS.myrra_purchase_code, description: 'For requesting EBM purchase codes to protect your TIN' },
          local_tax: { service: 'Local Government Taxes', platform: 'RLGMS', url: PLATFORM_URLS.rlgms_login, description: 'For decentralized local government tax management' },
          vat_reward: { service: 'VAT Reward Account', platform: 'MyRRA Portal', url: PLATFORM_URLS.myrra_vat_reward, description: 'For VAT reward lottery account access' },
          staff: { service: 'RRA Staff Portal', platform: 'Staff Portal', url: PLATFORM_URLS.staff_portal, description: 'For RRA employees only' }
        };
        result = loginPortals[args.service] || { error: 'Service not found' };
        break;

      case 'calculate_tax_estimate':
        let calculation = {};
        if (args.tax_type === 'vat') {
          calculation = { type: 'VAT', amount: args.amount, tax_rate: '18%', tax_amount: args.amount * 0.18, total: args.amount * 1.18 };
        } else if (args.tax_type === 'paye') {
          let tax = 0;
          if (args.amount <= 60000) tax = 0;
          else if (args.amount <= 200000) tax = (args.amount - 60000) * 0.2;
          else if (args.amount <= 500000) tax = 28000 + (args.amount - 200000) * 0.25;
          else tax = 103000 + (args.amount - 500000) * 0.3;
          calculation = { type: 'PAYE (monthly estimate)', gross: args.amount, tax_amount: Math.round(tax), net: Math.round(args.amount - tax) };
        } else if (args.tax_type === 'income_tax') {
          calculation = { type: 'Income Tax', amount: args.amount, note: 'Use MyRRA calculator for precise computation' };
        } else if (args.tax_type === 'corporate_tax') {
          calculation = { type: 'Corporate Income Tax', amount: args.amount, tax_rate: '30%', tax_amount: args.amount * 0.3, after_tax: args.amount * 0.7 };
        }
        result = calculation;
        break;

      case 'get_deadline_info':
        const deadlines = {
          vat: { tax: 'VAT', deadline: '15th of every month', frequency: 'Monthly', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login },
          income_tax: { tax: 'Income Tax (Individual)', deadline: 'March 31 (annual)', frequency: 'Annual', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login },
          paye: { tax: 'PAYE', deadline: '15th of every month', frequency: 'Monthly', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login },
          corporate_tax: { tax: 'Corporate Income Tax', deadline: 'March 31 (annual)', frequency: 'Annual + quarterly estimates', platform: 'E-Tax Services', url: PLATFORM_URLS.etax_login },
          annual_return: { tax: 'Annual Return', deadline: 'March 31 every year', frequency: 'Annual', platform: 'MyRRA / RDB', url: PLATFORM_URLS.myrra },
          local_tax: { tax: 'Local Government Tax', deadline: 'Varies by district', frequency: 'Varies', platform: 'RLGMS', url: PLATFORM_URLS.rlgms_login }
        };
        result = deadlines[args.tax_type] || { error: 'Tax type not found' };
        break;

      case 'navigate_to_page':
        result = { page: args.page, url: PAGE_URLS[args.page] || null };
        break;

      case 'web_search':
        // Real web search using SerpAPI
        const searchQuery = args.query || '';
        const maxResults = args.max_results || 5;

        if (!SERPAPI_KEY) {
          // Never represent fabricated or stale fallback snippets as live search results.
          result = {
            query: searchQuery,
            results: [],
            unavailable: true,
            message: 'Live web search is not configured. Use verified local knowledge only and clearly state when current information cannot be confirmed.'
          };
          break;
        }

        try {
          const searchUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery + ' Rwanda RRA')}&api_key=${SERPAPI_KEY}&num=${maxResults}`;
          const searchResponse = await fetch(searchUrl);

          if (!searchResponse.ok) {
            throw new Error('Search API failed: ' + searchResponse.status);
          }

          const searchData = await searchResponse.json();
          const realResults = [];

          if (searchData.organic_results) {
            searchData.organic_results.slice(0, maxResults).forEach(function(item) {
              realResults.push({
                title: item.title || '',
                url: item.link || '',
                snippet: item.snippet || ''
              });
            });
          }

          result = {
            query: searchQuery,
            results: realResults,
            search_time: new Date().toISOString(),
            source: 'SerpAPI - Live Web Search'
          };
        } catch (error) {
          console.error('Web search error:', error);
          result = {
            query: searchQuery,
            results: [],
            unavailable: true,
            error: 'Live search request failed. Current information could not be verified.',
            search_time: new Date().toISOString()
          };
        }
        break;

      default:
        result = { error: 'Unknown tool' };
    }

    res.json({ success: true, result });
  } catch (error) {
    console.error('Tool execution error:', error);
    res.status(500).json({ error: 'Tool execution failed' });
  }
});

// AI Chat endpoint (legacy - kept for compatibility)
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
          model: model || 'gpt-4o',
          messages: messages,
          max_tokens: maxTokens || 2000,
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
          model: model || 'claude-sonnet-4-20250514',
          max_tokens: maxTokens || 2000,
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

// Text-to-Speech endpoint using OpenAI TTS
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    console.log('TTS request:', { textLength: text.length, language });

    // OpenAI TTS voices: alloy, echo, fable, onyx, nova, shimmer
    // For Kinyarwanda/Bantu languages, 'nova' or 'shimmer' work well
    let voice = 'nova';
    let model = 'tts-1'; // tts-1 for standard quality, tts-1-hd for HD

    // For Kinyarwanda, use HD model for better pronunciation
    if (language === 'rw-RW') {
      voice = 'nova';
      model = 'tts-1-hd';
    }

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        input: text,
        voice: voice,
        response_format: 'mp3',
        speed: 1.0
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI TTS API error:', response.status, error);
      return res.status(response.status).json({ error: `OpenAI TTS API error: ${error}` });
    }

    // Convert audio to base64
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    console.log('TTS success:', { audioSize: audioBase64.length, voice, model });

    res.json({
      success: true,
      audioContent: audioBase64,
      language: language || 'en-US',
      provider: 'openai',
      voice: voice
    });

  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: 'Text-to-speech failed' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  let dbError = null;
  try {
    await pool.query('SELECT 1');
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'error';
    dbError = error.message;
    console.error('Database health check error:', error.message);
  }
  
  res.json({
    status: 'ok',
    openai: !!OPENAI_API_KEY,
    anthropic: !!ANTHROPIC_API_KEY,
    database: dbStatus,
    databaseError: dbError
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

// Streaming AI Agent endpoint - real-time response streaming
app.post('/api/ai-agent/stream', async (req, res) => {
  try {
    const { messages, provider, model } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    if (provider === 'openai' || !provider) {
      if (!OPENAI_API_KEY) {
        res.write(`data: ${JSON.stringify({ error: 'OpenAI API key not configured' })}\n\n`);
        return res.end();
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: model || 'gpt-4o',
          messages: messages,
          tools: AGENT_TOOLS,
          tool_choice: 'auto',
          max_tokens: 2000,
          temperature: 0.7,
          stream: true
        })
      });

      if (!response.ok) {
        const error = await response.text();
        res.write(`data: ${JSON.stringify({ error: `OpenAI API error: ${error}` })}\n\n`);
        return res.end();
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
              return res.end();
            }
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

    } else if (provider === 'anthropic') {
      if (!ANTHROPIC_API_KEY) {
        res.write(`data: ${JSON.stringify({ error: 'Anthropic API key not configured' })}\n\n`);
        return res.end();
      }

      const systemMessage = messages.find(m => m.role === 'system');
      const chatMessages = messages.filter(m => m.role !== 'system');

      const anthropicTools = AGENT_TOOLS.map(t => ({
        name: t.function.name,
        description: t.function.description,
        input_schema: t.function.parameters
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model || 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: systemMessage ? systemMessage.content : '',
          messages: chatMessages,
          tools: anthropicTools,
          stream: true
        })
      });

      if (!response.ok) {
        const error = await response.text();
        res.write(`data: ${JSON.stringify({ error: `Anthropic API error: ${error}` })}\n\n`);
        return res.end();
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                res.write(`data: ${JSON.stringify({ content: parsed.delta.text })}\n\n`);
              } else if (parsed.type === 'message_stop') {
                res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
                return res.end();
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

    } else {
      res.write(`data: ${JSON.stringify({ error: 'Invalid provider' })}\n\n`);
      res.end();
    }

  } catch (error) {
    console.error('Streaming AI Agent Error:', error);
    res.write(`data: ${JSON.stringify({ error: 'Internal server error' })}\n\n`);
    res.end();
  }
});

// File upload endpoint for AI analysis
app.post('/api/ai-agent/upload', async (req, res) => {
  try {
    const { file, type, name } = req.body;

    if (!file || !type) {
      return res.status(400).json({ error: 'File data and type are required' });
    }

    // For now, return file metadata - actual processing would use AI vision API
    const fileInfo = {
      name: name || 'uploaded-file',
      type: type,
      size: file.length,
      uploaded_at: new Date().toISOString()
    };

    res.json({
      success: true,
      file: fileInfo,
      message: 'File received. AI agent will analyze the content.'
    });

  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Failed to process file upload' });
  }
});

// ===== ADMIN DASHBOARD API =====

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await pool.query('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
    res.json({ success: true, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Admin change password
app.post('/api/admin/change-password', async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    if (!username || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE admin_users SET password_hash = $1 WHERE id = $2', [hash, result.rows[0].id]);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// ===== VIDEOS CRUD =====
app.get('/api/admin/videos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos ORDER BY display_order ASC, created_at DESC');
    res.json({ videos: result.rows });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.post('/api/admin/videos', async (req, res) => {
  try {
    const { title, description, video_url, thumbnail_url, category, duration, display_order, is_active } = req.body;
    if (!title || !video_url) {
      return res.status(400).json({ error: 'Title and video URL are required' });
    }
    const result = await pool.query(
      `INSERT INTO videos (title, description, video_url, thumbnail_url, category, duration, display_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description || null, video_url, thumbnail_url || null, category || null, duration || null, display_order || 0, is_active !== false]
    );
    res.json({ success: true, video: result.rows[0] });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

app.put('/api/admin/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, video_url, thumbnail_url, category, duration, display_order, is_active } = req.body;
    const result = await pool.query(
      `UPDATE videos SET title=$1, description=$2, video_url=$3, thumbnail_url=$4, category=$5, duration=$6, display_order=$7, is_active=$8, updated_at=CURRENT_TIMESTAMP
       WHERE id=$9 RETURNING *`,
      [title, description || null, video_url, thumbnail_url || null, category || null, duration || null, display_order || 0, is_active !== false, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Video not found' });
    res.json({ success: true, video: result.rows[0] });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

app.delete('/api/admin/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM videos WHERE id = $1', [id]);
    res.json({ success: true, message: 'Video deleted' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// ===== PROJECTS CRUD =====
app.get('/api/admin/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY display_order ASC, created_at DESC');
    res.json({ projects: result.rows });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/admin/projects', async (req, res) => {
  try {
    const { title, description, image_url, project_url, category, tags, display_order, is_active } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const result = await pool.query(
      `INSERT INTO projects (title, description, image_url, project_url, category, tags, display_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description || null, image_url || null, project_url || null, category || null, tags || null, display_order || 0, is_active !== false]
    );
    res.json({ success: true, project: result.rows[0] });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/admin/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, project_url, category, tags, display_order, is_active } = req.body;
    const result = await pool.query(
      `UPDATE projects SET title=$1, description=$2, image_url=$3, project_url=$4, category=$5, tags=$6, display_order=$7, is_active=$8, updated_at=CURRENT_TIMESTAMP
       WHERE id=$9 RETURNING *`,
      [title, description || null, image_url || null, project_url || null, category || null, tags || null, display_order || 0, is_active !== false, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, project: result.rows[0] });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/admin/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ===== SHOP PRODUCTS CRUD =====
app.get('/api/admin/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shop_products ORDER BY display_order ASC, created_at DESC');
    res.json({ products: result.rows });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/admin/products', async (req, res) => {
  try {
    const { title, description, price, currency, image_url, preview_url, demo_url, category, features, technologies, display_order, is_featured, is_active } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const result = await pool.query(
      `INSERT INTO shop_products (title, description, price, currency, image_url, preview_url, demo_url, category, features, technologies, display_order, is_featured, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [title, description || null, price || null, currency || 'RWF', image_url || null, preview_url || null, demo_url || null, category || null, features || null, technologies || null, display_order || 0, is_featured || false, is_active !== false]
    );
    res.json({ success: true, product: result.rows[0] });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, currency, image_url, preview_url, demo_url, category, features, technologies, display_order, is_featured, is_active } = req.body;
    const result = await pool.query(
      `UPDATE shop_products SET title=$1, description=$2, price=$3, currency=$4, image_url=$5, preview_url=$6, demo_url=$7, category=$8, features=$9, technologies=$10, display_order=$11, is_featured=$12, is_active=$13, updated_at=CURRENT_TIMESTAMP
       WHERE id=$14 RETURNING *`,
      [title, description || null, price || null, currency || 'RWF', image_url || null, preview_url || null, demo_url || null, category || null, features || null, technologies || null, display_order || 0, is_featured || false, is_active !== false, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product: result.rows[0] });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM shop_products WHERE id = $1', [id]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ===== SITE CONTENT CRUD =====
app.get('/api/admin/content', async (req, res) => {
  try {
    const { page } = req.query;
    let result;
    if (page) {
      result = await pool.query('SELECT * FROM site_content WHERE page = $1 ORDER BY section, content_key', [page]);
    } else {
      result = await pool.query('SELECT * FROM site_content ORDER BY page, section, content_key');
    }
    res.json({ content: result.rows });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/admin/content', async (req, res) => {
  try {
    const { content_key, content_value, content_type, page, section } = req.body;
    if (!content_key) {
      return res.status(400).json({ error: 'Content key is required' });
    }
    const result = await pool.query(
      `INSERT INTO site_content (content_key, content_value, content_type, page, section)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (content_key) DO UPDATE SET content_value=$2, content_type=$3, page=$4, section=$5, updated_at=CURRENT_TIMESTAMP
       RETURNING *`,
      [content_key, content_value || '', content_type || 'text', page || null, section || null]
    );
    res.json({ success: true, content: result.rows[0] });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

app.put('/api/admin/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content_key, content_value, content_type, page, section } = req.body;
    const result = await pool.query(
      `UPDATE site_content SET content_key=$1, content_value=$2, content_type=$3, page=$4, section=$5, updated_at=CURRENT_TIMESTAMP
       WHERE id=$6 RETURNING *`,
      [content_key, content_value || '', content_type || 'text', page || null, section || null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Content not found' });
    res.json({ success: true, content: result.rows[0] });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.delete('/api/admin/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM site_content WHERE id = $1', [id]);
    res.json({ success: true, message: 'Content deleted' });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// ===== ADMIN DASHBOARD STATS =====
app.get('/api/admin/stats', async (req, res) => {
  try {
    const videos = await pool.query('SELECT COUNT(*) FROM videos');
    const activeVideos = await pool.query('SELECT COUNT(*) FROM videos WHERE is_active = true');
    const projects = await pool.query('SELECT COUNT(*) FROM projects');
    const activeProjects = await pool.query('SELECT COUNT(*) FROM projects WHERE is_active = true');
    const products = await pool.query('SELECT COUNT(*) FROM shop_products');
    const activeProducts = await pool.query('SELECT COUNT(*) FROM shop_products WHERE is_active = true');
    const contacts = await pool.query('SELECT COUNT(*) FROM contacts');
    const newContacts = await pool.query("SELECT COUNT(*) FROM contacts WHERE status = 'new'");
    const newsletters = await pool.query('SELECT COUNT(*) FROM newsletter_subscriptions WHERE is_active = true');
    const content = await pool.query('SELECT COUNT(*) FROM site_content');

    res.json({
      videos: { total: parseInt(videos.rows[0].count), active: parseInt(activeVideos.rows[0].count) },
      projects: { total: parseInt(projects.rows[0].count), active: parseInt(activeProjects.rows[0].count) },
      products: { total: parseInt(products.rows[0].count), active: parseInt(activeProducts.rows[0].count) },
      contacts: { total: parseInt(contacts.rows[0].count), new: parseInt(newContacts.rows[0].count) },
      newsletters: { total: parseInt(newsletters.rows[0].count) },
      content: { total: parseInt(content.rows[0].count) }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ===== PUBLIC API (for frontend to fetch managed content) =====
app.get('/api/videos', async (req, res) => {
  try {
    const { category } = req.query;
    let result;
    if (category) {
      result = await pool.query('SELECT * FROM videos WHERE is_active = true AND category = $1 ORDER BY display_order ASC', [category]);
    } else {
      result = await pool.query('SELECT * FROM videos WHERE is_active = true ORDER BY display_order ASC');
    }
    res.json({ videos: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const { category } = req.query;
    let result;
    if (category) {
      result = await pool.query('SELECT * FROM projects WHERE is_active = true AND category = $1 ORDER BY display_order ASC', [category]);
    } else {
      result = await pool.query('SELECT * FROM projects WHERE is_active = true ORDER BY display_order ASC');
    }
    res.json({ projects: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM shop_products WHERE is_active = true';
    const params = [];
    if (category) { params.push(category); query += ` AND category = $${params.length}`; }
    if (featured === 'true') { query += ' AND is_featured = true'; }
    query += ' ORDER BY display_order ASC';
    const result = await pool.query(query, params);
    res.json({ products: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
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
  console.log(`SerpAPI: ${SERPAPI_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`Database: ${DATABASE_URL ? 'Configured' : 'Not configured'}`);
});
