(function() {
  'use strict';

  let currentLang = 'en';
  let activeService = 'income-tax';

  const officialPages = {
    'income-tax': 'https://www.rra.gov.rw/en/taxes-fees/domestic-taxes/income-tax',
    'vat': 'https://www.rra.gov.rw/en/domestic-tax-services/value-added-tax',
    'paye': 'https://www.rra.gov.rw/en/domestic-tax-services/employment-tax-paye',
    'wht': 'https://www.rra.gov.rw/en/domestic-tax-services/withholding-tax-wht',
    'excise': 'https://www.rra.gov.rw/en/domestic-tax-services/excise-duty',
    'local-tax': 'https://www.rra.gov.rw/en/domestic-tax-services/local-government-taxes',
    'motor-vehicle': 'https://www.rra.gov.rw/en/domestic-tax-services/motor-vehicle-services',
    'tcc': 'https://www.rra.gov.rw/en/domestic-tax-services/tax-clearance-certificate-tcc-tax-compliance-certificate/',
    'rssb': 'https://www.rra.gov.rw/en/domestic-tax-services/rssb-contributions',
    'investors-starter-pack': 'https://www.rra.gov.rw/en/domestic-tax-services/investors-starter-pack',
    'registration': 'https://www.rra.gov.rw/en/domestic-tax-services/registration-de-registration'
  };

  const ctaUrls = {
    'income-tax': 'https://myrra.rra.gov.rw/',
    'vat': 'https://myrra.rra.gov.rw/',
    'paye': 'https://myrra.rra.gov.rw/',
    'wht': 'https://myrra.rra.gov.rw/',
    'excise': 'https://myrra.rra.gov.rw/',
    'local-tax': 'https://localgov.rra.gov.rw/login',
    'motor-vehicle': 'https://etax.rra.gov.rw/mvLevyDeclaration',
    'tcc': 'https://myrra.rra.gov.rw/',
    'rssb': 'https://myrra.rra.gov.rw/',
    'investors-starter-pack': 'https://www.rra.gov.rw/en/domestic-tax-services/investors-starter-pack',
    'registration': 'https://myrra.rra.gov.rw/'
  };

  function init() {
    lucide.createIcons();
    renderServiceNav();
    renderServiceDetails();
    renderFAQs();
    renderMobileNav();
    bindSearch();
    bindAccessibility();
    bindLanguage();
    bindDropdowns();
    bindMobileMenu();
    bindServiceNavClicks();
    bindFAQs();
  }

  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.en[key]) || key;
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang === 'rw' ? 'rw' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val) el.placeholder = val;
    });
    renderServiceNav();
    renderServiceDetails();
    renderFAQs();
    renderMobileNav();
  }

  // ===== SERVICE NAV =====
  function renderServiceNav() {
    const grid = document.getElementById('serviceNavGrid');
    if (!grid) return;
    grid.innerHTML = taxServices.map(s => `
      <a href="#${s.id}" class="service-nav-card ${s.id === activeService ? 'active' : ''}" data-service="${s.id}">
        <div class="service-nav-card__icon">
          <i class="lucide" data-lucide="${s.icon}"></i>
        </div>
        <div class="service-nav-card__text">
          <h3>${s.title[currentLang] || s.title.en}</h3>
          <p>${s.shortDesc[currentLang] || s.shortDesc.en}</p>
        </div>
      </a>
    `).join('');
    lucide.createIcons();
  }

  // ===== SERVICE DETAILS =====
  function renderServiceDetails() {
    const container = document.getElementById('serviceDetails');
    if (!container) return;

    container.innerHTML = taxServices.map(s => {
      const isActive = s.id === activeService;
      const reqs = s.requirements[currentLang] || s.requirements.en;
      const steps = s.steps[currentLang] || s.steps.en;
      const rates = s.rates[currentLang] || s.rates.en;
      const deadlines = s.deadlines[currentLang] || s.deadlines.en;
      const cta = s.cta[currentLang] || s.cta.en;

      return `
        <section class="service-detail ${isActive ? 'active' : ''}" id="${s.id}">
          <div class="container">
            <div class="service-detail__header">
              <div class="service-detail__icon">
                <i class="lucide" data-lucide="${s.icon}"></i>
              </div>
              <div>
                <h2 class="service-detail__title">${s.title[currentLang] || s.title.en}</h2>
                <p class="service-detail__desc">${s.description[currentLang] || s.description.en}</p>
              </div>
            </div>

            <div class="service-detail__grid">
              <!-- Requirements -->
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="check-circle"></i>
                  <h3 class="info-card__title">${currentLang === 'rw' ? 'Ibisabwa' : 'Requirements'}</h3>
                </div>
                <ul class="requirements-list">
                  ${reqs.map(r => `<li><i class="lucide" data-lucide="check"></i> ${r}</li>`).join('')}
                </ul>
              </div>

              <!-- Steps -->
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="list-ordered"></i>
                  <h3 class="info-card__title">${currentLang === 'rw' ? 'Intambwe zo Gutangira' : 'How to Get Started'}</h3>
                </div>
                <ol class="steps-list">
                  ${steps.map((st, i) => `
                    <li class="step-item">
                      <div class="step-number">${i + 1}</div>
                      <div class="step-content">
                        <h4>${st.title}</h4>
                        <p>${st.desc}</p>
                      </div>
                    </li>
                  `).join('')}
                </ol>
              </div>

              <!-- Rates Table -->
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="percent"></i>
                  <h3 class="info-card__title">${currentLang === 'rw' ? 'Ibipimo by\'Umusoro' : 'Tax Rates'}</h3>
                </div>
                <table class="rates-table">
                  <thead>
                    <tr>
                      <th>${currentLang === 'rw' ? 'Icyiciro' : 'Category'}</th>
                      <th>${currentLang === 'rw' ? 'Igipimo' : 'Rate'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rates.map(r => `
                      <tr>
                        <td>${r.bracket}</td>
                        <td class="rate-value">${r.rate}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <!-- Deadlines -->
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="calendar-clock"></i>
                  <h3 class="info-card__title">${currentLang === 'rw' ? 'Iminsi Ntarengwa' : 'Key Deadlines'}</h3>
                </div>
                <div class="deadline-cards">
                  ${deadlines.map(d => `
                    <div class="deadline-card-item">
                      <span class="deadline-card-item__date">${d.date}</span>
                      <span class="deadline-card-item__text">${d.text}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Forms -->
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="file-down"></i>
                  <h3 class="info-card__title">${currentLang === 'rw' ? 'Impapuro' : 'Forms & Documents'}</h3>
                </div>
                <ul class="forms-list">
                  ${s.forms.map(f => `
                    <li class="form-item">
                      <div class="form-item__info">
                        <div class="form-item__icon">
                          <i class="lucide" data-lucide="file-text"></i>
                        </div>
                        <div>
                          <div class="form-item__name">${f.name[currentLang] || f.name.en}</div>
                          <div class="form-item__size">${f.size}</div>
                        </div>
                      </div>
                      <a href="${officialPages[s.id] || 'https://www.rra.gov.rw/en/publications'}" target="_blank" rel="noopener" class="form-item__download">
                        <i class="lucide" data-lucide="download"></i>
                        ${currentLang === 'rw' ? 'Kuramo' : 'Download'}
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- CTA -->
              <div class="cta-card">
                <h3>${cta.title}</h3>
                <p>${cta.desc}</p>
                <a href="${ctaUrls[s.id] || 'https://myrra.rra.gov.rw/'}" target="_blank" rel="noopener" class="btn btn--primary">
                  <i class="lucide" data-lucide="arrow-right"></i> ${cta.btn}
                </a>
              </div>
            </div>
          </div>
        </section>
      `;
    }).join('');
    lucide.createIcons();
  }

  // ===== FAQ =====
  function renderFAQs() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = faqs.map((f, i) => `
      <div class="faq-item" data-faq="${i}">
        <button class="faq-question" aria-expanded="false">
          <span>${f.question[currentLang] || f.question.en}</span>
          <i class="lucide" data-lucide="chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer__inner">${f.answer[currentLang] || f.answer.en}</div>
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  }

  function bindFAQs() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item').forEach(fi => {
          fi.classList.remove('open');
          fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          fi.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });

    const expandBtn = document.getElementById('faqExpandAll');
    const collapseBtn = document.getElementById('faqCollapseAll');

    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach(fi => {
          fi.classList.add('open');
          fi.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
          const answer = fi.querySelector('.faq-answer');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        });
      });
    }

    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        document.querySelectorAll('.faq-item').forEach(fi => {
          fi.classList.remove('open');
          fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          fi.querySelector('.faq-answer').style.maxHeight = null;
        });
      });
    }
  }

  // ===== SERVICE NAV CLICKS =====
  function bindServiceNavClicks() {
    document.querySelectorAll('.service-nav-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceId = card.dataset.service;
        activeService = serviceId;

        document.querySelectorAll('.service-nav-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        document.querySelectorAll('.service-detail').forEach(d => d.classList.remove('active'));
        const detail = document.getElementById(serviceId);
        if (detail) {
          detail.classList.add('active');
          detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Handle hash navigation
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const service = taxServices.find(s => s.id === hash);
      if (service) {
        activeService = hash;
        renderServiceNav();
        renderServiceDetails();
        setTimeout(() => {
          const detail = document.getElementById(hash);
          if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  // ===== SEARCH =====
  function bindSearch() {
    const toggle = document.getElementById('searchToggle');
    const overlay = document.getElementById('searchOverlay');
    const close = document.getElementById('searchClose');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const suggestions = document.getElementById('searchSuggestions');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
      const isHidden = overlay.hidden;
      overlay.hidden = !isHidden;
      toggle.setAttribute('aria-expanded', isHidden);
      if (isHidden) {
        input.value = '';
        results.hidden = true;
        suggestions.hidden = false;
        setTimeout(() => input.focus(), 100);
      }
    });

    close.addEventListener('click', () => {
      overlay.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) {
        overlay.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        setTimeout(() => input.focus(), 100);
      }
    });

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        results.hidden = true;
        suggestions.hidden = false;
        return;
      }
      const matches = taxServices.filter(s =>
        (s.title.en || '').toLowerCase().includes(q) ||
        (s.title.rw || '').toLowerCase().includes(q) ||
        (s.description.en || '').toLowerCase().includes(q)
      ).slice(0, 8);

      if (matches.length === 0) {
        results.innerHTML = `<p style="padding:16px;color:var(--text-muted);font-size:14px;">${t('search_no_results')}</p>`;
      } else {
        results.innerHTML = matches.map(m => `
          <a href="#${m.id}" class="search-result-item">
            <div class="search-result-item__icon">
              <i class="lucide" data-lucide="${m.icon}"></i>
            </div>
            <div class="search-result-item__text">
              <h4>${m.title[currentLang] || m.title.en}</h4>
              <p>${m.shortDesc[currentLang] || m.shortDesc.en}</p>
            </div>
          </a>
        `).join('');
      }
      results.hidden = false;
      suggestions.hidden = true;
      lucide.createIcons();
    });
  }

  // ===== ACCESSIBILITY =====
  function bindAccessibility() {
    const contrastBtn = document.getElementById('contrastBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');

    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isHigh = html.getAttribute('data-contrast') === 'high';
        html.setAttribute('data-contrast', isHigh ? 'normal' : 'high');
        contrastBtn.classList.toggle('active', !isHigh);
        lucide.createIcons();
      });
    }

    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        darkModeBtn.classList.toggle('active', !isDark);
        const icon = darkModeBtn.querySelector('.lucide, [data-lucide]');
        if (icon) icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
        lucide.createIcons();
      });
    }
  }

  // ===== LANGUAGE =====
  function bindLanguage() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.dataset.lang;
        applyLanguage();
      });
    });
  }

  // ===== DROPDOWNS =====
  function bindDropdowns() {
    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
      const btn = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown');
      if (!btn || !dropdown) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns();
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          dropdown.classList.add('show');
        }
      });

      item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
          closeAllDropdowns();
          btn.setAttribute('aria-expanded', 'true');
          dropdown.classList.add('show');
        }
      });

      item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
          btn.setAttribute('aria-expanded', 'false');
          dropdown.classList.remove('show');
        }
      });
    });

    document.addEventListener('click', closeAllDropdowns);
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
      const btn = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (dropdown) dropdown.classList.remove('show');
    });
  }

  // ===== MOBILE MENU =====
  function bindMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const overlay = document.getElementById('mobileOverlay');
    const close = document.getElementById('mobileNavClose');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
      overlay.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
      overlay.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (close) close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) closeMenu();
    });
  }

  function renderMobileNav() {
    const list = document.getElementById('mobileNavList');
    if (!list) return;

    const items = taxServices.map(s => ({
      text: s.title[currentLang] || s.title.en,
      href: `#${s.id}`
    }));

    items.push(
      { text: currentLang === 'rw' ? 'Iyandikishe ishoramari' : 'Business Registration', href: 'rdb-services.html' },
      { text: 'MyRRA', href: 'myrra.html' },
      { text: currentLang === 'rw' ? 'Inyandiko' : 'Publications', href: 'publications.html' },
      { text: currentLang === 'rw' ? 'Twandikire' : 'Contact', href: 'contact.html' }
    );

    list.innerHTML = items.map(item =>
      `<li><a href="${item.href}">${item.text} <i class="lucide" data-lucide="chevron-right"></i></a></li>`
    ).join('');
    lucide.createIcons();
  }

  // ===== INIT =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
