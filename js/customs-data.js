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
  },
  {
    id: "digital-stamp",
    icon: "stamp",
    title: "Digital Stamp Management",
    shortDesc: "Electronic stamping of excise goods",
    description: "The Digital Stamp Management System replaces physical stamps with electronic stamps on excisable goods such as tobacco, alcoholic beverages and sugar. It allows RRA and consumers to verify the authenticity of products and confirm excise duty payment.",
    requirements: [
      "Valid excise duty license",
      "Registered TIN with RRA",
      "Manufacturer or importer registration",
      "Access to the digital stamp portal",
      "Product declarations with excise rates"
    ],
    steps: [
      { title: "Register for digital stamps", desc: "Register your business for the Digital Stamp Management System through RRA." },
      { title: "Order stamps", desc: "Request electronic stamps for your excisable products through the portal." },
      { title: "Pay stamp fees", desc: "Pay the applicable stamp fees for the ordered quantities." },
      { title: "Apply stamps", desc: "Affix or activate digital stamps on products before distribution." },
      { title: "Verify compliance", desc: "Consumers and inspectors can verify stamps to confirm duty payment." }
    ],
    forms: [
      { name: "Digital Stamp Order Form", size: "PDF, 150 KB" },
      { name: "Excise License Application", size: "PDF, 170 KB" }
    ],
    rates: [
      { bracket: "Stamp fee", rate: "Varies by product type" },
      { bracket: "Portal registration", rate: "Free" }
    ],
    deadlines: [
      { date: "Before distribution", text: "All excisable goods must carry valid stamps" },
      { date: "Monthly", text: "Reconcile stamp usage with excise declarations" }
    ],
    cta: { title: "Digital Stamp Management", desc: "Order and manage electronic stamps for excisable goods.", btn: "Official RRA Page" }
  },
  {
    id: "border-posts",
    icon: "map-pin",
    title: "Border Posts",
    shortDesc: "Customs entry points across Rwanda",
    description: "RRA operates customs border posts at all major entry and exit points of Rwanda. Each border post handles import, export and transit declarations, traveler clearance, and vehicle checks. Working hours and available services vary by post.",
    requirements: [
      "Valid travel documents (travelers)",
      "Customs declaration (goods)",
      "Supporting trade documents",
      "Vehicle registration documents (vehicles)",
      "Compliance with restricted/prohibited goods rules"
    ],
    steps: [
      { title: "Arrive at border post", desc: "Present yourself or your goods at the designated border post." },
      { title: "Submit declaration", desc: "Submit your customs declaration and supporting documents." },
      { title: "Assessment and payment", desc: "Pay any applicable duties and taxes at the post." },
      { title: "Inspection", desc: "Goods may be physically examined based on risk assessment." },
      { title: "Release", desc: "Receive release confirmation and cross the border." }
    ],
    forms: [
      { name: "Traveler Declaration Form", size: "PDF, 120 KB" },
      { name: "Goods Declaration Form", size: "PDF, 140 KB" }
    ],
    rates: [
      { bracket: "Traveler clearance", rate: "Free" },
      { bracket: "Import duties", rate: "Per EAC Common External Tariff" }
    ],
    deadlines: [
      { date: "On arrival", text: "Declare all goods and currency above thresholds" },
      { date: "24/7", text: "Major posts operate around the clock" }
    ],
    cta: { title: "Border Posts", desc: "Find border post locations, hours and services.", btn: "Official RRA Page" }
  },
  {
    id: "postal-services",
    icon: "mail",
    title: "Postal Services",
    shortDesc: "Customs clearance of postal items",
    description: "International postal items and courier parcels arriving in Rwanda are customs-cleared at designated postal handling centers. RRA assesses duties on taxable items while allowing duty-free entry for qualifying personal effects and documents.",
    requirements: [
      "Accurate customs declaration (CN22/CN23)",
      "Proof of value (invoice or receipt)",
      "Recipient identification details",
      "Payment of applicable duties",
      "Compliance with prohibited items list"
    ],
    steps: [
      { title: "Item arrives", desc: "Postal or courier items arrive at the designated customs handling center." },
      { title: "Declaration check", desc: "Customs reviews the attached declaration and value documents." },
      { title: "Assessment", desc: "Duties and taxes are assessed on taxable items." },
      { title: "Notification", desc: "Recipient is notified of any duties due or documents required." },
      { title: "Collection", desc: "Pay duties (if any) and collect your item." }
    ],
    forms: [
      { name: "CN23 Customs Declaration", size: "PDF, 110 KB" },
      { name: "Parcel Clearance Request", size: "PDF, 130 KB" }
    ],
    rates: [
      { bracket: "Documents", rate: "Duty-free" },
      { bracket: "Gifts (low value)", rate: "Duty-free within limits" },
      { bracket: "Commercial items", rate: "Standard import duties apply" }
    ],
    deadlines: [
      { date: "On notification", text: "Collect items within the storage period" },
      { date: "30 days", text: "Typical maximum storage before return" }
    ],
    cta: { title: "Postal Services", desc: "Learn how postal items are cleared through customs.", btn: "Official RRA Page" }
  },
  {
    id: "cargo-management",
    icon: "package",
    title: "Cargo Management",
    shortDesc: "Handling and warehousing of cargo",
    description: "Cargo Management covers the handling, storage and movement of imported and transit goods within customs areas, including bonded warehouses, container depots and cargo handling facilities under RRA supervision.",
    requirements: [
      "Approved customs declaration",
      "Cargo handling facility registration",
      "Bonded warehouse license (where applicable)",
      "Goods tracking documentation",
      "Insurance for stored goods"
    ],
    steps: [
      { title: "Cargo arrival", desc: "Goods arrive at the port, airport or inland container depot." },
      { title: "Documentation", desc: "Submit arrival documentation and customs declaration." },
      { title: "Storage or transit", desc: "Goods are placed in a warehouse, depot or under transit regime." },
      { title: "Clearance", desc: "Complete clearance formalities and pay applicable duties." },
      { title: "Release and exit", desc: "Collect goods or move them out of the customs area." }
    ],
    forms: [
      { name: "Bonded Warehouse Application", size: "PDF, 180 KB" },
      { name: "Cargo Handling Permit", size: "PDF, 150 KB" }
    ],
    rates: [
      { bracket: "Warehousing fee", rate: "Per tariff schedule" },
      { bracket: "Demurrage", rate: "Applies after free period" }
    ],
    deadlines: [
      { date: "Free period", text: "Limited free storage days after arrival" },
      { date: "On expiry", text: "Demurrage charges apply until clearance" }
    ],
    cta: { title: "Cargo Management", desc: "Understand cargo handling and warehousing under customs.", btn: "Official RRA Page" }
  },
  {
    id: "clearing-agents",
    icon: "user-check",
    title: "Customs Clearing Agents",
    shortDesc: "Licensing of customs agents",
    description: "Customs Clearing Agents are licensed professionals who clear goods on behalf of importers and exporters. RRA licenses agents, maintains a register of authorized agents, and sets the professional standards they must follow.",
    requirements: [
      "Relevant professional qualification",
      "Company registration with RDB",
      "Valid TIN and tax compliance",
      "Application for clearing agent license",
      "Renewal of license as required"
    ],
    steps: [
      { title: "Meet requirements", desc: "Obtain the required qualification and register your company." },
      { title: "Apply for license", desc: "Submit your clearing agent license application to RRA." },
      { title: "Assessment", desc: "RRA reviews your application and qualifications." },
      { title: "Receive license", desc: "Licensed agents are added to the official register of agents." },
      { title: "Operate and renew", desc: "Clear consignments on behalf of clients and renew the license as required." }
    ],
    forms: [
      { name: "Clearing Agent License Application", size: "PDF, 160 KB" },
      { name: "Agent License Renewal Form", size: "PDF, 130 KB" }
    ],
    rates: [
      { bracket: "License application fee", rate: "Per official tariff" },
      { bracket: "License renewal", rate: "Periodic" }
    ],
    deadlines: [
      { date: "Before operating", text: "License required before clearing any consignment" },
      { date: "Annually", text: "Verify license validity for renewals" }
    ],
    cta: { title: "Customs Clearing Agents", desc: "Licensing and register of authorized clearing agents.", btn: "Official RRA Page" }
  },
  {
    id: "eac-customs-union",
    icon: "globe",
    title: "EAC Customs Union",
    shortDesc: "East African Community customs framework",
    description: "Rwanda is a member of the East African Community (EAC) Customs Union, which applies a Common External Tariff on goods imported from outside the region and duty-free movement for goods originating within EAC Partner States.",
    requirements: [
      "Certificate of Origin (intra-EAC trade)",
      "Compliance with EAC rules of origin",
      "Harmonized HS classification",
      "EAC Common External Tariff assessment (external imports)",
      "Compliance with EAC standards and procedures"
    ],
    steps: [
      { title: "Classify goods", desc: "Determine the HS code and origin of your goods." },
      { title: "Check tariff", desc: "Apply the EAC Common External Tariff for external imports or duty-free treatment for EAC-origin goods." },
      { title: "Obtain Certificate of Origin", desc: "For intra-EAC trade, obtain a Certificate of Origin from the exporting state." },
      { title: "Declare", desc: "Submit your declaration through the e-Single Window." },
      { title: "Clear and move", desc: "Clear goods and benefit from simplified EAC cross-border movement." }
    ],
    forms: [
      { name: "EAC Certificate of Origin", size: "PDF, 120 KB" },
      { name: "EAC Customs Declaration (Single Administrative Document)", size: "PDF, 200 KB" }
    ],
    rates: [
      { bracket: "Raw materials & capital goods", rate: "0%" },
      { bracket: "Intermediate goods", rate: "10%" },
      { bracket: "Finished goods", rate: "25%" },
      { bracket: "EAC-origin goods", rate: "Duty-free" }
    ],
    deadlines: [
      { date: "At declaration", text: "Origin documents required for preferential rates" },
      { date: "Ongoing", text: "CET rates reviewed by EAC partner states" }
    ],
    cta: { title: "EAC Customs Union", desc: "Learn about the EAC Common External Tariff and rules of origin.", btn: "Official RRA Page" }
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
