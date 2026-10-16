(function() {
  'use strict';

  var currentLang = 'en';
  var activeFilter = 'all';
  var visibleCount = 6;

  function init() {
    lucide.createIcons();
    renderFeatured();
    renderNews();
    renderEvents();
    renderMobileNav();
    bindFilters();
    bindSearch();
    bindLoadMore();
    bindSubscribe();
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
    renderFeatured();
    renderNews();
    renderEvents();
    renderMobileNav();
  }

  function renderFeatured() {
    var card = document.getElementById('featuredCard');
    if (!card) return;
    var featured = newsArticles.find(function(a) { return a.featured; });
    if (!featured) return;
    var title = currentLang === 'rw' ? featured.titleRw : featured.title;
    var excerpt = currentLang === 'rw' ? featured.excerptRw : featured.excerpt;
    card.innerHTML =
      '<div class="featured-card__image"><i class="lucide" data-lucide="' + featured.icon + '"></i></div>' +
      '<div class="featured-card__content">' +
        '<span class="featured-card__badge">' + featured.category + '</span>' +
        '<h2>' + title + '</h2>' +
        '<p>' + excerpt + '</p>' +
        '<span class="featured-card__meta">' + featured.date + '</span>' +
      '</div>';
    lucide.createIcons();
  }

  function getFilteredNews() {
    return newsArticles.filter(function(a) {
      if (activeFilter !== 'all' && a.type !== activeFilter) return false;
      return true;
    });
  }

  function renderNews() {
    var grid = document.getElementById('newsGrid');
    var empty = document.getElementById('newsEmpty');
    if (!grid) return;
    var filtered = getFilteredNews();
    var visible = filtered.slice(0, visibleCount);
    if (visible.length === 0) {
      grid.innerHTML = '';
      empty.hidden = false;
      lucide.createIcons();
      return;
    }
    empty.hidden = true;
    grid.innerHTML = visible.map(function(a) {
      var title = currentLang === 'rw' ? a.titleRw : a.title;
      var excerpt = currentLang === 'rw' ? a.excerptRw : a.excerpt;
      var badgeClass = 'news-card__badge--' + a.type;
      var badgeLabel = a.type === 'press' ? 'Press Release' : a.type === 'announcement' ? 'Announcement' : 'Event';
      return '<div class="news-card">' +
        '<div class="news-card__image"><i class="lucide" data-lucide="' + a.icon + '"></i></div>' +
        '<div class="news-card__body">' +
          '<span class="news-card__badge ' + badgeClass + '">' + badgeLabel + '</span>' +
          '<h3>' + title + '</h3>' +
          '<p>' + excerpt + '</p>' +
          '<span class="news-card__meta">' + a.date + ' &middot; ' + a.category + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
    lucide.createIcons();
  }

  function renderEvents() {
    var list = document.getElementById('eventsList');
    if (!list) return;
    list.innerHTML = newsEvents.map(function(e) {
      var title = currentLang === 'rw' ? e.titleRw : e.title;
      var desc = currentLang === 'rw' ? e.descRw : e.desc;
      var d = new Date(e.date);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return '<div class="event-item">' +
        '<div class="event-item__date"><div class="event-item__date__day">' + d.getDate() + '</div><div class="event-item__date__month">' + months[d.getMonth()] + '</div></div>' +
        '<div class="event-item__content">' +
          '<h3>' + title + '</h3>' +
          '<p>' + desc + '</p>' +
          '<div class="event-item__meta"><span><i class="lucide" data-lucide="clock" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i>' + e.time + '</span><span><i class="lucide" data-lucide="map-pin" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i>' + e.location + '</span></div>' +
        '</div>' +
      '</div>';
    }).join('');
    lucide.createIcons();
  }

  function bindFilters() {
    document.querySelectorAll('.news-filter-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.news-filter-tab').forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        activeFilter = tab.dataset.filter;
        visibleCount = 6;
        renderNews();
      });
    });
  }

  function bindSearch() {
    var toggle = document.getElementById('searchToggle');
    var overlay = document.getElementById('searchOverlay');
    var close = document.getElementById('searchClose');
    var input = document.getElementById('searchInput');
    var results = document.getElementById('searchResults');
    var suggestions = document.getElementById('searchSuggestions');
    var newsInput = document.getElementById('newsSearchInput');
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
      var matches = newsArticles.filter(function(a) {
        return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      }).slice(0, 5);
      if (matches.length === 0) { results.innerHTML = '<p style="padding:16px;color:var(--text-muted);font-size:14px;">' + t('search_no_results') + '</p>'; }
      else {
        results.innerHTML = matches.map(function(m) {
          var title = currentLang === 'rw' ? m.titleRw : m.title;
          return '<a href="#" class="search-result-item"><div class="search-result-item__icon"><i class="lucide" data-lucide="' + m.icon + '"></i></div><div class="search-result-item__text"><h4>' + title + '</h4><p>' + m.date + '</p></div></a>';
        }).join('');
      }
      results.hidden = false; suggestions.hidden = true; lucide.createIcons();
    });
    if (newsInput) {
      newsInput.addEventListener('input', function() {
        var q = newsInput.value.trim().toLowerCase();
        if (q.length < 2) { renderNews(); return; }
        var grid = document.getElementById('newsGrid');
        var empty = document.getElementById('newsEmpty');
        var matches = newsArticles.filter(function(a) {
          return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
        });
        if (matches.length === 0) { grid.innerHTML = ''; empty.hidden = false; }
        else {
          empty.hidden = true;
          grid.innerHTML = matches.map(function(a) {
            var title = currentLang === 'rw' ? a.titleRw : a.title;
            var excerpt = currentLang === 'rw' ? a.excerptRw : a.excerpt;
            var badgeClass = 'news-card__badge--' + a.type;
            var badgeLabel = a.type === 'press' ? 'Press Release' : a.type === 'announcement' ? 'Announcement' : 'Event';
            return '<div class="news-card"><div class="news-card__image"><i class="lucide" data-lucide="' + a.icon + '"></i></div><div class="news-card__body"><span class="news-card__badge ' + badgeClass + '">' + badgeLabel + '</span><h3>' + title + '</h3><p>' + excerpt + '</p><span class="news-card__meta">' + a.date + '</span></div></div>';
          }).join('');
        }
        lucide.createIcons();
      });
    }
    document.querySelectorAll('.search-tag').forEach(function(tag) {
      tag.addEventListener('click', function() { input.value = tag.dataset.query; input.dispatchEvent(new Event('input')); });
    });
  }

  function bindLoadMore() {
    var btn = document.getElementById('loadMoreBtn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      visibleCount += 3;
      renderNews();
      var filtered = getFilteredNews();
      if (visibleCount >= filtered.length) btn.style.display = 'none';
    });
  }

  function bindSubscribe() {
    var form = document.getElementById('subscribeForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var orig = btn.innerHTML;
      btn.innerHTML = '<i class="lucide" data-lucide="check"></i> Subscribed!';
      btn.style.background = '#059669';
      lucide.createIcons();
      setTimeout(function() { form.reset(); btn.innerHTML = orig; btn.style.background = ''; lucide.createIcons(); }, 2500);
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
      '<li><a href="news.html" class="active">' + (currentLang === 'rw' ? 'Amakuru' : 'News') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="about.html">' + (currentLang === 'rw' ? 'Tumenye' : 'About') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>' +
      '<li><a href="contact.html">' + (currentLang === 'rw' ? 'Twandikire' : 'Contact') + ' <i class="lucide" data-lucide="chevron-right"></i></a></li>';
    lucide.createIcons();
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
