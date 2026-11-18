(function () {
  const PLATFORM_NAMES = ["Instagram", "Facebook", "TikTok", "YouTube"];
  const PLATFORM_COLORS = {
    Instagram: "#d9468f",
    Facebook: "#3975e8",
    TikTok: "#111827",
    YouTube: "#ed4242",
  };
  const PLATFORM_ICONS = {
    Instagram: "/assets/img/instagram.png",
    Facebook: "/assets/img/facebook-app-symbol.png",
    TikTok: "/assets/img/tik-tok.png",
    YouTube: "/assets/img/youtube.png",
  };
  const numberFormat = new Intl.NumberFormat("id-ID");
  const compactFormat = new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  let current = null;
  let savedFilters = null;

  function todayWIB() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const values = Object.fromEntries(
      parts.map((part) => [part.type, part.value]),
    );
    return `${values.year}-${values.month}-${values.day}`;
  }

  function defaultFilters() {
    const today = todayWIB();
    return {
      startDate: `${today.slice(0, 4)}-01-01`,
      endDate: today,
      platforms: [...PLATFORM_NAMES],
      granularity: "month",
      sortBy: "views",
      page: 1,
      pageSize: 10,
    };
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  }

  function platformLabel(platform, color) {
    const iconPath = PLATFORM_ICONS[platform];
    const icon = iconPath
      ? `<img src="${iconPath}" alt="" aria-hidden="true">`
      : "";
    const iconClass = iconPath ? " social-platform-icon" : "";
    const facebookClass =
      platform === "Facebook" ? " social-platform-facebook" : "";

    return `<span class="social-platform${iconClass}${facebookClass}" style="--platform-color:${color}">${icon}${escapeHTML(platform)}</span>`;
  }

  function validLink(value) {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  function displayNumber(value, compact = false) {
    if (value === null || value === undefined) return "N/A";
    return (compact ? compactFormat : numberFormat).format(value);
  }

  function formatDuration(value) {
    if (!Number.isFinite(value)) return "—";
    const seconds = Math.floor(value);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;
    return hours
      ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`
      : `${minutes}:${String(remainder).padStart(2, "0")}`;
  }

  function displayDate(value) {
    if (!value) return "—";
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(year, month - 1, day));
  }

  function card(title, value, note) {
    return `
      <article class="social-kpi">
        <span>${escapeHTML(title)}</span>
        <strong>${escapeHTML(value)}</strong>
        <small>${escapeHTML(note || "")}</small>
      </article>`;
  }

  function loadingKpis() {
    return ["Konten upload", "Views", "Interaksi", "Rasio interaksi"]
      .map(
        (title) => `
          <article class="social-kpi" aria-busy="true">
            <span>${escapeHTML(title)}</span>
            <strong><i class="social-kpi-skeleton"></i></strong>
            <small><i class="social-kpi-skeleton social-kpi-note-skeleton"></i></small>
          </article>`,
      )
      .join("");
  }

  function loadingTable() {
    return `<div class="social-loading-table" aria-hidden="true">${Array.from(
      { length: 5 },
      () => '<i></i>',
    ).join("")}</div>`;
  }

  function loadingAudience() {
    return `${Array.from(
      { length: 4 },
      () => '<article class="social-audience-card" aria-hidden="true"><i class="social-kpi-skeleton social-audience-platform-skeleton"></i><i class="social-kpi-skeleton social-audience-value-skeleton"></i><i class="social-kpi-skeleton social-audience-note-skeleton"></i></article>',
    ).join("")}<p class="social-audience-growth"><i class="social-kpi-skeleton social-audience-growth-skeleton"></i></p>`;
  }

  function renderShell(root, headerRoot) {
    const filters = current.filters;
    const selectedPlatform =
      filters.platforms.length === PLATFORM_NAMES.length
        ? "all"
        : filters.platforms[0] || "all";
    headerRoot.hidden = false;
    headerRoot.innerHTML = `
      <div class="social-toolbar">
        <div class="social-controls" aria-label="Filter dashboard">
          <label>Dari tanggal<input type="date" data-filter="startDate" value="${escapeHTML(filters.startDate)}"></label>
          <label>Sampai tanggal<input type="date" data-filter="endDate" value="${escapeHTML(filters.endDate)}"></label>
          <label>Platform<select data-filter="platform" aria-label="Pilih platform"><option value="all" ${selectedPlatform === "all" ? "selected" : ""}>Semua platform</option>${PLATFORM_NAMES.map((name) => `<option value="${name}" ${selectedPlatform === name ? "selected" : ""}>${name}</option>`).join("")}</select></label>
          <label>Periode<select data-filter="granularity"><option value="day" ${filters.granularity === "day" ? "selected" : ""}>Harian</option><option value="week" ${filters.granularity === "week" ? "selected" : ""}>Mingguan</option><option value="month" ${filters.granularity === "month" ? "selected" : ""}>Bulanan</option></select></label>
          <button type="button" class="social-refresh" data-action="refresh">Muat ulang</button>
        </div>
        <div class="social-status" data-role="status" aria-live="polite"></div>
      </div>`;
    root.innerHTML = `
      <div class="social-dashboard-content">
        <div class="social-message" data-role="message"></div>
        <section class="social-kpis" data-role="kpis" aria-label="Indikator utama">${loadingKpis()}</section>
        <section class="social-grid">
          <article class="social-panel social-span-8"><header><div><h3>Tren performa konten</h3><p>Views dan interaksi dari konten yang dipublikasikan pada periode ini</p></div><label>Metrik<select data-filter="trendMetric"><option value="views">Views</option><option value="interactions">Interaksi</option></select></label></header><div class="social-chart" data-chart="trend" role="img" aria-label="Grafik tren performa konten"></div></article>
          <article class="social-panel social-span-4"><header><div><h3>Jenis konten</h3><p>Jumlah publikasi per jenis</p></div></header><div class="social-chart social-types-chart" data-chart="types" role="img" aria-label="Grafik distribusi jenis konten"></div><div class="social-type-legend" data-role="type-legend"></div></article>
          <article class="social-panel social-span-6"><header><div><h3>Interaksi</h3><p>Komponen yang tersedia pada konten terpilih</p></div></header><div class="social-chart" data-chart="engagement" role="img" aria-label="Grafik breakdown interaksi"></div></article>
          <article class="social-panel social-span-6"><header><div><h3>Perbandingan platform</h3><p>Nilai metrik yang tersedia per platform</p></div><label>Metrik<select data-filter="platformMetric"><option value="views">Views</option><option value="interactions">Interaksi</option><option value="contentCount">Jumlah konten</option><option value="commonEngagementRate">Rasio interaksi</option></select></label></header><div class="social-chart" data-chart="platforms" role="img" aria-label="Grafik perbandingan platform"></div></article>
          <article class="social-panel social-span-12"><header><div><h3>Konten teratas</h3><p>Peringkat berdasarkan metrik terpilih; views bukan reach unik</p></div><label><select data-filter="sortBy" aria-label="Pilih metrik pengurutan"><option value="views">Views</option><option value="interactions">Interaksi</option><option value="comments">Komentar</option><option value="publishedDate">Tanggal publikasi</option></select></label></header><div class="social-table-wrap" data-role="table">${loadingTable()}</div><div class="social-pagination" data-role="pagination"></div></article>
          <article class="social-panel social-span-12"><header><div><h3>Audience</h3><p>Snapshot aktual terakhir pada atau sebelum tanggal akhir filter; total gabungan bukan jumlah orang unik</p></div></header><div class="social-audience" data-role="audience">${loadingAudience()}</div></article>
        </section>
        <footer class="social-footnote">Views merupakan metrik kumulatif per publikasi. Reactions Facebook dan definisi views lintas platform tidak sepenuhnya sebanding. Rasio interaksi dihitung dari likes/reactions + komentar dibanding views, dan merupakan proksi, bukan standar lintas platform.</footer>
      </div>`;
    root.querySelector('[data-filter="trendMetric"]').value =
      current.trendMetric;
    root.querySelector('[data-filter="platformMetric"]').value =
      current.platformMetric;
    root.querySelector('[data-filter="sortBy"]').value = filters.sortBy;
  }

  function makeChart(element, option) {
    if (!element || !window.echarts) return null;

    const chart = window.echarts.init(element);
    chart.setOption(option);
    return chart;
  }

  function getThemeColors() {
    const style = getComputedStyle(document.documentElement);

    return {
      text: style.getPropertyValue("--ink2").trim() || "#566074",
      grid: style.getPropertyValue("--line").trim() || "#e3e5eb",
      accent: style.getPropertyValue("--ac").trim() || "#1470ff",
      card: style.getPropertyValue("--card").trim() || "#fff",
    };
  }

  function chartBase() {
    return getThemeColors();
  }

  function renderCharts(data, chartKeys = null) {
    const colors = chartBase();
    const common = {
      animationDuration: 350,
      textStyle: {
        fontFamily: getComputedStyle(document.body).fontFamily,
        color: colors.text,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        backgroundColor: colors.card,
        borderColor: colors.grid,
        textStyle: { color: colors.text },
      },
    };
    const periods = [...new Set(data.trends.map((row) => row.period))].sort();
    const periodLabels = periods.map((period) => {
      if (current.filters.granularity !== "month") return period;
      const [year, month] = period.split("-").map(Number);
      return new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
        new Date(year, month - 1, 1),
      );
    });
    const metric = current.trendMetric;
    const series = PLATFORM_NAMES.filter((platform) =>
      current.filters.platforms.includes(platform),
    ).map((platform) => ({
      name: platform,
      type: "line",
      smooth: false,
      showSymbol: true,
      symbolSize: 6,
      lineStyle: { width: 2, color: PLATFORM_COLORS[platform] },
      itemStyle: { color: PLATFORM_COLORS[platform] },
      areaStyle: { opacity: 0.035 },
      connectNulls: false,
      data: periods.map((period) => {
        const row = data.trends.find(
          (item) => item.period === period && item.platform === platform,
        );
        return row ? row[metric] : null;
      }),
    }));
    const chartOptions = [
      [
        "trend",
        {
          ...common,
          legend: {
            bottom: 0,
            type: "scroll",
            textStyle: { color: colors.text },
          },
          grid: {
            left: 55,
            right: 18,
            top: 24,
            bottom: 58,
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: periodLabels,
            axisLabel: { color: colors.text },
            axisLine: { lineStyle: { color: colors.grid } },
          },
          yAxis: {
            type: "value",
            min: 0,
            axisLabel: {
              color: colors.text,
              formatter: (value) => compactFormat.format(value),
            },
            splitLine: { lineStyle: { color: colors.grid, type: "dashed" } },
          },
          series,
        },
      ],
      [
        "types",
        {
          ...common,
          tooltip: {
            trigger: "item",
            confine: true,
            formatter: (params) =>
              `${escapeHTML(params.name)}<br>${numberFormat.format(params.value)} publikasi (${params.percent}%)`,
          },
          series: [
            {
              type: "pie",
              radius: ["48%", "68%"],
              center: ["50%", "50%"],
              minAngle: 2,
              itemStyle: {
                borderRadius: 5,
                borderColor: colors.card,
                borderWidth: 2,
              },
              label: { show: false },
              data: data.contentTypes.map((item) => ({
                name: item.contentType,
                value: item.count,
              })),
            },
          ],
        },
      ],
      [
        "engagement",
        {
          ...common,
          grid: {
            left: 120,
            right: 24,
            top: 14,
            bottom: 20,
            containLabel: true,
          },
          xAxis: {
            type: "value",
            min: 0,
            axisLabel: {
              color: colors.text,
              formatter: (value) => compactFormat.format(value),
            },
            splitLine: { lineStyle: { color: colors.grid, type: "dashed" } },
          },
          yAxis: {
            type: "category",
            data: data.interactionBreakdown
              .map((item) => item.metric)
              .reverse(),
            axisLabel: { color: colors.text },
            axisLine: { show: false },
            axisTick: { show: false },
          },
          series: [
            {
              type: "bar",
              data: data.interactionBreakdown
                .map((item) => item.value)
                .reverse(),
              barMaxWidth: 22,
              itemStyle: { color: colors.accent, borderRadius: [0, 8, 8, 0] },
              label: {
                show: true,
                position: "right",
                color: colors.text,
                formatter: (params) =>
                  params.value === null
                    ? "N/A"
                    : compactFormat.format(params.value),
              },
            },
          ],
        },
      ],
      [
        "platforms",
        {
          ...common,
          grid: {
            left: 90,
            right: 28,
            top: 16,
            bottom: 20,
            containLabel: true,
          },
          xAxis: {
            type: "value",
            min: 0,
            axisLabel: {
              color: colors.text,
              formatter: (value) =>
                current.platformMetric === "commonEngagementRate"
                  ? `${value}%`
                  : compactFormat.format(value),
            },
            splitLine: { lineStyle: { color: colors.grid, type: "dashed" } },
          },
          yAxis: {
            type: "category",
            data: data.platforms.map((item) => item.platform).reverse(),
            axisLabel: { color: colors.text },
            axisLine: { show: false },
            axisTick: { show: false },
          },
          series: [
            {
              type: "bar",
              data: data.platforms
                .map((item) => ({
                  value: item[current.platformMetric],
                  itemStyle: {
                    color: PLATFORM_COLORS[item.platform] || colors.accent,
                  },
                }))
                .reverse(),
              barMaxWidth: 25,
              itemStyle: { borderRadius: [0, 8, 8, 0] },
              label: {
                show: true,
                position: "right",
                color: colors.text,
                formatter: (params) =>
                  params.value == null
                    ? "N/A"
                    : current.platformMetric === "commonEngagementRate"
                      ? `${params.value.toLocaleString("id-ID", { maximumFractionDigits: 2 })}%`
                      : compactFormat.format(params.value),
              },
            },
          ],
        },
      ],
    ];
    const hasData = {
      trend:
        periods.length > 0 &&
        series.some((item) => item.data.some((value) => value !== null)),
      types: data.contentTypes.length > 0,
      engagement: data.interactionBreakdown.some((item) => item.value !== null),
      platforms: data.platforms.some(
        (item) => item[current.platformMetric] !== null,
      ),
    };
    chartOptions.forEach(([key, option]) => {
      if (chartKeys && !chartKeys.includes(key)) return;
      const element = current.root.querySelector(`[data-chart="${key}"]`);
      const oldChart = current.charts.get(key);
      if (oldChart) oldChart.dispose();
      element.innerHTML = "";
      if (!hasData[key]) {
        element.innerHTML =
          '<p class="social-chart-empty">Data metrik belum tersedia pada filter ini.</p>';
        current.charts.delete(key);
        return;
      }
      const chart = makeChart(element, option);
      if (chart) current.charts.set(key, chart);
      else
        element.innerHTML =
          '<p class="social-chart-empty">Tidak ada data untuk divisualisasikan.</p>';
    });
  }

  function renderData(data) {
    current.data = data;
    const sourceDates = Object.values(data.sourceUpdatedAtByPlatform || {})
      .filter(Boolean)
      .sort();
    const newestSourceDate = sourceDates.at(-1);
    const fetchedLabel = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(data.fetchedAt));
    current.headerRoot.querySelector('[data-role="status"]').textContent =
      newestSourceDate
        ? `Dibaca ${fetchedLabel} · Data master terakhir: ${newestSourceDate} (waktu sumber)`
        : `Dibaca ${fetchedLabel} · Waktu pembaruan sumber belum tersedia`;
    const rate =
      data.kpis.commonEngagementRate === null
        ? "N/A"
        : `${data.kpis.commonEngagementRate.toLocaleString("id-ID", { maximumFractionDigits: 2 })}%`;
    current.root.querySelector('[data-role="kpis"]').innerHTML = [
      card(
        "Konten upload",
        displayNumber(data.kpis.contentCount),
        "Jumlah publikasi pada filter",
      ),
      card(
        "Views",
        displayNumber(data.kpis.views, true),
        `${data.kpis.coverage.views.validCount}/${data.kpis.coverage.views.totalCount} konten memiliki data`,
      ),
      card(
        "Interaksi",
        displayNumber(data.kpis.interactions, true),
        `${data.kpis.coverage.interactions.validCount}/${data.kpis.coverage.interactions.totalCount} konten memiliki komponen`,
      ),
      card("Rasio interaksi", rate, "Likes/reactions + komentar ÷ views"),
    ].join("");
    const warningList = [...data.warnings, ...(data.audience?.warnings || [])];
    const message = current.root.querySelector('[data-role="message"]');
    message.innerHTML = warningList.length
      ? `<ul>${warningList.map((warning) => `<li>${escapeHTML(warning)}</li>`).join("")}</ul>`
      : "";
    message.hidden = !warningList.length;
    const typeColors = [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
    ];
    current.root.querySelector('[data-role="type-legend"]').innerHTML =
      data.contentTypes
        .map(
          (item, index) =>
            `<span class="social-type-legend-item"><i style="--legend-color:${typeColors[index % typeColors.length]}"></i>${escapeHTML(item.contentType)}</span>`,
        )
        .join("");
    renderCharts(data);
    renderTable(data);
    renderAudience(data.audience);
  }

  function renderTable(data) {
    const table = current.root.querySelector('[data-role="table"]');

    if (!data.topContent.rows.length) {
      table.innerHTML =
        '<p class="social-empty">Tidak ada publikasi pada filter yang dipilih.</p>';
    } else {
      const body = data.topContent.rows
        .map((row, index) => {
          const link = validLink(row.url);
          const title = row.title || row.caption || "(Tanpa judul)";
          const rank =
            (data.topContent.page - 1) * data.topContent.pageSize + index + 1;
          const platformColor = PLATFORM_COLORS[row.platform] || "#64748b";
          const views = displayNumber(row.views);
          const interactions = displayNumber(row.interactions);
          const duration = formatDuration(row.durationSeconds);
          const linkCell = link
            ? `<a href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer">Buka</a>`
            : "—";

          return `
          <tr>
            <td>${rank}</td>
            <td>${platformLabel(row.platform, platformColor)}</td>
            <td>${escapeHTML(displayDate(row.publishedDate))}</td>
            <td>${escapeHTML(row.contentType)}</td>
            <td>${escapeHTML(duration)}</td>
            <td class="social-content-title">${escapeHTML(title)}</td>
            <td class="social-metric-cell" title="${escapeHTML(views)}">${escapeHTML(views)}</td>
            <td class="social-metric-cell" title="${escapeHTML(interactions)}">${escapeHTML(interactions)}</td>
            <td>${linkCell}</td>
          </tr>`;
        })
        .join("");

      table.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Platform</th>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>Durasi</th>
              <th>Konten</th>
              <th>Views</th>
              <th>Interaksi</th>
              <th>Tautan</th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>`;
    }
    table.scrollLeft = 0;
    const pages = Math.max(
      1,
      Math.ceil(data.topContent.total / data.topContent.pageSize),
    );
    current.root.querySelector('[data-role="pagination"]').innerHTML = `
      <span>${numberFormat.format(data.topContent.total)} konten · Halaman ${data.topContent.page} dari ${pages}</span>
      <div>
        <button type="button" data-action="page" data-page="${data.topContent.page - 1}" ${data.topContent.page <= 1 ? "disabled" : ""}>Sebelumnya</button>
        <button type="button" data-action="page" data-page="${data.topContent.page + 1}" ${data.topContent.page >= pages ? "disabled" : ""}>Berikutnya</button>
      </div>`;
  }

  function renderAudienceCard(item) {
    const metricLabel =
      item.metricName === "subscribers" ? "Subscribers" : "Followers";
    const statusLabel = item.stale
      ? "Snapshot lama"
      : item.predatesStart
        ? "Snapshot sebelum awal periode"
        : "Snapshot aktual";
    const statusClass = item.stale ? "is-stale" : "";
    const platformColor = PLATFORM_COLORS[item.platform] || "#64748b";

    return `
      <article class="social-audience-card">
        ${platformLabel(item.platform, platformColor)}
        <strong>${escapeHTML(displayNumber(item.value))}</strong>
        <small>${escapeHTML(metricLabel)} · ${escapeHTML(displayDate(item.snapshotDate))}</small>
        <small class="${statusClass}">${statusLabel}</small>
      </article>`;
  }

  function renderAudienceGrowth(growth) {
    if (!growth.length) {
      return "Pertumbuhan: N/A — perlu minimal dua snapshot aktual dalam periode terpilih.";
    }

    return growth
      .map((item) => {
        const sign = item.change > 0 ? "+" : "";
        const change = `${sign}${displayNumber(item.change)}`;
        const dateRange = `${displayDate(item.fromDate)}–${displayDate(item.toDate)}`;

        return `${escapeHTML(item.platform)}: ${escapeHTML(change)} (${escapeHTML(dateRange)})`;
      })
      .join(" · ");
  }

  function renderAudience(audience) {
    const container = current.root.querySelector('[data-role="audience"]');
    if (!audience || !audience.latest.length) {
      container.innerHTML =
        '<p class="social-empty">Snapshot audience belum tersedia untuk periode ini.</p>';
      return;
    }
    const cards = audience.latest.map(renderAudienceCard).join("");
    const growth = renderAudienceGrowth(audience.growth);

    container.innerHTML = `
      ${cards}
      <p class="social-audience-growth">${growth}</p>`;
  }

  async function load() {
    const instance = current;
    const requestId = ++instance.requestId;
    const startedAt = Date.now();
    const status = instance.headerRoot.querySelector('[data-role="status"]');
    const message = instance.root.querySelector('[data-role="message"]');
    instance.root.classList.add("is-loading");
    instance.root.querySelector('[data-role="kpis"]').innerHTML = loadingKpis();
    instance.root.querySelector('[data-role="table"]').innerHTML = loadingTable();
    instance.root.querySelector('[data-role="audience"]').innerHTML = loadingAudience();
    instance.root.querySelector('[data-role="pagination"]').innerHTML = "";
    message.hidden = true;
    try {
      const data = await instance.api("getSocialDashboardData", {
        ...instance.filters,
      });
      if (current !== instance || requestId !== instance.requestId) return;
      await new Promise((resolve) =>
        window.setTimeout(resolve, Math.max(0, 350 - (Date.now() - startedAt))),
      );
      if (current !== instance || requestId !== instance.requestId) return;
      renderData(data);
      instance.root.classList.remove("is-loading");
    } catch (error) {
      if (current !== instance || requestId !== instance.requestId) return;
      instance.root.classList.remove("is-loading");
      if (String(error.message || "").includes("Sesi berakhir")) {
        window.dispatchEvent(new CustomEvent("cp:session-expired"));
        return;
      }
      status.textContent = "Data gagal dimuat";
      instance.root.querySelector('[data-role="kpis"]').innerHTML = [
        card("Konten upload", "—", "Data gagal dimuat"),
        card("Views", "—", "Data gagal dimuat"),
        card("Interaksi", "—", "Data gagal dimuat"),
        card("Rasio interaksi", "—", "Data gagal dimuat"),
      ].join("");
      instance.root.querySelector('[data-role="table"]').innerHTML =
        '<p class="social-empty">Data konten tidak dapat dimuat.</p>';
      instance.root.querySelector('[data-role="audience"]').innerHTML =
        '<p class="social-empty">Data audience tidak dapat dimuat.</p>';
      instance.root.querySelector('[data-role="pagination"]').innerHTML = "";
      instance.root.querySelectorAll(".social-chart").forEach((chart) => {
        chart.innerHTML =
          '<p class="social-chart-empty">Data chart tidak dapat dimuat.</p>';
      });
      message.hidden = false;
      message.innerHTML = `<p>${escapeHTML(error.message || "Terjadi kesalahan saat memuat dashboard.")}</p><button type="button" class="social-refresh" data-action="refresh">Coba lagi</button>`;
    }
  }

  function onChange(event) {
    const input = event.target.closest("[data-filter]");
    if (!input) return;
    const key = input.dataset.filter;
    if (key === "trendMetric" || key === "platformMetric") {
      if (key === "platformMetric") current.platformMetric = input.value;
      else current.trendMetric = input.value;
      if (current.data)
        renderCharts(current.data, [
          key === "trendMetric" ? "trend" : "platforms",
        ]);
      return;
    }
    if (key === "platform")
      current.filters.platforms =
        input.value === "all" ? [...PLATFORM_NAMES] : [input.value];
    else current.filters[key] = input.value;
    current.filters.page = 1;
    savedFilters = {
      ...current.filters,
      platforms: [...current.filters.platforms],
    };
    load();
  }

  function onClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.dataset.action === "page") {
      current.filters.page = Number(button.dataset.page);
      savedFilters = {
        ...current.filters,
        platforms: [...current.filters.platforms],
      };
      load();
    } else if (button.dataset.action === "refresh") {
      current.filters.page = 1;
      load();
    }
  }

  function mount(root, headerRoot, api) {
    destroy();
    current = {
      root,
      headerRoot,
      api,
      filters: savedFilters
        ? { ...savedFilters, platforms: [...savedFilters.platforms] }
        : defaultFilters(),
      trendMetric: "views",
      platformMetric: "views",
      charts: new Map(),
      requestId: 0,
      data: null,
    };
    renderShell(root, headerRoot);
    root.addEventListener("change", onChange);
    root.addEventListener("click", onClick);
    headerRoot.addEventListener("change", onChange);
    headerRoot.addEventListener("click", onClick);
    current.resizeObserver = new ResizeObserver(() =>
      current?.charts.forEach((chart) => chart.resize()),
    );
    current.chartsObserverTarget = root;
    current.resizeObserver.observe(root);
    current.themeObserver = new MutationObserver(() => {
      if (current?.data) renderCharts(current.data);
    });
    current.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-mode"],
    });
    load();
  }

  function destroy() {
    if (!current) return;
    current.requestId += 1;
    current.root.removeEventListener("change", onChange);
    current.root.removeEventListener("click", onClick);
    current.headerRoot.removeEventListener("change", onChange);
    current.headerRoot.removeEventListener("click", onClick);
    current.resizeObserver?.disconnect();
    current.themeObserver?.disconnect();
    current.charts.forEach((chart) => chart.dispose());
    current.charts.clear();
    current.root.replaceChildren();
    current.headerRoot.replaceChildren();
    current.headerRoot.hidden = true;
    current = null;
  }

  window.SocialDashboard = { mount, destroy };
})();
