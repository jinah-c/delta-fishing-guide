// data/*.json 수정 후 `node scripts/build-data.js` 실행하면 js/data.js가 다시 생성됨
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const read = f => JSON.parse(fs.readFileSync(path.join(root, "data", f), "utf8"));
const data = {
  maps: read("maps.json").maps,
  fish: read("fish.json").fish,
  missions: read("missions.json"),
  npc: read("npc.json").npc,
  gear: read("gear.json")
};
// 데이터 정합성 검사: 상호참조가 깨져 있으면 경고 출력 (빌드는 계속)
const spotIds = new Set(data.maps.flatMap(m => m.spots.map(s => s.id)));
const fishIds = new Set(data.fish.map(f => f.id));
const warn = msg => console.warn("[정합성]", msg);
data.fish.forEach(f => f.spotIds.forEach(id => { if (!spotIds.has(id)) warn(`fish "${f.id}" → 없는 spot "${id}"`); }));
data.maps.forEach(m => m.spots.forEach(s => s.fishIds.forEach(id => { if (!fishIds.has(id)) warn(`spot "${s.id}" → 없는 fish "${id}"`); })));
data.missions.certifications.forEach(c => c.fish.forEach(x => {
  if (!fishIds.has(x.fishId)) { warn(`Lv${c.level} 승급 → 없는 fish "${x.fishId}"`); return; }
  const f = data.fish.find(fx => fx.id === x.fishId);
  const linked = f.spotIds.length > 0 || !!f.spotNote ||
    data.maps.some(m => m.spots.some(s => s.fishIds.includes(x.fishId)));
  if (!linked) warn(`Lv${c.level} 승급어 "${x.fishId}" 출현 수역 미입력`);
}));

const out = path.join(root, "js", "data.js");
fs.writeFileSync(out, "// 자동 생성: data/*.json → js/data.js (node scripts/build-data.js)\nconst DATA = " + JSON.stringify(data, null, 2) + ";\n");
console.log("generated", out);
