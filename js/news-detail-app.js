(function() {
  'use strict';

  var currentLang = 'en';

  function init() {
    lucide.createIcons();
    bindLanguage();
    bindAccessibility();
    renderNewsDetail();
  }

  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || (i18n.en[key]) || key;
  }

  function renderNewsDetail() {
    var container = document.getElementById('newsDetail');
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    var id = params.get('id');

    if (!type || !id) {
      container.innerHTML = '<div class="container"><p>Item not found.</p></div>';
      return;
    }

    var item = null;
    var itemType = '';

    if (type === 'announcement') {
      item = announcements.find(function(a) { return a.id === id; });
      itemType = 'Announcement';
    } else if (type === 'news') {
      item = news.find(function(n) { return n.id === id; });
      itemType = 'News';
    }

    if (!item) {
      container.innerHTML = '<div class="container"><p>Item not found.</p></div>';
      return;
    }

    var title = item.title[currentLang] || item.title.en;
    var desc = item.desc[currentLang] || item.desc.en;
    var fullDesc = item.fullDesc ? (item.fullDesc[currentLang] || item.fullDesc.en) : desc;
    var date = formatDate(item.date);

    var html = '<div class="container">';
    html += '<div class="news-detail__header">';
    html += '<span class="news-detail__type">' + itemType + '</span>';
    html += '<h1 class="news-detail__title">' + title + '</h1>';
    html += '<time class="news-detail__date" datetime="' + item.date + '">' + date + '</time>';
    html += '</div>';

    if (item.tag && type === 'announcement') {
      var tagText = item.tagText[currentLang] || item.tagText.en;
      html += '<span class="news-detail__tag news-detail__tag--' + item.tag + '">' + tagText + '</span>';
    }

    html += '<div class="news-detail__content">';
    html += '<p class="news-detail__summary">' + desc + '</p>';
    html += '<div class="news-detail__body">' + fullDesc + '</div>';
    html += '</div>';

    html += '<div class="news-detail__footer">';
    html += '<p>For more information, contact RRA support or visit your nearest RRA office.</p>';
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var months = currentLang === 'rw'
      ? ['Mutarama','Gashyantare','Werurwe','Mata','Gicurasi','Kamena','Nyakanga','Kanama','Nzeli','Ukwakira','Ugushyingo','Ukuboza']
      : ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  function bindLanguage() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentLang = btn.dataset.lang;
        document.documentElement.lang = currentLang === 'rw' ? 'rw' : 'en';
        renderNewsDetail();
      });
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
        contrastBtn.classList.toggle('active', !isHigh);
        lucide.createIcons();
      });
    }

    if (darkModeBtn) {
      darkModeBtn.addEventListener('click', function() {
        var html = document.documentElement;
        var isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        darkModeBtn.classList.toggle('active', !isDark);
        var icon = darkModeBtn.querySelector('.lucide, [data-lucide]');
        if (icon) icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
        lucide.createIcons();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
