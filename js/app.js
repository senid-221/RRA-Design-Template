(function() {
  'use strict';

  let currentLang = 'en';

  function init() {
    lucide.createIcons();
    renderDirectory();
    renderDeadlines();
    renderAnnouncements();
    renderNews();
    renderMobileNav();
    bindSearch();
    bindAccessibility();
    bindLanguage();
    bindDropdowns();
    bindMobileMenu();
    bindServiceFinder();
    bindCategoryFilter();
  }

  // ===== i18n =====
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
    renderDirectory();
    renderDeadlines();
    renderAnnouncements();
    renderNews();
    renderMobileNav();
  }

  // ===== SERVICE DIRECTORY =====
  function renderDirectory(filter) {
    const grid = document.getElementById('directoryGrid');
    if (!grid) return;
    const filtered = filter && filter !== 'all'
      ? services.filter(s => s.category === filter)
      : services;

    grid.innerHTML = filtered.map(s => `
      <div class="directory-card" data-category="${s.category}">
        <div class="directory-card__icon">
          <i class="lucide" data-lucide="${s.icon}"></i>
        </div>
        <h3 class="directory-card__title">${s.title[currentLang] || s.title.en}</h3>
        <p class="directory-card__desc">${s.desc[currentLang] || s.desc.en}</p>
        <div class="directory-card__links">
          ${s.links.map(l => `
            <a href="${l.href}" class="directory-card__link">
              <i class="lucide" data-lucide="chevron-right"></i>
              ${l[currentLang] || l.en}
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
    lucide.createIcons();
  }

  // ===== DEADLINES =====
  function renderDeadlines() {
    const list = document.getElementById('deadlinesList');
    if (!list) return;
    list.innerHTML = deadlines.map(d => `
      <li class="deadline-item">
        <div class="deadline-date">
          <span class="deadline-date__day">${d.day}</span>
          <span class="deadline-date__month">${d.month}</span>
        </div>
        <div class="deadline-info">
          <h4>${d.title[currentLang] || d.title.en}</h4>
          <p>${d.desc[currentLang] || d.desc.en}</p>
          <span class="deadline-badge deadline-badge--${d.badge}">${d.badgeText[currentLang] || d.badgeText.en}</span>
        </div>
      </li>
    `).join('');
  }

  // ===== ANNOUNCEMENTS =====
  function renderAnnouncements() {
    const list = document.getElementById('announcementsList');
    if (!list) return;
    list.innerHTML = announcements.map(a => `
      <li class="announcement-item">
        ${a.tag ? `<span class="announcement-item__tag announcement-item__tag--${a.tag}">${a.tagText[currentLang] || a.tagText.en}</span>` : ''}
        <h4>${a.title[currentLang] || a.title.en}</h4>
        <p>${a.desc[currentLang] || a.desc.en}</p>
        <span class="announcement-item__date">${formatDate(a.date)}</span>
      </li>
    `).join('');
  }

  // ===== NEWS =====
  function renderNews() {
    const list = document.getElementById('newsList');
    if (!list) return;
    list.innerHTML = news.map(n => `
      <li class="news-item">
        <div class="news-item__thumb">
          <i class="lucide" data-lucide="newspaper"></i>
        </div>
        <div class="news-item__text">
          <h4>${n.title[currentLang] || n.title.en}</h4>
          <p>${n.desc[currentLang] || n.desc.en}</p>
          <span class="news-item__date">${formatDate(n.date)}</span>
        </div>
      </li>
    `).join('');
    lucide.createIcons();
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const months = currentLang === 'rw'
      ? ['Mut','Gas','Wer','Mat','Gic','Kam','Nya','Kan','Nze','Ukw','Ugu','Uku']
      : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
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
      const matches = searchIndex.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      ).slice(0, 8);

      if (matches.length === 0) {
        results.innerHTML = `<p style="padding:16px;color:var(--text-muted);font-size:14px;">${t('search_no_results')}</p>`;
      } else {
        results.innerHTML = matches.map(m => `
          <a href="${m.href}" class="search-result-item">
            <div class="search-result-item__icon">
              <i class="lucide" data-lucide="${m.icon}"></i>
            </div>
            <div class="search-result-item__text">
              <h4>${highlightMatch(m.title, q)}</h4>
              <p>${m.desc}</p>
            </div>
          </a>
        `).join('');
      }
      results.hidden = false;
      suggestions.hidden = true;
      lucide.createIcons();
    });

    document.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        input.value = tag.dataset.query;
        input.dispatchEvent(new Event('input'));
      });
    });
  }

  function highlightMatch(text, query) {
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text;
    return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
  }

  // ===== SERVICE FINDER =====
  function bindServiceFinder() {
    const input = document.getElementById('serviceFinderInput');
    const btn = document.getElementById('serviceFinderBtn');
    if (!input || !btn) return;

    function doSearch() {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) return;
      const searchOverlay = document.getElementById('searchOverlay');
      const searchInput = document.getElementById('searchInput');
      if (searchOverlay && searchInput) {
        searchOverlay.hidden = false;
        searchInput.value = input.value;
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      }
    }

    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch();
    });
  }

  // ===== CATEGORY FILTER =====
  function bindCategoryFilter() {
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderDirectory(chip.dataset.category);
      });
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
        contrastBtn.querySelector('.lucide, [data-lucide]');
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
        if (icon) {
          icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
        }
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

    const items = [
      { text: t('nav_home'), href: '/' },
      { text: t('nav_tax_services'), children: [
        { text: t('nav_income_tax'), href: '#income-tax' },
        { text: t('nav_vat'), href: '#vat' },
        { text: t('nav_paye'), href: '#paye' },
        { text: t('nav_excise'), href: '#excise' },
        { text: t('nav_wht'), href: '#wht' },
      ]},
      { text: t('dropdown_customs'), children: [
        { text: t('nav_customs_services'), href: '#customs' },
        { text: t('nav_e_single_window'), href: '#esingle-window' },
        { text: t('nav_trade_portal'), href: '#trade-portal' },
        { text: t('nav_import_calc'), href: '#import-calc' },
      ]},
      { text: t('nav_ebm'), href: '#ebm' },
      { text: t('nav_non_fiscal'), href: '#non-fiscal' },
      { text: t('nav_resources'), children: [
        { text: t('nav_publications'), href: '#publications' },
        { text: t('nav_tax_laws'), href: '#tax-laws' },
        { text: t('nav_forms'), href: '#forms' },
        { text: t('nav_guides'), href: '#guides' },
      ]},
      { text: t('nav_contact'), href: '#contact' },
    ];

    list.innerHTML = items.map(item => {
      if (item.children) {
        return `
          <li>
            <button onclick="this.nextElementSibling.classList.toggle('open'); this.querySelector('.lucide, [data-lucide]')?.style && (this.querySelectorAll('[data-lucide]').forEach(i => {}))">
              ${item.text}
              <i class="lucide" data-lucide="chevron-down"></i>
            </button>
            <div class="mobile-submenu">
              ${item.children.map(c => `<a href="${c.href}">${c.text}</a>`).join('')}
            </div>
          </li>
        `;
      }
      return `<li><a href="${item.href}">${item.text} <i class="lucide" data-lucide="chevron-right"></i></a></li>`;
    }).join('');
    lucide.createIcons();
  }

  // ===== INIT =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
