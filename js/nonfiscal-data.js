var nfServices = {
  embassy: [
    { icon: 'passport', name: 'Passport Renewal', desc: 'Renew your Rwandan passport from abroad', price: 'RWF 50,000', time: '5-7 days' },
    { icon: 'file-text', name: 'Emergency Travel Document', desc: 'Temporary travel document for urgent travel needs', price: 'RWF 30,000', time: '1-2 days' },
    { icon: 'stamp', name: 'Visa Application', desc: 'Apply for visa to enter Rwanda', price: 'RWF 25,000', time: '3-5 days' },
    { icon: 'baby', name: 'Birth Registration (Abroad)', desc: 'Register birth of Rwandan child born outside Rwanda', price: 'RWF 5,000', time: '7-10 days' },
    { icon: 'heart', name: 'Marriage Registration', desc: 'Register marriage of Rwandan citizens abroad', price: 'RWF 10,000', time: '5-7 days' },
    { icon: 'file-check', name: 'Certificate of Origin', desc: 'Certificate confirming Rwandan nationality', price: 'RWF 15,000', time: '3-5 days' },
    { icon: 'scale', name: 'Legalization of Documents', desc: 'Authenticate documents for use in Rwanda', price: 'RWF 10,000', time: '2-3 days' },
    { icon: 'graduation-cap', name: 'Educational Credential Verification', desc: 'Verify academic qualifications obtained abroad', price: 'RWF 20,000', time: '5-7 days' },
    { icon: 'briefcase', name: 'Business Registration (Diaspora)', desc: 'Register a business in Rwanda from abroad', price: 'RWF 30,000', time: '7-10 days' },
    { icon: 'vote', name: 'Voter Registration (Abroad)', desc: 'Register to vote at Rwandan embassies', price: 'Free', time: 'Instant' },
    { icon: 'shield', name: 'Consular Protection', desc: 'Emergency assistance for Rwandans abroad', price: 'Free', time: 'As needed' },
    { icon: 'file-signature', name: 'Power of Attorney', desc: 'Draft and certify power of attorney documents', price: 'RWF 15,000', time: '3-5 days' }
  ],
  citizen: [
    { icon: 'id-card', name: 'National ID Card', desc: 'Apply for or renew your national identity card', price: 'RWF 5,000', time: '5-7 days' },
    { icon: 'car', name: 'Driving Permit', desc: 'Apply for new or renew driving license', price: 'RWF 10,000', time: '3-5 days' },
    { icon: 'baby', name: 'Birth Certificate', desc: 'Register and obtain birth certificate', price: 'RWF 1,000', time: '3-5 days' },
    { icon: 'file-text', name: 'Police Clearance Certificate', desc: 'Criminal record check for employment or travel', price: 'RWF 5,000', time: '3-5 days' },
    { icon: 'home', name: 'Land Title Registration', desc: 'Register or transfer land ownership', price: 'RWF 20,000', time: '14-21 days' },
    { icon: 'building', name: 'Business Registration', desc: 'Register a new business with RDB', price: 'RWF 0', time: '1 day' },
    { icon: 'file-check', name: 'Marriage Certificate', desc: 'Official marriage registration and certificate', price: 'RWF 5,000', time: '5-7 days' },
    { icon: 'cross', name: 'Death Certificate', desc: 'Register death and obtain certificate', price: 'RWF 1,000', time: '1-2 days' },
    { icon: 'globe', name: 'Immigration Status Change', desc: 'Change visa or permit status', price: 'RWF 50,000', time: '7-14 days' },
    { icon: 'hammer', name: 'Building Permit', desc: 'Apply for construction authorization', price: 'RWF 25,000', time: '14-21 days' },
    { icon: 'stethoscope', name: 'Health Facility License', desc: 'License for operating health facilities', price: 'RWF 50,000', time: '14-21 days' },
    { icon: 'utensils', name: 'Food Handling Permit', desc: 'Permit for food service businesses', price: 'RWF 10,000', time: '5-7 days' },
    { icon: 'truck', name: 'Vehicle Registration', desc: 'Register a new or imported vehicle', price: 'RWF 15,000', time: '3-5 days' },
    { icon: 'file-search', name: 'Background Check', desc: 'Comprehensive background verification', price: 'RWF 10,000', time: '5-7 days' },
    { icon: 'users', name: 'NGO Registration', desc: 'Register a non-governmental organization', price: 'RWF 0', time: '7-14 days' },
    { icon: 'school', name: 'School Registration', desc: 'Register educational institution', price: 'RWF 50,000', time: '21-30 days' },
    { icon: 'radio', name: 'Broadcasting License', desc: 'License for radio/TV operations', price: 'RWF 100,000', time: '30 days' },
    { icon: 'shield-check', name: 'Fire Safety Certificate', desc: 'Fire safety inspection and certification', price: 'RWF 15,000', time: '7-14 days' }
  ],
  institutional: [
    { icon: 'scale', name: 'Court Filing Fees', desc: 'Pay fees for court case filings', price: 'Varies', time: 'Instant' },
    { icon: 'landmark', name: 'Parliament Petition Fee', desc: 'Fee for submitting petitions to Parliament', price: 'RWF 5,000', time: 'Instant' },
    { icon: 'building-2', name: 'RDB Annual Return Filing', desc: 'File annual returns for registered businesses', price: 'RWF 5,000', time: 'Instant' },
    { icon: 'clipboard-check', name: 'RICA Licensing Fee', desc: 'Pay licensing fees regulated by RICA', price: 'Varies', time: 'Instant' },
    { icon: 'hard-hat', name: 'OSHA Inspection Fee', desc: 'Occupational safety inspection fees', price: 'RWF 25,000', time: 'Instant' },
    { icon: 'leaf', name: 'REMA Environmental Levy', desc: 'Environmental compliance and levy payments', price: 'Varies', time: 'Instant' },
    { icon: 'droplets', name: 'WASAC Water Connection', desc: 'Apply and pay for water connection fees', price: 'Varies', time: '3-5 days' },
    { icon: 'zap', name: 'REG Electricity Connection', desc: 'Apply and pay for electricity connection', price: 'Varies', time: '3-5 days' },
    { icon: 'antenna', name: 'RURA Frequency License', desc: 'Pay for radio frequency licensing', price: 'Varies', time: '7-14 days' },
    { icon: 'bus', name: 'RTDA Transport License', desc: 'Public transport operating license', price: 'RWF 50,000', time: '7-14 days' },
    { icon: 'wine', name: 'Excise Stamp Purchase', desc: 'Purchase excise duty stamps for products', price: 'Varies', time: '3-5 days' },
    { icon: 'home', name: 'RHA Housing Levy', desc: 'Rwanda Housing Authority levy payments', price: 'Varies', time: 'Instant' },
    { icon: 'book', name: 'NESA Examination Fee', desc: 'National examination registration fees', price: 'Varies', time: 'Instant' },
    { icon: 'heart-pulse', name: 'RMB Health Insurance Levy', desc: 'Community-based health insurance contributions', price: 'Varies', time: 'Instant' },
    { icon: 'tree-pine', name: 'Forestry Concession Fee', desc: 'Fees for forestry concession allocation', price: 'Varies', time: '14-21 days' }
  ]
};

var nfFaqs = [
  {
    question: { en: 'What is Non-Fiscal Revenue?', rw: 'Ni iki cy\'amatungo y\'ibinatari imisoro?' },
    answer: { en: 'Non-Fiscal Revenue refers to payments collected by RRA on behalf of government institutions for services that are not taxes. These include passport fees, licensing charges, registration fees, and other service charges from government agencies.', rw: 'Amatungo y\'ibinatari imisoro ni ubwishyu RRA ikusanya ku mwanya w\'ibigo bya Leta ku serivisi zitari imisoro. Ibi birimo amafaranga ya pasiporo, amafaranga y\'uruhushya, amafaranga y\'iyandikisha n\'andi mafaranga ya serivisi kuva mu bigo bya Leta.' }
  },
  {
    question: { en: 'What payment methods are accepted?', rw: 'Ni ubuhe buryo bw\'ubwishyu bwemewe?' },
    answer: { en: 'The portal accepts mobile money (MTN MoMo, Airtel Money), bank transfers from all commercial banks in Rwanda, Visa/Mastercard debit and credit cards, and cash payments at designated RRA offices and partner banks.', rw: 'Portal yakira mobile money (MTN MoMo, Airtel Money), ubwishyu bwa banki kuva mu mabanki yose y\'ubucuruzi mu Rwanda, amakarita ya Visa/Mastercard, n\'ubwishyu bw\'amafaranga mu biro bya RRA byagenwe n\'amabanki afatanyije.' }
  },
  {
    question: { en: 'How long does it take to process a service request?', rw: 'Bifata igihe kingana iki gukora request ya serivisi?' },
    answer: { en: 'Processing times vary by service. Simple payments and registrations are processed instantly. Document-based services like passport renewal take 5-7 working days. Complex services like land registration may take 14-21 working days. Each service page shows the expected processing time.', rw: 'Igihe cyo gutunganya gihinduka bitewe na serivisi. Ubwishyu bworoshye n\'iyandikisha bikorwa ako kanya. Serivisi z\'inyandiko nka pasiporo zifata iminsi 5-7 y\'akazi. Serivisi zigoranye nk\'iyandikisha ry\'ubutaka bishobora gufata iminsi 14-21 y\'akazi.' }
  },
  {
    question: { en: 'Can I get a refund if my application is rejected?', rw: 'Nshobora kubona amafaranga yanjye nisubirwa iyo application yanjye yanze?' },
    answer: { en: 'Refund policies depend on the specific service and the reason for rejection. In most cases, if the rejection is due to an error by the processing agency, a full refund will be issued. If the rejection is due to incomplete or incorrect information provided by the applicant, fees may not be refundable. Contact support for specific cases.', rw: 'Amategeko y\'gusubiza amafaranga atandukana bitewe na serivisi n\'impamvu yo kwangwa. Mu bihe byinshi, iyo kwangwa ari ikosa ry\'ikigo gitunganya, amafaranga yose azasubizwa. Iyo kwangwa ari amakuru adahagije cyangwa atari yo yatanzwe n\'uwabisabye, amafaranga ashobora kutagaruzwa.' }
  },
  {
    question: { en: 'Do I need an account to use the portal?', rw: 'Nkeneye konti kugira ngo nkoresha portal?' },
    answer: { en: 'You can browse services and view information without an account. However, to submit applications and make payments, you will need to create an account with your TIN or national ID. This allows you to track your applications, view payment history, and download receipts.', rw: 'Ushobora kureba serivisi n\'amakuru utagira konti. Ariko, kugira ngo utange applications n\'ubwishyu, uzakeneye gufungura konti na TIN cyangwa indangamuntu. Ibi bikwemerera gukurikirana applications zawe, kureba amateka y\'ubwishyu no gukuramo inyemezabuguzi.' }
  },
  {
    question: { en: 'Is my payment information secure?', rw: 'Ese amakuru y\'ubwishyu bwanjye arinzwe?' },
    answer: { en: 'Yes. All transactions are encrypted using SSL/TLS technology. Payment data is processed through certified payment gateways that comply with PCI-DSS standards. RRA does not store your card details. Mobile money and bank transactions are processed through secure channels with the respective providers.', rw: 'Yego. Ibikorwa byose bikoresha ikoranabuhanga rya SSL/TLS. Amakuru y\'ubwishyu atunganywa mu buryo bwemewe bw\'ubwishyu bukurikiza amabwiriza ya PCI-DSS. RRA ntibika amakuru y\'amakarita yawe.' }
  }
];

var nfSearchIndex = [
  { title: 'Passport Renewal', titleRw: 'Kuvugurura Pasiporo', desc: 'Renew Rwandan passport', descRw: 'Vugurura pasiporo y\'u Rwanda', href: 'non-fiscal.html#categories', icon: 'passport' },
  { title: 'National ID', titleRw: 'Indangamuntu', desc: 'Apply for national identity card', descRw: 'Saba ikarita y\'indangamuntu', href: 'non-fiscal.html#categories', icon: 'id-card' },
  { title: 'Driving Permit', titleRw: 'Ururuhushya rwo gutwara', desc: 'Apply for driving license', descRw: 'Saba ururuhushya rwo gutwara', href: 'non-fiscal.html#categories', icon: 'car' },
  { title: 'Birth Certificate', titleRw: 'Icyemezo cy\'ivuko', desc: 'Register birth and get certificate', descRw: 'Andika ivuko ubone icyemezo', href: 'non-fiscal.html#categories', icon: 'baby' },
  { title: 'Business Registration', titleRw: 'Iyandikisha ry\'ubucuruzi', desc: 'Register a new business', descRw: 'Andika ubucuruzi bushya', href: 'non-fiscal.html#categories', icon: 'building' },
  { title: 'Visa Application', titleRw: 'Gusaba Visa', desc: 'Apply for Rwanda visa', descRw: 'Saba visa y\'u Rwanda', href: 'non-fiscal.html#categories', icon: 'stamp' },
  { title: 'Land Title', titleRw: 'Umutungo w\'ubutaka', desc: 'Register or transfer land', descRw: 'Andika cyangwa wohereze ubutaka', href: 'non-fiscal.html#categories', icon: 'home' },
  { title: 'Police Clearance', titleRw: 'Icyemezo cya Police', desc: 'Criminal record check', descRw: 'Kugenzura ibyaha', href: 'non-fiscal.html#categories', icon: 'file-check' }
];
