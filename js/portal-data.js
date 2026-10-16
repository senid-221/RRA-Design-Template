var portalFaqs = [
  {
    question: {
      en: 'How do I create a MyRRA account?',
      rw: 'Nkora nte konti ya MyRRA?'
    },
    answer: {
      en: 'Click "Create Account" on the login page. You will need your TIN (Tax Identification Number), a valid email address, and your business registration details. After submitting the form, you will receive a verification email. Click the link in the email to activate your account.',
      rw: 'Kanda "Fungura Konti" ku rupapuro rwo kwinjira. Uzakeneye TIN yawe, email yemewe n\'amakuru y\'iyandikisha ry\'ubucuruzi. Nyuma yo kohereza form, uzakira email yo kugenzura. Kanda link iri muri email kugira ngo ukangure konti yawe.'
    }
  },
  {
    question: {
      en: 'I forgot my password. How can I reset it?',
      rw: 'Nibagiwe ijambo banga ryanjye. Naryihindura nte?'
    },
    answer: {
      en: 'Click "Forgot password?" on the login page. Enter your registered TIN or email address. You will receive a password reset link within minutes. The link expires after 24 hours for security purposes. If you do not receive the email, check your spam folder or contact support.',
      rw: 'Kanda "Wibagiwe ijambo banga?" ku rupapuro rwo kwinjira. Andika TIN cyangwa email yanditswe. Uzakira link yo guhindura ijambo banga mu minota mike. Link irangira nyuma y\'amasaha 24 kubera umutekano. Ntiwakira email, reba muri spam cyangwa uhamagare support.'
    }
  },
  {
    question: {
      en: 'My account is locked. What should I do?',
      rw: 'Konti yanjye yafunzwe. Nkore iki?'
    },
    answer: {
      en: 'Accounts are automatically locked after 5 consecutive failed login attempts. You can wait 30 minutes for automatic unlock, or contact support at +250 788 111 222 to request an immediate unlock. Have your TIN ready for verification.',
      rw: 'Konti zifungwa nyuma yo kugerageza kwinjira inshuro 5 zikurikirana zitanze. Ushobora gutegereza iminota 30 kugira ngo yiyunge, cyangwa uhamagare support kuri +250 788 111 222 gusaba ko ifungurwa vuba. Gira TIN yawe yiteguye kugira ngo igenzurwe.'
    }
  },
  {
    question: {
      en: 'What browsers are supported by MyRRA?',
      rw: 'Ni izihe browsers zikoreshwa na MyRRA?'
    },
    answer: {
      en: 'MyRRA supports the latest versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari. For the best experience, ensure your browser is up to date and JavaScript is enabled. Some features may not work correctly on Internet Explorer.',
      rw: 'MyRRA ikoresha versions nshya za Google Chrome, Mozilla Firefox, Microsoft Edge na Safari. Kubona uburambe bwiza, menya ko browser yawe ivuguruye kandi JavaScript ikaba ifunguye. Ibirimo bimwe bishobora kutakora neza kuri Internet Explorer.'
    }
  },
  {
    question: {
      en: 'Can I file my tax returns on mobile?',
      rw: 'Nshobora gutanga declarations z\'imisoro kuri telefoni?'
    },
    answer: {
      en: 'Yes, MyRRA is fully responsive and works on mobile devices. You can view your dashboard, check payment history, and download certificates on your phone. However, for complex declarations with multiple schedules, we recommend using a desktop or laptop computer.',
      rw: 'Yego, MyRRA ikora neza ku bikoresho bya telefoni. Ushobora kureba dashboard, kureba amateka y\'ubwishyu no gukuramo certificates kuri telefoni. Ariko, ku declarations zigoranye zifite schedules nyinshi, turagira inama gukoresha mudasobwa.'
    }
  },
  {
    question: {
      en: 'How do I update my business information?',
      rw: 'Nvugurura nte amakuru y\'ubucuruzi bwanjye?'
    },
    answer: {
      en: 'After logging in, go to your dashboard and click on "Business Profile" or "Settings." You can update your contact details, business address, and authorized representatives. Changes to legal entity information (such as business type or ownership) require supporting documents and may take 3-5 business days to process.',
      rw: 'Nyuma yo kwinjira, jya kuri dashboard kandi ukande "Business Profile" cyangwa "Settings." Ushobora kuvugurura amakuru y\'itumanaho, address y\'ubucuruzi n\'abahagarariye. Ihinduka ry\'amakuru y\'ikigo (nk\'ubwoko bw\'ubucuruzi cyangwa ubwamikiriye) risaba inyandiko z\'inkunga kandi bishobora gufata iminsi 3-5 y\'akazi.'
    }
  }
];

var portalSearchIndex = [
  { title: 'MyRRA Login', titleRw: 'Kwinjira muri MyRRA', desc: 'Access your taxpayer account', descRw: 'Injira kuri konti yawe y\'umusoro', href: 'myrra.html', icon: 'log-in' },
  { title: 'Create Account', titleRw: 'Fungura Konti', desc: 'Register for a new MyRRA account', descRw: 'Iyandikishe konti nshya ya MyRRA', href: 'myrra.html#register', icon: 'user-plus' },
  { title: 'Forgot Password', titleRw: 'Wibagiwe Ijambo Banga', desc: 'Reset your login password', descRw: 'Hindura ijambo banga ryo kwinjira', href: 'myrra.html#forgot-password', icon: 'key-round' },
  { title: 'Account Locked', titleRw: 'Konti Yafunzwe', desc: 'Unlock your locked account', descRw: 'Fungura konti yawe yafunzwe', href: 'myrra.html#unlock', icon: 'lock-open' },
  { title: 'File Tax Return', titleRw: 'Tanga Declaration', desc: 'Submit your tax declaration', descRw: 'Ohereza declaration y\'umusoro', href: 'domestic-tax-services.html', icon: 'file-text' },
  { title: 'Make Payment', titleRw: 'Kwishyura', desc: 'Pay your tax obligations', descRw: 'Ishyura imisoro yawe', href: 'myrra.html', icon: 'credit-card' },
  { title: 'EBM Services', titleRw: 'Serivisi za EBM', desc: 'Electronic billing machine setup', descRw: 'Gushyiraho mashini ya EBM', href: 'ebm-services.html', icon: 'receipt' },
  { title: 'Contact Support', titleRw: 'Hamagara Support', desc: 'Get help from RRA support team', descRw: 'Bona ubufasha ku itsinda rya RRA', href: 'myrra.html#contact', icon: 'headphones' }
];
