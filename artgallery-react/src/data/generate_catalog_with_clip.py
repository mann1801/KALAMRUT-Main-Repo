#!/usr/bin/env python3
"""
Generate paintings.js with CLIP-based image analysis.
"""

import os
import json
import random
from datetime import datetime
from pathlib import Path
import pickle
import torch
import clip
from PIL import Image
from tqdm import tqdm

# --------------------------
# Configurable label spaces
# --------------------------
CATEGORY_LABELS = [
    "Nature Photography", "Landscape Photography", "Wildlife Photography", "Seascape Photography",
    "Minimalist Photography", "Still Life Photography", "Macro Photography", "Black and White Photography",
    "Architectural Photography", "Urban Street Photography", "Night Photography", "Travel Photography",
    "Aerial Photography", "Botanical Photography",
    "Abstract Painting", "Surreal Art", "Conceptual Art", "Digital Art",
    "Watercolor Painting", "Oil Painting", "Acrylic Painting", "Impressionist Painting",
    "Contemporary Art", "Pop Art",
]

CONCEPT_PROMPTS = [
    "a calm mountain lake", "snowy mountains", "a forest pathway", "wildflowers in a meadow",
    "a rocky forest stream", "a waterfall in a canyon", "a desert with sand dunes", "a lighthouse by the sea",
    "a sunset at the pier", "a beach with gentle waves", "storm clouds over the ocean", "a rainbow over hills",
    "a foggy forest", "cherry blossoms", "a lotus pond", "autumn foliage", "a glacier and iceberg",
    "a sunrise over mountains", "a river through a valley",
    "a butterfly on flowers", "a deer in a meadow", "a bird perched on a branch", "a peacock with feathers spread",
    "a tiger in the jungle", "an elephant in the savanna", "a fox in the snow", "a whale in the ocean",
    "a potted cactus", "seashells in a basket", "a wooden boat on a lake", "a bicycle by a wall",
    "a ceramic vase on a table", "a vintage camera", "a cup of coffee on a desk",
    "a city skyline at night", "a bridge over a river", "a narrow old street", "a temple with steps",
    "geometric abstract shapes", "fluid paint swirls", "neon cyberpunk city", "minimalist color blocks",
]

TITLE_TEMPLATES = [
    "Whispers of {main}", "Dream of {main}", "{main} at {setting}", "Echoes of {main}",
    "Under {setting}: {main}", "Serenity: {main}", "{main} in {setting}", "Poem of {main}",
    "Quiet {main}", "Song of {main}", "{main} & {setting}", "{setting} {main}",
]


# --------------------------
# Helper functions
# --------------------------
def seed_from_text(s: str) -> int:
    return abs(hash(s)) % (2**32)

def deterministic_year(key: str, start=2013, end=None) -> int:
    if end is None:
        end = datetime.now().year
    rng = random.Random(seed_from_text(key))
    return rng.randint(start, end)

def price_suggestion(category: str, key: str) -> float:
    base = {
        "Nature Photography": (120, 260),
        "Landscape Photography": (120, 260),
        "Wildlife Photography": (140, 300),
        "Seascape Photography": (150, 290),
        "Minimalist Photography": (60, 150),
        "Still Life Photography": (80, 180),
        "Macro Photography": (100, 220),
        "Black and White Photography": (110, 230),
        "Architectural Photography": (120, 240),
        "Urban Street Photography": (100, 220),
        "Night Photography": (130, 260),
        "Travel Photography": (110, 230),
        "Aerial Photography": (150, 300),
        "Botanical Photography": (90, 200),
        "Abstract Painting": (160, 360),
        "Surreal Art": (180, 420),
        "Conceptual Art": (160, 380),
        "Digital Art": (120, 280),
        "Watercolor Painting": (140, 300),
        "Oil Painting": (200, 480),
        "Acrylic Painting": (160, 360),
        "Impressionist Painting": (180, 420),
        "Contemporary Art": (140, 320),
        "Pop Art": (140, 300),
    }
    lo, hi = base.get(category, (100, 250))
    rng = random.Random(seed_from_text(key))
    return round(rng.uniform(lo, hi), 2)

def best_of(similarities, labels, topk=1):
    idx = torch.topk(similarities, k=topk, dim=-1).indices.tolist()
    return [labels[i] for i in idx]

def make_title(main: str, setting: str) -> str:
    rng = random.Random(seed_from_text(main + "|" + setting))
    template = rng.choice(TITLE_TEMPLATES)
    # ensure lowercase keys exist
    return template.format(main=main.title(), setting=setting.title())


def make_description(concepts, category):
    if len(concepts) >= 2:
        desc = f"A {concepts[0]} with {concepts[1]}"
    else:
        desc = f"A {concepts[0]}"
    return f"{desc}, rendered as {category.lower()}."

# --------------------------
# CLIP analysis
# --------------------------
def analyze_images(paths, root_dir, device='cuda' if torch.cuda.is_available() else 'cpu'):
    model, preprocess = clip.load("ViT-B/32", device=device)

    with torch.no_grad():
        category_tokens = clip.tokenize([f"This is {c}." for c in CATEGORY_LABELS]).to(device)
        category_text_features = model.encode_text(category_tokens)
        category_text_features /= category_text_features.norm(dim=-1, keepdim=True)

        concept_tokens = clip.tokenize([f"A photo of {p}." for p in CONCEPT_PROMPTS]).to(device)
        concept_text_features = model.encode_text(concept_tokens)
        concept_text_features /= concept_text_features.norm(dim=-1, keepdim=True)

    results = []
    for i, rel_path in enumerate(tqdm(paths, desc="Analyzing images")):
        abs_path = os.path.join(root_dir, rel_path)
        try:
            image = Image.open(abs_path).convert("RGB")
        except Exception as e:
            print(f"[WARN] Could not open {abs_path}: {e}")
            continue

        image_input = preprocess(image).unsqueeze(0).to(device)
        with torch.no_grad():
            image_features = model.encode_image(image_input)
            image_features /= image_features.norm(dim=-1, keepdim=True)

            cat_sims = (100.0 * image_features @ category_text_features.T).squeeze(0)
            con_sims = (100.0 * image_features @ concept_text_features.T).squeeze(0)

        top_category = best_of(cat_sims, CATEGORY_LABELS, topk=1)[0]
        top_concepts = best_of(con_sims, CONCEPT_PROMPTS, topk=3)

        main = top_concepts[0]
        setting = top_concepts[1] if len(top_concepts) > 1 else "a natural setting"

        name = make_title(main, setting)
        description = make_description(top_concepts, top_category)
        year = deterministic_year(rel_path)
        price = price_suggestion(top_category, rel_path)

        results.append({
            "id": i + 1,
            "name": name,
            "artist": "Unknown",
            "year": str(year),
            "description": description,
            "image": rel_path.replace("\\", "/"),
            "price": price,
            "category": top_category
        })

    return results

# --------------------------
# Main
# --------------------------
if __name__ == "__main__":
    base_dir = Path(__file__).resolve().parent  # this will be src/data
    pickle_path = base_dir / "artwork_new_embeddings.pkl"   # <-- FIXED
    images_root = base_dir                                # root for images
    paintings_js = base_dir.parent / "paintings.js"       # one level up from data/

    with open(pickle_path, "rb") as f:
        payload = pickle.load(f)

    paths = payload["paths"]

    catalog = analyze_images(paths, str(images_root))

    with open(paintings_js, "w", encoding="utf-8") as f:
        f.write("const paintings = ")
        json.dump(catalog, f, ensure_ascii=False, indent=2)
        f.write(";\n\nexport default paintings;")

    print(f"paintings.js updated with {len(catalog)} paintings.")


