// 자동 생성: data/*.json → js/data.js (node scripts/build-data.js)
const DATA = {
  "maps": [
    {
      "id": "longbow",
      "nameKr": "롱보우",
      "nameEn": "Layali Grove",
      "nameCn": "长弓溪谷",
      "difficulty": "정규",
      "note": "낚시터 5곳으로 가장 많음. 낚시꾼 NPC(조 리드) 스폰 유일 맵. 피콕하인드(방사능 그루퍼)를 제외한 전 어종을 이 맵에서 잡을 수 있음. 낚시는 현재 정규 난이도(롱보우·AZ3·제로댐)에서만 가능.",
      "mapImage": "img/longbow.jpg",
      "fishMapImage": "img/longbow-fish-map.jpg",
      "fishMapSource": {
        "label": "X @50413836perfect",
        "url": "https://x.com/50413836perfect/status/2102337591987077193"
      },
      "spots": [
        {
          "id": "longbow-serenity-bay",
          "nameKr": "고요한 만 (세레니티 베이 · 우물낚시터)",
          "nameEn": "Grove Bay (Still Water Bay)",
          "nameCn": "溪谷静水湾",
          "nameConfirmed": true,
          "coord": null,
          "description": "맵 좌상단의 만(灣). 조 리드 스폰 지점 중 하나(집 주변). 타이거피시 유일 출현지이며, 집 주변 바닥·테이블에서 낚시줄·루어(골드 줄 포함) 필드 스폰 확인됨.",
          "fishIds": [
            "topmouth-culter",
            "saddled-bichir",
            "tigerfish"
          ]
        },
        {
          "id": "longbow-cavern",
          "nameKr": "동굴 수역",
          "nameEn": "Grove Cavern",
          "nameCn": "溪谷岩洞",
          "nameConfirmed": true,
          "coord": null,
          "description": "저장소 부두 바로 아래 동굴 수역(하모니카 소녀 위치). 플래티넘 실버 아로와나 포인트. 찌낚시 코인 파밍 효율 최상위 스팟.",
          "fishIds": [
            "platinum-silver-arowana",
            "saddled-bichir"
          ]
        },
        {
          "id": "longbow-waterway",
          "nameKr": "수로",
          "nameEn": "Grove Waterway",
          "nameCn": "溪谷水道",
          "nameConfirmed": true,
          "coord": null,
          "description": "운하(남쪽 큰 강)에서 갈라져 올라가는 좁은 지류 수로 전체. 북아프리카메기·자이언트 브라운 송어 포인트.",
          "fishIds": [
            "north-african-catfish",
            "giant-brown-trout",
            "baby-shark"
          ]
        },
        {
          "id": "longbow-canal",
          "nameKr": "운하 (아랫수역)",
          "nameEn": "Grove Canal",
          "nameCn": "溪谷运河",
          "nameConfirmed": true,
          "coord": null,
          "description": "맵 남쪽을 흐르는 넓은 강 본류. 북아프리카메기·대서양 연어·빅아이 타폰·새끼상어 포인트.",
          "fishIds": [
            "north-african-catfish",
            "baby-shark",
            "atlantic-salmon",
            "bigeye-tarpon"
          ]
        },
        {
          "id": "longbow-storage-dock",
          "nameKr": "저장소 부두",
          "nameEn": "Storage Center Dock",
          "nameCn": "储藏站码头",
          "nameConfirmed": true,
          "coord": null,
          "description": "아이언 돔(플래그십 임무) 구역 내부의 부두 수역. 사파이어 오스카(찌낚시 소장급) 포인트. 동굴과 함께 코인 파밍 추천 스팟.",
          "fishIds": [
            "sapphire-snakehead",
            "saddled-bichir"
          ]
        }
      ]
    },
    {
      "id": "zero-dam",
      "nameKr": "제로댐",
      "nameEn": "Zero Dam",
      "nameCn": "零号大坝",
      "difficulty": "정규",
      "note": "낚시터 1곳.",
      "mapImage": "img/zero-dam.jpg",
      "fishMapImage": "img/zero-dam-fish-map.jpg",
      "fishMapSource": {
        "label": "X @50413836perfect",
        "url": "https://x.com/50413836perfect/status/2102337591987077193"
      },
      "spots": [
        {
          "id": "zerodam-riverbank",
          "nameKr": "댐 강변",
          "nameEn": "Dam Riverbank",
          "nameCn": "大坝河滩",
          "nameConfirmed": false,
          "coord": null,
          "description": "댐 하류 강변 수역. 제로댐의 유일한 낚시터. 백조어(톱마우스 컬터)·자이언트 브라운 송어 포인트.",
          "fishIds": [
            "topmouth-culter",
            "saddled-bichir",
            "giant-brown-trout",
            "baby-shark"
          ]
        }
      ]
    },
    {
      "id": "az3",
      "nameKr": "AZ3",
      "nameEn": "AZ3",
      "nameCn": "AZ3(核电站)",
      "difficulty": "정규",
      "note": "낚시터 2곳. 40레벨 승급 대상어(피콕하인드) 출현 맵. (지도 이미지는 임시본 — 마커 아이콘 포함, 교체 필요)",
      "mapImage": "img/az3.webp",
      "fishMapImage": "img/az3-fish-map.png",
      "fishMapSource": {
        "label": "X @50413836perfect",
        "url": "https://x.com/50413836perfect/status/2102337591987077193"
      },
      "spots": [
        {
          "id": "az3-offshore",
          "nameKr": "외해",
          "nameEn": "Nuclear Plant Offshore Waters",
          "nameCn": "核电站外海",
          "nameConfirmed": false,
          "coord": null,
          "description": "원전 앞바다(방사능 오염수). 피콕하인드(방사능 그루퍼) 유일 출현지 + 대서양 연어·빅아이 타폰·새끼상어 포인트.",
          "fishIds": [
            "radioactive-grouper",
            "baby-shark",
            "atlantic-salmon",
            "bigeye-tarpon"
          ]
        },
        {
          "id": "az3-waterway",
          "nameKr": "수로",
          "nameEn": "Nuclear Plant Waterway",
          "nameCn": "核电站水道",
          "nameConfirmed": false,
          "coord": null,
          "description": "원전 구역의 오염되지 않은 담수 수로.",
          "fishIds": []
        }
      ]
    }
  ],
  "fish": [
    {
      "id": "tilapia",
      "image": "img/fish/tilapia.png?v=fish-cutout",
      "nameEn": "Tilapia",
      "nameKr": "틸라피아",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "중형",
      "method": [
        "찌낚시",
        "루어"
      ],
      "spotIds": [],
      "spotNote": "거의 모든 수역 (전 맵 공통 출현)",
      "bait": null,
      "tips": null
    },
    {
      "id": "sharpbelly",
      "image": "img/fish/sharpbelly.png?v=fish-cutout",
      "nameEn": "Sharpbelly",
      "nameKr": "피라미",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "spotNote": "거의 모든 수역 (전 맵 공통 출현)",
      "bait": null,
      "tips": null
    },
    {
      "id": "banded-barb",
      "image": "img/fish/banded-barb.png?v=fish-cutout",
      "nameEn": "Banded Barb",
      "nameKr": "줄무늬 물고기",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "초소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "spotNote": "거의 모든 수역 (전 맵 공통 출현)",
      "bait": null,
      "tips": null
    },
    {
      "id": "redtail",
      "image": "img/fish/redtail.png?v=fish-cutout",
      "nameEn": "Redtail",
      "nameKr": "레드테일캣피시",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "중형",
      "method": [
        "찌낚시",
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "bighead-carp",
      "image": "img/fish/bighead-carp.png?v=fish-cutout",
      "nameEn": "Bighead Carp",
      "nameKr": "대두어",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "대형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "black-carp",
      "image": "img/fish/black-carp.png?v=fish-cutout",
      "nameEn": "Black Carp",
      "nameKr": "청어",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "striped-bass",
      "image": "img/fish/striped-bass.png?v=fish-cutout",
      "nameEn": "Striped Bass",
      "nameKr": "줄무늬농어",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "mullet",
      "image": "img/fish/mullet.png?v=fish-cutout",
      "nameEn": "Mullet",
      "nameKr": "숭어",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "중형",
      "method": [
        "찌낚시",
        "루어"
      ],
      "spotIds": [],
      "bait": "일반 미끼 찌낚시 권장 (루어로도 가능)",
      "tips": "20레벨 승급 제출 대상 (1.5kg 초과 개체). 여러 수역에 폭넓게 출현 — 찌낚시로 큰 개체를 노리는 게 편함."
    },
    {
      "id": "zander",
      "image": "img/fish/zander.png?v=fish-cutout",
      "nameEn": "Zander",
      "nameKr": "파이크퍼치(잰더)",
      "nameKrConfirmed": true,
      "rarity": "일반",
      "size": "중형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": "그린 스피너 2종 또는 정밀 포식 루어",
      "tips": "20레벨 승급 제출 대상 (2.5kg 초과 개체). 루어 전용이며 숭어보다 출현 수역이 적음."
    },
    {
      "id": "ruby-cichlid",
      "image": "img/fish/ruby-cichlid.png?v=fish-cutout",
      "nameEn": "Ruby Cichlid",
      "nameKr": "루비피시",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "shortnose-bichir",
      "image": "img/fish/shortnose-bichir.png?v=fish-cutout",
      "nameEn": "Shortnose Bichir",
      "nameKr": "숏노즈 폴립테루스",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "소형",
      "method": [
        "찌낚시",
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "longnose-elephantfish",
      "image": "img/fish/longnose-elephantfish.png?v=fish-cutout",
      "nameEn": "Longnose Elephantfish",
      "nameKr": "엘리펀트노즈피시",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "topmouth-culter",
      "image": "img/fish/topmouth-culter.png?v=fish-cutout",
      "nameEn": "Topmouth Culter",
      "nameKr": "백조어(톱마우스 컬터)",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-serenity-bay",
        "zerodam-riverbank"
      ],
      "bait": "고대비 자극 스푼 / 정밀 포식 루어 / 고빈도 테일 웜",
      "tips": "30레벨 승급 제출 대상. 그로브 베이(우물낚시터)·댐 강변 2곳에서만 출현. 블루·퍼플 등급 모두 제출 인정."
    },
    {
      "id": "giraffe-catfish",
      "image": "img/fish/giraffe-catfish.png?v=fish-cutout",
      "nameEn": "Giraffe Catfish",
      "nameKr": "지라프캣피시",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "중형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "saddled-bichir",
      "image": "img/fish/saddled-bichir.png?v=fish-cutout",
      "nameEn": "Ansorge's Bichir (Saddled Bichir)",
      "nameKr": "엔드리케리 폴립테루스",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "중형",
      "method": [
        "찌낚시",
        "루어"
      ],
      "spotIds": [
        "longbow-serenity-bay",
        "longbow-cavern",
        "longbow-storage-dock",
        "zerodam-riverbank"
      ],
      "bait": "찌낚시·루어 모두 가능 — 편한 방식으로",
      "tips": "30레벨 승급 제출 대상(컬터 제출 후 순차 요구). 베이·동굴·부두·댐 등 널리 출현. 일부 가이드의 '엔들리허 비커' 표기는 오역으로 알려짐."
    },
    {
      "id": "mirror-carp",
      "image": null,
      "nameEn": "Mirror Carp",
      "nameKr": "미러 카프(거울잉어)",
      "nameKrConfirmed": false,
      "rarity": "희귀",
      "size": "중형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "pike",
      "image": "img/fish/pike.png?v=fish-cutout",
      "nameEn": "Pike",
      "nameKr": "강꼬치고기(파이크)",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "african-butterflyfish",
      "image": "img/fish/african-butterflyfish.png?v=fish-cutout",
      "nameEn": "African Butterflyfish",
      "nameKr": "아프리카나비고기",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "초소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "north-african-catfish",
      "image": "img/fish/north-african-catfish.png?v=fish-cutout",
      "nameEn": "North African Catfish",
      "nameKr": "북아프리카메기",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-canal",
        "longbow-waterway"
      ],
      "bait": "심층 탐지 루어(딥워터 프로브) 권장, 딥워터 다이버도 가능 — 깊이 들어가는 루어가 유리",
      "tips": "40레벨 승급 제출 대상(1번째). 그로브 수로·운하에서만 출현. 퍼플·골드 등급 모두 제출 인정."
    },
    {
      "id": "radioactive-grouper",
      "image": "img/fish/radioactive-grouper.png?v=fish-cutout",
      "nameEn": "Radioactive Grouper",
      "nameKr": "피콕하인드(방사능 그루퍼)",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "az3-offshore"
      ],
      "bait": "심해 대형 어류 진동 루어 또는 형광 진동 스푼",
      "tips": "40레벨 승급 제출 대상(2번째). AZ3 외해 전용 — 롱보우에서 못 잡는 유일한 승급어. 2x3 크기, 퍼플·골드 모두 제출 인정."
    },
    {
      "id": "sapphire-snakehead",
      "image": "img/fish/sapphire-snakehead.png?v=fish-cutout",
      "nameEn": "Sapphire Snakehead",
      "nameKr": "사파이어 오스카",
      "nameKrConfirmed": true,
      "rarity": "레드",
      "size": "소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [
        "longbow-storage-dock"
      ],
      "bait": "레드 미끼 권장 (사실상 아무 미끼로나 가능)",
      "tips": "찌낚시로 잡는 유일한 소장급이자 가장 쉬운 레드. 저장소 부두(아이언 돔 구역)에서 찌낚시."
    },
    {
      "id": "platinum-silver-arowana",
      "image": "img/fish/platinum-silver-arowana.png?v=dex2",
      "nameEn": "Platinum Silver Arowana",
      "nameKr": "플래티넘 실버 아로와나",
      "nameKrConfirmed": false,
      "rarity": "레드",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-cavern"
      ],
      "bait": "루어 (동굴 근거리 캐스팅)",
      "tips": "그로브 동굴 전용. 첨부 도감 기준 최장 68.34cm·최고 2.8kg 기록 확인. 좁은 근거리 수역이라 루어 컨트롤이 까다로운 편."
    },
    {
      "id": "giant-brown-trout",
      "image": "img/fish/giant-brown-trout.png?v=red3",
      "nameEn": "Giant Brown Trout",
      "nameKr": "자이언트 브라운 송어",
      "nameKrConfirmed": false,
      "rarity": "레드",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-waterway",
        "zerodam-riverbank"
      ],
      "bait": "심해 대형 어류 진동 루어 / 정밀 포식 루어",
      "tips": "그로브 수로·댐 강변 양쪽에서 포획 사례 확인. 근거리 수로 파이팅이 어려운 편. 4000D 헤비 드래그 릴 해금 트레이드 요구 무게: 4.5kg."
    },
    {
      "id": "baby-shark",
      "image": "img/fish/baby-shark.png?v=dex2",
      "nameEn": "Baby Shark",
      "nameKr": "새끼상어",
      "nameKrConfirmed": true,
      "rarity": "레드",
      "rarityAlt": "골드",
      "size": "거대",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-canal",
        "longbow-waterway",
        "zerodam-riverbank",
        "az3-offshore"
      ],
      "bait": "심해 대형 어류 진동 루어 / 스틸볼 사운드 루어",
      "tips": "40레벨 승급 제출 대상(3번째) — 레드가 아닌 노랑(골드) 등급 제출도 인정. 도감 기준 그로브 수로·운하·댐 강변·AZ3 외해 + 미확인 수역 1곳 출현. 30kg급까지 확인되는 강한 파이팅."
    },
    {
      "id": "atlantic-salmon",
      "image": "img/fish/atlantic-salmon.png?v=red3",
      "nameEn": "Atlantic Salmon",
      "nameKr": "대서양 연어",
      "nameKrConfirmed": false,
      "rarity": "레드",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-canal",
        "az3-offshore"
      ],
      "bait": "골드 컴피티션 루어 / 고빈도 테일 웜",
      "tips": "최고 난도로 꼽히는 레드. 노리다 보면 새끼상어·타폰이 대신 걸리는 일이 잦음. 깊고 먼 포인트 위주. 4000D 헤비 드래그 릴 해금 트레이드 요구 무게: 15kg."
    },
    {
      "id": "tigerfish",
      "image": "img/fish/tigerfish.png?v=red3",
      "nameEn": "Tigerfish",
      "nameKr": "타이거피시",
      "nameKrConfirmed": false,
      "rarity": "레드",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-serenity-bay"
      ],
      "bait": "스틸볼 사운드 루어(실전 추천) / 영역 자극 루어(인게임 추천) / 골드 루어",
      "tips": "그로브 베이(우물낚시터) 유일 출현(조 리드 집 근처, 맵 좌상단). 줄을 멀리 끌지 않는 대신 순간 장력이 급상승하는 타입 — 장력 레드존 주의. 4000D 헤비 드래그 릴 해금 트레이드 요구 무게: 6kg."
    },
    {
      "id": "bigeye-tarpon",
      "image": "img/fish/bigeye-tarpon.png?v=crate1",
      "nameEn": "Bigeye Tarpon (Indo-Pacific Tarpon)",
      "nameKr": "빅아이 타폰",
      "nameKrConfirmed": false,
      "rarity": "레드",
      "size": "거대",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-canal",
        "az3-offshore"
      ],
      "bait": "골드 컴피티션 루어 / 심층 탐지 루어 (공식 추천 미끼 없음)",
      "tips": "2x4 초대형 소장급. 포획 시 전용 배지 획득. 운하·AZ3 외해에서 출현. 첨부 상자 미리보기에서 임시 이미지를 추출했으며, 고화질 도감 컷 확보 시 교체 예정."
    }
  ],
  "missions": {
    "_note": [
      "낚시 최고 레벨 50",
      "10레벨마다 경험치 잠김 — 조 리드에게 승급 평가를 통과해야 다음 경험치를 얻을 수 있음",
      "어종 등급 기준 경험치 (회색 40 / 그린 45 / 블루 50, 근사치) — 좋은 물고기 << 많은 물고기",
      "도감은 잡는 즉시 획득되므로 가지고 탈출하지 않아도 됨",
      "레벨 올리기는 찌낚시가 가장 빠르고, 루어 낚시는 30레벨 이후 권장"
    ],
    "unlock": {
      "conditions": [
        "계정(오퍼레이션) 레벨 17 달성",
        "롱보우(정규)에서 낚시꾼 NPC 조 리드와 대화 → 'GTI 우편주소 안 바뀐 거 맞냐'고 묻는 시점까지 대화 → 수락 → 매치 종료 후(탈출 무관) 우편으로 첫 낚싯대·미끼 지급",
        "현재 3맵 : 롱보우 ·. AZ3 ·. 제로댐 맵에서 낚시가능"
      ]
    },
    "submission": {
      "title": "인벤토리로 건네주기 X — 조 리드 옆 통발에 넣어서 제출",
      "image": "img/missions/submission-trap.png?v=trap2",
      "imageCaption": "조 리드 주변에 놓인 통발",
      "steps": [
        "제출할 물고기를 가방에 넣은 채로 롱보우(정규)에 들어간다 — 같은 매치에서 잡은 물고기도, 창고에 보관해 둔 물고기도 제출 가능",
        "조 리드를 찾아간다 (한 매치에 롱보우 낚시터 3곳 중 1곳에 랜덤 스폰)",
        "조 리드 주변에 놓인 통발에 다가가 열고, 가방에 있는 제출용 물고기를 통발 안으로 옮긴다",
        "통발에 물고기를 넣은 상태로 조 리드와 대화 → '물고기 제출'을 선택하면 평가가 진행된다"
      ],
      "notes": [
        "조 리드에게 인벤토리로 직접 건네주는 방식이 아님 — 반드시 통발에 먼저 넣어야 제출이 됨",
        "20레벨 평가는 기준 무게를 넘는 개체만 인정 (숭어 1.5kg 초과 / 파이크퍼치 2.5kg 초과) — 무게 미달 개체를 넣으면 통과되지 않음",
        "30·40레벨 평가는 순차 제출 — 앞 물고기를 제출해야 다음 물고기가 요구됨",
        "누군가 조 리드를 죽이면 그 매치에서는 다시 나오지 않으므로 제출은 다음 매치에서 진행"
      ]
    },
    "certifications": [
      {
        "level": 10,
        "nameKr": "입문 평가",
        "fish": [],
        "requirement": "조 리드와 대화 후 입문 평가 진행 (제출 어종 없음)",
        "reward": "파이버글래스 루어 낚싯대",
        "guide": "찌낚시로 10레벨까지 올린 뒤 롱보우에서 조 리드를 찾는다."
      },
      {
        "level": 20,
        "nameKr": "무게 평가",
        "fish": [
          {
            "fishId": "mullet",
            "condition": "1.5kg 초과",
            "rod": "입문용 찌낚싯대 권장 (루어도 가능)",
            "line": "기본~25 lb 이상",
            "bait": "일반 미끼 찌낚시 권장",
            "note": "큰 개체가 필요하므로 무게 미달이면 다시 잡아야 함"
          },
          {
            "fishId": "zander",
            "condition": "2.5kg 초과",
            "rod": "GFRP 루어 낚싯대 이상",
            "line": "25 lb 이상 권장",
            "bait": "그린 스피너 2종 또는 정밀 포식 루어",
            "note": "루어 전용. 숭어보다 출현 수역이 적어 무게 초과 개체를 챙겨둘 것"
          }
        ],
        "requirement": [
          "기준 무게를 넘는 숭어·파이크퍼치(잰더) 각 1마리 제출",
          "조 리드 옆 통발에 물고기를 넣은 뒤 대화 → '물고기 제출'"
        ],
        "reward": "금속 루어 낚싯대",
        "guide": "숭어는 여러 수역에서 찌낚시(일반 미끼)로도 잡히고, 파이크퍼치(잰더)는 루어 전용(그린 스피너 2종·정밀 포식 루어). 무게 미달이면 다시 잡아야 하므로 큰 개체 위주로."
      },
      {
        "level": 30,
        "nameKr": "어종 평가",
        "fish": [
          {
            "fishId": "topmouth-culter",
            "condition": "블루·퍼플 인정",
            "rod": "금속 루어 낚싯대 이상",
            "line": "40 lb 이상 권장",
            "bait": "고대비 자극 스푼 / 정밀 포식 루어 / 고빈도 테일 웜",
            "note": "그로브 베이(우물낚시터)·댐 강변 2곳에서만 출현"
          },
          {
            "fishId": "saddled-bichir",
            "condition": null,
            "rod": "금속 루어 낚싯대 이상 또는 찌낚싯대",
            "line": "40 lb 이상 권장",
            "bait": "찌낚시·루어 모두 가능",
            "note": "백조어 제출 후 순차 요구. 미리 잡아둔 개체도 제출 가능"
          }
        ],
        "requirement": "백조어(톱마우스 컬터) 제출 → 이어서 엔드리케리 폴립테루스 제출 (순차 요구)",
        "reward": "하이카본 루어 낚싯대",
        "guide": [
          "백조어(컬터)는 그로브 베이(우물낚시터)·댐 강변 2곳에서만 출현",
          "고대비 자극 스푼·정밀 포식 루어·고빈도 테일 웜 미끼 추천",
          "엔드리케리 폴립테루스는 베이·동굴·부두·댐 등 널리 출현",
          "찌·루어 무관. 미리 잡아둔 개체 제출도 인정."
        ]
      },
      {
        "level": 40,
        "nameKr": "최종 평가 (2단계)",
        "fish": [
          {
            "fishId": "north-african-catfish",
            "condition": "퍼플·골드 인정",
            "rod": "하이카본 루어 낚싯대 권장",
            "line": "퍼플 이상 낚시줄 권장",
            "bait": "심층 탐지 루어(딥워터 프로브) / 딥워터 다이버",
            "note": "40레벨 최종 평가 1번째 제출어"
          },
          {
            "fishId": "radioactive-grouper",
            "condition": "퍼플·골드 인정",
            "rod": "하이카본 루어 낚싯대 권장",
            "line": "퍼플~골드 낚시줄 권장",
            "bait": "심해 대형 어류 진동 루어 / 형광 진동 스푼",
            "note": "AZ3 외해 전용. 롱보우에서는 잡히지 않음"
          },
          {
            "fishId": "baby-shark",
            "condition": null,
            "rod": "하이카본 루어 낚싯대 권장",
            "line": "골드 낚시줄 권장",
            "bait": "심해 대형 어류 진동 루어 / 스틸볼 사운드 루어",
            "note": "강한 파이팅. 줄을 40m 이상 끌고 나갈 수 있어 릴·줄 세팅 중요"
          }
        ],
        "requirement": "북아프리카메기 → 피콕하인드(방사능 그루퍼) → 새끼상어 순차 제출 (전부 루어 전용)",
        "reward": "레벨 50 구간 해금 + 전 요원 '낚시꾼의 노래' 음성 대사",
        "guide": [
          "북아프리카메기는 그로브 수로·운하에서 출현",
          "심층 탐지 루어(딥워터 프로브)·딥워터 다이버 미끼 추천",
          "피콕하인드(방사능 그루퍼)는 AZ3 외해 전용",
          "심해 대형 어류 진동 루어·형광 진동 스푼 미끼 추천",
          "새끼상어는 그로브·제로댐·AZ3 등 광범위 출현",
          "심해 대형 어류 진동 루어·스틸볼 사운드 루어 미끼 추천",
          "좋은 장비일수록 조우율이 올라가므로 세팅을 갖추고 도전."
        ]
      }
    ]
  },
  "npc": {
    "id": "joe-reed",
    "nameKr": "조 리드",
    "nameEn": "Joe Reed",
    "communityAlias": "조아재",
    "map": "longbow",
    "image": "img/npc/joe-reed.png?v=npc2",
    "imageCaption": "롱보우 낚시터에서 만나는 조 리드",
    "imageSource": "인게임 캡처",
    "spawnRule": "한 매치에 롱보우(정규) 낚시터 3곳 중 1곳에 랜덤 스폰. 그로브 베이(고요한 만 · 우물낚시터) 집 주변이 스폰 지점 중 하나로 확인됨. 누군가 NPC를 죽이면 그 매치에서는 더 이상 등장하지 않음.",
    "spawnSpots": [
      {
        "spotId": "longbow-serenity-bay",
        "coord": null,
        "note": "그로브 베이(고요한 만 · 우물낚시터) 집 주변 — 공략 영상에서 확인"
      },
      {
        "spotId": null,
        "coord": null,
        "note": ""
      },
      {
        "spotId": null,
        "coord": null,
        "note": ""
      }
    ],
    "roles": [
      "최초 낚시 해금: 'GTI 우편주소 안 바뀐 거 맞냐'고 묻는 시점까지 대화 → 스크롤 올려 '수락' → 매치 종료 후(탈출 무관) 우편으로 첫 낚싯대·미끼 지급",
      "낚시 레벨 10/20/30/40 승급 평가 진행 (미통과 시 다음 레벨 구간 진행 불가)",
      "승급어 제출 방법: 인벤토리로 건네주는 게 아니라 NPC 주변 통발에 물고기를 넣고 대화 → '물고기 제출' (자세한 순서는 승급 가이드 참고)",
      "최초 해금 시 대화를 7~8회 반복해야 퀘스트 대화가 열린다는 커뮤니티 제보 있음(검증 필요)"
    ]
  },
  "gear": {
    "_note": "명칭·가격은 인게임 상점/도감 스크린샷 기준(2026-09-21 확인). 가격 단위는 낚시 코인(입문용 찌낚싯대는 테크닉 코인). 실전 꿀팁은 만렙 유저 공략 영상 기준.",
    "rods": [
      {
        "id": "starter-float-rod",
        "image": "img/gear/starter-float-rod.png?v=rod1",
        "nameKr": "입문용 찌낚싯대",
        "nameEn": "Starter Float Rod",
        "method": "찌낚시",
        "unlock": "조 리드 입문 의뢰 완료",
        "price": 100000,
        "currencyLabel": "테크닉 코인",
        "tier": 1
      },
      {
        "id": "fiberglass-lure-rod",
        "image": "img/gear/fiberglass-lure-rod.png?v=rod1",
        "nameKr": "GFRP 루어 낚싯대",
        "nameEn": "GFRP Lure Rod",
        "method": "루어",
        "unlock": "10레벨 입문 평가 보상",
        "price": 200,
        "tier": 2
      },
      {
        "id": "metal-lure-rod",
        "image": "img/gear/metal-lure-rod.png?v=rod1",
        "nameKr": "금속 루어 낚싯대",
        "nameEn": "Metal Lure Rod",
        "method": "루어",
        "unlock": "20레벨 무게 평가 보상",
        "price": 2000,
        "tier": 3
      },
      {
        "id": "high-carbon-lure-rod",
        "image": "img/gear/high-carbon-lure-rod.png?v=rod1",
        "nameKr": "하이카본 루어 낚싯대",
        "nameEn": "High-Carbon Lure Rod",
        "method": "루어",
        "unlock": "30레벨 어종 평가 보상",
        "price": 5000,
        "note": "보유 한도 2개 · 최대 장력 200 / 장력 감소 배율 20 / 장력 회복 48 / 릴링 속도 8 / 릴링 중 스태미나 감소 30",
        "tier": 4
      }
    ],
    "reels": [
      {
        "tier": 2,
        "image": "img/gear/reel-t2.png?v=gear5",
        "nameEn": "2000H High-Speed",
        "nameKr": "2000H 고속 스피닝릴",
        "price": 5000
      },
      {
        "tier": 3,
        "image": "img/gear/reel-t3.png?v=gear5",
        "nameEn": "2500D Strong-Drag",
        "nameKr": "2500D 강력 브레이크 스피닝릴",
        "price": 10000
      },
      {
        "tier": 4,
        "image": "img/gear/reel-t4.png?v=gear5",
        "nameEn": "3000XH Ultra-High-Speed",
        "nameKr": "3000XH 초고속 스피닝릴",
        "price": 20000,
        "note": "릴링 속도 +3.5 / 릴링 시 스태미나 감소 +15 / 억제력 +10"
      },
      {
        "tier": 5,
        "image": "img/gear/reel-t5.png?v=gear5",
        "nameEn": "4000D Heavy-Drag",
        "nameKr": "4000D 헤비 드래그 스피닝릴",
        "unlock": "레드 3종 트레이드로 해금 — 대서양 연어 15kg·타이거피시 6kg·자이언트 브라운 송어 4.5kg 이상 각 1마리 교환",
        "note": "구매 제한 1 · 릴링 속도 +2.5 / 릴링 시 스태미나 감소 +45 / 억제력 +35",
        "tradeFish": [
          {
            "fishId": "atlantic-salmon",
            "weight": "15kg 이상",
            "line": "60파운드 낚싯줄 권장"
          },
          {
            "fishId": "tigerfish",
            "weight": "6kg 이상",
            "line": "60파운드 낚싯줄 권장"
          },
          {
            "fishId": "giant-brown-trout",
            "weight": "4.5kg 이상",
            "line": "60파운드 낚싯줄 권장"
          }
        ]
      }
    ],
    "lines": [
      {
        "tier": 2,
        "image": "img/gear/line-t2.png?v=line5",
        "nameEn": "Gray-Label Line",
        "nameKr": "그레이 라벨 낚싯줄",
        "price": 200
      },
      {
        "tier": 3,
        "image": "img/gear/line-t3.png?v=line5",
        "nameEn": "25 lb Line",
        "nameKr": "25파운드 낚싯줄",
        "price": 400
      },
      {
        "tier": 4,
        "image": "img/gear/line-t4.png?v=line5",
        "nameEn": "40 lb Line",
        "nameKr": "40파운드 낚싯줄",
        "price": 2300
      },
      {
        "tier": 5,
        "image": "img/gear/line-t5.png?v=line5",
        "nameEn": "60 lb Line",
        "price": 2700,
        "note": "구매 제한 · 레드 3종 사냥 기준 권장 라인",
        "nameKr": "60파운드 낚싯줄"
      },
      {
        "tier": 6,
        "image": null,
        "nameEn": "Amber Line",
        "nameKr": "앰버 낚싯줄"
      }
    ],
    "floatBaits": [
      {
        "id": "enhanced-attractant-dough",
        "image": "img/gear/enhanced-attractant-dough.png?v=bait2",
        "nameEn": "Enhanced Attractant Dough Bait",
        "nameKr": "강화 유인 미끼",
        "note": null,
        "price": 10,
        "tier": 3
      },
      {
        "id": "refined-competition-dough",
        "image": "img/gear/refined-competition-dough.png?v=bait2",
        "nameEn": "Refined Competition Dough Bait",
        "nameKr": "고급 컴피티션 루어",
        "note": "반죽 미끼(인게임 표기가 '루어')",
        "price": 15,
        "tier": 4
      },
      {
        "id": "secret-bloodworm",
        "image": "img/gear/secret-bloodworm.png?v=bait2",
        "nameEn": "Secret Bloodworm Bait",
        "nameKr": "적색 벌레 특제 미끼",
        "note": null,
        "price": 50,
        "tier": 6
      }
    ],
    "lures": [
      {
        "id": "high-contrast-spoon",
        "image": "img/gear/high-contrast-spoon.png?v=gear6",
        "nameEn": "High-Contrast Stimulus Spoon",
        "nameKr": "고대비 자극 스푼",
        "price": 13,
        "tier": 2
      },
      {
        "id": "fluorescent-vibrating-spoon",
        "image": "img/gear/fluorescent-vibrating-spoon.png?v=gear6",
        "nameEn": "Fluorescent Vibrating Spoon",
        "nameKr": "형광 진동 스푼",
        "price": 13,
        "tier": 2
      },
      {
        "id": "precision-hunting-lure",
        "image": "img/gear/precision-hunting-lure.png?v=gear6",
        "nameEn": "Precision Hunting Lure",
        "nameKr": "정밀 포식 루어",
        "price": 16,
        "tier": 3
      },
      {
        "id": "deepwater-detection-lure",
        "image": "img/gear/deepwater-detection-lure.png?v=gear6",
        "nameEn": "Deepwater Detection Lure",
        "nameKr": "심층 탐지 루어",
        "note": "북아프리카메기용 (3클)",
        "price": 17,
        "tier": 3
      },
      {
        "id": "high-freq-tail-swing",
        "image": "img/gear/high-freq-tail-swing.png?v=gear6",
        "nameEn": "High-Frequency Tail-Swing Soft Bait",
        "nameKr": "고빈도 테일 웜",
        "note": "30레벨 승급 대상어용 (보라)",
        "price": 19,
        "tier": 4
      },
      {
        "id": "territorial-stimulus-lure",
        "image": "img/gear/territorial-stimulus-lure.png?v=gear6",
        "nameEn": "Territorial Stimulus Lure",
        "nameKr": "영역 자극 루어",
        "price": 19,
        "tier": 4
      },
      {
        "id": "deep-diving-giant-vibration",
        "image": "img/gear/deep-diving-giant-vibration.png?v=lure7",
        "nameEn": "Deep-Diving Giant Vibration Lure",
        "nameKr": "심해 대형 어류 진동 루어",
        "note": "피콕하인드·새끼상어용 (5클)",
        "price": 20,
        "tier": 5
      },
      {
        "id": "steel-ball-acoustic",
        "image": "img/gear/steel-ball-acoustic.png?v=lure7",
        "nameEn": "Steel-Ball Acoustic Lure",
        "nameKr": "스틸볼 사운드 루어",
        "price": 19,
        "tier": 6
      },
      {
        "id": "gold-plated-competition",
        "image": "img/gear/gold-plated-competition.png?v=lure7",
        "nameEn": "Gold-Plated Competition Lure",
        "nameKr": "골드 컴피티션 루어",
        "price": 21,
        "tier": 5
      }
    ],
    "mechanics": {
      "float": "찌가 가라앉는 타이밍에 반응. 미끼 소모형. 레벨링 속도가 가장 빠름(잡는 즉시 경험치, 탈출·인벤토리 불필요). 동굴·저장소 부두에서 찌낚시하면 낚시 화폐(와일드 쇼어 코인) 수익도 최상.",
      "lure": "희귀·소장급 대부분은 루어 낚시로만. 장력 게이지 관리 — 물고기가 움직이는 반대 방향으로 당기고, 당기는 중 짧은 클릭으로 거리를 좁히며 장력을 낮춘다. 줄이 빨간색이 되면 즉시 손을 뗄 것(끊어짐)."
    },
    "tips": [
      "5클 4000D 헤비 드래그 릴은 상점 구매가 아니라 레드 3종 트레이드로 해금: 대서양 연어 15kg, 타이거피시 6kg, 자이언트 브라운 송어 4.5kg 이상 각 1마리. 권장 준비물: 하이카본 루어대(30레벨) + 3000XH 릴(20,000코인) + 60lb 라인(2,700코인) + 골드/레드 미끼(30/40레벨).",
      "장비 4종(낚싯대·릴·낚시줄·루어)의 등급이 전부 어획 등급과 레어 조우율에 영향 — 풀세팅이면 블루 미만이 거의 안 잡히고, 레드 조우율도 크게 오름. 레드가 안 보이면 장비부터 점검.",
      "골드 낚시줄은 상점 구매가 주당 3개 제한. 대신 그로브 베이(우물낚시터) 집 주변 바닥·테이블에서 필드 스폰을 주울 수 있음. 단, 낚시줄은 안전상자에 못 넣으니 탈출까지 지켜야 함.",
      "퍼플·골드 낚시줄 내구도는 20 — 물고기 20마리 잡으면 끝. 레이드 중 줄 교체 불가라서 끊기면 탈출 후 재정비가 답. 레드 사냥 세션이면 루어 40개쯤 챙겨가는 걸 추천.",
      "낚싯대는 2자루(하이카본 루어대 x2) 운용 추천 — 금속 루어대까지 쓰면 3자루도 가능. 릴·줄은 퍼플 이상으로.",
      "캐스팅할 때 시선을 아래로 내리면 최단거리로 던져짐 → 여유 줄이 10~15m 생겨서 대물 파이팅이 훨씬 수월. 실제로 레드 대부분이 짧은 캐스팅에서 잡혔다는 후기.",
      "레벨링은 찌낚시 연타가 최속. 루어 낚시는 30레벨 이후부터 권장."
    ],
    "misc": [
      {
        "id": "submission-trap",
        "image": "img/missions/submission-trap.png?v=trap2",
        "nameEn": "Submission Trap",
        "nameKr": "승급 제출 통발",
        "note": "조 리드 옆에 놓인 통발. 제출 물고기를 이 통발 안에 넣은 뒤 조 리드와 대화해 평가를 진행한다."
      }
    ]
  }
};
