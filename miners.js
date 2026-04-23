// 常见比特币 ASIC 矿机默认数据
// hashrate: TH/s, power: W
// 数据为厂商公布的典型型号参数，实际以出厂标签为准
const MINERS = [
  {
    brand: "Bitmain 比特大陆",
    models: [
      { name: "Antminer S21 XP Hydro", hashrate: 473, power: 5676 },
      { name: "Antminer S21 Hydro",    hashrate: 335, power: 5360 },
      { name: "Antminer S21 Pro",      hashrate: 234, power: 3510 },
      { name: "Antminer S21",          hashrate: 200, power: 3500 },
      { name: "Antminer S19 XP Hydro", hashrate: 257, power: 5304 },
      { name: "Antminer S19 XP",       hashrate: 141, power: 3032 },
      { name: "Antminer S19k Pro",     hashrate: 120, power: 2760 },
      { name: "Antminer S19 Pro",      hashrate: 110, power: 3250 },
      { name: "Antminer S19j Pro+",    hashrate: 122, power: 3355 },
      { name: "Antminer S19j Pro",     hashrate: 104, power: 3068 },
      { name: "Antminer S19",          hashrate:  95, power: 3250 },
      { name: "Antminer T19",          hashrate:  84, power: 3150 }
    ]
  },
  {
    brand: "MicroBT 神马",
    models: [
      { name: "WhatsMiner M66S",   hashrate: 298, power: 5513 },
      { name: "WhatsMiner M66",    hashrate: 276, power: 5451 },
      { name: "WhatsMiner M60S",   hashrate: 186, power: 3441 },
      { name: "WhatsMiner M60",    hashrate: 172, power: 3354 },
      { name: "WhatsMiner M53S++", hashrate: 320, power: 6720 },
      { name: "WhatsMiner M50S++", hashrate: 150, power: 3510 },
      { name: "WhatsMiner M50S",   hashrate: 126, power: 3276 },
      { name: "WhatsMiner M50",    hashrate: 114, power: 3306 },
      { name: "WhatsMiner M30S++", hashrate: 112, power: 3472 },
      { name: "WhatsMiner M30S+",  hashrate: 100, power: 3400 },
      { name: "WhatsMiner M30S",   hashrate:  88, power: 3344 }
    ]
  },
  {
    brand: "Canaan 嘉楠",
    models: [
      { name: "AvalonMiner A1566", hashrate: 185, power: 3400 },
      { name: "AvalonMiner A1466", hashrate: 150, power: 3230 },
      { name: "AvalonMiner A1366", hashrate: 130, power: 3250 },
      { name: "AvalonMiner A1346", hashrate: 110, power: 3300 },
      { name: "AvalonMiner A1266", hashrate: 100, power: 3400 },
      { name: "AvalonMiner A1246", hashrate:  90, power: 3420 },
      { name: "AvalonMiner A1166 Pro", hashrate: 81, power: 3400 }
    ]
  },
  {
    brand: "Bitdeer 比特小鹿",
    models: [
      { name: "SEALMINER A2",  hashrate: 226, power: 3542 },
      { name: "SEALMINER A1",  hashrate: 226, power: 3916 }
    ]
  },
  {
    brand: "iPollo",
    models: [
      { name: "iPollo V1",     hashrate:  55, power: 3100 },
      { name: "iPollo V1 Mini", hashrate:  2,  power:  100 }
    ]
  },
  {
    brand: "自定义",
    models: [
      { name: "自定义机型", hashrate: 100, power: 3000 }
    ]
  }
];
