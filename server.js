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
          platform: { type: 'string', description: 'Platform name (myrra, etax, single_window, trade_portal, rdb, rssb, rura, non_fiscal)' }
        },
        required: ['platform']
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
  }
];

const PLATFORM_URLS = {
  myrra: 'https://myrra.rra.gov.rw/',
  etax: 'https://etax.rra.gov.rw/nidAssignedTIN/',
  single_window: 'https://sw.gov.rw/',
  trade_portal: 'https://rwandatrade.rw/',
  rdb: 'https://urs.rdb.rw/auth/register',
  rssb: 'https://www.rssb.gov.rw/',
  rura: 'https://www.rura.gov.rw/',
  non_fiscal: 'https://nonfiscal.rra.gov.rw/'
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
app.post('/api/ai-agent', async (req, res) => {
  try {
    const { messages, provider, model } = req.body;

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
        return res.status(response.status).json({ error: `Anthropic API error: ${error}` });
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

// Tool execution endpoint - executes agent tools server-side
app.post('/api/ai-agent/execute-tool', (req, res) => {
  try {
    const { tool, args } = req.body;
    let result = {};

    switch (tool) {
      case 'lookup_tax_service':
        const taxServices = {
          vat: { name: 'Value Added Tax (VAT)', rate: '18%', deadline: '15th of every month', platform: 'MyRRA', url: PLATFORM_URLS.myrra, steps: ['Log in to MyRRA', 'Go to "Returns"', 'Select VAT return period', 'Fill in sales and purchases', 'Submit and pay'] },
          income_tax: { name: 'Income Tax (PAYE)', rate: '0%-30% graduated', deadline: '15th of every month', platform: 'MyRRA', url: PLATFORM_URLS.myrra, steps: ['Log in to MyRRA', 'Go to "Returns"', 'Select PAYE return', 'Enter employee details', 'Submit and pay'] },
          paye: { name: 'PAYE (Pay As You Earn)', rate: '0%-30% graduated', deadline: '15th of every month', platform: 'MyRRA', url: PLATFORM_URLS.myrra, steps: ['Log in to MyRRA', 'Navigate to PAYE section', 'Enter employee salaries', 'Calculate tax', 'Submit return'] },
          excise: { name: 'Excise Duty', rate: 'Varies by product', deadline: '15th of every month', platform: 'MyRRA', url: PLATFORM_URLS.myrra, steps: ['Log in to MyRRA', 'Go to Excise section', 'Declare excisable goods', 'Calculate duty', 'Submit and pay'] },
          wht: { name: 'Withholding Tax', rate: '2%-15%', deadline: '15th of every month', platform: 'MyRRA', url: PLATFORM_URLS.myrra, steps: ['Log in to MyRRA', 'Go to WHT section', 'Declare withheld amounts', 'Submit return'] },
          ebm: { name: 'Electronic Billing Machine', rate: 'N/A', deadline: 'N/A', platform: 'MyRRA', url: PLATFORM_URLS.myrra, steps: ['Register for EBM on MyRRA', 'Download EBM app or use web', 'Issue receipts for every transaction', 'Sync data regularly', 'File monthly returns'] }
        };
        result = taxServices[args.service] || { error: 'Service not found' };
        break;

      case 'lookup_customs_service':
        const customsServices = {
          import: { name: 'Import Services', platform: 'e-Single Window', url: PLATFORM_URLS.single_window, steps: ['Register on e-Single Window', 'Submit import declaration', 'Pay duties and taxes', 'Clear goods at customs'] },
          export: { name: 'Export Services', platform: 'e-Single Window', url: PLATFORM_URLS.single_window, steps: ['Register on e-Single Window', 'Submit export declaration', 'Obtain export permits if needed', 'Clear goods'] },
          single_window: { name: 'e-Single Window', platform: 'e-Single Window', url: PLATFORM_URLS.single_window, steps: ['Visit sw.gov.rw', 'Create account', 'Submit trade declarations', 'Track clearance status'] },
          trade_portal: { name: 'Rwanda Trade Portal', platform: 'Trade Portal', url: PLATFORM_URLS.trade_portal, steps: ['Visit rwandatrade.rw', 'Search for trade information', 'Access trade resources'] },
          duties_calc: { name: 'Import Duties Calculator', platform: 'Trade Portal', url: PLATFORM_URLS.trade_portal, steps: ['Visit rwandatrade.rw', 'Open duties calculator', 'Enter product details', 'Get estimated duties'] }
        };
        result = customsServices[args.service] || { error: 'Service not found' };
        break;

      case 'lookup_business_registration':
        const regServices = {
          company: { name: 'Company Registration', platform: 'RDB', url: PLATFORM_URLS.rdb, steps: ['Visit urs.rdb.rw', 'Create account', 'Reserve company name', 'Fill registration form', 'Upload required documents', 'Pay registration fee', 'Receive certificate'] },
          tin: { name: 'TIN Registration', platform: 'eTax', url: PLATFORM_URLS.etax, steps: ['Visit etax.rra.gov.rw', 'Click "Register for TIN"', 'Fill in personal/business details', 'Upload ID document', 'Submit and receive TIN instantly'] },
          trade_license: { name: 'Trade License', platform: 'RDB', url: PLATFORM_URLS.rdb, steps: ['Visit urs.rdb.rw', 'Apply for trade license', 'Select business activity', 'Pay license fee', 'Receive license'] },
          cooperative: { name: 'Cooperative Registration', platform: 'RDB', url: PLATFORM_URLS.rdb, steps: ['Visit urs.rdb.rw', 'Select cooperative registration', 'Upload member list', 'Provide bylaws', 'Pay fee', 'Receive certificate'] }
        };
        result = regServices[args.service] || { error: 'Service not found' };
        break;

      case 'lookup_social_security':
        const rssbServices = {
          pension: { name: 'Pension Scheme', platform: 'RSSB', url: PLATFORM_URLS.rssb, steps: ['Register with RSSB', 'Enroll employees', 'Calculate contributions (employer 3%, employee 3%)', 'Submit monthly', 'Pay via bank or mobile money'] },
          medical: { name: 'Medical Insurance (MMI)', platform: 'RSSB', url: PLATFORM_URLS.rssb, steps: ['Register with RSSB', 'Enroll in medical scheme', 'Pay premiums monthly', 'Access healthcare services'] },
          voluntary: { name: 'Voluntary Contributions', platform: 'RSSB', url: PLATFORM_URLS.rssb, steps: ['Visit RSSB office or portal', 'Register for voluntary contributions', 'Choose contribution amount (min 5,000 RWF/month)', 'Set up payment method', 'Start contributing monthly'] },
          employer_registration: { name: 'Employer Registration', platform: 'RSSB', url: PLATFORM_URLS.rssb, steps: ['Visit RSSB with business documents', 'Fill employer registration form', 'Provide employee list', 'Receive employer number', 'Start monthly declarations'] }
        };
        result = rssbServices[args.service] || { error: 'Service not found' };
        break;

      case 'get_platform_url':
        result = { platform: args.platform, url: PLATFORM_URLS[args.platform] || null };
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
          vat: { tax: 'VAT', deadline: '15th of every month', frequency: 'Monthly', platform: 'MyRRA' },
          income_tax: { tax: 'Income Tax (Individual)', deadline: 'March 31 (annual)', frequency: 'Annual', platform: 'MyRRA' },
          paye: { tax: 'PAYE', deadline: '15th of every month', frequency: 'Monthly', platform: 'MyRRA' },
          corporate_tax: { tax: 'Corporate Income Tax', deadline: 'March 31 (annual)', frequency: 'Annual + quarterly estimates', platform: 'MyRRA' },
          annual_return: { tax: 'Annual Return', deadline: 'March 31 every year', frequency: 'Annual', platform: 'MyRRA / RDB' }
        };
        result = deadlines[args.tax_type] || { error: 'Tax type not found' };
        break;

      case 'navigate_to_page':
        result = { page: args.page, url: PAGE_URLS[args.page] || null };
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
