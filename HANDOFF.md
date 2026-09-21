# HANDOFF — 낚시할사람 (델타포스 낚시 정보 사이트, 1차 프로토타입)

> 작업 전: 이 파일과 `js/app.js`, `css/style.css`, `data/*.json`을 먼저 읽고, 수정 전에 계획을 짧게 말할 것.
> 구조를 갈아엎지 말고 현재 구조를 이어서 작업한다.

## 목표
- 모바일에서도 보기 쉬운 낚시 정보 사이트
- 흐름: 맵별 낚시터 → 포인트별 물고기 → 물고기별 필요 도구/미끼/팁
- 승급 가이드, 빨간 물고기(소장급) 스페셜 페이지, NPC 정보, 장비/미끼 정보

## 기술 구조
- 빌드 도구 없는 정적 SPA. `index.html`을 브라우저로 바로 열면 동작 (file:// 가능)
- 해시 라우팅: `#/`, `#/maps`, `#/map/:id`, `#/fish?rarity=&method=`, `#/fish/:id`, `#/missions`, `#/red`, `#/npc`, `#/gear`
- `js/app.js` — 페이지별 렌더 함수(`pageXxx`)가 HTML 문자열을 반환 → `route()`가 `#app`에 주입
- `css/style.css` — 디자인 토큰은 `:root` (핫핑크 `--accent`, 라임 `--lime`, `--radius`, `--maxw: 1400px`)
- 공통 컴포넌트(클래스)
  - `.cards-2` — 데스크톱 2열 / 760px 이하 1열 그리드
  - `.item-card` + `.thumb` — 이미지 왼쪽 + 정보 오른쪽 카드 (물고기·장비·미끼)
  - `.thumb` 톤: `tone-common` / `tone-rare` / `tone-red` / `tone-lime`

## 데이터 (원본은 data/*.json)
**수정 후 반드시 `node scripts/build-data.js` 실행** → `js/data.js` 재생성 (app.js는 data.js의 `DATA`만 읽음)

| 파일 | 내용 |
|---|---|
| `maps.json` | 맵 3개(롱보우/제로댐/AZ3) → `spots[]`(낚시터). `coord: {x, y}`(지도 위 % 좌표, 현재 전부 null), `fishIds[]` |
| `fish.json` | 물고기 27종. `rarity`(일반/희귀/소장(레드)), `method[]`, `spotIds[]`, `bait`, `tips`, `image`, `nameKrConfirmed` |
| `missions.json` | 해금 조건 + 10/20/30/40레벨 승급 평가 (`fish[].fishId`, `condition`) |
| `npc.json` | 조 리드 — 스폰 규칙, `spawnSpots[]`(좌표 미확정) |
| `gear.json` | 낚싯대/릴/낚시줄/찌미끼/루어 (각 항목 `image`) + 낚시 메커니즘 |

- 물고기↔낚시터 연결은 양방향 어디에 적어도 됨 (`spot.fishIds` 또는 `fish.spotIds`, 합쳐서 표시)
- `nameKr: null` 또는 `nameKrConfirmed: false` → 화면에 "미확인" 뱃지

### 이미지 넣는 법
- 물고기/장비: `image`에 경로 지정 (예: `"image": "img/fish/baby-shark.webp"`). null이면 종류별 플레이스홀더 표시
- 투명 배경 PNG/WebP 권장 (`object-fit: contain`으로 정사각형 안에 맞춤)
- 지도: `maps.json`의 `mapImage`. **AZ3(`img/az3.webp`)는 임시본** — 스크린샷으로 교체 예정
- 롱보우/제로댐 원본 jpg가 4MB/2MB로 큼 → 추후 리사이즈·webp 변환 권장

## 현재 상태 (2026-09-21)
- 완료: 전체 페이지 기본 구현, 다크+핑크/라임 톤, max-width 1400px, 카드 목록 2열화, 물고기·장비 카드에 이미지 슬롯(왼쪽), 물고기 상세에 큰 이미지 슬롯
- 데이터 공백: 낚시터 핀 좌표 전부 null, 대부분 어종의 출현 수역/미끼 미확정, 물고기·장비 이미지 없음

## 다음 작업
1. 맵 핀/포인트 상세 흐름 개선 — 맵 상세에서 지도(좌) + 낚시터 목록(우) 배치, 핀 클릭 → 해당 낚시터 카드 하이라이트/물고기 목록, 좌표 입력 도우미(지도 클릭 시 % 좌표 표시)
2. 빨간 물고기 페이지 — 스페셜 히어로, 준비물(대/릴/줄/루어) 요약, 확인된 위치 우선 정렬
3. 승급 가이드 — 레벨 단계 타임라인, 대상어 카드에 썸네일, 준비물 체크리스트
4. 모바일 — 헤더 nav 가로 스크롤 UX, 지도 확대/핀치
5. 데이터 보강 — 핀 좌표, 출현 수역, 이미지

## 디자인 레퍼런스 방향
블랙 배경 + 핫핑크 + 라임 포인트, 굵은 한글 타이포, 둥근 필 버튼/칩, 스티커·배지 느낌의 발랄한 이벤트 페이지 톤 (U+ 유쓰 페스티벌, 에이블리 가챠샵, Cryptoflow 다크 UI 등)
