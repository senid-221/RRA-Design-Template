(function() {
  'use strict';

  var currentLang = 'en';
  var calcType = 'monthly';

  var TAX_BRACKETS = [
    { max: 30000, rate: 0, fixed: 0 },
    { max: 100000, rate: 0.20, fixed: 0 },
    { max: 200000, rate: 0.30, fixed: 14000 },
    { max: Infinity, rate: 0.40, fixed: 44000 }
  ];

  var DEPENDENT_EXEMPTION = 2000;
  var MAX_DEPENDENTS = 3;

  function init() {
    lucide.createIcons();
    renderMobileNav();
    bindCalc();
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

  function formatRWF(amount) {
    return 'RWF ' + Math.round(amount).toLocaleString();
  }

  function calculateTax(grossMonthly, nssfMonthly, dependents) {
    var taxableIncome = grossMonthly - nssfMonthly;
    if (taxableIncome < 0) taxableIncome = 0;

    var depExemption = Math.min(dependents, MAX_DEPENDENTS) * DEPENDENT_EXEMPTION;
    taxableIncome = Math.max(taxableIncome - depExemption, 0);

    var tax = 0;
    var bracketDetails = [];
    var prevMax = 0;

    for (var i = 0; i < TAX_BRACKETS.length; i++) {
      var b = TAX_BRACKETS[i];
      if (taxableIncome <= prevMax) break;

      var bracketIncome = Math.min(taxableIncome, b.max) - prevMax;
      if (bracketIncome <= 0) { prevMax = b.max; continue; }

      var bracketTax = bracketIncome * b.rate;
      tax += bracketTax;

      bracketDetails.push({
        range: (prevMax === 0 ? '0' : formatRWF(prevMax + 1)) + ' — ' + (b.max === Infinity ? '∞' : formatRWF(b.max)),
        rate: Math.round(b.rate * 100) + '%',
        amount: bracketTax,
        income: bracketIncome
      });

      prevMax = b.max;
    }

    tax += TAX_BRACKETS[TAX_BRACKETS.length - 1].fixed > 0 && taxableIncome > 200000 ? 0 : 0;

    // Apply fixed amounts correctly
    tax = 0;
    bracketDetails = [];
    prevMax = 0;
    for (var j = 0; j < TAX_BRACKETS.length; j++) {
      var bj = TAX_BRACKETS[j];
      if (taxableIncome <= prevMax) break;
      var bi = Math.min(taxableIncome, bj.max) - prevMax;
      if (bi <= 0) { prevMax = bj.max; continue; }
      var bt = bi * bj.rate;
      tax += bt;
      bracketDetails.push({
        range: (prevMax === 0 ? '0' : formatRWF(prevMax + 1)) + ' — ' + (bj.max === Infinity ? '∞' : formatRWF(bj.max)),
        rate: Math.round(bj.rate * 100) + '%',
        amount: bt,
        income: bi
      });
      prevMax = bj.max;
    }

    // Add fixed amount for the highest applicable bracket
    for (var k = TAX_BRACKETS.length - 1; k >= 0; k--) {
      if (taxableIncome > TAX_BRACKETS[k].max || (k === TAX_BRACKETS.length - 1 && taxableIncome > (TAX_BRACKETS[k-1] ? TAX_BRACKETS[k-1].max : 0))) {
        tax += TAX_BRACKETS[k].fixed;
        break;
      }
    }

    var netPay = grossMonthly - nssfMonthly - tax;

    return {
      gross: grossMonthly,
      nssf: nssfMonthly,
      depExemption: depExemption,
      taxableIncome: taxableIncome,
      tax: tax,
      netPay: netPay,
      effectiveRate: grossMonthly > 0 ? (tax / grossMonthly * 100) : 0,
      brackets: bracketDetails
    };
  }

  function renderResults(result) {
    var card = document.getElementById('calcResults');
    if (!card) return;

    var bracketsHTML = result.brackets.map(function(b) {
      var pct = result.taxableIncome > 0 ? (b.income / result.taxableIncome * 100) : 0;
      return '<div class="bracket-bar">' +
        '<span class="bracket-bar__range">' + b.range + '</span>' +
        '<div class="bracket-bar__track"><div class="bracket-bar__fill" style="width:' + pct + '%"></div></div>' +
        '<span class="bracket-bar__amount">' + formatRWF(b.amount) + ' (' + b.rate + ')</span>' +
      '</div>';
    }).join('');

    card.innerHTML =
      '<div class="calc-results__header">' +
        '<h3>Net Take-Home Pay' + (calcType === 'annual' ? ' (Annual)' : ' (Monthly)') + '</h3>' +
        '<div class="calc-results__net">' + formatRWF(result.netPay) + '</div>' +
      '</div>' +
      '<div class="calc-results__breakdown">' +
        '<div class="calc-result-row"><span class="calc-result-row__label">Gross Income</span><span class="calc-result-row__value">' + formatRWF(result.gross) + '</span></div>' +
        '<div class="calc-result-row"><span class="calc-result-row__label">NSSF Contribution</span><span class="calc-result-row__value">-' + formatRWF(result.nssf) + '</span></div>' +
        '<div class="calc-result-row"><span class="calc-result-row__label">Dependent Exemption</span><span class="calc-result-row__value">-' + formatRWF(result.depExemption) + '</span></div>' +
        '<div class="calc-result-row"><span class="calc-result-row__label">Taxable Income</span><span class="calc-result-row__value">' + formatRWF(result.taxableIncome) + '</span></div>' +
        '<div class="calc-result-row calc-result-row--total"><span class="calc-result-row__label">Income Tax (PAYE)</span><span class="calc-result-row__value">-' + formatRWF(result.tax) + '</span></div>' +
        '<div class="calc-result-row"><span class="calc-result-row__label">Effective Tax Rate</span><span class="calc-result-row__value">' + result.effectiveRate.toFixed(1) + '%</span></div>' +
      '</div>' +
      '<div class="calc-results__brackets">' +
        '<h4>Tax Breakdown by Bracket</h4>' +
        bracketsHTML +
      '</div>';
    lucide.createIcons();
  }

  function bindCalc() {
    var tabs = document.querySelectorAll('.calc-type-tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        calcType = tab.dataset.type;
      });
    });

    var btn = document.getElementById('calcBtn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var grossInput = document.getElementById('grossIncome');
      var nssfInput = document.getElementById('nssf');
      var depSelect = document.getElementById('dependents');
      if (!grossInput || !grossInput.value || parseFloat(grossInput.value) <= 0) {
        grossInput.style.borderColor = 'var(--red)';
        setTimeout(function() { grossInput.style.borderColor = ''; }, 2000);
        return;
      }
      var gross = parseFloat(grossInput.value);
      var nssf = parseFloat(nssfInput.value) || 0;
      var deps = parseInt(depSelect.value) || 0;

      if (calcType === 'annual') {
        gross = gross / 12;
        nssf = nssf / 12;
      }

      var result = calculateTax(gross, nssf, deps);

      if (calcType === 'annual') {
        result.gross *= 12;
        result.nssf *= 12;
        result.depExemption *= 12;
        result.taxableIncome *= 12;
        result.tax *= 12;
        result.netPay *= 12;
      }

      renderResults(result);
    });
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
      btn.addEventListener('click', function(e) { e.stopPropagation(); var isOpen = btn.getAttribute('aria-expanded') === 'true'; closeAllDropdowns(); if (!isOpen) { btn.setAttribute('aria-expanded', 'true'); dropdown.classList.add('show'); } });
      item.addEventListener('mouseenter', function() { if (window.innerWidth > 768) { closeAllDropdowns(); btn.setAttribute('aria-expanded', 'true'); dropdown.classList.add('show'); } });
      item.addEventListener('mouseleave', function() { if (window.innerWidth > 768) { btn.setAttribute('aria-expanded', 'false'); dropdown.classList.remove('show'); } });
    });
    document.addEventListener('click', closeAllDropdowns);
  }
  function closeAllDropdowns() {
    document.querySelectorAll('.nav-item.has-dropdown').forEach(function(item) {
      var btn = item.querySelector('.nav-link'); var dropdown = item.querySelector('.dropdown');
      if (btn) btn.setAttribute('aria-expanded', 'false'); if (dropdown) dropdown.classList.remove('show');
    });
  }

  function bindMobileMenu() {
    var toggle = document.getElementById('mobileMenuToggle'); var overlay = document.getElementById('mobileOverlay'); var close = document.getElementById('mobileNavClose');
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
      '<li><a href="publications.html">' + (currentLang === 'rw' ? 'Inyandiko' : 'Publications') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="news.html">' + (currentLang === 'rw' ? 'Amakuru' : 'News') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="about.html">' + (currentLang === 'rw' ? 'Tumenye' : 'About') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="calculator.html" class="active">' + (currentLang === 'rw' ? 'Kubara Umusoro' : 'Tax Calculator') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="contact.html">' + (currentLang === 'rw' ? 'Twandikire' : 'Contact') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>';
    lucide.createIcons();
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
