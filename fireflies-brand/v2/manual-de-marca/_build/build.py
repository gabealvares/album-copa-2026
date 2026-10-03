import json, re, os
from PIL import Image
V = '/home/user/album-copa-2026/fireflies-brand/v2/'
OUT = V + 'manual-de-marca/'
HERE = os.path.dirname(__file__)
tpl = open(HERE + '/tpl.html', encoding='utf-8').read()

def clean_svg(s):
    s = re.sub(r'<\?xml[^>]*\?>', '', s)
    return s.strip()

# logo da capa
logo = clean_svg(open(V + 'logo/svg/fireflies_horizontal_digital-negativo.svg', encoding='utf-8').read())
logo = logo.replace('<svg ', '<svg role="img" aria-label="Fireflies Consultoria" ', 1)
logo = re.sub(r'<title>.*?</title>', '', logo, count=1)

fav = clean_svg(open(V + 'logo/svg/fireflies_favicon_digital-negativo.svg', encoding='utf-8').read())
fav = re.sub(r'<title>.*?</title>', '', fav).replace('<svg ', '<svg aria-hidden="true" focusable="false" ', 1)
fav_side = fav
fav_top = fav.replace('ff-fv-dn-c', 'ff-fv-dn-c2')

# nav
secs = [('capa', 'Capa'), ('marca', 'A marca'), ('simbolo', 'O símbolo'), ('logo', 'Logo'), ('cores', 'Cores'),
        ('tipografia', 'Tipografia'), ('iconografia', 'Iconografia'), ('aplicacao', 'Aplicação'),
        ('aplicacoes', 'Aplicações'), ('voz', 'Voz'), ('arquivos', 'Arquivos'), ('historico', 'Como chegamos aqui')]
nav = ''.join(f'<li><a href="#{i}"><span class="n">{n+1:02d}</span>{t}</a></li>' for n, (i, t) in enumerate(secs))

# sprite
sprite = open(V + 'iconografia/icones/sprite.svg', encoding='utf-8').read()
sprite = clean_svg(sprite).replace('<svg ', '<svg aria-hidden="true" ', 1)

# ícones
cats = json.load(open(V + 'iconografia/_build/icones.json', encoding='utf-8'))
ih = ''
for cat, names in cats:
    ih += f'<div class="ico-cat"><h4>{cat} <span>{len(names)}</span></h4><div class="icos">'
    for n in names:
        ih += f'<div><svg aria-hidden="true" focusable="false"><use href="#ff-{n}"/></svg><span>{n}</span></div>'
    ih += '</div></div>'

# constelações
consts = [('auditoria', 'Auditoria', 'Lens'), ('contabil', 'Contábil', 'Ratio'), ('fiscal', 'Fiscal', 'Libra Fisci'),
          ('financeira', 'Financeira', 'Ascensio'), ('processos', 'Processos', 'Fluxus'), ('sindicancia', 'Sindicância', 'Oculus'),
          ('condominios', 'Condomínios', 'Domus'), ('academy', 'Academy', 'Liber')]
ch = '<div class="consts">'
for f, nome, lat in consts:
    s = clean_svg(open(V + f'iconografia/constelacoes/svg/{f}.svg', encoding='utf-8').read())
    s = re.sub(r'<title>.*?</title>', '', s)
    s = re.sub(r' width="\d+" height="\d+"', '', s, count=1)
    s = s.replace('<svg ', '<svg aria-hidden="true" focusable="false" ', 1)
    cls = ' class="acesa"' if f == 'condominios' else ''
    ch += f'<figure{cls}>{s}<figcaption>{nome}<br><i>{lat}</i></figcaption></figure>'
ch += '</div>'

# swatches
tk = json.load(open(V + 'cores/tokens.json', encoding='utf-8'))
order = [('anil', 1), ('cal', 1), ('branco', 1), ('ambar', 0), ('vermelhao', 0), ('rubrica', 0), ('ceu', 0),
         ('anil-profundo', 0), ('fuligem', 0), ('pedra', 0), ('fumaca', 0), ('sucesso', 0), ('alerta', 0), ('erro', 0)]
sw = ''
for k, big in order:
    c = dict(tk[k])
    if k == 'ambar': c['uso'] = 'A luz: o vagalume do logo e o E de luz no escuro. Um ponto por composição. Nunca texto no claro'
    pant = c['pantone_aprox'].replace('≈ ', '').replace('—', '-')
    sw += (f'<div class="sw{" big" if big else ""}"><div class="chip" style="background:{c["hex"]}"></div><div class="info">'
           f'<p class="nome">{c["nome"]}</p><dl><dt>HEX</dt><dd>{c["hex"]}</dd><dt>RGB</dt><dd>{" ".join(map(str, c["rgb"]))}</dd>'
           f'<dt>CMYK</dt><dd>{" ".join(map(str, c["cmyk_fogra39"]))}</dd><dt>Pantone</dt><dd>{pant}</dd></dl>'
           f'<p class="papel">{c["uso"]}</p>'
           f'<button type="button" class="copiar" data-hex="{c["hex"]}" aria-label="Copiar HEX {c["hex"]} de {c["nome"]}">Copiar {c["hex"]}</button></div></div>')

# contraste a partir de _matriz.md
rows = [l for l in open(V + 'cores/_matriz.md', encoding='utf-8').read().splitlines() if l.startswith('| **')]
head = ['Branco', 'Cal Virgem', 'Anil', 'Âmbar', 'Rubrica']
ct = '<table class="ctr"><thead><tr><th scope="col">Texto sobre</th>' + ''.join(f'<th scope="col">{h}</th>' for h in head) + '</tr></thead><tbody>'
for r in rows:
    cells = [x.strip() for x in r.strip('|').split('|')]
    nome = cells[0].strip('*')
    ct += f'<tr><th scope="row">{nome}</th>'
    for v in cells[1:]:
        if v in ('—', '-', ''):
            ct += '<td class="nao">-</td>'; continue
        num, sym = v.split(' ')
        cls = {'✔': 'ok', '◐': 'meio', '✖': 'nao'}[sym]
        ct += f'<td class="{cls}"><b>{sym}</b> {num}</td>'
    ct += '</tr>'
ct += '</tbody></table>'

# galeria
def dims(n):
    im = Image.open(OUT + 'img/' + n); return im.size
groups = [
 ('Apresentação', '8 slides-mestre 16:9 · SVG, PNG 4K, PDF, HTML editável', [
   ('app-apresentacao-slide-01-capa-escura.jpg', 'w6', 'Capa escura'), ('app-apresentacao-slide-03-divisor.jpg', 'w6', 'Divisor'),
   ('app-apresentacao-slide-04-conteudo.jpg', 'w4', 'Conteúdo com ícones'), ('app-apresentacao-slide-05-dados.jpg', 'w4', 'Dados: a barra âmbar é a luz'),
   ('app-apresentacao-slide-08-encerramento.jpg', 'w4', 'Encerramento')]),
 ('Documentos', 'A4 · proposta, relatório, parecer, timbrado', [
   ('app-documentos-proposta-comercial-01-capa.jpg', 'w3', 'Proposta, capa'), ('app-documentos-proposta-comercial-02-interna.jpg', 'w3', 'Proposta, interna'),
   ('app-documentos-relatorio-auditoria-01-capa.jpg', 'w3', 'Relatório de auditoria, capa'), ('app-documentos-relatorio-auditoria-02-interna.jpg', 'w3', 'Resumo para o conselho'),
   ('app-documentos-parecer-tecnico-A4.jpg', 'w3', 'Parecer técnico'), ('app-documentos-papel-timbrado-A4-escritorio.jpg', 'w3', 'Papel timbrado')]),
 ('Papelaria', 'Cartão, envelope, pasta, crachá, certificado', [
   ('app-papelaria-cartao-visita-frente.jpg', 'w4', 'Cartão, frente'), ('app-papelaria-cartao-visita-verso.jpg', 'w4', 'Cartão, verso'),
   ('app-papelaria-cracha-54x86mm.jpg', 'w2', 'Crachá'), ('app-papelaria-pasta-A4-frente.jpg', 'w2', 'Pasta A4'),
   ('app-papelaria-envelope-dl-frente.jpg', 'w6', 'Envelope DL'), ('app-papelaria-certificado-academy-A4-paisagem.jpg', 'w6', 'Certificado Academy')]),
 ('Digital', 'OG, e-mail, LinkedIn, avatar, videochamada', [
   ('app-digital-og-image-1200x630.jpg', 'w8', 'OG image'), ('app-digital-avatar-1080.jpg', 'w4', 'Avatar'),
   ('app-digital-assinatura-email-preview.jpg', 'w6', 'Assinatura de e-mail'), ('app-digital-fundo-videochamada-1920x1080.jpg', 'w6', 'Fundo de videochamada'),
   ('app-digital-linkedin-capa-1128x191.jpg', 'w12', 'Capa do LinkedIn')]),
 ('Redes', 'Feed 4:5, carrossel, story, LinkedIn', [
   ('app-redes-instagram-01-manifesto.jpg', 'w3', 'Manifesto'), ('app-redes-instagram-02-dado.jpg', 'w3', 'Dado'),
   ('app-redes-instagram-03-dica-sindico.jpg', 'w3', 'Dica para síndico'), ('app-redes-carrossel-01-capa.jpg', 'w3', 'Carrossel, capa'),
   ('app-redes-story-1080x1920.jpg', 'w3', 'Story'), ('app-redes-linkedin-post-1200x627.jpg', 'w6', 'Post LinkedIn')]),
 ('Ambientação', 'Placa, selo, brindes', [
   ('app-ambientacao-placa-fachada-600x300mm.jpg', 'w8', 'Placa de fachada 600×300 mm'), ('app-ambientacao-selo-contas-auditadas-digital-1080.jpg', 'w4', 'Selo de contas auditadas'),
   ('app-ambientacao-mockup-caneca.jpg', 'w6', 'Caneca, serigrafia chapada'), ('app-ambientacao-mockup-camiseta.jpg', 'w6', 'Camiseta')]),
]
gh = ''
for g, nota, items in groups:
    gh += f'<div class="grupo"><header><h3>{g}</h3><p>{nota}</p></header><div class="gal">'
    for f, w, cap in items:
        W, H = dims(f)
        gh += f'<figure class="{w}"><img src="img/{f}" width="{W}" height="{H}" loading="lazy" alt="{g}: {cap}"><figcaption>{cap}</figcaption></figure>'
    gh += '</div></div>'

html = (tpl.replace('{{LOGO_CAPA}}', logo).replace('{{NAV}}', nav).replace('{{SPRITE}}', sprite)
        .replace('{{ICONES}}', ih).replace('{{CONSTELACOES}}', ch).replace('{{SWATCHES}}', sw)
        .replace('{{CONTRASTE}}', ct).replace('{{GALERIA}}', gh))
html = html.replace('{{FAVICON}}', fav_side, 1).replace('{{FAVICON}}', fav_top, 1)
assert '{{' not in html
open(OUT + 'index.html', 'w', encoding='utf-8').write(html)
print(len(html))
