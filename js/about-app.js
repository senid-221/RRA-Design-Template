(function() {
  'use strict';

  var currentLang = 'en';

  function init() {
    lucide.createIcons();
    renderMobileNav();
    bindSearch();
    bindAccessibility();
    bindLanguage();
    bindDropdowns();
    bindMobileMenu();
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
    renderMobileNav();
  }

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
      results.innerHTML = '<p style="padding:16px;color:var(--text-muted);font-size:14px;">' + t('search_no_results') + '</p>';
      results.hidden = false; suggestions.hidden = true;
    });
    document.querySelectorAll('.search-tag').forEach(function(tag) {
      tag.addEventListener('click', function() { input.value = tag.dataset.query; input.dispatchEvent(new Event('input')); });
    });
  }

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

  function bindLanguage() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active'); currentLang = btn.dataset.lang; applyLanguage();
      });
    });
  }

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
      '<li><a href="rdb-services.html">' + (currentLang === 'rw' ? 'Iyandikishe ishoramari' : 'Business Registration') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="myrra.html">MyRRA <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="publications.html">' + (currentLang === 'rw' ? 'Inyandiko' : 'Publications') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="news.html">' + (currentLang === 'rw' ? 'Amakuru' : 'News') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="about.html" class="active">' + (currentLang === 'rw' ? 'Tumenye' : 'About') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="contact.html">' + (currentLang === 'rw' ? 'Twandikire' : 'Contact') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>';
    lucide.createIcons();
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
