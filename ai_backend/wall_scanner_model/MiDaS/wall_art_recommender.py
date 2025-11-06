import torch
import clip
import cv2
import numpy as np
from PIL import Image
from ultralytics import YOLO
import os
import gradio as gr
from sklearn.metrics.pairwise import cosine_similarity
import traceback
from torchvision.transforms.functional import to_pil_image
from torchvision import transforms
import pickle

# Load artwork embeddings from saved pickle
with open("artwork_new_embeddings.pkl", "rb") as f:
    data = pickle.load(f)

painting_embeddings = data["embeddings"]
painting_paths = data["paths"]
painting_names = [os.path.splitext(os.path.basename(p))[0] for p in painting_paths]

# Load CLIP
device = "cuda" if torch.cuda.is_available() else "cpu"
model_clip, preprocess = clip.load("ViT-B/32", device=device)

# Load YOLOv8 model
model_yolo = YOLO("yolov8n-seg.pt")

# Load MiDaS for wall flatness estimation
midas = torch.hub.load("intel-isl/MiDaS", "DPT_Hybrid")
midas.eval()

# Proper preprocessing for MiDaS
midas_transform = transforms.Compose([
    transforms.Resize(384),
    transforms.CenterCrop(384),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

def is_wall_like(image_pil, threshold_std=0.30):
    image_tensor = midas_transform(image_pil).unsqueeze(0)

    with torch.no_grad():
        prediction = midas(image_tensor)
        prediction = torch.nn.functional.interpolate(
            prediction.unsqueeze(1),
            size=image_pil.size[::-1],
            mode="bicubic",
            align_corners=False,
        ).squeeze().cpu().numpy()

    depth_norm = (prediction - prediction.min()) / (prediction.max() - prediction.min() + 1e-8)
    depth_std = np.std(depth_norm)

    img_array = np.array(image_pil.convert("L"))
    variance = np.var(img_array)

    print(f"🔍 Wall depth std: {depth_std:.4f}, texture variance: {variance:.2f}")
    if depth_std < threshold_std or variance < 200:
        print("✅ Flat surface accepted as wall.")
        return True
    return False

def detect_wall_and_crop(image_path):
    results = model_yolo(image_path)
    wall_img = Image.open(image_path).convert("RGB")
    wall_box = None
    min_area_threshold = 0.05

    for r in results:
        for box in r.boxes:
            coords = box.xyxy[0].cpu().numpy().astype(int)
            x1, y1, x2, y2 = coords
            w, h = x2 - x1, y2 - y1
            box_area = w * h
            img_area = wall_img.width * wall_img.height

            if box_area / img_area > min_area_threshold:
                wall_box = (x1, y1, x2, y2)
                break

    if wall_box:
        cropped = wall_img.crop(wall_box)
        return cropped
    else:
        img_array = np.array(wall_img.convert("L"))
        variance = np.var(img_array)
        if variance < 200:
            print("🟡 Low-texture fallback active.")
            return wall_img
        return None

def recommend_art(user_image):
    try:
        if user_image is None:
            print("❌ No image received.")
            return [(Image.new("RGB", (300, 300), color="gray"), "❌ No image")]

        temp_path = "user_wall.jpg"
        user_image.save(temp_path)

        if not is_wall_like(user_image):
            print("❌ Not a wall-like image.")
            return [(Image.new("RGB", (300, 300), color="gray"), "❌ Not a wall detected")]

        wall_crop = detect_wall_and_crop(temp_path)
        if wall_crop is None:
            print("❌ Wall crop failed, using original image.")
            wall_crop = user_image

        wall_tensor = preprocess(wall_crop).unsqueeze(0).to(device)

        with torch.no_grad():
            wall_emb = model_clip.encode_image(wall_tensor).cpu().numpy()

        similarities = cosine_similarity(wall_emb, painting_embeddings)[0]
        top_idxs = similarities.argsort()[::-1][:50]

        results = []
        for idx in top_idxs:
            results.append((painting_paths[idx], painting_names[idx]))

        return results

    except Exception as e:
        print("❌ ERROR in recommend_art():", e)
        traceback.print_exc()
        return [(Image.new("RGB", (300, 300), color="red"), "❌ Error")]

# Gradio app
gr.Interface(
    fn=recommend_art,
    inputs=gr.Image(type="pil", sources=["upload", "webcam"], label="Capture or Upload Your Wall"),
    outputs=[gr.Gallery(label="Suggested Artworks")],
    title="🖼️ AI Wall Art Recommender",
    description="Upload or capture a wall photo and get AI-powered painting suggestions that match your space."
).launch()
