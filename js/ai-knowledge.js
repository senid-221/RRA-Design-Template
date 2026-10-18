var aiKnowledge = {
  services: [
    {
      id: 'tin-registration',
      keywords: ['tin', 'tax identification', 'registration', 'register tin', 'get tin', 'tin number'],
      title: 'TIN Registration',
      category: 'RRA',
      description: 'Get your Tax Identification Number (TIN) for individuals or businesses.',
      platform: 'eTax Portal',
      url: 'https://etax.rra.gov.rw/nidAssignedTIN/',
      steps: [
        'Visit the eTax portal at etax.rra.gov.rw',
        'Click on "Get TIN" or "Register for TIN"',
        'Select your taxpayer type (Individual, Company, or Other)',
        'Fill in your personal details (Name, ID number, Phone, Email)',
        'For companies: provide business registration details',
        'Submit the application',
        'Your TIN will be generated instantly for individuals, or within 24 hours for businesses'
      ]
    },
    {
      id: 'vat-registration',
      keywords: ['vat', 'value added tax', 'register vat', 'vat registration'],
      title: 'VAT Registration',
      category: 'RRA',
      description: 'Register for Value Added Tax (mandatory for businesses with turnover above 20M RWF).',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal (myrra.rra.gov.rw)',
        'Navigate to "Tax Services" → "Registration"',
        'Select "VAT Registration"',
        'Complete the VAT registration form with business details',
        'Upload required documents (TIN certificate, business license, ID)',
        'Submit the application',
        'Wait for RRA verification (typically 3-5 business days)',
        'You will receive VAT certificate via email'
      ]
    },
    {
      id: 'income-tax-filing',
      keywords: ['income tax', 'file tax', 'tax return', 'declaration', 'submit tax', 'annual return'],
      title: 'Income Tax Declaration',
      category: 'RRA',
      description: 'File your annual income tax return (individuals and businesses).',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal with your TIN and password',
        'Go to "Declarations" → "File Return"',
        'Select the tax type (Income Tax - Individual or Corporate)',
        'Select the tax period (year)',
        'Fill in your income details and deductions',
        'The system will calculate your tax automatically',
        'Review and submit the declaration',
        'If payment is due, proceed to "Payments" to pay'
      ]
    },
    {
      id: 'paye-filing',
      keywords: ['paye', 'pay as you earn', 'employee tax', 'payroll tax', 'employee declaration'],
      title: 'PAYE Declaration',
      category: 'RRA',
      description: 'File monthly PAYE (Pay As You Earn) for employees.',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal',
        'Navigate to "Declarations" → "File PAYE Return"',
        'Select the month and year',
        'Upload employee payroll file (CSV format) or enter manually',
        'System calculates PAYE for each employee',
        'Review the summary',
        'Submit the declaration',
        'Proceed to payment if tax is due (by 15th of next month)'
      ]
    },
    {
      id: 'vat-declaration',
      keywords: ['vat declaration', 'vat return', 'file vat', 'monthly vat'],
      title: 'VAT Declaration',
      category: 'RRA',
      description: 'File monthly VAT returns for registered businesses.',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal',
        'Go to "Declarations" → "File VAT Return"',
        'Select the tax period (month)',
        'Enter your sales (output VAT) and purchases (input VAT)',
        'Or upload the CSV file with VAT details',
        'System calculates net VAT (output - input)',
        'Review and submit',
        'Pay any VAT due by the 15th of the following month'
      ]
    },
    {
      id: 'ebm-invoice',
      keywords: ['ebm', 'electronic billing', 'e-receipt', 'invoice', 'ebm machine', 'ebm register'],
      title: 'EBM Invoice Registration',
      category: 'RRA',
      description: 'Register and manage Electronic Billing Machines (EBM) for issuing tax invoices.',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal',
        'Navigate to "EBM Services" → "Register EBM"',
        'Choose EBM type (Software or Physical Device)',
        'For software: provide your POS system details',
        'For device: provide device serial number',
        'Complete the registration form',
        'Submit for verification',
        'Once approved, you can start issuing EBM invoices',
        'All invoices are automatically sent to RRA'
      ]
    },
    {
      id: 'tax-payment',
      keywords: ['pay tax', 'payment', 'make payment', 'tax payment', 'pay now'],
      title: 'Tax Payment',
      category: 'RRA',
      description: 'Make tax payments via bank, mobile money, or bank transfer.',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal',
        'Go to "Payments" → "Make Payment"',
        'Select the tax type you want to pay',
        'Enter the amount',
        'Choose payment method: Bank, Mobile Money (MTN/Airtel), or Bank Transfer',
        'For bank: you will get a payment slip to take to the bank',
        'For mobile money: enter your phone number and confirm on your phone',
        'Keep the payment receipt for your records'
      ]
    },
    {
      id: 'tcc',
      keywords: ['tcc', 'tax clearance', 'clearance certificate', 'tax clearance certificate'],
      title: 'Tax Clearance Certificate',
      category: 'RRA',
      description: 'Get a Tax Clearance Certificate (TCC) proving you have no tax debts.',
      platform: 'MyRRA Portal',
      url: 'https://www.rra.gov.rw/en/tcc',
      steps: [
        'Log in to MyRRA portal',
        'Navigate to "Certificates" → "Request TCC"',
        'System checks if you have any outstanding tax debts',
        'If clear: TCC is generated instantly',
        'If you have debts: you must pay them first',
        'Download or print your TCC',
        'TCC is valid for 30 days'
      ]
    },
    {
      id: 'customs-declaration',
      keywords: ['customs', 'import', 'export', 'customs declaration', 'import goods', 'clear goods'],
      title: 'Customs Declaration',
      category: 'RRA',
      description: 'Declare imported or exported goods through the e-Single Window.',
      platform: 'e-Single Window',
      url: 'https://sw.gov.rw/',
      steps: [
        'Log in to e-Single Window (sw.gov.rw)',
        'Go to "Customs" → "New Declaration"',
        'Select declaration type (Import, Export, or Transit)',
        'Enter goods details (description, quantity, value, HS code)',
        'Upload required documents (invoice, packing list, bill of lading)',
        'System calculates duties and taxes',
        'Submit the declaration',
        'Pay the calculated duties via MyRRA',
        'Wait for customs clearance',
        'Collect your goods after clearance'
      ]
    },
    {
      id: 'import-duty-calc',
      keywords: ['import duty', 'calculate duty', 'duty calculator', 'import tax', 'customs duty'],
      title: 'Import Duties Calculator',
      category: 'RRA',
      description: 'Calculate import duties and taxes before importing goods.',
      platform: 'Trade Portal',
      url: 'https://rwandatrade.rw/',
      steps: [
        'Visit the Trade Portal (rwandatrade.rw)',
        'Go to "Import Duties Calculator"',
        'Enter the HS code of your product (or search by description)',
        'Enter the CIF value (Cost + Insurance + Freight)',
        'Click "Calculate"',
        'System shows all applicable duties and taxes',
        'This includes: Import Duty, VAT, Excise Duty (if applicable), Withholding Tax'
      ]
    },
    {
      id: 'business-registration',
      keywords: ['register business', 'business registration', 'company registration', 'rdb', 'register company'],
      title: 'Business Registration',
      category: 'RDB',
      description: 'Register a new business or company in Rwanda.',
      platform: 'RDB Portal',
      url: 'https://urs.rdb.rw/auth/register',
      steps: [
        'Visit RDB portal (rdb.rw) or One Stop Center',
        'Choose business type (Sole proprietorship, Limited Company, etc.)',
        'Reserve your business name',
        'Prepare documents: IDs of directors/shareholders, business address',
        'Fill in the registration form',
        'Pay registration fee',
        'Submit the application',
        'Registration is completed within 6 hours for sole proprietorship, 24 hours for companies',
        'You receive: Business certificate, TIN, and social security number'
      ]
    },
    {
      id: 'business-permit',
      keywords: ['business permit', 'trading license', 'operating license', 'business license'],
      title: 'Business Permit',
      category: 'RDB',
      description: 'Get a business permit/trading license to operate legally.',
      platform: 'RDB Portal',
      url: 'https://urs.rdb.rw/auth/register',
      steps: [
        'Log in to RDB portal',
        'Navigate to "Post Registration" → "Business Permit"',
        'Select your business',
        'Choose permit type based on your activity',
        'Upload required documents (varies by activity)',
        'Pay the permit fee',
        'Submit application',
        'Permit is issued within 1-3 business days',
        'Must be renewed annually'
      ]
    },
    {
      id: 'investment-registration',
      keywords: ['investment', 'register investment', 'foreign investment', 'investor'],
      title: 'Investment Registration',
      category: 'RDB',
      description: 'Register as an investor in Rwanda (local or foreign).',
      platform: 'RDB Portal',
      url: 'https://urs.rdb.rw/auth/register',
      steps: [
        'Visit RDB portal or One Stop Center',
        'Go to "Investment Services" → "Register Investment"',
        'Provide investment details (sector, capital, business plan)',
        'For foreign investors: provide passport, proof of capital',
        'Submit application',
        'RDB evaluates your investment proposal',
        'If approved: you get investment certificate with incentives',
        'Benefits: tax holidays, duty-free import of equipment, etc.'
      ]
    },
    {
      id: 'rssb-registration',
      keywords: ['rssb', 'social security', 'pension', 'employee registration', 'rssb registration'],
      title: 'RSSB Employee Registration',
      category: 'RSSB',
      description: 'Register employees for social security (pension and occupational hazards).',
      platform: 'RSSB Portal',
      url: 'https://www.rssb.gov.rw/',
      steps: [
        'Log in to RSSB employer portal',
        'Go to "Employee Management" → "Register Employee"',
        'Enter employee details (Name, ID, TIN, start date)',
        'System generates RSSB number for the employee',
        'Employee is now registered for pension (5% employee + 5% employer)',
        'Also registered for occupational hazards insurance (1% employer)',
        'Monthly contributions due by 15th of each month'
      ]
    },
    {
      id: 'rssb-payment',
      keywords: ['rssb payment', 'pay rssb', 'social security payment', 'pension payment'],
      title: 'RSSB Contributions Payment',
      category: 'RSSB',
      description: 'Pay monthly social security contributions for employees.',
      platform: 'RSSB Portal',
      url: 'https://www.rssb.gov.rw/',
      steps: [
        'Log in to RSSB employer portal',
        'Go to "Payments" → "Monthly Contributions"',
        'Select the month',
        'System shows all registered employees and amounts',
        'Review the total (pension + occupational hazards)',
        'Choose payment method (Bank or Mobile Money)',
        'Complete payment',
        'Payment must be made by 15th of each month'
      ]
    },
    {
      id: 'rssb-claims',
      keywords: ['rssb claims', 'pension claims', 'benefits', 'rssb benefits', 'retirement'],
      title: 'RSSB Benefits Claims',
      category: 'RSSB',
      description: 'Claim pension, retirement, or other RSSB benefits.',
      platform: 'RSSB Portal',
      url: 'https://www.rssb.gov.rw/',
      steps: [
        'Log in to RSSB portal or visit nearest RSSB office',
        'Go to "Claims" → "New Claim"',
        'Select claim type (Retirement, Invalidity, Survivor, etc.)',
        'Upload required documents (ID, medical reports, death certificate, etc.)',
        'Submit the claim',
        'RSSB processes the claim (typically 30 days)',
        'You will be notified of the decision',
        'If approved: benefits are paid monthly or as lump sum'
      ]
    },
    {
      id: 'rura-license',
      keywords: ['rura', 'telecom license', 'broadcasting license', 'transport license', 'rura license'],
      title: 'RURA Licensing',
      category: 'RURA',
      description: 'Get licenses for telecom, broadcasting, or transport services.',
      platform: 'RURA Portal',
      url: 'https://www.rura.gov.rw/',
      steps: [
        'Visit RURA portal (rura.gov.rw)',
        'Go to "Licensing" → "Apply for License"',
        'Select license type (Telecom, Broadcasting, Transport, etc.)',
        'Download and review the application requirements',
        'Prepare required documents (business plan, technical specs, financials)',
        'Submit online application with all documents',
        'Pay the application fee',
        'RURA reviews the application (30-90 days depending on license)',
        'If approved: pay the license fee and collect your license'
      ]
    },
    {
      id: 'rura-complaint',
      keywords: ['rura complaint', 'telecom complaint', 'service complaint', 'consumer complaint'],
      title: 'RURA Consumer Complaint',
      category: 'RURA',
      description: 'File a complaint about telecom, transport, or broadcasting services.',
      platform: 'RURA Portal',
      url: 'https://www.rura.gov.rw/',
      steps: [
        'Visit RURA portal or call RURA hotline',
        'Go to "Consumer Protection" → "File Complaint"',
        'Select service provider and complaint type',
        'Describe your issue in detail',
        'Upload any supporting documents',
        'Submit the complaint',
        'RURA acknowledges receipt within 24 hours',
        'RURA investigates and resolves within 15 business days',
        'You receive notification of the resolution'
      ]
    },
    {
      id: 'excise-duty',
      keywords: ['excise', 'excise duty', 'excise tax'],
      title: 'Excise Duty Declaration',
      category: 'RRA',
      description: 'File excise duty returns for manufactured excisable goods.',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal',
        'Navigate to "Declarations" → "File Excise Return"',
        'Select the tax period (month)',
        'Enter quantities of excisable goods produced/sold',
        'System calculates excise duty based on rates',
        'Review and submit',
        'Pay the excise duty by 15th of following month'
      ]
    },
    {
      id: 'withholding-tax',
      keywords: ['withholding', 'wht', 'withholding tax'],
      title: 'Withholding Tax Declaration',
      category: 'RRA',
      description: 'File withholding tax returns for payments to suppliers.',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal',
        'Go to "Declarations" → "File WHT Return"',
        'Select the tax period',
        'Enter payments made to suppliers subject to WHT',
        'System calculates WHT (typically 3% or 15%)',
        'Submit the declaration',
        'Pay WHT by 15th of following month',
        'Issue WHT certificates to suppliers'
      ]
    },
    {
      id: 'non-fiscal-payment',
      keywords: ['non fiscal', 'non-fiscal', 'government fees', 'service fees'],
      title: 'Non-Fiscal Revenue Payment',
      category: 'RRA',
      description: 'Pay government service fees, permits, and other non-tax revenues.',
      platform: 'Non-Fiscal Portal',
      url: 'https://nonfiscal.rra.gov.rw/',
      steps: [
        'Visit Non-Fiscal portal (nonfiscal.rra.gov.rw)',
        'Select the government institution',
        'Choose the service type',
        'Enter the amount',
        'Select payment method',
        'Complete payment',
        'Download receipt'
      ]
    },
    {
      id: 'motor-vehicle-tax',
      keywords: ['vehicle tax', 'car tax', 'motor vehicle', 'vehicle registration tax'],
      title: 'Motor Vehicle Tax',
      category: 'RRA',
      description: 'Pay annual motor vehicle tax.',
      platform: 'MyRRA Portal',
      url: 'https://myrra.rra.gov.rw/',
      steps: [
        'Log in to MyRRA portal',
        'Go to "Declarations" → "Motor Vehicle Tax"',
        'Select your vehicle (or enter plate number)',
        'System calculates tax based on vehicle type and age',
        'Submit the declaration',
        'Pay the tax',
        'Tax is due annually'
      ]
    },
    {
      id: 'rssb-self-employed',
      keywords: ['self employed rssb', 'voluntary contribution', 'self employed pension'],
      title: 'RSSB Self-Employed Registration',
      category: 'RSSB',
      description: 'Register for voluntary pension contributions as self-employed.',
      platform: 'RSSB Portal',
      url: 'https://www.rssb.gov.rw/',
      steps: [
        'Visit RSSB office or portal',
        'Go to "Voluntary Contributions" → "Register"',
        'Provide your details (Name, ID, TIN, contact)',
        'Choose contribution amount (minimum 5,000 RWF/month)',
        'Set up payment method (bank or mobile money)',
        'Submit registration',
        'Start making monthly contributions',
        'Build your pension even as self-employed'
      ]
    },
    {
      id: 'learning-tutorials',
      keywords: ['learn', 'tutorial', 'video', 'training', 'start learning', 'tangira wige', 'how to use', 'guide', 'it admin', 'pc', 'printer', 'ireambo tutorial', 'rra tutorial'],
      title: 'Start Learning — Free Video Tutorials',
      category: 'Learning',
      description: 'Free video tutorials for IT Admins covering government platforms (RRA, Irembo, RDB, RURA, RIB, BK, Equity Bank, MIFOTRA) and IT skills (PC, Printer, Network, Office, Cybersecurity).',
      platform: 'RRA Learning Hub',
      url: 'learning.html',
      steps: [
        'Go to learning.html or click "Start Learning" in the navigation',
        'Choose a learning track: Platform Tutorials or IT Skills',
        'Browse available video lessons by platform (RRA, Irembo, RDB, RURA, RIB, BK, Equity, MIFOTRA)',
        'Click on a video card to start the lesson',
        'Follow the step-by-step video guidance',
        'Practice on the actual platform after watching',
        'Request custom tutorials if you need specific topics'
      ]
    },
    {
      id: 'faq-general',
      keywords: ['faq', 'help', 'question', 'frequently asked', 'common questions', 'support'],
      title: 'FAQ & Help Center',
      category: 'Support',
      description: 'Find answers to common questions about taxes, declarations, payments, EBM, customs, and more.',
      platform: 'RRA Website',
      url: 'faq.html',
      steps: [
        'Visit faq.html or click "FAQ" in the navigation',
        'Use the search bar to find specific questions',
        'Browse by category (TIN, Declarations, Payments, EBM, Customs, VAT, Income Tax)',
        'Click on questions to expand answers',
        'Contact support via phone, email, or WhatsApp if you need more help'
      ]
    }
  ],

  quickReplies: [
    { text: 'How to get TIN?', query: 'tin registration' },
    { text: 'File tax return', query: 'income tax declaration' },
    { text: 'Register business', query: 'business registration' },
    { text: 'Pay taxes', query: 'tax payment' },
    { text: 'Customs declaration', query: 'customs declaration' },
    { text: 'FAQ & Help', query: 'faq' },
    { text: 'EBM invoice', query: 'ebm invoice' }
  ],

  greetings: [
    'Hello! I\'m your RRA AI Assistant. I can help you with RRA, RDB, RURA, and RSSB services. What would you like to do today?',
    'Muraho! Ndi umufasha wa AI wa RRA. Nashobora kukugira inama ku bijyanye na serivisi za RRA, RDB, RURA, na RSSB. Ni iki ushaka gukora?'
  ],

  fallback: [
    'I\'m not sure I understand. Could you rephrase your question? I can help with:\n• Tax registration and filing (RRA)\n• Business registration (RDB)\n• Social security (RSSB)\n• Telecom/transport licensing (RURA)\n• Customs and import/export (RRA)',
    'Sinize neza icyo ushaka kuvuga. Washobora kubivuga ukundi? Nashobora kukugira inama ku:\n• Iyandikisha ry\'imisoro no gutanga amasoro (RRA)\n• Iyandikisha ry\'ubucuruzi (RDB)\n• Ubwishingizi bw\'abakozi (RSSB)\n• Uruhushya rw\'itumanaho/gutwara abantu (RURA)\n• Ibijyanye na douane no kwinjiza/kohereza ibicuruzwa (RRA)'
  ]
};
