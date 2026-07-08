(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- */
  /* Radar chart with drill-down. Top level shows the six categories;  */
  /* clicking a category re-renders the chart with its sub-skills.     */
  /* Hand-built SVG, no charting dependency.                           */
  /* ---------------------------------------------------------------- */
  const NS = "http://www.w3.org/2000/svg";
  let radarFocus = null; // null = category overview; number = index into SKILLS

  function skillItems() {
    return radarFocus == null ? SKILLS : SKILLS[radarFocus].children;
  }

  function el(tag, attrs) {
    const node = document.createElementNS(NS, tag);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function renderRadar() {
    const svg = document.getElementById("radar-chart");
    if (!svg || typeof SKILLS === "undefined") return;

    const items = skillItems();
    const topLevel = radarFocus == null;
    const cx = 160, cy = 155, maxR = 105, levels = 5;
    const n = items.length;

    const angleFor = (i) => -Math.PI / 2 + i * ((2 * Math.PI) / n);
    const point = (r, angle) => ({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });

    const plot = el("g", { class: "radar-plot" });
    plot.style.transformOrigin = cx + "px " + cy + "px";

    // Grid rings
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (maxR * lvl) / levels;
      const pts = items.map((_, i) => point(r, angleFor(i)));
      plot.appendChild(
        el("polygon", {
          points: pts.map((p) => `${p.x},${p.y}`).join(" "),
          fill: "none",
          stroke: "var(--border)",
          "stroke-width": lvl === levels ? "1.2" : "1",
        })
      );
    }

    // Spokes + axis labels (clickable at top level)
    items.forEach((skill, i) => {
      const angle = angleFor(i);
      const outer = point(maxR, angle);
      plot.appendChild(
        el("line", { x1: cx, y1: cy, x2: outer.x, y2: outer.y, stroke: "var(--border)", "stroke-width": "1" })
      );

      const labelPt = point(maxR + 16, angle);
      const cosA = Math.cos(angle);
      let anchor = "middle";
      if (cosA > 0.3) anchor = "start";
      else if (cosA < -0.3) anchor = "end";

      const text = el("text", {
        x: labelPt.x,
        y: labelPt.y,
        "text-anchor": anchor,
        "dominant-baseline": "middle",
        class: "radar-axis-label",
      });
      text.textContent = skill.short || skill.label;

      if (topLevel) {
        const hit = el("g", {
          class: "radar-hit",
          role: "button",
          tabindex: "0",
          "data-i": String(i),
          "aria-label": "Zoom into " + skill.label + " sub-skills",
        });
        hit.appendChild(el("circle", { cx: labelPt.x, cy: labelPt.y, r: "16", fill: "transparent" }));
        hit.appendChild(text);
        plot.appendChild(hit);
      } else {
        plot.appendChild(text);
      }
    });

    // Data polygon + vertices
    const dataPts = items.map((skill, i) => point((maxR * skill.value) / levels, angleFor(i)));
    plot.appendChild(
      el("polygon", {
        points: dataPts.map((p) => `${p.x},${p.y}`).join(" "),
        fill: "var(--accent-soft)",
        stroke: "var(--accent)",
        "stroke-width": "2",
        "stroke-linejoin": "round",
      })
    );
    dataPts.forEach((p) => {
      plot.appendChild(el("circle", { cx: p.x, cy: p.y, r: "3.5", fill: "var(--accent)" }));
    });

    svg.replaceChildren(plot);

    const desc = document.getElementById("radar-desc");
    if (desc) {
      desc.textContent = topLevel
        ? "A radar chart comparing six skill categories on a scale of one to five. Values are listed in the adjacent table."
        : "A radar chart of sub-skills within " + SKILLS[radarFocus].label + ". Values are listed in the adjacent table.";
    }

    plot.querySelectorAll(".radar-hit").forEach((hit) => {
      const drillIn = () => drill(Number(hit.getAttribute("data-i")));
      hit.addEventListener("click", drillIn);
      hit.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          drillIn();
        }
      });
    });
  }

  function renderSkillsTable() {
    const body = document.getElementById("skills-table-body");
    if (!body || typeof SKILLS === "undefined") return;
    const items = skillItems();
    const topLevel = radarFocus == null;

    body.innerHTML = items.map(
      (s, i) => `<tr><td>${
        topLevel
          ? `<button type="button" class="skill-drill" data-i="${i}">${s.label}<span class="drill-count">${s.children.length} sub-skills →</span></button>`
          : s.label
      }</td><td>
        <span class="table-bar">
          <span class="bar-track"><span class="bar-fill" style="width:${(s.value / 5) * 100}%"></span></span>
          <span class="bar-value">${s.value}/5</span>
        </span>
      </td></tr>`
    ).join("");
  }

  function updateRadarChrome() {
    const back = document.getElementById("radar-back");
    const crumb = document.getElementById("radar-crumb");
    const hint = document.getElementById("radar-hint");
    const topLevel = radarFocus == null;
    if (back) back.hidden = topLevel;
    if (crumb) crumb.textContent = topLevel ? "All skills" : SKILLS[radarFocus].label;
    if (hint) {
      hint.textContent = topLevel
        ? "Click a category on the chart or in the table to zoom into its sub-skills."
        : SKILLS[radarFocus].blurb;
    }
  }

  function refreshSkills() {
    renderRadar();
    renderSkillsTable();
    updateRadarChrome();
  }

  function drill(i) {
    radarFocus = i;
    refreshSkills();
    const back = document.getElementById("radar-back");
    if (back) back.focus();
  }

  function drillOut() {
    radarFocus = null;
    refreshSkills();
    const crumb = document.getElementById("radar-crumb");
    if (crumb) crumb.focus();
  }

  function initSkills() {
    refreshSkills();
    const back = document.getElementById("radar-back");
    if (back) back.addEventListener("click", drillOut);
    const body = document.getElementById("skills-table-body");
    if (body) {
      body.addEventListener("click", (e) => {
        const btn = e.target.closest(".skill-drill");
        if (btn) drill(Number(btn.dataset.i));
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Project card glyphs. Small decorative SVGs, one per project,      */
  /* animated via CSS classes in style.css (viewBox 0 0 120 80).       */
  /* ---------------------------------------------------------------- */
  const VIZ = {
    pipeline() {
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">
        <line x1="14" y1="40" x2="106" y2="40" class="vz-line"/>
        <circle cx="14" cy="40" r="5" class="vz-node"/>
        <circle cx="44" cy="40" r="5" class="vz-node"/>
        <circle cx="74" cy="40" r="5" class="vz-node"/>
        <circle cx="106" cy="40" r="5" class="vz-node-fill"/>
        <circle cx="14" cy="40" r="2.6" class="vz-packet" style="--vz-dist:92px"/>
      </svg>`;
    },

    face() {
      const pts = [];
      // Stylized face: dotted oval outline plus feature points
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * 2 * Math.PI;
        pts.push([60 + 22 * Math.sin(a), 40 + 30 * -Math.cos(a)]);
      }
      const features = [
        [47, 26], [53, 24], [67, 24], [73, 26],   // brows
        [50, 33], [70, 33],                        // eyes
        [60, 40], [56, 45], [64, 45],              // nose
        [53, 54], [60, 57], [67, 54],              // mouth
      ];
      let mesh = "";
      for (let i = 0; i < 12; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % 12];
        mesh += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="vz-mesh"/>`;
      }
      const links = [[4, 6], [5, 6], [6, 7], [6, 8], [7, 10], [8, 10], [9, 10], [10, 11], [0, 4], [3, 5]];
      links.forEach(([a, b]) => {
        mesh += `<line x1="${features[a][0]}" y1="${features[a][1]}" x2="${features[b][0]}" y2="${features[b][1]}" class="vz-mesh"/>`;
      });
      let dots = "";
      pts.concat(features).forEach(([x, y], i) => {
        dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9" class="vz-fp" style="animation-delay:${(i * 0.14).toFixed(2)}s"/>`;
      });
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">${mesh}${dots}</svg>`;
    },

    crawler() {
      let spokes = "";
      for (let i = 0; i < 7; i++) {
        const a = (i * 360) / 7;
        spokes += `<g transform="rotate(${a.toFixed(1)} 60 40)">
          <line x1="60" y1="40" x2="94" y2="40" class="vz-line"/>
          <circle cx="94" cy="40" r="3.2" class="vz-node"/>
          <circle cx="94" cy="40" r="2" class="vz-crawl" style="animation-delay:${(i * 0.32).toFixed(2)}s"/>
        </g>`;
      }
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">${spokes}<circle cx="60" cy="40" r="5.5" class="vz-node-fill"/></svg>`;
    },

    library() {
      const heights = [30, 38, 26, 42, 32, 28, 40, 30, 36];
      let books = "";
      heights.forEach((h, i) => {
        const x = 14 + i * 10;
        books += `<rect x="${x}" y="${66 - h}" width="7" height="${h}" rx="1" class="vz-book"/>`;
      });
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">
        ${books}
        <line x1="10" y1="66" x2="110" y2="66" class="vz-line"/>
        <rect x="12" y="20" width="10" height="48" rx="2" class="vz-scan"/>
      </svg>`;
    },

    desktop() {
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">
        <rect x="30" y="8" width="78" height="50" rx="3" class="vz-win vz-win-back"/>
        <rect x="12" y="18" width="80" height="54" rx="3" class="vz-win"/>
        <line x1="12" y1="30" x2="92" y2="30" class="vz-line"/>
        <circle cx="20" cy="24" r="1.8" class="vz-dot-a"/>
        <circle cx="27" cy="24" r="1.8" class="vz-dot-b"/>
        <circle cx="34" cy="24" r="1.8" class="vz-dot-c"/>
        <line x1="20" y1="40" x2="70" y2="40" class="vz-mesh"/>
        <line x1="20" y1="47" x2="58" y2="47" class="vz-mesh"/>
        <rect x="20" y="56" width="56" height="5" rx="2.5" class="vz-track"/>
        <rect x="20" y="56" width="56" height="5" rx="2.5" class="vz-prog"/>
      </svg>`;
    },

    sky() {
      const stars = [
        [16, 54], [34, 30], [56, 40], [76, 16], [100, 32],
        [24, 14], [46, 12], [66, 28], [90, 50], [12, 34],
        [104, 14], [50, 56], [84, 38], [30, 46],
      ];
      let dots = "";
      stars.forEach(([x, y], i) => {
        const key = i < 5 ? "vz-star vz-star-key" : "vz-star";
        dots += `<circle cx="${x}" cy="${y}" r="${i < 5 ? 2 : 1.3}" class="${key}" style="animation-delay:${(i * 0.24).toFixed(2)}s"/>`;
      });
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">
        ${dots}
        <polyline points="16,54 34,30 56,40 76,16 100,32" class="vz-const"/>
        <path d="M6,74 Q60,58 114,74" class="vz-line"/>
      </svg>`;
    },

    evalviz() {
      const check = (x, y, d) =>
        `<path d="M ${x - 3} ${y} l 2.2 2.6 l 4 -5.2" class="vz-mark" style="animation-delay:${d}s"/>`;
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">
        <line x1="14" y1="34" x2="104" y2="34" class="vz-line"/>
        <path d="M58,34 L80,58" class="vz-line" stroke-dasharray="3 3"/>
        <path d="M80,58 L104,38" class="vz-line" stroke-dasharray="3 3"/>
        <circle cx="14" cy="34" r="5" class="vz-node"/>
        <circle cx="36" cy="34" r="5" class="vz-node"/>
        <circle cx="58" cy="34" r="5" class="vz-node"/>
        <circle cx="80" cy="34" r="5" class="vz-node"/>
        <circle cx="104" cy="34" r="5" class="vz-node"/>
        <circle cx="80" cy="58" r="5" class="vz-node"/>
        ${check(14, 34, 0.2)}${check(36, 34, 0.7)}${check(58, 34, 1.2)}
        <path d="M77,31 l6,6 M83,31 l-6,6" class="vz-mark vz-x" style="animation-delay:1.7s"/>
        ${check(80, 58, 2.2)}${check(104, 34, 2.7)}
      </svg>`;
    },

    homelab() {
      let hosts = "";
      [10, 46, 82].forEach((hx, h) => {
        hosts += `<rect x="${hx}" y="12" width="28" height="32" rx="3" class="vz-win"/>`;
        [[4, 5], [12, 5], [20, 5], [4, 15], [12, 15], [20, 15]].forEach(([dx, dy], v) => {
          hosts += `<rect x="${hx + dx}" y="${12 + dy}" width="6" height="6" rx="1.2" class="vz-vm" style="animation-delay:${(h * 0.5 + v * 0.18).toFixed(2)}s"/>`;
        });
        hosts += `<line x1="${hx + 14}" y1="44" x2="${hx + 14}" y2="62" class="vz-line"/>`;
      });
      return `<svg viewBox="0 0 120 80" xmlns="${NS}">
        ${hosts}
        <line x1="24" y1="62" x2="96" y2="62" class="vz-line"/>
        <circle cx="24" cy="62" r="2.4" class="vz-packet" style="--vz-dist:72px"/>
      </svg>`;
    },
  };

  /* ---------------------------------------------------------------- */
  /* Project cards                                                     */
  /* ---------------------------------------------------------------- */
  function renderProjects() {
    const list = document.getElementById("project-list");
    if (!list || typeof PROJECTS === "undefined") return;

    list.innerHTML = PROJECTS.map(
      (p) => `
      <details class="project-card">
        <summary>
          <span class="project-index">${p.index}</span>
          <span class="project-summary-text">
            <span class="project-name">${p.name}</span>
            <span class="project-desc">${p.summary}</span>
          </span>
          <span class="project-viz" aria-hidden="true">${VIZ[p.viz] ? VIZ[p.viz]() : ""}</span>
          <span class="project-scale">${p.scale}</span>
          <span class="project-chevron" aria-hidden="true"></span>
        </summary>
        <div class="project-detail">
          <ul>${p.detail.map((d) => `<li>${d}</li>`).join("")}</ul>
          <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        </div>
      </details>`
    ).join("");
  }

  function renderMoreBuilds() {
    const ul = document.getElementById("more-builds-list");
    if (!ul || typeof MORE_BUILDS === "undefined") return;
    ul.innerHTML = MORE_BUILDS.map(
      (b) => `<li><strong>${b.name}</strong> · <span>${b.desc}</span></li>`
    ).join("");
  }

  function renderTimeline() {
    const ol = document.getElementById("timeline-list");
    if (!ol || typeof TIMELINE === "undefined") return;
    ol.innerHTML = TIMELINE.map(
      (t) => `
      <li class="timeline-item">
        <div class="timeline-period">${t.period}</div>
        <div class="timeline-body">
          <h3>${t.role}</h3>
          <p class="timeline-org">${t.org}</p>
          <p class="timeline-note">${t.note}</p>
        </div>
      </li>`
    ).join("");
  }

  /* ---------------------------------------------------------------- */
  /* Hero terminal. Content lives in the static HTML (also the        */
  /* no-JS and reduced-motion fallback); this types it line by line.  */
  /* ---------------------------------------------------------------- */
  function initTerminal() {
    const body = document.getElementById("term-body");
    if (!body || prefersReducedMotion) return;

    const lines = Array.from(body.querySelectorAll(".term-line"));
    const cursor = body.querySelector(".term-cursor");
    if (!lines.length) return;

    lines.forEach((l) => l.classList.add("term-hidden"));
    let i = 0;

    function showNext() {
      if (i >= lines.length) return;
      const line = lines[i++];
      line.classList.remove("term-hidden");
      if (cursor) line.appendChild(cursor);
      const cmd = line.querySelector(".term-cmd");
      if (cmd) {
        const full = cmd.textContent;
        cmd.textContent = "";
        let c = 0;
        (function type() {
          if (c < full.length) {
            cmd.textContent += full[c++];
            setTimeout(type, 30 + Math.random() * 45);
          } else {
            setTimeout(showNext, 320);
          }
        })();
      } else {
        setTimeout(showNext, 260);
      }
    }

    setTimeout(showNext, 500);
  }

  /* ---------------------------------------------------------------- */
  /* Stat counters — animate into view once, respects reduced motion  */
  /* ---------------------------------------------------------------- */
  function initStatCounters() {
    const nums = document.querySelectorAll(".stat-num");
    if (!nums.length) return;

    const animate = (node) => {
      const target = parseFloat(node.dataset.count);
      const suffix = node.dataset.suffix || "";
      if (prefersReducedMotion) {
        node.textContent = target + suffix;
        return;
      }
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    nums.forEach((n) => obs.observe(n));
  }

  /* ---------------------------------------------------------------- */
  /* Mobile nav                                                        */
  /* ---------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.hidden = true;
    };
    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      nav.hidden = false;
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? close() : open();
    });

    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        close();
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Init                                                              */
  /* ---------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initSkills();
    renderProjects();
    renderMoreBuilds();
    renderTimeline();
    initTerminal();
    initStatCounters();
    initMobileNav();

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
