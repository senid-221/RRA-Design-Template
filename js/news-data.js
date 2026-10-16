var newsArticles = [
  {
    id: 1, type: 'press', featured: true,
    title: 'RRA Surpasses RWF 2 Trillion Revenue Collection Milestone',
    titleRw: 'RRA Yarenze Miliyari 2 z\'Amafaranga y\'u Rwanda',
    excerpt: 'For the first time in history, Rwanda Revenue Authority has collected over RWF 2 trillion in annual revenue, marking a significant achievement in national development funding.',
    excerptRw: 'Bwa mbere mu mateka, Ikigo cy\'Imisoro n\'Amahoro cyakusanyije arenga miliyari 2 z\'amafaranga y\'u Rwanda.',
    date: '2026-10-10', category: 'Revenue Collection', icon: 'trending-up'
  },
  {
    id: 2, type: 'announcement', featured: false,
    title: '2026 Motor Vehicle Road Levy Declaration Now Open',
    titleRw: 'Kwemeza Umusoro w\'Imodoka wa 2026 Biratangiye',
    excerpt: 'All vehicle owners must declare and pay the 2026 road levy by December 31, 2026. Declare online through eTax portal.',
    excerptRw: 'Banyamodoka bose bagomba kwemeza no kwishyura umusoro w\'umuhanda wa 2026 bitarenze 31 Ukuboza 2026.',
    date: '2026-10-08', category: 'Tax Deadline', icon: 'car'
  },
  {
    id: 3, type: 'press', featured: false,
    title: 'New EBM VSDC System Reduces VAT Fraud by 40%',
    titleRw: 'Sisitemu Nshya ya EBM VSDC Yagabanuye Ubwambuzi bwa VAT ho 40%',
    excerpt: 'The upgraded Virtual Sales Data Controller system has significantly improved VAT compliance and reduced fraud across all sectors.',
    excerptRw: 'Sisitemu nshya ya VSDC yongereye ubwizame bwa VAT kandi igabanya ubwambuzi mu nzego zose.',
    date: '2026-10-05', category: 'EBM', icon: 'shield-check'
  },
  {
    id: 4, type: 'event', featured: false,
    title: 'Taxpayer Education Workshop — Kigali',
    titleRw: 'Inama yo Kwigisha Abasora — Kigali',
    excerpt: 'Free workshop for SMEs on tax compliance, e-filing, and available tax incentives. Register now.',
    excerptRw: 'Inama y\'ubuntu ku bashoramari bato n\'abaciriritse ku bwizame bw\'imisoro.',
    date: '2026-10-20', category: 'Workshop', icon: 'users'
  },
  {
    id: 5, type: 'announcement', featured: false,
    title: 'MyRRA Portal Maintenance Scheduled for October 25',
    titleRw: 'Gukora ku Murongo wa MyRRA Biteganyijwe ku wa 25 Ukwakira',
    excerpt: 'The MyRRA portal will be unavailable from 10 PM to 6 AM on October 25 for scheduled system upgrades.',
    excerptRw: 'Umurongo wa MyRRA ntuzakoreshwa kuva saa 4 z\'ijoro kugeza saa 2 z\'igitondo ku wa 25 Ukwakira.',
    date: '2026-10-15', category: 'System Update', icon: 'settings'
  },
  {
    id: 6, type: 'press', featured: false,
    title: 'RRA Launches WhatsApp Tax Support Service',
    titleRw: 'RRA Yatangije Serivisi yo Gufasha ku WhatsApp',
    excerpt: 'Taxpayers can now get instant answers to tax questions via WhatsApp at +250 739 008 010.',
    excerptRw: 'Abasora ubu bashobora kubona ibisubizo by\'ibibazo by\'imisoro kuri WhatsApp.',
    date: '2026-09-28', category: 'Digital Services', icon: 'message-circle'
  },
  {
    id: 7, type: 'event', featured: false,
    title: 'Annual Tax Compliance Conference 2026',
    titleRw: 'Inama Nkuru y\'Ubwizame bw\'Imisoro 2026',
    excerpt: 'Join tax professionals, business leaders and RRA officials for the annual compliance conference in Kigali.',
    excerptRw: 'Inama nkuru y\'ubwizame bw\'imisoro ihuza abahanga mu misoro n\'abayobozi ba RRA.',
    date: '2026-11-15', category: 'Conference', icon: 'mic'
  },
  {
    id: 8, type: 'announcement', featured: false,
    title: 'Property Tax Declaration Deadline Extended',
    titleRw: 'Igihe cyo Kwemeza Umusoro w\'Inzu cyongewe',
    excerpt: 'The deadline for 2026 property tax declaration has been extended to November 30, 2026.',
    excerptRw: 'Igihe cyo kwemeza umusoro w\'inzu wa 2026 cyongewe kugeza 30 Ugushyingo 2026.',
    date: '2026-10-12', category: 'Tax Deadline', icon: 'calendar-clock'
  },
  {
    id: 9, type: 'press', featured: false,
    title: 'RRA Partners with Banks for Mobile Tax Payments',
    titleRw: 'RRA Yatanze Amaboko n\'Amabanki ku Kwishyura Imisoro kuri Telefone',
    excerpt: 'New partnerships with major banks enable seamless mobile money tax payments for all taxpayers.',
    excerptRw: 'Ubufatanye bushya n\'amabanki bukora kwishyura imisoro kuri telefone bigoroshye.',
    date: '2026-09-20', category: 'Partnerships', icon: 'smartphone'
  }
];

var newsEvents = [
  {
    id: 1, title: 'Taxpayer Education Workshop — Kigali',
    titleRw: 'Inama yo Kwigisha Abasora — Kigali',
    desc: 'Free workshop for SMEs on tax compliance, e-filing procedures, and available tax incentives.',
    descRw: 'Inama y\'ubuntu ku bashoramari bato ku bwizame bw\'imisoro n\'uburyo bwo gutanga imisoro kuri interineti.',
    date: '2026-10-20', time: '9:00 AM – 12:00 PM', location: 'RRA Head Office, Kigali'
  },
  {
    id: 2, title: 'EBM User Training — Musanze',
    titleRw: 'Kwigisha Abakoresha EBM — Musanze',
    desc: 'Hands-on training for new EBM users on machine setup, daily operations, and troubleshooting.',
    descRw: 'Kwigisha abakoresha bashya ba EBM uko bashyiraho, uko bakora, n\'uko bakemura ibibazo.',
    date: '2026-10-28', time: '10:00 AM – 3:00 PM', location: 'RRA Northern Province Office'
  },
  {
    id: 3, title: 'Annual Tax Compliance Conference 2026',
    titleRw: 'Inama Nkuru y\'Ubwizame bw\'Imisoro 2026',
    desc: 'Join tax professionals, business leaders and RRA officials for insights on compliance trends.',
    descRw: 'Inama ihuza abahanga mu misoro, abayobozi b\'ibigo, n\'abayobozi ba RRA.',
    date: '2026-11-15', time: '8:00 AM – 5:00 PM', location: 'Kigali Convention Centre'
  },
  {
    id: 4, title: 'Customs & Trade Facilitation Seminar',
    titleRw: 'Inama ku Gasutamo n\'Ubucuruzi',
    desc: 'Seminar on import/export procedures, trade documentation, and customs modernization.',
    descRw: 'Inama ku bijyanye no kohereza no kuzana ibicuruzwa, impapuro z\'ubucuruzi, n\'ikoranabuhanga rya gasutamo.',
    date: '2026-11-22', time: '9:00 AM – 1:00 PM', location: 'RRA Customs Office, Gatuna'
  }
];
