/* Panjika – install help. iPhone/iPad: "Add to Home Screen" steps. Android browsers: APK download.
   Shown only when the page is open in a browser on iOS, never when launched from the home-screen icon.
   Add ?ioshint=1 or ?androidhint=1 to the URL to preview either one on any device. */
(function () {
  var force = /[?&]ioshint=1/.test(location.search);
  var ua = navigator.userAgent || "";
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var standalone = navigator.standalone === true ||
    (window.matchMedia && matchMedia("(display-mode: standalone)").matches);
  var forceAndroid = /[?&]androidhint=1/.test(location.search);
  var isAndroid = forceAndroid || (!force && /Android/i.test(ua) && !/; wv\)/.test(ua));
  if (!force && !isAndroid && (!isIOS || standalone)) return;
  if (isAndroid && standalone && !forceAndroid) return;

  var KEY = isAndroid ? "panjika-android-hint-hidden-until" : "panjika-ios-hint-hidden-until";
  try { if (!force && !forceAndroid && Date.now() < +(localStorage.getItem(KEY) || 0)) return; } catch (e) {}

  var notSafari = /CriOS|FxiOS|EdgiOS|FBAN|FBAV|Instagram|Line\//.test(ua);
  var share = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
  var plus = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/></svg>';

  var css = '' +
    '#pj-ios{position:fixed;inset:0;z-index:1000;display:flex;align-items:flex-end;justify-content:center;font-family:var(--font,system-ui);}' +
    '#pj-ios .bd{position:absolute;inset:0;background:rgba(0,0,0,.45);opacity:0;transition:opacity .25s}' +
    '#pj-ios .sh{position:relative;width:100%;max-width:480px;background:var(--card,#fff);color:var(--ink,#181B2E);border-radius:20px 20px 0 0;' +
      'padding:18px 20px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -6px 30px rgba(0,0,0,.25);transform:translateY(100%);transition:transform .3s ease}' +
    '#pj-ios.on .bd{opacity:1}#pj-ios.on .sh{transform:none}' +
    '#pj-ios .gr{width:40px;height:5px;border-radius:3px;background:var(--line,#E3E5F0);margin:0 auto 14px}' +
    '#pj-ios .hd{display:flex;gap:12px;align-items:center;margin-bottom:12px}' +
    '#pj-ios .hd img{width:48px;height:48px;border-radius:12px;flex:none}' +
    '#pj-ios h2{font-size:18px;margin:0;line-height:1.25}#pj-ios .en{font-size:12.5px;color:var(--muted,#5A5F78);font-weight:400}' +
    '#pj-ios ol{list-style:none;margin:0;padding:0}' +
    '#pj-ios li{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid var(--line,#E3E5F0);font-size:15px;line-height:1.35}' +
    '#pj-ios .n{flex:none;width:24px;height:24px;border-radius:50%;background:var(--accent-soft,#E4E7FA);color:var(--accent,#2B3BA6);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;margin-top:1px}' +
    '#pj-ios .ic{display:inline-flex;vertical-align:-4px;color:var(--accent,#2B3BA6);margin:0 2px}' +
    '#pj-ios b{font-weight:700}' +
    '#pj-ios .nt{font-size:13px;color:var(--muted,#5A5F78);background:var(--soft,#F0F1F8);border-radius:10px;padding:8px 10px;margin:6px 0 12px}' +
    '#pj-ios button{width:100%;border:0;border-radius:12px;padding:13px;font:inherit;font-size:16px;font-weight:700;background:var(--accent,#2B3BA6);color:var(--accent-ink,#fff);cursor:pointer}' +
    '#pj-ios a.dl{display:block;text-align:center;text-decoration:none;border-radius:12px;padding:13px;font-size:16px;font-weight:700;background:var(--accent,#2B3BA6);color:var(--accent-ink,#fff);margin:4px 0 10px}' +
    '#pj-ios.and button.ok{background:var(--soft,#F0F1F8);color:var(--ink,#181B2E)}' +
    '#pj-ios .x{position:absolute;top:10px;right:12px;width:32px;height:32px;padding:0;border-radius:50%;background:var(--soft,#F0F1F8);color:var(--muted,#5A5F78);font-size:18px;font-weight:400}';

  function build() {
    if (document.getElementById("pj-ios")) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement("div"); d.id = "pj-ios"; if (isAndroid) d.className = "and"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true");
    var dl = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-4px;margin-right:6px"><path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>';
    d.innerHTML = isAndroid ?
      '<div class="bd"></div><div class="sh">' +
      '<button class="x" aria-label="बंद करें / Close">×</button>' +
      '<div class="gr"></div>' +
      '<div class="hd"><img src="apple-touch-icon.png" alt=""><div><h2>पंजिका Android ऐप डाउनलोड करें</h2>' +
      '<div class="en">Get the Panjika Android app – works offline</div></div></div>' +
      '<a class="dl" href="Panjika.apk" download="Panjika.apk">' + dl + 'APK डाउनलोड करें · Download</a>' +
      '<ol>' +
      '<li><span class="n">1</span><span>डाउनलोड होने पर फ़ाइल <b>खोलें</b>' +
        '<br><span class="en">When the download finishes, tap the file to open it. If Chrome warns, tap “Download anyway”.</span></span></li>' +
      '<li><span class="n">2</span><span>पूछे तो <b>Settings</b> में जाकर <b>इस स्रोत से अनुमति दें</b> चालू करें' +
        '<br><span class="en">If asked, tap Settings and turn on “Allow from this source”, then go back.</span></span></li>' +
      '<li><span class="n">3</span><span><b>Install</b> दबाएँ, फिर पंजिका ऐप खोलें' +
        '<br><span class="en">Tap Install, then open Panjika from your apps. (Android 7.0 or newer)</span></span></li>' +
      '</ol><div style="height:12px"></div>' +
      '<button class="ok">बाद में · Later</button></div>'
    :
      '<div class="bd"></div><div class="sh">' +
      '<button class="x" aria-label="बंद करें / Close">×</button>' +
      '<div class="gr"></div>' +
      '<div class="hd"><img src="apple-touch-icon.png" alt=""><div><h2>पंजिका को ऐप की तरह इस्तेमाल करें</h2>' +
      '<div class="en">Use Panjika as an app – works offline too</div></div></div>' +
      '<ol>' +
      '<li><span class="n">1</span><span><b>Share</b> बटन <span class="ic">' + share + '</span> दबाएँ' +
        '<br><span class="en">Tap the Share button. Don’t see it? Tap <b>•••</b> first.</span></span></li>' +
      '<li><span class="n">2</span><span><b>होम स्क्रीन में जोड़ें</b> <span class="ic">' + plus + '</span> चुनें' +
        '<br><span class="en">Choose “Add to Home Screen” (scroll down if needed)</span></span></li>' +
      '<li><span class="n">3</span><span>ऊपर दाईं ओर <b>जोड़ें</b> दबाएँ' +
        '<br><span class="en">Tap “Add”. Then open Panjika from its home-screen icon.</span></span></li>' +
      '</ol>' +
      (notSafari ? '<div class="nt">यह विकल्प न मिले तो यह लिंक <b>Safari</b> में खोलें।<br>If you can’t find it, open this link in Safari.</div>' : '<div style="height:12px"></div>') +
      '<button class="ok">समझ गया · Got it</button></div>';
    document.body.appendChild(d);
    function close() {
      try { localStorage.setItem(KEY, String(Date.now() + 7 * 864e5)); } catch (e) {}
      d.classList.remove("on"); setTimeout(function () { d.remove(); }, 300);
    }
    d.querySelector(".ok").onclick = close; d.querySelector(".x").onclick = close; d.querySelector(".bd").onclick = close;
    requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add("on"); }); });
  }
  function start() { setTimeout(build, 1200); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
