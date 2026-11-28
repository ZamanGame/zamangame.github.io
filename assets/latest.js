/*
 * يخلي أزرار التحميل تابع آخر إصدار على GitHub.
 * بينده على GitHub API، ولو مفيش نت أو حصل خطأ، الروابط الثابتة اللي في الصفحة تفضل شغالة زي ما هي.
 * الزرار بيلاقي ملف ZamanGames-Windows-v<version>.zip بالاسم.
 * مفيش حجم صفري أو فاضي بيظهر أبدًا: لو الحجم مش معروف، مكانه بيختفي.
 */
(function () {
  'use strict';

  var API = 'https://api.github.com/repos/ZamanGame/zamangames-releases/releases/latest';
  function sizeLabel(bytes) {
    if (!bytes || !(bytes > 0)) return '';
    var mb = Math.round(bytes / 1000000);
    if (!(mb > 0)) return '';
    return String(mb) + ' ميجا';
  }

  function setText(selector, text) {
    if (!text) return;
    document.querySelectorAll(selector).forEach(function (el) { el.textContent = text; });
  }

  function setSize(selector, bytes) {
    var label = sizeLabel(bytes);
    document.querySelectorAll(selector).forEach(function (el) {
      var wrap = el.closest('.dl-size') || el;
      if (label) {
        el.textContent = label;
        wrap.style.display = '';
      } else {
        wrap.style.display = 'none';
      }
    });
  }

  function setHrefs(selector, url) {
    if (!url) return;
    document.querySelectorAll(selector).forEach(function (el) { el.href = url; });
  }

  function pick(assets, re) {
    for (var i = 0; i < assets.length; i++) {
      if (re.test(assets[i].name || '')) return assets[i];
    }
    return null;
  }

  fetch(API, { headers: { 'Accept': 'application/vnd.github+json' } })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (rel) {
      if (!rel || !rel.tag_name || !rel.assets) return;
      var version = String(rel.tag_name).replace(/^v/, '');
      if (!version) return;
      setText('.js-ver-hero', 'آخر إصدار: ' + version);
      setText('.js-ver', 'الإصدار ' + version);

      // الإصدار الواحد: ZamanGames-Windows-v1.0.0.zip (ملف مضغوط، مش ملف البصمة)
      var app = pick(rel.assets, /^ZamanGames-Windows-v[^/]*\.zip$/i);
      if (app) {
        setHrefs('a.js-dl', app.browser_download_url);
        setSize('.js-size', app.size);
        setText('.js-ver', 'الإصدار ' + version);
      }
    })
    .catch(function () { /* الروابط الثابتة في الصفحة تفضل شغالة */ });
})();
