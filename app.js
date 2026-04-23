(function () {
  "use strict";

  const brandSelect = document.getElementById("brand-select");
  const modelSelect = document.getElementById("model-select");
  const hashrateInput = document.getElementById("hashrate");
  const powerInput = document.getElementById("power");
  const efficiencyInput = document.getElementById("efficiency");
  const unitsInput = document.getElementById("units");
  const resetBtn = document.getElementById("reset-machine");

  const rateInput = document.getElementById("electricity-rate");
  const currencySelect = document.getElementById("currency");
  const btcPriceInput = document.getElementById("btc-price");
  const netHashInput = document.getElementById("network-hashrate");
  const rewardInput = document.getElementById("block-reward");
  const poolFeeInput = document.getElementById("pool-fee");
  const uptimeInput = document.getElementById("uptime");

  const outBtcDay = document.getElementById("out-btc-day");
  const outRevDay = document.getElementById("out-revenue-day");
  const outCostDay = document.getElementById("out-cost-day");
  const outProfitDay = document.getElementById("out-profit-day");
  const breakdownBody = document.getElementById("breakdown-body");

  const BLOCKS_PER_DAY = 144;

  function currentMachine() {
    const brand = MINERS[brandSelect.value];
    return brand ? brand.models[modelSelect.value] : null;
  }

  function populateBrands() {
    MINERS.forEach((b, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = b.brand;
      brandSelect.appendChild(opt);
    });
    brandSelect.value = 0;
    populateModels();
  }

  function populateModels() {
    modelSelect.innerHTML = "";
    const brand = MINERS[brandSelect.value];
    brand.models.forEach((m, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${m.name}  ·  ${m.hashrate} TH/s  ·  ${m.power} W`;
      modelSelect.appendChild(opt);
    });
    modelSelect.value = 0;
    loadMachineDefaults();
  }

  function loadMachineDefaults() {
    const m = currentMachine();
    if (!m) return;
    hashrateInput.value = m.hashrate;
    powerInput.value = m.power;
    updateEfficiency();
    recalc();
  }

  function updateEfficiency() {
    const h = parseFloat(hashrateInput.value);
    const p = parseFloat(powerInput.value);
    if (h > 0 && p >= 0) {
      efficiencyInput.value = (p / h).toFixed(2);
    } else {
      efficiencyInput.value = "";
    }
  }

  function formatMoney(v) {
    const code = currencySelect.value;
    const symbol = code === "CNY" ? "¥" : "$";
    const sign = v < 0 ? "-" : "";
    const abs = Math.abs(v);
    return `${sign}${symbol}${abs.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  function formatBtc(v) {
    return `${v.toLocaleString(undefined, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8
    })} BTC`;
  }

  function formatKwh(v) {
    return `${v.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} kWh`;
  }

  function formatPct(v) {
    if (!isFinite(v)) return "-";
    return `${(v * 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}%`;
  }

  function recalc() {
    updateEfficiency();

    const hashTH = parseFloat(hashrateInput.value) || 0;
    const powerW = parseFloat(powerInput.value) || 0;
    const units = Math.max(1, parseInt(unitsInput.value, 10) || 1);

    const rate = parseFloat(rateInput.value) || 0;
    const btcPrice = parseFloat(btcPriceInput.value) || 0;
    const netEH = parseFloat(netHashInput.value) || 0;
    const reward = parseFloat(rewardInput.value) || 0;
    const poolFee = (parseFloat(poolFeeInput.value) || 0) / 100;
    const uptime = (parseFloat(uptimeInput.value) || 0) / 100;

    // 转换全网算力 EH/s -> TH/s  (1 EH = 1,000,000 TH)
    const netTH = netEH * 1e6;
    const totalHash = hashTH * units;

    let btcPerDay = 0;
    if (netTH > 0) {
      btcPerDay = (totalHash / netTH) * BLOCKS_PER_DAY * reward * uptime * (1 - poolFee);
    }

    const powerKW = (powerW * units) / 1000;
    const kwhPerDay = powerKW * 24 * uptime;
    const costPerDay = kwhPerDay * rate;
    const revenuePerDay = btcPerDay * btcPrice;
    const profitPerDay = revenuePerDay - costPerDay;

    outBtcDay.textContent = formatBtc(btcPerDay);
    outRevDay.textContent = formatMoney(revenuePerDay);
    outCostDay.textContent = formatMoney(costPerDay);
    outProfitDay.textContent = formatMoney(profitPerDay);
    outProfitDay.parentElement.classList.toggle("negative", profitPerDay < 0);

    const periods = [
      { label: "每日", days: 1 },
      { label: "每月 (30天)", days: 30 },
      { label: "每年 (365天)", days: 365 }
    ];

    breakdownBody.innerHTML = "";
    periods.forEach((p) => {
      const kwh = kwhPerDay * p.days;
      const cost = costPerDay * p.days;
      const btc = btcPerDay * p.days;
      const rev = revenuePerDay * p.days;
      const prof = profitPerDay * p.days;
      const margin = rev > 0 ? prof / rev : NaN;
      const tr = document.createElement("tr");
      if (prof < 0) tr.classList.add("loss");
      tr.innerHTML = `
        <td>${p.label}</td>
        <td>${formatKwh(kwh)}</td>
        <td>${formatMoney(cost)}</td>
        <td>${formatBtc(btc)}</td>
        <td>${formatMoney(rev)}</td>
        <td>${formatMoney(prof)}</td>
        <td>${formatPct(margin)}</td>
      `;
      breakdownBody.appendChild(tr);
    });
  }

  brandSelect.addEventListener("change", populateModels);
  modelSelect.addEventListener("change", loadMachineDefaults);
  resetBtn.addEventListener("click", loadMachineDefaults);

  [
    hashrateInput, powerInput, unitsInput,
    rateInput, btcPriceInput, netHashInput,
    rewardInput, poolFeeInput, uptimeInput,
    currencySelect
  ].forEach((el) => {
    el.addEventListener("input", recalc);
    el.addEventListener("change", recalc);
  });

  populateBrands();
})();
