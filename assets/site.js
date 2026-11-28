/* Zaman Games — shared behaviour for the multi-page site */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '×' : '☰';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.textContent = '☰'; toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---- systems ticker (home) ---- */
  var systems = [["أتاري 2600", "#e8833a"], ["سيجا جينيسيس", "#3b82f6"], ["بلايستيشن 1", "#a78bfa"], ["بلايستيشن 2", "#2563eb"], ["بلايستيشن 3", "#64748b"], ["PSP", "#22c55e"], ["نينتندو سويتش", "#ef4444"], ["جيم بوي أدفانس", "#f59e0b"], ["سوبر نينتندو", "#a3a3a3"], ["نينتندو NES", "#dc2626"], ["نينتندو DS", "#14b8a6"], ["نينتندو 3DS", "#f43f5e"], ["دريم كاست", "#fb923c"], ["نينتندو 64", "#6366f1"], ["إكس بوكس 360", "#107c10"]];
  var track = document.getElementById('tickerTrack');
  if (track) {
    var html = '';
    for (var r = 0; r < 2; r++) { systems.forEach(function (s) { html += '<span class="tk-item" dir="rtl"><span class="dot" style="background:' + s[1] + '"></span>' + s[0] + '</span>'; }); }
    track.innerHTML = html;
  }

  /* ---- covers strip (home) ---- */
  var covers = ["2600", "genesis", "super_nintendo_entertainment_system", "playstation", "playstation_2", "playstation_portable", "nintendo_64", "nintendo_ds", "game_boy_advance", "dreamcast"];
  var coversTrack = document.getElementById('coversTrack');
  if (coversTrack) {
    var chtml = '';
    for (var c2 = 0; c2 < 2; c2++) { covers.forEach(function (c) { chtml += '<img src="assets/covers/' + c + '.webp" alt="غلاف لعبة - مثال" loading="lazy">'; }); }
    coversTrack.innerHTML = chtml;
  }

  /* ---- consoles library (library page) ---- */
  var grid = document.getElementById('conGrid');
  if (grid) {

  var CONSOLES = [
    { id: 'ps1', en: 'PlayStation', ar: 'بلايستيشن 1', emu: 'DuckStation', c: '#a78bfa', st: 'external', exts: ['cue', 'chd', 'iso', 'pbp', 'm3u', 'bin'], cover: 'playstation.webp', dl: 'https://chdstation.com/ps1-chd', g: 'محتاج ملف BIOS من جهازك إنت (اسمه بيبدأ بـ scph). حطّه في فولدر BIOS من جوّه البرنامج وهو يراجعه بالبصمة ويقولك لو ناقص. نصيحة: حوّل أقراصك لـ CHD من صفحة التحويل — أخف وأرتب.' },
    { id: 'ps2', en: 'PlayStation 2', ar: 'بلايستيشن 2', emu: 'PCSX2', c: '#2563eb', st: 'external', exts: ['iso', 'chd', 'cso', 'gz', 'bin'], cover: 'playstation_2.webp', dl: 'https://chdstation.com/ps2-chd', g: 'محتاج BIOS من جهازك إنت. ولو لسه مجهّزش، في وضع بديل بمحاكي Play! بيشتغل من غير BIOS — البرنامج بيقدّمهولك لو حبيت.' },
    { id: 'ps3', en: 'PlayStation 3', ar: 'بلايستيشن 3', emu: 'RPCS3', c: '#64748b', st: 'firmware', exts: ['iso'], cover: null, dl: 'https://romsfun.com/roms/ps3/', g: 'RPCS3 محتاج فيرموير PS3 الرسمي، وده بيتثبت من جوّه RPCS3 نفسه بملف من عندك إنت — البرنامج مبيتعاملش معاه خالص. الألعاب بصيغة ISO.' },
    { id: 'psp', en: 'PSP', ar: 'بلايستيشن بورتابل', emu: 'PPSSPP', c: '#22c55e', st: 'none', exts: ['iso', 'cso', 'pbp'], cover: 'playstation_portable.webp', dl: 'https://chdstation.com/psp-chd', g: 'جاهز من أول ثانية من غير أي ملفات. صيغة cso المضغوطة شغالة برضه لو عايز توفّر مساحة.' },
    { id: 'nes', en: 'NINTENDO NES', ar: 'نينتندو NES', emu: 'RetroArch · FCEUmm', c: '#dc2626', st: 'none', exts: ['nes', 'zip', '7z'], cover: 'nes.webp', dl: 'https://romsfun.com/roms/nes/', g: 'من غير أي ملفات — حط الألعاب والعب.' },
    { id: 'snes', en: 'SUPER NINTENDO', ar: 'سوبر نينتندو', emu: 'RetroArch · Snes9x', c: '#a3a3a3', st: 'none', exts: ['sfc', 'smc', 'zip', '7z'], cover: 'super_nintendo_entertainment_system.webp', dl: 'https://romsfun.com/roms/super-nintendo/', g: 'من غير أي ملفات. sfc وsmc شغالين.' },
    { id: 'n64', en: 'NINTENDO 64', ar: 'نينتندو 64', emu: 'RetroArch · Mupen64Plus-Next', c: '#6366f1', st: 'none', exts: ['n64', 'z64', 'v64'], cover: 'nintendo_64.webp', dl: 'https://romsfun.com/roms/nintendo-64/', g: 'من غير أي ملفات. مهم: خلي الألعاب مفكوكة (n64/z64/v64) — الملفات المضغوطة zip مش مضمونة هنا.' },
    { id: 'gba', en: 'GAME BOY ADVANCE', ar: 'جيم بوي أدفانس', emu: 'mGBA', c: '#f59e0b', st: 'builtin', exts: ['gba', 'zip', '7z'], cover: 'game_boy_advance.webp', dl: 'https://romsfun.com/roms/game-boy-advance/', g: 'بيشتغل من غير أي حاجة. في ملف BIOS اختياري لعشّاق الدقة الكاملة.' },
    { id: 'ds', en: 'NINTENDO DS', ar: 'نينتندو DS', emu: 'melonDS', c: '#14b8a6', st: 'builtin', exts: ['nds', 'zip'], cover: 'nintendo_ds.webp', dl: 'https://www.romsgames.net/roms/nintendo-ds/', g: 'بيشتغل على طول، وملفات BIOS الاختيارية (bios7 وbios9 وfirmware) بتحسّن التوافق مع بعض الألعاب.' },
    { id: '3ds', en: 'NINTENDO 3DS', ar: 'نينتندو 3DS', emu: 'Azahar', c: '#f43f5e', st: 'none', exts: ['3ds', '3dsx', 'cci', 'cxi', 'cia'], cover: null, dl: 'https://romsfun.com/roms/nintendo-3ds/', g: 'من غير أي ملفات — حط الألعاب والعب.' },
    { id: 'switch', en: 'NINTENDO SWITCH', ar: 'نينتندو سويتش', emu: 'Eden', c: '#ef4444', st: 'firmware', exts: ['nsp', 'xci'], cover: null, dl: 'https://www.romspedia.com/roms/nintendo-switch', g: 'محتاج مفاتيح وفيرموير من جهازك إنت (prod.keys وtitle.keys). البرنامج بيرشدك لمكانهم وبيأكدلك إنهم سليمين — ومبيجيبهمش من أي مكان.' },
    { id: 'genesis', en: 'SEGA GENESIS', ar: 'سيجا جينيسيس', emu: 'RetroArch · Genesis Plus GX', c: '#3b82f6', st: 'none', exts: ['md', 'gen', 'smd', 'bin', 'zip', '7z'], cover: 'genesis.webp', dl: 'https://romsfun.com/roms/sega-genesis/', g: 'شغال من غير أي ملفات. صيغ md وbin وsmd كلها متغطية.' },
    { id: 'dc', en: 'DREAMCAST', ar: 'دريم كاست', emu: 'Flycast', c: '#fb923c', st: 'builtin', exts: ['gdi', 'cdi', 'chd', 'cue'], cover: 'dreamcast.webp', dl: 'https://romsfun.com/roms/dreamcast/', g: 'بيشتغل على طول، وملفات BIOS الاختيارية (dc_boot وdc_flash) بتدي توافق أعلى مع بعض الألعاب.' },
    { id: 'atari', en: 'ATARI 2600', ar: 'أتاري 2600', emu: 'Stella', c: '#e8833a', st: 'none', exts: ['a26', 'bin', 'zip', '7z'], cover: '2600.webp', dl: 'https://www.romsgames.net/roms/atari-2600/', g: 'أقدم جهاز في العيلة وأخفهم. مفيش أي ملفات مطلوبة — حط الألعاب في الفولدر والعب على طول.' },
    { id: 'xbox360', en: 'XBOX 360', ar: 'إكس بوكس 360', emu: 'Xenia', c: '#107c10', st: 'none', exts: ['iso', 'xex', 'zar'], cover: null, dl: 'https://romsfun.com/roms/xbox-360/', g: 'من غير أي ملفات نهائي. ملحوظة: اسم ملف اللعبة ميفضلش فيه نقط زيادة قبل الامتداد — Xenia بترفض الأسماء دي.' }
  ];
  var STL = {
    none: ['var(--ok)', 'من غير ملفات زيادة'],
    builtin: ['var(--amber)', 'بيشتغل + BIOS اختياري'],
    external: ['var(--warn)', 'محتاج BIOS من جهازك'],
    firmware: ['var(--warn)', 'محتاج فيرموير/مفاتيح']
  };
  var gh = '';
  CONSOLES.forEach(function (x, i) {
    gh += '<div class="con reveal" data-i="' + i + '" style="--c:' + x.c + '" role="button" tabindex="0" aria-label="' + x.ar + ' — اعرض التفاصيل وقسم التحميل"><div class="con-art"><img class="con-shot" src="assets/consoles/' + x.id + '.webp" alt="" loading="lazy"></div><div class="con-logo"><img src="assets/devices/' + x.id + '.webp" alt="" loading="lazy"></div><div class="wm2" dir="ltr">' + x.en + '</div><div class="ar">' + x.ar + '</div></div>';
  });
  grid.innerHTML = gh;

  var modal = document.getElementById('conModal');
  var mbody = document.getElementById('conModalBody');
  function openCon(i) {
    var x = CONSOLES[i]; if (!x) return;
    var ex = ''; x.exts.forEach(function (e) { ex += '<code>' + e + '</code>'; });
    var cov = x.cover ? '<img class="m-cover" src="assets/covers/' + x.cover + '" alt="غلاف مثال">' : '<div class="m-cover ph" style="color:' + x.c + '" dir="ltr">' + x.en + '</div>';
    var dlName = 'موقع خارجي';
    if (x.dl.indexOf('chdstation.com') > -1) dlName = 'CHD Station';
    else if (x.dl.indexOf('romsfun.com') > -1) dlName = 'ROMSFUN';
    else if (x.dl.indexOf('romsgames.net') > -1) dlName = 'RomsGames';
    else if (x.dl.indexOf('romspedia.com') > -1) dlName = 'Romspedia';
    var dl = '<div class="m-actions"><a class="btn btn-p m-dl" href="' + x.dl + '" target="_blank" rel="noopener noreferrer">افتح قسم التحميل</a>'
      + '<small>قسم التحميل على ' + dlName + ' — رابط خارجي، فتحه وتحميله على مسؤوليتك، والموقع مش بيستضيف أي ملفات ألعاب.</small></div>';
    mbody.innerHTML = '<div class="m-head"><div class="m-visual"><div class="con-art"><img class="con-shot" src="assets/consoles/' + x.id + '.webp" alt=""></div><div class="con-logo"><img src="assets/devices/' + x.id + '.webp" alt=""></div></div><div class="wm3" style="color:' + x.c + '" dir="ltr">' + x.en + '</div><div><div style="font-weight:900;font-size:19px">' + x.ar + '</div><span class="st" style="margin-top:6px"><span class="dot" style="background:' + STL[x.st][0] + '"></span>' + STL[x.st][1] + '</span></div></div>'
      + '<div class="m-body">' + cov + '<div class="m-rows">'
      + '<div class="m-row"><b>المحاكي</b><span class="v" dir="ltr" style="text-align:end">' + x.emu + '</span></div>'
      + '<div class="m-row"><b>التثبيت</b><span class="v">بضغطة واحدة من جوّه البرنامج، من الموقع الرسمي للمحاكي وبمراجعة بصمة الملف</span></div>'
      + '<div class="m-row"><b>صيغ الألعاب</b><span class="v">' + ex + '</span></div>'
      + '</div></div><div class="m-guide"><b>نصايح التشغيل:</b> ' + x.g + '</div>' + dl;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCon() { modal.classList.remove('open'); document.body.style.overflow = ''; }
  grid.addEventListener('click', function (e) {
    var t = e.target.closest('.con');
    if (t) { openCon(+t.dataset.i); }
  });
  grid.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('con')) { e.preventDefault(); openCon(+e.target.dataset.i); }
  });
  document.getElementById('conModalX').addEventListener('click', closeCon);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeCon(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCon(); });
  // Deep links such as ?modal=4 are intentionally ignored: every card opens
  // from a real user click and shows its own external download section.
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (/snap/.test(location.search) || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('on'); });
    if (/snap/.test(location.search)) {
      var st = document.createElement('style');
      st.textContent = '*{transition:none!important;animation:none!important}';
      document.head.appendChild(st);
    }
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
