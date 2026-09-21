// 자동 생성: data/*.json → js/data.js (node scripts/build-data.js)
const DATA = {
  "maps": [
    {
      "id": "longbow",
      "nameKr": "롱보우",
      "nameEn": "Layali Grove",
      "nameCn": "长弓溪谷",
      "difficulty": "이지",
      "note": "낚시터 5곳으로 가장 많음. 낚시꾼 NPC(조 리드)가 스폰되는 유일한 맵.",
      "mapImage": "img/longbow.jpg",
      "spots": [
        {
          "id": "longbow-serenity-bay",
          "nameKr": "고요한 만 (세레니티 베이)",
          "nameEn": "Serenity Bay",
          "nameCn": "溪谷静水湾",
          "nameConfirmed": false,
          "coord": null,
          "description": "S11에 추가된 신규 수역. 맵 좌상단 방향. 20레벨 승급 대상어(톱마우스 컬터, 엔들리허 비커) 출현 수역.",
          "fishIds": [
            "topmouth-culter",
            "saddled-bichir"
          ]
        },
        {
          "id": "longbow-cavern",
          "nameKr": "동굴 수역",
          "nameEn": "Cavern",
          "nameCn": "溪谷岩洞",
          "nameConfirmed": false,
          "coord": null,
          "description": "S11 신규 북사면 동굴(North Slope Caves) 내부 수역.",
          "fishIds": []
        },
        {
          "id": "longbow-waterway",
          "nameKr": "수로",
          "nameEn": "Waterway",
          "nameCn": "溪谷水道",
          "nameConfirmed": false,
          "coord": null,
          "description": "계곡 수로 구간.",
          "fishIds": []
        },
        {
          "id": "longbow-canal",
          "nameKr": "운하 (아랫수역)",
          "nameEn": "Canal",
          "nameCn": "溪谷运河",
          "nameConfirmed": false,
          "coord": null,
          "description": "맵 하단 수역. 커뮤니티에서 '롱보우 아랫수역'으로 불림. 30/40레벨 승급 대상어(북아프리카메기, 새끼상어) 포인트.",
          "fishIds": [
            "north-african-catfish",
            "baby-shark"
          ]
        },
        {
          "id": "longbow-storage-dock",
          "nameKr": "저장소 부두",
          "nameEn": "Storage Station Dock",
          "nameCn": "储藏站码头",
          "nameConfirmed": false,
          "coord": null,
          "description": "S11 신규 하브크 지하 부두(Haavk Underground Dock) 연계 수역.",
          "fishIds": []
        }
      ]
    },
    {
      "id": "zero-dam",
      "nameKr": "제로댐",
      "nameEn": "Zero Dam",
      "nameCn": "零号大坝",
      "difficulty": "이지",
      "note": "낚시터 1곳.",
      "mapImage": "img/zero-dam.jpg",
      "spots": [
        {
          "id": "zerodam-riverbank",
          "nameKr": "댐 강변",
          "nameEn": "Dam Riverbank",
          "nameCn": "大坝河滩",
          "nameConfirmed": false,
          "coord": null,
          "description": "댐 하류 강변 수역.",
          "fishIds": []
        }
      ]
    },
    {
      "id": "az3",
      "nameKr": "AZ3",
      "nameEn": "AZ3",
      "nameCn": "AZ3(核电站)",
      "difficulty": "이지",
      "note": "낚시터 2곳. 40레벨 승급 대상어(방사능 그루퍼) 출현 맵. (지도 이미지는 임시본 — 마커 아이콘 포함, 교체 필요)",
      "mapImage": "img/az3.webp",
      "spots": [
        {
          "id": "az3-offshore",
          "nameKr": "외해",
          "nameEn": "Offshore",
          "nameCn": "核电站外海",
          "nameConfirmed": false,
          "coord": null,
          "description": "원전 외해 수역. 방사능 그루퍼(피콕하인드) 포인트.",
          "fishIds": [
            "radioactive-grouper"
          ]
        },
        {
          "id": "az3-waterway",
          "nameKr": "수로",
          "nameEn": "Waterway",
          "nameCn": "核电站水道",
          "nameConfirmed": false,
          "coord": null,
          "description": "원전 수로 구간.",
          "fishIds": []
        }
      ]
    }
  ],
  "fish": [
    {
      "id": "tilapia",
      "image": null,
      "nameEn": "Tilapia",
      "nameKr": "틸라피아",
      "nameKrConfirmed": false,
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
      "id": "sharpbelly",
      "image": null,
      "nameEn": "Sharpbelly",
      "nameKr": null,
      "nameKrConfirmed": false,
      "rarity": "일반",
      "size": "소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "banded-barb",
      "image": null,
      "nameEn": "Banded Barb",
      "nameKr": null,
      "nameKrConfirmed": false,
      "rarity": "일반",
      "size": "초소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "redtail",
      "image": null,
      "nameEn": "Redtail",
      "nameKr": null,
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "Bighead Carp",
      "nameKr": "대두어",
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "Black Carp",
      "nameKr": "청어(흑잉어)",
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "Striped Bass",
      "nameKr": "줄무늬 배스",
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "Mullet",
      "nameKr": "숭어",
      "nameKrConfirmed": false,
      "rarity": "일반",
      "size": "중형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": "20레벨 승급 제출 대상 (1.5kg 초과 개체). 롱보우 수역에서 루어로."
    },
    {
      "id": "zander",
      "image": null,
      "nameEn": "Zander",
      "nameKr": "잰더(파이크퍼치)",
      "nameKrConfirmed": false,
      "rarity": "일반",
      "size": "중형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": "20레벨 승급 제출 대상 (2.5kg 초과 개체). 롱보우 수역에서 루어로."
    },
    {
      "id": "ruby-cichlid",
      "image": null,
      "nameEn": "Ruby Cichlid",
      "nameKr": null,
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "Shortnose Bichir",
      "nameKr": null,
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "Longnose Elephantfish",
      "nameKr": null,
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "Topmouth Culter",
      "nameKr": "톱마우스 컬터(백조어)",
      "nameKrConfirmed": false,
      "rarity": "희귀",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-serenity-bay"
      ],
      "bait": "고주파 테일스윙 소프트 베이트(보라 등급) 권장",
      "tips": "30레벨 승급 제출 대상. 세레니티 베이 수역."
    },
    {
      "id": "giraffe-catfish",
      "image": null,
      "nameEn": "Giraffe Catfish",
      "nameKr": null,
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
      "id": "saddled-bichir",
      "image": null,
      "nameEn": "Saddled Bichir (Endlicher's Bichir)",
      "nameKr": "엔들리허 비커",
      "nameKrConfirmed": false,
      "rarity": "희귀",
      "size": "중형",
      "method": [
        "찌낚시",
        "루어"
      ],
      "spotIds": [
        "longbow-serenity-bay"
      ],
      "bait": "고주파 테일스윙 소프트 베이트(보라 등급) 권장",
      "tips": "30레벨 승급 제출 대상. 세레니티 베이 수역."
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
      "image": null,
      "nameEn": "Pike",
      "nameKr": "파이크",
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "African Butterflyfish",
      "nameKr": null,
      "nameKrConfirmed": false,
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
      "image": null,
      "nameEn": "North African Catfish",
      "nameKr": "북아프리카메기",
      "nameKrConfirmed": true,
      "rarity": "희귀",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-canal"
      ],
      "bait": "심층 탐지 루어(3클래스)",
      "tips": "40레벨 승급 제출 대상. 롱보우 아랫수역(운하). 하이카본 루어대 + 5클 낚시줄 + 4클 스피닝릴 권장."
    },
    {
      "id": "radioactive-grouper",
      "image": null,
      "nameEn": "Radioactive Grouper",
      "nameKr": "방사능 그루퍼(커뮤니티: 피콕하인드)",
      "nameKrConfirmed": false,
      "rarity": "희귀",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [
        "az3-offshore"
      ],
      "bait": "심해 대형 어류 진동 루어(5클래스)",
      "tips": "40레벨 승급 제출 대상. AZ3 외해."
    },
    {
      "id": "sapphire-snakehead",
      "image": null,
      "nameEn": "Sapphire Snakehead",
      "nameKr": "사파이어 가물치",
      "nameKrConfirmed": false,
      "rarity": "소장(레드)",
      "size": "소형",
      "method": [
        "찌낚시"
      ],
      "spotIds": [],
      "bait": null,
      "tips": "찌낚시로 잡는 유일한 소장급."
    },
    {
      "id": "platinum-silver-arowana",
      "image": null,
      "nameEn": "Platinum Silver Arowana",
      "nameKr": "플래티넘 실버 아로와나",
      "nameKrConfirmed": false,
      "rarity": "소장(레드)",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "giant-brown-trout",
      "image": null,
      "nameEn": "Giant Brown Trout",
      "nameKr": "자이언트 브라운 송어",
      "nameKrConfirmed": false,
      "rarity": "소장(레드)",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "baby-shark",
      "image": null,
      "nameEn": "Baby Shark",
      "nameKr": "새끼상어",
      "nameKrConfirmed": true,
      "rarity": "소장(레드)",
      "size": "거대",
      "method": [
        "루어"
      ],
      "spotIds": [
        "longbow-canal"
      ],
      "bait": "심해 대형 어류 진동 루어(5클래스)",
      "tips": "40레벨 승급 제출 대상. 롱보우 아랫수역(운하)."
    },
    {
      "id": "atlantic-salmon",
      "image": null,
      "nameEn": "Atlantic Salmon",
      "nameKr": "대서양 연어",
      "nameKrConfirmed": false,
      "rarity": "소장(레드)",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "tigerfish",
      "image": null,
      "nameEn": "Tigerfish",
      "nameKr": "타이거피시",
      "nameKrConfirmed": false,
      "rarity": "소장(레드)",
      "size": "대형",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    },
    {
      "id": "bigeye-tarpon",
      "image": null,
      "nameEn": "Bigeye Tarpon",
      "nameKr": "빅아이 타폰",
      "nameKrConfirmed": false,
      "rarity": "소장(레드)",
      "size": "거대",
      "method": [
        "루어"
      ],
      "spotIds": [],
      "bait": null,
      "tips": null
    }
  ],
  "missions": {
    "_note": "낚시 레벨 상한 50. 10/20/30/40레벨마다 낚시꾼 NPC(조 리드)를 만나 승급 평가를 통과해야 다음 구간 진행 가능. 출처 간 30/40레벨 대상어 표기가 갈려 인게임 검증 필요(글로벌 가이드 기준 채택, 중문 가이드는 한 단계 당겨 표기).",
    "unlock": {
      "requirement": "오퍼레이션 레벨 17 달성 후, 롱보우(이지)에서 낚시꾼 NPC 조 리드와 대화 → 입문 의뢰 완료 → 탈출하면 첫 낚싯대(스타터 찌낚시대) 지급",
      "note": "낚시는 별도 모드가 아니라 오퍼레이션 매치 안에서 진행됨"
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
            "condition": "1.5kg 초과"
          },
          {
            "fishId": "zander",
            "condition": "2.5kg 초과"
          }
        ],
        "requirement": "기준 무게를 넘는 숭어·잰더 각 1마리 제출",
        "reward": "금속 루어 낚싯대",
        "guide": "롱보우 수역에서 루어 낚시. 무게 조건 미달이면 다시 잡아야 하므로 큰 개체 위주로 노린다."
      },
      {
        "level": 30,
        "nameKr": "어종 평가",
        "fish": [
          {
            "fishId": "topmouth-culter",
            "condition": null
          },
          {
            "fishId": "saddled-bichir",
            "condition": null
          }
        ],
        "requirement": "톱마우스 컬터, 엔들리허 비커 각 1마리 제출",
        "reward": "하이카본 루어 낚싯대",
        "guide": "롱보우 세레니티 베이(맵 좌상단 수역)에서 보라 등급 낚시줄 + 고주파 테일스윙 소프트 베이트로 루어 낚시."
      },
      {
        "level": 40,
        "nameKr": "최종 평가 (2단계)",
        "fish": [
          {
            "fishId": "north-african-catfish",
            "condition": null
          },
          {
            "fishId": "radioactive-grouper",
            "condition": null
          },
          {
            "fishId": "baby-shark",
            "condition": null
          }
        ],
        "requirement": "북아프리카메기, 방사능 그루퍼, 새끼상어 제출",
        "reward": "레벨 50 구간 해금 + 전 요원 '낚시꾼의 노래' 음성 대사",
        "guide": "북아프리카메기·새끼상어는 롱보우 아랫수역(운하), 방사능 그루퍼는 AZ3 외해. 하이카본 루어대 + 5클 낚시줄 + 4클 스피닝릴, 메기는 3클 심층 탐지 루어, 그루퍼·새끼상어는 5클 심해 대형 어류 진동 루어."
      }
    ]
  },
  "npc": {
    "id": "joe-reed",
    "nameKr": "조 리드",
    "nameEn": "Joe Reed",
    "communityAlias": "조아재",
    "map": "longbow",
    "spawnRule": "한 매치에 롱보우 낚시터 3곳 중 1곳에 랜덤 스폰. 누군가 NPC를 죽이면 그 매치에서는 더 이상 등장하지 않음.",
    "spawnSpots": [
      {
        "spotId": null,
        "coord": null,
        "note": "스폰 3곳 위치 미확정 — 지도 이미지 확보 후 마킹 필요"
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
      "최초 낚시 해금: 대화 후 입문 의뢰 완료 시 첫 낚싯대 지급",
      "낚시 레벨 10/20/30/40 승급 평가 진행 (미통과 시 다음 레벨 구간 진행 불가)",
      "최초 해금 시 대화를 7~8회 반복해야 퀘스트 대화가 열린다는 커뮤니티 제보 있음(검증 필요)"
    ]
  },
  "gear": {
    "_note": "2차 단계 콘텐츠용 초안. 클래스(등급) 숫자 표기와 한국어 명칭은 인게임 검증 필요.",
    "rods": [
      {
        "id": "starter-float-rod",
        "image": null,
        "nameKr": "스타터 찌낚시대",
        "method": "찌낚시",
        "unlock": "조 리드 입문 의뢰 완료"
      },
      {
        "id": "fiberglass-lure-rod",
        "image": null,
        "nameKr": "파이버글래스 루어대",
        "method": "루어",
        "unlock": "10레벨 입문 평가 보상"
      },
      {
        "id": "metal-lure-rod",
        "image": null,
        "nameKr": "금속 루어대",
        "method": "루어",
        "unlock": "20레벨 무게 평가 보상"
      },
      {
        "id": "high-carbon-lure-rod",
        "image": null,
        "nameKr": "하이카본 루어대",
        "method": "루어",
        "unlock": "30레벨 어종 평가 보상"
      }
    ],
    "reels": [
      {
        "tier": 1,
        "image": null,
        "nameEn": "1000 All-Purpose"
      },
      {
        "tier": 2,
        "image": null,
        "nameEn": "2000H High-Speed"
      },
      {
        "tier": 3,
        "image": null,
        "nameEn": "2500D Strong-Drag"
      },
      {
        "tier": 4,
        "image": null,
        "nameEn": "3000XH Ultra-High-Speed"
      },
      {
        "tier": 5,
        "image": null,
        "nameEn": "4000D Heavy-Drag"
      }
    ],
    "lines": [
      {
        "tier": 1,
        "image": null,
        "nameEn": "Basic"
      },
      {
        "tier": 2,
        "image": null,
        "nameEn": "Gray-Label"
      },
      {
        "tier": 3,
        "image": null,
        "nameEn": "25 lb"
      },
      {
        "tier": 4,
        "image": null,
        "nameEn": "40 lb"
      },
      {
        "tier": 5,
        "image": null,
        "nameEn": "60 lb"
      },
      {
        "tier": 6,
        "image": null,
        "nameEn": "Amber"
      }
    ],
    "floatBaits": [
      {
        "id": "basic-grain-dough",
        "image": null,
        "nameEn": "Basic Grain Dough Bait",
        "nameKr": "기본 곡물 반죽 미끼",
        "note": "무료 기본 지급"
      },
      {
        "id": "enhanced-attractant-dough",
        "image": null,
        "nameEn": "Enhanced Attractant Dough Bait",
        "nameKr": "강화 유인 반죽 미끼",
        "note": null
      },
      {
        "id": "refined-competition-dough",
        "image": null,
        "nameEn": "Refined Competition Dough Bait",
        "nameKr": "정제 경기용 반죽 미끼",
        "note": null
      },
      {
        "id": "secret-bloodworm",
        "image": null,
        "nameEn": "Secret Bloodworm Bait",
        "nameKr": "비전 지렁이 미끼",
        "note": null
      }
    ],
    "lures": [
      {
        "id": "standard-spoon",
        "image": null,
        "nameEn": "Standard Spoon"
      },
      {
        "id": "high-contrast-spoon",
        "image": null,
        "nameEn": "High-Contrast Stimulus Spoon"
      },
      {
        "id": "fluorescent-vibrating-spoon",
        "image": null,
        "nameEn": "Fluorescent Vibrating Spoon"
      },
      {
        "id": "precision-hunting-lure",
        "image": null,
        "nameEn": "Precision Hunting Lure"
      },
      {
        "id": "deepwater-detection-lure",
        "image": null,
        "nameEn": "Deepwater Detection Lure",
        "nameKr": "심층 탐지 루어",
        "note": "북아프리카메기용 (3클)"
      },
      {
        "id": "high-freq-tail-swing",
        "image": null,
        "nameEn": "High-Frequency Tail-Swing Soft Bait",
        "nameKr": "고주파 테일스윙 소프트 베이트",
        "note": "30레벨 승급 대상어용 (보라)"
      },
      {
        "id": "territorial-stimulus-lure",
        "image": null,
        "nameEn": "Territorial Stimulus Lure"
      },
      {
        "id": "deep-diving-giant-vibration",
        "image": null,
        "nameEn": "Deep-Diving Giant Vibration Lure",
        "nameKr": "심해 대형 어류 진동 루어",
        "note": "방사능 그루퍼·새끼상어용 (5클)"
      },
      {
        "id": "steel-ball-acoustic",
        "image": null,
        "nameEn": "Steel-Ball Acoustic Lure"
      },
      {
        "id": "gold-plated-competition",
        "image": null,
        "nameEn": "Gold-Plated Competition Lure"
      }
    ],
    "mechanics": {
      "float": "찌가 가라앉는 타이밍에 반응. 미끼 소모형. 레벨링 속도가 가장 빠름(잡는 즉시 경험치, 탈출·인벤토리 불필요).",
      "lure": "희귀·소장급 대부분은 루어 낚시로만. 장력 게이지 관리 — 물고기가 움직이는 반대 방향으로 당기고, 당기는 중 짧은 클릭으로 거리를 좁히며 장력을 낮춘다. 줄이 빨간색이 되면 즉시 손을 뗄 것(끊어짐)."
    }
  }
};
