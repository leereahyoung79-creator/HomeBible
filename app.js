(function () {
  "use strict";

  var META = window.BIBLE_META;
  var DATA = window.BIBLE_DATA;
  var TRANSLATIONS = {
    std: { meta: window.BIBLE_META, data: window.BIBLE_DATA, label: "표준새번역" },
    easy: { meta: window.BIBLE_META_EASY, data: window.BIBLE_DATA_EASY, label: "쉬운성경" },
    gae: { meta: window.BIBLE_META_GAE, data: window.BIBLE_DATA_GAE, label: "개역개정" }
  };
  var TRANSLATION_KEY = "bible_write_translation_v1";
  var currentTranslation = "std";

  function loadTranslationPref() {
    try { return localStorage.getItem(TRANSLATION_KEY) || "std"; } catch (e) { return "std"; }
  }
  function saveTranslationPref(key) {
    try { localStorage.setItem(TRANSLATION_KEY, key); } catch (e) {}
  }
  function setTranslation(key) {
    if (!TRANSLATIONS[key]) key = "std";
    currentTranslation = key;
    META = TRANSLATIONS[key].meta;
    DATA = TRANSLATIONS[key].data;
    saveTranslationPref(key);
    if (els.translationSelect) els.translationSelect.value = key;
    if (els.readTranslationSelect) els.readTranslationSelect.value = key;
  }

  var TOTAL_VERSES = 31102;
  var PROFILES_KEY = "bible_write_profiles_v1";
  var CURRENT_USER_KEY = "bible_write_current_birth_v1";
  var ADMIN_PIN_KEY = "bible_write_admin_pin_v1";
  var SYNC_URL_KEY = "bible_write_sync_url_v1";
  var DEFAULT_SYNC_URL = "https://script.google.com/macros/s/AKfycbzYpFG6wJaR5eosRdu0-Df3q7M5EzqkqEZ8DRhoTjub69gp4yH3yWYQXIekMossFnFt/exec";
  var GRATITUDE_PRAYER_KEY = "bible_gratitude_prayer_v1";

  function getSyncUrl() {
    // 이 앱은 지정된 Google Apps Script 웹앱을 사용합니다.
    // 예전에 다른 주소가 localStorage에 남아 있어도 현재 주소를 우선합니다.
    return DEFAULT_SYNC_URL;
  }
  function setSyncUrl(url) {
    try { localStorage.setItem(SYNC_URL_KEY, url); } catch (e) {}
  }

  var els = {
    cover: document.getElementById("cover"),
    startBtn: document.getElementById("startBtn"),
    readBtn: document.getElementById("readBtn"),
    hymnBtn: document.getElementById("hymnBtn"),
    gratitudePrayerBtn: document.getElementById("gratitudePrayerBtn"),
    christianQuotesBtn: document.getElementById("christianQuotesBtn"),
    christianQuotesScreen: document.getElementById("christianQuotesScreen"),
    closeChristianQuotesBtn: document.getElementById("closeChristianQuotesBtn"),
    christianQuoteCategories: document.getElementById("christianQuoteCategories"),
    christianQuoteEmpty: document.getElementById("christianQuoteEmpty"),
    christianQuoteDetail: document.getElementById("christianQuoteDetail"),
    christianQuoteCategory: document.getElementById("christianQuoteCategory"),
    christianQuoteNumber: document.getElementById("christianQuoteNumber"),
    christianQuoteText: document.getElementById("christianQuoteText"),
    christianQuoteReflection: document.getElementById("christianQuoteReflection"),
    christianQuoteVerse: document.getElementById("christianQuoteVerse"),
    christianQuoteVerseText: document.getElementById("christianQuoteVerseText"),
    copyChristianQuoteBtn: document.getElementById("copyChristianQuoteBtn"),
    nextChristianQuoteBtn: document.getElementById("nextChristianQuoteBtn"),
    christianQuoteCopyStatus: document.getElementById("christianQuoteCopyStatus"),
    backChristianQuoteCategoriesBtn: document.getElementById("backChristianQuoteCategoriesBtn"),
    gratitudePrayerScreen: document.getElementById("gratitudePrayerScreen"),
    closeGratitudePrayerBtn: document.getElementById("closeGratitudePrayerBtn"),
    gratitudePrayerDate: document.getElementById("gratitudePrayerDate"),
    gratitude1: document.getElementById("gratitude1"),
    gratitude2: document.getElementById("gratitude2"),
    gratitude3: document.getElementById("gratitude3"),
    prayerInput: document.getElementById("prayerInput"),
    saveGratitudePrayerBtn: document.getElementById("saveGratitudePrayerBtn"),
    gratitudePrayerHomeBtn: document.getElementById("gratitudePrayerHomeBtn"),
    showGratitudeHistoryBtn: document.getElementById("showGratitudeHistoryBtn"),
    gratitudeHistory: document.getElementById("gratitudeHistory"),
    gratitudeHistoryList: document.getElementById("gratitudeHistoryList"),
    gratitudeHistoryCloseBtn: document.getElementById("gratitudeHistoryCloseBtn"),
    gratitudePrayerSaved: document.getElementById("gratitudePrayerSaved"),
    todayVerseCard: document.getElementById("todayVerseCard"),
    todayVerseDate: document.getElementById("todayVerseDate"),
    todayVerseText: document.getElementById("todayVerseText"),
    todayVerseRef: document.getElementById("todayVerseRef"),

    hymnScreen: document.getElementById("hymnScreen"),
    closeHymnBtn: document.getElementById("closeHymnBtn"),
    hymnSearchInput: document.getElementById("hymnSearchInput"),
    hymnSearchSubmit: document.getElementById("hymnSearchSubmit"),
    hymnRange: document.getElementById("hymnRange"),
    hymnSearchStatus: document.getElementById("hymnSearchStatus"),
    hymnResults: document.getElementById("hymnResults"),
    hymnViewer: document.getElementById("hymnViewer"),
    hymnViewerTitle: document.getElementById("hymnViewerTitle"),
    hymnViewerClose: document.getElementById("hymnViewerClose"),
    hymnFrame: document.getElementById("hymnFrame"),

    readScreen: document.getElementById("readScreen"),
    readHomeBtn: document.getElementById("readHomeBtn"),
    readTestamentSelect: document.getElementById("readTestamentSelect"),
    readBookSelect: document.getElementById("readBookSelect"),
    bibleBookSearchBtn: document.getElementById("bibleBookSearchBtn"),
    bibleBookSearchScreen: document.getElementById("bibleBookSearchScreen"),
    closeBibleBookSearchBtn: document.getElementById("closeBibleBookSearchBtn"),
    bibleBookSearchInput: document.getElementById("bibleBookSearchInput"),
    bibleBookSearchSubmit: document.getElementById("bibleBookSearchSubmit"),
    bibleBookSearchStatus: document.getElementById("bibleBookSearchStatus"),
    bibleBookSearchResults: document.getElementById("bibleBookSearchResults"),
    bibleBookSearchBottomCloseBtn: document.getElementById("bibleBookSearchBottomCloseBtn"),
    readBookSelect: document.getElementById("readBookSelect"),
    readChapterSelect: document.getElementById("readChapterSelect"),
    readTranslationSelect: document.getElementById("readTranslationSelect"),
    readBookName: document.getElementById("readBookName"),
    readChapterLabel: document.getElementById("readChapterLabel"),
    readVerseList: document.getElementById("readVerseList"),
    readPrevChBtn: document.getElementById("readPrevChBtn"),
    readNextChBtn: document.getElementById("readNextChBtn"),
    readVerseSelect: document.getElementById("readVerseSelect"),
    readUserChip: document.getElementById("readUserChip"),
    readUserChipName: document.getElementById("readUserChipName"),

    bookmarkSlots: document.getElementById("bookmarkSlots"),
    highlightSwatches: document.getElementById("highlightSwatches"),
    sermonNoteBtn: document.getElementById("sermonNoteBtn"),
    sermonSelectionStatus: document.getElementById("sermonSelectionStatus"),
    sermonHistoryBtn: document.getElementById("sermonHistoryBtn"),
    copyVerseBtn: document.getElementById("copyVerseBtn"),
    copySelectedVersesBtn: document.getElementById("copySelectedVersesBtn"),
    bibleSearchBtn: document.getElementById("bibleSearchBtn"),

    bibleSearchScreen: document.getElementById("bibleSearchScreen"),
    closeBibleSearchBtn: document.getElementById("closeBibleSearchBtn"),
    bibleSearchInput: document.getElementById("bibleSearchInput"),
    bibleSearchSubmit: document.getElementById("bibleSearchSubmit"),
    bibleSearchStatus: document.getElementById("bibleSearchStatus"),
    bibleSearchResults: document.getElementById("bibleSearchResults"),

    commentaryScreen: document.getElementById("commentaryScreen"),
    closeCommentaryBtn: document.getElementById("closeCommentaryBtn"),
    commentaryRef: document.getElementById("commentaryRef"),
    commentaryVerseBox: document.getElementById("commentaryVerseBox"),
    commentaryTabs: document.getElementById("commentaryTabs"),
    commentaryContent: document.getElementById("commentaryContent"),
    commentaryBottomCloseBtn: document.getElementById("commentaryBottomCloseBtn"),
    compareBtn: document.getElementById("compareBtn"),
    compareScreen: document.getElementById("compareScreen"),
    closeCompareBtn: document.getElementById("closeCompareBtn"),
    compareBottomCloseBtn: document.getElementById("compareBottomCloseBtn"),
    comparePrevVerseBtn: document.getElementById("comparePrevVerseBtn"),
    compareNextVerseBtn: document.getElementById("compareNextVerseBtn"),
    compareRef: document.getElementById("compareRef"),
    compareCards: document.getElementById("compareCards"),

    sermonNoteScreen: document.getElementById("sermonNoteScreen"),
    sermonNoteDate: document.getElementById("sermonNoteDate"),
    sermonEditor: document.getElementById("sermonEditor"),
    sermonSelectedRef: document.getElementById("sermonSelectedRef"),
    sermonSelectedVerses: document.getElementById("sermonSelectedVerses"),
    sermonInsightInput: document.getElementById("sermonInsightInput"),
    sermonApplicationInput: document.getElementById("sermonApplicationInput"),
    sermonPrayerInput: document.getElementById("sermonPrayerInput"),
    sermonEditorSaveBtn: document.getElementById("sermonEditorSaveBtn"),
    sermonEditorDeleteBtn: document.getElementById("sermonEditorDeleteBtn"),
    sermonEditorSaved: document.getElementById("sermonEditorSaved"),
    sermonHistory: document.getElementById("sermonHistory"),
    closeSermonNoteBtn: document.getElementById("closeSermonNoteBtn"),

    nameScreen: document.getElementById("nameScreen"),
    nameHomeBtn: document.getElementById("nameHomeBtn"),
    birthStep: document.getElementById("birthStep"),
    birthForm: document.getElementById("birthForm"),
    birthInput: document.getElementById("birthInput"),

    confirmStep: document.getElementById("confirmStep"),
    confirmName: document.getElementById("confirmName"),
    confirmYesBtn: document.getElementById("confirmYesBtn"),
    confirmNoBtn: document.getElementById("confirmNoBtn"),

    registerStep: document.getElementById("registerStep"),
    registerForm: document.getElementById("registerForm"),
    registerNameInput: document.getElementById("registerNameInput"),
    registerBackBtn: document.getElementById("registerBackBtn"),

    appScreen: document.getElementById("appScreen"),
    homeBtn: document.getElementById("homeBtn"),
    writeTestamentSelect: document.getElementById("writeTestamentSelect"),
    bookSelect: document.getElementById("bookSelect"),
    chapterSelect: document.getElementById("chapterSelect"),
    verseSelect: document.getElementById("verseSelect"),
    translationSelect: document.getElementById("translationSelect"),
    userChip: document.getElementById("userChip"),
    userChipName: document.getElementById("userChipName"),
    statsBtn: document.getElementById("statsBtn"),
    bookmarksBtn: document.getElementById("bookmarksBtn"),

    progressText: document.getElementById("progressText"),
    bookNameLabel: document.getElementById("bookNameLabel"),
    chapterLabel: document.getElementById("chapterLabel"),
    verseHeading: document.getElementById("verseHeading"),
    verseNum: document.getElementById("verseNum"),
    verseGuide: document.getElementById("verseGuide"),
    writeInput: document.getElementById("writeInput"),
    writeOverlay: document.getElementById("writeOverlay"),
    verseAccuracy: document.getElementById("verseAccuracy"),
    prevVerseBtn: document.getElementById("prevVerseBtn"),
    nextVerseBtn: document.getElementById("nextVerseBtn"),
    chapterDots: document.getElementById("chapterDots"),

    reflectionToggle: document.getElementById("reflectionToggle"),
    reflectionArea: document.getElementById("reflectionArea"),
    reflectionInput: document.getElementById("reflectionInput"),
    reflectionSaved: document.getElementById("reflectionSaved"),
    reflectionSaveBtn: document.getElementById("reflectionSaveBtn"),

    statsScreen: document.getElementById("statsScreen"),
    statsList: document.getElementById("statsList"),
    closeStatsBtn: document.getElementById("closeStatsBtn"),

    notesListBtn: document.getElementById("notesListBtn"),
    notesListScreen: document.getElementById("notesListScreen"),
    notesList: document.getElementById("notesList"),
    closeNotesListBtn: document.getElementById("closeNotesListBtn"),

    bookmarksScreen: document.getElementById("bookmarksScreen"),
    bookmarksList: document.getElementById("bookmarksList"),
    closeBookmarksBtn: document.getElementById("closeBookmarksBtn")
  };

  var state = {
    bookNo: null,
    chapter: null,
    verse: null,
    verseKeys: [],
    currentBirth: null,
    pendingBirth: null,
    loginDestination: "write"
  };

  /* ---------------- 유틸 ---------------- */
  function nowStamp() { return Date.now(); }
  function todayString() {
    var d = new Date();
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }
  function pad2(n) { return n < 10 ? "0" + n : String(n); }
  function formatNoteDate(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    return d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDate() + "일";
  }
  function escapeHtml(ch) {
    if (ch === "&") return "&amp;";
    if (ch === "<") return "&lt;";
    if (ch === ">") return "&gt;";
    if (ch === " ") return "&nbsp;";
    return ch;
  }
  function escapeHtml2(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function verseKeysSorted(versesObj) {
    return Object.keys(versesObj).map(Number).sort(function (a, b) { return a - b; }).map(String);
  }
  function chapterNumsSorted(bno) {
    return Object.keys(META.books[bno].chapters).map(Number).sort(function (a, b) { return a - b; });
  }

  /* ---------------- 구글시트 동기화 (선택사항) ---------------- */
  function jsonpRequest(url, params, timeoutMs) {
    return new Promise(function (resolve) {
      var callbackName = "__bibleSync_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
      var script = document.createElement("script");
      var finished = false;
      var timer = null;

      function cleanup() {
        try { delete window[callbackName]; } catch (e) { window[callbackName] = undefined; }
        if (script && script.parentNode) script.parentNode.removeChild(script);
        if (timer) clearTimeout(timer);
      }

      window[callbackName] = function (data) {
        if (finished) return;
        finished = true;
        cleanup();
        resolve(data);
      };

      var query = Object.keys(params || {}).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(
          params[k] == null ? "" : params[k]
        );
      }).join("&");

      var sep = url.indexOf("?") >= 0 ? "&" : "?";
      script.src =
        url + sep + query +
        (query ? "&" : "") +
        "callback=" + encodeURIComponent(callbackName) +
        "&_=" + Date.now();

      script.async = true;

      script.onerror = function () {
        if (finished) return;
        finished = true;
        cleanup();
        resolve(null);
      };

      document.head.appendChild(script);

      timer = setTimeout(function () {
        if (finished) return;
        finished = true;
        cleanup();
        resolve(null);
      }, timeoutMs || 10000);
    });
  }

  function syncGet(params) {
    var url = getSyncUrl();
    if (!url) return Promise.resolve(null);
    return jsonpRequest(url, params, 10000).catch(function (e) {
      console.warn("동기화 조회 실패:", e);
      return null;
    });
  }

  function syncPost(action, payload) {
    var url = getSyncUrl();
    if (!url) return Promise.resolve(null);

    var body = Object.assign({ action: action }, payload || {});

    // Apps Script 웹앱의 POST/CORS/리디렉션 문제를 피하기 위해
    // 저장도 JSONP(GET) 방식으로 전송합니다.
    return jsonpRequest(url, body, 15000).then(function (data) {
      if (!data || data.ok !== true) {
        console.warn("동기화 저장 실패:", data);
        return null;
      }
      return data;
    }).catch(function (e) {
      console.warn("동기화 저장 실패:", e);
      return null;
    });
  }

  function verseTextLength(bno, ch, vs) {
    try { return DATA[bno].chapters[ch][vs].t.length; } catch (e) { return 0; }
  }
  function mergeRemoteIntoLocal(birth, remote) {
    updateProfile(birth, function (p) {
      if (remote.name) p.name = remote.name;
      Object.keys(remote.completed || {}).forEach(function (key) {
        if (!p.completed[key]) {
          p.completed[key] = true;
          var parts = key.split("-");
          p.totalCorrectChars += verseTextLength(parts[0], parts[1], parts[2]);
        }
      });
      Object.keys(remote.notes || {}).forEach(function (key) {
        if (!p.notes[key]) p.notes[key] = { text: remote.notes[key], updatedAt: 0 };
      });
      // 구글시트의 예배노트를 병합하면서 오래된 브라우저 데이터의
      // 날짜 키(Fri Sep 04 2026...)도 yyyy-MM-dd로 자동 정리합니다.
      p.sermonNotes = mergeSermonNotes(p.sermonNotes || {}, remote.sermonNotes || {});
      Object.keys(remote.highlights || {}).forEach(function (key) {
        if (!(key in p.highlights)) p.highlights[key] = remote.highlights[key];
      });
      p.gratitudePrayer = mergeGratitudePrayer(p.gratitudePrayer || {}, remote.gratitudePrayer || {});
      if (remote.lastActive && (!p.lastActive || remote.lastActive > p.lastActive)) {
        p.lastActive = remote.lastActive;
      }
      if (remote.lastWritePosition) {
        var rp = remote.lastWritePosition;
        if (rp.bookNo && rp.chapter && rp.verse) {
          p.lastWritePosition = {
            bookNo: String(rp.bookNo),
            chapter: String(rp.chapter),
            verse: String(rp.verse),
            savedAt: Number(rp.savedAt) || 0
          };
        }
      }
    });
  }

  /* ---------------- 프로필 저장/조회 (키: 생년월일 6자리) ---------------- */
  function loadProfiles() {
    try {
      var raw = localStorage.getItem(PROFILES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveProfiles(p) {
    try { localStorage.setItem(PROFILES_KEY, JSON.stringify(p)); } catch (e) {}
  }
  function normalizeSermonDateKey(raw) {
    if (!raw) return null;
    var value = String(raw).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    var d = new Date(value);
    if (isNaN(d.getTime())) return null;
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function normalizeSermonNotes(notes) {
    var out = {};
    Object.keys(notes || {}).forEach(function (rawDate) {
      var date = normalizeSermonDateKey(rawDate);
      if (!date) return;
      if (!out[date]) out[date] = [];
      (notes[rawDate] || []).forEach(function (entry) {
        var copy = Object.assign({}, entry);
        if (copy.updatedAt) {
          var n = Number(copy.updatedAt);
          if (!isFinite(n)) {
            var parsed = new Date(copy.updatedAt);
            n = isNaN(parsed.getTime()) ? 0 : parsed.getTime();
          }
          copy.updatedAt = n;
        } else {
          copy.updatedAt = 0;
        }
        out[date].push(copy);
      });
    });
    return out;
  }

  function mergeSermonNotes(local, remote) {
    var a = normalizeSermonNotes(local);
    var b = normalizeSermonNotes(remote);
    Object.keys(b).forEach(function (date) {
      if (!a[date]) { a[date] = b[date]; return; }
      b[date].forEach(function (remoteEntry) {
        var idx = findEntryIndex(a[date], remoteEntry.bno, remoteEntry.ch, remoteEntry.vs);
        if (idx === -1) {
          a[date].push(remoteEntry);
        } else {
          var localEntry = a[date][idx];
          var lt = Number(localEntry.updatedAt) || 0;
          var rt = Number(remoteEntry.updatedAt) || 0;
          if (rt >= lt) a[date][idx] = remoteEntry;
        }
      });
    });
    return a;
  }

  function formatSermonDateKey(dateKey) {
    var parts = String(dateKey).split("-");
    if (parts.length !== 3) return String(dateKey);
    var y = Number(parts[0]), m = Number(parts[1]), d = Number(parts[2]);
    var dt = new Date(y, m - 1, d);
    if (isNaN(dt.getTime())) return String(dateKey);
    var days = ["일", "월", "화", "수", "목", "금", "토"];
    return y + "." + pad2(m) + "." + pad2(d) + ". (" + days[dt.getDay()] + ")";
  }

  function formatSermonDateTime(dateKey, entries) {
    var label = formatSermonDateKey(dateKey);
    var latest = 0;
    (entries || []).forEach(function (entry) {
      var t = Number(entry.updatedAt) || 0;
      if (t > latest) latest = t;
    });
    if (!latest) return label;
    var dt = new Date(latest);
    if (isNaN(dt.getTime())) return label;
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var ampm = hour < 12 ? "오전" : "오후";
    var displayHour = hour % 12 || 12;
    return label + " " + ampm + displayHour + "시" + (minute ? pad2(minute) + "분" : "");
  }

  function blankProfile(name) {
    return {
      name: name, completed: {}, totalCorrectChars: 0, lastActive: null, bookTouch: {}, notes: {},
      highlights: {}, readBookmarks: [null, null, null, null, null], sermonNotes: {}, gratitudePrayer: {}, lastReadPosition: null, lastWritePosition: null
    };
  }
  function getProfile(birth) {
    var profiles = loadProfiles();
    if (!profiles[birth]) return null;
    var p = profiles[birth];
    if (!p.bookTouch) p.bookTouch = {};
    if (!p.notes) p.notes = {};
    if (!p.highlights) p.highlights = {};
    if (!p.readBookmarks) p.readBookmarks = [null, null, null, null, null];
    if (!p.sermonNotes) p.sermonNotes = {};
    else p.sermonNotes = normalizeSermonNotes(p.sermonNotes);
    if (!p.gratitudePrayer || typeof p.gratitudePrayer !== "object") p.gratitudePrayer = {};
    if (p.lastReadPosition === undefined) p.lastReadPosition = null;
    if (p.lastWritePosition === undefined) p.lastWritePosition = null;
    return p;
  }
  function createProfile(birth, name) {
    var profiles = loadProfiles();
    profiles[birth] = blankProfile(name);
    saveProfiles(profiles);
    return profiles[birth];
  }
  function updateProfile(birth, mutateFn) {
    var profiles = loadProfiles();
    if (!profiles[birth]) profiles[birth] = blankProfile(birth);
    var p = profiles[birth];
    if (!p.bookTouch) p.bookTouch = {};
    if (!p.notes) p.notes = {};
    if (!p.highlights) p.highlights = {};
    if (!p.readBookmarks) p.readBookmarks = [null, null, null, null, null];
    if (!p.sermonNotes) p.sermonNotes = {};
    else p.sermonNotes = normalizeSermonNotes(p.sermonNotes);
    if (!p.gratitudePrayer || typeof p.gratitudePrayer !== "object") p.gratitudePrayer = {};
    if (p.lastReadPosition === undefined) p.lastReadPosition = null;
    if (p.lastWritePosition === undefined) p.lastWritePosition = null;
    mutateFn(p);
    saveProfiles(profiles);
  }
  function deleteProfile(birth) {
    var profiles = loadProfiles();
    delete profiles[birth];
    saveProfiles(profiles);
  }

  function setCurrentUser(birth) {
    state.currentBirth = birth;
    try { localStorage.setItem(CURRENT_USER_KEY, birth); } catch (e) {}
    var p = getProfile(birth);
    var displayName = p ? p.name : birth;
    els.userChipName.textContent = displayName;
    if (els.readUserChipName) els.readUserChipName.textContent = displayName;
  }
  function isLoggedIn() {
    return !!state.currentBirth;
  }

  /* ---------------- 관리자 권한 ---------------- */
  function requireAdmin(actionLabel) {
    var savedPin = null;
    try { savedPin = localStorage.getItem(ADMIN_PIN_KEY); } catch (e) {}
    if (!savedPin) {
      var newPin = prompt("관리자 비밀번호가 아직 없어요.\n" + actionLabel + "을(를) 하려면 새 관리자 비밀번호를 만들어주세요 (4자리 이상).");
      if (!newPin || newPin.trim().length < 4) {
        alert("비밀번호는 4자리 이상이어야 해요.");
        return false;
      }
      try { localStorage.setItem(ADMIN_PIN_KEY, newPin.trim()); } catch (e) {}
      alert("관리자 비밀번호가 설정되었어요. 이 번호를 꼭 기억해두세요.");
      return true;
    }
    var entered = prompt("관리자 비밀번호를 입력하세요.");
    if (entered === null) return false;
    if (entered !== savedPin) {
      alert("비밀번호가 올바르지 않아요.");
      return false;
    }
    return true;
  }

  /* ---------------- 이름/생년월일 화면 ---------------- */
  function showStep(step) {
    els.birthStep.classList.toggle("hidden", step !== "birth");
    els.confirmStep.classList.toggle("hidden", step !== "confirm");
    els.registerStep.classList.toggle("hidden", step !== "register");
  }

  function showNameScreen(destination) {
    state.loginDestination = destination || "write";
    els.cover.classList.add("hidden");
    els.appScreen.classList.add("hidden");
    els.readScreen.classList.add("hidden");
    els.statsScreen.classList.add("hidden");
    els.gratitudePrayerScreen.classList.add("hidden");
    els.nameScreen.classList.remove("hidden");
    showStep("birth");
    els.birthInput.value = "";
    setTimeout(function () { els.birthInput.focus(); }, 30);
  }

  function submitBirth(birth) {
    birth = (birth || "").replace(/[^0-9]/g, "");
    if (birth.length !== 6) {
      alert("생년월일 6자리를 입력해주세요. (예: YYMMDD 형식의 숫자 6자리)");
      return;
    }
    state.pendingBirth = birth;

    function decide() {
      var p = getProfile(birth);
      if (p) {
        els.confirmName.textContent = p.name + "님";
        showStep("confirm");
      } else {
        els.registerNameInput.value = "";
        showStep("register");
        setTimeout(function () { els.registerNameInput.focus(); }, 30);
      }
    }

    if (!getSyncUrl()) { decide(); return; }
    syncGet({ action: "profile", birth: birth }).then(function (remote) {
      if (remote && remote.found) mergeRemoteIntoLocal(birth, remote);
      decide();
    });
  }

  function enterApp(birth) {
    setCurrentUser(birth);
    els.nameScreen.classList.add("hidden");
    els.cover.classList.add("hidden");
    if (state.loginDestination === "read") {
      enterReadScreen();
    } else if (state.loginDestination === "todayVerse") {
      enterReadScreen();
      var tv = getTodayVerse();
      if (tv) readGoTo(tv.bno, tv.ch, tv.vs);
    } else if (state.loginDestination === "gratitudePrayer") {
      openGratitudePrayer();
    } else {
      els.appScreen.classList.remove("hidden");
      startAppForUser(birth);
    }
  }

  /* ---------------- 감사 & 기도 ---------------- */
  function normalizeGratitudeRecord(record, dateKey) {
    if (!record || typeof record !== "object") return null;
    var date = dateKey || record.date || "";
    if (!date) return null;
    return {
      date: date,
      gratitude1: String(record.gratitude1 || ""),
      gratitude2: String(record.gratitude2 || ""),
      gratitude3: String(record.gratitude3 || ""),
      prayer: String(record.prayer || ""),
      updatedAt: Number(record.updatedAt) || 0
    };
  }

  function mergeGratitudePrayer(localMap, remoteMap) {
    var result = {};
    Object.keys(localMap || {}).forEach(function (date) {
      var item = normalizeGratitudeRecord(localMap[date], date);
      if (item) result[date] = item;
    });
    Object.keys(remoteMap || {}).forEach(function (date) {
      var remoteItem = normalizeGratitudeRecord(remoteMap[date], date);
      if (!remoteItem) return;
      var localItem = result[date];
      if (!localItem || remoteItem.updatedAt >= (Number(localItem.updatedAt) || 0)) {
        result[date] = remoteItem;
      }
    });
    return result;
  }

  function loadGratitudePrayer() {
    var p = state.currentBirth ? getProfile(state.currentBirth) : null;
    if (p) return p.gratitudePrayer || {};

    // 이전 버전의 기기 전용 저장값을 남겨두되, 로그인 후 사용자 기록으로
    // 한 번만 이어받을 수 있도록 보관합니다.
    try {
      var legacy = JSON.parse(localStorage.getItem(GRATITUDE_PRAYER_KEY) || "{}");
      if (legacy && legacy.date) {
        var map = {};
        var item = normalizeGratitudeRecord(legacy, legacy.date);
        if (item) map[legacy.date] = item;
        return map;
      }
    } catch (e) {}
    return {};
  }

  function saveGratitudePrayer() {
    if (!isLoggedIn()) {
      showNameScreen("gratitudePrayer");
      return;
    }

    var birth = state.currentBirth;
    var p = getProfile(birth);
    var today = todayString();
    var obj = {
      date: today,
      gratitude1: els.gratitude1 ? els.gratitude1.value.trim() : "",
      gratitude2: els.gratitude2 ? els.gratitude2.value.trim() : "",
      gratitude3: els.gratitude3 ? els.gratitude3.value.trim() : "",
      prayer: els.prayerInput ? els.prayerInput.value.trim() : "",
      updatedAt: nowStamp()
    };

    var map = p && p.gratitudePrayer ? p.gratitudePrayer : {};
    map[today] = obj;
    updateProfile(birth, function (profile) {
      profile.gratitudePrayer = profile.gratitudePrayer || {};
      profile.gratitudePrayer[today] = obj;
    });

    if (els.gratitudePrayerSaved) {
      els.gratitudePrayerSaved.textContent = "저장 중…";
    }

    syncPost("gratitudePrayer", {
      birth: birth,
      name: (p && p.name) ? p.name : "",
      date: today,
      gratitude1: obj.gratitude1,
      gratitude2: obj.gratitude2,
      gratitude3: obj.gratitude3,
      prayer: obj.prayer,
      updatedAt: obj.updatedAt
    }).then(function (result) {
      if (els.gratitudePrayerSaved) {
        els.gratitudePrayerSaved.textContent = result && result.ok
          ? "구글시트에 저장했어요 · " + today.replace(/-/g, ".")
          : "기기에는 저장했어요 · 구글시트 저장을 확인해주세요";
        setTimeout(function () {
          if (els.gratitudePrayerSaved) els.gratitudePrayerSaved.textContent = "";
        }, 3000);
      }
    });
  }

  function renderGratitudePrayer() {
    if (!isLoggedIn()) {
      showNameScreen("gratitudePrayer");
      return;
    }

    var today = todayString();
    var p = getProfile(state.currentBirth);
    var savedMap = p && p.gratitudePrayer ? p.gratitudePrayer : {};
    var saved = normalizeGratitudeRecord(savedMap[today], today);

    // 이전 버전에서 기기에만 저장했던 오늘 기록이 있으면,
    // 현재 로그인한 사용자 계정으로 한 번 이어받습니다.
    if (!saved) {
      var legacyMap = {};
      try {
        var legacyRaw = JSON.parse(localStorage.getItem(GRATITUDE_PRAYER_KEY) || "{}");
        var legacyItem = normalizeGratitudeRecord(legacyRaw, legacyRaw.date);
        if (legacyItem && legacyItem.date === today) legacyMap[today] = legacyItem;
      } catch (e) {}

      if (legacyMap[today]) {
        saved = legacyMap[today];
        updateProfile(state.currentBirth, function (profile) {
          profile.gratitudePrayer = profile.gratitudePrayer || {};
          profile.gratitudePrayer[today] = saved;
        });
        p = getProfile(state.currentBirth);
        savedMap = p.gratitudePrayer;
      }
    }

    var hasToday = !!saved;

    if (els.gratitudePrayerDate) {
      var displayName = p && p.name ? " · " + p.name + "님" : "";
      els.gratitudePrayerDate.textContent = today.replace(/-/g, ".") + " · 오늘의 감사와 기도" + displayName;
    }
    if (els.gratitude1) els.gratitude1.value = hasToday ? saved.gratitude1 : "";
    if (els.gratitude2) els.gratitude2.value = hasToday ? saved.gratitude2 : "";
    if (els.gratitude3) els.gratitude3.value = hasToday ? saved.gratitude3 : "";
    if (els.prayerInput) els.prayerInput.value = hasToday ? saved.prayer : "";
    if (els.gratitudePrayerSaved) els.gratitudePrayerSaved.textContent = "";
  }

  function formatGratitudeDateLong(date) {
    var m = String(date || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? m[1] + "년 " + Number(m[2]) + "월 " + Number(m[3]) + "일" : String(date || "");
  }

  function renderGratitudeHistory() {
    if (!els.gratitudeHistory || !els.gratitudeHistoryList) return;
    var p = getProfile(state.currentBirth);
    var map = p && p.gratitudePrayer ? p.gratitudePrayer : {};
    var dates = Object.keys(map).filter(function (d) { return normalizeGratitudeRecord(map[d], d); }).sort().reverse();

    if (!dates.length) {
      els.gratitudeHistoryList.innerHTML = '<div class="gratitude-history-empty">아직 작성한 감사 & 기도 기록이 없습니다.</div>';
      return;
    }

    var html = dates.map(function (date) {
      var item = normalizeGratitudeRecord(map[date], date);
      return '<article class="gratitude-history-record">' +
        '<div class="gratitude-history-record-date">' + formatGratitudeDateLong(date) + '</div>' +
        '<div class="gratitude-history-section"><div class="gratitude-history-title">🌿 감사</div>' +
        '<div class="gratitude-history-item"><b>1</b><span>' + escapeHtml2(item.gratitude1 || "-") + '</span></div>' +
        '<div class="gratitude-history-item"><b>2</b><span>' + escapeHtml2(item.gratitude2 || "-") + '</span></div>' +
        '<div class="gratitude-history-item"><b>3</b><span>' + escapeHtml2(item.gratitude3 || "-") + '</span></div></div>' +
        '<div class="gratitude-history-section prayer-history-section"><div class="gratitude-history-title">🙏 기도제목</div>' +
        '<div class="gratitude-history-prayer">' + escapeHtml2(item.prayer || "-").replace(/\n/g, "<br>") + '</div></div>' +
      '</article>';
    }).join('');

    els.gratitudeHistoryList.innerHTML = html + '<div class="gratitude-history-more">↓ 아래로 스크롤하면 더 이전 기록을 볼 수 있습니다.</div>';
  }

  function showGratitudeHistory() {
    if (!isLoggedIn()) { showNameScreen("gratitudePrayer"); return; }
    renderGratitudeHistory();
    gratitudeHistoryScrollY = window.scrollY || window.pageYOffset || 0;
    if (els.gratitudeHistory) {
      els.gratitudeHistory.classList.remove("hidden");
      if (els.gratitudeHistory.parentElement) els.gratitudeHistory.parentElement.classList.add("gratitude-history-open");
    }
  }

  function closeGratitudeHistory() {
    if (els.gratitudeHistory) els.gratitudeHistory.classList.add("hidden");
    if (els.gratitudeHistory && els.gratitudeHistory.parentElement) els.gratitudeHistory.parentElement.classList.remove("gratitude-history-open");
    setTimeout(function(){
      window.scrollTo({top: gratitudeHistoryScrollY || 0, behavior:"smooth"});
    }, 30);
  }

  function openGratitudePrayer() {
    if (!isLoggedIn()) {
      showNameScreen("gratitudePrayer");
      return;
    }
    els.cover.classList.add("hidden");
    els.nameScreen.classList.add("hidden");
    els.appScreen.classList.add("hidden");
    els.readScreen.classList.add("hidden");
    els.hymnScreen.classList.add("hidden");
    renderGratitudePrayer();
    els.gratitudePrayerScreen.classList.remove("hidden");

    // 로그인한 사용자의 최신 감사 & 기도 기록을 서버에서 다시 받아옵니다.
    if (getSyncUrl() && state.currentBirth) {
      syncGet({ action: "profile", birth: state.currentBirth }).then(function (remote) {
        if (remote && remote.found) {
          mergeRemoteIntoLocal(state.currentBirth, remote);
          renderGratitudePrayer();
        }
      });
    }
  }

  function closeGratitudePrayer() {
    els.gratitudePrayerScreen.classList.add("hidden");
    els.cover.classList.remove("hidden");
  }

  /* ---------------- 오늘의 말씀 ---------------- */
  var TODAY_VERSE_ORDER_KEY = "bible_today_verse_order_v1";
  var TODAY_VERSE_EPOCH = "2026-01-01";
  var todayVerseOrder = null;

  function seededRandom(seed) {
    var x = seed >>> 0;
    return function () {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return (x >>> 0) / 4294967296;
    };
  }

  function buildTodayVersePool() {
    var meta = window.BIBLE_META;
    var data = window.BIBLE_DATA;
    var pool = [];
    if (!meta || !data) return pool;
    meta.order.forEach(function (bno) {
      var book = data[bno];
      if (!book || !book.chapters) return;
      Object.keys(book.chapters).forEach(function (ch) {
        var chapter = book.chapters[ch];
        verseKeysSorted(chapter).forEach(function (vs) {
          if (chapter[vs] && chapter[vs].t) {
            pool.push({ bno: String(bno), ch: String(ch), vs: String(vs) });
          }
        });
      });
    });
    return pool;
  }

  function getTodayVerseOrder() {
    if (todayVerseOrder && todayVerseOrder.length) return todayVerseOrder;
    var pool = buildTodayVersePool();
    if (!pool.length) return [];
    var rnd = seededRandom(20260909);
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    todayVerseOrder = pool;
    return todayVerseOrder;
  }

  function daysFromEpoch(date) {
    var parts = date.split("-").map(Number);
    var start = Date.UTC(parts[0], parts[1] - 1, parts[2]);
    var now = new Date();
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((today - start) / 86400000);
  }

  function getTodayVerse() {
    var order = getTodayVerseOrder();
    if (!order.length) return null;
    var index = daysFromEpoch(TODAY_VERSE_EPOCH) % order.length;
    if (index < 0) index += order.length;
    var item = order[index];
    var meta = window.BIBLE_META;
    var data = window.BIBLE_DATA;
    var verse = data[item.bno].chapters[item.ch][item.vs];
    return {
      bno: item.bno,
      ch: item.ch,
      vs: item.vs,
      text: verse.t,
      ref: meta.books[item.bno].name + " " + item.ch + ":" + item.vs
    };
  }

  function renderTodayVerse() {
    if (!els.todayVerseCard) return;
    var item = getTodayVerse();
    if (!item) return;
    var now = new Date();
    var y = now.getFullYear();
    var m = String(now.getMonth() + 1).padStart(2, "0");
    var d = String(now.getDate()).padStart(2, "0");
    els.todayVerseDate.textContent = y + "." + m + "." + d;
    els.todayVerseText.textContent = "“" + item.text + "”";
    els.todayVerseRef.textContent = item.ref;
  }

  function openTodayVerse() {
    var item = getTodayVerse();
    if (!item) return;
    state.loginDestination = "todayVerse";
    if (isLoggedIn()) {
      enterReadScreen();
      readGoTo(item.bno, item.ch, item.vs);
    } else {
      showNameScreen("todayVerse");
    }
  }

  var todayVerseDateKey = "";
  function checkTodayVerseDate() {
    if (!els.todayVerseCard) return;
    var now = new Date();
    var key = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    if (key !== todayVerseDateKey) {
      todayVerseDateKey = key;
      renderTodayVerse();
    }
  }

  /* ---------------- 성경 탐색 ---------------- */
  function populateBooks(selectEl, markComplete) {
    selectEl = selectEl || els.bookSelect;
    selectEl.innerHTML = "";
    var p = (markComplete && state.currentBirth) ? getProfile(state.currentBirth) : null;
    var groupOT = document.createElement("optgroup");
    groupOT.label = "구약";
    var groupNT = document.createElement("optgroup");
    groupNT.label = "신약";
    META.order.forEach(function (bno) {
      var opt = document.createElement("option");
      opt.value = bno;
      var done = p && isBookComplete(p, bno);
      opt.textContent = META.books[bno].name + (done ? " ★" : "");
      (Number(bno) <= 39 ? groupOT : groupNT).appendChild(opt);
    });
    selectEl.appendChild(groupOT);
    selectEl.appendChild(groupNT);
  }

  function testamentOfBook(bno) {
    return Number(bno) <= 39 ? "OT" : "NT";
  }

  function populateReadBooks(testament) {
    testament = testament || (els.readTestamentSelect ? els.readTestamentSelect.value : "OT");
    var current = els.readBookSelect ? els.readBookSelect.value : null;
    els.readBookSelect.innerHTML = "";
    META.order.forEach(function (bno) {
      if (testamentOfBook(bno) !== testament) return;
      var opt = document.createElement("option");
      opt.value = bno;
      opt.textContent = META.books[bno].name;
      els.readBookSelect.appendChild(opt);
    });
    if (current && els.readBookSelect.querySelector('option[value="' + current + '"]')) {
      els.readBookSelect.value = current;
    } else if (els.readBookSelect.options.length) {
      els.readBookSelect.value = els.readBookSelect.options[0].value;
    }
  }

  function populateWriteBooks(testament) {
    testament = testament || (els.writeTestamentSelect ? els.writeTestamentSelect.value : "OT");
    var current = els.bookSelect ? els.bookSelect.value : null;
    els.bookSelect.innerHTML = "";
    META.order.forEach(function (bno) {
      if (testamentOfBook(bno) !== testament) return;
      var opt = document.createElement("option");
      opt.value = bno;
      var p = state.currentBirth ? getProfile(state.currentBirth) : null;
      opt.textContent = META.books[bno].name + (p && isBookComplete(p, bno) ? " ★" : "");
      els.bookSelect.appendChild(opt);
    });
    if (current && els.bookSelect.querySelector('option[value="' + current + '"]')) {
      els.bookSelect.value = current;
    } else if (els.bookSelect.options.length) {
      els.bookSelect.value = els.bookSelect.options[0].value;
    }
  }

  function populateVerses(bno, chapter, selectEl) {
    selectEl = selectEl || els.verseSelect;
    if (!selectEl || !bno || !chapter || !DATA[bno] || !DATA[bno].chapters[String(chapter)]) return;
    var current = selectEl.value;
    selectEl.innerHTML = "";
    verseKeysSorted(DATA[bno].chapters[String(chapter)]).forEach(function (vs) {
      var opt = document.createElement("option");
      opt.value = vs;
      opt.textContent = vs + "절";
      selectEl.appendChild(opt);
    });
    if (current && selectEl.querySelector('option[value="' + current + '"]')) {
      selectEl.value = current;
    } else if (selectEl.options.length) {
      selectEl.value = selectEl.options[0].value;
    }
  }

  function populateChapters(bno, selectEl) {
    selectEl = selectEl || els.chapterSelect;
    selectEl.innerHTML = "";
    var chNums = chapterNumsSorted(bno);
    chNums.forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c + "장";
      selectEl.appendChild(opt);
    });
  }

  function saveWritePosition(forceSync) {
    if (!state.currentBirth || !state.bookNo || !state.chapter || !state.verse) return;
    var bno = state.bookNo, ch = String(state.chapter), vs = String(state.verse);
    var stamp = nowStamp();
    updateProfile(state.currentBirth, function (p) {
      p.lastWritePosition = { bookNo: bno, chapter: ch, verse: vs, savedAt: stamp };
    });

    // 입력할 때는 로컬에 즉시 저장하고, 구글시트에는 짧게 묶어서 저장합니다.
    clearTimeout(saveWritePosition._timer);
    saveWritePosition._timer = setTimeout(function () {
      var p = getProfile(state.currentBirth);
      syncPost("progress", {
        birth: state.currentBirth,
        name: p ? p.name : "",
        bookNo: bno,
        bookName: META.books[bno].name,
        chapter: ch,
        verse: vs,
        savedAt: stamp
      });
    }, forceSync ? 0 : 700);
  }

  function goTo(bno, chapter, verseIndex) {
    state.bookNo = bno;
    state.chapter = String(chapter);
    var versesObj = DATA[bno].chapters[state.chapter];
    state.verseKeys = verseKeysSorted(versesObj);
    if (verseIndex === undefined) verseIndex = 0;
    verseIndex = Math.max(0, Math.min(verseIndex, state.verseKeys.length - 1));
    state.verse = state.verseKeys[verseIndex];

    els.bookSelect.value = bno;
    els.chapterSelect.value = state.chapter;
    populateVerses(bno, state.chapter, els.verseSelect);
    if (els.verseSelect) els.verseSelect.value = state.verse;

    if (els.writeTestamentSelect) els.writeTestamentSelect.value = testamentOfBook(bno);

    renderChapterHeader();
    renderVerse();

    if (state.currentBirth) {
      saveWritePosition(false);
      updateProfile(state.currentBirth, function (p) {
        p.bookTouch[bno] = nowStamp();
      });
    }
  }

  function renderChapterHeader() {
    els.bookNameLabel.textContent = META.books[state.bookNo].name;
    els.chapterLabel.textContent = state.chapter + "장";
  }

  function currentVerseIndex() {
    return state.verseKeys.indexOf(state.verse);
  }

  function verseKey() {
    return state.bookNo + "-" + state.chapter + "-" + state.verse;
  }

  function renderChapterDots() {
    els.chapterDots.innerHTML = "";
    var idx = currentVerseIndex();
    var p = state.currentBirth ? getProfile(state.currentBirth) : null;
    state.verseKeys.forEach(function (vk, i) {
      var d = document.createElement("span");
      var key = state.bookNo + "-" + state.chapter + "-" + vk;
      var done = p && p.completed[key];
      d.className = "dot" + (i === idx ? " current" : (done ? " done" : ""));
      d.title = vk + "절";
      els.chapterDots.appendChild(d);
    });
  }

  function renderVerse() {
    var v = DATA[state.bookNo].chapters[state.chapter][state.verse];
    els.verseNum.textContent = state.verse;
    els.verseGuide.textContent = v.t;
    els.verseHeading.textContent = v.h ? v.h : "";

    els.writeInput.value = "";
    els.writeOverlay.innerHTML = "";
    els.verseAccuracy.textContent = "";
    els.verseAccuracy.classList.remove("done");

    var idx = currentVerseIndex();
    els.progressText.textContent = (idx + 1) + " / " + state.verseKeys.length;
    els.prevVerseBtn.disabled = (idx === 0 && isFirstChapterOfFirstBook());
    els.nextVerseBtn.textContent = "다음 구절 →";

    renderChapterDots();
    renderReflection();
    setTimeout(function () { els.writeInput.focus(); }, 30);
  }

  /* ---------------- 묵상 노트 ---------------- */
  function renderReflection() {
    els.reflectionArea.classList.add("hidden");
    els.reflectionSaved.textContent = "";
    var p = state.currentBirth ? getProfile(state.currentBirth) : null;
    var note = p ? p.notes[verseKey()] : null;
    var text = note ? note.text : "";
    els.reflectionInput.value = text;
    els.reflectionToggle.textContent = text ? "📝 묵상 보기 · 수정" : "📝 묵상 남기기";
  }

  function saveReflection() {
    if (!state.currentBirth) return;
    var text = els.reflectionInput.value;
    var key = verseKey();
    var bno = state.bookNo, ch = state.chapter, vs = state.verse;
    updateProfile(state.currentBirth, function (p) {
      if (text.trim()) {
        p.notes[key] = { text: text, updatedAt: nowStamp() };
      } else {
        delete p.notes[key];
      }
    });
    els.reflectionToggle.textContent = text.trim() ? "📝 묵상 보기 · 수정" : "📝 묵상 남기기";
    els.reflectionSaved.textContent = "저장됨";
    clearTimeout(saveReflection._t);
    saveReflection._t = setTimeout(function () { els.reflectionSaved.textContent = ""; }, 1500);
    if (text.trim()) {
      var pName2 = state.currentBirth ? getProfile(state.currentBirth).name : "";
      syncPost("note", {
        birth: state.currentBirth,
        name: pName2,
        bookNo: bno,
        bookName: META.books[bno].name,
        chapter: ch,
        verse: vs,
        note: text
      });
    }
  }

  /* ---------------- 내 묵상 노트 목록 ---------------- */
  function renderNotesList() {
    els.notesList.innerHTML = "";
    if (!state.currentBirth) {
      els.notesList.innerHTML = '<p class="stats-empty">먼저 생년월일로 입장해주세요.</p>';
      return;
    }
    var p = getProfile(state.currentBirth);
    var keys = Object.keys(p.notes);
    if (keys.length === 0) {
      els.notesList.innerHTML = '<p class="stats-empty">아직 남긴 묵상이 없어요.</p>';
      return;
    }
    keys.sort(function (a, b) {
      var ta = (p.notes[a] && p.notes[a].updatedAt) || 0;
      var tb = (p.notes[b] && p.notes[b].updatedAt) || 0;
      return tb - ta;
    });
    keys.forEach(function (key) {
      var parts = key.split("-");
      var bno = parts[0], ch = parts[1], vs = parts[2];
      var bookName = META.books[bno] ? META.books[bno].name : bno;
      var noteObj = p.notes[key];
      var text = noteObj ? noteObj.text : "";
      var snippet = text.length > 44 ? text.slice(0, 44) + "…" : text;
      var dateLabel = formatNoteDate(noteObj && noteObj.updatedAt);

      var row = document.createElement("div");
      row.className = "note-row";
      row.innerHTML =
        '<div class="note-row-main">' +
          '<button type="button" class="note-row-open">' +
            '<span class="bookmark-book">' + escapeHtml2(bookName) + " " + ch + "장 " + vs + "절" +
              (dateLabel ? ' <span class="note-date">' + dateLabel + '</span>' : '') + '</span>' +
            '<span class="bookmark-pos">' + escapeHtml2(snippet) + '</span>' +
          '</button>' +
          '<button type="button" class="note-row-delete">삭제</button>' +
        '</div>';

      row.querySelector(".note-row-open").addEventListener("click", function () {
        closeNotesList();
        populateChapters(bno);
        var keysV = verseKeysSorted(DATA[bno].chapters[ch]);
        goTo(bno, ch, keysV.indexOf(vs));
        setTimeout(function () {
          els.reflectionArea.classList.remove("hidden");
        }, 60);
      });

      row.querySelector(".note-row-delete").addEventListener("click", function (ev) {
        ev.stopPropagation();
        if (!confirm(bookName + " " + ch + "장 " + vs + "절의 묵상 노트를 삭제할까요?\n삭제하면 되돌릴 수 없습니다.")) return;

        updateProfile(state.currentBirth, function (profile) {
          delete profile.notes[key];
        });

        var pName = getProfile(state.currentBirth).name || "";
        syncPost("deleteNote", {
          birth: state.currentBirth,
          name: pName,
          bookNo: bno,
          chapter: ch,
          verse: vs
        });

        renderNotesList();
      });
      els.notesList.appendChild(row);
    });
  }
  function openNotesList() {
    renderNotesList();
    els.notesListScreen.classList.remove("hidden");
  }
  function closeNotesList() {
    els.notesListScreen.classList.add("hidden");
  }

  function isFirstChapterOfFirstBook() {
    return state.bookNo === META.order[0] && state.chapter === "1";
  }

  function target() {
    return DATA[state.bookNo].chapters[state.chapter][state.verse].t;
  }

  function renderOverlay() {
    var typed = els.writeInput.value;
    var ref = target();
    var html = "";
    var correctCount = 0;
    for (var i = 0; i < typed.length; i++) {
      var ok = i < ref.length && typed[i] === ref[i];
      if (ok) correctCount++;
      html += '<span class="' + (ok ? "ch-correct" : "ch-wrong") + '">' + escapeHtml(typed[i]) + "</span>";
    }
    els.writeOverlay.innerHTML = html;

    if (typed.length === 0) {
      els.verseAccuracy.textContent = "";
      els.verseAccuracy.classList.remove("done");
      return;
    }

    var pct = Math.round((correctCount / ref.length) * 100);
    if (typed === ref) {
      els.verseAccuracy.textContent = "완벽해요! 정확도 100%";
      els.verseAccuracy.classList.add("done");
      markVerseComplete(ref.length);
    } else {
      els.verseAccuracy.textContent = "정확도 " + pct + "%";
      els.verseAccuracy.classList.remove("done");
    }
  }

  function markVerseComplete(refLength) {
    if (!state.currentBirth) return;
    var key = verseKey();
    var bno = state.bookNo, ch = state.chapter, vs = state.verse;
    var wasAlready = false;
    updateProfile(state.currentBirth, function (p) {
      wasAlready = !!p.completed[key];
      if (!wasAlready) {
        p.completed[key] = true;
        p.totalCorrectChars += refLength;
      }
      p.lastActive = todayString();
      p.bookTouch[bno] = nowStamp();
    });
    if (!wasAlready) {
      saveWritePosition(true);
      renderChapterDots();
      populateBooks(els.bookSelect, true);
      var pName = state.currentBirth ? getProfile(state.currentBirth).name : "";
      syncPost("complete", {
        birth: state.currentBirth,
        name: pName,
        bookNo: bno,
        bookName: META.books[bno].name,
        chapter: ch,
        verse: vs
      });
    }
  }

  function goAdjacentVerse(delta) {
    var idx = currentVerseIndex() + delta;
    if (idx < 0) {
      var chNums = chapterNumsSorted(state.bookNo);
      var chPos = chNums.indexOf(Number(state.chapter));
      if (chPos > 0) {
        var prevCh = chNums[chPos - 1];
        goTo(state.bookNo, prevCh, META.books[state.bookNo].chapters[String(prevCh)] - 1);
      } else {
        var bPos = META.order.indexOf(state.bookNo);
        if (bPos > 0) {
          var prevBno = META.order[bPos - 1];
          var prevChNums = chapterNumsSorted(prevBno);
          var lastCh = prevChNums[prevChNums.length - 1];
          goTo(prevBno, lastCh, META.books[prevBno].chapters[String(lastCh)] - 1);
        }
      }
      return;
    }
    if (idx >= state.verseKeys.length) {
      var chNums2 = chapterNumsSorted(state.bookNo);
      var chPos2 = chNums2.indexOf(Number(state.chapter));
      if (chPos2 < chNums2.length - 1) {
        goTo(state.bookNo, chNums2[chPos2 + 1], 0);
      } else {
        var bPos2 = META.order.indexOf(state.bookNo);
        if (bPos2 < META.order.length - 1) {
          var nextBno = META.order[bPos2 + 1];
          var nextChNums = chapterNumsSorted(nextBno);
          goTo(nextBno, nextChNums[0], 0);
        }
      }
      return;
    }
    goTo(state.bookNo, state.chapter, idx);
  }

  /* ---------------- 성경 보기 (로그인한 사람별로 기록 분리) ---------------- */
  var readState = { bookNo: null, chapter: null };

  function loadReadLast() {
    var p = getProfile(state.currentBirth);
    return p ? p.lastReadPosition : null;
  }
  function saveReadLast() {
    if (!state.currentBirth) return;
    updateProfile(state.currentBirth, function (p) {
      p.lastReadPosition = { bookNo: readState.bookNo, chapter: readState.chapter };
    });
  }

  function showReadScreen() {
    state.loginDestination = "read";
    if (isLoggedIn()) {
      enterReadScreen();
    } else {
      showNameScreen("read");
    }
  }

  function enterReadScreen() {
    els.cover.classList.add("hidden");
    els.nameScreen.classList.add("hidden");
    els.appScreen.classList.add("hidden");
    els.readScreen.classList.remove("hidden");

    var lastForSection = loadReadLast();
    var initialBno = (lastForSection && META.books[lastForSection.bookNo]) ? lastForSection.bookNo : META.order[0];
    els.readTestamentSelect.value = testamentOfBook(initialBno);
    populateReadBooks(els.readTestamentSelect.value);
    renderHighlightSwatches();
    renderBookmarkSlots();
    var last = loadReadLast();
    var bno = (last && META.books[last.bookNo]) ? last.bookNo : META.order[0];
    var ch = (last && META.books[bno].chapters[last.chapter]) ? last.chapter : "1";
    readGoTo(bno, ch);
  }

  function readGoTo(bno, ch, focusVerse) {
    readState.bookNo = bno;
    readState.chapter = String(ch);
    pendingBookmarkVerse = null;
    sermonSelectionMode = false;
    selectedSermonVerses = {};
    updateSermonSelectionToolbar();
    var test = testamentOfBook(bno);
    if (els.readTestamentSelect.value !== test) {
      els.readTestamentSelect.value = test;
      populateReadBooks(test);
    }
    populateChapters(bno, els.readChapterSelect);
    els.readBookSelect.value = bno;
    els.readChapterSelect.value = readState.chapter;
    renderReadChapter();
    populateReadVerseSelect();
    renderBookmarkSlots();
    saveReadLast();
    if (focusVerse) {
      els.readVerseSelect.value = String(focusVerse);
      scrollToReadVerse(focusVerse);
    } else {
      window.scrollTo(0, 0);
    }
  }

  function populateReadVerseSelect() {
    els.readVerseSelect.innerHTML = "";
    var keys = verseKeysSorted(DATA[readState.bookNo].chapters[readState.chapter]);
    keys.forEach(function (vs) {
      var opt = document.createElement("option");
      opt.value = vs;
      opt.textContent = vs + "절";
      els.readVerseSelect.appendChild(opt);
    });
  }

  function scrollToReadVerse(vs) {
    var el = document.getElementById("rv-" + readState.bookNo + "-" + readState.chapter + "-" + vs);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("jump-flash");
    void el.offsetWidth;
    el.classList.add("jump-flash");
  }

  function getTodaySermonEntriesEndingAt(bno, ch, vs) {
    var notes = loadSermonNotes();
    var todayEntries = (notes && notes[todayString()]) || [];
    var target = Number(vs);
    return todayEntries.map(function(entry, index){
      var parsed = parseSermonEntry(entry);
      parsed.__index = index;
      return parsed;
    }).filter(function(entry){
      if (String(entry.bno) !== String(bno) || String(entry.ch) !== String(ch)) return false;
      var nums = verseNumbersFromEntry(entry);
      if (!nums.length) return false;
      return Math.max.apply(null, nums) === target;
    });
  }

  function openSavedSermonEntry(entry) {
    var e = parseSermonEntry(entry);
    var nums = verseNumbersFromEntry(e);
    if (!nums.length || !DATA[e.bno] || !DATA[e.bno].chapters[e.ch]) return;
    sermonEditorSelection = nums.map(function(vs){
      var verse = DATA[e.bno].chapters[e.ch][String(vs)];
      return verse ? { bno:String(e.bno), ch:String(e.ch), vs:String(vs), verse:verse } : null;
    }).filter(Boolean);
    if (!sermonEditorSelection.length) return;
    if (els.sermonNoteDate) els.sermonNoteDate.textContent = "오늘의 예배노트 · " + todayString().replace(/-/g, ".");
    if (els.sermonSelectedRef) els.sermonSelectedRef.textContent = e.label || buildSermonSelectionLabel(sermonEditorSelection);
    if (els.sermonSelectedVerses) {
      els.sermonSelectedVerses.innerHTML = sermonEditorSelection.map(function(item){
        return '<div class="sermon-selected-verse"><b>' + escapeHtml2(item.vs + "절") + '</b><span>' + escapeHtml2(item.verse.t) + '</span></div>';
      }).join('');
    }
    if (els.sermonInsightInput) els.sermonInsightInput.value = e.insight || "";
    if (els.sermonApplicationInput) els.sermonApplicationInput.value = e.application || "";
    if (els.sermonPrayerInput) els.sermonPrayerInput.value = e.prayer || "";
    if (els.sermonEditorDeleteBtn) els.sermonEditorDeleteBtn.disabled = false;
    if (els.sermonEditorSaved) els.sermonEditorSaved.textContent = "저장된 예배노트";
    if (els.sermonEditor) els.sermonEditor.classList.remove("hidden");
    if (els.sermonHistory) els.sermonHistory.classList.add("hidden");
    if (els.sermonNoteScreen) els.sermonNoteScreen.classList.remove("hidden");
  }

  function renderReadChapter() {
    var bno = readState.bookNo, ch = readState.chapter;
    els.readBookName.textContent = META.books[bno].name;
    els.readChapterLabel.textContent = ch + "장";

    var versesObj = DATA[bno].chapters[ch];
    var keys = verseKeysSorted(versesObj);
    var highlights = loadHighlights();
    var html = "";
    keys.forEach(function (vs) {
      var v = versesObj[vs];
      var vKey = bno + "-" + ch + "-" + vs;
      var hl = highlights[vKey];
      if (v.h) html += '<div class="read-heading">' + escapeHtml2(v.h) + "</div>";
      var commentaryForVerse = COMMENTARY_DATA[vKey];
      var commentaryButton = commentaryForVerse
        ? '<button type="button" class="verse-commentary-btn" data-vkey="' + vKey + '">📖 주석</button>'
        : '';
      html += '<p class="read-verse' + (hl ? " hl-" + hl : "") + '" id="rv-' + vKey + '" data-vkey="' + vKey + '"><span class="read-verse-num">' + vs + "</span>" + escapeHtml2(v.t) + commentaryButton + "</p>";
      var savedSermonsForVerse = getTodaySermonEntriesEndingAt(bno, ch, vs);
      savedSermonsForVerse.forEach(function(savedEntry, savedIdx){
        var savedKey = bno + "|" + ch + "|" + String(savedEntry.__index);
        html += '<button type="button" class="read-sermon-saved" data-sermon-saved-key="' + escapeHtml2(savedKey) + '"><span class="read-sermon-saved-icon">📝</span><span class="read-sermon-saved-text"><b>예배노트 저장됨</b><small>' + escapeHtml2(savedEntry.label || (META.books[bno].name + " " + ch + "장 " + savedEntry.vs + "절")) + '</small></span><span class="read-sermon-saved-arrow">›</span></button>';
      });

    });
    els.readVerseList.innerHTML = html;

    var chNums = chapterNumsSorted(bno);
    var bPos = META.order.indexOf(bno);
    els.readPrevChBtn.disabled = (chNums.indexOf(Number(ch)) === 0 && bPos === 0);
    els.readNextChBtn.disabled = (chNums.indexOf(Number(ch)) === chNums.length - 1 && bPos === META.order.length - 1);

    els.readVerseList.querySelectorAll(".verse-commentary-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var parts = btn.getAttribute("data-vkey").split("-");
        var verse = DATA[parts[0]] && DATA[parts[0]].chapters[parts[1]]
          ? DATA[parts[0]].chapters[parts[1]][parts[2]] : null;
        if (verse) {
          openCommentaryForVerse({bno:parts[0], ch:parts[1], vs:parts[2], verse:verse});
        }
      });
    });

    els.readVerseList.querySelectorAll(".read-verse").forEach(function (p) {
      p.addEventListener("click", function () {
        var vKey = p.getAttribute("data-vkey");
        if (copyMode) {
          toggleCopyVerse(p);
          return;
        }
        if (highlightColor) {
          toggleHighlight(vKey, p);
          return;
        }
        if (sermonSelectionMode) {
          toggleSermonVerse(p);
          return;
        }
        selectVerseForNote(p);
      });
    });
    els.readVerseList.querySelectorAll(".read-sermon-saved").forEach(function(btn){
      btn.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var key = btn.getAttribute("data-sermon-saved-key") || "";
        var parts = key.split("|");
        var entryIndex = Number(parts[2]);
        var rawEntries = ((loadSermonNotes() || {})[todayString()] || []);
        var found = rawEntries[entryIndex] ? parseSermonEntry(rawEntries[entryIndex]) : null;
        if (found) openSavedSermonEntry(found);
      });
    });
    updateCopyToolbar();
    if (sermonSelectionMode) {
      Object.keys(selectedSermonVerses).forEach(function(key){
        var selected = els.readVerseList.querySelector('.read-verse[data-vkey="' + key + '"]');
        if (selected) selected.classList.add("sermon-selected");
      });
    }
    updateSermonSelectionToolbar();

  }

  function selectVerseForNote(el) {
    els.readVerseList.querySelectorAll(".read-verse.verse-selected").forEach(function (v) {
      v.classList.remove("verse-selected");
    });
    el.classList.add("verse-selected");
    var vs = el.querySelector(".read-verse-num").textContent;
    els.readVerseSelect.value = vs;
    pendingBookmarkVerse = {
      bno: readState.bookNo,
      ch: readState.chapter,
      vs: vs,
      label: META.books[readState.bookNo].name + " " + readState.chapter + ":" + vs
    };
    renderBookmarkSlots();
  }



  /* ---------------- 성경 번역 비교 ---------------- */
  function getVerseFromBibleData(bno, ch, vs) {
    var book = DATA[bno];
    if (!book || !book.chapters || !book.chapters[String(ch)]) return null;
    return book.chapters[String(ch)][String(vs)] || null;
  }

  function getTranslationList() {
    /*
      이 앱에는 다음 3개 번역본이 들어 있습니다.
      std = 표준새번역
      easy = 쉬운성경
      gae = 개역개정
      비교 화면에서는 반드시 이 3개만 표시합니다.
    */
    return [
      { key:"gae",  name:"개역개정",   data:TRANSLATIONS.gae.data },
      { key:"std",  name:"표준새번역", data:TRANSLATIONS.std.data },
      { key:"easy", name:"쉬운성경",   data:TRANSLATIONS.easy.data }
    ];
  }

  function findVerseInTranslation(data, bno, ch, vs) {
    if (!data) return null;
    var book = data[bno];
    if (!book || !book.chapters) return null;
    var chapter = book.chapters[String(ch)];
    if (!chapter) return null;
    return chapter[String(vs)] || null;
  }

  function renderCompareVerse(item) {
    if (!item) return;
    var ref = commentaryLabel(item);
    els.compareRef.textContent = ref + " — 개역개정 · 표준새번역 · 쉬운성경 비교";
    els.compareCards.innerHTML = "";

    var translations = getTranslationList();
    translations.forEach(function(t) {
      var verse = findVerseInTranslation(t.data, item.bno, item.ch, item.vs);
      var card = document.createElement("div");
      card.className = "compare-translation-card";
      card.innerHTML =
        '<div class="compare-translation-name">' + escapeHtml2(t.name) + '</div>' +
        '<div class="compare-translation-text">' +
          (verse && verse.t ? escapeHtml2(verse.t) : "이 번역본에는 해당 구절이 없습니다.") +
        '</div>';
      els.compareCards.appendChild(card);
    });

    var keys = verseKeysSorted(DATA[item.bno].chapters[String(item.ch)]);
    var idx = keys.indexOf(String(item.vs));
    els.comparePrevVerseBtn.disabled = false;
    els.compareNextVerseBtn.disabled = false;

    if (idx <= 0) {
      var bpos = META.order.indexOf(item.bno);
      var chNums = chapterNumsSorted(item.bno);
      var chPos = chNums.indexOf(Number(item.ch));
      if (chPos <= 0 && bpos <= 0) els.comparePrevVerseBtn.disabled = true;
    }
    if (idx >= keys.length - 1) {
      var bpos2 = META.order.indexOf(item.bno);
      var chNums2 = chapterNumsSorted(item.bno);
      var chPos2 = chNums2.indexOf(Number(item.ch));
      if (chPos2 >= chNums2.length - 1 && bpos2 >= META.order.length - 1) els.compareNextVerseBtn.disabled = true;
    }

    els.comparePrevVerseBtn.dataset.vkey = item.bno + "-" + item.ch + "-" + item.vs;
    els.compareNextVerseBtn.dataset.vkey = item.bno + "-" + item.ch + "-" + item.vs;
  }

  function getAdjacentReadVerse(delta) {
    var item = currentReadVerse();
    if (!item) return null;

    var bno = item.bno;
    var ch = String(item.ch);
    var keys = verseKeysSorted(DATA[bno].chapters[ch]);
    var idx = keys.indexOf(String(item.vs));
    var nextIdx = idx + delta;

    if (nextIdx >= 0 && nextIdx < keys.length) {
      var vs = String(keys[nextIdx]);
      return { bno:bno, ch:ch, vs:vs, verse:DATA[bno].chapters[ch][vs] };
    }

    var chNums = chapterNumsSorted(bno);
    var chPos = chNums.indexOf(Number(ch));
    if (delta < 0) {
      if (chPos > 0) {
        var prevCh = String(chNums[chPos - 1]);
        var prevKeys = verseKeysSorted(DATA[bno].chapters[prevCh]);
        var prevVs = String(prevKeys[prevKeys.length - 1]);
        return { bno:bno, ch:prevCh, vs:prevVs, verse:DATA[bno].chapters[prevCh][prevVs] };
      }
      var bPos = META.order.indexOf(bno);
      if (bPos > 0) {
        var prevBno = META.order[bPos - 1];
        var prevChNums = chapterNumsSorted(prevBno);
        var prevCh2 = String(prevChNums[prevChNums.length - 1]);
        var prevKeys2 = verseKeysSorted(DATA[prevBno].chapters[prevCh2]);
        var prevVs2 = String(prevKeys2[prevKeys2.length - 1]);
        return { bno:prevBno, ch:prevCh2, vs:prevVs2, verse:DATA[prevBno].chapters[prevCh2][prevVs2] };
      }
    } else {
      if (chPos >= 0 && chPos < chNums.length - 1) {
        var nextCh = String(chNums[chPos + 1]);
        var nextKeys = verseKeysSorted(DATA[bno].chapters[nextCh]);
        var nextVs = String(nextKeys[0]);
        return { bno:bno, ch:nextCh, vs:nextVs, verse:DATA[bno].chapters[nextCh][nextVs] };
      }
      var bPos2 = META.order.indexOf(bno);
      if (bPos2 >= 0 && bPos2 < META.order.length - 1) {
        var nextBno = META.order[bPos2 + 1];
        var nextChNums2 = chapterNumsSorted(nextBno);
        var nextCh2 = String(nextChNums2[0]);
        var nextKeys2 = verseKeysSorted(DATA[nextBno].chapters[nextCh2]);
        var nextVs2 = String(nextKeys2[0]);
        return { bno:nextBno, ch:nextCh2, vs:nextVs2, verse:DATA[nextBno].chapters[nextCh2][nextVs2] };
      }
    }
    return null;
  }

  function moveCompareVerse(delta) {
    var item = getAdjacentReadVerse(delta);
    if (!item) return;

    // 비교창 안에서 선택 구절을 함께 이동
    readState.bookNo = item.bno;
    readState.chapter = String(item.ch);
    populateReadBooks(testamentOfBook(item.bno));
    populateChapters(item.bno, els.readChapterSelect);
    els.readBookSelect.value = item.bno;
    els.readChapterSelect.value = String(item.ch);
    renderReadChapter();
    populateReadVerseSelect();
    els.readVerseSelect.value = String(item.vs);
    saveReadLast();

    renderCompareVerse(item);
  }

  function openCompare() {
    var item = currentReadVerse();
    if (!item) {
      alert("먼저 비교할 구절을 선택해주세요.");
      return;
    }
    renderCompareVerse(item);
    els.compareScreen.classList.remove("hidden");
  }

  function closeCompare() {
    els.compareScreen.classList.add("hidden");
  }

  /* ---------------- 성경 주석 ---------------- */
  var COMMENTARY_DATA = window.COMMENTARY_DATA || {};

  function currentReadVerse() {
    var vs = els.readVerseSelect ? els.readVerseSelect.value : null;
    if (!vs) return null;
    var bno = readState.bookNo, ch = String(readState.chapter);
    var v = DATA[bno] && DATA[bno].chapters[ch] ? DATA[bno].chapters[ch][vs] : null;
    return v ? { bno: bno, ch: ch, vs: String(vs), verse: v } : null;
  }

  function commentaryLabel(item) {
    if (!item) return "";
    return (META.books[item.bno] ? META.books[item.bno].name : item.bno) +
      " " + item.ch + ":" + item.vs;
  }

  function openCommentaryForVerse(item) {
    if (!item) item = currentReadVerse();
    if (!item) {
      alert("먼저 주석을 볼 구절을 선택해주세요.");
      return;
    }

    var ref = commentaryLabel(item);
    var key = item.bno + "-" + item.ch + "-" + item.vs;
    var sourceData = COMMENTARY_DATA[key];

    els.commentaryRef.textContent = ref + " 주석";
    els.commentaryVerseBox.innerHTML =
      '<div class="commentary-verse-ref">' + escapeHtml2(ref) + '</div>' +
      '<div class="commentary-verse-text">' + escapeHtml2(item.verse.t) + '</div>';

    if (sourceData) {
      var startRef = (META.books[item.bno] ? META.books[item.bno].name : item.bno) +
        " " + item.ch + ":" + sourceData.start +
        (sourceData.end !== sourceData.start ? "-" + sourceData.end : "");

      if (sourceData.isStart) {
        els.commentaryContent.innerHTML =
          '<div class="commentary-source-title">📚 ' + escapeHtml2(sourceData.source || '주석') + '</div>' +
          '<div class="commentary-range-label">' + escapeHtml2(startRef) + '</div>' +
          '<div class="commentary-text">' + escapeHtml2(sourceData.text) + '</div>';
      } else {
        els.commentaryContent.innerHTML =
          '<div class="commentary-reference-card">' +
            '<div class="commentary-reference-icon">📖</div>' +
            '<strong>' + escapeHtml2(sourceData.start) + '절 참고</strong>' +
            '<p>이 구절은 ' + escapeHtml2(startRef) + '에 연결된 주석을 참고하세요.</p>' +
            '<button type="button" class="primary-button small commentary-go-start">📚 ' +
              escapeHtml2(sourceData.start) + '절 주석 보기</button>' +
          '</div>';

        els.commentaryContent.querySelector(".commentary-go-start").addEventListener("click", function () {
          var target = DATA[item.bno] && DATA[item.bno].chapters[item.ch]
            ? DATA[item.bno].chapters[item.ch][String(sourceData.start)] : null;
          if (target) {
            openCommentaryForVerse({
              bno: item.bno, ch: item.ch, vs: String(sourceData.start), verse: target
            });
          }
        });
      }
    } else {
      els.commentaryContent.innerHTML =
        '<div class="commentary-empty">' +
          '<div class="commentary-empty-icon">📖</div>' +
          '<strong>이 구절의 주석을 준비 중입니다.</strong>' +
          '<p>해당 구절의 주석 자료가 준비되면 이곳에서 확인할 수 있습니다.</p>' +
        '</div>';
    }

    els.commentaryScreen.classList.remove("hidden");
  }

  function closeCommentary() {
    els.commentaryScreen.classList.add("hidden");
  }

  function openCommentary() {
    var selected = els.readVerseList.querySelector(".read-verse.verse-selected");
    if (selected) {
      var key = selected.getAttribute("data-vkey").split("-");
      openCommentaryForVerse({
        bno: key[0],
        ch: key[1],
        vs: key[2],
        verse: DATA[key[0]].chapters[key[1]][key[2]]
      });
      return;
    }
    openCommentaryForVerse(currentReadVerse());
  }

  /* ---------------- 형광펜 ---------------- */
  var HL_COLORS = [
    { key: "yellow", hex: "#fdf0b8" },
    { key: "pink", hex: "#fbdfe6" },
    { key: "green", hex: "#dcefd8" },
    { key: "blue", hex: "#d9e8f5" }
  ];
  var highlightColor = null;

  function loadHighlights() {
    var p = getProfile(state.currentBirth);
    return p ? p.highlights : {};
  }
  function saveHighlights(obj) {
    if (!state.currentBirth) return;
    updateProfile(state.currentBirth, function (p) { p.highlights = obj; });
  }
  function toggleHighlight(vKey, el) {
    var hl = loadHighlights();
    HL_COLORS.forEach(function (c) { el.classList.remove("hl-" + c.key); });
    var newColor;
    if (hl[vKey] === highlightColor) {
      delete hl[vKey];
      newColor = "";
    } else {
      hl[vKey] = highlightColor;
      el.classList.add("hl-" + highlightColor);
      newColor = highlightColor;
    }
    saveHighlights(hl);

    var parts = vKey.split("-");
    var p = getProfile(state.currentBirth);
    syncPost("highlight", {
      birth: state.currentBirth,
      name: p ? p.name : "",
      bookNo: parts[0],
      bookName: META.books[parts[0]].name,
      chapter: parts[1],
      verse: parts[2],
      color: newColor
    });
  }
  function renderHighlightSwatches() {
    els.highlightSwatches.innerHTML = "";
    HL_COLORS.forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hl-swatch" + (highlightColor === c.key ? " active" : "");
      btn.style.background = c.hex;
      btn.title = "형광펜";
      btn.addEventListener("click", function () {
        highlightColor = (highlightColor === c.key) ? null : c.key;
        els.readVerseList.classList.toggle("paint-mode", !!highlightColor);
        renderHighlightSwatches();
      });
      els.highlightSwatches.appendChild(btn);
    });

  }

  /* ---------------- 말씀 복사 (여러 구절 선택 가능) ---------------- */
  var copyMode = false;
  var selectedCopyVerses = {};

  function clearCopyVerseSelection() {
    selectedCopyVerses = {};
    els.readVerseList.querySelectorAll(".read-verse.copy-selected").forEach(function (el) {
      el.classList.remove("copy-selected");
    });
    updateCopyToolbar();
  }

  function updateCopyToolbar() {
    if (!els.copyVerseBtn) return;
    els.copyVerseBtn.classList.toggle("active", copyMode);
    els.copyVerseBtn.textContent = copyMode ? "✕ 복사 취소" : "📋 말씀 복사";
    var count = Object.keys(selectedCopyVerses).length;
    if (els.copySelectedVersesBtn) {
      els.copySelectedVersesBtn.classList.toggle("hidden", !copyMode);
      els.copySelectedVersesBtn.textContent = count ? ("복사하기 (" + count + "절)") : "복사하기";
      els.copySelectedVersesBtn.disabled = count === 0;
    }
    if (els.readVerseList) els.readVerseList.classList.toggle("copy-mode", copyMode);
  }

  function toggleCopyVerse(el) {
    var key = el.getAttribute("data-vkey");
    if (!key) return;
    if (selectedCopyVerses[key]) {
      delete selectedCopyVerses[key];
      el.classList.remove("copy-selected");
    } else {
      selectedCopyVerses[key] = true;
      el.classList.add("copy-selected");
    }
    updateCopyToolbar();
  }

  function getSelectedCopyText() {
    var keys = Object.keys(selectedCopyVerses);
    var current = keys.map(function (key) {
      var parts = key.split("-");
      var bno = parts[0], ch = parts[1], vs = parts[2];
      var verse = DATA[bno] && DATA[bno].chapters[ch] ? DATA[bno].chapters[ch][vs] : null;
      if (!verse) return null;
      return { bno:bno, ch:String(ch), vs:String(vs), text:verse.t };
    }).filter(Boolean);
    current.sort(function (a,b) { return Number(a.vs) - Number(b.vs); });
    if (!current.length) return "";
    var bookName = META.books[current[0].bno].name;
    var lines = current.map(function (v) {
      return bookName + " " + v.ch + ":" + v.vs + "\n" + v.text;
    });
    return lines.join("\n\n");
  }

  function fallbackCopyText(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }

  function copySelectedVerses() {
    var text = getSelectedCopyText();
    if (!text) { alert("복사할 말씀을 먼저 선택해주세요."); return; }
    var done = function () {
      alert("선택한 말씀을 복사했습니다.\n카카오톡, 문자, 메신저 등에 붙여넣어 보내세요.");
      copyMode = false;
      clearCopyVerseSelection();
      updateCopyToolbar();
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        if (fallbackCopyText(text)) done();
        else alert("복사하지 못했습니다. 말씀을 다시 선택해 주세요.");
      });
    } else if (fallbackCopyText(text)) {
      done();
    } else {
      alert("복사하지 못했습니다. 말씀을 다시 선택해 주세요.");
    }
  }

  /* ---------------- 책갈피 5개 (성경 보기, 로그인한 사람별) ---------------- */
  var pendingBookmarkVerse = null;

  function loadReadBookmarks() {
    var p = getProfile(state.currentBirth);
    return p ? p.readBookmarks : [null, null, null, null, null];
  }
  function saveReadBookmarks(arr) {
    if (!state.currentBirth) return;
    updateProfile(state.currentBirth, function (p) { p.readBookmarks = arr; });
  }
  function renderBookmarkSlots() {
    var slots = loadReadBookmarks();
    els.bookmarkSlots.innerHTML = "";
    slots.forEach(function (slot, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bookmark-slot" + (slot ? " filled" : "") + (pendingBookmarkVerse ? " pending-save" : "");
      btn.textContent = slot ? slot.label : ("자리 " + (i + 1));
      btn.title = pendingBookmarkVerse
        ? "눌러서 " + pendingBookmarkVerse.label + " 저장"
        : (slot ? "눌러서 이동" : "절을 먼저 선택해주세요");
      btn.addEventListener("click", function () {
        if (pendingBookmarkVerse) {
          slots[i] = { bno: pendingBookmarkVerse.bno, ch: pendingBookmarkVerse.ch, vs: pendingBookmarkVerse.vs, label: pendingBookmarkVerse.label };
          saveReadBookmarks(slots);
          pendingBookmarkVerse = null;
          els.readVerseList.querySelectorAll(".read-verse.verse-selected").forEach(function (v) {
            v.classList.remove("verse-selected");
          });
          renderBookmarkSlots();
        } else if (slot) {
          readGoTo(slot.bno, slot.ch, slot.vs);
        }
      });
      els.bookmarkSlots.appendChild(btn);
    });
  }

  /* ---------------- 성경책 검색 ---------------- */
  function normalizeBookSearchText(value) {
    return String(value || "")
      .normalize("NFC")
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  function openBibleBookSearch() {
    els.bibleBookSearchScreen.classList.remove("hidden");
    els.bibleBookSearchInput.value = "";
    els.bibleBookSearchResults.innerHTML = "";
    els.bibleBookSearchStatus.textContent = "예: 창 → 창세기";
    setTimeout(function () { els.bibleBookSearchInput.focus(); }, 50);
  }

  function closeBibleBookSearch() {
    els.bibleBookSearchScreen.classList.add("hidden");
  }

  function searchBibleBook() {
    var query = String(els.bibleBookSearchInput.value || "").trim();
    var needle = normalizeBookSearchText(query);
    els.bibleBookSearchResults.innerHTML = "";

    if (!needle) {
      els.bibleBookSearchStatus.textContent = "성경책 이름이나 약어를 입력해주세요.";
      return;
    }

    var results = [];
    META.order.forEach(function (bno) {
      var book = META.books[bno] || {};
      var name = String(book.name || "");
      var abbr = String(book.abbr || "");
      var nameN = normalizeBookSearchText(name);
      var abbrN = normalizeBookSearchText(abbr);
      if (nameN.indexOf(needle) !== -1 || abbrN.indexOf(needle) !== -1) {
        results.push({
          bno: bno,
          name: name,
          abbr: abbr,
          testament: testamentOfBook(bno) === "OT" ? "구약" : "신약"
        });
      }
    });

    els.bibleBookSearchStatus.textContent = results.length
      ? "'" + query + "' 검색 결과 " + results.length + "개"
      : "'" + query + "'에 해당하는 성경책을 찾지 못했어요.";

    results.forEach(function (item) {
      var row = document.createElement("button");
      row.type = "button";
      row.className = "bible-book-search-result";
      row.innerHTML =
        '<span class="bible-book-search-name">' + escapeHtml2(item.name) + '</span>' +
        '<span class="bible-book-search-meta">' + escapeHtml2(item.abbr || "") + ' · ' + item.testament + '</span>';
      row.addEventListener("click", function () {
        closeBibleBookSearch();
        readGoTo(item.bno, chapterNumsSorted(item.bno)[0], 1);
      });
      els.bibleBookSearchResults.appendChild(row);
    });
  }

  /* ---------------- 말씀 검색 ---------------- */
  function openBibleSearch() {
    els.bibleSearchScreen.classList.remove("hidden");
    els.bibleSearchInput.value = "";
    els.bibleSearchResults.innerHTML = "";
    els.bibleSearchStatus.textContent = "단어를 입력하면 해당 단어가 포함된 구절을 찾아드려요.";
    setTimeout(function () { els.bibleSearchInput.focus(); }, 50);
  }

  function closeBibleSearch() {
    els.bibleSearchScreen.classList.add("hidden");
  }

  function normalizeSearchText(value) {
    return String(value || "")
      .normalize("NFC")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function searchBibleWord() {
    var query = String(els.bibleSearchInput.value || "").trim();
    els.bibleSearchResults.innerHTML = "";

    if (!query) {
      els.bibleSearchStatus.textContent = "검색할 단어를 입력해주세요.";
      return;
    }

    var needle = normalizeSearchText(query);
    var results = [];

    /*
      기존 검색은 META.books.chapters를 성경본문처럼 순회하고 있었습니다.
      META의 chapters에는 '장별 절 개수'만 들어 있기 때문에 실제 본문을
      찾을 수 없었습니다. 검색은 반드시 현재 선택된 번역의 DATA를 사용합니다.
    */
    for (var oi = 0; oi < META.order.length && results.length < 100; oi++) {
      var bno = META.order[oi];
      var bookMeta = META.books[bno] || {};
      var bookData = DATA[bno];
      if (!bookData || !bookData.chapters) continue;

      var chNums = Object.keys(bookData.chapters)
        .map(Number)
        .sort(function(a, b) { return a - b; });

      for (var ci = 0; ci < chNums.length && results.length < 100; ci++) {
        var ch = String(chNums[ci]);
        var verses = bookData.chapters[ch] || {};
        var vsNums = Object.keys(verses)
          .map(Number)
          .sort(function(a, b) { return a - b; });

        for (var vi = 0; vi < vsNums.length && results.length < 100; vi++) {
          var vs = String(vsNums[vi]);
          var verse = verses[vs];
          var text = verse && verse.t ? String(verse.t) : "";
          if (!text) continue;

          if (normalizeSearchText(text).indexOf(needle) !== -1) {
            results.push({
              bno: bno,
              ch: ch,
              vs: vs,
              label: (bookData.name || bookMeta.name || "") + " " + ch + ":" + vs,
              text: text
            });
          }
        }
      }
    }

    els.bibleSearchStatus.textContent = results.length
      ? "'" + query + "' 검색 결과 " + results.length + "개" +
        (results.length >= 100 ? " (최대 100개)" : "")
      : "'" + query + "'이(가) 포함된 구절을 찾지 못했어요.";

    results.forEach(function(item) {
      var row = document.createElement("button");
      row.type = "button";
      row.className = "bible-search-result";
      row.innerHTML =
        '<span class="bible-search-ref">' + escapeHtml2(item.label) + '</span>' +
        '<span class="bible-search-text">' + escapeHtml2(item.text) + '</span>';

      row.addEventListener("click", function() {
        closeBibleSearch();
        readGoTo(item.bno, item.ch, item.vs);
      });

      els.bibleSearchResults.appendChild(row);
    });
  }

  /* ---------------- 예배노트 (여러 절을 하나의 말씀 구간으로 기록) ---------------- */
  var sermonSelectionMode = false;
  var selectedSermonVerses = {};
  var gratitudeHistoryScrollY = 0;
  var sermonEditorSelection = [];

  function loadSermonNotes() {
    var p = getProfile(state.currentBirth);
    return p ? p.sermonNotes : {};
  }
  function saveSermonNotes(obj) {
    if (!state.currentBirth) return;
    updateProfile(state.currentBirth, function (p) { p.sermonNotes = obj; });
  }

  function parseSermonEntry(entry) {
    var copy = Object.assign({}, entry || {});
    copy.bno = String(copy.bno || "");
    copy.ch = String(copy.ch || "");
    copy.vs = String(copy.vs || "");
    copy.updatedAt = Number(copy.updatedAt) || 0;
    if (!copy.insight && !copy.application && !copy.prayer && typeof copy.text === "string") {
      try {
        var obj = JSON.parse(copy.text);
        if (obj && typeof obj === "object" && (obj.insight !== undefined || obj.application !== undefined || obj.prayer !== undefined)) {
          copy.insight = String(obj.insight || "");
          copy.application = String(obj.application || "");
          copy.prayer = String(obj.prayer || "");
        }
      } catch (e) {}
    }
    if (copy.insight === undefined) copy.insight = "";
    if (copy.application === undefined) copy.application = "";
    if (copy.prayer === undefined) copy.prayer = "";
    return copy;
  }

  function verseNumbersFromEntry(entry) {
    var raw = String(entry.vs || "").trim();
    if (raw.indexOf(",") >= 0) {
      return raw.split(",").map(function (v) { return Number(v.trim()); }).filter(function (v) { return isFinite(v); }).sort(function(a,b){return a-b;});
    }
    var m = raw.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      var a = Number(m[1]), b = Number(m[2]), out = [];
      for (var i = a; i <= b; i++) out.push(i);
      return out;
    }
    var n = Number(raw);
    return isFinite(n) ? [n] : [];
  }

  function sermonRangeLabel(bno, ch, verses) {
    var bookName = META.books[bno] ? META.books[bno].name : bno;
    var nums = (verses || []).map(Number).filter(function(n){return isFinite(n);}).sort(function(a,b){return a-b;});
    if (!nums.length) return bookName + " " + ch + "장";
    var ranges = [];
    var start = nums[0], prev = nums[0];
    for (var i = 1; i < nums.length; i++) {
      if (nums[i] === prev + 1) { prev = nums[i]; continue; }
      ranges.push(start === prev ? String(start) : start + "-" + prev);
      start = prev = nums[i];
    }
    ranges.push(start === prev ? String(start) : start + "-" + prev);
    return bookName + " " + ch + "장 " + ranges.join(", ") + "절";
  }

  function selectedSermonArray() {
    return Object.keys(selectedSermonVerses).map(function(key) {
      var parts = key.split("-");
      var bno = parts[0], ch = parts[1], vs = parts[2];
      var verse = DATA[bno] && DATA[bno].chapters[ch] ? DATA[bno].chapters[ch][vs] : null;
      return verse ? { bno:bno, ch:String(ch), vs:String(vs), verse:verse } : null;
    }).filter(Boolean).sort(function(a,b){
      if (a.bno !== b.bno) return Number(a.bno)-Number(b.bno);
      if (a.ch !== b.ch) return Number(a.ch)-Number(b.ch);
      return Number(a.vs)-Number(b.vs);
    });
  }

  function updateSermonSelectionToolbar() {
    var count = Object.keys(selectedSermonVerses).length;
    if (els.sermonNoteBtn) {
      if (!sermonSelectionMode) els.sermonNoteBtn.textContent = "📝 예배노트";
      else if (count) els.sermonNoteBtn.textContent = "📝 선택한 말씀으로 노트 작성 (" + count + "절)";
      else els.sermonNoteBtn.textContent = "✕ 말씀 선택 취소";
      els.sermonNoteBtn.classList.toggle("active", sermonSelectionMode);
    }
    if (els.sermonSelectionStatus) {
      els.sermonSelectionStatus.classList.toggle("hidden", !sermonSelectionMode);
      els.sermonSelectionStatus.textContent = sermonSelectionMode
        ? (count ? count + "절 선택됨 · 다시 눌러 노트 작성" : "노트로 묶을 말씀을 눌러주세요")
        : "";
    }
    if (els.readVerseList) els.readVerseList.classList.toggle("sermon-select-mode", sermonSelectionMode);
  }

  function clearSermonSelection() {
    selectedSermonVerses = {};
    if (els.readVerseList) els.readVerseList.querySelectorAll(".read-verse.sermon-selected").forEach(function(el){ el.classList.remove("sermon-selected"); });
    updateSermonSelectionToolbar();
  }

  function toggleSermonVerse(el) {
    var key = el.getAttribute("data-vkey");
    if (!key) return;
    if (selectedSermonVerses[key]) {
      delete selectedSermonVerses[key];
      el.classList.remove("sermon-selected");
    } else {
      selectedSermonVerses[key] = true;
      el.classList.add("sermon-selected");
    }
    updateSermonSelectionToolbar();
  }

  function buildSermonSelectionLabel(items) {
    if (!items.length) return "";
    var first = items[0];
    var sameChapter = items.every(function(item){ return item.bno === first.bno && item.ch === first.ch; });
    if (sameChapter) return sermonRangeLabel(first.bno, first.ch, items.map(function(i){return i.vs;}));
    return items.map(function(item){
      return (META.books[item.bno] ? META.books[item.bno].name : item.bno) + " " + item.ch + ":" + item.vs;
    }).join(", ");
  }

  function openSermonEditor() {
    var items = selectedSermonArray();
    if (!items.length) return;
    sermonEditorSelection = items;
    var refLabel = buildSermonSelectionLabel(items);
    if (els.sermonNoteDate) els.sermonNoteDate.textContent = "오늘의 예배노트 · " + todayString().replace(/-/g, ".");
    if (els.sermonSelectedRef) els.sermonSelectedRef.textContent = refLabel;
    if (els.sermonSelectedVerses) {
      els.sermonSelectedVerses.innerHTML = items.map(function(item){
        return '<div class="sermon-selected-verse"><b>' + escapeHtml2(item.vs + "절") + '</b><span>' + escapeHtml2(item.verse.t) + '</span></div>';
      }).join('');
    }

    var notes = loadSermonNotes();
    var today = todayString();
    var existing = null;
    (notes[today] || []).forEach(function(entry){
      var parsed = parseSermonEntry(entry);
      var entryKeys = verseNumbersFromEntry(parsed).join(",");
      var currentKeys = items.map(function(i){return Number(i.vs);}).sort(function(a,b){return a-b;}).join(",");
      if (parsed.bno === items[0].bno && parsed.ch === items[0].ch && entryKeys === currentKeys) existing = parsed;
    });
    if (els.sermonInsightInput) els.sermonInsightInput.value = existing ? existing.insight : "";
    if (els.sermonApplicationInput) els.sermonApplicationInput.value = existing ? existing.application : "";
    if (els.sermonPrayerInput) els.sermonPrayerInput.value = existing ? existing.prayer : "";
    if (els.sermonEditorDeleteBtn) els.sermonEditorDeleteBtn.disabled = !existing;
    if (els.sermonEditorSaved) els.sermonEditorSaved.textContent = "";
    if (els.sermonEditor) els.sermonEditor.classList.remove("hidden");
    if (els.sermonHistory) els.sermonHistory.classList.add("hidden");
    if (els.sermonNoteScreen) els.sermonNoteScreen.classList.remove("hidden");
    clearSermonSelection();
    setTimeout(function(){ if (els.sermonInsightInput) els.sermonInsightInput.focus(); }, 80);
  }

  function saveSermonEditor() {
    if (!state.currentBirth || !sermonEditorSelection.length) return;
    var items = sermonEditorSelection;
    var today = todayString();
    var verses = items.map(function(i){return Number(i.vs);}).sort(function(a,b){return a-b;});
    var verseLabel = (function(){
      var start=verses[0], prev=verses[0], ranges=[];
      for(var i=1;i<verses.length;i++){ if(verses[i]===prev+1){prev=verses[i];} else {ranges.push(start===prev?String(start):start+"-"+prev); start=prev=verses[i];} }
      ranges.push(start===prev?String(start):start+"-"+prev); return ranges.join(",");
    })();
    var obj = {
      bno: items[0].bno,
      ch: items[0].ch,
      vs: verseLabel,
      label: buildSermonSelectionLabel(items),
      insight: els.sermonInsightInput ? els.sermonInsightInput.value.trim() : "",
      application: els.sermonApplicationInput ? els.sermonApplicationInput.value.trim() : "",
      prayer: els.sermonPrayerInput ? els.sermonPrayerInput.value.trim() : "",
      updatedAt: nowStamp()
    };
    obj.text = JSON.stringify({ insight: obj.insight, application: obj.application, prayer: obj.prayer });

    var notes = loadSermonNotes();
    if (!notes[today]) notes[today] = [];
    var idx = -1;
    for (var i=0;i<notes[today].length;i++) {
      var e = parseSermonEntry(notes[today][i]);
      if (e.bno === obj.bno && e.ch === obj.ch && verseNumbersFromEntry(e).join(",") === verses.join(",")) { idx=i; break; }
    }
    if (idx >= 0) notes[today][idx] = obj; else notes[today].push(obj);
    saveSermonNotes(notes);
    if (els.readVerseList && readState.bookNo && readState.chapter) renderReadChapter();

    var p = getProfile(state.currentBirth);
    syncPost("sermonNote", {
      birth: state.currentBirth,
      name: p ? p.name : "",
      date: today,
      bookNo: obj.bno,
      bookName: META.books[obj.bno].name,
      chapter: obj.ch,
      verse: obj.vs,
      text: obj.text
    });
    if (els.sermonEditorDeleteBtn) els.sermonEditorDeleteBtn.disabled = false;
    if (els.sermonEditorSaved) {
      els.sermonEditorSaved.textContent = "저장되었습니다.";
      setTimeout(function(){ if(els.sermonEditorSaved) els.sermonEditorSaved.textContent=""; }, 2000);
    }
  }

  function deleteSermonRemote(entry) {
    var p = getProfile(state.currentBirth);
    return syncPost("deleteSermonNote", {
      birth: state.currentBirth,
      name: p ? p.name : "",
      date: entry.date || todayString(),
      bookNo: entry.bno,
      chapter: entry.ch,
      verse: entry.vs
    });
  }

  function deleteCurrentSermonNote() {
    if (!state.currentBirth || !sermonEditorSelection.length) return;
    var items = sermonEditorSelection;
    var today = todayString();
    var verses = items.map(function(i){ return Number(i.vs); }).sort(function(a,b){return a-b;});
    var notes = loadSermonNotes();
    var list = notes[today] || [];
    var removed = null;
    var kept = [];
    list.forEach(function(raw){
      var e = parseSermonEntry(raw);
      var nums = verseNumbersFromEntry(e).join(",");
      if (!removed && String(e.bno) === String(items[0].bno) && String(e.ch) === String(items[0].ch) && nums === verses.join(",")) {
        removed = e;
      } else {
        kept.push(raw);
      }
    });
    if (!removed) {
      if (els.sermonEditorSaved) els.sermonEditorSaved.textContent = "삭제할 저장 기록이 없습니다.";
      return;
    }
    notes[today] = kept;
    if (!kept.length) delete notes[today];
    saveSermonNotes(notes);
    if (els.readVerseList && readState.bookNo && readState.chapter) renderReadChapter();
    deleteSermonRemote({bno:removed.bno, ch:removed.ch, vs:removed.vs, date:today});
    sermonEditorSelection = [];
    if (els.sermonEditorDeleteBtn) els.sermonEditorDeleteBtn.disabled = true;
    if (els.sermonInsightInput) els.sermonInsightInput.value = "";
    if (els.sermonApplicationInput) els.sermonApplicationInput.value = "";
    if (els.sermonPrayerInput) els.sermonPrayerInput.value = "";
    if (els.sermonEditorSaved) els.sermonEditorSaved.textContent = "삭제되었습니다.";
    setTimeout(function(){ closeSermonNote(); }, 500);
  }

  function openSermonHistory() {
    if (els.sermonEditor) els.sermonEditor.classList.add("hidden");
    if (els.sermonHistory) els.sermonHistory.classList.remove("hidden");
    renderSermonHistoryList();
    els.sermonNoteScreen.classList.remove("hidden");
  }
  function closeSermonNote() {
    els.sermonNoteScreen.classList.add("hidden");
    if (els.sermonEditor) els.sermonEditor.classList.add("hidden");
    if (els.sermonHistory) els.sermonHistory.classList.add("hidden");
  }

  function renderSermonHistoryList() {
    var notes = loadSermonNotes();
    var today = todayString();
    var dates = Object.keys(notes).filter(function (d) { return d !== today && notes[d] && notes[d].length; }).sort().reverse();
    els.sermonNoteDate.textContent = "지난 예배노트";
    els.sermonHistory.innerHTML = "";
    if (dates.length === 0) {
      els.sermonHistory.innerHTML = '<p class="stats-empty">오늘 이전 기록이 아직 없어요.</p>';
      return;
    }
    dates.forEach(function (d) {
      var count = notes[d].length;
      var row = document.createElement("button");
      row.type = "button";
      row.className = "sermon-history-row";
      row.innerHTML = '<span class="sermon-history-date">' + escapeHtml2(formatSermonDateTime(d, notes[d])) + '</span><span class="sermon-history-snippet">예배말씀 ' + count + '건</span>';
      row.addEventListener("click", function () { renderSermonDateDetail(d); });
      els.sermonHistory.appendChild(row);
    });
  }

  function renderSermonDateDetail(date) {
    els.sermonNoteDate.textContent = formatSermonDateTime(date, loadSermonNotes()[date] || []);
    var entries = loadSermonNotes()[date] || [];
    els.sermonHistory.innerHTML = "";
    var backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "text-link";
    backBtn.textContent = "← 날짜 목록으로";
    backBtn.addEventListener("click", renderSermonHistoryList);
    els.sermonHistory.appendChild(backBtn);

    entries.forEach(function(entry, idx){
      var e = parseSermonEntry(entry);
      var card = document.createElement("div");
      card.className = "sermon-entry";
      card.innerHTML =
        '<div class="sermon-entry-head"><span class="sermon-entry-ref">' + escapeHtml2(e.label || ((META.books[e.bno] ? META.books[e.bno].name : e.bno) + " " + e.ch + ":" + e.vs)) + '</span><button type="button" class="sermon-entry-delete">삭제</button></div>' +
        '<div class="sermon-history-section"><div class="sermon-history-title">💡 깨달은 점</div><div class="sermon-history-text">' + escapeHtml2(e.insight || e.text || "-").replace(/\n/g,"<br>") + '</div></div>' +
        '<div class="sermon-history-section"><div class="sermon-history-title">🌱 적용할 점</div><div class="sermon-history-text">' + escapeHtml2(e.application || "-").replace(/\n/g,"<br>") + '</div></div>' +
        '<div class="sermon-history-section"><div class="sermon-history-title">🙏 기도</div><div class="sermon-history-text">' + escapeHtml2(e.prayer || "-").replace(/\n/g,"<br>") + '</div></div>';
      card.querySelector(".sermon-entry-delete").addEventListener("click", function(){
        if(!confirm("이 예배노트를 삭제할까요?")) return;
        var notes=loadSermonNotes();
        notes[date].splice(idx,1);
        if(!notes[date].length) delete notes[date];
        saveSermonNotes(notes);
        deleteSermonRemote({bno:e.bno, ch:e.ch, vs:e.vs, date:date});
        renderSermonDateDetail(date);
      });
      els.sermonHistory.appendChild(card);
    });
  }

  function readAdjacentChapter(delta) {
    var chNums = chapterNumsSorted(readState.bookNo);
    var pos = chNums.indexOf(Number(readState.chapter)) + delta;
    if (pos < 0) {
      var bPos = META.order.indexOf(readState.bookNo);
      if (bPos > 0) {
        var prevBno = META.order[bPos - 1];
        var prevChNums = chapterNumsSorted(prevBno);
        readGoTo(prevBno, prevChNums[prevChNums.length - 1]);
      }
      return;
    }
    if (pos >= chNums.length) {
      var bPos2 = META.order.indexOf(readState.bookNo);
      if (bPos2 < META.order.length - 1) {
        var nextBno = META.order[bPos2 + 1];
        readGoTo(nextBno, chapterNumsSorted(nextBno)[0]);
      }
      return;
    }
    readGoTo(readState.bookNo, chNums[pos]);
  }


  function bookTotalVerses(bno) {
    var chapters = META.books[bno].chapters;
    var total = 0;
    Object.keys(chapters).forEach(function (ch) { total += chapters[ch]; });
    return total;
  }

  function bookCompletedCount(p, bno) {
    var prefix = bno + "-";
    var count = 0;
    Object.keys(p.completed).forEach(function (k) { if (k.indexOf(prefix) === 0) count++; });
    return count;
  }

  function isBookComplete(p, bno) {
    return bookCompletedCount(p, bno) >= bookTotalVerses(bno);
  }

  function chapterCompletedCount(p, bno, ch) {
    var prefix = bno + "-" + ch + "-";
    var count = 0;
    Object.keys(p.completed).forEach(function (k) { if (k.indexOf(prefix) === 0) count++; });
    return count;
  }

  // 완료 데이터를 기준으로, 해당 책에서 아직 안 쓴 첫 구절을 찾는다 (버그의 근본 원인 제거)
  function findNextUncompletedInBook(p, bno) {
    var chNums = chapterNumsSorted(bno);
    for (var i = 0; i < chNums.length; i++) {
      var ch = String(chNums[i]);
      var keys = verseKeysSorted(DATA[bno].chapters[ch]);
      for (var j = 0; j < keys.length; j++) {
        var vKey = bno + "-" + ch + "-" + keys[j];
        if (!p.completed[vKey]) return { chapter: ch, verse: keys[j] };
      }
    }
    return null; // 이 책은 전부 완료됨
  }

  function findNextUncompletedInChapter(p, bno, ch) {
    var keys = verseKeysSorted(DATA[bno].chapters[String(ch)]);
    for (var j = 0; j < keys.length; j++) {
      var vKey = bno + "-" + ch + "-" + keys[j];
      if (!p.completed[vKey]) return keys[j];
    }
    return null;
  }

  function goToBookResume(bno) {
    var p = getProfile(state.currentBirth);
    populateChapters(bno);
    var next = findNextUncompletedInBook(p, bno);
    if (next) {
      var keys = verseKeysSorted(DATA[bno].chapters[next.chapter]);
      goTo(bno, next.chapter, keys.indexOf(next.verse));
    } else {
      goTo(bno, chapterNumsSorted(bno)[0], 0); // 이미 다 썼으면 1장부터 다시 볼 수 있게
    }
  }

  /* ---------------- 가족 통계 ---------------- */
  function renderStatsRows(profiles) {
    var births = Object.keys(profiles);
    els.statsList.innerHTML = "";
    if (births.length === 0) {
      els.statsList.innerHTML = '<p class="stats-empty">아직 필사 기록이 없어요.</p>';
      return;
    }
    births.sort(function (a, b) { return profiles[b].count - profiles[a].count; });
    births.forEach(function (birth) {
      var p = profiles[birth];
      var pct = Math.min(100, (p.count / TOTAL_VERSES) * 100);
      var row = document.createElement("div");
      row.className = "stats-row";
      row.innerHTML =
        '<div class="stats-row-top">' +
          '<span class="stats-name">' + escapeHtml2(p.name) + '</span>' +
          '<span class="stats-count">' + p.count.toLocaleString() + '절 · ' + pct.toFixed(2) + '%</span>' +
        '</div>' +
        '<div class="stats-bar-track"><div class="stats-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="stats-row-bottom">' +
          '<span class="stats-last">' + (p.lastActive ? "마지막 필사: " + p.lastActive : "아직 활동 없음") + '</span>' +
          '<button class="stats-delete-btn" data-birth="' + escapeHtml2(birth) + '">기록 삭제 (관리자)</button>' +
        '</div>';
      els.statsList.appendChild(row);
    });

    els.statsList.querySelectorAll(".stats-delete-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var birth = btn.getAttribute("data-birth");
        var profs = loadProfiles();
        var targetName = profs[birth] ? profs[birth].name : (profiles[birth] ? profiles[birth].name : birth);
        if (!requireAdmin("기록 삭제")) return;
        if (confirm(targetName + "님의 필사 기록을 정말 삭제할까요? (이 기기에 저장된 기록만 삭제돼요. 구글시트에 남은 기록은 별도로 지워야 해요.)")) {
          deleteProfile(birth);
          openStats();
          if (birth === state.currentBirth) renderChapterDots();
        }
      });
    });
  }

  function localProfilesAsRows() {
    var profiles = loadProfiles();
    var rows = {};
    Object.keys(profiles).forEach(function (birth) {
      var p = profiles[birth];
      rows[birth] = { name: p.name, count: Object.keys(p.completed).length, lastActive: p.lastActive };
    });
    return rows;
  }

  function openStats() {
    var rows = localProfilesAsRows();
    renderStatsRows(rows);
    els.statsScreen.classList.remove("hidden");
    if (getSyncUrl()) {
      syncGet({ action: "list" }).then(function (remoteList) {
        if (!remoteList || !remoteList.length) return;
        remoteList.forEach(function (r) {
          var cur = rows[r.birth];
          if (!cur || r.count > cur.count) {
            rows[r.birth] = { name: r.name, count: r.count, lastActive: r.lastActive };
          }
        });
        renderStatsRows(rows);
      });
    }
  }
  function closeStats() {
    els.statsScreen.classList.add("hidden");
  }

  /* ---------------- 이어쓰기 목록 (장/절 단위) ---------------- */
  function renderBookmarks() {
    els.bookmarksList.innerHTML = "";
    if (!state.currentBirth) {
      els.bookmarksList.innerHTML = '<p class="stats-empty">먼저 생년월일로 입장해주세요.</p>';
      return;
    }
    var p = getProfile(state.currentBirth);
    var bnos = Object.keys(p.bookTouch);
    if (bnos.length === 0) {
      els.bookmarksList.innerHTML = '<p class="stats-empty">아직 필사를 시작한 책이 없어요.</p>';
      return;
    }
    bnos.sort(function (a, b) { return p.bookTouch[b] - p.bookTouch[a]; });

    bnos.forEach(function (bno) {
      var bookName = META.books[bno] ? META.books[bno].name : bno;
      var total = bookTotalVerses(bno);
      var completed = bookCompletedCount(p, bno);
      var complete = completed >= total;
      var next = findNextUncompletedInBook(p, bno);

      var wrap = document.createElement("div");
      wrap.className = "bookmark-row";

      var head = document.createElement("button");
      head.type = "button";
      head.className = "bookmark-head";
      head.innerHTML =
        '<span class="bookmark-book">' + escapeHtml2(bookName) + (complete ? ' <span class="bookmark-star">★ 완료</span>' : '') + '</span>' +
        '<span class="bookmark-pos">' + completed + ' / ' + total + '절' +
          (complete ? '' : ' · 다음: ' + next.chapter + '장 ' + next.verse + '절') + '</span>';
      head.addEventListener("click", function () {
        closeBookmarks();
        goToBookResume(bno);
      });
      wrap.appendChild(head);

      var chipCaption = document.createElement("div");
      chipCaption.className = "chip-caption";
      chipCaption.textContent = "장을 눌러 그 장에서 이어 쓰기";
      wrap.appendChild(chipCaption);

      var chipWrap = document.createElement("div");
      chipWrap.className = "chapter-chips";
      chapterNumsSorted(bno).forEach(function (ch) {
        var chStr = String(ch);
        var chTotal = META.books[bno].chapters[chStr];
        var chDone = chapterCompletedCount(p, bno, chStr);
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chapter-chip" + (chDone >= chTotal ? " chip-done" : (chDone > 0 ? " chip-partial" : ""));
        chip.textContent = ch;
        chip.title = ch + "장 " + chDone + "/" + chTotal + "절";
        chip.addEventListener("click", function (e) {
          e.stopPropagation();
          closeBookmarks();
          populateChapters(bno);
          var nextV = findNextUncompletedInChapter(p, bno, chStr);
          if (nextV) {
            var keys = verseKeysSorted(DATA[bno].chapters[chStr]);
            goTo(bno, chStr, keys.indexOf(nextV));
          } else {
            goTo(bno, chStr, 0);
          }
        });
        chipWrap.appendChild(chip);
      });
      wrap.appendChild(chipWrap);

      els.bookmarksList.appendChild(wrap);
    });
  }
  function openBookmarks() {
    renderBookmarks();
    els.bookmarksScreen.classList.remove("hidden");
  }
  function closeBookmarks() {
    els.bookmarksScreen.classList.add("hidden");
  }

  /* ---------------- 앱 시작 ---------------- */
  function startAppForUser(birth) {
    var p = getProfile(birth);
    if (els.writeTestamentSelect) {
      var initialTestament = "OT";
      var savedPosForTest = p && p.lastWritePosition;
      if (savedPosForTest && savedPosForTest.bookNo) initialTestament = testamentOfBook(savedPosForTest.bookNo);
      els.writeTestamentSelect.value = initialTestament;
      populateWriteBooks(initialTestament);
    } else {
      populateBooks(els.bookSelect, true);
    }

    // 가장 최근에 저장된 필사 위치가 있으면 그 자리에서 바로 이어씁니다.
    var pos = p && p.lastWritePosition;
    if (pos && META.books[pos.bookNo] && META.books[pos.bookNo].chapters[String(pos.chapter)] &&
        META.books[pos.bookNo].chapters[String(pos.chapter)] >= 0) {
      var keys = verseKeysSorted(DATA[pos.bookNo].chapters[String(pos.chapter)]);
      var vi = keys.indexOf(String(pos.verse));
      if (vi >= 0) {
        goTo(pos.bookNo, String(pos.chapter), vi);
        return;
      }
    }

    var bnos = Object.keys(p.bookTouch);
    var startBno = META.order[0];
    if (bnos.length > 0) {
      bnos.sort(function (a, b) { return p.bookTouch[b] - p.bookTouch[a]; });
      startBno = bnos[0];
    }
    goToBookResume(startBno);
  }

  /* ---------------- 기독교 명언 ---------------- */
  var christianQuoteCategory = null;
  var christianQuoteIndex = 0;
  var christianQuoteOrder = [];

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function getChristianQuotes() {
    return Array.isArray(window.CHRISTIAN_QUOTES) ? window.CHRISTIAN_QUOTES : [];
  }

  function christianQuoteCategoryList() {
    var seen = {};
    var list = [];
    getChristianQuotes().forEach(function(item){
      if (!seen[item.category]) { seen[item.category] = true; list.push(item.category); }
    });
    return list;
  }

  function renderChristianQuoteCategories() {
    if (!els.christianQuoteCategories) return;
    var quotes = getChristianQuotes();
    var counts = {};
    quotes.forEach(function(item){ counts[item.category] = (counts[item.category] || 0) + 1; });
    els.christianQuoteCategories.innerHTML = '';
    var all = document.createElement('button');
    all.type = 'button';
    all.className = 'christian-quote-category-card';
    all.innerHTML = '<span class="christian-quote-cat-icon">✦</span><span class="christian-quote-cat-name">전체 명언</span><small>' + quotes.length + '개</small>';
    all.addEventListener('click', function(){ openChristianQuoteCategory(null); });
    els.christianQuoteCategories.appendChild(all);
    christianQuoteCategoryList().forEach(function(cat){
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'christian-quote-category-card';
      var parts = String(cat).split(' ');
      var icon = parts.shift();
      var name = parts.join(' ');
      card.innerHTML = '<span class="christian-quote-cat-icon">' + escapeHtml(icon) + '</span><span class="christian-quote-cat-name">' + escapeHtml(name) + '</span><small>' + counts[cat] + '개</small>';
      card.addEventListener('click', function(){ openChristianQuoteCategory(cat); });
      els.christianQuoteCategories.appendChild(card);
    });
  }

  function christianQuotePool(category) {
    var quotes = getChristianQuotes();
    if (!category) return quotes;
    return quotes.filter(function(item){ return item.category === category; });
  }

  function renderChristianQuoteDetail() {
    if (!christianQuoteOrder.length) christianQuoteOrder = shuffleArray(christianQuotePool(christianQuoteCategory));
    var pool = christianQuoteOrder;
    if (!pool.length) {
      if (els.christianQuoteDetail) els.christianQuoteDetail.classList.add('hidden');
      if (els.christianQuoteEmpty) els.christianQuoteEmpty.classList.remove('hidden');
      return;
    }
    if (els.christianQuoteEmpty) els.christianQuoteEmpty.classList.add('hidden');
    if (els.christianQuoteDetail) els.christianQuoteDetail.classList.remove('hidden');
    var item = pool[christianQuoteIndex % pool.length];
    var total = getChristianQuotes().length;
    var globalIndex = getChristianQuotes().indexOf(item) + 1;
    if (els.christianQuoteCategory) els.christianQuoteCategory.textContent = item.category;
    if (els.christianQuoteNumber) els.christianQuoteNumber.textContent = '명언 ' + globalIndex + ' / ' + total;
    if (els.christianQuoteText) els.christianQuoteText.textContent = item.quote;
    if (els.christianQuoteReflection) els.christianQuoteReflection.textContent = item.reflection;
    if (els.christianQuoteVerse) els.christianQuoteVerse.textContent = item.verse;
    if (els.christianQuoteVerseText) els.christianQuoteVerseText.textContent = getChristianQuoteVerseText(item.verse, item);
    if (els.christianQuoteCopyStatus) els.christianQuoteCopyStatus.textContent = '';
  }

  function getChristianQuoteVerseText(reference, item) {
    try {
      // 명언 데이터에 쉬운성경 본문을 직접 포함해 두어,
      // 브라우저에서 성경 데이터의 구조/로딩 상태에 관계없이 본문이 표시되도록 합니다.
      if (item && item.verseText) return String(item.verseText).trim();
      var ref = String(reference || '').trim();
      var m = ref.match(/^(.+?)\s+(\d+):([0-9]+)(?:-([0-9]+))?$/);
      if (!m) return '';
      var bookName = m[1].replace(/\s+/g, ' ').trim();
      var ch = Number(m[2]);
      var startVs = Number(m[3]);
      var endVs = m[4] ? Number(m[4]) : startVs;

      // 관련 말씀은 항상 '쉬운성경'으로만 표시합니다.
      // 사용자가 성경 읽기에서 다른 번역본을 선택했더라도 명언 화면에서는 쉬운성경 본문을 사용합니다.
      var sources = [
        { meta: TRANSLATIONS.easy && TRANSLATIONS.easy.meta, data: TRANSLATIONS.easy && TRANSLATIONS.easy.data }
      ];

      function normalizeBookName(name) {
        return String(name || '').replace(/\s+/g, '').trim();
      }

      for (var si = 0; si < sources.length; si++) {
        var sourceMeta = sources[si].meta;
        var sourceData = sources[si].data;
        if (!sourceMeta || !sourceMeta.books || !sourceData) continue;

        var bno = null;
        Object.keys(sourceMeta.books).some(function(k) {
          var name = sourceMeta.books[k] && sourceMeta.books[k].name;
          if (normalizeBookName(name) === normalizeBookName(bookName)) {
            bno = k;
            return true;
          }
          return false;
        });
        if (bno === null) continue;

        var book = sourceData[bno];
        if (!book || !book.chapters) continue;
        var chapter = book.chapters[String(ch)] || book.chapters[ch];
        if (!chapter) continue;

        var lines = [];
        for (var v = startVs; v <= endVs; v++) {
          var verse = chapter[String(v)] || chapter[v];
          if (!verse) continue;
          var text = verse.t || verse.text || verse.content || verse.body || '';
          if (text) lines.push((endVs > startVs ? v + '절 ' : '') + String(text).trim());
        }
        if (lines.length) return lines.join('\n');
      }
      return '';
    } catch (e) {
      return '';
    }
  }
  function openChristianQuoteCategory(category) {
    christianQuoteCategory = category || null;
    christianQuoteIndex = 0;
    christianQuoteOrder = shuffleArray(christianQuotePool(christianQuoteCategory));
    if (els.christianQuoteCategories) els.christianQuoteCategories.classList.add('hidden');
    renderChristianQuoteDetail();
    if (els.christianQuoteDetail) els.christianQuoteDetail.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function closeChristianQuoteDetail() {
    christianQuoteCategory = null;
    christianQuoteIndex = 0;
    christianQuoteOrder = [];
    if (els.christianQuoteDetail) els.christianQuoteDetail.classList.add('hidden');
    if (els.christianQuoteEmpty) els.christianQuoteEmpty.classList.add('hidden');
    if (els.christianQuoteCategories) els.christianQuoteCategories.classList.remove('hidden');
    if (els.christianQuoteCopyStatus) els.christianQuoteCopyStatus.textContent = '';
  }

  function showChristianQuotesScreen() {
    els.cover.classList.add('hidden');
    els.nameScreen.classList.add('hidden');
    els.appScreen.classList.add('hidden');
    els.readScreen.classList.add('hidden');
    els.hymnScreen.classList.add('hidden');
    els.gratitudePrayerScreen.classList.add('hidden');
    els.christianQuotesScreen.classList.remove('hidden');
    closeChristianQuoteDetail();
    renderChristianQuoteCategories();
  }

  function copyChristianQuote() {
    if (!christianQuoteOrder.length) christianQuoteOrder = shuffleArray(christianQuotePool(christianQuoteCategory));
    var pool = christianQuoteOrder;
    if (!pool.length) return;
    var item = pool[christianQuoteIndex % pool.length];
    var categoryName = String(item.category).replace(/^\S+\s*/, '');
    var text = [
      '💬 기독교 명언',
      '주제: ' + categoryName,
      '명언 ' + (getChristianQuotes().indexOf(item) + 1) + ' / ' + getChristianQuotes().length,
      '',
      item.quote,
      '',
      '🌿 묵상',
      item.reflection,
      '',
      '📖 관련 말씀',
      item.verse,
      getChristianQuoteVerseText(item.verse, item)
    ].join('\n');
    function copied(){
      if (els.christianQuoteCopyStatus) els.christianQuoteCopyStatus.textContent = '✓ 현재 보고 있는 내용이 모두 복사되었습니다.';
      setTimeout(function(){ if (els.christianQuoteCopyStatus) els.christianQuoteCopyStatus.textContent = ''; }, 2500);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(copied).catch(function(){ fallbackCopy(text, copied); });
    } else fallbackCopy(text, copied);
  }

  function fallbackCopy(text, callback) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.left = '-9999px'; ta.style.top = '0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); if (callback) callback(); }
    catch(e) { if (els.christianQuoteCopyStatus) els.christianQuoteCopyStatus.textContent = '복사하지 못했어요. 내용을 길게 눌러 복사해주세요.'; }
    document.body.removeChild(ta);
  }

  /* ---------------- 찬송가 ---------------- */
  var HYMN_DATA = [{"number":1,"title":"만복의 근원 하나님","file":"hymns/001.pdf"},{"number":2,"title":"찬양 성부 성자 성령","file":"hymns/002.pdf"},{"number":3,"title":"성부 성자와 성령","file":"hymns/003.pdf"},{"number":4,"title":"성부 성자와 성령","file":"hymns/004.pdf"},{"number":5,"title":"이 천지간 만물들아","file":"hymns/005.pdf"},{"number":6,"title":"목소리 높여서","file":"hymns/006.pdf"},{"number":7,"title":"성부 성자 성령","file":"hymns/007.pdf"},{"number":8,"title":"거룩 거룩 거룩 전능하신 주님","file":"hymns/008.pdf"},{"number":9,"title":"하늘에 가득한 영광의 하나님","file":"hymns/009.pdf"},{"number":10,"title":"전능왕 오셔서","file":"hymns/010.pdf"},{"number":11,"title":"홀로 한 분 하나님께","file":"hymns/011.pdf"},{"number":12,"title":"다 함께 주를 경배해","file":"hymns/012.pdf"},{"number":13,"title":"영원한 하늘나라","file":"hymns/013.pdf"},{"number":14,"title":"주 우리 하나님","file":"hymns/014.pdf"},{"number":15,"title":"하나님의 크신 사랑","file":"hymns/015.pdf"},{"number":16,"title":"은혜로신 하나님 우리 주","file":"hymns/016.pdf"},{"number":17,"title":"사랑의 하나님","file":"hymns/017.pdf"},{"number":18,"title":"성도들아 찬양하자","file":"hymns/018.pdf"},{"number":19,"title":"찬송하는 소리 있어","file":"hymns/019.pdf"},{"number":20,"title":"큰 영광 중에 계신 주","file":"hymns/020.pdf"},{"number":21,"title":"다 찬양하여라","file":"hymns/021.pdf"},{"number":22,"title":"만유의 주 앞에","file":"hymns/022.pdf"},{"number":23,"title":"만 입이 내게 있으면","file":"hymns/023.pdf"},{"number":24,"title":"왕 되신 주","file":"hymns/024.pdf"},{"number":25,"title":"면류관 벗어서","file":"hymns/025.pdf"},{"number":26,"title":"구세주는 이들","file":"hymns/026.pdf"},{"number":27,"title":"빛나고 높은 보좌와","file":"hymns/027.pdf"},{"number":28,"title":"복의 근원 강림하사","file":"hymns/028.pdf"},{"number":29,"title":"성도여 다 함께","file":"hymns/029.pdf"},{"number":30,"title":"전능하고 놀라우신","file":"hymns/030.pdf"},{"number":31,"title":"찬양하라 복되신 구세주 예수","file":"hymns/031.pdf"},{"number":32,"title":"만유의 주재","file":"hymns/032.pdf"},{"number":33,"title":"영광스런 주를 보라","file":"hymns/033.pdf"},{"number":34,"title":"참 놀랍도다 주 크신 이름","file":"hymns/034.pdf"},{"number":35,"title":"큰 영화로신 주","file":"hymns/035.pdf"},{"number":36,"title":"주 예수 이름 높이어","file":"hymns/036.pdf"},{"number":37,"title":"주 예수 이름 높이어","file":"hymns/037.pdf"},{"number":38,"title":"예수 우리 왕이여","file":"hymns/038.pdf"},{"number":39,"title":"주 은혜를 받으려","file":"hymns/039.pdf"},{"number":40,"title":"찬송으로 보답할 수 없는","file":"hymns/040.pdf"},{"number":41,"title":"내 영혼아 주 찬양하여라","file":"hymns/041.pdf"},{"number":42,"title":"거룩한 주님께","file":"hymns/042.pdf"},{"number":43,"title":"즐겁게 안식할 날","file":"hymns/043.pdf"},{"number":44,"title":"지난 이레 동안에","file":"hymns/044.pdf"},{"number":45,"title":"거룩한 주의 날","file":"hymns/045.pdf"},{"number":46,"title":"이 날은 주님 정하신","file":"hymns/046.pdf"},{"number":47,"title":"하늘이 푸르고","file":"hymns/047.pdf"},{"number":48,"title":"거룩하신 주 하나님","file":"hymns/048.pdf"},{"number":49,"title":"하나님이 언약하신 그대로","file":"hymns/049.pdf"},{"number":50,"title":"내게 있는 모든 것을","file":"hymns/050.pdf"},{"number":51,"title":"주님 주신 거룩한 날","file":"hymns/051.pdf"},{"number":52,"title":"거룩하신 나의 하나님","file":"hymns/052.pdf"},{"number":53,"title":"성전을 떠나가기 전","file":"hymns/053.pdf"},{"number":54,"title":"주여 복을 구하오니","file":"hymns/054.pdf"},{"number":55,"title":"주 이름으로 모였던","file":"hymns/055.pdf"},{"number":56,"title":"우리의 주여","file":"hymns/056.pdf"},{"number":57,"title":"오늘 주의 말씀에","file":"hymns/057.pdf"},{"number":58,"title":"지난 밤에 보호하사","file":"hymns/058.pdf"},{"number":59,"title":"하나님의 아버지여 듣는 밤","file":"hymns/059.pdf"},{"number":60,"title":"영혼의 햇빛 예수님","file":"hymns/060.pdf"},{"number":61,"title":"우리가 기다리던","file":"hymns/061.pdf"},{"number":62,"title":"고요히 머리 숙여","file":"hymns/062.pdf"},{"number":63,"title":"주가 세상을 다스리니","file":"hymns/063.pdf"},{"number":64,"title":"기뻐하며 경배하세","file":"hymns/064.pdf"},{"number":65,"title":"내 영혼아 찬양하라","file":"hymns/065.pdf"},{"number":66,"title":"다 감사드리세","file":"hymns/066.pdf"},{"number":67,"title":"영광의 왕께 다 경배하며","file":"hymns/067.pdf"},{"number":68,"title":"오 하나님 우리의 창조주시니","file":"hymns/068.pdf"},{"number":69,"title":"온 천하 만물 우러러","file":"hymns/069.pdf"},{"number":70,"title":"피난처 있으니","file":"hymns/070.pdf"},{"number":71,"title":"예부터 도움 되시고","file":"hymns/071.pdf"},{"number":72,"title":"만왕의 왕 앞에 나오라","file":"hymns/072.pdf"},{"number":73,"title":"내 눈을 들어 두루 살피니","file":"hymns/073.pdf"},{"number":74,"title":"오 만세 반석이신","file":"hymns/074.pdf"},{"number":75,"title":"주여 우리 무리를","file":"hymns/075.pdf"},{"number":76,"title":"창조의 주 아버지께","file":"hymns/076.pdf"},{"number":77,"title":"거룩하신 하나님","file":"hymns/077.pdf"},{"number":78,"title":"저 높고 푸른 하늘과","file":"hymns/078.pdf"},{"number":79,"title":"주 하나님 지으신 모든 세계","file":"hymns/079.pdf"},{"number":80,"title":"천지에 있는 이름 중","file":"hymns/080.pdf"},{"number":81,"title":"주는 귀한 보배","file":"hymns/081.pdf"},{"number":82,"title":"성부의 어린 양이","file":"hymns/082.pdf"},{"number":83,"title":"나의 맘에 근심 구름","file":"hymns/083.pdf"},{"number":84,"title":"온 세상이 캄캄하여서","file":"hymns/084.pdf"},{"number":85,"title":"구주를 생각만 해도","file":"hymns/085.pdf"},{"number":86,"title":"내가 늘 의지하는 예수","file":"hymns/086.pdf"},{"number":87,"title":"내 주님 입으신 그 옷은","file":"hymns/087.pdf"},{"number":88,"title":"내 진정 사모하는","file":"hymns/088.pdf"},{"number":89,"title":"샤론의 꽃 예수","file":"hymns/089.pdf"},{"number":90,"title":"주 예수 내가 알기 전","file":"hymns/090.pdf"},{"number":91,"title":"슬픈 마음 있는 사람","file":"hymns/091.pdf"},{"number":92,"title":"위에 계신 나의 친구","file":"hymns/092.pdf"},{"number":93,"title":"예수는 나의 힘이요","file":"hymns/093.pdf"},{"number":94,"title":"주 예수보다 더 귀한 것은","file":"hymns/094.pdf"},{"number":95,"title":"나의 기쁨 나의 소망되시며","file":"hymns/095.pdf"},{"number":96,"title":"예수님은 누구신가","file":"hymns/096.pdf"},{"number":97,"title":"정혼한 처녀에게","file":"hymns/097.pdf"},{"number":98,"title":"예수님 오소서","file":"hymns/098.pdf"},{"number":99,"title":"주님 앞에 떨며 서서","file":"hymns/099.pdf"},{"number":100,"title":"미리암과 여인들이","file":"hymns/100.pdf"},{"number":101,"title":"이새의뿌리에서","file":"hymns/101.pdf"},{"number":102,"title":"영원한문아열려라","file":"hymns/102.pdf"},{"number":103,"title":"우리주님예수께","file":"hymns/103.pdf"},{"number":104,"title":"곧오소서임마누엘","file":"hymns/104.pdf"},{"number":105,"title":"오랫동안기다리던","file":"hymns/105.pdf"},{"number":106,"title":"아기예수나셨네","file":"hymns/106.pdf"},{"number":107,"title":"거룩한밤복된이밤","file":"hymns/107.pdf"},{"number":108,"title":"그어린주예수","file":"hymns/108.pdf"},{"number":109,"title":"고요한밤거룩한밤","file":"hymns/109.pdf"},{"number":110,"title":"고요하고거룩한밤","file":"hymns/110.pdf"},{"number":111,"title":"귀중한보배합을","file":"hymns/111.pdf"},{"number":112,"title":"그맑고환한밤중에","file":"hymns/112.pdf"},{"number":113,"title":"저아기잠이들었네","file":"hymns/113.pdf"},{"number":114,"title":"그어린주예수","file":"hymns/114.pdf"},{"number":115,"title":"기쁘다구주오셨네","file":"hymns/115.pdf"},{"number":116,"title":"동방에서박사들","file":"hymns/116.pdf"},{"number":117,"title":"만백성기뻐하여라","file":"hymns/117.pdf"},{"number":118,"title":"영광나라천사들아","file":"hymns/118.pdf"},{"number":119,"title":"옛날임금다윗성에","file":"hymns/119.pdf"},{"number":120,"title":"오베들레헴작은골","file":"hymns/120.pdf"},{"number":121,"title":"우리구주나신날","file":"hymns/121.pdf"},{"number":122,"title":"참반가운성도여","file":"hymns/122.pdf"},{"number":123,"title":"저들밖에한밤중에","file":"hymns/123.pdf"},{"number":124,"title":"양지키는목자여","file":"hymns/124.pdf"},{"number":125,"title":"천사들의노래가","file":"hymns/125.pdf"},{"number":126,"title":"천사찬송하기를","file":"hymns/126.pdf"},{"number":127,"title":"그고요하고쓸쓸한","file":"hymns/127.pdf"},{"number":128,"title":"거룩하신우리주님","file":"hymns/128.pdf"},{"number":129,"title":"마리아는아기를","file":"hymns/129.pdf"},{"number":130,"title":"찬란한주의영광은","file":"hymns/130.pdf"},{"number":131,"title":"다나와찬송드리세","file":"hymns/131.pdf"},{"number":132,"title":"주의영광빛나니","file":"hymns/132.pdf"},{"number":133,"title":"하나님의말씀으로","file":"hymns/133.pdf"},{"number":134,"title":"나어느날꿈속을헤매며","file":"hymns/134.pdf"},{"number":135,"title":"어저께나오늘이나","file":"hymns/135.pdf"},{"number":136,"title":"가나의혼인잔치","file":"hymns/136.pdf"},{"number":137,"title":"하나님의아들이","file":"hymns/137.pdf"},{"number":138,"title":"햇빛을받는곳마다","file":"hymns/138.pdf"},{"number":139,"title":"오영원한내주예수","file":"hymns/139.pdf"},{"number":140,"title":"왕되신우리주께","file":"hymns/140.pdf"},{"number":141,"title":"호산나호산나","file":"hymns/141.pdf"},{"number":142,"title":"시온에오시는주","file":"hymns/142.pdf"},{"number":143,"title":"웬말인가날위하여","file":"hymns/143.pdf"},{"number":144,"title":"예수나를위하여","file":"hymns/144.pdf"},{"number":145,"title":"오거룩하신주님","file":"hymns/145.pdf"},{"number":146,"title":"저멀리푸른언덕에","file":"hymns/146.pdf"},{"number":147,"title":"거기너있었는가","file":"hymns/147.pdf"},{"number":148,"title":"영화로운주예수의","file":"hymns/148.pdf"},{"number":149,"title":"주달려죽은십자가","file":"hymns/149.pdf"},{"number":150,"title":"갈보리산위에","file":"hymns/150.pdf"},{"number":151,"title":"만왕의왕내주께서","file":"hymns/151.pdf"},{"number":152,"title":"귀하신예수","file":"hymns/152.pdf"},{"number":153,"title":"가시면류관","file":"hymns/153.pdf"},{"number":154,"title":"생명의주여면류관","file":"hymns/154.pdf"},{"number":155,"title":"십자가지고","file":"hymns/155.pdf"},{"number":156,"title":"머리에가시관붉은피흐르는","file":"hymns/156.pdf"},{"number":157,"title":"겟세마네동산에서최후기도","file":"hymns/157.pdf"},{"number":158,"title":"서쪽하늘붉은노을","file":"hymns/158.pdf"},{"number":159,"title":"기뻐찬송하세","file":"hymns/159.pdf"},{"number":160,"title":"무덤에머물러","file":"hymns/160.pdf"},{"number":161,"title":"할렐루야우리예수","file":"hymns/161.pdf"},{"number":162,"title":"부활하신구세주","file":"hymns/162.pdf"},{"number":163,"title":"할렐루야할렐루야","file":"hymns/163.pdf"},{"number":164,"title":"예수부활했으니","file":"hymns/164.pdf"},{"number":165,"title":"주님께영광","file":"hymns/165.pdf"},{"number":166,"title":"싸움은모두끝나고","file":"hymns/166.pdf"},{"number":167,"title":"즐겁도다이날","file":"hymns/167.pdf"},{"number":168,"title":"하늘에찬송이들리던그날","file":"hymns/168.pdf"},{"number":169,"title":"사망의권세가","file":"hymns/169.pdf"},{"number":170,"title":"내주님은살아계시고","file":"hymns/170.pdf"},{"number":171,"title":"하나님의독생자","file":"hymns/171.pdf"},{"number":172,"title":"사망을이긴주","file":"hymns/172.pdf"},{"number":173,"title":"다함께찬송부르자","file":"hymns/173.pdf"},{"number":174,"title":"대속하신구주께서","file":"hymns/174.pdf"},{"number":175,"title":"신랑되신예수께서","file":"hymns/175.pdf"},{"number":176,"title":"주어느때다시오실는지","file":"hymns/176.pdf"},{"number":177,"title":"오랫동안고대하던","file":"hymns/177.pdf"},{"number":178,"title":"주예수믿는자여","file":"hymns/178.pdf"},{"number":179,"title":"주예수의강림이","file":"hymns/179.pdf"},{"number":180,"title":"하나님의나팔소리","file":"hymns/180.pdf"},{"number":181,"title":"부활승천하신구주께서","file":"hymns/181.pdf"},{"number":182,"title":"강물같이흐르는기쁨","file":"hymns/182.pdf"},{"number":183,"title":"빈들에마른풀같이","file":"hymns/183.pdf"},{"number":184,"title":"불길같은주성령","file":"hymns/184.pdf"},{"number":185,"title":"이기쁜소식을","file":"hymns/185.pdf"},{"number":186,"title":"영화로신주성령","file":"hymns/186.pdf"},{"number":187,"title":"비둘기같이온유한","file":"hymns/187.pdf"},{"number":188,"title":"무한하신주성령","file":"hymns/188.pdf"},{"number":189,"title":"진실하신주성령","file":"hymns/189.pdf"},{"number":190,"title":"성령이여강림하사","file":"hymns/190.pdf"},{"number":191,"title":"내가매일기쁘게","file":"hymns/191.pdf"},{"number":192,"title":"임하소서임하소서","file":"hymns/192.pdf"},{"number":193,"title":"성령의봄바람불어오니","file":"hymns/193.pdf"},{"number":194,"title":"저하늘거룩하신주여","file":"hymns/194.pdf"},{"number":195,"title":"성령이여우리찬송부를때","file":"hymns/195.pdf"},{"number":196,"title":"성령의은사를","file":"hymns/196.pdf"},{"number":197,"title":"은혜가풍성한하나님은","file":"hymns/197.pdf"},{"number":198,"title":"주예수해변서","file":"hymns/198.pdf"},{"number":199,"title":"나의사랑하는책","file":"hymns/199.pdf"},{"number":200,"title":"달고오묘한그말씀","file":"hymns/200.pdf"},{"number":201,"title":"참사람되신말씀","file":"hymns/201.pdf"},{"number":202,"title":"하나님아버지주신책은","file":"hymns/202.pdf"},{"number":203,"title":"하나님말씀은","file":"hymns/203.pdf"},{"number":204,"title":"주의말씀듣고서","file":"hymns/204.pdf"},{"number":205,"title":"주예수크신사랑","file":"hymns/205.pdf"},{"number":206,"title":"주님의귀한말씀은","file":"hymns/206.pdf"},{"number":207,"title":"귀하신주님계신곳","file":"hymns/207.pdf"},{"number":208,"title":"내주의나라와","file":"hymns/208.pdf"},{"number":209,"title":"이세상풍파심하고","file":"hymns/209.pdf"},{"number":210,"title":"시온성과같은교회","file":"hymns/210.pdf"},{"number":211,"title":"값비싼향유를주께드린","file":"hymns/211.pdf"},{"number":212,"title":"겸손히주를섬길때","file":"hymns/212.pdf"},{"number":213,"title":"나의생명드리니","file":"hymns/213.pdf"},{"number":214,"title":"나주의도움받고자","file":"hymns/214.pdf"},{"number":215,"title":"내죄속해주신주께","file":"hymns/215.pdf"},{"number":216,"title":"성자의귀한몸","file":"hymns/216.pdf"},{"number":217,"title":"하나님이말씀하시기를","file":"hymns/217.pdf"},{"number":218,"title":"네맘과정성을다하여서","file":"hymns/218.pdf"},{"number":219,"title":"주하나님의사랑은","file":"hymns/219.pdf"},{"number":220,"title":"사랑하는주님앞에","file":"hymns/220.pdf"},{"number":221,"title":"주믿는형제들","file":"hymns/221.pdf"},{"number":222,"title":"우리다시만날때까지","file":"hymns/222.pdf"},{"number":223,"title":"하나님은우리들의","file":"hymns/223.pdf"},{"number":224,"title":"정한물로우리를","file":"hymns/224.pdf"},{"number":225,"title":"실로암샘물가에핀","file":"hymns/225.pdf"},{"number":226,"title":"성령으로세례받아","file":"hymns/226.pdf"},{"number":227,"title":"주앞에성찬받기위하여","file":"hymns/227.pdf"},{"number":228,"title":"오나의주님친히뵈오니","file":"hymns/228.pdf"},{"number":229,"title":"아무흠도없고","file":"hymns/229.pdf"},{"number":230,"title":"우리의참되신구주시니","file":"hymns/230.pdf"},{"number":231,"title":"우리다같이무릎꿇고서","file":"hymns/231.pdf"},{"number":232,"title":"유월절때가이르러","file":"hymns/232.pdf"},{"number":233,"title":"자비로그몸찢기시고","file":"hymns/233.pdf"},{"number":234,"title":"구주예수그리스도","file":"hymns/234.pdf"},{"number":235,"title":"보아라즐거운우리집","file":"hymns/235.pdf"},{"number":236,"title":"우리모든수고끝나","file":"hymns/236.pdf"},{"number":237,"title":"저건너편강언덕에","file":"hymns/237.pdf"},{"number":238,"title":"해지는저편","file":"hymns/238.pdf"},{"number":239,"title":"저뵈는본향집","file":"hymns/239.pdf"},{"number":240,"title":"주가맡긴모든역사","file":"hymns/240.pdf"},{"number":241,"title":"아름다운본향","file":"hymns/241.pdf"},{"number":242,"title":"황무지가장미꽃같이","file":"hymns/242.pdf"},{"number":243,"title":"저요단강건너편에","file":"hymns/243.pdf"},{"number":244,"title":"구원받은천국의성도들","file":"hymns/244.pdf"},{"number":245,"title":"저좋은낙원이르니","file":"hymns/245.pdf"},{"number":246,"title":"나가나안땅귀한성에","file":"hymns/246.pdf"},{"number":247,"title":"보아라저하늘에","file":"hymns/247.pdf"},{"number":248,"title":"언약의주하나님","file":"hymns/248.pdf"},{"number":249,"title":"주사랑하는자다찬송할 때에","file":"hymns/249.pdf"},{"number":250,"title":"구주의십자가보혈로","file":"hymns/250.pdf"},{"number":251,"title":"놀랍다주님의큰은혜","file":"hymns/251.pdf"},{"number":252,"title":"나의죄를씻기는","file":"hymns/252.pdf"},{"number":253,"title":"그자비하신주님","file":"hymns/253.pdf"},{"number":254,"title":"내주의보혈은","file":"hymns/254.pdf"},{"number":255,"title":"너희죄흉악하나","file":"hymns/255.pdf"},{"number":256,"title":"나의죄모두지신주님","file":"hymns/256.pdf"},{"number":257,"title":"마음에가득한의심을깨치고","file":"hymns/257.pdf"},{"number":258,"title":"샘물과같은보혈은","file":"hymns/258.pdf"},{"number":259,"title":"예수십자가에흘린피로써","file":"hymns/259.pdf"},{"number":260,"title":"우리를죄에서구하시려","file":"hymns/260.pdf"},{"number":261,"title":"이세상의모든죄를","file":"hymns/261.pdf"},{"number":262,"title":"날구원하신예수님","file":"hymns/262.pdf"},{"number":263,"title":"이세상험하고","file":"hymns/263.pdf"},{"number":264,"title":"정결하게하는샘이","file":"hymns/264.pdf"},{"number":265,"title":"주십자가를지심으로","file":"hymns/265.pdf"},{"number":266,"title":"주의피로이룬샘물","file":"hymns/266.pdf"},{"number":267,"title":"주의확실한약속의말씀듣고","file":"hymns/267.pdf"},{"number":268,"title":"죄에서자유를얻게함은","file":"hymns/268.pdf"},{"number":269,"title":"그참혹한십자가에","file":"hymns/269.pdf"},{"number":270,"title":"변찮는주님의사랑과","file":"hymns/270.pdf"},{"number":271,"title":"나와같은죄인위해","file":"hymns/271.pdf"},{"number":272,"title":"고통의멍에벗으려고","file":"hymns/272.pdf"},{"number":273,"title":"나주를멀리떠났다","file":"hymns/273.pdf"},{"number":274,"title":"나행한것죄뿐이니","file":"hymns/274.pdf"},{"number":275,"title":"날마다주와멀어져","file":"hymns/275.pdf"},{"number":276,"title":"아버지여이죄인을","file":"hymns/276.pdf"},{"number":277,"title":"양떼를떠나서","file":"hymns/277.pdf"},{"number":278,"title":"여러해동안주떠나","file":"hymns/278.pdf"},{"number":279,"title":"인애하신구세주여","file":"hymns/279.pdf"},{"number":280,"title":"천부여의지없어서","file":"hymns/280.pdf"},{"number":281,"title":"요나처럼순종않고","file":"hymns/281.pdf"},{"number":282,"title":"큰죄에빠진날위해","file":"hymns/282.pdf"},{"number":283,"title":"나속죄함을받은후","file":"hymns/283.pdf"},{"number":284,"title":"오랫동안모든죄가운데빠져","file":"hymns/284.pdf"},{"number":285,"title":"주의말씀받은그날","file":"hymns/285.pdf"},{"number":286,"title":"주예수님내맘에오사","file":"hymns/286.pdf"},{"number":287,"title":"예수앞에나오면","file":"hymns/287.pdf"},{"number":288,"title":"예수로나의구주삼고","file":"hymns/288.pdf"},{"number":289,"title":"주예수내맘에들어와","file":"hymns/289.pdf"},{"number":290,"title":"우리는주님을늘배반하나","file":"hymns/290.pdf"},{"number":291,"title":"외롭게사는이그누군가","file":"hymns/291.pdf"},{"number":292,"title":"주없이살수없네","file":"hymns/292.pdf"},{"number":293,"title":"주의사랑비칠때에","file":"hymns/293.pdf"},{"number":294,"title":"하나님은외아들은","file":"hymns/294.pdf"},{"number":295,"title":"큰죄에빠진나를","file":"hymns/295.pdf"},{"number":296,"title":"죄인구원하시려고","file":"hymns/296.pdf"},{"number":297,"title":"양아흔아홉마리는","file":"hymns/297.pdf"},{"number":298,"title":"속죄하신구세주를","file":"hymns/298.pdf"},{"number":299,"title":"하나님사랑은","file":"hymns/299.pdf"},{"number":300,"title":"내맘이낙심되며","file":"hymns/300.pdf"},{"number":301,"title":"지금까지지내온것","file":"hymns/301.pdf"},{"number":302,"title":"내주하나님넓고큰은혜는","file":"hymns/302.pdf"},{"number":303,"title":"날위하여십자가의","file":"hymns/303.pdf"},{"number":304,"title":"그크신하나님의사랑","file":"hymns/304.pdf"},{"number":305,"title":"나같은죄인살리신","file":"hymns/305.pdf"},{"number":306,"title":"죽을죄인살려주신","file":"hymns/306.pdf"},{"number":307,"title":"소리없이보슬보슬","file":"hymns/307.pdf"},{"number":308,"title":"내평생살아온길","file":"hymns/308.pdf"},{"number":309,"title":"목마른내영혼","file":"hymns/309.pdf"},{"number":310,"title":"아하나님의은혜로","file":"hymns/310.pdf"},{"number":311,"title":"내너를위하여","file":"hymns/311.pdf"},{"number":312,"title":"너하나님께이끌리어","file":"hymns/312.pdf"},{"number":313,"title":"내임금예수내주여","file":"hymns/313.pdf"},{"number":314,"title":"내구주예수를더욱사랑","file":"hymns/314.pdf"},{"number":315,"title":"내주되신주를참사랑하고","file":"hymns/315.pdf"},{"number":316,"title":"주여나의생명","file":"hymns/316.pdf"},{"number":317,"title":"내주예수주신은혜","file":"hymns/317.pdf"},{"number":318,"title":"순교자의흘린피가","file":"hymns/318.pdf"},{"number":319,"title":"말씀으로이세상을","file":"hymns/319.pdf"},{"number":320,"title":"나의죄를정케하사","file":"hymns/320.pdf"},{"number":321,"title":"날대속하신예수께","file":"hymns/321.pdf"},{"number":322,"title":"세상의헛된신을버리고","file":"hymns/322.pdf"},{"number":323,"title":"부름받아나선이몸","file":"hymns/323.pdf"},{"number":324,"title":"예수나를오라하네","file":"hymns/324.pdf"},{"number":325,"title":"예수가함께계시니","file":"hymns/325.pdf"},{"number":326,"title":"내죄를회개하고","file":"hymns/326.pdf"},{"number":327,"title":"주님주실화평","file":"hymns/327.pdf"},{"number":328,"title":"너주의사람아","file":"hymns/328.pdf"},{"number":329,"title":"주날불러이르소서","file":"hymns/329.pdf"},{"number":330,"title":"어둔밤쉬 되리니","file":"hymns/330.pdf"},{"number":331,"title":"영광을받으신만유의주여","file":"hymns/331.pdf"},{"number":332,"title":"우리는부지런한","file":"hymns/332.pdf"},{"number":333,"title":"충성하라죽도록","file":"hymns/333.pdf"},{"number":334,"title":"위대하신주를","file":"hymns/334.pdf"},{"number":335,"title":"크고놀라운평화가","file":"hymns/335.pdf"},{"number":336,"title":"환난과핍박중에도","file":"hymns/336.pdf"},{"number":337,"title":"내모든시험무거운짐을","file":"hymns/337.pdf"},{"number":338,"title":"내주를가까이하게함은","file":"hymns/338.pdf"},{"number":339,"title":"내주님지신십자가","file":"hymns/339.pdf"},{"number":340,"title":"어지러운세상중에","file":"hymns/340.pdf"},{"number":341,"title":"십자가를내가지고","file":"hymns/341.pdf"},{"number":342,"title":"너시험을당해","file":"hymns/342.pdf"},{"number":343,"title":"시험받을때에","file":"hymns/343.pdf"},{"number":344,"title":"믿음으로가리라","file":"hymns/344.pdf"},{"number":345,"title":"캄캄한밤사나운바람불때","file":"hymns/345.pdf"},{"number":346,"title":"주예수우리구하려","file":"hymns/346.pdf"},{"number":347,"title":"허락하신새땅에","file":"hymns/347.pdf"},{"number":348,"title":"마귀들과싸울지라","file":"hymns/348.pdf"},{"number":349,"title":"나는예수따라가는","file":"hymns/349.pdf"},{"number":350,"title":"우리들의싸울것은","file":"hymns/350.pdf"},{"number":351,"title":"믿는사람들은주의군사니","file":"hymns/351.pdf"},{"number":352,"title":"십자가군병들아","file":"hymns/352.pdf"},{"number":353,"title":"십자가군병되어서","file":"hymns/353.pdf"},{"number":354,"title":"주를앙모하는자","file":"hymns/354.pdf"},{"number":355,"title":"다같이일어나","file":"hymns/355.pdf"},{"number":356,"title":"주예수이름소리높여","file":"hymns/356.pdf"},{"number":357,"title":"주믿는사람일어나","file":"hymns/357.pdf"},{"number":358,"title":"주의진리위해십자가군기","file":"hymns/358.pdf"},{"number":359,"title":"천성을향해가는성도들아","file":"hymns/359.pdf"},{"number":360,"title":"행군나팔소리에","file":"hymns/360.pdf"},{"number":361,"title":"기도하는이시간","file":"hymns/361.pdf"},{"number":362,"title":"주여복을주시기를","file":"hymns/362.pdf"},{"number":363,"title":"내가깊은곳에서","file":"hymns/363.pdf"},{"number":364,"title":"내기도하는그시간","file":"hymns/364.pdf"},{"number":365,"title":"마음속에근심있는사람","file":"hymns/365.pdf"},{"number":366,"title":"어두운내눈밝히사","file":"hymns/366.pdf"},{"number":367,"title":"인내하게하소서주여우리를","file":"hymns/367.pdf"},{"number":368,"title":"주예수여은혜를","file":"hymns/368.pdf"},{"number":369,"title":"죄짐맡은우리구주","file":"hymns/369.pdf"},{"number":370,"title":"주안에있는나에게","file":"hymns/370.pdf"},{"number":371,"title":"구주여광풍이불어","file":"hymns/371.pdf"},{"number":372,"title":"그누가나의괴롬알며","file":"hymns/372.pdf"},{"number":373,"title":"고요한바다로","file":"hymns/373.pdf"},{"number":374,"title":"나의믿음약할때","file":"hymns/374.pdf"},{"number":375,"title":"나는갈길모르니","file":"hymns/375.pdf"},{"number":376,"title":"나그네와같은내가","file":"hymns/376.pdf"},{"number":377,"title":"전능하신주하나님","file":"hymns/377.pdf"},{"number":378,"title":"내선한목자","file":"hymns/378.pdf"},{"number":379,"title":"내갈길멀고밤은깊은데","file":"hymns/379.pdf"},{"number":380,"title":"나의생명되신주","file":"hymns/380.pdf"},{"number":381,"title":"나캄캄한밤죄의길에","file":"hymns/381.pdf"},{"number":382,"title":"너근심걱정말아라","file":"hymns/382.pdf"},{"number":383,"title":"눈을들어산을보니","file":"hymns/383.pdf"},{"number":384,"title":"나의갈길다가도록","file":"hymns/384.pdf"},{"number":385,"title":"못박혀죽으신","file":"hymns/385.pdf"},{"number":386,"title":"만세반석열린곳에","file":"hymns/386.pdf"},{"number":387,"title":"멀리멀리갔더니","file":"hymns/387.pdf"},{"number":388,"title":"비바람이칠때와","file":"hymns/388.pdf"},{"number":389,"title":"내게로오라하신주님의","file":"hymns/389.pdf"},{"number":390,"title":"예수가거느리시니","file":"hymns/390.pdf"},{"number":391,"title":"오놀라운구세주","file":"hymns/391.pdf"},{"number":392,"title":"주여어린사슴이","file":"hymns/392.pdf"},{"number":393,"title":"오신실하신주","file":"hymns/393.pdf"},{"number":394,"title":"이세상의친구들","file":"hymns/394.pdf"},{"number":395,"title":"자비하신예수여","file":"hymns/395.pdf"},{"number":396,"title":"우리주님밤새워","file":"hymns/396.pdf"},{"number":397,"title":"주사랑안에살면","file":"hymns/397.pdf"},{"number":398,"title":"어둠의권세에서","file":"hymns/398.pdf"},{"number":399,"title":"어린양들아두려워말아라","file":"hymns/399.pdf"},{"number":400,"title":"험한시험물속에서","file":"hymns/400.pdf"},{"number":401,"title":"주의곁에있을때","file":"hymns/401.pdf"},{"number":402,"title":"나의반석나의방패","file":"hymns/402.pdf"},{"number":403,"title":"영원하신주님의","file":"hymns/403.pdf"},{"number":404,"title":"바다에놀이일때에","file":"hymns/404.pdf"},{"number":405,"title":"주의친절한팔에안기세","file":"hymns/405.pdf"},{"number":406,"title":"곤한내영혼편히쉴곳과","file":"hymns/406.pdf"},{"number":407,"title":"구주와함께나죽었으니","file":"hymns/407.pdf"},{"number":408,"title":"나어느곳에있든지","file":"hymns/408.pdf"},{"number":409,"title":"나의기쁨은사랑의주님께","file":"hymns/409.pdf"},{"number":410,"title":"내맘에한노래있어","file":"hymns/410.pdf"},{"number":411,"title":"아내맘속에","file":"hymns/411.pdf"},{"number":412,"title":"내영혼의그윽히깊은데서","file":"hymns/412.pdf"},{"number":413,"title":"내평생에가는길","file":"hymns/413.pdf"},{"number":414,"title":"이세상은요란하나","file":"hymns/414.pdf"},{"number":415,"title":"십자가그늘아래","file":"hymns/415.pdf"},{"number":416,"title":"너희근심걱정을","file":"hymns/416.pdf"},{"number":417,"title":"주예수넓은품에","file":"hymns/417.pdf"},{"number":418,"title":"기쁠때나슬플때나","file":"hymns/418.pdf"},{"number":419,"title":"주날개밑내가편안히쉬네","file":"hymns/419.pdf"},{"number":420,"title":"너성결키위해","file":"hymns/420.pdf"},{"number":421,"title":"내가예수믿고서","file":"hymns/421.pdf"},{"number":422,"title":"거룩하게하소서","file":"hymns/422.pdf"},{"number":423,"title":"먹보다도더검은","file":"hymns/423.pdf"},{"number":424,"title":"아버지여나의맘을","file":"hymns/424.pdf"},{"number":425,"title":"주님의뜻을이루소서","file":"hymns/425.pdf"},{"number":426,"title":"이죄인을완전케하옵시고","file":"hymns/426.pdf"},{"number":427,"title":"맘가난한사람","file":"hymns/427.pdf"},{"number":428,"title":"내영혼에햇빛비치니","file":"hymns/428.pdf"},{"number":429,"title":"세상모든풍파너를흔들어","file":"hymns/429.pdf"},{"number":430,"title":"주와같이길가는것","file":"hymns/430.pdf"},{"number":431,"title":"주안에기쁨있네","file":"hymns/431.pdf"},{"number":432,"title":"큰물결이설레는어둔바다","file":"hymns/432.pdf"},{"number":433,"title":"귀하신주여날붙드사","file":"hymns/433.pdf"},{"number":434,"title":"귀하신친구내게계시니","file":"hymns/434.pdf"},{"number":435,"title":"나의영원하신기업","file":"hymns/435.pdf"},{"number":436,"title":"나이제주님의새생명얻은몸","file":"hymns/436.pdf"},{"number":437,"title":"하늘보좌떠나서","file":"hymns/437.pdf"},{"number":438,"title":"내영혼이은총입어","file":"hymns/438.pdf"},{"number":439,"title":"십자가로가까이","file":"hymns/439.pdf"},{"number":440,"title":"어디든지예수나를이끌면","file":"hymns/440.pdf"},{"number":441,"title":"은혜구한내게은혜의주님","file":"hymns/441.pdf"},{"number":442,"title":"저장미꽃위에이슬","file":"hymns/442.pdf"},{"number":443,"title":"아침햇살비칠때","file":"hymns/443.pdf"},{"number":444,"title":"겟세마네동산에서","file":"hymns/444.pdf"},{"number":445,"title":"태산을넘어험곡에가도","file":"hymns/445.pdf"},{"number":446,"title":"주음성외에는","file":"hymns/446.pdf"},{"number":447,"title":"이세상끝날까지","file":"hymns/447.pdf"},{"number":448,"title":"주님가신길을따라","file":"hymns/448.pdf"},{"number":449,"title":"예수따라가며","file":"hymns/449.pdf"},{"number":450,"title":"내평생소원이것뿐","file":"hymns/450.pdf"},{"number":451,"title":"예수영광버리사","file":"hymns/451.pdf"},{"number":452,"title":"내모든소원기도의제목","file":"hymns/452.pdf"},{"number":453,"title":"예수더알기원하네","file":"hymns/453.pdf"},{"number":454,"title":"주와같이되기를","file":"hymns/454.pdf"},{"number":455,"title":"주님의마음을본받는자","file":"hymns/455.pdf"},{"number":456,"title":"거친세상에서실패하거든","file":"hymns/456.pdf"},{"number":457,"title":"겟세마네동산의","file":"hymns/457.pdf"},{"number":458,"title":"너희마음에슬픔이가득할때","file":"hymns/458.pdf"},{"number":459,"title":"누가주를따라","file":"hymns/459.pdf"},{"number":460,"title":"뜻없이무릎꿇는","file":"hymns/460.pdf"},{"number":461,"title":"십자가를질수있나","file":"hymns/461.pdf"},{"number":462,"title":"생명진리은혜되신","file":"hymns/462.pdf"},{"number":463,"title":"신자되기원합니다.","file":"hymns/463.pdf"},{"number":464,"title":"믿음의새빛을","file":"hymns/464.pdf"},{"number":465,"title":"주믿는나남위해","file":"hymns/465.pdf"},{"number":466,"title":"죽기까지사랑하신주","file":"hymns/466.pdf"},{"number":467,"title":"높으신주께서낮아지심은","file":"hymns/467.pdf"},{"number":468,"title":"큰사랑의새계명을","file":"hymns/468.pdf"},{"number":469,"title":"내주하나님","file":"hymns/469.pdf"},{"number":470,"title":"나의몸이상하여","file":"hymns/470.pdf"},{"number":471,"title":"주여나의병든몸을","file":"hymns/471.pdf"},{"number":472,"title":"네병든손내밀라고","file":"hymns/472.pdf"},{"number":473,"title":"괴로움과고통을","file":"hymns/473.pdf"},{"number":474,"title":"의원되신예수님의","file":"hymns/474.pdf"},{"number":475,"title":"인류는하나되게","file":"hymns/475.pdf"},{"number":476,"title":"꽃이피고새가우는","file":"hymns/476.pdf"},{"number":477,"title":"하나님이창조하신","file":"hymns/477.pdf"},{"number":478,"title":"참아름다워라","file":"hymns/478.pdf"},{"number":479,"title":"괴로운인생길가는몸이","file":"hymns/479.pdf"},{"number":480,"title":"천국에서만나보자","file":"hymns/480.pdf"},{"number":481,"title":"때저물어서날이어두니","file":"hymns/481.pdf"},{"number":482,"title":"참즐거운노래를","file":"hymns/482.pdf"},{"number":483,"title":"구름같은이세상","file":"hymns/483.pdf"},{"number":484,"title":"내맘의주여소망되소서","file":"hymns/484.pdf"},{"number":485,"title":"세월이흘러가는데","file":"hymns/485.pdf"},{"number":486,"title":"이세상에근심된일이많고","file":"hymns/486.pdf"},{"number":487,"title":"어두움후에빛이오며","file":"hymns/487.pdf"},{"number":488,"title":"이몸의소망무엔가","file":"hymns/488.pdf"},{"number":489,"title":"저요단강건너편에찬란하게","file":"hymns/489.pdf"},{"number":490,"title":"주여지난밤내꿈에","file":"hymns/490.pdf"},{"number":491,"title":"저높은곳을향하여","file":"hymns/491.pdf"},{"number":492,"title":"잠시세상에내가살면서","file":"hymns/492.pdf"},{"number":493,"title":"하늘가는밝은길이","file":"hymns/493.pdf"},{"number":494,"title":"만세반석열리니","file":"hymns/494.pdf"},{"number":495,"title":"익은곳식거둘자가","file":"hymns/495.pdf"},{"number":496,"title":"새벽부터우리","file":"hymns/496.pdf"},{"number":497,"title":"주예수넓은사랑","file":"hymns/497.pdf"},{"number":498,"title":"저죽어가는자다구원하고","file":"hymns/498.pdf"},{"number":499,"title":"흑암에사는백성들을보라","file":"hymns/499.pdf"},{"number":500,"title":"물위에생명줄던지어라","file":"hymns/500.pdf"},{"number":501,"title":"너시온아이소식전파하라","file":"hymns/501.pdf"},{"number":502,"title":"빛의사자들이여","file":"hymns/502.pdf"},{"number":503,"title":"세상모두사랑없어","file":"hymns/503.pdf"},{"number":504,"title":"주님의명령전달할사자여","file":"hymns/504.pdf"},{"number":505,"title":"온세상위하여","file":"hymns/505.pdf"},{"number":506,"title":"땅끝까지복음을","file":"hymns/506.pdf"},{"number":507,"title":"저북방얼음산과","file":"hymns/507.pdf"},{"number":508,"title":"우리가지금은나그네되어도","file":"hymns/508.pdf"},{"number":509,"title":"기쁜일이있어천국종치네","file":"hymns/509.pdf"},{"number":510,"title":"하나님의진리등대","file":"hymns/510.pdf"},{"number":511,"title":"예수말씀하시기를","file":"hymns/511.pdf"},{"number":512,"title":"천성길을버리고","file":"hymns/512.pdf"},{"number":513,"title":"헛된욕망길을가며","file":"hymns/513.pdf"},{"number":514,"title":"먼동튼다일어나라","file":"hymns/514.pdf"},{"number":515,"title":"눈을들어하늘보라","file":"hymns/515.pdf"},{"number":516,"title":"옳은길따르라의의길을","file":"hymns/516.pdf"},{"number":517,"title":"가난한자돌봐주며","file":"hymns/517.pdf"},{"number":518,"title":"기쁜소리들리니","file":"hymns/518.pdf"},{"number":519,"title":"구주께서부르되","file":"hymns/519.pdf"},{"number":520,"title":"듣는사람마다복음전하여","file":"hymns/520.pdf"},{"number":521,"title":"구원으로인도하는","file":"hymns/521.pdf"},{"number":522,"title":"웬일인가내형제여","file":"hymns/522.pdf"},{"number":523,"title":"어둔죄악길에서","file":"hymns/523.pdf"},{"number":524,"title":"갈길을밝히보이시니","file":"hymns/524.pdf"},{"number":525,"title":"돌아와돌아와","file":"hymns/525.pdf"},{"number":526,"title":"목마른자들아","file":"hymns/526.pdf"},{"number":527,"title":"어서돌아오오","file":"hymns/527.pdf"},{"number":528,"title":"예수가우리를부르는소리","file":"hymns/528.pdf"},{"number":529,"title":"온유한주님의음성","file":"hymns/529.pdf"},{"number":530,"title":"주께서문에오셔서","file":"hymns/530.pdf"},{"number":531,"title":"자비한주께서부르시네","file":"hymns/531.pdf"},{"number":532,"title":"주께로한걸음씩","file":"hymns/532.pdf"},{"number":533,"title":"우리주십자가","file":"hymns/533.pdf"},{"number":534,"title":"주님찾아오셨네","file":"hymns/534.pdf"},{"number":535,"title":"주예수대문밖에","file":"hymns/535.pdf"},{"number":536,"title":"죄짐에눌린사람은","file":"hymns/536.pdf"},{"number":537,"title":"형제여지체말라","file":"hymns/537.pdf"},{"number":538,"title":"죄짐을지고서곤하거든","file":"hymns/538.pdf"},{"number":539,"title":"너예수께조용히나가","file":"hymns/539.pdf"},{"number":540,"title":"주의음성을내가들으니","file":"hymns/540.pdf"},{"number":541,"title":"꽃이피는봄날에만","file":"hymns/541.pdf"},{"number":542,"title":"구주예수의지함이","file":"hymns/542.pdf"},{"number":543,"title":"어려운일당할때","file":"hymns/543.pdf"},{"number":544,"title":"울어도못하네","file":"hymns/544.pdf"},{"number":545,"title":"이눈에아무증거아니뵈어도","file":"hymns/545.pdf"},{"number":546,"title":"주님약속하신말씀위에서","file":"hymns/546.pdf"},{"number":547,"title":"나같은죄인까지도","file":"hymns/547.pdf"},{"number":548,"title":"날구속하신","file":"hymns/548.pdf"},{"number":549,"title":"내주여뜻대로","file":"hymns/549.pdf"},{"number":550,"title":"시온의영광이빛나는아침","file":"hymns/550.pdf"},{"number":551,"title":"오늘까지복과은혜","file":"hymns/551.pdf"},{"number":552,"title":"아침해가돋을때","file":"hymns/552.pdf"},{"number":553,"title":"새해아침환히밝았네","file":"hymns/553.pdf"},{"number":554,"title":"종소리크게울려라","file":"hymns/554.pdf"},{"number":555,"title":"우리주님모신가정","file":"hymns/555.pdf"},{"number":556,"title":"날마다주님을의지하는","file":"hymns/556.pdf"},{"number":557,"title":"에덴의동산처럼","file":"hymns/557.pdf"},{"number":558,"title":"미더워라주의가정","file":"hymns/558.pdf"},{"number":559,"title":"사철에봄바람불어잇고","file":"hymns/559.pdf"},{"number":560,"title":"주의발자취를따름이","file":"hymns/560.pdf"},{"number":561,"title":"예수님의사랑은","file":"hymns/561.pdf"},{"number":562,"title":"예루살렘아이들","file":"hymns/562.pdf"},{"number":563,"title":"예수사랑하심을","file":"hymns/563.pdf"},{"number":564,"title":"예수께서오실때에","file":"hymns/564.pdf"},{"number":565,"title":"예수께로가면","file":"hymns/565.pdf"},{"number":566,"title":"사랑의하나님귀하신이름은","file":"hymns/566.pdf"},{"number":567,"title":"다정하신목자예수","file":"hymns/567.pdf"},{"number":568,"title":"하나님은나의목자시니","file":"hymns/568.pdf"},{"number":569,"title":"선한목자되신우리주","file":"hymns/569.pdf"},{"number":570,"title":"주는나를기르시는목자","file":"hymns/570.pdf"},{"number":571,"title":"역사속에보냄받아","file":"hymns/571.pdf"},{"number":572,"title":"바다같이넓은은혜","file":"hymns/572.pdf"},{"number":573,"title":"말씀에순종하여","file":"hymns/573.pdf"},{"number":574,"title":"가슴마다파도친다","file":"hymns/574.pdf"},{"number":575,"title":"주님께귀한것드려","file":"hymns/575.pdf"},{"number":576,"title":"하나님의뜻을따라","file":"hymns/576.pdf"},{"number":577,"title":"낳으시고길러주신","file":"hymns/577.pdf"},{"number":578,"title":"언제나봐라봐도","file":"hymns/578.pdf"},{"number":579,"title":"어머니의넓은사랑","file":"hymns/579.pdf"},{"number":580,"title":"삼천리반도금수강산","file":"hymns/580.pdf"},{"number":581,"title":"주하나님이나라를지켜주시고","file":"hymns/581.pdf"},{"number":582,"title":"어둔밤마음에잠겨","file":"hymns/582.pdf"},{"number":583,"title":"이민족에복음을","file":"hymns/583.pdf"},{"number":584,"title":"우리나라지켜주신","file":"hymns/584.pdf"},{"number":585,"title":"내주는강한성이요","file":"hymns/585.pdf"},{"number":586,"title":"어느민족누구게나","file":"hymns/586.pdf"},{"number":587,"title":"감사하는성도여","file":"hymns/587.pdf"},{"number":588,"title":"공중나는새를보라","file":"hymns/588.pdf"},{"number":589,"title":"넓은들에익은곡식","file":"hymns/589.pdf"},{"number":590,"title":"논밭에오곡백과","file":"hymns/590.pdf"},{"number":591,"title":"저밭에농부나가","file":"hymns/591.pdf"},{"number":592,"title":"산마다불이탄다고운단풍에","file":"hymns/592.pdf"},{"number":593,"title":"아름다운하늘과","file":"hymns/593.pdf"},{"number":594,"title":"감사하세찬양하세","file":"hymns/594.pdf"},{"number":595,"title":"나맡은본분은","file":"hymns/595.pdf"},{"number":596,"title":"영광은주님홀로","file":"hymns/596.pdf"},{"number":597,"title":"이전에주님을내가몰라","file":"hymns/597.pdf"},{"number":598,"title":"천지주관하는주님","file":"hymns/598.pdf"},{"number":599,"title":"우리의기도들어주시옵소서","file":"hymns/599.pdf"},{"number":600,"title":"교회의참된터는","file":"hymns/600.pdf"},{"number":601,"title":"하나님이정하시고","file":"hymns/601.pdf"},{"number":602,"title":"성부님께빕니다.","file":"hymns/602.pdf"},{"number":603,"title":"태초에하나님이","file":"hymns/603.pdf"},{"number":604,"title":"완전한사랑","file":"hymns/604.pdf"},{"number":605,"title":"오늘모여찬송함은","file":"hymns/605.pdf"},{"number":606,"title":"해보다더밝은저천국","file":"hymns/606.pdf"},{"number":607,"title":"내본향가는길","file":"hymns/607.pdf"},{"number":608,"title":"후일에생명그칠때","file":"hymns/608.pdf"},{"number":609,"title":"이세상살때에","file":"hymns/609.pdf"},{"number":610,"title":"고생과수고가다지난후","file":"hymns/610.pdf"},{"number":611,"title":"주님오라부르시어","file":"hymns/611.pdf"},{"number":612,"title":"이땅에서주를위해","file":"hymns/612.pdf"},{"number":613,"title":"사랑의주하나님","file":"hymns/613.pdf"},{"number":614,"title":"얼마나아프셨나","file":"hymns/614.pdf"},{"number":615,"title":"그큰일을행하신","file":"hymns/615.pdf"},{"number":616,"title":"주를경배하리","file":"hymns/616.pdf"},{"number":617,"title":"주님을찬양합니다","file":"hymns/617.pdf"},{"number":618,"title":"나주님을사랑합니다","file":"hymns/618.pdf"},{"number":619,"title":"놀라운그이름","file":"hymns/619.pdf"},{"number":620,"title":"여기에모인우리","file":"hymns/620.pdf"},{"number":621,"title":"찬양하라내영혼아","file":"hymns/621.pdf"},{"number":622,"title":"거룩한밤","file":"hymns/622.pdf"},{"number":623,"title":"주님의시간에","file":"hymns/623.pdf"},{"number":624,"title":"우리모두찬양해","file":"hymns/624.pdf"},{"number":625,"title":"거룩거룩거룩한하나님","file":"hymns/625.pdf"},{"number":626,"title":"만민들아다경배하라","file":"hymns/626.pdf"},{"number":627,"title":"할렐루야할렐루야다함께","file":"hymns/627.pdf"},{"number":628,"title":"아멘아멘아멘영광과존귀를","file":"hymns/628.pdf"},{"number":629,"title":"거룩거룩거룩","file":"hymns/629.pdf"},{"number":630,"title":"진리와생명되신주","file":"hymns/630.pdf"},{"number":631,"title":"우리기도를","file":"hymns/631.pdf"},{"number":632,"title":"주여주여우리를","file":"hymns/632.pdf"},{"number":633,"title":"나의하나님받으소서","file":"hymns/633.pdf"},{"number":634,"title":"모든것이주께로부터","file":"hymns/634.pdf"},{"number":635,"title":"하늘에계신(주기도문)","file":"hymns/635.pdf"},{"number":636,"title":"하늘에계신(주기도문)","file":"hymns/636.pdf"},{"number":637,"title":"주님우리의마음을여시어","file":"hymns/637.pdf"},{"number":638,"title":"주너를지키시고","file":"hymns/638.pdf"},{"number":639,"title":"주함께하소서","file":"hymns/639.pdf"},{"number":640,"title":"아멘","file":"hymns/640.pdf"},{"number":641,"title":"아멘","file":"hymns/641.pdf"},{"number":642,"title":"아멘","file":"hymns/642.pdf"},{"number":643,"title":"아멘","file":"hymns/643.pdf"},{"number":644,"title":"아멘","file":"hymns/644.pdf"},{"number":645,"title":"아멘","file":"hymns/645.pdf"}];

  function normalizeHymnText(s) {
    return String(s || "").toLowerCase().replace(/\s+/g, "").replace(/[·.,!?'"“”‘’()\-]/g, "");
  }

  function renderHymnResults(query) {
    query = String(query || "").trim();
    var nq = normalizeHymnText(query);
    var numberQuery = parseInt(query.replace(/[^0-9]/g, ""), 10);
    var rangeValue = els.hymnRange ? els.hymnRange.value : "all";
    var minRange = 0, maxRange = 9999;
    if (rangeValue !== "all") {
      var parts = rangeValue.split("-");
      minRange = parseInt(parts[0],10); maxRange = parseInt(parts[1],10);
    }
    var results = HYMN_DATA.filter(function(h) {
      if (h.number < minRange || h.number > maxRange) return false;
      if (!nq) return true;
      var title = normalizeHymnText(h.title);
      return (Number.isFinite(numberQuery) && h.number === numberQuery) ||
             String(h.number).indexOf(nq) >= 0 || title.indexOf(nq) >= 0;
    });
    els.hymnResults.innerHTML = "";
    var rangeLabel = rangeValue === "all" ? "전체" : rangeValue.replace("-", "~") + "장";
    els.hymnSearchStatus.textContent = nq
      ? "'" + query + "' 검색 결과 " + results.length + "곡 (" + rangeLabel + ")"
      : "찬송가 " + results.length + "곡 · " + rangeLabel;
    if (!results.length) {
      var empty = document.createElement("div");
      empty.className = "hymn-empty";
      empty.textContent = "찾으시는 찬송가가 없습니다.";
      els.hymnResults.appendChild(empty);
      return;
    }
    results.forEach(function(h) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "hymn-result-card";
      card.innerHTML = '<span class="hymn-number">' + h.number + '장</span>' +
        '<span class="hymn-title">' + escapeHtml(h.title) + '</span>' +
        '<span class="hymn-arrow">›</span>';
      card.addEventListener("click", function() { openHymn(h); });
      els.hymnResults.appendChild(card);
    });
  }

  function openHymn(h) {
    els.hymnViewerTitle.textContent = h.number + "장 · " + h.title;
    els.hymnFrame.src = h.file + "#page=1";
    els.hymnViewer.classList.remove("hidden");
    els.hymnResults.classList.add("hidden");
    els.hymnViewer.scrollIntoView({behavior:"smooth", block:"start"});
  }

  function closeHymnViewer() {
    els.hymnFrame.src = "about:blank";
    els.hymnViewer.classList.add("hidden");
    els.hymnResults.classList.remove("hidden");
  }

  function showHymnScreen() {
    els.cover.classList.add("hidden");
    els.nameScreen.classList.add("hidden");
    els.appScreen.classList.add("hidden");
    els.readScreen.classList.add("hidden");
    els.hymnScreen.classList.remove("hidden");
    closeHymnViewer();
    els.hymnSearchInput.value = "";
    renderHymnResults("");
  }

  /* ---------------- 이벤트 ---------------- */
  renderTodayVerse();
  setInterval(checkTodayVerseDate, 30000);
  if (els.todayVerseCard) els.todayVerseCard.addEventListener("click", openTodayVerse);
  els.startBtn.addEventListener("click", function () {
    state.loginDestination = "write";
    if (isLoggedIn()) {
      els.cover.classList.add("hidden");
      els.appScreen.classList.remove("hidden");
      startAppForUser(state.currentBirth);
    } else {
      showNameScreen("write");
    }
  });
  if (els.gratitudePrayerBtn) els.gratitudePrayerBtn.addEventListener("click", function () {
  if (isLoggedIn()) openGratitudePrayer();
  else showNameScreen("gratitudePrayer");
});
  if (els.closeGratitudePrayerBtn) els.closeGratitudePrayerBtn.addEventListener("click", closeGratitudePrayer);
  if (els.gratitudePrayerHomeBtn) els.gratitudePrayerHomeBtn.addEventListener("click", closeGratitudePrayer);
  if (els.gratitudePrayerScreen) els.gratitudePrayerScreen.addEventListener("click", function (e) {
    if (e.target === els.gratitudePrayerScreen) closeGratitudePrayer();
  });
  if (els.saveGratitudePrayerBtn) els.saveGratitudePrayerBtn.addEventListener("click", saveGratitudePrayer);
  if (els.showGratitudeHistoryBtn) els.showGratitudeHistoryBtn.addEventListener("click", showGratitudeHistory);
  if (els.christianQuotesBtn) els.christianQuotesBtn.addEventListener("click", showChristianQuotesScreen);
  if (els.closeChristianQuotesBtn) els.closeChristianQuotesBtn.addEventListener("click", function(){ els.christianQuotesScreen.classList.add("hidden"); els.cover.classList.remove("hidden"); });
  if (els.christianQuotesScreen) els.christianQuotesScreen.addEventListener("click", function(e){ if (e.target === els.christianQuotesScreen) { els.christianQuotesScreen.classList.add("hidden"); els.cover.classList.remove("hidden"); } });
  if (els.copyChristianQuoteBtn) els.copyChristianQuoteBtn.addEventListener("click", copyChristianQuote);
  if (els.nextChristianQuoteBtn) els.nextChristianQuoteBtn.addEventListener("click", function(){
    christianQuoteIndex++;
    if (christianQuoteIndex >= christianQuoteOrder.length) {
      christianQuoteOrder = shuffleArray(christianQuotePool(christianQuoteCategory));
      christianQuoteIndex = 0;
    }
    renderChristianQuoteDetail();
  });
  if (els.backChristianQuoteCategoriesBtn) els.backChristianQuoteCategoriesBtn.addEventListener("click", closeChristianQuoteDetail);
  els.readBtn.addEventListener("click", showReadScreen);
  els.hymnBtn.addEventListener("click", showHymnScreen);
  els.closeHymnBtn.addEventListener("click", function () {
    els.hymnScreen.classList.add("hidden");
    els.cover.classList.remove("hidden");
  });
  els.hymnViewerClose.addEventListener("click", closeHymnViewer);
  if (els.hymnRange) els.hymnRange.addEventListener("change", function () { renderHymnResults(els.hymnSearchInput.value); });

  els.hymnSearchSubmit.addEventListener("click", function () {
    renderHymnResults(els.hymnSearchInput.value);
  });
  els.hymnSearchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") renderHymnResults(els.hymnSearchInput.value);
  });
  els.nameHomeBtn.addEventListener("click", function () {
    els.nameScreen.classList.add("hidden");
    els.cover.classList.remove("hidden");
  });

  els.readHomeBtn.addEventListener("click", function () {
    els.readScreen.classList.add("hidden");
    els.cover.classList.remove("hidden");
  });
  els.readTestamentSelect.addEventListener("change", function () {
    var test = els.readTestamentSelect.value;
    populateReadBooks(test);
    var bno = els.readBookSelect.value;
    if (bno) readGoTo(bno, chapterNumsSorted(bno)[0]);
  });
  els.readBookSelect.addEventListener("change", function () {
    var bno = els.readBookSelect.value;
    readGoTo(bno, chapterNumsSorted(bno)[0]);
  });
  els.readChapterSelect.addEventListener("change", function () {
    readGoTo(readState.bookNo, els.readChapterSelect.value);
  });
  els.readPrevChBtn.addEventListener("click", function () { readAdjacentChapter(-1); });
  els.readNextChBtn.addEventListener("click", function () { readAdjacentChapter(1); });

  els.readVerseSelect.addEventListener("change", function () {
    scrollToReadVerse(els.readVerseSelect.value);
    var el = document.getElementById("rv-" + readState.bookNo + "-" + readState.chapter + "-" + els.readVerseSelect.value);
    if (el) selectVerseForNote(el);
  });

  els.sermonNoteBtn.addEventListener("click", function () {
    if (!sermonSelectionMode) {
      sermonSelectionMode = true;
      selectedSermonVerses = {};
      updateSermonSelectionToolbar();
      return;
    }
    if (Object.keys(selectedSermonVerses).length) openSermonEditor();
    else { sermonSelectionMode = false; clearSermonSelection(); }
  });
  if (els.sermonEditorSaveBtn) els.sermonEditorSaveBtn.addEventListener("click", saveSermonEditor);
  if (els.sermonEditorDeleteBtn) els.sermonEditorDeleteBtn.addEventListener("click", function(){
    if (els.sermonEditorDeleteBtn.disabled) return;
    if (!confirm("이 예배노트를 삭제할까요?")) return;
    deleteCurrentSermonNote();
  });
  if (els.gratitudeHistoryCloseBtn) els.gratitudeHistoryCloseBtn.addEventListener("click", closeGratitudeHistory);
  els.closeSermonNoteBtn.addEventListener("click", closeSermonNote);
  els.sermonNoteScreen.addEventListener("click", function (e) {
    if (e.target === els.sermonNoteScreen) closeSermonNote();
  });
  els.sermonHistoryBtn.addEventListener("click", openSermonHistory);
  if (els.copyVerseBtn) els.copyVerseBtn.addEventListener("click", function () {
    copyMode = !copyMode;
    if (!copyMode) clearCopyVerseSelection();
    updateCopyToolbar();
  });
  if (els.copySelectedVersesBtn) els.copySelectedVersesBtn.addEventListener("click", copySelectedVerses);
  els.bibleBookSearchBtn.addEventListener("click", openBibleBookSearch);
  els.closeBibleBookSearchBtn.addEventListener("click", closeBibleBookSearch);
  els.bibleBookSearchBottomCloseBtn.addEventListener("click", closeBibleBookSearch);
  els.bibleBookSearchScreen.addEventListener("click", function (e) {
    if (e.target === els.bibleBookSearchScreen) closeBibleBookSearch();
  });
  els.bibleBookSearchSubmit.addEventListener("click", searchBibleBook);
  els.bibleBookSearchInput.addEventListener("input", function () {
    if (els.bibleBookSearchInput.value.trim()) searchBibleBook();
  });
  els.bibleBookSearchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchBibleBook();
  });
  els.bibleSearchBtn.addEventListener("click", openBibleSearch);
  els.closeCommentaryBtn.addEventListener("click", closeCommentary);
  els.commentaryBottomCloseBtn.addEventListener("click", closeCommentary);
  els.compareBtn.addEventListener("click", openCompare);
  els.closeCompareBtn.addEventListener("click", closeCompare);
  els.compareBottomCloseBtn.addEventListener("click", closeCompare);
  els.comparePrevVerseBtn.addEventListener("click", function () { moveCompareVerse(-1); });
  els.compareNextVerseBtn.addEventListener("click", function () { moveCompareVerse(1); });
  els.compareScreen.addEventListener("click", function (e) {
    if (e.target === els.compareScreen) closeCompare();
  });
  els.commentaryScreen.addEventListener("click", function (e) {
    if (e.target === els.commentaryScreen) closeCommentary();
  });
  els.closeBibleSearchBtn.addEventListener("click", closeBibleSearch);
  els.bibleSearchSubmit.addEventListener("click", searchBibleWord);
  els.bibleSearchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchBibleWord();
  });

  els.readTranslationSelect.addEventListener("change", function () {
    setTranslation(els.readTranslationSelect.value);
    populateChapters(readState.bookNo, els.readChapterSelect);
    els.readChapterSelect.value = readState.chapter;
    renderReadChapter();
    populateReadVerseSelect();
  });

  els.birthForm.addEventListener("submit", function (e) {
    e.preventDefault();
    submitBirth(els.birthInput.value);
  });

  els.confirmYesBtn.addEventListener("click", function () {
    enterApp(state.pendingBirth);
  });
  els.confirmNoBtn.addEventListener("click", function () {
    showStep("birth");
    els.birthInput.value = "";
    els.birthInput.focus();
  });

  els.registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = els.registerNameInput.value.trim();
    if (!name) return;
    createProfile(state.pendingBirth, name);
    syncPost("register", { birth: state.pendingBirth, name: name });
    enterApp(state.pendingBirth);
  });
  els.registerBackBtn.addEventListener("click", function () {
    showStep("birth");
    els.birthInput.value = "";
    els.birthInput.focus();
  });

  els.statsBtn.addEventListener("click", openStats);
  els.closeStatsBtn.addEventListener("click", closeStats);
  els.statsScreen.addEventListener("click", function (e) {
    if (e.target === els.statsScreen) closeStats();
  });

  els.bookmarksBtn.addEventListener("click", openBookmarks);
  els.closeBookmarksBtn.addEventListener("click", closeBookmarks);
  els.bookmarksScreen.addEventListener("click", function (e) {
    if (e.target === els.bookmarksScreen) closeBookmarks();
  });

  els.notesListBtn.addEventListener("click", openNotesList);
  els.closeNotesListBtn.addEventListener("click", closeNotesList);
  els.notesListScreen.addEventListener("click", function (e) {
    if (e.target === els.notesListScreen) closeNotesList();
  });

  els.homeBtn.addEventListener("click", function () {
    saveWritePosition(true);
    els.appScreen.classList.add("hidden");
    els.cover.classList.remove("hidden");
  });

  els.userChip.addEventListener("click", function () { showNameScreen("write"); });
  els.readUserChip.addEventListener("click", function () { showNameScreen("read"); });

  els.writeTestamentSelect.addEventListener("change", function () {
    var testament = els.writeTestamentSelect.value;
    populateWriteBooks(testament);
    var bno = els.bookSelect.value;
    if (bno) {
      populateChapters(bno, els.chapterSelect);
      var p = getProfile(state.currentBirth);
      var ch = chapterNumsSorted(bno)[0];
      var nextV = findNextUncompletedInChapter(p, bno, ch);
      var keys = verseKeysSorted(DATA[bno].chapters[String(ch)]);
      goTo(bno, ch, nextV ? keys.indexOf(nextV) : 0);
    }
  });

  els.bookSelect.addEventListener("change", function () {
    goToBookResume(els.bookSelect.value);
    if (els.writeTestamentSelect) els.writeTestamentSelect.value = testamentOfBook(els.bookSelect.value);
  });

  els.verseSelect.addEventListener("change", function () {
    var idx = state.verseKeys.indexOf(String(els.verseSelect.value));
    if (idx >= 0) goTo(state.bookNo, state.chapter, idx);
  });

  els.chapterSelect.addEventListener("change", function () {
    var p = getProfile(state.currentBirth);
    var ch = els.chapterSelect.value;
    var nextV = findNextUncompletedInChapter(p, state.bookNo, ch);
    if (nextV) {
      var keys = verseKeysSorted(DATA[state.bookNo].chapters[ch]);
      goTo(state.bookNo, ch, keys.indexOf(nextV));
    } else {
      goTo(state.bookNo, ch, 0);
    }
  });

  els.translationSelect.addEventListener("change", function () {
    setTranslation(els.translationSelect.value);
    goTo(state.bookNo, state.chapter, currentVerseIndex());
  });

  els.writeInput.addEventListener("input", function () { renderOverlay(); saveWritePosition(false); });

  els.reflectionToggle.addEventListener("click", function () {
    els.reflectionArea.classList.toggle("hidden");
    if (!els.reflectionArea.classList.contains("hidden")) {
      setTimeout(function () { els.reflectionInput.focus(); }, 30);
    }
  });
  els.reflectionSaveBtn.addEventListener("click", saveReflection);
  els.reflectionInput.addEventListener("blur", saveReflection);

  els.prevVerseBtn.addEventListener("click", function () { goAdjacentVerse(-1); });
  els.nextVerseBtn.addEventListener("click", function () { goAdjacentVerse(1); });

  els.writeInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      goAdjacentVerse(1);
    }
  });

  els.birthInput.addEventListener("input", function () {
    els.birthInput.value = els.birthInput.value.replace(/[^0-9]/g, "").slice(0, 6);
  });

  /* ---------------- 초기화 ---------------- */
  function init() {
    setTranslation(loadTranslationPref());
    if (els.writeTestamentSelect) {
      els.writeTestamentSelect.value = "OT";
      populateWriteBooks("OT");
    } else {
      populateBooks(els.bookSelect, true);
    }

    // 자동 로그인: 이전에 로그인했던 사람 기록이 이 기기에 있으면 조용히 이어서 로그인 상태로 둔다.
    try {
      var savedBirth = localStorage.getItem(CURRENT_USER_KEY);
      if (savedBirth && getProfile(savedBirth)) {
        setCurrentUser(savedBirth);
        // 백그라운드로 최신 원격 데이터 병합
        syncGet({ action: "profile", birth: savedBirth }).then(function (remote) {
          if (remote && remote.found) mergeRemoteIntoLocal(savedBirth, remote);
        });
      }
    } catch (e) {}
  }

  init();
})();
