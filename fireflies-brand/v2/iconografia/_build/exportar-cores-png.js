// Gera SVGs com cores aplicadas (claro / escuro / mono-anil) e PNGs transparentes
// de ícones, constelações e ornamentos; e PNG 2000 px dos padrões.
// Uso: node _build/exportar-cores-png.js
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const ROOT = path.resolve(__dirname, '..');
const V = {
  claro:     { fg: '#17183A', line: '#5E6271', lit: '#F2B544', edge: '#17183A' },
  escuro:    { fg: '#EDEEEA', line: '#6E89B4', lit: '#F2B544', edge: 'none' },
  'mono-anil': { fg: '#17183A', line: '#17183A', lit: '#17183A', edge: 'none' },
};
function bake(svg, c) {
  return svg
    .replace(/var\(--ff-lit-edge,\s*[^)]*\)/g, c.edge)
    .replace(/var\(--ff-lit,\s*[^)]*\)/g, c.lit)
    .replace(/var\(--ff-line,\s*[^)]*\)/g, c.line)
    .replace(/var\(--ff-[a-z-]+,\s*([^)]*)\)/g, '$1')
    .replace(/currentColor/g, c.fg);
}
const SETS = [
  { dir: 'icones', src: 'icones/svg', px: 512 },
  { dir: 'constelacoes', src: 'constelacoes/svg', px: 1024 },
  { dir: 'ornamentos', src: 'ornamentos/svg', px: 1024 },
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  let n = 0;
  for (const s of SETS) {
    const files = fs.readdirSync(path.join(ROOT, s.src)).filter(f => f.endsWith('.svg'));
    for (const [vn, c] of Object.entries(V)) {
      const sd = path.join(ROOT, s.dir, 'svg-' + vn), pd = path.join(ROOT, s.dir, 'png-' + vn);
      fs.mkdirSync(sd, { recursive: true }); fs.mkdirSync(pd, { recursive: true });
      for (const f of files) {
        const out = bake(fs.readFileSync(path.join(ROOT, s.src, f), 'utf8'), c);
        fs.writeFileSync(path.join(sd, f), out);
        const vb = (out.match(/viewBox="([^"]+)"/) || [, '0 0 24 24'])[1].split(/[ ,]+/).map(Number);
        const w = s.px, h = Math.round(s.px * vb[3] / vb[2]);
        const sized = out.replace(/<svg([^>]*?)\swidth="[^"]*"/, '<svg$1').replace(/<svg([^>]*?)\sheight="[^"]*"/, '<svg$1').replace('<svg', `<svg width="${w}" height="${h}"`);
        await p.setViewportSize({ width: w, height: h });
        await p.setContent(`<html><body style="margin:0;background:transparent">${sized}</body></html>`);
        await p.locator('svg').first().screenshot({ path: path.join(pd, f.replace('.svg', '.png')), omitBackground: true });
        n++;
      }
    }
  }
  const pdir = path.join(ROOT, 'padroes'), pp = path.join(pdir, 'png'); fs.mkdirSync(pp, { recursive: true });
  for (const f of fs.readdirSync(pdir).filter(f => f.endsWith('.svg'))) {
    const svg = fs.readFileSync(path.join(pdir, f), 'utf8');
    await p.setViewportSize({ width: 2000, height: 2000 });
    await p.setContent(`<html><body style="margin:0"><div style="width:2000px;height:2000px;background:url('data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}') repeat"></div></body></html>`);
    await p.locator('div').screenshot({ path: path.join(pp, f.replace('.svg', '-2000.png')) }); n++;
  }
  await b.close(); console.log('ok', n, 'arquivos');
})();
