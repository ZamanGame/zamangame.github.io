/*
 * يخلي أزرار التحميل تابع آخر إصدار على GitHub.
 * بينده على GitHub API، ولو مفيش نت أو حصل خطأ، الروابط الثابتة اللي في الصفحة تفضل شغالة زي ما هي.
 * زرار Lite بيلاقي ملف ZamanGames-Setup-<version>.exe، وزرار Full بيلاقي ZamanGames-Setup-Full-<version>.exe بالاسم.
 * لو آخر إصدار مفيهوش ملف Full لسه، زرار Full يفضل واقف على آخر نسخة Full معروفة (المكتوبة في الصفحة).
 * مفيش حجم صفري أو فاضي بيظهر أبدًا: لو الحجم مش معروف، مكانه بيختفي.
 */
(function () {
  'use strict';

  var API = 'https://api.github.com/repos/ZamanGame/zamangames-releases/releases/latest';
  var AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

  function arNum(s) {
    return String(s).replace(/[0-9]/g, function (d) { return AR_DIGITS[+d]; });
  }

  function sizeLabel(bytes) {
    if (!bytes || !(bytes > 0)) return '';
    var mb = Math.round(bytes / (1024 * 1024));
    if (!(mb > 0)) return '';
    return '· ' + arNum(mb) + ' ميجا';
  }

  function setText(selector, text) {
    if (!text) return;
    document.querySelectorAll(selector).forEach(function (el) { el.textContent = text; });
  }

  function setSize(selector, bytes) {
    var label = sizeLabel(bytes);
    document.querySelectorAll(selector).forEach(function (el) {
      if (label) {
        el.textContent = label;
      } else {
        el.style.display = 'none';
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

      // Lite: ZamanGames-Setup-1.4.2.exe (من غير Full في الاسم، ومش ملف البصمة)
      var lite = pick(rel.assets, /^ZamanGames-Setup-(?!Full)[^/]*\.exe$/i);
      if (lite) {
        setHrefs('a.js-dl', lite.browser_download_url);
        setSize('.js-size', lite.size);
        setText('.js-ver', 'الإصدار ' + version);
      }

      // Full: ZamanGames-Setup-Full-1.4.2.exe بالاسم؛ لو مش موجود في آخر إصدار، سيب الرابط الثابت زي ما هو
      var full = pick(rel.assets, /^ZamanGames-Setup-Full-[^/]*\.exe$/i);
      if (full) {
        setHrefs('a.js-dl-full', full.browser_download_url);
        setSize('.js-size-full', full.size);
        setText('.js-ver-full', 'الإصدار ' + version);
      }
    })
    .catch(function () { /* الروابط الثابتة في الصفحة تفضل شغالة */ });
})();
