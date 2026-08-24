#!/usr/bin/env python3
"""Migração docsify v4.0 -> docs.page (branch experimental)."""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "v4.0", "doc")
DOCS = os.path.join(ROOT, "docs")
ASSETS = os.path.join(DOCS, "assets")
MEDIA = os.path.join(ROOT, "_media")

# renomeação de arquivos (underscores -> hífens, URLs limpas)
RENAME = {
    "bonfire_4.md": "bonfire-4.md",
    "collision_system.md": "collision-system.md",
    "loading_assets.md": "loading-assets.md",
    "map_navigator.md": "map-navigator.md",
    "path_finding.md": "path-finding.md",
    "ray_casting.md": "ray-casting.md",
    "scene_builder.md": "scene-builder.md",
    "talk_dialog.md": "talk-dialog.md",
    "text_rendering.md": "text-rendering.md",
    "tiled_support.md": "tiled-support.md",
}

def newname(f):
    return RENAME.get(f, f)

# mídias referenciadas pelo v4.0 + welcome
import subprocess
refs = set()
for f in os.listdir(SRC):
    p = os.path.join(SRC, f)
    if os.path.isfile(p):
        txt = open(p, encoding="utf-8", errors="replace").read()
        refs |= set(re.findall(r"(?:\.\./\.\.|\.\.)/_media/([A-Za-z0-9_.\-]+)", txt))
# welcome (v4.0/README.md)
readme = open(os.path.join(ROOT, "v4.0", "README.md"), encoding="utf-8", errors="replace").read()
refs |= set(re.findall(r"(?:\.\./\.\.|\.\.)/_media/([A-Za-z0-9_.\-]+)", readme))
# coverpage
cover = open(os.path.join(ROOT, "v4.0", "_coverpage.md"), encoding="utf-8", errors="replace").read()
refs |= set(re.findall(r"(?:\.\./\.\.|\.\.)/_media/([A-Za-z0-9_.\-]+)", cover))
refs.add("bonfire.gif")
refs.add("perspectiva.png")

os.makedirs(DOCS, exist_ok=True)
os.makedirs(ASSETS, exist_ok=True)

# 1) copiar mídias
copied = []
for m in sorted(refs):
    src = os.path.join(MEDIA, m)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(ASSETS, m))
        copied.append(m)
    else:
        print("MEDIA FALTANDO:", m)
print(f"midias copiadas: {len(copied)}")

# favicon (usa o 32x32 do repo)
fav = os.path.join(ROOT, "favicon", "favicon-32x32.png")
if os.path.exists(fav):
    shutil.copy2(fav, os.path.join(ASSETS, "favicon.png"))

# 2) regex de links internos -> docs.page
def build_link_regex():
    pats = []
    for old in RENAME:
        new = RENAME[old][:-3]  # sem .md (é nome de arquivo destino)
        base = old[:-3]  # sem .md
        pats.append((re.compile(r"\]\((?:/doc/|doc/)" + re.escape(base) + r"\.md\?id=([^)]+)\)"),
                     lambda m, new=new: f"](/{new}#{m.group(1)})"))
        pats.append((re.compile(r"\]\((?:/doc/|doc/)" + re.escape(base) + r"\?id=([^)]+)\)"),
                     lambda m, new=new: f"](/{new}#{m.group(1)})"))
        pats.append((re.compile(r"\]\((?:/doc/|doc/)" + re.escape(base) + r"\.md\)"),
                     lambda m, new=new: f"](/{new})"))
        pats.append((re.compile(r"\]\((?![a-z]+://)" + re.escape(base) + r"\.md\?id=([^)]+)\)"),
                     lambda m, new=new: f"](/{new}#{m.group(1)})"))
        pats.append((re.compile(r"\]\((?![a-z]+://)" + re.escape(base) + r"\.md\)"),
                     lambda m, new=new: f"](/{new})"))
        pats.append((re.compile(r"\]\((?![a-z]+://)" + re.escape(base) + r"\?id=([^)]+)\)"),
                     lambda m, new=new: f"](/{new}#{m.group(1)})"))
    # nomes sem underscore também podem aparecer como links relativos "doc/x?id=" ou "x.md"
    for f in os.listdir(SRC):
        if f in RENAME:
            continue
        base = f[:-3]
        pats.append((re.compile(r"\]\((?:/doc/|doc/)" + re.escape(base) + r"\.md\?id=([^)]+)\)"),
                     lambda m, b=base: f"](/{b}#{m.group(1)})"))
        pats.append((re.compile(r"\]\((?:/doc/|doc/)" + re.escape(base) + r"\?id=([^)]+)\)"),
                     lambda m, b=base: f"](/{b}#{m.group(1)})"))
        pats.append((re.compile(r"\]\((?:/doc/|doc/)" + re.escape(base) + r"\.md\)"),
                     lambda m, b=base: f"](/{b})"))
        pats.append((re.compile(r"\]\((?![a-z]+://)" + re.escape(base) + r"\.md\?id=([^)]+)\)"),
                     lambda m, b=base: f"](/{b}#{m.group(1)})"))
        pats.append((re.compile(r"\]\((?![a-z]+://)" + re.escape(base) + r"\.md\)"),
                     lambda m, b=base: f"](/{b})"))
        pats.append((re.compile(r"\]\((?![a-z]+://)" + re.escape(base) + r"\?id=([^)]+)\)"),
                     lambda m, b=base: f"](/{b}#{m.group(1)})"))
    pats.append((re.compile(r"\]\(/\?id=welcome-to-bonfire\)"), lambda m: "](/)") )
    return pats

LINK_PATS = build_link_regex()

def fix_links(txt):
    for pat, repl in LINK_PATS:
        txt = pat.sub(repl, txt)
    # imagens
    txt = re.sub(r"(?:\.\./\.\.|\.\.)/_media/", "/assets/", txt)
    return txt

# 3) copiar páginas + frontmatter + fix de links
DESC = {
    "index": "Welcome to Bonfire, a 2D game engine for Flutter built on top of Flame.",
    "ally": "Create friendly characters that can fight alongside the player.",
    "bonfire-4": "What's new in Bonfire 4.0 and how to migrate from 3.x.",
    "camera": "Control the game camera: zoom, movement and configuration.",
    "collision-system": "Detect and react to collisions between game components.",
    "decoration": "Add decorative and non-interactive elements to your game.",
    "effects": "Apply visual effects to game components.",
    "enemy": "Create enemies with simple artificial intelligence.",
    "examples": "Playable examples and games built with Bonfire.",
    "forces": "Apply forces like gravity, wind, friction and drag to components.",
    "getting-started": "Install Bonfire, create your first map and player.",
    "input": "Handle player input: gestures, keyboard and mouse.",
    "joystick": "Configure and use virtual joysticks.",
    "lighting": "Add lighting effects to your game world.",
    "loading-assets": "Load sprites and sprite animations.",
    "map": "Create maps with Tiled and render them in Bonfire.",
    "map-navigator": "Navigate and move between maps.",
    "mixins": "Useful mixins to add behaviors to your components.",
    "overview": "Understand the BonfireWidget and how the engine is organized.",
    "parallax": "Create depth with parallax backgrounds.",
    "particles": "Create particle effects.",
    "path-finding": "Find paths for your characters with the A* algorithm.",
    "player": "Create and configure the player character.",
    "ray-casting": "Cast rays to detect collisions.",
    "scene-builder": "Build game scenes visually.",
    "sensor": "Create sensors that react when components enter an area.",
    "shader": "Apply shaders to your game components.",
    "talk-dialog": "Create dialogs with TalkDialog.",
    "text-rendering": "Render text in the game.",
    "tiled-support": "Use Tiled maps and objects in Bonfire.",
    "util": "Utility components and functions.",
}

def page_title(path):
    for line in open(path, encoding="utf-8", errors="replace"):
        m = re.match(r"^#\s+(.+?)\s*$", line.strip())
        if m:
            return m.group(1).strip()
    return os.path.basename(path)[:-3].replace("-", " ").title()

for f in os.listdir(SRC):
    if not f.endswith(".md"):
        continue
    dst = newname(f)
    txt = open(os.path.join(SRC, f), encoding="utf-8", errors="replace").read()
    txt = fix_links(txt)
    title = page_title(os.path.join(SRC, f))
    desc = DESC.get(dst[:-3], f"{title} documentation for Bonfire.")
    fm = f"---\ntitle: {title}\ndescription: {desc}\n---\n\n"
    open(os.path.join(DOCS, dst), "w", encoding="utf-8").write(fm + txt)
    print("pagina:", dst)

# 4) welcome page (docs/index.md) — construída à mão depois
print("\nOK. Arquivos em docs/:", sorted(os.listdir(DOCS)))
