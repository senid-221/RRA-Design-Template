const services = [
  {
    id: "domestic-tax",
    icon: "landmark",
    category: "tax",
    title: { en: "Domestic Tax Services", rw: "Serivisi z'Imisoro yo mu Gihugu" },
    desc: { en: "Income Tax, VAT, PAYE, WHT, Excise Duty and other domestic tax obligations.", rw: "Umusoro ku nyungu, TVA, PAYE, WHT, Excise Duty n'izindi misoro." },
    links: [
      { en: "Income Tax", rw: "Umusoro ku nyungu", href: "domestic-tax-services.html#income-tax" },
      { en: "VAT", rw: "TVA", href: "domestic-tax-services.html#vat" },
      { en: "PAYE", rw: "PAYE", href: "domestic-tax-services.html#paye" },
      { en: "Excise Duty", rw: "Excise Duty", href: "domestic-tax-services.html#excise" },
    ]
  },
  {
    id: "customs",
    icon: "ship",
    category: "customs",
    title: { en: "Customs Services", rw: "Serivisi za Gasutamo" },
    desc: { en: "Import/export declarations, cargo management, transit and clearing agents.", rw: "Gutanga ibicuruzwa byinjira/bisohoka, gucunga imizigo, transit n'abacuruzi." },
    links: [
      { en: "Customs Services", rw: "Serivisi za Gasutamo", href: "customs-services.html" },
      { en: "Trade Portal", rw: "Urubuga rw'Ubucuruzi", href: "trade-portal.html" },
      { en: "Import/Export", rw: "Kwinjiza/Gusohora", href: "customs-services.html#import" },
      { en: "Transit", rw: "Transit", href: "customs-services.html#transit" },
    ]
  },
  {
    id: "trade",
    icon: "globe",
    category: "trade",
    title: { en: "Trade Information Portal", rw: "Urubuga rw'Amakuru y'Ubucuruzi" },
    desc: { en: "HS codes, import duties calculator, trade procedures, laws and safety alerts.", rw: "HS codes, ikigereranyo cy'amahoro, imikorere y'ubucuruzi, amategeko n'amakuru y'umutekano." },
    links: [
      { en: "Product Search", rw: "Gushaka ibicuruzwa", href: "trade-portal.html#product-search" },
      { en: "Duties Calculator", rw: "Ikigereranyo cy'amahoro", href: "trade-portal.html#calculator" },
      { en: "Trade Laws", rw: "Amategeko y'ubucuruzi", href: "trade-portal.html#laws" },
      { en: "Safety Alerts", rw: "Amakuru y'umutekano", href: "trade-portal.html#safety" },
    ]
  },
  {
    id: "ebm",
    icon: "receipt",
    category: "ebm",
    title: { en: "EBM Services", rw: "Serivisi za EBM" },
    desc: { en: "Electronic Billing Machine setup, guides, transaction access and Purchase Code.", rw: "Gushyiraho EBM, ibyerekezo, kwinjira mu transactions na Purchase Code." },
    links: [
      { en: "EBM Setup Guide", rw: "Ibyerekezo bya EBM", href: "ebm-services.html" },
      { en: "User Guides", rw: "Imbokeramikorere", href: "ebm-services.html#guides" },
      { en: "VSDC Integration", rw: "Guhuza VSDC", href: "ebm-services.html#faq" },
      { en: "Official RRA EBM Page", rw: "Urupuro ndanga rubanza ku munsi", href: "https://www.rra.gov.rw/en/ebm-electronic-billing-machine" },
    ]
  },
  {
    id: "non-fiscal",
    icon: "building-2",
    category: "non-fiscal",
    title: { en: "Non-Fiscal Revenue", rw: "Imisoro Itari iy'Amafaranga" },
    desc: { en: "Embassy services, public services and government institution payments.", rw: "Serivisi z'ambasade, serivisi za Leta n'amafaranga y'ibigo bya Leta." },
    links: [
      { en: "Service Categories", rw: "Ibyiciro bya serivisi", href: "non-fiscal.html#categories" },
      { en: "How It Works", rw: "Uko bikorwa", href: "non-fiscal.html#how-it-works" },
      { en: "Payment Portal", rw: "Urubuga rwo kwishyura", href: "https://nonfiscal.rra.gov.rw/" },
    ]
  },
  {
    id: "publications",
    icon: "book-open",
    category: "tax",
    title: { en: "Publications & Tax Guides", rw: "Ibyashyizwe ahagaragara n'Ibyerekezo" },
    desc: { en: "Tax handbooks, brochures, annual reports, official notices and guidance documents.", rw: "Ibitabo by'imisoro, brochures, raporo z'umwaka, amatangazo n'inyandiko z'ibyerekezo." },
    links: [
      { en: "Document Library", rw: "Isomero ry'inyandiko", href: "publications.html#library" },
      { en: "Annual Reports", rw: "Raporo z'umwaka", href: "publications.html#annual-reports" },
      { en: "Tax Laws", rw: "Amategeko y'imisoro", href: "publications.html#laws" },
      { en: "Tax Forms", rw: "Ifishi z'imisoro", href: "publications.html#forms" },
    ]
  }
];

const deadlines = [
  {
    day: "20",
    month: "OCT",
    title: { en: "VAT Return Filing", rw: "Gutanga TVA" },
    desc: { en: "Monthly VAT return for September 2026", rw: "TVA ya buri kwezi ya Nzeri 2026" },
    badge: "urgent",
    badgeText: { en: "Urgent", rw: "Byihutirwa" }
  },
  {
    day: "30",
    month: "OCT",
    title: { en: "PAYE Declaration", rw: "Declaration ya PAYE" },
    desc: { en: "Monthly PAYE submission deadline", rw: "Iminsi ntarengwa yo gutanga PAYE" },
    badge: "upcoming",
    badgeText: { en: "Upcoming", rw: "Irabura" }
  },
  {
    day: "15",
    month: "NOV",
    title: { en: "Corporate Income Tax (Installment)", rw: "Umusoro ku nyungu z'ikigo (Igice)" },
    desc: { en: "Q4 2026 corporate tax installment", rw: "Igice cy'umwaka cya Q4 2026" },
    badge: "normal",
    badgeText: { en: "Normal", rw: "Bisanzwe" }
  },
  {
    day: "30",
    month: "NOV",
    title: { en: "Excise Duty Return", rw: "Declaration ya Excise Duty" },
    desc: { en: "Monthly excise duty filing", rw: "Gutanga excise duty ya buri kwezi" },
    badge: "normal",
    badgeText: { en: "Normal", rw: "Bisanzwe" }
  }
];

const announcements = [
  {
    tag: "important",
    tagText: { en: "Important", rw: "By'ingenzi" },
    title: { en: "New EBM v2.0 registration requirements effective November 2026", rw: "Amabwiriza mashya ya EBM v2.0 atangira muri Ugushyingo 2026" },
    desc: { en: "All businesses must migrate to EBM v2.0 by November 30, 2026. Check the new requirements and setup guide.", rw: "Amasosiyete yose agomba kwimukira muri EBM v2.0 mbere ya 30 Ugushyingo 2026." },
    date: "2026-10-14"
  },
  {
    tag: "new",
    tagText: { en: "New", rw: "Gishya" },
    title: { en: "MyRRA portal maintenance scheduled for October 25", rw: "Gukora MyRRA biteganyijwe ku ya 25 Ukwakira" },
    desc: { en: "The MyRRA portal will be unavailable from 10 PM to 6 AM for scheduled maintenance.", rw: "Urubuga rwa MyRRA ntiruzakora kuva 10 PM kugeza 6 AM." },
    date: "2026-10-12"
  },
  {
    tag: "",
    tagText: { en: "General", rw: "Rusange" },
    title: { en: "Tax Amnesty Program extended to December 2026", rw: "Gahunda y'imbabazi z'umusozi yaguye kugeza Ukuboza 2026" },
    desc: { en: "The tax amnesty program for outstanding liabilities has been extended. Apply through MyRRA.", rw: "Gahunda y'imbabazi z'umusozi yaguye. Saba biciye kuri MyRRA." },
    date: "2026-10-10"
  }
];

const news = [
  {
    title: { en: "RRA collects RWF 2.1 trillion in Q1 2026/27", rw: "RRA yakusanyije Miliyari 2.1 z'Amafaranga mu Q1 2026/27" },
    desc: { en: "Revenue collection exceeds targets by 4% in the first quarter.", rw: "Imisoro yakusanyijwe irenga intego ku 4% mu gice cya mbere." },
    date: "2026-10-13"
  },
  {
    title: { en: "Digital stamp now available for all customs declarations", rw: "Digital stamp ubu iboneka kuri declarations zose za gasutamo" },
    desc: { en: "Physical stamps are no longer required for customs processing.", rw: "Stamps z'umubiri ntizigikenewe mu gutunganya gasutamo." },
    date: "2026-10-11"
  },
  {
    title: { en: "Free EBM training workshops in all provinces", rw: "Amahugurwa ya EBM ubuntu mu ntara zose" },
    desc: { en: "Register for free EBM training sessions happening across the country.", rw: "Iyandikishe ku mahugurwa ya EBM aba mu gihugu hose." },
    date: "2026-10-08"
  }
];

const searchIndex = [
  { title: "Income Tax", desc: "Personal and corporate income tax services", icon: "landmark", href: "domestic-tax-services.html#income-tax", category: "tax" },
  { title: "VAT Return", desc: "File your monthly VAT return", icon: "file-text", href: "domestic-tax-services.html#vat", category: "tax" },
  { title: "PAYE", desc: "Pay As You Earn — employer obligations", icon: "users", href: "domestic-tax-services.html#paye", category: "tax" },
  { title: "Excise Duty", desc: "Excise duty on manufactured goods", icon: "factory", href: "domestic-tax-services.html#excise", category: "tax" },
  { title: "Withholding Tax", desc: "WHT rates and filing requirements", icon: "percent", href: "domestic-tax-services.html#wht", category: "tax" },
  { title: "Local Government Taxes", desc: "Trading license, property and rental income tax", icon: "home", href: "domestic-tax-services.html#local-tax", category: "tax" },
  { title: "Motor Vehicle Tax", desc: "Vehicle registration and road levy", icon: "car", href: "domestic-tax-services.html#motor-vehicle", category: "tax" },
  { title: "Tax Clearance Certificate", desc: "TCC and Quitus Fiscal applications", icon: "badge-check", href: "domestic-tax-services.html#tcc", category: "tax" },
  { title: "RSSB Contributions", desc: "Social security contributions declared via RRA", icon: "shield-check", href: "domestic-tax-services.html#rssb", category: "tax" },
  { title: "Investors Starter Pack", desc: "Tax onboarding package for new investors", icon: "rocket", href: "domestic-tax-services.html#investors-starter-pack", category: "tax" },
  { title: "Registration & De-registration", desc: "Register or update your taxpayer profile", icon: "user-plus", href: "domestic-tax-services.html#registration", category: "tax" },
  { title: "Customs Services", desc: "Import/export declarations and cargo", icon: "ship", href: "customs-services.html#import", category: "customs" },
  { title: "e-Single Window", desc: "Rwanda Electronic Single Window for trade", icon: "monitor", href: "https://sw.gov.rw/", category: "customs" },
  { title: "Trade Portal", desc: "HS codes, procedures, trade laws", icon: "globe", href: "trade-portal.html", category: "trade" },
  { title: "Import Duties Calculator", desc: "Calculate import duties and taxes", icon: "calculator", href: "calculator.html", category: "trade" },
  { title: "Digital Stamp Management", desc: "Digital excise stamps for products", icon: "stamp", href: "customs-services.html#digital-stamp", category: "customs" },
  { title: "Border Posts", desc: "RRA border posts and contact points", icon: "map-pin", href: "customs-services.html#border-posts", category: "customs" },
  { title: "Cargo Management", desc: "Cargo and warehouse management", icon: "package", href: "customs-services.html#cargo-management", category: "customs" },
  { title: "Customs Clearing Agents", desc: "Licensed clearing agents information", icon: "user-check", href: "customs-services.html#clearing-agents", category: "customs" },
  { title: "EBM Services", desc: "Electronic Billing Machine setup and guides", icon: "receipt", href: "ebm-services.html", category: "ebm" },
  { title: "EBM Purchase Code", desc: "Verify purchase codes for transactions", icon: "qr-code", href: "ebm-services.html#purchase-code", category: "ebm" },
  { title: "Non-Fiscal Revenue", desc: "Embassy and public service payments", icon: "building-2", href: "https://nonfiscal.rra.gov.rw/", category: "non-fiscal" },
  { title: "TIN Registration", desc: "Register for a Tax Identification Number", icon: "id-card", href: "https://etax.rra.gov.rw/nidAssignedTIN/", category: "tax" },
  { title: "MyRRA Login", desc: "Access your taxpayer account", icon: "user-circle", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Publications", desc: "Tax handbooks, reports and brochures", icon: "book-open", href: "publications.html", category: "tax" },
  { title: "Tax Laws", desc: "Official tax legislation and regulations", icon: "scale", href: "publications.html#laws", category: "tax" },
  { title: "Forms", desc: "Download tax and customs forms", icon: "file-down", href: "publications.html#forms", category: "tax" },
  { title: "Business Registration", desc: "Register your business via RDB", icon: "building", href: "rdb-services.html", category: "tax" },
  { title: "Contact RRA", desc: "Get in touch with RRA support", icon: "phone", href: "contact.html", category: "tax" },
];
