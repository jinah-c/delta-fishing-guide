/* 낚시할사람 — 델타포스 낚시 가이드 SPA (해시 라우팅, 서버 불필요) */
(function () {
  const app = document.getElementById("app");

  const esc = s => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const RARITY_BADGE = {
    "일반": "badge-common",
    "희귀": "badge-rare",
    "레드": "badge-red"
  };

  const fishById = id => DATA.fish.find(f => f.id === id);
  const mapById = id => DATA.maps.find(m => m.id === id);
  const MAP_NAV_ORDER = ["longbow", "az3", "zero-dam"];

  function spotById(spotId) {
    for (const m of DATA.maps) {
      const s = m.spots.find(x => x.id === spotId);
      if (s) return { map: m, spot: s };
    }
    return null;
  }

  function fishInSpot(spotId) {
    const ids = new Set();
    const loc = spotById(spotId);
    if (loc) loc.spot.fishIds.forEach(id => ids.add(id));
    DATA.fish.forEach(f => { if (f.spotIds.includes(spotId)) ids.add(f.id); });
    return [...ids].map(fishById).filter(Boolean);
  }

  function fishName(f, withBadge) {
    const kr = f.nameKr || f.nameEn;
    let html = esc(kr);
    if (withBadge && !f.nameKrConfirmed) html += ' <span class="badge badge-unconfirmed">미확인</span>';
    return html;
  }

  const rarityBadge = f =>
    `<span class="badge ${RARITY_BADGE[f.rarity] || "badge-common"}">${esc(f.rarity)}</span>` +
    (f.rarityAlt ? ` <span class="badge badge-gold">${esc(f.rarityAlt)}</span>` : "");

  // 낚시법 라벨 — 둘 다 가능하면 "찌/루어" 하나로 묶는다
  function methodLabels(f) {
    const ms = f.method || [];
    if (ms.includes("찌낚시") && ms.includes("루어")) return ["찌/루어"];
    return ms.map(m => (m === "루어" ? "루어낚시" : m));
  }

  const methodBadges = f =>
    methodLabels(f).map(m => `<span class="badge badge-method">${esc(m)}</span>`).join(" ");

  /* ── 썸네일: data의 image 경로가 있으면 실제 이미지, 없으면 종류별 플레이스홀더 ── */

  const PLACEHOLDER_SVG = {
    fish: '<path d="M4 20c9-11 24-14 38-9l14-9v36l-14-9C28 34 13 31 4 20z" fill="currentColor"/><circle cx="15" cy="18" r="2.4" fill="#050506"/>',
    rod: '<path d="M8 36 54 4" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="20" cy="28" r="6" fill="currentColor"/><path d="M54 4v20" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>',
    reel: '<circle cx="32" cy="20" r="15" fill="currentColor"/><circle cx="32" cy="20" r="6" fill="#050506"/><path d="M47 20h11" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
    line: '<rect x="18" y="6" width="28" height="28" rx="6" fill="currentColor"/><path d="M18 14c10 3 18 3 28 0M18 22c10 3 18 3 28 0M18 30c10 3 18 3 28 0" stroke="#050506" stroke-width="2" fill="none"/>',
    bait: '<path d="M14 26c0-10 8-18 18-18s18 6 18 14-8 12-18 12-18-2-18-8z" fill="currentColor"/><circle cx="26" cy="18" r="2.5" fill="#050506"/><circle cx="36" cy="22" r="2" fill="#050506"/>',
    lure: '<path d="M10 20c8-9 22-12 34-7 4 2 4 12 0 14-12 5-26 2-34-7z" fill="currentColor"/><path d="M46 20h6m0 0c3 0 4 6 0 7" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    trap: '<path d="M12 12h40l-4 24H16z" fill="currentColor"/><path d="M20 12l2 24M28 12v24M36 12v24M44 12l-2 24M13 20h38M14 28h36" stroke="#050506" stroke-width="1.6"/><path d="M10 12h44" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
  };

  const RARITY_TONE = { "일반": "tone-common", "희귀": "tone-rare", "레드": "tone-red" };
  const TIER_TONE = {
    1: "tone-common",
    2: "tone-green",
    3: "tone-blue",
    4: "tone-rare",
    5: "tone-gold",
    6: "tone-red"
  };

  function thumb(obj, kind, tone, size) {
    const inner = obj.image
      ? `<img src="${esc(obj.image)}" alt="" loading="lazy">`
      : `<svg viewBox="0 0 64 40" aria-hidden="true">${PLACEHOLDER_SVG[kind] || PLACEHOLDER_SVG.fish}</svg><span class="thumb-ph">이미지 준비중</span>`;
    return `<div class="thumb thumb-${esc(kind)} ${tone || "tone-common"} ${size === "lg" ? "thumb-lg" : ""} ${obj.image ? "" : "is-empty"}">${inner}</div>`;
  }

  const fishThumb = (f, size) => thumb(f, "fish", RARITY_TONE[f.rarity], size);

  // fish.spotIds ∪ maps.spots[].fishIds 양방향 합집합 (한쪽만 입력돼도 상세에 노출)
  function fishSpots(f) {
    const ids = new Set(f.spotIds);
    DATA.maps.forEach(m => m.spots.forEach(s => { if (s.fishIds.includes(f.id)) ids.add(s.id); }));
    return [...ids].map(spotById).filter(Boolean);
  }

  // 특정 수역을 찍을 수 없는 광역 출현 어종은 fish.spotNote 문구로 대체
  function fishLocText(f) {
    const locs = fishSpots(f);
    if (!locs.length) return f.spotNote || "출현 수역 미확정";
    return locs.map(l => esc(l.map.nameKr + " · " + l.spot.nameKr)).join(", ");
  }

  function fishLocLinks(f) {
    const locs = fishSpots(f);
    if (!locs.length) return f.spotNote ? esc(f.spotNote) : "출현 수역 미확정 (인게임 도감 확인 필요)";
    return locs.map(l => `<a href="#/map/${l.map.id}">${esc(l.map.nameKr)} · ${esc(l.spot.nameKr)}</a>`).join(", ");
  }

  function spotListName(spot) {
    if (spot.id === "az3-offshore") return "외해(상어바다)";
    if (spot.id === "longbow-serenity-bay") return "우물낚시터";
    return spot.nameKr.replace(/\s+\(/g, "(");
  }

  function fishLocGroupedLines(locs) {
    const groups = [];
    locs.forEach(loc => {
      let group = groups.find(g => g.map.id === loc.map.id);
      if (!group) {
        group = { map: loc.map, spots: [] };
        groups.push(group);
      }
      group.spots.push(spotListName(loc.spot));
    });
    return groups.map(g => `<span class="fish-loc-line">${esc(g.map.nameKr)} - ${esc(g.spots.join(" / "))}</span>`).join("");
  }

  function tipItems(text) {
    return String(text || "")
      .replace(/\s+—\s+/g, "\n")
      .replace(/\s+(권장 준비물:)/g, "\n$1")
      .replace(/\s+(도감 기준)/g, "\n$1")
      .replace(/\s+(4000D 헤비 드래그 릴 해금 트레이드 요구 무게:)/g, "\n$1")
      .split(/(?:\n+|(?<=[.!?。])\s+)/)
      .map(s => s.trim().replace(/[.]$/, ""))
      .filter(Boolean);
  }

  function tipList(text, cls) {
    const items = tipItems(text);
    if (!items.length) return "";
    return `<ul class="tip-list ${cls || ""}">${items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`;
  }

  function gearGroup(name) {
    return DATA.gear && DATA.gear[name] ? DATA.gear[name] : [];
  }

  function gearById(group, id) {
    return gearGroup(group).find(x => x.id === id);
  }

  /* 미끼/루어 설명에서 실제 아이템을 본문 등장 순서대로 뽑는다.
     이름 바로 뒤(공백 없이)에 붙은 괄호는 그 아이템의 설명으로 함께 가져온다. */
  function baitGearMatches(text) {
    const value = String(text || "");
    const all = [...gearGroup("lures"), ...gearGroup("floatBaits")];
    const aliases = [
      ["high-contrast-spoon", ["고대비 자극 스푼"]],
      ["fluorescent-vibrating-spoon", ["형광 진동 스푼"]],
      ["precision-hunting-lure", ["정밀 포식 루어", "그린 스피너"]],
      ["deepwater-detection-lure", ["심층 탐지 루어", "딥워터 프로브", "딥워터 다이버"]],
      ["high-freq-tail-swing", ["고빈도 테일 웜"]],
      ["territorial-stimulus-lure", ["영역 자극 루어"]],
      ["deep-diving-giant-vibration", ["심해 대형 어류 진동 루어"]],
      ["steel-ball-acoustic", ["스틸볼 사운드 루어"]],
      ["gold-plated-competition", ["골드 컴피티션 루어", "골드 루어"]],
      ["enhanced-attractant-dough", ["일반 미끼", "강화 유인 미끼"]],
      ["refined-competition-dough", ["고급 컴피티션 루어"]],
      ["secret-bloodworm", ["레드 미끼", "적색 벌레 특제 미끼"]]
    ];
    const matches = [];
    aliases.forEach(([id, keys]) => {
      const item = all.find(x => x.id === id);
      if (!item) return;
      let best = null;
      keys.forEach(key => {
        const at = value.indexOf(key);
        if (at >= 0 && (!best || at < best.at)) best = { at, alias: key };
      });
      if (best) matches.push({ item, alias: best.alias, at: best.at, note: trailingParen(value, best.at + best.alias.length) });
    });
    return matches.sort((a, b) => a.at - b.at);
  }

  // "…루어(실전 추천)"처럼 이름에 바로 붙은 괄호만 그 아이템 설명으로 본다
  function trailingParen(text, from) {
    const open = text[from];
    if (open !== "(" && open !== "（") return "";
    const close = text.indexOf(open === "(" ? ")" : "）", from);
    return close < 0 ? "" : text.slice(from, close + 1);
  }

  /* 추천 장비 데이터: 분류별로 실제 장비 아이템 + 부연 설명을 뽑는다 */
  function fishSetup(f, certs) {
    const certFish = certs.map(c => ({
      cert: c,
      info: c.fish.find(x => x.fishId === f.id)
    })).find(x => x.info);
    const methods = new Set(f.method);
    const hasLure = methods.has("루어");
    const hasFloat = methods.has("찌낚시");
    const isRed = f.rarity === "레드";
    const isBig = ["대형", "거대"].includes(f.size);
    const isTradeFish = gearGroup("reels").some(r => (r.tradeFish || []).some(x => x.fishId === f.id));

    const entry = (item, kind) => item ? { item, kind } : null;
    const withNote = (e, note) => e ? Object.assign(e, { note }) : null;
    const rod = id => entry(gearById("rods", id), "rod");
    const reel = tier => entry(gearGroup("reels").find(x => x.tier === tier), "reel");
    const line = tier => entry(gearGroup("lines").find(x => x.tier === tier), "line");

    let rodEntries;
    let rodNote = "";
    if (certFish && certFish.info.rod) {
      const text = certFish.info.rod;
      rodEntries = [
        /입문용|찌낚싯대/.test(text) ? rod("starter-float-rod") : null,
        /GFRP|파이버/.test(text) ? rod("fiberglass-lure-rod") : null,
        /금속/.test(text) ? rod("metal-lure-rod") : null,
        /하이카본/.test(text) ? rod("high-carbon-lure-rod") : null
      ].filter(Boolean);
      rodNote = rodEntries.length ? dropGeneric(setupRest(text, rodEntries)) : text;
    } else if (hasFloat && !hasLure) {
      rodEntries = [rod("starter-float-rod")].filter(Boolean);
    } else if (isRed || (f.rarity === "희귀" && isBig)) {
      rodEntries = [rod("high-carbon-lure-rod")].filter(Boolean);
    } else if (f.rarity === "희귀") {
      rodEntries = [rod("metal-lure-rod")].filter(Boolean);
    } else if (hasLure) {
      rodEntries = [rod("fiberglass-lure-rod")].filter(Boolean);
    } else {
      rodEntries = [rod("starter-float-rod")].filter(Boolean);
    }

    let reelEntries = [];
    let reelNote = "";
    if (hasLure) {
      if (isRed || isTradeFish) {
        reelEntries = [reel(4), withNote(reel(5), "* 권장")].filter(Boolean);
      } else if (certFish && certFish.cert.level >= 40) {
        reelEntries = [reel(4)].filter(Boolean);
      } else if ((certFish && certFish.cert.level >= 30) || f.rarity === "희귀" || isBig) {
        reelEntries = [reel(3)].filter(Boolean);
      } else {
        reelEntries = [reel(2)].filter(Boolean);
      }
    }

    let lineEntries;
    let lineNote = "";
    if (Array.isArray(f.lineTiers) && f.lineTiers.length) {
      // 어종 데이터에 쓸 수 있는 낚싯줄 클래스를 직접 적어둔 경우 (마지막 값이 권장)
      lineEntries = f.lineTiers.map(line).filter(Boolean);
      if (lineEntries.length && f.lineNote) lineEntries[lineEntries.length - 1].note = f.lineNote;
    } else if (certFish && certFish.info.line) {
      const text = certFish.info.line;
      const tier = /60|골드/.test(text) ? 5 : /40|퍼플/.test(text) ? 4 : /25/.test(text) ? 3 : 2;
      lineEntries = [line(tier)].filter(Boolean);
      lineNote = dropGeneric(setupRest(text, lineEntries)) || text;
    } else if (isRed || isTradeFish || f.size === "거대") {
      lineEntries = [line(5)].filter(Boolean);
    } else if (f.rarity === "희귀" || isBig) {
      lineEntries = [line(4)].filter(Boolean);
    } else {
      lineEntries = [line(3)].filter(Boolean);
    }

    const baitText = f.bait || "";
    const floatBaits = gearGroup("floatBaits");
    const baitEntries = baitGearMatches(baitText).map(match => ({
      item: match.item,
      kind: floatBaits.some(x => x.nameKr === match.item.nameKr) ? "bait" : "lure",
      alias: match.alias,
      note: match.note
    }));
    const baitNote = baitEntries.length ? setupRest(baitText, baitEntries) : (baitText || "정보 없음");

    // 한 줄에 여러 장비가 오면 낮은 클래스부터 나열
    const byTier = entries => entries.slice().sort((a, b) => (a.item.tier || 0) - (b.item.tier || 0));

    return [
      { label: "낚싯대", entries: byTier(rodEntries), note: rodNote },
      { label: "릴", entries: byTier(reelEntries), note: reelNote },
      { label: "낚싯줄", entries: byTier(lineEntries), note: lineNote },
      { label: "미끼/루어", entries: byTier(baitEntries), note: baitNote }
    ];
  }

  /* 추천 장비 출력: 위에 장비 썸네일 줄, 아래에 "분류 — 클래스 뱃지 + 이름 + 부연" 목록 */
  function fishSetupList(f, certs) {
    const rows = fishSetup(f, certs);
    const seen = new Set();
    const gallery = [];
    rows.forEach(row => row.entries.forEach(entry => {
      const key = entry.item.id || entry.item.nameKr || entry.item.nameEn;
      if (seen.has(key)) return;
      seen.add(key);
      gallery.push(entry);
    }));
    return `${gallery.length ? `<div class="setup-gallery">${gallery.map(entry => thumb(entry.item, entry.kind, tierTone(entry.item))).join("")}</div>` : ""}
    <ul class="fish-setup-list">
      ${rows.map(row => `<li><span class="setup-label">${esc(row.label)}</span><div class="setup-value">${setupValue(row)}</div></li>`).join("")}
    </ul>`;
  }

  function setupValue(row) {
    if (!row.entries.length) return row.note ? esc(row.note) : "–";
    const last = row.entries.length - 1;
    const items = row.entries.map((entry, i) => `<span class="setup-item">${gradeBadge(entry.item)}<span class="setup-name">${esc(entry.item.nameKr || entry.item.nameEn)}</span>${setupNote(entry.note)}${i < last ? '<span class="setup-comma">,</span>' : ""}</span>`);
    return `${items.join("")}${setupNote(row.note)}`;
  }

  /* 부연 설명 출력 — "*"로 시작하는 조각은 강조색으로 따로 뺀다 */
  function setupNote(note) {
    const text = String(note || "").trim();
    if (!text) return "";
    const at = text.indexOf("*");
    if (at < 0) return ` <span class="gear-note">${setupNoteText(text)}</span>`;
    const plain = text.slice(0, at).replace(/[\s·,/-]+$/, "").trim();
    const hot = text.slice(at).trim();
    return `${plain ? ` <span class="gear-note">${setupNoteText(plain)}</span>` : ""} <span class="gear-note gear-note-hot">${esc(hot)}</span>`;
  }

  // 이미 괄호가 들어간 설명은 그대로 두고, 짧은 부연에만 괄호를 씌운다
  function setupNoteText(text) {
    return /[(（]/.test(text) ? esc(text) : `(${esc(text)})`;
  }

  // "권장 / 이상 / 이상 권장"처럼 뱃지·장비명으로 이미 드러나는 부연은 버린다
  function dropGeneric(note) {
    return /^(이상\s*권장|권장\s*이상|이상|권장)$/.test(String(note || "").trim()) ? "" : note;
  }

  // 장비명이 그대로 적힌 설명은 이름을 걷어내고 남은 부연("이상 권장" 등)만 남긴다
  function setupRest(text, entries) {
    let rest = String(text || "");
    entries.forEach(entry => {
      [entry.note, entry.alias, entry.item.nameKr, entry.item.nameEn].forEach(name => {
        if (name) rest = rest.split(name).join(" ");
      });
    });
    return rest.replace(/\s+/g, " ").replace(/^[\s·,/-]+/, "").trim();
  }

  function conditionItem(condition) {
    if (typeof condition === "string") return `<li>${esc(condition)}</li>`;
    return `<li>${esc(condition.text)}
      <ol class="step-list">${condition.steps.map(st => `<li>${esc(st)}</li>`).join("")}</ol>
    </li>`;
  }

  // requirement·guide가 배열이면 줄 단위로 끊어 목록으로 (문자열이면 한 줄 그대로)
  function lineList(value, cls) {
    if (!Array.isArray(value)) return esc(value);
    return `<ul class="tip-list ${cls || ""}">${value.map(line => `<li>${esc(line)}</li>`).join("")}</ul>`;
  }

  function missionFishCard(x) {
    const f = fishById(x.fishId);
    if (!f) return "";
    const bait = x.bait || f.bait || "정보 없음";
    return `<div class="mission-fish-card">
      ${fishThumb(f)}
      <div class="mission-fish-body">
        <div class="mission-fish-title">
          <a href="#/fish/${f.id}">${fishName(f, true)}</a>
          ${x.condition ? `<span class="badge badge-size">${esc(x.condition)}</span>` : ""}
          ${rarityBadge(f)}
        </div>
        <dl class="prep-list">
          <dt>필요 낚싯대</dt><dd>${esc(x.rod || "정보 없음")}</dd>
          <dt>낚싯줄</dt><dd>${esc(x.line || "정보 없음")}</dd>
          <dt>미끼/루어</dt><dd>${esc(bait)}</dd>
          <dt>출현장소</dt><dd>${fishLocLinks(f)}</dd>
          ${x.note ? `<dt>팁</dt><dd>${tipList(x.note, "tip-list-compact")}</dd>` : ""}
        </dl>
      </div>
    </div>`;
  }

  function fishCard(f) {
    return `<a class="item-card" href="#/fish/${f.id}">
      ${fishThumb(f)}
      <div class="item-body">
        <div class="item-title">${fishName(f, true)}</div>
        <div class="item-badges">${rarityBadge(f)} ${methodBadges(f)}</div>
        <div class="item-meta">📍 ${fishLocText(f)}</div>
      </div>
      <span class="item-go" aria-hidden="true">›</span>
    </a>`;
  }

  // 장비·미끼 카드 (링크 없음). kind: rod | reel | line | bait | lure
  function gradeBadge(obj) {
    if (!obj.tier) return "";
    return `<span class="grade-badge grade-t${obj.tier}">${esc(obj.gradeLabel || `${obj.tier}클`)}</span>`;
  }

  function rodMethodBadge(obj) {
    if (!obj.method) return "";
    const cls = obj.method === "찌낚시" ? "gear-method-float" : "gear-method-lure";
    return `<span class="gear-method-badge ${cls}">${esc(obj.method)}</span>`;
  }

  function gearTitle(obj) {
    return `${esc(obj.nameKr || obj.nameEn)}${gradeBadge(obj)}`;
  }

  function rodTitle(obj) {
    return `${esc(obj.nameKr || obj.nameEn)}${rodMethodBadge(obj)}${gradeBadge(obj)}`;
  }

  function tierTone(obj) {
    return TIER_TONE[obj.tier] || "tone-common";
  }

  function itemCard(obj, kind, title, sub, note, tone, extra) {
    return `<div class="item-card">
      ${thumb(obj, kind, tone)}
      <div class="item-body">
        <div class="item-title">${title}</div>
        ${sub ? `<div class="item-sub">${sub}</div>` : ""}
        ${note ? `<div class="item-meta">${note}</div>` : ""}
        ${extra || ""}
      </div>
    </div>`;
  }

  /* ── Pages ── */

  function pageHome() {
    return `
    <div class="hero">
      <h1>델타포스 낚시 가이드</h1>
      <p>신규 낚시 콘텐츠 정리 , 맵별 낚시터부터 승급미션 물고기 정보까지 :&gt;</p>
    </div>
    <div class="quick">
      <a href="#/maps"><div class="q-title">🗺️ 맵 · 낚시터</div><div class="q-sub">낚시 가능한 맵 ${DATA.maps.length}곳, 낚시터 ${DATA.maps.reduce((n, m) => n + m.spots.length, 0)}곳</div></a>
      <a href="#/fish"><div class="q-title">🐟 물고기 도감</div><div class="q-sub">전체 ${DATA.fish.length}물고기종류·등급·낚시법 필터</div></a>
      <a href="#/missions"><div class="q-title">📈 승급 가이드</div><div class="q-sub">낚시 해금부터 10·20·30·40레벨 승급 준비물</div></a>
      <a href="#/npc"><div class="q-title">🎣 낚시꾼 NPC</div><div class="q-sub">조 리드(낚시꾼) 스폰위치 & 역할</div></a>
      <a href="#/gear"><div class="q-title">🧰 장비 · 미끼</div><div class="q-sub">낚싯대·릴·낚싯줄·미끼·루어 정리</div></a>
    </div>
    <h2>시작하기 요약</h2>
    <div class="notice"><ul>${DATA.missions.unlock.conditions.map(conditionItem).join("")}</ul></div>`;
  }

  function pageMaps() {
    return `<h1>맵 · 낚시터</h1>
    <p class="page-desc">낚시는 맵 3곳에서만 가능. 맵을 누르면 낚시터와 포인트별 물고기를 볼 수 있어요.</p>
    <div class="grid">
      ${DATA.maps.map(m => `
      <a class="card" href="#/map/${m.id}">
        <img class="card-img" src="${esc(m.mapImage)}" alt="${esc(m.nameKr)} 지도" loading="lazy">
        <div class="card-body">
          <div class="card-title">${esc(m.nameKr)} <span class="badge badge-easy">${esc(m.difficulty)}</span></div>
          <div class="card-note">${esc(m.note)}</div>
        </div>
      </a>`).join("")}
    </div>`;
  }

  /* 낚시터별 정보 레이어를 맵 위에 쌓고 탭으로 골라 보는 지도
     (layerMap.layers는 위→아래 순서라 DOM에는 뒤집어 넣는다) */
  function mapLayerStack(m) {
    const layers = (m.layerMap.layers || []).filter(l => l.image);
    if (!layers.length) return "";
    const spotName = id => {
      const s = m.spots.find(x => x.id === id);
      return s ? s.nameKr.replace(/\s*\(.*\)\s*/g, "") : id;
    };
    const tabs = [{ key: "all", label: "전체" }]
      .concat(m.spots
        .filter(sp => layers.some(l => l.spotId === sp.id))
        .map(sp => ({ key: sp.id, label: spotName(sp.id) })));
    return `<div class="map-stack" data-layer-map>
      <div class="map-stack-tabs" role="tablist" aria-label="${esc(m.nameKr)} 낚시터 레이어">
        ${tabs.map((t, i) => `<button type="button" class="map-tab${i === 0 ? " active" : ""}" role="tab" aria-selected="${i === 0}" data-layer="${esc(t.key)}">${esc(t.label)}</button>`).join("")}
      </div>
      <div class="map-stack-view">
        <img class="map-stack-base" src="${esc(m.layerMap.base)}" alt="${esc(m.nameKr)} 지도">
        ${layers.slice().reverse().map(l => `<img class="map-stack-layer is-on" data-layer="${esc(l.spotId)}" src="${esc(l.image)}" alt="${esc(spotName(l.spotId))} 출현 어종" loading="lazy">`).join("")}
      </div>
    </div>`;
  }

  function pageMapDetail(id) {
    const m = mapById(id);
    if (!m) return pageNotFound();
    const pins = m.spots.filter(s => s.coord);
    const mapNav = MAP_NAV_ORDER
      .map(mapById)
      .filter(x => x && x.id !== m.id);
    return `<a class="back" href="#/maps">← 맵 목록</a>
    <div class="detail-head"><h1>${esc(m.nameKr)}</h1><span class="badge badge-easy">${esc(m.difficulty)}</span></div>
    <p class="page-desc">${esc(m.note)}</p>
    <div class="map-wrap base-map is-screen-hidden" aria-hidden="true">
      <img src="${esc(m.mapImage)}" alt="${esc(m.nameKr)} 지도">
      ${pins.map(s => `
        <span class="pin" style="left:${s.coord.x}%;top:${s.coord.y}%" title="${esc(s.nameKr)}">📍</span>
        <span class="pin-label" style="left:${s.coord.x}%;top:${s.coord.y}%">${esc(s.nameKr)}</span>`).join("")}
    </div>
    ${pins.length === 0 ? `<div class="notice base-map-note is-screen-hidden" aria-hidden="true">지도 위 핀 좌표는 아직 준비 중이에요. 아래 낚시터 설명의 위치 안내를 참고해 주세요.</div>` : ""}
    ${m.layerMap ? mapLayerStack(m) : m.fishMapImage ? `
    <h2>물고기 분포도</h2>
    <div class="map-wrap fish-map">
      <img src="${esc(m.fishMapImage)}" alt="${esc(m.nameKr)} 물고기 분포도" loading="lazy">
    </div>
    <p class="img-source">출처: <a href="${esc(m.fishMapSource.url)}" target="_blank" rel="noopener noreferrer">${esc(m.fishMapSource.label)}</a></p>` : ""}
    <h2>낚시터 ${m.spots.length}곳</h2>
    <div class="cards-2">
    ${m.spots.map(s => {
      const fishes = fishInSpot(s.id);
      const fishHtml = !fishes.length
        ? '<div class="fish-links"><span class="none">확인된 주요 어종 정보 없음 (일반 어종 출현)</span></div>'
        : `<div class="fish-rows">${fishes.map(f => `<a href="#/fish/${f.id}">${fishThumb(f)}<span class="fish-row-name">${fishName(f)}</span></a>`).join("")}</div>`;
      return `<div class="spot-card">
        <h3>${esc(s.nameKr)} ${s.nameEn ? `<span class="badge badge-spot-en">${esc(s.nameEn)}</span>` : ""}</h3>
        <div class="desc">${esc(s.description)}</div>
        ${fishHtml}
      </div>`;
    }).join("")}
    </div>
    <nav class="map-switcher" aria-label="다른 맵으로 이동">
      ${mapNav.map((x, i) => `<a href="#/map/${x.id}">${i === 0 ? "< " : ""}${esc(x.nameKr)}${i === mapNav.length - 1 ? " >" : ""}</a>`).join("")}
    </nav>`;
  }

  function pageFish(params) {
    const rarities = ["전체", "일반", "희귀", "레드"];
    const methods = ["전체", "찌낚시", "루어"];
    // 잘못된 쿼리값(공유 링크 오타 등)은 "전체"로 보정
    let rarity = params.get("rarity") || "전체";
    let method = params.get("method") || "전체";
    if (!rarities.includes(rarity)) rarity = "전체";
    if (!methods.includes(method)) method = "전체";
    let list = DATA.fish;
    if (rarity !== "전체") list = list.filter(f => f.rarity === rarity);
    if (method !== "전체") list = list.filter(f => f.method.includes(method));
    const link = (r, m) => `#/fish?rarity=${encodeURIComponent(r)}&method=${encodeURIComponent(m)}`;
    const rarityChipClass = { "전체": "chip-all", "일반": "chip-common", "희귀": "chip-rare", "레드": "chip-red" };
    const methodChipClass = { "전체": "chip-method-all", "찌낚시": "chip-float", "루어": "chip-lure" };
    return `<h1>물고기 도감</h1>
    <p class="page-desc">전체 ${DATA.fish.length}종. 물고기를 누르면 잡는 곳·낚시법·미끼를 볼 수 있어요.</p>
    <div class="filters filter-group">
      <span class="filter-label">등급</span>
      ${rarities.map(r => `<a class="chip ${rarityChipClass[r]} ${r === rarity ? "active" : ""}" ${r === rarity ? 'aria-current="true"' : ""} href="${link(r, method)}">${esc(r)}</a>`).join("")}
    </div>
    <div class="filters filter-group">
      <span class="filter-label">낚시법</span>
      ${methods.map(m => `<a class="chip ${methodChipClass[m]} ${m === method ? "active" : ""}" ${m === method ? 'aria-current="true"' : ""} href="${link(rarity, m)}">${esc(m === "루어" ? "루어낚시" : m)}</a>`).join("")}
    </div>
    ${list.length ? `<div class="cards-2">${list.map(fishCard).join("")}</div>` : "<p>조건에 맞는 물고기가 없어요.</p>"}`;
  }

  /* 물고기가 나오는 지도 — 같은 맵의 낚시터 레이어는 한 탭 안에 함께 쌓는다 */
  function spotShortName(spot) {
    return spot.nameKr.replace(/\s*\(.*\)\s*/g, "");
  }

  function spotLayerArt(map, spotId) {
    const lm = map.layerMap;
    if (!lm) return null;
    const hit = (lm.layers || []).find(l => l.spotId === spotId && l.image);
    return hit ? { base: lm.base, image: hit.image } : null;
  }

  function fishSpotStack(locs) {
    const groups = [];
    locs.forEach(loc => {
      const art = spotLayerArt(loc.map, loc.spot.id);
      if (!art) return;
      let group = groups.find(g => g.map.id === loc.map.id);
      if (!group) {
        group = { map: loc.map, base: art.base, locs: [], spotIds: new Set() };
        groups.push(group);
      }
      group.locs.push(loc);
      group.spotIds.add(loc.spot.id);
    });
    if (!groups.length) return "";
    const groupLayers = group => (group.map.layerMap.layers || [])
      .filter(l => group.spotIds.has(l.spotId) && l.image)
      .slice()
      .reverse();
    const layerAlt = (group, layer) => {
      const loc = group.locs.find(x => x.spot.id === layer.spotId);
      return loc ? `${group.map.nameKr} · ${spotShortName(loc.spot)} 출현 어종` : `${group.map.nameKr} 출현 어종`;
    };
    return `<h2>낚시터 지도</h2>
    <div class="map-stack" data-layer-map data-require-selection>
      <div class="map-stack-tabs" role="tablist" aria-label="출현 낚시터 지도">
        ${groups.map((group, i) => `<button type="button" class="map-tab${i === 0 ? " active" : ""}" role="tab" aria-selected="${i === 0}" data-layer="${esc(group.map.id)}">${esc(group.map.nameKr)}</button>`).join("")}
      </div>
      <div class="map-stack-view">
        ${groups.map((group, i) => `<div class="map-stack-group map-stack-layer${i === 0 ? " is-on" : ""}" data-layer="${esc(group.map.id)}">
          <img class="map-stack-base" src="${esc(group.base)}" alt="${esc(group.map.nameKr)} 지도" loading="lazy">
          ${groupLayers(group).map(layer => `<img src="${esc(layer.image)}" alt="${esc(layerAlt(group, layer))}" loading="lazy">`).join("")}
        </div>`).join("")}
      </div>
    </div>`;
  }

  function pageFishDetail(id) {
    const f = fishById(id);
    if (!f) return pageNotFound();
    return `<a class="back" href="#/fish">← 도감으로</a>
    ${fishDetailBody(f)}`;
  }

  /* 물고기 상세 본문 — 상세 페이지와 팝업이 같은 내용을 쓴다 */
  function fishDetailBody(f) {
    const locs = fishSpots(f);
    const certs = DATA.missions.certifications.filter(c => c.fish.some(x => x.fishId === f.id));
    return `<div class="fish-hero">
    ${fishThumb(f, "lg")}
    <div class="fish-hero-body">
    <div class="detail-head"><h1>${fishName(f, true)}</h1></div>
    <p class="fish-altnames">${esc(f.nameEn)}${f.nameAlt ? ` <span class="sep">·</span> ${esc(f.nameAlt)}` : ""}</p>
    <p>${rarityBadge(f)} ${methodBadges(f)} <span class="badge badge-size">${esc(f.size)}</span></p>
    <div class="fish-info-panel">
      <section class="fish-info-section">
        <h2>잡는 곳</h2>
        <div class="fish-loc-list">${locs.length
          ? fishLocGroupedLines(locs)
          : (f.spotNote ? esc(f.spotNote) : "출현 수역 미확정 (인게임 도감 확인 필요)")}</div>
      </section>
      <section class="fish-info-section">
        <h2>낚시법</h2>
        <div>${f.method.map(esc).join(", ")}</div>
      </section>
      <section class="fish-info-section">
        <h2>추천 장비</h2>
        ${fishSetupList(f, certs)}
      </section>
      ${f.tips ? `<section class="fish-info-section"><h2>팁</h2>${tipList(f.tips)}</section>` : ""}
      ${certs.length ? `<section class="fish-info-section"><h2>승급 연관</h2><div>${certs.map(c => `<a href="#/missions">레벨 ${c.level} ${esc(c.nameKr)}</a>`).join("<br>")}</div></section>` : ""}
    </div>
    </div>
    </div>
    ${fishSpotStack(locs) || (locs.length ? locs.map(l => `
      <h2>${esc(l.map.nameKr)} 위치</h2>
      <div class="map-wrap">
        <img src="${esc(l.map.mapImage)}" alt="${esc(l.map.nameKr)} 지도" loading="lazy">
        ${l.spot.coord ? `<span class="pin" style="left:${l.spot.coord.x}%;top:${l.spot.coord.y}%">📍</span><span class="pin-label" style="left:${l.spot.coord.x}%;top:${l.spot.coord.y}%">${esc(l.spot.nameKr)}</span>` : ""}
      </div>
      ${l.spot.coord ? "" : `<div class="notice">정확한 핀 좌표는 준비 중 — "${esc(l.spot.nameKr)}" 수역: ${esc(l.spot.description)}</div>`}
    `).join("") : "")}`;
  }

  /* 승급어 제출 방법 (조 리드 옆 통발) — 승급 가이드·NPC 페이지 공용 */
  function submitGuide() {
    const sub = DATA.missions.submission;
    return `<div class="submit-guide">
      <div class="submit-figures">
        <figure class="submit-figure">
          ${thumb(sub, "trap", "tone-lime")}
          <figcaption>${esc(sub.imageCaption)}</figcaption>
        </figure>
        ${sub.image2 ? `<figure class="submit-figure">
          ${thumb({ image: sub.image2 }, "trap", "tone-lime")}
          <figcaption>${esc(sub.image2Caption || "")}</figcaption>
        </figure>` : ""}
      </div>
      <div class="submit-body">
        <h3>${esc(sub.title)}</h3>
        <ol class="submit-steps">${sub.steps.map(st => `<li>${esc(st)}</li>`).join("")}</ol>
        <ul class="submit-notes">${sub.notes.map(nt => `<li>${esc(nt)}</li>`).join("")}</ul>
      </div>
    </div>`;
  }

  function pageMissions() {
    const ms = DATA.missions;
    return `<h1>승급 가이드</h1>
    <p class="page-desc">낚시 만렙은 50이고, 10/20/30/40레벨마다 NPC를 만나 승급평가를 통과해야 다음 레벨로 올라갈 수 있다.</p>
    <h2>낚시 해금조건</h2>
    <div class="notice"><ul>${ms.unlock.conditions.map(conditionItem).join("")}</ul></div>
    <h2>승급어 제출 방법</h2>
    ${submitGuide()}
    <h2>승급 평가</h2>
    <div class="mission-col">
    ${ms.certifications.map(c => `
    <div class="mission">
      <div class="mission-head"><span class="lv">Lv ${c.level}</span><h3>${esc(c.nameKr)}</h3></div>
      <div class="req">${lineList(c.requirement, "req-list")}</div>
      ${c.fish.length ? `<div class="mission-fish-list">${c.fish.map(missionFishCard).join("")}</div>` : ""}
      <div class="reward">보상: ${esc(c.reward)}</div>
      <div class="guide">${lineList(c.guide, "guide-list")}</div>
    </div>`).join("")}
    </div>
    <div class="notice">${lineList(ms._note, "notice-list")}</div>`;
  }

  function pageNpc() {
    const n = DATA.npc;
    const m = mapById(n.map);
    return `<h1>낚시꾼 NPC — ${esc(n.nameKr)}</h1>
    <p class="page-desc">${esc(n.nameEn)} · 커뮤니티 별명 "${esc(n.communityAlias)}"</p>
    ${n.image ? `<div class="npc-heroes">
      <figure class="npc-hero">
        <img src="${esc(n.image)}" alt="${esc(n.nameKr)} NPC 이미지" loading="eager">
        <figcaption>${esc(n.imageCaption || `${n.nameKr} 이미지`)}</figcaption>
      </figure>
      ${n.image2 ? `<figure class="npc-hero">
        <img src="${esc(n.image2)}" alt="${esc(n.nameKr)} NPC 이미지 2" loading="eager">
        <figcaption>${esc(n.image2Caption || `${n.nameKr} 이미지`)}</figcaption>
      </figure>` : ""}
    </div>` : ""}
    <dl class="kv">
      <dt>등장 맵</dt><dd><a href="#/map/${m.id}">${esc(m.nameKr)}</a> (유일)</dd>
      <dt>스폰 규칙</dt><dd>${esc(n.spawnRule)}</dd>
    </dl>
    ${n.spawnMapImage ? `<h2>스폰 위치</h2>
    <figure class="npc-spawn-map">
      <img src="${esc(n.spawnMapImage)}" alt="${esc(n.nameKr)} 스폰 위치 지도" loading="lazy">
    </figure>` : ""}
    <h2>역할</h2>
    <div class="cards-2">${n.roles.map(r => `<div class="row">${esc(r)}</div>`).join("")}</div>
    <h2>승급어 제출 방법</h2>
    ${submitGuide()}`;
  }

  function pageGear() {
    const g = DATA.gear;
    const priceText = (price, label) => price == null ? "" : `<div class="item-price"><span class="coin ${label ? "coin-technique" : ""}" aria-hidden="true"></span>${label ? `<span class="price-label">${esc(label)}</span>` : ""}<span>${Number(price).toLocaleString("ko-KR")}</span></div>`;
    const tierCard = kind => t => {
      if (kind === "line" || kind === "reel") {
        return itemCard(t, kind,
          gearTitle(t),
          null,
          [priceText(t.price), t.unlock ? `🔓 ${esc(t.unlock)}` : null, t.note ? esc(t.note) : null].filter(Boolean).join("<br>"),
          tierTone(t));
      }
      return itemCard(t, kind,
      gearTitle(t),
      null,
      [t.unlock ? `🔓 ${esc(t.unlock)}` : null, t.note ? esc(t.note) : null].filter(Boolean).join("<br>") || null,
      tierTone(t));
    };
    // 교환 해금 릴(4000D): 카드 클릭 시 교환 재료 물고기 상세 펼침
    const tradeFishDetail = x => {
      const f = fishById(x.fishId);
      if (!f) return "";
      return `<div class="mission-fish-card">
        ${fishThumb(f)}
        <div class="mission-fish-body">
          <div class="mission-fish-title">
            <a href="#/fish/${f.id}">${fishName(f, true)}</a>
            ${rarityBadge(f)}
          </div>
          <dl class="prep-list">
            <dt>출현 장소</dt><dd>${fishLocLinks(f)}</dd>
            <dt>낚싯줄</dt><dd>${esc(x.line || "정보 없음")}</dd>
            <dt>미끼/루어</dt><dd>${esc(f.bait || "정보 없음")}</dd>
          </dl>
        </div>
      </div>`;
    };
    const reelCard = t => {
      if (!t.tradeFish || !t.tradeFish.length) return tierCard("reel")(t);
      const card = itemCard(t, "reel",
        gearTitle(t),
        null,
        [priceText(t.price), t.unlock ? `🔓 ${esc(t.unlock)}` : null, t.note ? esc(t.note) : null].filter(Boolean).join("<br>"),
        tierTone(t),
        `<div class="trade-hint">🐟 교환 물고기 ${t.tradeFish.length}종 자세히 보기 <span class="trade-caret" aria-hidden="true">▾</span></div>`);
      return `<details class="trade-unlock">
        <summary>${card}</summary>
        <div class="mission-fish-list trade-fish-list">${t.tradeFish.map(tradeFishDetail).join("")}</div>
      </details>`;
    };
    const namedCard = kind => b => itemCard(b, kind,
      gearTitle(b),
      null,
      [priceText(b.price), b.note ? esc(b.note) : null].filter(Boolean).join("<br>") || null,
      tierTone(b));
    return `<h1>장비 · 미끼</h1>
    <p class="page-desc">낚싯대는 승급 보상으로 해금. 릴·낚싯줄은 클래스(등급)가 높을수록 상위 어종 대응.</p>
    <h2>낚싯대</h2>
    <div class="cards-2">${g.rods.map(r => itemCard(r, "rod", rodTitle(r),
      null,
      [priceText(r.price, r.currencyLabel), `🔓 ${esc(r.unlock)}`, r.note ? esc(r.note) : null].filter(Boolean).join("<br>"), tierTone(r))).join("")}</div>
    <h2>스피닝 릴</h2>
    <div class="cards-2">${g.reels.map(reelCard).join("")}</div>
    <h2>낚싯줄</h2>
    <div class="cards-2">${g.lines.map(tierCard("line")).join("")}</div>
    <h2>찌낚시 미끼</h2>
    <div class="cards-2">${g.floatBaits.map(namedCard("bait")).join("")}</div>
    <h2>루어</h2>
    <div class="cards-2">${g.lures.map(namedCard("lure")).join("")}</div>
    ${g.misc && g.misc.length ? `<h2>기타</h2>
    <div class="cards-2">${g.misc.map(namedCard("trap")).join("")}</div>` : ""}
    <h2>낚시 메커니즘</h2>
    <div class="cards-2">
    <div class="mission"><div class="mission-head"><h3>찌낚시</h3></div><div class="guide">${esc(g.mechanics.float)}</div></div>
    <div class="mission"><div class="mission-head"><h3>루어 낚시</h3></div><div class="guide">${esc(g.mechanics.lure)}</div></div>
    </div>
    ${g.tips && g.tips.length ? `<h2>실전 꿀팁</h2>
    <div class="tips-grid">${g.tips.map(t => `<div class="notice tip-panel">${tipList(t)}</div>`).join("")}</div>` : ""}
    <div class="notice">${esc(g._note)}</div>`;
  }

  function pageNotFound() {
    return `<h1>페이지를 찾을 수 없어요</h1><p class="page-desc"><a href="#/">홈으로 돌아가기</a></p>`;
  }

  /* ── Router ── */

  // 레이어 지도 탭: 전체는 모두 켜고, 개별 탭은 해당 낚시터 레이어만 켠다
  /* 물고기 상세 팝업 — 목록에서 물고기를 누르면 페이지 이동 없이 띄운다 */
  function openFishModal(id) {
    const f = fishById(id);
    if (!f) return false;
    closeFishModal();
    const wrap = document.createElement("div");
    wrap.className = "fish-modal";
    wrap.innerHTML = `<div class="fish-modal-backdrop" data-close></div>
      <div class="fish-modal-panel" role="dialog" aria-modal="true" aria-label="${esc(f.nameKr || f.nameEn)} 정보">
        <button type="button" class="fish-modal-close" data-close aria-label="닫기">✕</button>
        <div class="fish-modal-body">${fishDetailBody(f)}</div>
      </div>`;
    document.body.appendChild(wrap);
    document.body.classList.add("modal-open");
    wrap.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeFishModal(); });
    initMapStack();
    const closeBtn = wrap.querySelector(".fish-modal-close");
    if (closeBtn) closeBtn.focus();
    return true;
  }

  function closeFishModal() {
    document.querySelectorAll(".fish-modal").forEach(el => el.remove());
    document.body.classList.remove("modal-open");
  }

  function initMapStack() {
    document.querySelectorAll("[data-layer-map]").forEach(stack => {
      if (stack.dataset.stackBound) return;
      stack.dataset.stackBound = "1";
      const tabs = [...stack.querySelectorAll(".map-tab")];
      const layers = [...stack.querySelectorAll(".map-stack-layer")];
      tabs.forEach(tab => tab.addEventListener("click", () => {
        // 이미 선택된 탭을 다시 누르면 해제 — 맵 이미지만 남는다
        // (data-require-selection이 붙은 스택은 항상 하나가 켜져 있어야 한다)
        const canClear = !stack.hasAttribute("data-require-selection");
        const key = canClear && tab.classList.contains("active") ? null : tab.dataset.layer;
        tabs.forEach(t => {
          const on = key !== null && t === tab;
          t.classList.toggle("active", on);
          t.setAttribute("aria-selected", String(on));
        });
        layers.forEach(l => l.classList.toggle("is-on", key === "all" || (key !== null && l.dataset.layer === key)));
      }));
    });
  }

  function route() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [pathPart, queryPart] = raw.split("?");
    const params = new URLSearchParams(queryPart || "");
    const seg = pathPart.split("/").filter(Boolean);
    let html, navKey = seg[0] || "", title = "";

    if (seg.length === 0) html = pageHome();
    else if (seg[0] === "maps") { html = pageMaps(); title = "맵·낚시터"; }
    else if (seg[0] === "map" && seg[1]) {
      html = pageMapDetail(seg[1]); navKey = "maps";
      const m = mapById(seg[1]); title = m ? m.nameKr : "";
    }
    else if (seg[0] === "fish" && seg[1]) {
      html = pageFishDetail(seg[1]);
      const f = fishById(seg[1]); title = f ? (f.nameKr || f.nameEn) : "";
    }
    else if (seg[0] === "fish") { html = pageFish(params); title = "물고기 도감"; }
    else if (seg[0] === "missions") { html = pageMissions(); title = "승급 가이드"; }
    else if (seg[0] === "npc") { html = pageNpc(); title = "낚시꾼 NPC"; }
    else if (seg[0] === "gear") { html = pageGear(); title = "장비·미끼"; }
    else html = pageNotFound();

    app.innerHTML = html;
    initMapStack();
    document.title = (title ? title + " — " : "") + "낚시할사람 — 델타포스 낚시 가이드";
    document.querySelectorAll("#nav a").forEach(a => {
      const active = a.dataset.nav === navKey;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }

  // 물고기 링크는 페이지 이동 대신 팝업으로 (새 탭·수정키 클릭은 그대로 둔다)
  document.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest('a[href^="#/fish/"]');
    if (!link) return;
    const id = link.getAttribute("href").slice("#/fish/".length);
    if (openFishModal(id)) e.preventDefault();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeFishModal();
  });

  window.addEventListener("hashchange", closeFishModal);
  window.addEventListener("hashchange", route);
  route();
})();
