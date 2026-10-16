const customsServices = [
  {
    id: "import",
    icon: "arrow-down-to-line",
    title: "Import Services",
    shortDesc: "Import declarations and clearance",
    description: "Complete guide to importing goods into Rwanda, including customs declarations, duty calculations, and clearance procedures.",
    requirements: [
      "Valid TIN and business registration",
      "Commercial invoice and packing list",
      "Bill of lading or airway bill",
      "Certificate of origin",
      "Import license (if applicable)",
      "Product-specific permits (food, chemicals, etc.)"
    ],
    steps: [
      { title: "Prepare documents", desc: "Gather all required import documents including invoice, packing list, and bill of lading." },
      { title: "Submit declaration", desc: "File import declaration through Rwanda e-Single Window (ReSW) portal." },
      { title: "Pay duties and taxes", desc: "Calculate and pay applicable customs duties, VAT, and other taxes." },
      { title: "Customs examination", desc: "Goods may be selected for physical examination at the border or warehouse." },
      { title: "Clearance and release", desc: "Once duties are paid and examination complete, goods are released for delivery." }
    ],
    forms: [
      { name: "Import Declaration Form", size: "PDF, 220 KB" },
      { name: "Bill of Entry", size: "PDF, 180 KB" },
      { name: "Certificate of Origin Template", size: "PDF, 150 KB" }
    ],
    rates: [
      { bracket: "EAC Common External Tariff", rate: "0-35%" },
      { bracket: "VAT on imports", rate: "18%" },
      { bracket: "Import declaration fee", rate: "0.5% of CIF" },
      { bracket: "Railway development levy", rate: "0.5% of CIF" }
    ],
    deadlines: [
      { date: "Before arrival", text: "Submit pre-arrival declaration" },
      { date: "14 days", text: "Complete clearance after arrival" },
      { date: "30 days", text: "Remove goods from port or incur storage fees" }
    ],
    cta: { title: "Start import declaration", desc: "Access Rwanda e-Single Window to file your import declaration.", btn: "Go to ReSW" }
  },
  {
    id: "export",
    icon: "arrow-up-to-line",
    title: "Export Services",
    shortDesc: "Export declarations and procedures",
    description: "Complete guide to exporting goods from Rwanda, including export declarations, certificates of origin, and trade facilitation.",
    requirements: [
      "Valid TIN and business registration",
      "Export contract or purchase order",
      "Commercial invoice and packing list",
      "Certificate of origin (for preferential trade)",
      "Export license (if applicable)",
      "Product-specific certificates (phytosanitary, health, etc.)"
    ],
    steps: [
      { title: "Prepare export documents", desc: "Gather all required export documents including invoice, packing list, and contract." },
      { title: "Submit export declaration", desc: "File export declaration through Rwanda e-Single Window portal." },
      { title: "Obtain certificates", desc: "Get required certificates of origin and product-specific certifications." },
      { title: "Customs examination", desc: "Goods may be examined to verify compliance with export regulations." },
      { title: "Export clearance", desc: "Once approved, goods are cleared for export and shipment." }
    ],
    forms: [
      { name: "Export Declaration Form", size: "PDF, 200 KB" },
      { name: "Certificate of Origin Application", size: "PDF, 160 KB" },
      { name: "Export License Application", size: "PDF, 180 KB" }
    ],
    rates: [
      { bracket: "Export duty (most goods)", rate: "0%" },
      { bracket: "Export declaration fee", rate: "0.3% of FOB" },
      { bracket: "Certificate of origin", rate: "RWF 5,000" }
    ],
    deadlines: [
      { date: "Before shipment", text: "Submit export declaration" },
      { date: "3 days", text: "Obtain certificate of origin" }
    ],
    cta: { title: "Start export declaration", desc: "File your export declaration through the e-Single Window.", btn: "Go to ReSW" }
  },
  {
    id: "transit",
    icon: "truck",
    title: "Transit Services",
    shortDesc: "Goods in transit to other countries",
    description: "Procedures for goods transiting through Rwanda to other destinations, including transit declarations, guarantees, and tracking.",
    requirements: [
      "Transit declaration",
      "Bill of lading or airway bill",
      "Commercial invoice",
      "Transit guarantee or bond",
      "Vehicle registration documents",
      "Driver's license and passport"
    ],
    steps: [
      { title: "Submit transit declaration", desc: "File transit declaration through e-Single Window before goods arrive." },
      { title: "Provide guarantee", desc: "Submit transit guarantee or bond to cover potential duties." },
      { title: "Customs sealing", desc: "Goods are sealed with customs seals for tracking during transit." },
      { title: "Transit monitoring", desc: "Goods are tracked through ECTS (Electronic Cargo Tracking System)." },
      { title: "Exit clearance", desc: "Upon exit, seals are verified and guarantee is released." }
    ],
    forms: [
      { name: "Transit Declaration Form", size: "PDF, 190 KB" },
      { name: "Transit Guarantee Application", size: "PDF, 170 KB" },
      { name: "ECTS Registration Form", size: "PDF, 140 KB" }
    ],
    rates: [
      { bracket: "Transit declaration fee", rate: "0.2% of CIF" },
      { bracket: "ECTS tracking fee", rate: "RWF 50,000 per trip" },
      { bracket: "Guarantee amount", rate: "110% of duties" }
    ],
    deadlines: [
      { date: "Before arrival", text: "Submit transit declaration" },
      { date: "7 days", text: "Maximum transit time through Rwanda" },
      { date: "30 days", text: "Return guarantee documentation" }
    ],
    cta: { title: "Start transit declaration", desc: "File your transit declaration and track cargo electronically.", btn: "Go to ReSW" }
  },
  {
    id: "travelers",
    icon: "user",
    title: "Travelers",
    shortDesc: "Personal effects and duty-free allowances",
    description: "Information for travelers entering or leaving Rwanda, including duty-free allowances, prohibited items, and declaration requirements.",
    requirements: [
      "Valid passport and visa",
      "Travel itinerary",
      "List of valuable items (electronics, jewelry)",
      "Currency declaration (if over $10,000)",
      "Health certificates (if applicable)"
    ],
    steps: [
      { title: "Check allowances", desc: "Review duty-free allowances for alcohol, tobacco, and other goods." },
      { title: "Declare items", desc: "Declare items exceeding allowances or restricted goods at customs." },
      { title: "Pay duties (if applicable)", desc: "Pay duties on items exceeding duty-free limits." },
      { title: "Prohibited items check", desc: "Ensure no prohibited items are in your luggage." },
      { title: "Clear customs", desc: "Proceed through customs after declaration and any duty payment." }
    ],
    forms: [
      { name: "Traveler Declaration Form", size: "PDF, 120 KB" },
      { name: "Currency Declaration Form", size: "PDF, 100 KB" }
    ],
    rates: [
      { bracket: "Alcohol (wine/spirits)", rate: "1 litre duty-free" },
      { bracket: "Cigarettes", rate: "200 sticks duty-free" },
      { bracket: "Personal effects", rate: "Reasonable quantity" },
      { bracket: "Currency declaration", rate: "Over $10,000" }
    ],
    deadlines: [
      { date: "On arrival", text: "Declare goods at customs" },
      { date: "Before departure", text: "Declare currency if over $10,000" }
    ],
    cta: { title: "Check duty-free allowances", desc: "Review what you can bring into Rwanda duty-free.", btn: "View Allowances" }
  },
  {
    id: "esingle-window",
    icon: "monitor",
    title: "Rwanda e-Single Window",
    shortDesc: "Digital platform for trade facilitation",
    description: "The Rwanda Electronic Single Window (ReSW) is a digital platform that enables traders to submit all import, export, and transit documentation through a single portal.",
    requirements: [
      "Registered business with valid TIN",
      "ReSW account registration",
      "Digital signature or e-seal",
      "Compatible browser (Chrome, Firefox, Edge)",
      "Stable internet connection"
    ],
    steps: [
      { title: "Register for ReSW", desc: "Create an account on the Rwanda e-Single Window portal." },
      { title: "Complete profile", desc: "Add your business details, TIN, and authorized users." },
      { title: "Submit declarations", desc: "File import, export, or transit declarations online." },
      { title: "Track status", desc: "Monitor your declaration status and respond to queries." },
      { title: "Make payments", desc: "Pay duties and fees through integrated payment systems." }
    ],
    forms: [
      { name: "ReSW Registration Form", size: "PDF, 150 KB" },
      { name: "User Guide - Importers", size: "PDF, 2.5 MB" },
      { name: "User Guide - Clearing Agents", size: "PDF, 2.8 MB" }
    ],
    rates: [
      { bracket: "Account registration", rate: "Free" },
      { bracket: "Declaration submission", rate: "Included in fees" },
      { bracket: "Technical support", rate: "24/7 available" }
    ],
    deadlines: [
      { date: "24/7", text: "System available for declarations" },
      { date: "Real-time", text: "Status updates and notifications" }
    ],
    cta: { title: "Access Rwanda e-Single Window", desc: "Log in to submit your trade declarations online.", btn: "Go to ReSW" }
  },
  {
    id: "ects",
    icon: "satellite",
    title: "ECTS (Electronic Cargo Tracking)",
    shortDesc: "Track cargo in transit electronically",
    description: "The Electronic Cargo Tracking System (ECTS) monitors goods in transit through Rwanda using GPS-enabled seals to ensure security and compliance.",
    requirements: [
      "Transit declaration approved",
      "ECTS-compatible vehicle",
      "GPS-enabled electronic seal",
      "Registered transport company",
      "Valid insurance for goods"
    ],
    steps: [
      { title: "Register vehicle", desc: "Register your vehicle for ECTS tracking with RRA." },
      { title: "Install electronic seal", desc: "Affix GPS-enabled seal to cargo container or vehicle." },
      { title: "Activate tracking", desc: "Activate tracking through ECTS portal before departure." },
      { title: "Monitor transit", desc: "Track cargo location and status in real-time." },
      { title: "Deactivate at exit", desc: "Deactivate seal and return equipment at exit point." }
    ],
    forms: [
      { name: "ECTS Vehicle Registration", size: "PDF, 160 KB" },
      { name: "Seal Application Form", size: "PDF, 130 KB" }
    ],
    rates: [
      { bracket: "ECTS tracking fee", rate: "RWF 50,000 per trip" },
      { bracket: "Seal deposit", rate: "RWF 100,000 (refundable)" },
      { bracket: "Late return penalty", rate: "RWF 10,000 per day" }
    ],
    deadlines: [
      { date: "Before departure", text: "Activate ECTS tracking" },
      { date: "7 days", text: "Maximum transit time" },
      { date: "24 hours", text: "Report seal tampering" }
    ],
    cta: { title: "Register for ECTS", desc: "Track your cargo electronically through Rwanda.", btn: "Register Vehicle" }
  },
  {
    id: "valuation",
    icon: "calculator",
    title: "Valuation Gateway",
    shortDesc: "Customs valuation reference database",
    description: "The Valuation Gateway provides reference prices for commonly imported goods to assist in customs valuation and ensure fair duty assessment.",
    requirements: [
      "Access to ReSW portal",
      "Product description and HS code",
      "Invoice value declaration",
      "Supporting documentation"
    ],
    steps: [
      { title: "Access Valuation Gateway", desc: "Log in to the Valuation Gateway through ReSW portal." },
      { title: "Search product", desc: "Search by HS code or product description." },
      { title: "Check reference price", desc: "View reference prices for similar goods." },
      { title: "Declare value", desc: "Use reference prices to support your value declaration." },
      { title: "Submit declaration", desc: "Complete customs declaration with valuation information." }
    ],
    forms: [
      { name: "Valuation Declaration Form", size: "PDF, 140 KB" },
      { name: "Value Dispute Application", size: "PDF, 160 KB" }
    ],
    rates: [
      { bracket: "Access to database", rate: "Free" },
      { bracket: "Value verification", rate: "Included in fees" }
    ],
    deadlines: [
      { date: "At declaration", text: "Check reference prices" },
      { date: "5 days", text: "Respond to valuation queries" }
    ],
    cta: { title: "Access Valuation Gateway", desc: "Check reference prices for customs valuation.", btn: "Go to Gateway" }
  }
];

const customsFaqs = [
  {
    question: "How do I register for the Rwanda e-Single Window?",
    answer: "Visit the ReSW portal at sw.gov.rw and click 'Register'. You'll need your TIN, business registration, and a valid email address. Registration is free and typically approved within 24 hours."
  },
  {
    question: "What documents do I need to import goods?",
    answer: "You need a commercial invoice, packing list, bill of lading or airway bill, certificate of origin, and any product-specific permits. All documents must be submitted through the e-Single Window."
  },
  {
    question: "How long does customs clearance take?",
    answer: "Standard clearance takes 24-48 hours for complete declarations. Green channel (low-risk) goods may be cleared immediately. Red channel (high-risk) goods require physical examination which may take additional time."
  },
  {
    question: "What is the duty-free allowance for travelers?",
    answer: "Travelers can bring 1 litre of wine or spirits, 200 cigarettes, and personal effects in reasonable quantities duty-free. Currency over $10,000 must be declared."
  },
  {
    question: "How does ECTS tracking work?",
    answer: "ECTS uses GPS-enabled electronic seals to track cargo in transit. The seal is activated at entry, monitored throughout the journey, and deactivated at exit. Real-time tracking is available through the ECTS portal."
  },
  {
    question: "What happens if my goods are held at customs?",
    answer: "Goods may be held for documentation issues, valuation queries, or physical examination. You'll receive a notification through ReSW. Respond to queries promptly and provide requested documents to release your goods."
  }
];
