#!/usr/bin/env python3
"""Correções pós-check: MDX comments, <small>, frontmatter YAML, links externos."""
import os, re, glob

DOCS = os.path.join(os.getcwd(), "docs")

# 1) comentários HTML -> comentários MDX
for f in glob.glob(os.path.join(DOCS, "*.mdx")):
    txt = open(f, encoding="utf-8").read()
    txt = re.sub(r"<!--(.*?)-->", r"{/*\1*/}", txt, flags=re.S)
    open(f, "w", encoding="utf-8").write(txt)

# 2) <small> -> itálico markdown
for f in glob.glob(os.path.join(DOCS, "*.mdx")):
    txt = open(f, encoding="utf-8").read()
    txt = txt.replace("<small>", "*").replace("</small>", "*")
    open(f, "w", encoding="utf-8").write(txt)

# 3) frontmatter: entre aspas duplas nas descriptions (YAML-safe)
for f in glob.glob(os.path.join(DOCS, "*.mdx")):
    lines = open(f, encoding="utf-8").read().split("\n")
    out = []
    for ln in lines:
        m = re.match(r"^(description:)\s*(.*)$", ln)
        if m and not m.group(2).startswith('"'):
            out.append(f'{m.group(1)} "{m.group(2)}"')
        else:
            out.append(ln)
    open(f, "w", encoding="utf-8").write("\n".join(out))

# 4) links externos quebrados
fix_ext = {
    "https://docs.flame-engine.org/latest/flame/effects.html":
        "https://docs.flame-engine.org/latest/flame/effects/effects.html",
    "https://github.com/RafaelBarbosatec/bonfire/blob/master/MIGRATION_3_TO_4.md":
        "https://github.com/RafaelBarbosatec/bonfire/blob/master/CHANGELOG.md",
}
for f in glob.glob(os.path.join(DOCS, "*.mdx")):
    txt = open(f, encoding="utf-8").read()
    for old, new in fix_ext.items():
        txt = txt.replace(old, new)
    open(f, "w", encoding="utf-8").write(txt)

print("correções aplicadas")
