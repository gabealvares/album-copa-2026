/* Fireflies Consultoria · elementos gráficos da marca
   Desenha, a partir de atributos data-*, os três recursos do sistema:
   - constelação: <svg data-ff="constelacao" data-w data-h data-seed data-step data-chains data-len data-stars data-lit="fx,fy" data-avoid="x0,y0,x1,y1;..." data-region="x0,y0,x1,y1" data-r data-sw>
   - matriz de pontos: <svg data-ff="matriz" data-values="3,5,8" data-max data-rows data-cols data-gap data-r data-bargap data-on="2|all" data-alert="1" data-track="1" data-labels="A,B" data-labsize>
   - órbita: <svg data-ff="orbita" data-size data-a0 data-a1 data-sw>  (graus, 0 = direita, sentido horário)
   - grade de pontos: <svg data-ff="grade" data-cols data-rows data-gap data-r data-lit="índice">  (ex.: 30 dias, 1 aceso)
   - glifo em pontos: <svg data-ff="glifo" data-bits="11111,10000,..." data-gap data-r>  (número desenhado em matriz)
   Cores vêm das variáveis CSS do tema (.noite / .papel em base.css).
   Mantém um único nó aceso por constelação (regra da marca). */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const num = (v, d) => (v === undefined || v === '' ? d : parseFloat(v));
  function rng(seed) { let s = (seed * 2654435761) >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  const rects = (str) => (str ? str.split(';').map(r => r.split(',').map(Number)) : []);

  function constelacao(svg) {
    const d = svg.dataset, W = num(d.w, 1000), H = num(d.h, 1000);
    const step = num(d.step, 80), r = num(d.r, 4), sw = num(d.sw, 1.5), R = rng(num(d.seed, 1));
    const region = d.region ? d.region.split(',').map(Number) : [0, 0, 1, 1];
    const avoid = rects(d.avoid);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const rowH = step * Math.sqrt(3) / 2;
    const cols = Math.ceil(W / step) + 2, rows = Math.ceil(H / rowH) + 2;
    const pos = (i, j) => [i * step + (j % 2 ? step / 2 : 0) - step / 2, j * rowH - rowH / 2];
    const ok = (i, j) => {
      const [x, y] = pos(i, j), fx = x / W, fy = y / H;
      if (fx < region[0] || fy < region[1] || fx > region[2] || fy > region[3]) return false;
      return !avoid.some(a => fx > a[0] && fx < a[2] && fy > a[1] && fy < a[3]);
    };
    const nb = (i, j) => { const o = j % 2 ? 1 : 0; return [[i + 1, j], [i - 1, j], [i - 1 + o, j - 1], [i + o, j - 1], [i - 1 + o, j + 1], [i + o, j + 1]]; };
    const nodes = new Map(), edges = new Set();
    const key = (i, j) => i + ':' + j;
    const chains = num(d.chains, 5), len = num(d.len, 5);
    for (let c = 0, tries = 0; c < chains && tries < 500; tries++) {
      const i = Math.floor(R() * cols), j = Math.floor(R() * rows);
      if (!ok(i, j) || nodes.has(key(i, j))) continue;
      c++;
      let ci = i, cj = j; nodes.set(key(ci, cj), [ci, cj]);
      for (let s = 0; s < len; s++) {
        const cand = nb(ci, cj).filter(([a, b]) => ok(a, b));
        if (!cand.length) break;
        const [ni, nj] = cand[Math.floor(R() * cand.length)];
        const ek = [key(ci, cj), key(ni, nj)].sort().join('|');
        edges.add(ek); nodes.set(key(ni, nj), [ni, nj]); ci = ni; cj = nj;
      }
    }
    const gL = el('g', {}, svg), gS = el('g', {}, svg), gN = el('g', {}, svg);
    edges.forEach(ek => { const [a, b] = ek.split('|').map(k => nodes.get(k)); const [x1, y1] = pos(...a), [x2, y2] = pos(...b); el('line', { x1, y1, x2, y2, class: 'c-line', 'stroke-width': sw }, gL); });
    // estrelas soltas (pontos pequenos, sem linha)
    const stars = num(d.stars, 0);
    for (let s = 0, t = 0; s < stars && t < 2000; t++) {
      const i = Math.floor(R() * cols), j = Math.floor(R() * rows);
      if (!ok(i, j) || nodes.has(key(i, j))) continue; s++;
      const [x, y] = pos(i, j); el('circle', { cx: x, cy: y, r: r * .5, class: 'c-star' }, gS);
    }
    let lit = null;
    if (d.lit) {
      const [fx, fy] = d.lit.split(',').map(Number); let best = 1e9;
      nodes.forEach(n => { const [x, y] = pos(...n); const dd = (x - fx * W) ** 2 + (y - fy * H) ** 2; if (dd < best) { best = dd; lit = n; } });
    }
    nodes.forEach(n => {
      const [x, y] = pos(...n);
      if (n === lit) { el('circle', { cx: x, cy: y, r: r * 3.2, class: 'c-halo', 'stroke-width': sw }, gN); el('circle', { cx: x, cy: y, r: r * 1.6, class: 'c-lit' }, gN); }
      else el('circle', { cx: x, cy: y, r, class: 'c-node' }, gN);
    });
  }

  function matriz(svg) {
    const d = svg.dataset;
    const vals = d.values.split(',').map(Number), n = vals.length;
    const max = num(d.max, Math.max(...vals)), rows = num(d.rows, 16), cols = num(d.cols, 3);
    const gap = num(d.gap, 14), r = num(d.r, 4), bargap = num(d.bargap, gap * 2);
    const labels = d.labels ? d.labels.split(',') : null, ls = num(d.labsize, 14);
    const on = d.on === 'all' ? vals.map((_, i) => i) : (d.on ? d.on.split(',').map(Number) : []);
    const alert = d.alert ? d.alert.split(',').map(Number) : [];
    const barW = (cols - 1) * gap;
    const W = n * barW + (n - 1) * bargap, Hd = (rows - 1) * gap;
    const H = Hd + (labels ? ls * 2.6 : 0);
    svg.setAttribute('viewBox', `${-r} ${-r} ${W + 2 * r} ${H + 2 * r}`);
    vals.forEach((v, b) => {
      const filled = Math.max(1, Math.round(v / max * rows));
      const cls = alert.includes(b) ? 'm-alert' : on.includes(b) ? 'm-on' : 'm-off';
      const x0 = b * (barW + bargap);
      for (let row = 0; row < rows; row++) {
        const isOn = row < filled;
        if (!isOn && !d.track) continue;
        for (let c = 0; c < cols; c++) {
          el('circle', { cx: x0 + c * gap, cy: Hd - row * gap, r, class: isOn ? cls : 'm-off', opacity: isOn ? 1 : .35 }, svg);
        }
      }
      if (labels) { const t = el('text', { x: x0 + barW / 2, y: Hd + ls * 2.1, 'text-anchor': 'middle', 'font-size': ls, class: 'm-lab' }, svg); t.textContent = labels[b]; }
    });
  }

  function orbita(svg) {
    const d = svg.dataset, S = num(d.size, 1000), sw = num(d.sw, 40);
    const a0 = num(d.a0, -60) * Math.PI / 180, a1 = num(d.a1, 200) * Math.PI / 180;
    const c = S / 2, rr = c - sw / 2;
    const p = a => [c + rr * Math.cos(a), c + rr * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    const large = (a1 - a0) % (2 * Math.PI) > Math.PI ? 1 : 0;
    svg.setAttribute('viewBox', `0 0 ${S} ${S}`);
    el('path', { d: `M${x0} ${y0}A${rr} ${rr} 0 ${large} 1 ${x1} ${y1}`, class: 'orb', 'stroke-width': sw }, svg);
  }

  function grade(svg) {
    const d = svg.dataset, C = num(d.cols, 10), Rw = num(d.rows, 3), g = num(d.gap, 30), r = num(d.r, 6);
    const lit = d.lit === undefined ? -1 : num(d.lit), off = num(d.offopacity, 1);
    svg.setAttribute('viewBox', `${-r * 3} ${-r * 3} ${(C - 1) * g + r * 6} ${(Rw - 1) * g + r * 6}`);
    for (let k = 0; k < C * Rw; k++) {
      const x = (k % C) * g, y = Math.floor(k / C) * g;
      if (k === lit) { el('circle', { cx: x, cy: y, r: r * 2.4, class: 'c-halo', 'stroke-width': r * .35 }, svg); el('circle', { cx: x, cy: y, r: r * 1.25, class: 'c-lit' }, svg); }
      else el('circle', { cx: x, cy: y, r, class: 'm-off', opacity: off }, svg);
    }
  }
  function glifo(svg) {
    const d = svg.dataset, rows = d.bits.split(','), g = num(d.gap, 30), r = num(d.r, 11);
    const C = rows[0].length;
    svg.setAttribute('viewBox', `${-r} ${-r} ${(C - 1) * g + 2 * r} ${(rows.length - 1) * g + 2 * r}`);
    rows.forEach((row, j) => [...row].forEach((b, i) => el('circle', { cx: i * g, cy: j * g, r, class: b === '1' ? 'm-on' : 'm-off', opacity: b === '1' ? 1 : .5 }, svg)));
  }

  const fns = { constelacao, matriz, orbita, grade, glifo };
  document.querySelectorAll('svg[data-ff]').forEach(s => fns[s.dataset.ff] && fns[s.dataset.ff](s));
  window.FF_READY = true;
})();
