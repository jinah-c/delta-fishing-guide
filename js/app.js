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

  const methodBadges = f =>
    f.method.map(m => `<span class="badge badge-method">${esc(m)}</span>`).join(" ");

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
          <dt>낚시줄</dt><dd>${esc(x.line || "정보 없음")}</dd>
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
        <div class="item-sub">${esc(f.nameEn)}</div>
        <div class="item-badges">${rarityBadge(f)} ${methodBadges(f)} <span class="badge badge-size">${esc(f.size)}</span></div>
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

  function itemCard(obj, kind, title, sub, note, tone) {
    return `<div class="item-card">
      ${thumb(obj, kind, tone)}
      <div class="item-body">
        <div class="item-title">${title}</div>
        ${sub ? `<div class="item-sub">${sub}</div>` : ""}
        ${note ? `<div class="item-meta">${note}</div>` : ""}
      </div>
    </div>`;
  }

  /* ── Pages ── */

  function pageHome() {
    const redCount = DATA.fish.filter(f => f.rarity === "레드").length;
    return `
    <div class="hero">
      <h1>델타포스 낚시 가이드</h1>
      <p>신규 낚시 콘텐츠 정리 , 맵별 낚시터부터 승급미션 물고기 정보까지 :&gt;</p>
    </div>
    <div class="quick">
      <a href="#/maps"><div class="q-title">🗺️ 맵 · 낚시터</div><div class="q-sub">낚시 가능한 맵 ${DATA.maps.length}곳, 낚시터 ${DATA.maps.reduce((n, m) => n + m.spots.length, 0)}곳</div></a>
      <a href="#/fish"><div class="q-title">🐟 물고기 도감</div><div class="q-sub">전체 ${DATA.fish.length}종 — 등급·낚시법 필터</div></a>
      <a href="#/missions"><div class="q-title">📈 승급 가이드</div><div class="q-sub">낚시 해금부터 10/20/30/40레벨 평가까지</div></a>
      <a href="#/red"><div class="q-title">🔴 빨간 물고기</div><div class="q-sub">소장급 ${redCount}종 — 잡는 곳과 준비물</div></a>
      <a href="#/npc"><div class="q-title">🎣 낚시꾼 NPC</div><div class="q-sub">조 리드(조아재) 스폰 규칙과 역할</div></a>
      <a href="#/gear"><div class="q-title">🧰 장비 · 미끼</div><div class="q-sub">낚싯대·릴·낚시줄·미끼·루어 정리</div></a>
    </div>
    <h2>시작하기 요약</h2>
    <div class="notice"><ul>${DATA.missions.unlock.conditions.map(condition => `<li>${esc(condition)}</li>`).join("")}</ul></div>`;
  }

  function pageMaps() {
    return `<h1>맵 · 낚시터</h1>
    <p class="page-desc">낚시는 오퍼레이션 맵 3곳에서만 가능. 맵을 누르면 낚시터와 포인트별 물고기를 볼 수 있어요.</p>
    <div class="grid">
      ${DATA.maps.map(m => `
      <a class="card" href="#/map/${m.id}">
        <img class="card-img" src="${esc(m.mapImage)}" alt="${esc(m.nameKr)} 지도" loading="lazy">
        <div class="card-body">
          <div class="card-title">${esc(m.nameKr)} <span class="badge badge-easy">${esc(m.difficulty)}</span></div>
          <div class="card-sub">${esc(m.nameEn)} · ${esc(m.nameCn)}</div>
          <div class="card-note">${esc(m.note)}</div>
        </div>
      </a>`).join("")}
    </div>`;
  }

  function pageMapDetail(id) {
    const m = mapById(id);
    if (!m) return pageNotFound();
    const pins = m.spots.filter(s => s.coord);
    return `<a class="back" href="#/maps">← 맵 목록</a>
    <div class="detail-head"><h1>${esc(m.nameKr)}</h1><span class="en">${esc(m.nameEn)} · ${esc(m.nameCn)}</span><span class="badge badge-easy">${esc(m.difficulty)}</span></div>
    <p class="page-desc">${esc(m.note)}</p>
    <div class="map-wrap">
      <img src="${esc(m.mapImage)}" alt="${esc(m.nameKr)} 지도">
      ${pins.map(s => `
        <span class="pin" style="left:${s.coord.x}%;top:${s.coord.y}%" title="${esc(s.nameKr)}">📍</span>
        <span class="pin-label" style="left:${s.coord.x}%;top:${s.coord.y}%">${esc(s.nameKr)}</span>`).join("")}
    </div>
    ${pins.length === 0 ? `<div class="notice">지도 위 핀 좌표는 아직 준비 중이에요. 아래 낚시터 설명의 위치 안내를 참고해 주세요.</div>` : ""}
    ${m.fishMapImage ? `
    <h2>물고기 분포도</h2>
    <div class="map-wrap fish-map">
      <img src="${esc(m.fishMapImage)}" alt="${esc(m.nameKr)} 물고기 분포도" loading="lazy">
    </div>
    <p class="img-source">출처: <a href="${esc(m.fishMapSource.url)}" target="_blank" rel="noopener noreferrer">${esc(m.fishMapSource.label)}</a></p>` : ""}
    <h2>낚시터 ${m.spots.length}곳</h2>
    <div class="cards-2">
    ${m.spots.map(s => {
      const fishes = fishInSpot(s.id);
      return `<div class="spot-card">
        <h3>${esc(s.nameKr)} ${s.nameConfirmed ? "" : '<span class="badge badge-unconfirmed">명칭 미확인</span>'}</h3>
        <div class="card-sub">${esc(s.nameEn)} · ${esc(s.nameCn)}</div>
        <div class="desc">${esc(s.description)}</div>
        <div class="fish-links">
          ${fishes.length
            ? fishes.map(f => `<a href="#/fish/${f.id}">${fishName(f)} ${rarityBadge(f)}</a>`).join("")
            : '<span class="none">확인된 주요 어종 정보 없음 (일반 어종 출현)</span>'}
        </div>
      </div>`;
    }).join("")}
    </div>`;
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
    const methodChipClass = { "전체": "chip-all", "찌낚시": "chip-float", "루어": "chip-lure" };
    return `<h1>물고기 도감</h1>
    <p class="page-desc">전체 ${DATA.fish.length}종. 물고기를 누르면 잡는 곳·낚시법·미끼를 볼 수 있어요.</p>
    <div class="filters filter-group">
      <span class="filter-label">등급</span>
      ${rarities.map(r => `<a class="chip ${rarityChipClass[r]} ${r === rarity ? "active" : ""}" ${r === rarity ? 'aria-current="true"' : ""} href="${link(r, method)}">${esc(r)}</a>`).join("")}
    </div>
    <div class="filters filter-group">
      <span class="filter-label">낚시법</span>
      ${methods.map(m => `<a class="chip ${methodChipClass[m]} ${m === method ? "active" : ""}" ${m === method ? 'aria-current="true"' : ""} href="${link(rarity, m)}">${esc(m)}</a>`).join("")}
    </div>
    ${list.length ? `<div class="cards-2">${list.map(fishCard).join("")}</div>` : "<p>조건에 맞는 물고기가 없어요.</p>"}`;
  }

  function pageFishDetail(id) {
    const f = fishById(id);
    if (!f) return pageNotFound();
    const locs = fishSpots(f);
    const certs = DATA.missions.certifications.filter(c => c.fish.some(x => x.fishId === f.id));
    return `<a class="back" href="#/fish">← 도감으로</a>
    <div class="fish-hero">
    ${fishThumb(f, "lg")}
    <div class="fish-hero-body">
    <div class="detail-head"><h1>${fishName(f, true)}</h1><span class="en">${esc(f.nameEn)}</span></div>
    <p>${rarityBadge(f)} ${methodBadges(f)} <span class="badge badge-size">${esc(f.size)}</span></p>
    <dl class="kv">
      <dt>잡는 곳</dt>
      <dd>${locs.length
        ? locs.map(l => `<a href="#/map/${l.map.id}">${esc(l.map.nameKr)} — ${esc(l.spot.nameKr)}</a>`).join("<br>")
        : (f.spotNote ? esc(f.spotNote) : "출현 수역 미확정 (인게임 도감 확인 필요)")}</dd>
      <dt>낚시법</dt><dd>${f.method.map(esc).join(", ")}</dd>
      <dt>미끼/루어</dt><dd>${f.bait ? esc(f.bait) : "정보 없음"}</dd>
      ${f.tips ? `<dt>팁</dt><dd>${tipList(f.tips)}</dd>` : ""}
      ${certs.length ? `<dt>승급 연관</dt><dd>${certs.map(c => `<a href="#/missions">레벨 ${c.level} ${esc(c.nameKr)}</a>`).join("<br>")}</dd>` : ""}
    </dl>
    </div>
    </div>
    ${locs.length ? locs.map(l => `
      <h2>${esc(l.map.nameKr)} 위치</h2>
      <div class="map-wrap">
        <img src="${esc(l.map.mapImage)}" alt="${esc(l.map.nameKr)} 지도" loading="lazy">
        ${l.spot.coord ? `<span class="pin" style="left:${l.spot.coord.x}%;top:${l.spot.coord.y}%">📍</span><span class="pin-label" style="left:${l.spot.coord.x}%;top:${l.spot.coord.y}%">${esc(l.spot.nameKr)}</span>` : ""}
      </div>
      ${l.spot.coord ? "" : `<div class="notice">정확한 핀 좌표는 준비 중 — "${esc(l.spot.nameKr)}" 수역: ${esc(l.spot.description)}</div>`}
    `).join("") : ""}`;
  }

  /* 승급어 제출 방법 (조 리드 옆 통발) — 승급 가이드·NPC 페이지 공용 */
  function submitGuide() {
    const sub = DATA.missions.submission;
    return `<div class="submit-guide">
      <figure class="submit-figure">
        ${thumb(sub, "trap", "tone-lime")}
        <figcaption>${esc(sub.imageCaption)}</figcaption>
      </figure>
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
    <p class="page-desc">낚시 레벨 상한 50. 10/20/30/40레벨마다 조 리드에게 승급 평가를 통과해야 다음 구간 진행 가능.</p>
    <h2>낚시 해금조건</h2>
    <div class="notice"><ul>${ms.unlock.conditions.map(condition => `<li>${esc(condition)}</li>`).join("")}</ul></div>
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

  function pageRed() {
    const reds = DATA.fish.filter(f => f.rarity === "레드");
    return `<h1>빨간 물고기 (소장급)</h1>
    <p class="page-desc">가장 희귀한 소장급 ${reds.length}종. 대부분 루어 낚시로만 잡을 수 있어요.</p>
    <div class="cards-2">${reds.map(fishCard).join("")}</div>
    <div class="notice">출현 수역·추천 루어는 만렙 유저 공략 영상 기준 — 인게임 표기·한국어 명칭은 확인되는 대로 계속 보강 예정.</div>`;
  }

  function pageNpc() {
    const n = DATA.npc;
    const m = mapById(n.map);
    return `<h1>낚시꾼 NPC — ${esc(n.nameKr)}</h1>
    <p class="page-desc">${esc(n.nameEn)} · 커뮤니티 별명 "${esc(n.communityAlias)}"</p>
    ${n.image ? `<figure class="npc-hero">
      <img src="${esc(n.image)}" alt="${esc(n.nameKr)} NPC 이미지" loading="eager">
      <figcaption>${esc(n.imageCaption || `${n.nameKr} 이미지`)}</figcaption>
    </figure>` : ""}
    <dl class="kv">
      <dt>등장 맵</dt><dd><a href="#/map/${m.id}">${esc(m.nameKr)}</a> (유일)</dd>
      <dt>스폰 규칙</dt><dd>${esc(n.spawnRule)}</dd>
    </dl>
    <h2>역할</h2>
    <div class="cards-2">${n.roles.map(r => `<div class="row">${esc(r)}</div>`).join("")}</div>
    <h2>승급어 제출 방법</h2>
    ${submitGuide()}
    <div class="notice">스폰 3곳의 정확한 위치는 확인 중 — 확보되는 대로 ${esc(m.nameKr)} 지도에 핀으로 표시할 예정이에요.</div>`;
  }

  function pageGear() {
    const g = DATA.gear;
    const priceText = (price, label) => price == null ? "" : `<div class="item-price"><span class="coin ${label ? "coin-technique" : ""}" aria-hidden="true"></span>${label ? `<span class="price-label">${esc(label)}</span>` : ""}<span>${Number(price).toLocaleString("ko-KR")}</span></div>`;
    const tierCard = kind => t => {
      if (kind === "line" || kind === "reel") {
        return itemCard(t, kind,
          gearTitle(t),
          t.nameKr ? esc(t.nameEn) : null,
          [priceText(t.price), t.unlock ? `🔓 ${esc(t.unlock)}` : null, t.note ? esc(t.note) : null].filter(Boolean).join("<br>"),
          tierTone(t));
      }
      return itemCard(t, kind,
      gearTitle(t),
      t.nameKr ? esc(t.nameKr) : null,
      [t.unlock ? `🔓 ${esc(t.unlock)}` : null, t.note ? esc(t.note) : null].filter(Boolean).join("<br>") || null,
      tierTone(t));
    };
    const namedCard = kind => b => itemCard(b, kind,
      gearTitle(b),
      b.nameKr ? esc(b.nameEn) : null,
      [priceText(b.price), b.note ? esc(b.note) : null].filter(Boolean).join("<br>") || null,
      tierTone(b));
    return `<h1>장비 · 미끼</h1>
    <p class="page-desc">낚싯대는 승급 보상으로 해금. 릴·낚시줄은 클래스(등급)가 높을수록 상위 어종 대응.</p>
    <h2>낚싯대</h2>
    <div class="cards-2">${g.rods.map(r => itemCard(r, "rod", rodTitle(r),
      r.nameEn ? esc(r.nameEn) : null,
      [priceText(r.price, r.currencyLabel), `🔓 ${esc(r.unlock)}`, r.note ? esc(r.note) : null].filter(Boolean).join("<br>"), tierTone(r))).join("")}</div>
    <h2>스피닝 릴</h2>
    <div class="cards-2">${g.reels.map(tierCard("reel")).join("")}</div>
    <h2>낚시줄</h2>
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
    else if (seg[0] === "red") { html = pageRed(); title = "빨간 물고기"; }
    else if (seg[0] === "npc") { html = pageNpc(); title = "낚시꾼 NPC"; }
    else if (seg[0] === "gear") { html = pageGear(); title = "장비·미끼"; }
    else html = pageNotFound();

    app.innerHTML = html;
    document.title = (title ? title + " — " : "") + "낚시할사람 — 델타포스 낚시 가이드";
    document.querySelectorAll("#nav a").forEach(a => {
      const active = a.dataset.nav === navKey;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  route();
})();
