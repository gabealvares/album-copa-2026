// Gera os QR codes usados nas peças (SVG vetorial, cor Noite, sem fundo).
// Edite os destinos aqui e rode: node gerar-qr.js
const QR = require('qrcode');
const fs = require('fs');
const path = require('path');
const alvos = {
  'whatsapp': 'https://wa.me/5511982450527',
  // URL de verificação de certificado: ROTA A CONFIRMAR no site antes de imprimir
  'certificado-exemplo': 'https://fireflies.com.br/academy/verificar?c=FA-2026-0001',
};
(async () => {
  for (const [nome, url] of Object.entries(alvos)) {
    for (const [sufixo, cor] of [['noite', '#06262B'], ['papel', '#F3F5F7']]) {
      const svg = await QR.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 0, color: { dark: cor, light: '#0000' } });
      fs.writeFileSync(path.join(__dirname, 'qr', `${nome}-${sufixo}.svg`), svg);
    }
  }
  console.log('QR ok');
})();
