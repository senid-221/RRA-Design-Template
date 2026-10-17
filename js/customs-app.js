(function() {
  'use strict';

  let activeService = 'import';

  const officialUrls = {
    'import': 'https://www.rra.gov.rw/en/customs-services/importers',
    'export': 'https://www.rra.gov.rw/en/customs-services/exporters',
    'transit': 'https://www.rra.gov.rw/en/customs-services/transit-regime',
    'travelers': 'https://www.rra.gov.rw/en/customs-services/travelers',
    'esingle-window': 'https://sw.gov.rw/',
    'ects': 'https://www.rra.gov.rw/en/customs-services/electronic-cargo-tracking-system',
    'valuation': 'https://www.rra.gov.rw/en/customs-services/valuation-gateway',
    'digital-stamp': 'https://www.rra.gov.rw/en/customs-services/digital-stamp-management',
    'border-posts': 'https://www.rra.gov.rw/en/customs-services/border-posts',
    'postal-services': 'https://www.rra.gov.rw/en/customs-services/postal-services',
    'cargo-management': 'https://www.rra.gov.rw/en/customs-services/cargo-management',
    'clearing-agents': 'https://www.rra.gov.rw/en/customs-services/customs-clearing-agents',
    'eac-customs-union': 'https://www.rra.gov.rw/en/customs-services/eac-customs-union'
  };

  function init() {
    lucide.createIcons();
    renderServiceNav();
    renderServiceDetails();
    renderFAQs();
    bindSearch();
    bindAccessibility();
    bindDropdowns();
    bindMobileMenu();
    bindServiceNavClicks();
    bindFAQs();
  }

  function renderServiceNav() {
    const grid = document.getElementById('serviceNavGrid');
    if (!grid) return;
    grid.innerHTML = customsServices.map(s => `
      <a href="${officialUrls[s.id] || '#'}" target="_blank" rel="noopener" class="service-nav-card ${s.id === activeService ? 'active' : ''}" data-service="${s.id}">
        <div class="service-nav-card__icon">
          <i class="lucide" data-lucide="${s.icon}"></i>
        </div>
        <div class="service-nav-card__text">
          <h3>${s.title}</h3>
          <p>${s.shortDesc}</p>
        </div>
      </a>
    `).join('');
    lucide.createIcons();
  }

  function renderServiceDetails() {
    const container = document.getElementById('serviceDetails');
    if (!container) return;

    container.innerHTML = customsServices.map(s => {
      const isActive = s.id === activeService;
      return `
        <section class="service-detail ${isActive ? 'active' : ''}" id="${s.id}">
          <div class="container">
            <div class="service-detail__header">
              <div class="service-detail__icon">
                <i class="lucide" data-lucide="${s.icon}"></i>
              </div>
              <div>
                <h2 class="service-detail__title">${s.title}</h2>
                <p class="service-detail__desc">${s.description}</p>
              </div>
            </div>
            <div class="service-detail__grid">
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="check-circle"></i>
                  <h3 class="info-card__title">Requirements</h3>
                </div>
                <ul class="requirements-list">
                  ${s.requirements.map(r => `<li><i class="lucide" data-lucide="check"></i> ${r}</li>`).join('')}
                </ul>
              </div>
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="list-ordered"></i>
                  <h3 class="info-card__title">How to Get Started</h3>
                </div>
                <ol class="steps-list">
                  ${s.steps.map((st, i) => `
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
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="percent"></i>
                  <h3 class="info-card__title">Rates & Fees</h3>
                </div>
                <table class="rates-table">
                  <thead><tr><th>Category</th><th>Rate</th></tr></thead>
                  <tbody>
                    ${s.rates.map(r => `<tr><td>${r.bracket}</td><td class="rate-value">${r.rate}</td></tr>`).join('')}
                  </tbody>
                </table>
              </div>
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="calendar-clock"></i>
                  <h3 class="info-card__title">Key Deadlines</h3>
                </div>
                <div class="deadline-cards">
                  ${s.deadlines.map(d => `
                    <div class="deadline-card-item">
                      <span class="deadline-card-item__date">${d.date}</span>
                      <span class="deadline-card-item__text">${d.text}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="info-card">
                <div class="info-card__header">
                  <i class="lucide" data-lucide="file-down"></i>
                  <h3 class="info-card__title">Forms & Documents</h3>
                </div>
                <ul class="forms-list">
                  ${s.forms.map(f => `
                    <li class="form-item">
                      <div class="form-item__info">
                        <div class="form-item__icon"><i class="lucide" data-lucide="file-text"></i></div>
                        <div>
                          <div class="form-item__name">${f.name}</div>
                          <div class="form-item__size">${f.size}</div>
                        </div>
                      </div>
                      <a href="${officialUrls[s.id] || 'https://www.rra.gov.rw/en/customs-services/forms'}" target="_blank" rel="noopener" class="form-item__download"><i class="lucide" data-lucide="download"></i> Download</a>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="cta-card">
                <h3>${s.cta.title}</h3>
                <p>${s.cta.desc}</p>
                <a href="${officialUrls[s.id] || 'https://www.rra.gov.rw/en/customs-services'}" target="_blank" rel="noopener" class="btn btn--primary"><i class="lucide" data-lucide="arrow-right"></i> ${s.cta.btn}</a>
              </div>
            </div>
          </div>
        </section>
      `;
    }).join('');
    lucide.createIcons();
  }

  function renderFAQs() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = customsFaqs.map((f, i) => `
      <div class="faq-item" data-faq="${i}">
        <button class="faq-question" aria-expanded="false">
          <span>${f.question}</span>
          <i class="lucide" data-lucide="chevron-down"></i>
        </button>
        <div class="faq-answer">
          <div class="faq-answer__inner">${f.answer}</div>
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

  function bindServiceNavClicks() {
    // Service nav cards now link directly to official RRA pages
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const service = customsServices.find(s => s.id === hash);
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
      if (isHidden) { input.value = ''; results.hidden = true; suggestions.hidden = false; setTimeout(() => input.focus(), 100); }
    });
    close.addEventListener('click', () => { overlay.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hidden) { overlay.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.hidden = false; toggle.setAttribute('aria-expanded', 'true'); setTimeout(() => input.focus(), 100); }
    });
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.hidden = true; suggestions.hidden = false; return; }
      const matches = customsServices.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)).slice(0, 8);
      if (matches.length === 0) { results.innerHTML = '<p style="padding:16px;color:var(--text-muted);font-size:14px;">No results found</p>'; }
      else { results.innerHTML = matches.map(m => `<a href="#${m.id}" class="search-result-item"><div class="search-result-item__icon"><i class="lucide" data-lucide="${m.icon}"></i></div><div class="search-result-item__text"><h4>${m.title}</h4><p>${m.shortDesc}</p></div></a>`).join(''); }
      results.hidden = false; suggestions.hidden = true; lucide.createIcons();
    });
  }

  function bindAccessibility() {
    const contrastBtn = document.getElementById('contrastBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (contrastBtn) { contrastBtn.addEventListener('click', () => { const html = document.documentElement; const isHigh = html.getAttribute('data-contrast') === 'high'; html.setAttribute('data-contrast', isHigh ? 'normal' : 'high'); contrastBtn.classList.toggle('active', !isHigh); lucide.createIcons(); }); }
    if (darkModeBtn) { darkModeBtn.addEventListener('click', () => { const html = document.documentElement; const isDark = html.getAttribute('data-theme') === 'dark'; html.setAttribute('data-theme', isDark ? 'light' : 'dark'); darkModeBtn.classList.toggle('active', !isDark); const icon = darkModeBtn.querySelector('.lucide, [data-lucide]'); if (icon) icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun'); lucide.createIcons(); }); }
  }

  function bindDropdowns() {
    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
      const btn = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown');
      if (!btn || !dropdown) return;
      btn.addEventListener('click', (e) => { e.stopPropagation(); const isOpen = btn.getAttribute('aria-expanded') === 'true'; closeAllDropdowns(); if (!isOpen) { btn.setAttribute('aria-expanded', 'true'); dropdown.classList.add('show'); } });
      item.addEventListener('mouseenter', () => { if (window.innerWidth > 768) { closeAllDropdowns(); btn.setAttribute('aria-expanded', 'true'); dropdown.classList.add('show'); } });
      item.addEventListener('mouseleave', () => { if (window.innerWidth > 768) { btn.setAttribute('aria-expanded', 'false'); dropdown.classList.remove('show'); } });
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

  function bindMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const overlay = document.getElementById('mobileOverlay');
    const close = document.getElementById('mobileNavClose');
    if (!toggle || !overlay) return;
    toggle.addEventListener('click', () => { overlay.hidden = false; toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; });
    function closeMenu() { overlay.hidden = true; toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
    if (close) close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) closeMenu(); });
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
