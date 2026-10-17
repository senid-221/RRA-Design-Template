const services = [
  {
    id: "domestic-tax",
    icon: "landmark",
    category: "tax",
    title: { en: "Domestic Tax Services", rw: "Serivisi z'Imisoro yo mu Gihugu" },
    desc: { en: "Income Tax, VAT, PAYE, WHT, Excise Duty and other domestic tax obligations.", rw: "Umusoro ku nyungu, TVA, PAYE, WHT, Excise Duty n'izindi misoro." },
    links: [
      { en: "Income Tax", rw: "Umusoro ku nyungu", href: "https://myrra.rra.gov.rw/" },
      { en: "VAT", rw: "TVA", href: "https://myrra.rra.gov.rw/" },
      { en: "PAYE", rw: "PAYE", href: "https://myrra.rra.gov.rw/" },
      { en: "Excise Duty", rw: "Excise Duty", href: "https://myrra.rra.gov.rw/" },
    ]
  },
  {
    id: "customs",
    icon: "ship",
    category: "customs",
    title: { en: "Customs Services", rw: "Serivisi za Gasutamo" },
    desc: { en: "Import/export declarations, cargo management, transit and clearing agents.", rw: "Gutanga ibicuruzwa byinjira/bisohoka, gucunga imizigo, transit n'abacuruzi." },
    links: [
      { en: "Customs Declaration", rw: "Declaration ya Gasutamo", href: "https://sw.gov.rw/" },
      { en: "Trade Portal", rw: "Urubuga rw'Ubucuruzi", href: "https://rwandatrade.rw/" },
      { en: "Import/Export", rw: "Kwinjiza/Gusohora", href: "https://sw.gov.rw/" },
      { en: "Transit", rw: "Transit", href: "https://sw.gov.rw/" },
    ]
  },
  {
    id: "trade",
    icon: "globe",
    category: "trade",
    title: { en: "Trade Information Portal", rw: "Urubuga rw'Amakuru y'Ubucuruzi" },
    desc: { en: "HS codes, import duties calculator, trade procedures, laws and safety alerts.", rw: "HS codes, ikigereranyo cy'amahoro, imikorere y'ubucuruzi, amategeko n'amakuru y'umutekano." },
    links: [
      { en: "Product Search", rw: "Gushaka ibicuruzwa", href: "https://rwandatrade.rw/" },
      { en: "Duties Calculator", rw: "Ikigereranyo cy'amahoro", href: "https://rwandatrade.rw/" },
      { en: "Trade Laws", rw: "Amategeko y'ubucuruzi", href: "https://rwandatrade.rw/" },
      { en: "Safety Alerts", rw: "Amakuru y'umutekano", href: "https://rwandatrade.rw/" },
    ]
  },
  {
    id: "ebm",
    icon: "receipt",
    category: "ebm",
    title: { en: "EBM Services", rw: "Serivisi za EBM" },
    desc: { en: "Electronic Billing Machine setup, guides, transaction access and Purchase Code.", rw: "Gushyiraho EBM, ibyerekezo, kwinjira mu transactions na Purchase Code." },
    links: [
      { en: "EBM Setup", rw: "Gushyiraho EBM", href: "https://myrra.rra.gov.rw/" },
      { en: "Purchase Code", rw: "Purchase Code", href: "https://myrra.rra.gov.rw/" },
      { en: "VSDC Integration", rw: "Guhuza VSDC", href: "https://myrra.rra.gov.rw/" },
      { en: "Official RRA EBM Page", rw: "Urupuro rwa EBM rwa RRA", href: "https://www.rra.gov.rw/en/ebm-electronic-billing-machine" },
    ]
  },
  {
    id: "non-fiscal",
    icon: "building-2",
    category: "non-fiscal",
    title: { en: "Non-Fiscal Revenue", rw: "Imisoro Itari iy'Amafaranga" },
    desc: { en: "Embassy services, public services and government institution payments.", rw: "Serivisi z'ambasade, serivisi za Leta n'amafaranga y'ibigo bya Leta." },
    links: [
      { en: "Service Categories", rw: "Ibyiciro bya serivisi", href: "https://nonfiscal.rra.gov.rw/" },
      { en: "Make Payment", rw: "Kwishyura", href: "https://nonfiscal.rra.gov.rw/" },
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
      { en: "Document Library", rw: "Isomero ry'inyandiko", href: "https://www.rra.gov.rw/en/publications" },
      { en: "Annual Reports", rw: "Raporo z'umwaka", href: "https://www.rra.gov.rw/en/publications" },
      { en: "Tax Laws", rw: "Amategeko y'imisoro", href: "https://www.rra.gov.rw/en/tax-laws" },
      { en: "Tax Forms", rw: "Ifishi z'imisoro", href: "https://www.rra.gov.rw/en/forms" },
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
    id: "ebm-v2-requirements",
    tag: "important",
    tagText: { en: "Important", rw: "By'ingenzi" },
    title: { en: "New EBM v2.0 registration requirements effective November 2026", rw: "Amabwiriza mashya ya EBM v2.0 atangira muri Ugushyingo 2026" },
    desc: { en: "All businesses must migrate to EBM v2.0 by November 30, 2026. Check the new requirements and setup guide.", rw: "Amasosiyete yose agomba kwimukira muri EBM v2.0 mbere ya 30 Ugushyingo 2026." },
    fullDesc: { en: "All businesses registered with RRA must migrate to the new EBM v2.0 system by November 30, 2026. The new system includes improved receipt validation, real-time transaction monitoring, and enhanced security features. Businesses should contact their EBM providers to schedule the upgrade. Failure to migrate by the deadline may result in penalties. Visit any RRA office or call our helpline for assistance with the migration process.", rw: "Amasosiyete yose yanditswe na RRA agomba kwimukira muri sisitemu nshya ya EBM v2.0 mbere ya 30 Ugushyingo 2026. Sisitemu nshya irimo kugenzura neza inkomoko, gukurikirana ibikorwa mu gihe nyacyo, n'umutekano mwiza. Amasosiyete agomba guhamagara ababaha EBM kugirango bategeanyirize kuzamurwa. Kutimukira mbere y'igihe gishobora gutera amande. Sura biro bya RRA cyangwa uhamagare telefoni y'ubufasha kugirango ubone ubufasha bwo kwimukira." },
    date: "2026-10-14"
  },
  {
    id: "myrra-maintenance",
    tag: "new",
    tagText: { en: "New", rw: "Gishya" },
    title: { en: "MyRRA portal maintenance scheduled for October 25", rw: "Gukora MyRRA biteganyijwe ku ya 25 Ukwakira" },
    desc: { en: "The MyRRA portal will be unavailable from 10 PM to 6 AM for scheduled maintenance.", rw: "Urubuga rwa MyRRA ntiruzakora kuva 10 PM kugeza 6 AM." },
    fullDesc: { en: "The MyRRA taxpayer portal will undergo scheduled maintenance on October 25, 2026, from 10:00 PM to 6:00 AM. During this time, the portal will be unavailable for login, filing returns, and making payments. We recommend completing any urgent tax obligations before the maintenance window. This maintenance will improve system performance and security. We apologize for any inconvenience and appreciate your understanding.", rw: "Urubuga rwa MyRRA ruzakorwa ku ya 25 Ukwakira 2026, kuva 10:00 PM kugeza 6:00 AM. Muri iki gihe, urubuga ntiruzakora kwinjira, gutanga declarations, no kwishyura. Turakugira inama yo kurangiza imisoro yihutirwa mbere y'igihe cyo gukora. Ibi bizongera imikorere n'umutekano bya sisitemu. Turasaba imbabazi z'ikibazo cyose kandi turashimira ubumvikane bwanyu." },
    date: "2026-10-12"
  },
  {
    id: "tax-amnesty-extended",
    tag: "",
    tagText: { en: "General", rw: "Rusange" },
    title: { en: "Tax Amnesty Program extended to December 2026", rw: "Gahunda y'imbabazi z'umusozi yaguye kugeza Ukuboza 2026" },
    desc: { en: "The tax amnesty program for outstanding liabilities has been extended. Apply through MyRRA.", rw: "Gahunda y'imbabazi z'umusozi yaguye. Saba biciye kuri MyRRA." },
    fullDesc: { en: "The Government of Rwanda has extended the Tax Amnesty Program until December 31, 2026. This program allows taxpayers with outstanding tax liabilities to settle their debts without penalties and interest. To benefit from this amnesty, taxpayers must apply through the MyRRA portal and complete the payment by the deadline. This is an opportunity to clear any tax arrears and start fresh. For more information, visit your nearest RRA office or contact our support team.", rw: "Leta y'u Rwanda yaguye Gahunda y'Imbabazi z'Umusoro kugeza 31 Ukuboza 2026. Iyi gahunda iha abasora bafite imisoro itarishyuwe kwishyura idafite amande n'inyungu. Kugirango ubone izi mbabazi, abasora bagomba gusaba biciye ku rubuga rwa MyRRA no kurangiza kwishyura mbere y'igihe ntarengwa. Iyi ni amahirwa yo gukuraho imisoro isigaye no gutangira bushya. Kugirango ubone amakuru menshi, sura biro bya RRA biri hafi yawe cyangwa uhamagare itsinda ry'ubufasha." },
    date: "2026-10-10"
  }
];

const news = [
  {
    id: "q1-revenue-collection",
    title: { en: "RRA collects RWF 2.1 trillion in Q1 2026/27", rw: "RRA yakusanyije Miliyari 2.1 z'Amafaranga mu Q1 2026/27" },
    desc: { en: "Revenue collection exceeds targets by 4% in the first quarter.", rw: "Imisoro yakusanyijwe irenga intego ku 4% mu gice cya mbere." },
    fullDesc: { en: "The Rwanda Revenue Authority has successfully collected RWF 2.1 trillion in revenue during the first quarter of the 2026/27 fiscal year, exceeding the target by 4%. This strong performance reflects improved compliance from taxpayers and enhanced collection systems. The revenue was primarily driven by domestic taxes, customs duties, and improved EBM compliance. RRA Commissioner General praised taxpayers for their continued cooperation and commitment to national development. The collected funds will support infrastructure, healthcare, education, and other government priorities.", rw: "Ikigo cy'Imisoro n'Amahoro cy'u Rwanda cyakusanyije neza Miliyari 2.1 z'amafaranga y'u Rwanda mu gice cya mbere cy'umwaka w'ingengo y'imari 2026/27, kirenga intego ku 4%. Iyi mikorere myiza yerekana ko abasora bakurikiza neza kandi sisitemu zo gukusanya zakozwe neza. Imisoro yakuwe cyane mu misoro yo mu gihugu, amahoro ya gasutamo, no gukurikiza EBM. Umuyobozi Mukuru wa RRA yashimiye abasora ubufatanye bwabo n'ubushake bwo guteza imbere igihugu. Amafaranga yakusanyijwe azashyigikira ibikorwa remezo, ubuzima, uburezi, n'ibindi byifuzo bya Leta." },
    date: "2026-10-13"
  },
  {
    id: "digital-stamp-customs",
    title: { en: "Digital stamp now available for all customs declarations", rw: "Digital stamp ubu iboneka kuri declarations zose za gasutamo" },
    desc: { en: "Physical stamps are no longer required for customs processing.", rw: "Stamps z'umubiri ntizigikenewe mu gutunganya gasutamo." },
    fullDesc: { en: "RRA has launched a digital stamp system for all customs declarations, eliminating the need for physical stamps. The new system streamlines the customs clearance process, reduces processing time, and enhances security. Importers and clearing agents can now apply for and receive digital stamps through the e-Single Window platform. The digital stamps are linked to specific declarations and cannot be transferred or reused. This initiative is part of RRA's digital transformation strategy to improve efficiency and reduce bureaucracy in trade facilitation.", rw: "RRA yatangije sisitemu ya digital stamp kuri declarations zose za gasutamo, ikuraho ibikenewe bya stamps z'umubiri. Sisitemu nshya yoroshye inzira yo gukuraho gasutamo, igabanya igihe cyo gutunganya, kandi yongera umutekano. Abakwirakwiza n'abacuruzi bashobora gusaba no kwakira digital stamps biciye ku rubuga rwa e-Single Window. Digital stamps zihujwe na declarations runaka kandi ntizishobora guhererekanywa cyangwa kongera gukoreshwa. Iyi gahunda ni igice cy'ingamba za RRA zo guhindura mu buryo bwa digital kugirango hongere imikorere kandi hagabanywe bureaucracy mu gufasha ubucuruzi." },
    date: "2026-10-11"
  },
  {
    id: "ebm-training-workshops",
    title: { en: "Free EBM training workshops in all provinces", rw: "Amahugurwa ya EBM ubuntu mu ntara zose" },
    desc: { en: "Register for free EBM training sessions happening across the country.", rw: "Iyandikishe ku mahugurwa ya EBM aba mu gihugu hose." },
    fullDesc: { en: "RRA is organizing free EBM training workshops in all five provinces of Rwanda to help businesses understand and comply with EBM requirements. The workshops will cover EBM setup, receipt generation, transaction reporting, and troubleshooting common issues. Sessions are scheduled throughout October and November 2026. Business owners, accountants, and IT staff are encouraged to attend. Registration is free and can be done through the MyRRA portal or at any RRA office. Participants will receive certificates of completion. For more information and to register, visit the EBM services page or contact your nearest RRA office.", rw: "RRA irategura amahugurwa ya EBM ubuntu mu ntara eshanu z'u Rwanda kugirango afashe amasosiyete kumva no gukurikiza ibisabwa bya EBM. Amahugurwa aziga gushyiraho EBM, gutanga inkomoko, gutanga amakuru y'ibikorwa, no gukemura ibibazo bisanzwe. Amasaha ateganijwe mu Ukwakira na Ugushyingo 2026. Abanyemari, ababara amafaranga, n'abakozi ba IT bashishikarizwa kwitabira. Kuyandikisha ni ubuntu kandi bishobora gukorwa biciye ku rubuga rwa MyRRA cyangwa kuri biro byose bya RRA. Abitabiriye bazahabwa impamyabumenyi zo kurangiza. Kugirango ubone amakuru menshi no kwiyandikisha, sura urupuro rwa serivisi za EBM cyangwa uhamagare biro bya RRA biri hafi yawe." },
    date: "2026-10-08"
  }
];

const searchIndex = [
  { title: "Income Tax", desc: "Personal and corporate income tax services", icon: "landmark", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "VAT Return", desc: "File your monthly VAT return", icon: "file-text", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "PAYE", desc: "Pay As You Earn — employer obligations", icon: "users", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Excise Duty", desc: "Excise duty on manufactured goods", icon: "factory", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Withholding Tax", desc: "WHT rates and filing requirements", icon: "percent", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Local Government Taxes", desc: "Trading license, property and rental income tax", icon: "home", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Motor Vehicle Tax", desc: "Vehicle registration and road levy", icon: "car", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Tax Clearance Certificate", desc: "TCC and Quitus Fiscal applications", icon: "badge-check", href: "https://www.rra.gov.rw/en/tcc", category: "tax" },
  { title: "RSSB Contributions", desc: "Social security contributions declared via RRA", icon: "shield-check", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Investors Starter Pack", desc: "Tax onboarding package for new investors", icon: "rocket", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Registration & De-registration", desc: "Register or update your taxpayer profile", icon: "user-plus", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Customs Services", desc: "Import/export declarations and cargo", icon: "ship", href: "https://sw.gov.rw/", category: "customs" },
  { title: "e-Single Window", desc: "Rwanda Electronic Single Window for trade", icon: "monitor", href: "https://sw.gov.rw/", category: "customs" },
  { title: "Trade Portal", desc: "HS codes, procedures, trade laws", icon: "globe", href: "https://rwandatrade.rw/", category: "trade" },
  { title: "Import Duties Calculator", desc: "Calculate import duties and taxes", icon: "calculator", href: "https://rwandatrade.rw/", category: "trade" },
  { title: "Digital Stamp Management", desc: "Digital excise stamps for products", icon: "stamp", href: "https://sw.gov.rw/", category: "customs" },
  { title: "Border Posts", desc: "RRA border posts and contact points", icon: "map-pin", href: "https://www.rra.gov.rw/en/customs-services", category: "customs" },
  { title: "Cargo Management", desc: "Cargo and warehouse management", icon: "package", href: "https://sw.gov.rw/", category: "customs" },
  { title: "Customs Clearing Agents", desc: "Licensed clearing agents information", icon: "user-check", href: "https://www.rra.gov.rw/en/customs-services", category: "customs" },
  { title: "EBM Services", desc: "Electronic Billing Machine setup and guides", icon: "receipt", href: "https://myrra.rra.gov.rw/", category: "ebm" },
  { title: "EBM Purchase Code", desc: "Verify purchase codes for transactions", icon: "qr-code", href: "https://myrra.rra.gov.rw/", category: "ebm" },
  { title: "Non-Fiscal Revenue", desc: "Embassy and public service payments", icon: "building-2", href: "https://nonfiscal.rra.gov.rw/", category: "non-fiscal" },
  { title: "TIN Registration", desc: "Register for a Tax Identification Number", icon: "id-card", href: "https://etax.rra.gov.rw/nidAssignedTIN/", category: "tax" },
  { title: "MyRRA Login", desc: "Access your taxpayer account", icon: "user-circle", href: "https://myrra.rra.gov.rw/", category: "tax" },
  { title: "Publications", desc: "Tax handbooks, reports and brochures", icon: "book-open", href: "https://www.rra.gov.rw/en/publications", category: "tax" },
  { title: "Tax Laws", desc: "Official tax legislation and regulations", icon: "scale", href: "https://www.rra.gov.rw/en/tax-laws", category: "tax" },
  { title: "Forms", desc: "Download tax and customs forms", icon: "file-down", href: "https://www.rra.gov.rw/en/forms", category: "tax" },
  { title: "Business Registration", desc: "Register your business via RDB", icon: "building", href: "https://rdb.rw/", category: "tax" },
  { title: "Contact RRA", desc: "Get in touch with RRA support", icon: "phone", href: "https://www.rra.gov.rw/en/contact-us", category: "tax" },
];
