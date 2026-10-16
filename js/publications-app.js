(function() {
  'use strict';

  var currentLang = 'en';
  var activeFilters = { type: 'all', topic: 'all', lang: 'all', year: 'all', search: '' };

  function init() {
    lucide.createIcons();
    renderPublications();
    renderAnnualReports();
    renderLaws();
    renderForms();
    renderMobileNav();
    bindSearch();
    bindAccessibility();
    bindLanguage();
    bindDropdowns();
    bindMobileMenu();
    bindFilters();
    bindContactForm();
  }

  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.en[key]) || key;
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang === 'rw' ? 'rw' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val) el.textContent = val;
    });
    renderPublications();
    renderAnnualReports();
    renderLaws();
    renderForms();
    renderMobileNav();
  }

  // ===== PUBLICATIONS =====
  function renderPublications() {
    var grid = document.getElementById('pubGrid');
    var empty = document.getElementById('pubEmpty');
    var summary = document.getElementById('filterSummary');
    if (!grid) return;

    var filtered = publications.filter(function(p) {
      if (activeFilters.type !== 'all' && p.type !== activeFilters.type) return false;
      if (activeFilters.topic !== 'all' && p.topic !== activeFilters.topic) return false;
      if (activeFilters.lang !== 'all' && p.lang !== activeFilters.lang) return false;
      if (activeFilters.year !== 'all' && p.year !== parseInt(activeFilters.year)) return false;
      if (activeFilters.search) {
        var q = activeFilters.search.toLowerCase();
        var title = (currentLang === 'rw' ? p.titleRw : p.title) || p.title;
        var desc = (currentLang === 'rw' ? p.descRw : p.desc) || p.desc;
        if (!title.toLowerCase().includes(q) && !desc.toLowerCase().includes(q) && !p.topic.includes(q) && !p.type.includes(q)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.hidden = false;
    } else {
      empty.hidden = true;
      grid.innerHTML = filtered.map(function(p) {
        var title = currentLang === 'rw' ? p.titleRw : p.title;
        var desc = currentLang === 'rw' ? p.descRw : p.desc;
        var langLabel = p.lang === 'both' ? 'EN / KY' : p.lang === 'rw' ? 'KY' : 'EN';
        return '<div class="pub-card">' +
          '<div class="pub-card__header">' +
            '<div class="pub-card__icon pub-card__icon--' + p.type + '">' +
              '<i class="lucide" data-lucide="' + p.icon + '"></i>' +
            '</div>' +
          '</div>' +
          '<div class="pub-card__badges">' +
            '<span class="pub-badge pub-badge--type">' + p.type + '</span>' +
            '<span class="pub-badge pub-badge--lang">' + langLabel + '</span>' +
            (p.superseded ? '<span class="pub-badge pub-badge--superseded">Superseded</span>' : '') +
          '</div>' +
          '<h3>' + title + '</h3>' +
          '<p class="pub-card__desc">' + desc + '</p>' +
          '<div class="pub-card__meta">' +
            '<div class="pub-card__meta-left">' +
              '<span class="pub-card__meta-item"><i class="lucide" data-lucide="calendar"></i> ' + formatDate(p.updated || p.date) + '</span>' +
              '<span class="pub-card__meta-item"><i class="lucide" data-lucide="hard-drive"></i> ' + p.size + '</span>' +
            '</div>' +
            '<a href="#" class="pub-card__download"><i class="lucide" data-lucide="download"></i> PDF</a>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    var total = publications.length;
    summary.textContent = (currentLang === 'rw'
      ? 'Ibyagaragaye ' + filtered.length + ' muri ' + total + ' inyandiko'
      : 'Showing ' + filtered.length + ' of ' + total + ' documents');

    lucide.createIcons();
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getFullYear();
  }

  // ===== ANNUAL REPORTS =====
  function renderAnnualReports() {
    var grid = document.getElementById('annualGrid');
    if (!grid) return;
    grid.innerHTML = annualReports.map(function(r) {
      var title = currentLang === 'rw' ? r.titleRw : r.title;
      var desc = currentLang === 'rw' ? r.descRw : r.desc;
      return '<div class="annual-card">' +
        '<div class="annual-card__year">' + r.year + '</div>' +
        '<div class="annual-card__title">' + title + '</div>' +
        '<div class="annual-card__desc">' + desc + ' — ' + r.pages + ' pages</div>' +
        '<a href="#" class="annual-card__link"><i class="lucide" data-lucide="download"></i> Download (' + r.size + ')</a>' +
      '</div>';
    }).join('');
    lucide.createIcons();
  }

  // ===== LAWS =====
  function renderLaws() {
    var list = document.getElementById('lawsList');
    if (!list) return;
    list.innerHTML = taxLaws.map(function(l) {
      var title = currentLang === 'rw' ? l.titleRw : l.title;
      return '<div class="law-item">' +
        '<div class="law-item__icon"><i class="lucide" data-lucide="scale"></i></div>' +
        '<div class="law-item__info"><h4>' + title + '</h4><p>' + l.desc + '</p></div>' +
        '<span class="law-item__date">' + formatDate(l.date) + '</span>' +
        '<a href="#" class="law-item__download"><i class="lucide" data-lucide="download" style="width:14px;height:14px;"></i> PDF (' + l.size + ')</a>' +
      '</div>';
    }).join('');
    lucide.createIcons();
  }

  // ===== FORMS =====
  function renderForms() {
    var grid = document.getElementById('formsGrid');
    if (!grid) return;
    grid.innerHTML = taxForms.map(function(f) {
      var name = currentLang === 'rw' ? f.nameRw : f.name;
      return '<div class="form-card">' +
        '<div class="form-card__icon"><i class="lucide" data-lucide="file-text"></i></div>' +
        '<div class="form-card__info"><h4>' + name + '</h4><p>' + f.desc + ' — ' + f.size + '</p></div>' +
        '<a href="#" class="form-card__download"><i class="lucide" data-lucide="download" style="width:14px;height:14px;"></i></a>' +
      '</div>';
    }).join('');
    lucide.createIcons();
  }

  // ===== FILTERS =====
  function bindFilters() {
    var searchInput = document.getElementById('pubSearch');
    var typeSelect = document.getElementById('filterType');
    var topicSelect = document.getElementById('filterTopic');
    var langSelect = document.getElementById('filterLang');
    var yearSelect = document.getElementById('filterYear');

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        activeFilters.search = searchInput.value.trim();
        renderPublications();
      });
    }
    if (typeSelect) {
      typeSelect.addEventListener('change', function() {
        activeFilters.type = typeSelect.value;
        renderPublications();
      });
    }
    if (topicSelect) {
      topicSelect.addEventListener('change', function() {
        activeFilters.topic = topicSelect.value;
        renderPublications();
      });
    }
    if (langSelect) {
      langSelect.addEventListener('change', function() {
        activeFilters.lang = langSelect.value;
        renderPublications();
      });
    }
    if (yearSelect) {
      yearSelect.addEventListener('change', function() {
        activeFilters.year = yearSelect.value;
        renderPublications();
      });
    }
  }

  // ===== CONTACT FORM =====
  function bindContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="lucide" data-lucide="loader"></i> Sending...';
      btn.disabled = true;
      lucide.createIcons();
      setTimeout(function() {
        btn.innerHTML = '<i class="lucide" data-lucide="check-circle"></i> Message Sent!';
        btn.style.background = '#059669';
        lucide.createIcons();
        setTimeout(function() {
          form.reset();
          btn.innerHTML = originalHTML;
          btn.disabled = false;
          btn.style.background = '';
          lucide.createIcons();
        }, 2500);
      }, 1500);
    });
  }

  // ===== SEARCH =====
  function bindSearch() {
    var toggle = document.getElementById('searchToggle');
    var overlay = document.getElementById('searchOverlay');
    var close = document.getElementById('searchClose');
    var input = document.getElementById('searchInput');
    var results = document.getElementById('searchResults');
    var suggestions = document.getElementById('searchSuggestions');
    if (!toggle || !overlay) return;

    toggle.addEventListener('click', function() {
      var isHidden = overlay.hidden;
      overlay.hidden = !isHidden;
      toggle.setAttribute('aria-expanded', isHidden);
      if (isHidden) { input.value = ''; results.hidden = true; suggestions.hidden = false; setTimeout(function() { input.focus(); }, 100); }
    });
    close.addEventListener('click', function() { overlay.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !overlay.hidden) { overlay.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.hidden = false; toggle.setAttribute('aria-expanded', 'true'); setTimeout(function() { input.focus(); }, 100); }
    });
    input.addEventListener('input', function() {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.hidden = true; suggestions.hidden = false; return; }
      var matches = pubSearchIndex.filter(function(s) {
        var title = currentLang === 'rw' ? s.titleRw : s.title;
        var desc = currentLang === 'rw' ? s.descRw : s.desc;
        return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
      }).slice(0, 8);
      if (matches.length === 0) {
        results.innerHTML = '<p style="padding:16px;color:var(--text-muted);font-size:14px;">' + t('search_no_results') + '</p>';
      } else {
        results.innerHTML = matches.map(function(m) {
          var title = currentLang === 'rw' ? m.titleRw : m.title;
          var desc = currentLang === 'rw' ? m.descRw : m.desc;
          return '<a href="' + m.href + '" class="search-result-item"><div class="search-result-item__icon"><i class="lucide" data-lucide="' + m.icon + '"></i></div><div class="search-result-item__text"><h4>' + title + '</h4><p>' + desc + '</p></div></a>';
        }).join('');
      }
      results.hidden = false; suggestions.hidden = true; lucide.createIcons();
    });
    document.querySelectorAll('.search-tag').forEach(function(tag) {
      tag.addEventListener('click', function() { input.value = tag.dataset.query; input.dispatchEvent(new Event('input')); });
    });
  }

  // ===== ACCESSIBILITY =====
  function bindAccessibility() {
    var contrastBtn = document.getElementById('contrastBtn');
    var darkModeBtn = document.getElementById('darkModeBtn');
    if (contrastBtn) {
      contrastBtn.addEventListener('click', function() {
        var html = document.documentElement;
        var isHigh = html.getAttribute('data-contrast') === 'high';
        html.setAttribute('data-contrast', isHigh ? 'normal' : 'high');
        contrastBtn.classList.toggle('active', !isHigh); lucide.createIcons();
      });
    }
    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', function() {
        var html = document.documentElement;
        var isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        darkModeBtn.classList.toggle('active', !isDark);
        var icon = darkModeBtn.querySelector('.lucide, [data-lucide]');
        if (icon) icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun'); lucide.createIcons();
      });
    }
  }

  // ===== LANGUAGE =====
  function bindLanguage() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active'); currentLang = btn.dataset.lang; applyLanguage();
      });
    });
  }

  // ===== DROPDOWNS =====
  function bindDropdowns() {
    document.querySelectorAll('.nav-item.has-dropdown').forEach(function(item) {
      var btn = item.querySelector('.nav-link');
      var dropdown = item.querySelector('.dropdown');
      if (!btn || !dropdown) return;
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns();
        if (!isOpen) { btn.setAttribute('aria-expanded', 'true'); dropdown.classList.add('show'); }
      });
      item.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) { closeAllDropdowns(); btn.setAttribute('aria-expanded', 'true'); dropdown.classList.add('show'); }
      });
      item.addEventListener('mouseleave', function() {
        if (window.innerWidth > 768) { btn.setAttribute('aria-expanded', 'false'); dropdown.classList.remove('show'); }
      });
    });
    document.addEventListener('click', closeAllDropdowns);
  }
  function closeAllDropdowns() {
    document.querySelectorAll('.nav-item.has-dropdown').forEach(function(item) {
      var btn = item.querySelector('.nav-link');
      var dropdown = item.querySelector('.dropdown');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (dropdown) dropdown.classList.remove('show');
    });
  }

  // ===== MOBILE MENU =====
  function bindMobileMenu() {
    var toggle = document.getElementById('mobileMenuToggle');
    var overlay = document.getElementById('mobileOverlay');
    var close = document.getElementById('mobileNavClose');
    if (!toggle || !overlay) return;
    toggle.addEventListener('click', function() { overlay.hidden = false; toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; });
    function closeMenu() { overlay.hidden = true; toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
    if (close) close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeMenu(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && !overlay.hidden) closeMenu(); });
  }

  function renderMobileNav() {
    var list = document.getElementById('mobileNavList');
    if (!list) return;
    list.innerHTML =
      '<li><a href="index.html">' + (currentLang === 'rw' ? 'Ahabanza' : 'Home') + '</a></li>' +
      '<li><a href="domestic-tax-services.html">' + (currentLang === 'rw' ? 'Imisoro' : 'Tax Services') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="customs-services.html">' + (currentLang === 'rw' ? 'Gasutamo' : 'Customs') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="trade-portal.html">' + (currentLang === 'rw' ? 'Ubucuruzi' : 'Trade Portal') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="ebm-services.html">EBM <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="non-fiscal.html">' + (currentLang === 'rw' ? 'Ibinatari imisoro' : 'Non-Fiscal') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="myrra.html">MyRRA <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="publications.html" class="active">' + (currentLang === 'rw' ? 'Inyandiko' : 'Publications') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>';
    lucide.createIcons();
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
