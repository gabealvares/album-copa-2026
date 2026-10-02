// Revisão de leitura: todos os ícones a 20 px, DPR 1, no claro e no escuro (ampliado depois com PIL)
const fs = require('fs'), path = require('path');
const { ROOT, COR, shot } = require('./lib');
const sprite = fs.readFileSync(path.join(ROOT, 'icones', 'sprite.svg'), 'utf8');
const G = JSON.parse(fs.readFileSync(path.join(__dirname, 'icones.json')));
const names = G.flatMap(g => g[1]);
const row = (bg, fg, edge) => `<div style="background:${bg};color:${fg};--ff-lit:${COR.ambar};--ff-lit-edge:${edge};display:grid;grid-template-columns:repeat(20,28px);gap:0;padding:8px">${names.map(n => `<svg width="20" height="20" style="margin:4px"><use href="#ff-${n}"/></svg>`).join('')}</div>`;
shot(`<!doctype html><body style="margin:0;width:576px">${sprite}${row(COR.cal, COR.anil, COR.anil)}${row(COR.anil, COR.cal, 'none')}</body>`, path.join(__dirname, 'review', 'r20.png'), 576).then(() => {
  require('child_process').execSync(`python3 -c "from PIL import Image; im=Image.open('review/r20.png'); im.resize((im.width*3, im.height*3), Image.NEAREST).save('review/r20x3.png')"`, { cwd: __dirname });
});
