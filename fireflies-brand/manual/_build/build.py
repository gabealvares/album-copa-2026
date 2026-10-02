#!/usr/bin/env python3
"""Gera manual/index.html: o manual de marca da Fireflies Consultoria.

Lê os SVGs finais de logo/ e icones/, os tokens de cores/tokens.json e as
prévias de aplicacoes/ (copiadas para manual/img/). Rode da raiz do pacote:
    python3 manual/_build/build.py
"""
import json, re, shutil, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANUAL = ROOT / "manual"
IMG = MANUAL / "img"
IMG.mkdir(exist_ok=True)


def svg(path, cls="", label=None):
    s = (ROOT / path).read_text()
    s = re.sub(r"<\?xml[^>]*>", "", s).strip()
    attrs = f' class="{cls}"' if cls else ""
    if label:
        s = re.sub(r'aria-label="[^"]*"', f'aria-label="{label}"', s, count=1)
    return s.replace("<svg ", f"<svg{attrs} ", 1)


def logo(versao, cor, cls="logo"):
    return svg(f"logo/svg/fireflies_logo_{versao}_{cor}.svg", cls)


tokens = json.loads((ROOT / "cores/tokens.json").read_text())
cores = tokens["cores"]
escalas = tokens["escalas"]

# ---------- ícones ----------
sprite = (ROOT / "icones/sprite.svg").read_text()
icon_names = re.findall(r'<symbol id="ff-([a-z-]+)"', sprite)
grupos = {
    "Serviços": ["auditoria", "contabil", "fiscal", "financeiro", "gestao-processos", "sindicancia", "academy", "condominio"],
    "Conceitos": ["diagnostico", "organizacao", "fechamento", "rotina", "painel-mensal", "conciliacao", "relatorio", "indicador",
                  "fluxo-de-caixa", "imposto", "folha-pagamento", "inadimplencia", "fundo-reserva", "planejamento-tributario",
                  "erp-tecnologia", "compliance", "contrato", "calendario-prazo"],
    "Pessoas e contato": ["responsavel", "equipe", "reuniao", "whatsapp-conversa", "email", "telefone", "localizacao"],
    "Interface": ["seta-direita", "check", "alerta"],
}
assert sorted(sum(grupos.values(), [])) == sorted(icon_names), set(icon_names) ^ set(sum(grupos.values(), []))


def ico(name, size=24):
    return f'<svg class="ico" width="{size}" height="{size}" aria-hidden="true"><use href="#ff-{name}"/></svg>'


icon_html = ""
for g, names in grupos.items():
    icon_html += f'<h4 class="eyebrow">{g}</h4><div class="icon-grid">'
    for n in names:
        icon_html += f'<figure class="icon-cell">{ico(n, 32)}<figcaption>{n}</figcaption></figure>'
    icon_html += "</div>"

# ---------- cores ----------
ordem_principais = ["noite", "vagalume", "oliva", "papel", "tinta"]
ordem_apoio = ["noite-funda", "mare", "nevoa", "pedra", "linha", "brasa", "brasa-escura"]


def swatch(k, big=False):
    c = cores[k]
    hexv = c["hex"]
    dark_text = c["contraste"]["sobre_noite"] > c["contraste"]["sobre_papel"]
    fg = "#06262B" if dark_text else "#F3F5F7"
    ink = "tinta" if dark_text else "papel"
    return f'''<div class="sw{' sw-big' if big else ''}" style="--c:{hexv};--on:{fg}">
  <div class="sw-chip"><span class="sw-name">{c['nome']}</span><button class="copy" data-copy="{hexv}" type="button">{hexv}</button></div>
  <dl class="sw-data">
    <div><dt>RGB</dt><dd>{' '.join(map(str, c['rgb']))}</dd></div>
    <div><dt>CMYK</dt><dd>{' '.join(map(str, c['cmyk_aprox']))}</dd></div>
    <div><dt>Pantone</dt><dd>{c['pantone_aprox'].replace('Pantone ', '')}</dd></div>
  </dl>
  <p class="sw-use">{c['uso']}</p>
</div>'''


principais = "".join(swatch(k, True) for k in ordem_principais)
apoio = "".join(swatch(k) for k in ordem_apoio)


def escala(k):
    cells = "".join(
        f'<div class="sc" style="background:{v}" title="{k}-{n} {v}"><span style="color:{"#06262B" if n in ("50","100","200","300") or (k=="vagalume" and n in ("400","500","600")) else "#F3F5F7"}">{n}</span></div>'
        for n, v in escalas[k].items())
    return f'<div class="scale"><span class="scale-name">{cores[k]["nome"]}</span><div class="scale-row">{cells}</div></div>'


escalas_html = "".join(escala(k) for k in ["noite", "vagalume", "oliva", "brasa"])

pares = [
    ("Papel", "#F3F5F7", "Noite", "#06262B"),
    ("Vagalume", "#D9F24A", "Noite", "#06262B"),
    ("Brasa", "#F5A524", "Noite", "#06262B"),
    ("Tinta", "#0E1726", "Papel", "#F3F5F7"),
    ("Oliva", "#5E6E00", "Papel", "#F3F5F7"),
    ("Pedra", "#5A6570", "Papel", "#F3F5F7"),
    ("Brasa Escura", "#B54708", "Papel", "#F3F5F7"),
    ("Vagalume", "#D9F24A", "Papel", "#F3F5F7"),
]


def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [v / 12.92 if v <= .03928 else ((v + .055) / 1.055) ** 2.4 for v in c]
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]


def ratio(a, b):
    x, y = lum(a), lum(b)
    return (max(x, y) + .05) / (min(x, y) + .05)


contraste_html = ""
for fn, fh, bn, bh in pares:
    r = ratio(fh, bh)
    nivel = "AAA" if r >= 7 else "AA" if r >= 4.5 else "AA grande" if r >= 3 else "Reprovado"
    ok = "ok" if r >= 4.5 else "warn" if r >= 3 else "bad"
    contraste_html += f'''<div class="pair" style="background:{bh};color:{fh}">
  <span class="pair-aa">Aa</span><span class="pair-txt">{fn} sobre {bn}</span>
  <span class="pair-r {ok}">{r:.2f}:1 · {nivel}</span></div>'''.replace(f"{r:.2f}", f"{r:.2f}".replace(".", ","))

# ---------- usos incorretos ----------
H = logo("horizontal", "positivo", "logo")
erros = [
    ("Não distorça nem estique.", f'<div class="wrong-box"><div style="transform:scaleX(1.45);transform-origin:left">{H}</div></div>'),
    ("Não gire.", f'<div class="wrong-box"><div style="transform:rotate(-12deg)">{H}</div></div>'),
    ("Não recolora nós ou partes do símbolo.",
     f'<div class="wrong-box">{H.replace("#06262B", "#2F7D55", 3)}</div>'),
    ("Não aplique gradiente, brilho ou sombra.",
     f'<div class="wrong-box"><div style="filter:drop-shadow(0 0 8px #D9F24A) drop-shadow(4px 6px 3px rgba(0,0,0,.45))">{H}</div></div>'),
    ("Não use Vagalume no claro: some.",
     f'<div class="wrong-box">{H.replace("#06262B", "#D9F24A")}</div>'),
    ("Não use a versão positiva sobre fundo escuro.",
     f'<div class="wrong-box" style="background:#104048">{H}</div>'),
    ("Não aplique sobre fundo poluído sem véu.",
     f'<div class="wrong-box busy">{logo("horizontal", "negativo")}</div>'),
    ("Não reescreva o nome em outra fonte.",
     '<div class="wrong-box"><span style="font:italic 700 34px Georgia,serif;color:#06262B">Fireflies</span></div>'),
]
erros_html = "".join(f'<figure class="wrong">{b}<figcaption><span class="x" aria-hidden="true">×</span>{t}</figcaption></figure>' for t, b in erros)

# ---------- aplicações ----------
APP = ROOT / "aplicacoes"
apps = []
if APP.exists():
    pngs = sorted(p for p in APP.rglob("*.png") if "_build" not in p.parts and "img" not in p.parts)
    for p in pngs:
        rel = p.relative_to(APP)
        if rel.name == "mockups.png":
            continue
        out = IMG / (str(rel.with_suffix("")).replace("/", "__") + ".jpg")
        subprocess.run(["convert", str(p), "-resize", "1400x1400>", "-quality", "82", "-strip", str(out)], check=True)
        apps.append((rel, out.name))


def app_label(rel):
    n = rel.stem.replace("-", " ").replace("_", " ")
    return f"{rel.parts[0]} · {n}" if len(rel.parts) > 1 else n


apps_html = "".join(
    f'<figure class="app"><img src="img/{name}" alt="{app_label(rel)}" loading="lazy"><figcaption>{app_label(rel)}</figcaption></figure>'
    for rel, name in apps) or '<p class="muted">As prévias das aplicações aparecem aqui depois de geradas em <code>aplicacoes/</code>.</p>'

# ---------- inventário de arquivos ----------
def tree(folder):
    p = ROOT / folder
    if not p.exists():
        return ""
    files = sorted(x for x in p.rglob("*") if x.is_file() and "_build" not in x.parts)
    return f'<details><summary><span class="mono">{folder}/</span> · {len(files)} arquivo{"s" if len(files) != 1 else ""}</summary><ul class="files">' + "".join(
        f'<li class="mono">{x.relative_to(ROOT)}</li>' for x in files) + "</ul></details>"


arquivos_html = "".join(tree(f) for f in ["logo", "cores", "tipografia", "icones", "aplicacoes", "estrategia"])

tpl = (Path(__file__).parent / "template.html").read_text()
repl = {
    "{{SPRITE}}": sprite,
    "{{LOGO_HERO}}": logo("horizontal", "negativo", "logo hero-logo"),
    "{{SIMBOLO_NEG}}": logo("simbolo", "negativo", "logo"),
    "{{H_POS}}": logo("horizontal", "positivo"),
    "{{H_NEG}}": logo("horizontal", "negativo"),
    "{{H_MONO_N}}": logo("horizontal", "mono-noite"),
    "{{H_MONO_B}}": logo("horizontal", "mono-branco"),
    "{{V_POS}}": logo("vertical", "positivo"),
    "{{V_NEG}}": logo("vertical", "negativo"),
    "{{S_POS}}": logo("simbolo", "positivo"),
    "{{S_NEG}}": logo("simbolo", "negativo"),
    "{{W_POS}}": logo("wordmark", "positivo"),
    "{{A_POS}}": logo("assinatura", "positivo"),
    "{{A_NEG}}": logo("assinatura", "negativo"),
    "{{ACAD_POS}}": logo("academy-horizontal", "positivo"),
    "{{COND_POS}}": logo("condominios-horizontal", "positivo"),
    "{{ACAD_NEG}}": logo("academy-horizontal", "negativo"),
    "{{COND_NEG}}": logo("condominios-horizontal", "negativo"),
    "{{FAVICON}}": svg("logo/favicon.svg", "fav"),
    "{{CONSTRUCAO}}": svg("logo/construcao.svg", "construcao"),
    "{{CORES_PRINCIPAIS}}": principais,
    "{{CORES_APOIO}}": apoio,
    "{{ESCALAS}}": escalas_html,
    "{{CONTRASTE}}": contraste_html,
    "{{ICONES}}": icon_html,
    "{{N_ICONES}}": str(len(icon_names)),
    "{{ERROS}}": erros_html,
    "{{APLICACOES}}": apps_html,
    "{{ARQUIVOS}}": arquivos_html,
}
for k, v in repl.items():
    tpl = tpl.replace(k, v)
for k in ["auditoria", "contabil", "fiscal", "financeiro", "gestao-processos", "sindicancia", "academy", "condominio",
          "responsavel", "painel-mensal", "diagnostico", "organizacao", "fechamento", "rotina", "alerta", "inadimplencia"]:
    tpl = tpl.replace("{{I:" + k + "}}", ico(k, 36))
left = re.findall(r"\{\{[^}]+\}\}", tpl)
assert not left, left
(MANUAL / "index.html").write_text(tpl)
print("ok", len(tpl) // 1024, "KB,", len(apps), "aplicações")
