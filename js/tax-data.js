const taxServices = [
  {
    id: "income-tax",
    icon: "landmark",
    title: { en: "Income Tax", rw: "Umusoro ku Nyungu" },
    shortDesc: { en: "Personal & corporate income tax", rw: "Umusoro ku nyungu z'umuntu n'ikigo" },
    description: {
      en: "Income tax is levied on the earnings of individuals and businesses. Rwanda uses a progressive tax system for individuals and a flat rate for corporations.",
      rw: "Umusoro ku nyungu ushorwa ku mafaranga y'abantu n'ibigo. U Rwanda rukoresha sisitemu y'umusoro ukurikije uwinjiza ku bantu, n'igipimo kimwe ku bigo."
    },
    requirements: {
      en: [
        "Valid Tax Identification Number (TIN)",
        "Registered with RRA as a taxpayer",
        "EBM or approved accounting system for businesses",
        "Bank account for tax payments",
        "Supporting documents for deductions"
      ],
      rw: [
        "Nimero y'Umusoreshwa (TIN) yemewe",
        "Kwiyandikisha muri RRA nk'umusoreshwa",
        "EBM cyangwa sisitemu y'ibaruramari yemewe ku bigo",
        "Konti ya banki yo kwishyura imisoro",
        "Inyandiko zishyigikira ibigabanywa"
      ]
    },
    steps: {
      en: [
        { title: "Register for TIN", desc: "Apply for a Tax Identification Number through MyRRA or visit an RRA office." },
        { title: "Calculate taxable income", desc: "Determine your gross income and apply allowable deductions." },
        { title: "File return", desc: "Submit your annual or monthly income tax return via MyRRA portal." },
        { title: "Pay tax due", desc: "Pay the calculated tax through bank transfer, mobile money, or at RRA offices." },
        { title: "Keep records", desc: "Maintain records for at least 5 years for audit purposes." }
      ],
      rw: [
        { title: "Iyandikishe kuri TIN", desc: "Saba nimero y'umusoreshwa biciye kuri MyRRA cyangwa ugende ku biro bya RRA." },
        { title: "Bara amafaranga ashorwaho umusoro", desc: "Menya amafaranga yose winjije ukuremo ibigabanywa byemewe." },
        { title: "Tanga declaration", desc: "Ohereza declaration y'umusoro ku nyungu ya buri mwaka cyangwa ukwezi biciye kuri MyRRA." },
        { title: "Kwishyura umusoro", desc: "Kwishyura umusoro ubarwa biciye kuri banki, mobile money, cyangwa ku biro bya RRA." },
        { title: "Bika inyandiko", desc: "Bika inyandiko nibura imyaka 5 z'igenzura." }
      ]
    },
    forms: [
      { name: { en: "Annual Income Tax Return", rw: "Declaration y'Umusoro ku Nyungu y'Umwaka" }, size: "PDF, 245 KB" },
      { name: { en: "Monthly PAYE Return", rw: "Declaration ya PAYE ya Buri Kwezi" }, size: "PDF, 180 KB" },
      { name: { en: "TIN Application Form", rw: "Form yo Gusaba TIN" }, size: "PDF, 120 KB" }
    ],
    rates: {
      en: [
        { bracket: "0 – 30,000 RWF", rate: "0%" },
        { bracket: "30,001 – 100,000 RWF", rate: "20%" },
        { bracket: "100,001 – 200,000 RWF", rate: "30%" },
        { bracket: "Above 200,000 RWF", rate: "40%" },
        { bracket: "Corporate Income Tax", rate: "30%" }
      ],
      rw: [
        { bracket: "0 – 30,000 RWF", rate: "0%" },
        { bracket: "30,001 – 100,000 RWF", rate: "20%" },
        { bracket: "100,001 – 200,000 RWF", rate: "30%" },
        { bracket: "Hejuru ya 200,000 RWF", rate: "40%" },
        { bracket: "Umusoro ku Nyungu z'Ikigo", rate: "30%" }
      ]
    },
    deadlines: {
      en: [
        { date: "15 Mar", text: "Annual individual income tax return" },
        { date: "15 Jun", text: "Corporate income tax return" },
        { date: "Monthly", text: "PAYE withholding by 15th of following month" }
      ],
      rw: [
        { date: "15 Werurwe", text: "Declaration y'umwaka y'umuntu ku giti cye" },
        { date: "15 Kamena", text: "Declaration y'umwaka y'ikigo" },
        { date: "Buri kwezi", text: "PAYE mbere ya 15 y'ukwezi gukurikira" }
      ]
    },
    cta: {
      en: { title: "File your income tax return", desc: "Access MyRRA to submit your declaration online.", btn: "Go to MyRRA" },
      rw: { title: "Tanga declaration y'umusoro ku nyungu", desc: "Kanda kuri MyRRA kugira ngo utange declaration kuri internet.", btn: "Jya kuri MyRRA" }
    }
  },
  {
    id: "vat",
    icon: "percent",
    title: { en: "Value Added Tax (VAT)", rw: "Umusoro w'Inyongeragaciro (TVA)" },
    shortDesc: { en: "VAT registration, returns & compliance", rw: "Kwiyandikisha, gutanga TVA no kuyikurikiza" },
    description: {
      en: "VAT is a consumption tax levied on the supply of goods and services. Businesses with annual turnover above RWF 20 million must register for VAT.",
      rw: "TVA ni umusoro w'inyongeragaciro ushorwa ku bicuruzwa na serivisi. Amasosiyete afite amafaranga y'ubucuruzi arenze Miliyoni 20 ku mwaka agomba kwiyandikisha kuri TVA."
    },
    requirements: {
      en: [
        "Annual turnover exceeding RWF 20 million (mandatory)",
        "Valid TIN and business registration",
        "EBM installed and operational",
        "Proper accounting records",
        "Bank account for VAT payments"
      ],
      rw: [
        "Amafaranga y'ubucuruzi arenze Miliyoni 20 ku mwaka (by'itegeko)",
        "TIN n'iyandikisha ry'ubucuruzi byemewe",
        "EBM ishinzwe kandi ikora",
        "Inyandiko z'ibaruramari zikwiye",
        "Konti ya banki yo kwishyura TVA"
      ]
    },
    steps: {
      en: [
        { title: "VAT registration", desc: "Apply for VAT registration through MyRRA if turnover exceeds threshold." },
        { title: "Charge VAT on sales", desc: "Apply 18% VAT on taxable supplies and issue EBM invoices." },
        { title: "Record input VAT", desc: "Track VAT paid on purchases for credit claims." },
        { title: "File monthly return", desc: "Submit VAT return by the 15th of the following month via MyRRA." },
        { title: "Pay VAT due", desc: "Pay net VAT (output minus input) to RRA." }
      ],
      rw: [
        { title: "Kwiyandikisha kuri TVA", desc: "Saba kwiyandikisha kuri TVA biciye kuri MyRRA niba amafaranga arenze." },
        { title: "Shyiraho TVA ku bicuruzwa", desc: "Shyiraho 18% TVA ku bicuruzwa kandi utange invoice ya EBM." },
        { title: "Andika TVA y'ibyo waguzemo", desc: "Kurikirana TVA watanze ku byo waguzemo kugira ngo usabe krediti." },
        { title: "Tanga declaration ya buri kwezi", desc: "Ohereza declaration ya TVA mbere ya 15 y'ukwezi gukurikira biciye kuri MyRRA." },
        { title: "Kwishyura TVA", desc: "Kwishyura TVA isigaye (TVA y'ibyo waguze minus TVA y'ibyo waguzemo) kuri RRA." }
      ]
    },
    forms: [
      { name: { en: "VAT Registration Form", rw: "Form yo Kwiyandikisha kuri TVA" }, size: "PDF, 200 KB" },
      { name: { en: "Monthly VAT Return", rw: "Declaration ya TVA ya Buri Kwezi" }, size: "PDF, 150 KB" },
      { name: { en: "VAT Exemption Application", rw: "Form yo Gusaba Kubahirizwa TVA" }, size: "PDF, 180 KB" }
    ],
    rates: {
      en: [
        { bracket: "Standard Rate", rate: "18%" },
        { bracket: "Zero-rated supplies", rate: "0%" },
        { bracket: "Exempt supplies", rate: "Exempt" },
        { bracket: "Registration threshold", rate: "RWF 20M/year" }
      ],
      rw: [
        { bracket: "Igipimo Gisanzwe", rate: "18%" },
        { bracket: "Ibicuruzwa bidasorwa", rate: "0%" },
        { bracket: "Ibicuruzwa bidasorwa", rate: "Bidasorwa" },
        { bracket: "Aho kwiyandikisha", rate: "Miliyoni 20/umwaka" }
      ]
    },
    deadlines: {
      en: [
        { date: "15th monthly", text: "VAT return filing deadline" },
        { date: "20th monthly", text: "VAT payment deadline" },
        { date: "Annual", text: "VAT reconciliation by 15 March" }
      ],
      rw: [
        { date: "15 buri kwezi", text: "Iminsi ntarengwa yo gutanga declaration ya TVA" },
        { date: "20 buri kwezi", text: "Iminsi ntarengwa yo kwishyura TVA" },
        { date: "Buri mwaka", text: "Kuringaniza TVA mbere ya 15 Werurwe" }
      ]
    },
    cta: {
      en: { title: "File your VAT return", desc: "Submit your monthly VAT declaration online.", btn: "File VAT Return" },
      rw: { title: "Tanga declaration ya TVA", desc: "Ohereza declaration ya TVA ya buri kwezi kuri internet.", btn: "Tanga TVA" }
    }
  },
  {
    id: "paye",
    icon: "users",
    title: { en: "PAYE (Pay As You Earn)", rw: "PAYE (Umusoro ufatirwa ku Mushahara)" },
    shortDesc: { en: "Employer withholding obligations", rw: "Inshingano z'umukoresha zo gufata umusoro" },
    description: {
      en: "PAYE is a system where employers withhold income tax from employees' salaries and remit it to RRA monthly. All employers must register and comply.",
      rw: "PAYE ni sisitemu aho abakoresha bafata umusoro ku mushahara w'abakozi bakawohereza kuri RRA buri kwezi. Abakoresha bose bagomba kwiyandikisha no kubahiriza."
    },
    requirements: {
      en: [
        "Employer TIN registration",
        "Employee TIN numbers for all staff",
        "Payroll system with PAYE calculation",
        "Monthly PAYE return filing",
        "Timely payment to RRA"
      ],
      rw: [
        "Kwiyandikisha kwa TIN y'umukoresha",
        "TIN z'abakozi bose",
        "Sisitemu y'umushahara ibara PAYE",
        "Gutanga declaration ya PAYE buri kwezi",
        "Kwishyura RRA ku gihe"
      ]
    },
    steps: {
      en: [
        { title: "Register as employer", desc: "Register your business as an employer with RRA and obtain employer TIN." },
        { title: "Register employees", desc: "Ensure all employees have TIN numbers and are registered in your payroll." },
        { title: "Calculate PAYE", desc: "Apply progressive tax rates to each employee's gross salary." },
        { title: "Withhold and remit", desc: "Deduct PAYE from salaries and remit to RRA by the 15th of the following month." },
        { title: "File monthly return", desc: "Submit PAYE return via MyRRA showing all employees and amounts." }
      ],
      rw: [
        { title: "Iyandikishe nk'umukoresha", desc: "Iyandikishe ubucuruzi bwawe nk'umukoresha muri RRA ubone TIN y'umukoresha." },
        { title: "Iyandikishe abakozi", desc: "Menya neza ko abakozi bose bafite TIN kandi bari muri sisitemu y'umushahara." },
        { title: "Bara PAYE", desc: "Koresha ibipimo by'umusoro ku mushahara w'umukozi." },
        { title: "Fata wohereze", desc: "Kura PAYE ku mishahara uyohereze kuri RRA mbere ya 15 y'ukwezi gukurikira." },
        { title: "Tanga declaration ya buri kwezi", desc: "Ohereza declaration ya PAYE biciye kuri MyRRA yerekana abakozi bose n'amafaranga." }
      ]
    },
    forms: [
      { name: { en: "Monthly PAYE Return", rw: "Declaration ya PAYE ya Buri Kwezi" }, size: "PDF, 180 KB" },
      { name: { en: "Employee Registration Form", rw: "Form yo Kwiyandikisha Abakozi" }, size: "PDF, 150 KB" },
      { name: { en: "PAYE Exemption Certificate", rw: "Icyemezo cyo Kubahirizwa PAYE" }, size: "PDF, 120 KB" }
    ],
    rates: {
      en: [
        { bracket: "0 – 30,000 RWF", rate: "0%" },
        { bracket: "30,001 – 100,000 RWF", rate: "20%" },
        { bracket: "100,001 – 200,000 RWF", rate: "30%" },
        { bracket: "Above 200,000 RWF", rate: "40%" }
      ],
      rw: [
        { bracket: "0 – 30,000 RWF", rate: "0%" },
        { bracket: "30,001 – 100,000 RWF", rate: "20%" },
        { bracket: "100,001 – 200,000 RWF", rate: "30%" },
        { bracket: "Hejuru ya 200,000 RWF", rate: "40%" }
      ]
    },
    deadlines: {
      en: [
        { date: "15th monthly", text: "PAYE return and payment deadline" },
        { date: "Annual", text: "P9 form submission by 15 March" }
      ],
      rw: [
        { date: "15 buri kwezi", text: "Iminsi ntarengwa ya declaration na payment ya PAYE" },
        { date: "Buri mwaka", text: "Gutanga form P9 mbere ya 15 Werurwe" }
      ]
    },
    cta: {
      en: { title: "File PAYE return", desc: "Submit your monthly PAYE declaration.", btn: "File PAYE" },
      rw: { title: "Tanga declaration ya PAYE", desc: "Ohereza declaration ya PAYE ya buri kwezi.", btn: "Tanga PAYE" }
    }
  },
  {
    id: "wht",
    icon: "arrow-down-circle",
    title: { en: "Withholding Tax (WHT)", rw: "Umusoro Ufatirwa (WHT)" },
    shortDesc: { en: "Tax withheld on payments", rw: "Umusoro ufatirwa ku mafaranga" },
    description: {
      en: "Withholding tax is deducted at source on specific payments such as dividends, interest, royalties, and service fees. The payer is responsible for withholding and remitting to RRA.",
      rw: "Umusoro ufatirwa ukurwa ku mafaranga y'inyungu, inyungu za banki, ubwenge, n'amafaranga ya serivisi. Uwatanze amafaranga ni we ufite inshingano yo gufata no kohereza kuri RRA."
    },
    requirements: {
      en: [
        "Valid TIN for both payer and payee",
        "Identification of WHT-applicable payments",
        "Correct WHT rate application",
        "Monthly WHT return filing",
        "WHT certificates issued to payees"
      ],
      rw: [
        "TIN yemewe ku watanze n'uwakiriye",
        "Kumenya amafaranga ashorwaho WHT",
        "Gukoresha igipimo cya WHT cy'ukuri",
        "Gutanga declaration ya WHT buri kwezi",
        "Gutanga ibyemezo bya WHT ku bakiriye"
      ]
    },
    steps: {
      en: [
        { title: "Identify WHT payments", desc: "Determine which payments are subject to withholding tax." },
        { title: "Apply correct rate", desc: "Apply the appropriate WHT rate based on payment type and resident status." },
        { title: "Withhold at source", desc: "Deduct WHT from the payment before remitting to the payee." },
        { title: "Issue WHT certificate", desc: "Provide the payee with a WHT certificate for their records." },
        { title: "Remit to RRA", desc: "Pay withheld tax to RRA by the 15th of the following month." }
      ],
      rw: [
        { title: "Menya amafaranga ya WHT", desc: "Menya amafaranga ashorwaho umusoro ufatirwa." },
        { title: "Koresha igipimo cy'ukuri", desc: "Koresha igipimo cya WHT gikwiye hakurikijwe ubwoko bw'amafaranga." },
        { title: "Fata ku ntandaro", desc: "Kura WHT ku mafaranga mbere yo kuyaha uwakiriye." },
        { title: "Tanga icyemezo cya WHT", desc: "Ha uwakiriye icyemezo cya WHT cy'inyandiko ze." },
        { title: "Ohereza kuri RRA", desc: "Kwishyura umusoro wafashwe kuri RRA mbere ya 15 y'ukwezi gukurikira." }
      ]
    },
    forms: [
      { name: { en: "Monthly WHT Return", rw: "Declaration ya WHT ya Buri Kwezi" }, size: "PDF, 160 KB" },
      { name: { en: "WHT Certificate Template", rw: "Urugero rw'Icyemezo cya WHT" }, size: "PDF, 100 KB" }
    ],
    rates: {
      en: [
        { bracket: "Dividends (resident)", rate: "15%" },
        { bracket: "Dividends (non-resident)", rate: "15%" },
        { bracket: "Interest (resident)", rate: "15%" },
        { bracket: "Interest (non-resident)", rate: "15%" },
        { bracket: "Royalties", rate: "15%" },
        { bracket: "Service fees", rate: "15%" },
        { bracket: "Contract payments", rate: "5%" }
      ],
      rw: [
        { bracket: "Inyungu (utuye)", rate: "15%" },
        { bracket: "Inyungu (atuye)", rate: "15%" },
        { bracket: "Inyungu za banki (utuye)", rate: "15%" },
        { bracket: "Inyungu za banki (atuye)", rate: "15%" },
        { bracket: "Ubwenge", rate: "15%" },
        { bracket: "Amafaranga ya serivisi", rate: "15%" },
        { bracket: "Amafaranga y'amasezerano", rate: "5%" }
      ]
    },
    deadlines: {
      en: [
        { date: "15th monthly", text: "WHT return and payment deadline" }
      ],
      rw: [
        { date: "15 buri kwezi", text: "Iminsi ntarengwa ya declaration na payment ya WHT" }
      ]
    },
    cta: {
      en: { title: "File WHT return", desc: "Submit your monthly withholding tax declaration.", btn: "File WHT" },
      rw: { title: "Tanga declaration ya WHT", desc: "Ohereza declaration y'umusoro ufatirwa ya buri kwezi.", btn: "Tanga WHT" }
    }
  },
  {
    id: "excise",
    icon: "factory",
    title: { en: "Excise Duty", rw: "Umusoro w'Inyongeragaciro" },
    shortDesc: { en: "Tax on specific goods", rw: "Umusoro ku bicuruzwa bigenwe" },
    description: {
      en: "Excise duty is levied on specific goods manufactured in or imported into Rwanda, including alcohol, tobacco, fuel, and luxury items.",
      rw: "Umusoro w'inyongeragaciro ushorwa ku bicuruzwa bigenwe bikorewe mu Rwanda cyangwa byinjijwe, harimo inzoga, itabi, ibikomoka kuri peteroli, n'ibintu by'ubwiza."
    },
    requirements: {
      en: [
        "Manufacturer or importer registration with RRA",
        "Valid TIN and business license",
        "Excise license for specific goods",
        "Proper labeling and stamping",
        "Monthly excise return filing"
      ],
      rw: [
        "Kwiyandikisha kwa manufacturer cyangwa importer muri RRA",
        "TIN n'uruhushya rw'ubucuruzi byemewe",
        "Urushya rwa excise ku bicuruzwa bigenwe",
        "Gushyiraho label na stamp bikwiye",
        "Gutanga declaration ya excise buri kwezi"
      ]
    },
    steps: {
      en: [
        { title: "Obtain excise license", desc: "Apply for an excise license from RRA for the specific goods you manufacture or import." },
        { title: "Calculate excise duty", desc: "Determine the applicable excise rate based on the product category." },
        { title: "Apply tax stamps", desc: "Affix required tax stamps or labels to products before distribution." },
        { title: "File monthly return", desc: "Submit excise duty return by the 15th of the following month." },
        { title: "Pay excise duty", desc: "Remit calculated excise duty to RRA." }
      ],
      rw: [
        { title: "Bona urushya rwa excise", desc: "Saba urushya rwa excise kuri RRA ku bicuruzwa ukora cyangwa winjiza." },
        { title: "Bara umusoro wa excise", desc: "Menya igipimo cya excise gikwiye hakurikijwe ubwoko bw'igicuruzwa." },
        { title: "Shyiraho stamp z'umusoro", desc: "Shyiraho stamp cyangwa label zisabwa ku bicuruzwa mbere yo kubikuza." },
        { title: "Tanga declaration ya buri kwezi", desc: "Ohereza declaration ya excise mbere ya 15 y'ukwezi gukurikira." },
        { title: "Kwishyura excise", desc: "Ohereza umusoro wa excise wabarwa kuri RRA." }
      ]
    },
    forms: [
      { name: { en: "Excise License Application", rw: "Form yo Gusaba Urushya rwa Excise" }, size: "PDF, 220 KB" },
      { name: { en: "Monthly Excise Return", rw: "Declaration ya Excise ya Buri Kwezi" }, size: "PDF, 170 KB" }
    ],
    rates: {
      en: [
        { bracket: "Beer (local)", rate: "RWF 1,500/litre" },
        { bracket: "Beer (imported)", rate: "RWF 2,500/litre" },
        { bracket: "Spirits", rate: "RWF 4,000/litre" },
        { bracket: "Wine", rate: "RWF 2,000/litre" },
        { bracket: "Tobacco products", rate: "60% ad valorem" },
        { bracket: "Fuel (petrol)", rate: "RWF 495/litre" },
        { bracket: "Fuel (diesel)", rate: "RWF 395/litre" }
      ],
      rw: [
        { bracket: "Biyeri (y'iwacu)", rate: "RWF 1,500/litre" },
        { bracket: "Biyeri (y'amahanga)", rate: "RWF 2,500/litre" },
        { bracket: "Inzoga zikomeye", rate: "RWF 4,000/litre" },
        { bracket: "Divayi", rate: "RWF 2,000/litre" },
        { bracket: "Ibicuruzwa by'itabi", rate: "60% ad valorem" },
        { bracket: "Ibikomoka kuri peteroli (essence)", rate: "RWF 495/litre" },
        { bracket: "Ibikomoka kuri peteroli (gazoli)", rate: "RWF 395/litre" }
      ]
    },
    deadlines: {
      en: [
        { date: "15th monthly", text: "Excise duty return and payment" }
      ],
      rw: [
        { date: "15 buri kwezi", text: "Declaration n'umwishyuro wa excise" }
      ]
    },
    cta: {
      en: { title: "Apply for excise license", desc: "Register your business for excise duty compliance.", btn: "Apply Now" },
      rw: { title: "Saba urushya rwa excise", desc: "Iyandikishe ubucuruzi bwawe kugira ngo ukurikize excise.", btn: "Saba Nonaha" }
    }
  },
  {
    id: "local-tax",
    icon: "building",
    title: { en: "Local Government Taxes", rw: "Imisoro y'Uturere" },
    shortDesc: { en: "District-level tax obligations", rw: "Inshingano z'imisoro ku rwego rw'akarere" },
    description: {
      en: "Local government taxes include property tax, trading license fees, and other levies collected by district authorities on behalf of local governments.",
      rw: "Imisoro y'uturere irimo umusoro w'imitungo itimukanwa, amafaranga y'uruhushya rw'ubucuruzi, n'indi misoro ikusanywa n'ubuyobozi bw'akarere ku rwego rw'ibanze."
    },
    requirements: {
      en: [
        "Property ownership or business operation in the district",
        "Valid business registration",
        "Property valuation documents",
        "Trading license application"
      ],
      rw: [
        "Kugira umutungo cyangwa ubucuruzi mu karere",
        "Iyandikisha ry'ubucuruzi ryemewe",
        "Inyandiko z'agaciro k'umutungo",
        "Gusaba uruhushya rw'ubucuruzi"
      ]
    },
    steps: {
      en: [
        { title: "Register with district", desc: "Register your property or business with the local district authority." },
        { title: "Assessment", desc: "District assesses the tax base (property value or business category)." },
        { title: "Receive assessment notice", desc: "You receive a tax assessment notice with the amount due." },
        { title: "Pay local tax", desc: "Pay the assessed amount to the district or through RRA collection points." },
        { title: "Renew annually", desc: "Trading licenses and property taxes must be renewed each year." }
      ],
      rw: [
        { title: "Iyandikishe mu karere", desc: "Iyandikishe umutungo cyangwa ubucuruzi bwawe mu buyobozi bw'akarere." },
        { title: "Igenzura", desc: "Akarere kagenzura ishingiro ry'umusoro (agaciro k'umutungo cyangwa icyiciro cy'ubucuruzi)." },
        { title: "Kira icyemezo cy'igenzura", desc: "Kira icyemezo cy'igenzura cy'umusoro kirimo amafaranga ushobora." },
        { title: "Kwishyura umusoro w'akarere", desc: "Kwishyura amafaranga yagenwe ku karere cyangwa aho RRA ikusanyiriza." },
        { title: "Vugurura buri mwaka", desc: "Uruhashya rw'ubucuruzi n'umusoro w'imitungo bigomba kuvugururwa buri mwaka." }
      ]
    },
    forms: [
      { name: { en: "Property Tax Declaration", rw: "Declaration y'Umusoro w'Imitungo" }, size: "PDF, 190 KB" },
      { name: { en: "Trading License Application", rw: "Form yo Gusaba Uruhashya rw'Ubucuruzi" }, size: "PDF, 210 KB" }
    ],
    rates: {
      en: [
        { bracket: "Property tax (residential)", rate: "0.1% of value" },
        { bracket: "Property tax (commercial)", rate: "0.3% of value" },
        { bracket: "Trading license (small)", rate: "RWF 30,000/year" },
        { bracket: "Trading license (medium)", rate: "RWF 100,000/year" },
        { bracket: "Trading license (large)", rate: "RWF 300,000/year" }
      ],
      rw: [
        { bracket: "Umusoro w'imitungo (y'abaturage)", rate: "0.1% y'agaciro" },
        { bracket: "Umusoro w'imitungo (y'ubucuruzi)", rate: "0.3% y'agaciro" },
        { bracket: "Uruhashya rw'ubucuruzi (buto)", rate: "RWF 30,000/umwaka" },
        { bracket: "Uruhashya rw'ubucuruzi (buringaniye)", rate: "RWF 100,000/umwaka" },
        { bracket: "Uruhashya rw'ubucuruzi (kinini)", rate: "RWF 300,000/umwaka" }
      ]
    },
    deadlines: {
      en: [
        { date: "31 Mar", text: "Property tax payment deadline" },
        { date: "31 Jan", text: "Trading license renewal" }
      ],
      rw: [
        { date: "31 Werurwe", text: "Iminsi ntarengwa yo kwishyura umusoro w'imitungo" },
        { date: "31 Mutarama", text: "Guvugurura uruhushya rw'ubucuruzi" }
      ]
    },
    cta: {
      en: { title: "Pay local taxes", desc: "Check your local tax obligations and pay online.", btn: "Pay Now" },
      rw: { title: "Kwishyura imisoro y'akarere", desc: "Reba inshingano z'umusoro w'akarere wishyure kuri internet.", btn: "Kwishyura Nonaha" }
    }
  },
  {
    id: "motor-vehicle",
    icon: "car",
    title: { en: "Motor Vehicle Tax", rw: "Umusoro w'Imodoka" },
    shortDesc: { en: "Vehicle registration & road tax", rw: "Kwiyandikisha kw'imodoka n'umusoro w'umuhanda" },
    description: {
      en: "Motor vehicle tax includes registration fees, annual road tax, and transfer duties on vehicles. All vehicles must be registered and taxed annually.",
      rw: "Umusoro w'imodoka urimo amafaranga yo kwiyandikisha, umusoro w'umuhanda wa buri mwaka, n'umusoro wo guhinduza nyir'imodoka. Imodoka zose zigomba kwiyandikisha no gusorwa buri mwaka."
    },
    requirements: {
      en: [
        "Vehicle purchase documents or import papers",
        "Proof of ownership",
        "Vehicle inspection certificate",
        "Valid insurance",
        "Previous registration documents (for transfers)"
      ],
      rw: [
        "Inyandiko zo kugura imodoka cyangwa zo kuyinjiza",
        "Icyemezo cy'ub nyir'imodoka",
        "Icyemezo cyo kugenzura imodoka",
        "Ubwishingizi bwemewe",
        "Inyandiko z'iyandikisha rishize (ku guhinduza)"
      ]
    },
    steps: {
      en: [
        { title: "Vehicle inspection", desc: "Have the vehicle inspected at an authorized center." },
        { title: "Register vehicle", desc: "Register the vehicle with RRA and obtain license plates." },
        { title: "Pay registration fee", desc: "Pay the one-time registration fee based on vehicle type and value." },
        { title: "Pay annual road tax", desc: "Pay annual road tax before the deadline to avoid penalties." },
        { title: "Renew annually", desc: "Renew road tax and registration each year." }
      ],
      rw: [
        { title: "Kugenzura imodoka", desc: "Genzura imodoka ahantu hemewe." },
        { title: "Iyandikishe imodoka", desc: "Iyandikishe imodoka muri RRA ubone plaque." },
        { title: "Kwishyura amafaranga yo kwiyandikisha", desc: "Kwishyura amafaranga yo kwiyandikisha hakurikijwe ubwoko n'agaciro k'imodoka." },
        { title: "Kwishyura umusoro w'umuhanda wa buri mwaka", desc: "Kwishyura umusoro w'umuhanda mbere y'itariki ntarengwa kugira ngo wirinde amande." },
        { title: "Vugurura buri mwaka", desc: "Vugurura umusoro w'umuhanda n'iyandikisha buri mwaka." }
      ]
    },
    forms: [
      { name: { en: "Vehicle Registration Form", rw: "Form yo Kwiyandikisha Imodoka" }, size: "PDF, 200 KB" },
      { name: { en: "Road Tax Declaration", rw: "Declaration y'Umusoro w'Umuhanda" }, size: "PDF, 150 KB" },
      { name: { en: "Vehicle Transfer Form", rw: "Form yo Guhinduza Imodoka" }, size: "PDF, 180 KB" }
    ],
    rates: {
      en: [
        { bracket: "Motorcycle", rate: "RWF 15,000/year" },
        { bracket: "Private car (< 2000cc)", rate: "RWF 60,000/year" },
        { bracket: "Private car (> 2000cc)", rate: "RWF 120,000/year" },
        { bracket: "Commercial vehicle", rate: "RWF 90,000/year" },
        { bracket: "Import duty (new)", rate: "25% of value" },
        { bracket: "Import duty (used)", rate: "35% of value" }
      ],
      rw: [
        { bracket: "Moto", rate: "RWF 15,000/umwaka" },
        { bracket: "Imodoka y'umuntu (< 2000cc)", rate: "RWF 60,000/umwaka" },
        { bracket: "Imodoka y'umuntu (> 2000cc)", rate: "RWF 120,000/umwaka" },
        { bracket: "Imodoka y'ubucuruzi", rate: "RWF 90,000/umwaka" },
        { bracket: "Umukoro wo kwinjiza (nshya)", rate: "25% y'agaciro" },
        { bracket: "Umukoro wo kwinjiza (ikoreshwa)", rate: "35% y'agaciro" }
      ]
    },
    deadlines: {
      en: [
        { date: "30 Jun", text: "Annual road tax payment deadline" },
        { date: "30 days", text: "New vehicle registration after purchase" }
      ],
      rw: [
        { date: "30 Kamena", text: "Iminsi ntarengwa yo kwishyura umusoro w'umuhanda" },
        { date: "Iminsi 30", text: "Kwiyandikisha imodoka nshya nyuma yo kugura" }
      ]
    },
    cta: {
      en: { title: "Register your vehicle", desc: "Complete vehicle registration and pay road tax.", btn: "Register Vehicle" },
      rw: { title: "Iyandikishe imodoka", desc: "Rangiza kwiyandikisha kw'imodoka wishyure umusoro w'umuhanda.", btn: "Iyandikishe Imodoka" }
    }
  },
  {
    id: "tcc",
    icon: "badge-check",
    title: { en: "Tax Clearance Certificate (TCC)", rw: "Icyemezo cy'Umusoro (TCC)" },
    shortDesc: { en: "Proof of tax compliance", rw: "Icyemezo cyo kubahiriza imisoro" },
    description: {
      en: "A Tax Clearance Certificate confirms that a taxpayer has fulfilled all tax obligations. It is required for government tenders, business licenses, and certain transactions.",
      rw: "Icyemezo cy'Umusoro (TCC) kemeza ko umusoreshwa yujuje inshingano zose z'umusoro. Gikenewe mu isoko rya Leta, uruhushya rw'ubucuruzi, n'ibikorwa bimwe na bimwe."
    },
    requirements: {
      en: [
        "All tax returns filed and up to date",
        "All tax liabilities paid",
        "Valid TIN registration",
        "No pending tax audits or disputes",
        "EBM compliance (for businesses)"
      ],
      rw: [
        "Declarations zose zatanze kandi ziri ku gihe",
        "Imisoro yose yishyuwe",
        "TIN yemewe",
        "Nta igenzura ry'umusoro cyangwa amakimbirane birimo",
        "Kubahiriza EBM (ku bigo)"
      ]
    },
    steps: {
      en: [
        { title: "Check tax status", desc: "Verify all returns are filed and taxes paid via MyRRA." },
        { title: "Apply for TCC", desc: "Submit TCC application through MyRRA portal." },
        { title: "RRA verification", desc: "RRA verifies your tax compliance status (typically 3-5 working days)." },
        { title: "Receive certificate", desc: "Download your TCC from MyRRA once approved." },
        { title: "Renew as needed", desc: "TCC is valid for 12 months and must be renewed for continued use." }
      ],
      rw: [
        { title: "Reba imiterere y'umusoro", desc: "Genzura ko declarations zose zatanze n'imisoro yishyuwe biciye kuri MyRRA." },
        { title: "Saba TCC", desc: "Ohereza gusaba TCC biciye kuri portal ya MyRRA." },
        { title: "RRA igenzura", desc: "RRA igenzura imiterere y'ubahiriza umusoro (iminsi 3-5 y'akazi)." },
        { title: "Kira icyemezo", desc: "Kuramo TCC yawe kuri MyRRA iyo yemewe." },
        { title: "Vugurura iyo bikenewe", desc: "TCC imara amezi 12 kandi igomba kuvugururwa." }
      ]
    },
    forms: [
      { name: { en: "TCC Application Form", rw: "Form yo Gusaba TCC" }, size: "PDF, 130 KB" }
    ],
    rates: {
      en: [
        { bracket: "TCC application fee", rate: "RWF 10,000" },
        { bracket: "Validity period", rate: "12 months" },
        { bracket: "Processing time", rate: "3-5 working days" }
      ],
      rw: [
        { bracket: "Amafaranga yo gusaba TCC", rate: "RWF 10,000" },
        { bracket: "Igihe imara", rate: "amezi 12" },
        { bracket: "Igihe cyo gutunganya", rate: "iminsi 3-5 y'akazi" }
      ]
    },
    deadlines: {
      en: [
        { date: "As needed", text: "Apply before tender deadlines or license renewals" }
      ],
      rw: [
        { date: "Iyo bikenewe", text: "Saba mbere y'iminsi ntarengwa y'isoko cyangwa kuvugurura uruhushya" }
      ]
    },
    cta: {
      en: { title: "Apply for TCC", desc: "Get your Tax Clearance Certificate online.", btn: "Apply for TCC" },
      rw: { title: "Saba TCC", desc: "Bonera Icyemezo cy'Umusoro kuri internet.", btn: "Saba TCC" }
    }
  },
  {
    id: "rssb",
    icon: "shield-check",
    title: { en: "RSSB Contributions", rw: "Imisanzu ya RSSB" },
    shortDesc: { en: "Social security contributions via RRA", rw: "Imisanzu y'imiryango itegamiye kuri Leta" },
    description: {
      en: "Rwanda Social Security Board (RSSB) contributions — pensions, maternity leave, occupational hazards and CBHI — are declared and paid together with taxes through the MyRRA portal. Employers declare employee contributions monthly alongside PAYE.",
      rw: "Imisanzu ya RSSB — irarugendo mu buzima, amahoro mu bwenge, ibyago by'umurimo na CBHI — itangazwa kandi yishyuwa hamwe n'imisoro biciye kuri portal ya MyRRA. Abakoresha batangaza imisanzu y'abakozi buri kwezi hamwe na PAYE."
    },
    requirements: {
      en: [
        "Active TIN registered with RRA",
        "MyRRA portal account",
        "Employee details (names and National ID)",
        "Monthly salary records",
        "RSSB registration number (for employers)"
      ],
      rw: [
        "TIN ikora neza muri RRA",
        "Konti ya MyRRA",
        "Amakuru y'abakozi (amazina n'indangamuntu)",
        "Inyandiko z'imishahara ya buri kwezi",
        "Nimero y'iyandikisha rya RSSB (ku bakoresha)"
      ]
    },
    steps: {
      en: [
        { title: "Register employees", desc: "Register all employees for RSSB schemes through MyRRA." },
        { title: "Declare monthly", desc: "Declare contributions together with PAYE by the 15th of each month." },
        { title: "Pay contributions", desc: "Pay the declared amounts through MyRRA payment channels." },
        { title: "File the declaration", desc: "Submit the combined tax and RSSB declaration." },
        { title: "Keep records", desc: "Retain payslips and contribution records for audit." }
      ],
      rw: [
        { title: "Iyandikishe abakozi", desc: "Iyandikishe abakozi bose muri RSSB biciye kuri MyRRA." },
        { title: "Tangaza buri kwezi", desc: "Tangaza imisanzu hamwe na PAYE mbere ya 15 y'ukwezi." },
        { title: "Kwishyura imisanzu", desc: "Kwishyura amafaranga yatangajwe binyuze muri MyRRA." },
        { title: "Tanga declaration", desc: "Ohereza declaration y'imisoro n'imisanzu ya RSSB." },
        { title: "Bika inyandiko", desc: "Bika payslip n'inyandiko z'imisanzu ku igenzura." }
      ]
    },
    forms: [
      { name: { en: "RSSB Declaration Form", rw: "Ifishi ya Declaration ya RSSB" }, size: "PDF, 210 KB" }
    ],
    rates: {
      en: [
        { bracket: "Pension (employer)", rate: "6% of gross salary" },
        { bracket: "Pension (employee)", rate: "3% of gross salary" },
        { bracket: "Maternity leave", rate: "0.6% (0.3% each)" },
        { bracket: "Occupational hazards", rate: "2% (employer)" },
        { bracket: "CBHI", rate: "Per category" }
      ],
      rw: [
        { bracket: "Irarugendo (ukoresha)", rate: "6% y'imishahara" },
        { bracket: "Irarugendo (umukozi)", rate: "3% y'imishahara" },
        { bracket: "Amahoro mu bwenge", rate: "0.6% (0.3% ku mugerekanwa)" },
        { bracket: "Ibyago by'umurimo", rate: "2% (ukoresha)" },
        { bracket: "CBHI", rate: "Hari ibyiciro" }
      ]
    },
    deadlines: {
      en: [
        { date: "15th monthly", text: "Declare and pay RSSB contributions with PAYE" }
      ],
      rw: [
        { date: "15 buri kwezi", text: "Tangaza kandi wishyure imisanzu ya RSSB hamwe na PAYE" }
      ]
    },
    cta: {
      en: { title: "Declare RSSB contributions", desc: "Declare and pay social security contributions via MyRRA.", btn: "Go to MyRRA" },
      rw: { title: "Tangaza imisanzu ya RSSB", desc: "Tangaza kandi wishyure imisanzu y'imiryango kuri MyRRA.", btn: "Jya kuri MyRRA" }
    }
  },
  {
    id: "investors-starter-pack",
    icon: "rocket",
    title: { en: "Investors Starter Pack", rw: "Umuzingo w'Abashoramari" },
    shortDesc: { en: "Tax onboarding for new investors", rw: "Kwiyandikisha ku bashoramari bashya" },
    description: {
      en: "The Investors Starter Pack helps new investors understand and meet their tax obligations from day one. It covers TIN registration, tax type registration, EBM setup, and guidance on incentives and exemptions available to registered investors.",
      rw: "Umuzingo w'Abashoramari ufasha abashoramari bashya gusobanukirwa kandi bagahunga inshingano zabo z'umusoro ku munsi wa mbere. Harimo iyandikisha rya TIN, kwiyandikisha ubwoko bw'umusoro, gushyiraho EBM, n'imboga za incentives n'uburenganzira abashoramari batangajwe bafite."
    },
    requirements: {
      en: [
        "Certificate of registration from RDB",
        "Company TIN",
        "Investment registration certificate (if applicable)",
        "Business location details",
        "List of directors and shareholders"
      ],
      rw: [
        "Icyemezo cy'iyandikisha kuri RDB",
        "TIN y'ikigo",
        "Icyemezo cy'iyandikisha ry'ishoramari (niba gihari)",
        "Amakuru y'aho ibikorwa biherereye",
        "Urutonde rw'abayobozi n'abanyamigendanwa"
      ]
    },
    steps: {
      en: [
        { title: "Register business", desc: "Register your company with RDB to obtain a certificate of registration." },
        { title: "Get TIN", desc: "Obtain your company TIN through MyRRA or at the One Stop Centre." },
        { title: "Register tax types", desc: "Register for applicable taxes: CIT, VAT, PAYE and WHT." },
        { title: "Set up EBM", desc: "Apply for and configure an EBM if you are VAT-registered." },
        { title: "Review incentives", desc: "Meet with RRA taxpayer services to review applicable incentives and exemptions." }
      ],
      rw: [
        { title: "Iyandikishe ishoramari", desc: "Iyandikishe ikigo kuri RDB kugira ngo ubone icyemezo cy'iyandikisha." },
        { title: "Bona TIN", desc: "Bona TIN y'ikigo kuri MyRRA cyangwa muri One Stop Centre." },
        { title: "Iyandikishe ubwoko bw'imisoro", desc: "Iyandikishe imisoro ihari: CIT, VAT, PAYE na WHT." },
        { title: "Shyiraho EBM", desc: "Saba kandi utunganye EBM niba wiyandikishije VAT." },
        { title: "Reba incentives", desc: "Hura na services z'abasora za RRA ngo muganire kuri incentives n'uburenganzira." }
      ]
    },
    forms: [
      { name: { en: "Investor Tax Registration Pack", rw: "Umuzingo w'iyandikisha ry'umushoramari" }, size: "PDF, 480 KB" }
    ],
    rates: {
      en: [
        { bracket: "Registration fee", rate: "Free" },
        { bracket: "Supporting session", rate: "Free taxpayer education" },
        { bracket: "Processing time", rate: "1-2 working days" }
      ],
      rw: [
        { bracket: "Amafaranga y'iyandikisha", rate: "Ubuntu" },
        { bracket: "Amahugurwa", rate: "Ubwigishwa ku masaha ubuntu" },
        { bracket: "Igihe cyo gutunganya", rate: "iminsi 1-2 y'akazi" }
      ]
    },
    deadlines: {
      en: [
        { date: "Before trading", text: "Complete all registrations before starting operations" }
      ],
      rw: [
        { date: "Mbere y'ubucuruzi", text: "Kurangiza iyandikisha ryo se mbere y'uko utangira ibikorwa" }
      ]
    },
    cta: {
      en: { title: "Start with the Investors Starter Pack", desc: "Visit the official RRA page for full details on investor onboarding.", btn: "Official RRA Page" },
      rw: { title: "Tangira na Umuzingo w'Abashoramari", desc: "Reba urupapuro rumwe rwa RRA ku makuru yuzuye.", btn: "Urupuro ndanga rubanza" }
    }
  },
  {
    id: "registration",
    icon: "user-plus",
    title: { en: "Registration & De-registration", rw: "Kwiyandikisha no Kwicika" },
    shortDesc: { en: "Taxpayer registration services", rw: "Serivisi z'iyandikisha ry'abasora" },
    description: {
      en: "Register as a taxpayer, update your business details, add or remove tax types, or de-register when closing a business. Registration covers TIN issuance, VAT and PAYE registration, and amendments to taxpayer records.",
      rw: "Iyandikisha nk'umusoreshwa, vugurura amakuru y'ubucuruzi bwawe, onge cyangwa ukureho ubwoko bw'umusoro, cyangwa kwicika iyo ufunga ubucuruzi. Iyandikisha ririmo gutanga TIN, kwiyandikisha VAT na PAYE, no guhindura amakuru y'umusoreshwa."
    },
    requirements: {
      en: [
        "National ID or passport",
        "Certificate of registration (for businesses)",
        "Proof of business address",
        "TIN of the business (for amendments)",
        "De-registration: final tax returns and clearance"
      ],
      rw: [
        "Indangamuntu cyangwa pasiporo",
        "Icyemezo cy'iyandikisha (ku bigo)",
        "Icyemezo cy'aho ubucuruzi buherereye",
        "TIN y'ikigo (ku bihindura)",
        "Kwicika: declarations zanyuma n'ubwisanzure bw'umusoro"
      ]
    },
    steps: {
      en: [
        { title: "Apply for TIN", desc: "Submit your registration application via MyRRA or eTax using your National ID." },
        { title: "Register tax types", desc: "Add applicable tax types to your TIN (VAT, PAYE, CIT)." },
        { title: "Update details", desc: "Amend business name, address or activities through MyRRA." },
        { title: "File final returns", desc: "For de-registration, file all outstanding returns first." },
        { title: "De-register", desc: "Submit the de-registration request and obtain clearance confirmation." }
      ],
      rw: [
        { title: "Saba TIN", desc: "Ohereza gusaba kuri MyRRA cyangwa eTax ukoresheje indangamuntu." },
        { title: "Iyandikishe ubwoko bw'imisoro", desc: "Ongeraho ubwoko bw'imisoro kuri TIN (VAT, PAYE, CIT)." },
        { title: "Vugurura amakuru", desc: "Hindura izina, aho biherereye cyangwa ibikorwa binyuze kuri MyRRA." },
        { title: "Tanga declarations zanyuma", desc: "Kwicika: tanga declarations zose zisigaye mbere y'ibindi." },
        { title: "Kwicika", desc: "Ohereza gusaba kwicika kandi ubone icyemezo cy'ukwanduza." }
      ]
    },
    forms: [
      { name: { en: "Taxpayer Registration Form", rw: "Ifishi y'iyandikisha ry'umusoreshwa" }, size: "PDF, 280 KB" },
      { name: { en: "De-registration Request Form", rw: "Ifishi yo Gusaba Kwicika" }, size: "PDF, 180 KB" }
    ],
    rates: {
      en: [
        { bracket: "TIN registration", rate: "Free" },
        { bracket: "Non-business TIN (OSC)", rate: "Within 24 hours" },
        { bracket: "De-registration processing", rate: "Up to 5 days" }
      ],
      rw: [
        { bracket: "Iyandikisha rya TIN", rate: "Ubuntu" },
        { bracket: "TIN idakoresha ubucuruzi (OSC)", rate: "Mu minsi 24" },
        { bracket: "Igihe cyo kwicika", rate: "Kugeza ku minsi 5" }
      ]
    },
    deadlines: {
      en: [
        { date: "Within 7 days", text: "Register for taxes after starting business operations" }
      ],
      rw: [
        { date: "Mu minsi 7", text: "Iyandikishe imisoro nyuma yo gutangira ibikorwa" }
      ]
    },
    cta: {
      en: { title: "Register or update your taxpayer profile", desc: "Manage your registration details through MyRRA.", btn: "Go to MyRRA" },
      rw: { title: "Iyandikishe cyangwa vugurura amakuru yawe", desc: "Cunga amakuru y'iyandikisha yawe kuri MyRRA.", btn: "Jya kuri MyRRA" }
    }
  }
];

const faqs = [
  {
    question: {
      en: "How do I register for a TIN (Tax Identification Number)?",
      rw: "Niyandikisha nte kuri TIN (Nimero y'Umusoreshwa)?"
    },
    answer: {
      en: "You can apply for a TIN online through the MyRRA portal or visit any RRA office with your national ID and proof of address. The process is free and typically completed within 1-2 working days.",
      rw: "Ushobora gusaba TIN kuri internet biciye kuri portal ya MyRRA cyangwa ugende ku biro bya RRA ufite indangamuntu n'icyemezo cy'aho utuye. Byose ni ubuntu kandi birangira mu minsi 1-2 y'akazi."
    }
  },
  {
    question: {
      en: "What is the penalty for late tax filing?",
      rw: "Ihano ryo gutinda gutanga declaration ni irihe?"
    },
    answer: {
      en: "Late filing penalties range from 5% to 25% of the tax due, depending on how late the return is filed. Interest also accrues at 2% per month on unpaid amounts. File on time to avoid penalties.",
      rw: "Amahano yo gutinda atangira kuri 5% kugeza 25% y'umusoro ushobora, hakurikijwe uko byatinze. Inyungu kandi zikuba 2% buri kwezi ku mafaranga atishyuwe. Tanga ku gihe kugira ngo wirinde amahano."
    }
  },
  {
    question: {
      en: "How do I set up EBM (Electronic Billing Machine)?",
      rw: "Nshyiraho EBM (Electronic Billing Machine) nte?"
    },
    answer: {
      en: "Contact an RRA-approved EBM supplier to purchase and install an EBM device. After installation, register the device with RRA through MyRRA. Training is available at RRA offices.",
      rw: "Vugana n'umucuruzi wa EBA wemewe na RRA kugira ngo ugure kandi ushyireho EBM. Nyuma yo gushyiraho, iyandikishe igikoresho muri RRA biciye kuri MyRRA. Amahugurwa aboneka ku biro bya RRA."
    }
  },
  {
    question: {
      en: "Can I file my tax returns online?",
      rw: "Nshobora gutanga declarations z'umusoro kuri internet?"
    },
    answer: {
      en: "Yes, all tax returns can be filed online through the MyRRA portal. You need a registered account and valid TIN. The portal supports Income Tax, VAT, PAYE, WHT, and Excise Duty returns.",
      rw: "Yego, declarations zose z'umusoro zishobora gutangwa kuri internet biciye kuri portal ya MyRRA. Ukeneye konti yiyandikishije na TIN yemewe. Portal ishigikira declarations z'Umusoro ku Nyungu, TVA, PAYE, WHT, na Excise."
    }
  },
  {
    question: {
      en: "How do I apply for a Tax Clearance Certificate?",
      rw: "Ntegeranya Icyemezo cy'Umusoro (TCC) gute?"
    },
    answer: {
      en: "Ensure all your tax returns are filed and taxes paid. Then apply through MyRRA portal. RRA will verify your compliance status and issue the certificate within 3-5 working days. The TCC is valid for 12 months.",
      rw: "Menya neza ko declarations zose zatanze n'imisoro yishyuwe. Hanyuma saba biciye kuri portal ya MyRRA. RRA izagenzura imiterere yawe itange icyemezo mu minsi 3-5 y'akazi. TCC imara amezi 12."
    }
  },
  {
    question: {
      en: "What are the VAT registration requirements?",
      rw: "Ibisabwa byo kwiyandikisha kuri TVA ni ibihe?"
    },
    answer: {
      en: "Businesses with annual turnover exceeding RWF 20 million must register for VAT. You need a valid TIN, business registration, and an operational EBM. Apply through MyRRA or visit an RRA office.",
      rw: "Amasosiyete afite amafaranga y'ubucuruzi arenze Miliyoni 20 ku mwaka agomba kwiyandikisha kuri TVA. Ukeneye TIN yemewe, iyandikisha ry'ubucuruzi, na EBM ikora. Saba biciye kuri MyRRA cyangwa ugende ku biro bya RRA."
    }
  }
];
