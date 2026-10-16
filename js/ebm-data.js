var ebmFaqs = [
  {
    question: { en: 'Who is required to use EBM?', rw: 'Ni nde usabwa gukoresha EBM?' },
    answer: { en: 'All businesses registered for VAT in Rwanda are required to use EBM for issuing fiscal receipts and invoices. This includes sole proprietorships, limited companies, partnerships and non-profit organizations engaged in taxable activities. Businesses below the VAT registration threshold may voluntarily register for EBM.', rw: 'Ubucuruzi bwose bwanditswe kuri VAT mu Rwanda busabwa gukoresha EBM mu gutanga inyemezabuguzi. Ibi birimo abikorera ku giti cyabo, amakompanyi, amashyirahamwe n\'imiryango itungwa n\'ibikorwa by\'imisoro.' }
  },
  {
    question: { en: 'How much does EBM cost?', rw: 'EBM igura angahe?' },
    answer: { en: 'RRA provides EBM applications free of charge for Windows, Android and Online versions. Physical EBM devices may have a cost depending on the supplier. VSDC integration is free but requires development effort from your software team.', rw: 'RRA itanga porogaramu za EBM ku buntu kuri Windows, Android na Online. Ibikoresho bya EBM bishobora kugura amafaranga bitewe n\'uwabigurishije. Guhuza VSDC ni ubuntu ariko bisaba umurimo w\'itsinda ryawe ry\'ikoranabuhanga.' }
  },
  {
    question: { en: 'Can I use my own invoicing software instead of EBM?', rw: 'Nshobora gukoresha software yanjye y\'inyemezabuguzi aho gukoresha EBM?' },
    answer: { en: 'Yes, through VSDC (Virtual Sales Device Controller) integration. Your software must be certified by RRA before it can be used for fiscal transactions. The certification process involves API testing, compliance review and a 5-10 business day approval period.', rw: 'Yego, binyuze mu guhuza VSDC. Software yawe igomba kwemezwa na RRA mbere y\'uko ikoreshwa ku bikorwa by\'imisoro. Uburyo bwo kwemeza burimo igerageza rya API, isuzuma ry\'ubwumvikane n\'igihe cy\'imyemezo cy\'iminsi 5-10 y\'akazi.' }
  },
  {
    question: { en: 'What happens if my EBM is offline?', rw: 'Ibihe biba iki iyo EBM yanjye idafite interineti?' },
    answer: { en: 'EBM applications can operate offline and store transactions locally. Once internet connectivity is restored, pending transactions are automatically transmitted to RRA servers. You should not turn off your device until all pending transactions are sent. Extended offline periods should be reported to RRA.', rw: 'Porogaramu za EBM zishobora gukora zidafite interineti kandi zikabika ibikorwa mu buryo bw\'ahantu. Iyo interineti igarutse, ibikorwa bitategereje byoherezwa ku mugaragaro wa RRA. Ntugagize igikoresho cyawe kugeza ibikorwa byose byoherejwe.' }
  },
  {
    question: { en: 'How do I verify a Purchase Code on a receipt?', rw: 'Ngenzura nte Purchase Code iri ku nyemezabuguzi?' },
    answer: { en: 'Visit the RRA website and enter the Purchase Code in the verification tool, or scan the QR code printed on the receipt using your smartphone camera. The system will display the transaction details including the business name, TIN, amount, date and items purchased.', rw: 'Sura urubuga rwa RRA kandi winjize Purchase Code mu bikoresho byo kugenzura, cyangwa soma QR code iri ku nyemezabuguzi ukoresheje kamera ya telefoni. Sisitemu izerekana amakuru y\'igikorwa harimo izina ry\'ubucuruzi, TIN, amafaranga, itariki n\'ibicuruzwa byaguwe.' }
  },
  {
    question: { en: 'What is the penalty for not using EBM?', rw: 'Ni ikihano cyo kutagira EBM?' },
    answer: { en: 'Businesses required to use EBM that fail to comply may face penalties including fines, suspension of business operations and potential legal action. The specific penalties depend on the nature and duration of non-compliance. Contact RRA for current penalty schedules and compliance requirements.', rw: 'Ubucuruzi busabwa gukoresha EBM butabikora bushobora guhura n\'ibihano birimo amande, guhagarika ibikorwa by\'ubucuruzi n\'ibikorwa by\'amategeko. Ibihano by\'umwihariko biterwa n\'imiterere n\'igihe cyo kutubahiriza. Hamagara RRA kugira ngo umenye ibihano biriho.' }
  }
];

var ebmSearchIndex = [
  { title: 'EBM Setup', titleRw: 'Gushyiraho EBM', desc: 'Get started with Electronic Billing Machine', descRw: 'Tangira gukoresha EBM', href: 'ebm-services.html#paths', icon: 'user-plus' },
  { title: 'EBM Types', titleRw: 'Ubwoko bwa EBM', desc: 'Windows, Android, Online and VSDC options', descRw: 'Amahitamo ya Windows, Android, Online na VSDC', href: 'ebm-services.html#paths', icon: 'monitor' },
  { title: 'User Guides', titleRw: 'Imbokeramikorere', desc: 'Download EBM user manuals and guides', descRw: 'Kuramo imbokeramikorere za EBM', href: 'ebm-services.html#guides', icon: 'book-open' },
  { title: 'VSDC Integration', titleRw: 'Guhuza VSDC', desc: 'API documentation for software developers', descRw: 'Inyandiko za API ku bakora software', href: 'ebm-services.html#paths', icon: 'code-2' },
  { title: 'Purchase Code', titleRw: 'Purchase Code', desc: 'Verify receipt authenticity', descRw: 'Genzura ukuri kw\'inyemezabuguzi', href: 'ebm-services.html#paths', icon: 'shield-check' },
  { title: 'EBM Support', titleRw: 'Ubufasha bwa EBM', desc: 'Contact EBM technical support', descRw: 'Hamagara ubufasha bw\'ikoranabuhanga bwa EBM', href: 'ebm-services.html#contact', icon: 'headphones' }
];
