import os
import torch
import clip
from PIL import Image
import numpy as np
import pickle
print(clip.__file__)
# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Folder where your images are saved
artworks_folder = "new_paintings"

embeddings = []
image_paths = []

# Loop through images and get embeddings
for filename in os.listdir(artworks_folder):
    if filename.lower().endswith((".jpg", ".png",".jpeg")):
        path = os.path.join(artworks_folder, filename)
        try:
            image = preprocess(Image.open(path)).unsqueeze(0).to(device)
            with torch.no_grad():
                emb = model.encode_image(image).cpu().numpy()
            embeddings.append(emb)
            image_paths.append(path)
        except Exception as e:
            print(f"❌ Failed on {filename}: {e}")

# Save the embeddings and paths
embeddings = np.vstack(embeddings)

with open("artwork_new_embeddings.pkl", "wb") as f:
    pickle.dump({"embeddings": embeddings, "paths": image_paths}, f)

print("✅ Saved embeddings for", len(embeddings), "images.")
