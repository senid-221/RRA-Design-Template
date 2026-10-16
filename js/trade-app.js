(function() {
  'use strict';

  let activeSection = 'procedures';

  function init() {
    lucide.createIcons();
    renderTradeNav();
    renderTradeDetails();
    bindCalculator();
    bindProductSearch();
    bindSearch();
    bindAccessibility();
    bindDropdowns();
    bindMobileMenu();
    bindTradeNavClicks();
  }

  function renderTradeNav() {
    const grid = document.getElementById('tradeNavGrid');
    if (!grid) return;
    grid.innerHTML = tradeSections.map(s => `
      <a href="#${s.id}" class="service-nav-card ${s.id === activeSection ? 'active' : ''}" data-section="${s.id}">
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

  function renderTradeDetails() {
    const container = document.getElementById('tradeDetails');
    if (!container) return;
    container.innerHTML = tradeSections.map(s => {
      const isActive = s.id === activeSection;
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
            <div class="service-detail__full">
              ${s.content}
            </div>
          </div>
        </section>
      `;
    }).join('');
    lucide.createIcons();
  }

  function bindCalculator() {
    const btn = document.getElementById('calcBtn');
    if (!btn) return;
    btn.addEventListener('click', calculateDuties);
  }

  function calculateDuties() {
    const product = document.getElementById('calcProduct').value;
    const hs = document.getElementById('calcHS').value;
    const value = parseFloat(document.getElementById('calcValue').value);
    const origin = document.getElementById('calcOrigin').value;

    if (!value || value <= 0) {
      alert('Please enter a valid CIF value');
      return;
    }

    // Determine duty rate based on origin
    let dutyRate = 0.25; // Default 25%
    if (origin === 'eac') dutyRate = 0; // EAC goods are duty-free
    else if (origin === 'comesa' || origin === 'sadc') dutyRate = 0; // Preferential trade

    // Find product-specific rate if HS code provided
    if (hs) {
      const product = tradeProducts.find(p => p.hs.startsWith(hs));
      if (product) {
        dutyRate = parseFloat(product.duty) / 100;
      }
    }

    const importDuty = value * dutyRate;
    const taxableValue = value + importDuty;
    const vat = taxableValue * 0.18;
    const declarationFee = value * 0.005;
    const railwayLevy = value * 0.005;
    const total = importDuty + vat + declarationFee + railwayLevy;

    const results = document.getElementById('calcResults');
    const breakdown = document.getElementById('calcBreakdown');
    const totalEl = document.getElementById('calcTotal');

    breakdown.innerHTML = `
      <div class="calc-row">
        <span>CIF Value</span>
        <span>RWF ${value.toLocaleString()}</span>
      </div>
      <div class="calc-row">
        <span>Import Duty (${(dutyRate * 100).toFixed(0)}%)</span>
        <span>RWF ${importDuty.toLocaleString()}</span>
      </div>
      <div class="calc-row">
        <span>VAT (18%)</span>
        <span>RWF ${vat.toLocaleString()}</span>
      </div>
      <div class="calc-row">
        <span>Declaration Fee (0.5%)</span>
        <span>RWF ${declarationFee.toLocaleString()}</span>
      </div>
      <div class="calc-row">
        <span>Railway Levy (0.5%)</span>
        <span>RWF ${railwayLevy.toLocaleString()}</span>
      </div>
    `;

    totalEl.textContent = `RWF ${total.toLocaleString()}`;
    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function bindProductSearch() {
    const input = document.getElementById('productSearchInput');
    const results = document.getElementById('productResults');
    if (!input || !results) return;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.innerHTML = ''; return; }

      const matches = tradeProducts.filter(p =>
        p.name.toLowerCase().includes(q) || p.hs.includes(q)
      );

      if (matches.length === 0) {
        results.innerHTML = '<p class="no-results">No products found</p>';
      } else {
        results.innerHTML = `
          <table class="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>HS Code</th>
                <th>Duty</th>
                <th>VAT</th>
              </tr>
            </thead>
            <tbody>
              ${matches.map(p => `
                <tr>
                  <td>${p.name}</td>
                  <td><code>${p.hs}</code></td>
                  <td>${p.duty}</td>
                  <td>${p.vat}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    });
  }

  function bindTradeNavClicks() {
    document.querySelectorAll('.service-nav-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = card.dataset.section;
        activeSection = sectionId;
        document.querySelectorAll('.service-nav-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        document.querySelectorAll('.service-detail').forEach(d => d.classList.remove('active'));
        const detail = document.getElementById(sectionId);
        if (detail) {
          detail.classList.add('active');
          detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const section = tradeSections.find(s => s.id === hash);
      if (section) {
        activeSection = hash;
        renderTradeNav();
        renderTradeDetails();
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
      const matches = tradeProducts.filter(p => p.name.toLowerCase().includes(q) || p.hs.includes(q)).slice(0, 8);
      if (matches.length === 0) { results.innerHTML = '<p style="padding:16px;color:var(--text-muted);font-size:14px;">No products found</p>'; }
      else { results.innerHTML = matches.map(p => `<a href="#calculator" class="search-result-item"><div class="search-result-item__icon"><i class="lucide" data-lucide="package"></i></div><div class="search-result-item__text"><h4>${p.name}</h4><p>HS: ${p.hs} | Duty: ${p.duty}</p></div></a>`).join(''); }
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
