from django.shortcuts import render
import os
import pickle
import numpy as np
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import cv2
from PIL import Image
from django.conf import settings
import io
import base64
import torch
import clip
from sklearn.metrics.pairwise import cosine_similarity
import torch.nn.functional as F
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import logging
from django.core.mail import EmailMultiAlternatives


logger = logging.getLogger(__name__)
import json
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status




# Try to import torch hub for MiDaS
try:
    import torch.hub
except ImportError:
    torch.hub = None

# Global variables for AI models (load once, use many times)
device = "cuda" if torch.cuda.is_available() else "cpu"
model_clip = None
preprocess = None
midas_model = None
midas_transform = None
from django.conf import settings
print("EMAIL_HOST_USER:", settings.EMAIL_HOST_USER)
print("EMAIL_HOST_PASSWORD:", settings.EMAIL_HOST_PASSWORD)

def load_clip_model():
    """Load CLIP model once and cache it"""
    global model_clip, preprocess
    if model_clip is None:
        print("Loading CLIP model...")
        model_clip, preprocess = clip.load("ViT-B/32", device=device)
        model_clip.eval()
        print("CLIP model loaded successfully!")
    return model_clip, preprocess

def load_midas_model():
    """Load MiDaS model for depth estimation"""
    global midas_model, midas_transform
    if midas_model is None:
        try:
            print("Loading MiDaS model...")
            # Use the same model as your original: DPT_Hybrid
            midas_model = torch.hub.load("intel-isl/MiDaS", "DPT_Hybrid")
            midas_model.eval()
            
            # Use the same transform as your original
            from torchvision import transforms
            midas_transform = transforms.Compose([
                transforms.Resize(384),
                transforms.CenterCrop(384),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                   std=[0.229, 0.224, 0.225]),
            ])
            
            midas_model.to(device)
            print("MiDaS model loaded successfully!")
        except Exception as e:
            print(f"Failed to load MiDaS model: {e}")
            midas_model = None
            midas_transform = None
    return midas_model, midas_transform

def is_wall_like(image_pil, threshold_std=0.35):
    """Check if the image is wall-like using multiple features to distinguish from faces/objects.
    
    Uses a combination of depth, texture, edge density, and face detection to make
    more accurate decisions about whether an image contains a wall.
    """
    try:
        # Convert to numpy array for processing
        img_array = np.array(image_pil)
        if len(img_array.shape) == 2:  # If grayscale
            gray = img_array
            bgr = cv2.cvtColor(img_array, cv2.COLOR_GRAY2BGR)
        else:
            gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
            bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        
        # 1. First, check for faces using OpenCV's Haar Cascade
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        if len(faces) > 0:
            print("❌ Face detected - rejecting as non-wall")
            return False
            
        # 2. Calculate edge density
        edges = cv2.Canny(gray, 50, 150)
        edge_density = float(np.count_nonzero(edges)) / float(edges.size)
        
        # 3. Calculate texture variance (lower = flatter surface)
        variance = float(np.var(gray))
        
        # 4. Try to load MiDaS model for depth estimation
        midas_model, midas_transform = load_midas_model()
        
        if midas_model is None or midas_transform is None:
            print("MiDaS model not available, using fallback detection")
            print(f"Fallback metrics -> variance: {variance:.2f}, edge_density: {edge_density:.4f}")
            # Conservative fallback: require both low texture and low edges
            return (variance < 1000.0) and (edge_density < 0.06)
            
        # 5. Process with MiDaS for depth estimation
        try:
            image_tensor = midas_transform(image_pil).unsqueeze(0).to(device)
            with torch.no_grad():
                prediction = midas_model(image_tensor)
                prediction = F.interpolate(
                    prediction.unsqueeze(1),
                    size=image_pil.size[::-1],
                    mode="bicubic",
                    align_corners=False,
                ).squeeze().cpu().numpy()
                
            # Normalize depth map
            depth_norm = (prediction - prediction.min()) / (prediction.max() - prediction.min() + 1e-8)
            depth_std = float(np.std(depth_norm))
            
            # 6. Calculate color uniformity and other metrics
            hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
            sat_std = float(np.std(hsv[:, :, 1]))
            
            # Calculate aspect ratio (walls are typically wider than tall)
            height, width = gray.shape
            aspect_ratio = width / height if width > height else height / width
            
            print(
                f"🔍 Wall metrics -> depth_std: {depth_std:.4f}, variance: {variance:.2f}, "
                f"edge_density: {edge_density:.4f}, sat_std: {sat_std:.2f}, aspect_ratio: {aspect_ratio:.2f}"
            )
            
            # Wall detection conditions
            is_flat_depth = depth_std < threshold_std
            is_low_texture = variance < 1000.0  # Slightly more lenient for walls with some texture
            is_low_edges = edge_density < 0.06  # Slightly more lenient edge density
            is_wide = aspect_ratio > 1.2  # Walls are typically wider than tall
            
            # Require most conditions to be true, with aspect ratio as a strong indicator
            conditions_met = sum([is_flat_depth, is_low_texture, is_low_edges])
            
            # Accept as wall if most conditions are met and aspect ratio suggests it's not a face/object
            if conditions_met >= 2 and is_wide:
                print("✅ Surface accepted as wall.")
                return True
                
        except Exception as depth_error:
            print(f"Depth estimation error, using fallback: {depth_error}")
            # Fallback to simpler check if depth estimation fails
            return (variance < 1000.0) and (edge_density < 0.06)
            
        print("❌ Surface not wall-like (rejected).")
        return False
        
    except Exception as e:
        print(f"Error in wall detection: {e}")
        # Conservative fallback - if we can't determine, reject to avoid false positives
        return False

# Create your views here.
@api_view(['GET'])
def ai_art_endpoint(request):
    """Simple test endpoint"""
    return Response({
        'message': 'AI Art API is working!',
        'status': 'success',
        'data': {
            'endpoint': 'test',
            'description': 'This is a test endpoint for AI Art API'
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def generate_ai_art(request):
    """Generate AI art (placeholder)"""
    if request.method == 'GET':
        return Response({
            'message': 'Send a POST request with a prompt and style to generate AI art.',
            'status': 'info',
            'example': {
                'prompt': 'A beautiful sunset over mountains',
                'style': 'realistic'
            }
        }, status=status.HTTP_200_OK)
    data = request.data
    prompt = data.get('prompt', '')
    style = data.get('style', 'default')
    
    # Placeholder for AI generation logic
    # You can add your actual AI integration here
    
    return Response({
        'message': 'AI Art generation endpoint',
        'status': 'success',
        'data': {
            'prompt': prompt,
            'style': style,
            'generated_image_url': 'placeholder_url',
            'generation_id': 'ai_art_123'
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_ai_status(request):
    """Get AI service status"""
    return Response({
        'message': 'AI service is running',
        'status': 'online',
        'version': '1.0.0'
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def wall_scanner_recommend(request):
    """
    AI-powered wall scanner that analyzes uploaded wall images and recommends matching artworks
    """
    try:
        print("DEBUG: Received request for wall scanner recommend")
        
        # Get session key for tracking shown paintings
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        
        # Get previously shown paintings for this session
        shown_paintings = request.session.get('shown_paintings', set())
        
        # Load CLIP model
        model_clip, preprocess = load_clip_model()
        
        if 'image' not in request.FILES:
            print("DEBUG: No image in request.FILES")
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_file = request.FILES['image']
        print(f"DEBUG: Uploaded file name: {uploaded_file.name}")

        # Save the uploaded image temporarily
        file_path = default_storage.save(f'wall_scanner/{uploaded_file.name}', ContentFile(uploaded_file.read()))
        full_path = os.path.join(settings.MEDIA_ROOT, file_path)
        print(f"DEBUG: Saved file to {full_path}")

        # Load the wall scanner model and embeddings
        model_path = os.path.join(settings.BASE_DIR, 'wall_scanner_model', 'MiDaS')
        embeddings_path = os.path.join(model_path, 'artwork_new_embeddings.pkl')
        paintings_dir = os.path.join(settings.BASE_DIR, 'wall_scanner_model', 'MiDaS', 'new_paintings')

        print(f"DEBUG: Model path: {model_path}")
        print(f"DEBUG: Embeddings path: {embeddings_path}")
        print(f"DEBUG: Paintings dir: {paintings_dir}")

        # Load embeddings
        with open(embeddings_path, "rb") as f:
            data = pickle.load(f)
        print("DEBUG: Loaded embeddings")

        painting_embeddings = data["embeddings"]
        painting_paths = data["paths"]
        painting_names = [os.path.splitext(os.path.basename(p))[0] for p in painting_paths]

        # Process the uploaded image with AI
        user_image = Image.open(full_path).convert("RGB")
        print("DEBUG: Opened and converted image")
        
        # Check if the image is wall-like
        print("DEBUG: Checking if image is wall-like...")
        if not is_wall_like(user_image):
            print("DEBUG: Image is not wall-like, returning no recommendations")
            # Clean up uploaded file
            default_storage.delete(file_path)
            return Response({
                'success': False,
                'recommendations': [],
                'message': 'No wall detected in the image. Please upload a photo of a wall.',
                'wall_detected': False
            })
        
        print("DEBUG: Wall detected, proceeding with artwork recommendations")
        
        # Preprocess image for CLIP
        if preprocess is None:
            raise Exception("CLIP preprocess function not loaded")
        image_tensor = preprocess(user_image).unsqueeze(0).to(device)
        print("DEBUG: Preprocessed image for CLIP")
        
        # Get image embedding using CLIP
        if model_clip is None:
            raise Exception("CLIP model not loaded")
        with torch.no_grad():
            wall_embedding = model_clip.encode_image(image_tensor).cpu().numpy()
        print("DEBUG: Generated wall embedding using CLIP")
        
        # Calculate similarities with all paintings
        similarities = cosine_similarity(wall_embedding, painting_embeddings)[0]
        print(f"DEBUG: Raw similarities: {similarities[:10]}")

        # Always normalize similarities to 0-1 range
        min_sim = similarities.min()
        max_sim = similarities.max()
        if max_sim > min_sim:
            similarities_norm = (similarities - min_sim) / (max_sim - min_sim)
        else:
            similarities_norm = similarities  # all values are the same
        print(f"DEBUG: Normalized similarities: {similarities_norm[:10]}")
        print(f"DEBUG: Similarity range: {similarities_norm.min():.3f} to {similarities_norm.max():.3f}")

        # Get top 30 most similar paintings for diversity selection
        top_30_indices = similarities_norm.argsort()[::-1][:30]
        print(f"DEBUG: Top 30 similarity scores: {similarities_norm[top_30_indices]}")

        # Create diverse recommendations by selecting from different similarity ranges
        recommendations = []
        selected_indices = []

            # Strategy: Pick 4 from top 5, 6 from top 6–15, 6 from top 16–25, 4 random from rest
        if len(top_30_indices) >= 20:
                # Top tier: 4 from highest similarity
                selected_indices.extend(top_30_indices[:4])
                
                # Mid tier: 6 from medium similarity
                selected_indices.extend(top_30_indices[5:11])
                
                # Lower tier: 6 from lower similarity
                selected_indices.extend(top_30_indices[15:21])
                
                # Random diversity: 4 from remaining (avoiding previously shown)
                remaining_indices = [i for i in range(len(similarities_norm)) 
                                    if i not in selected_indices and painting_names[i] not in shown_paintings]
                if remaining_indices:
                    import random
                    random.shuffle(remaining_indices)
                    selected_indices.extend(remaining_indices[:4])
        else:
                # If not enough paintings, just take top 20
                selected_indices = top_30_indices[:20]

        
        print(f"DEBUG: Selected diverse indices: {selected_indices}")
        
        for i, idx in enumerate(selected_indices):
            painting_path = os.path.join(paintings_dir, os.path.basename(painting_paths[idx]))
            if os.path.exists(painting_path):
                with open(painting_path, "rb") as img_file:
                    img_data = img_file.read()
                    img_base64 = base64.b64encode(img_data).decode('utf-8')

                # Use normalized similarity for confidence
                similarity_score = float(similarities_norm[idx])
                confidence_percentage = max(0, min(100, similarity_score * 100))

                recommendations.append({
                    'id': idx,
                    'name': painting_names[idx],
                    'image': f"data:image/jpeg;base64,{img_base64}",
                    'confidence': round(confidence_percentage, 1),
                    'similarity_score': similarity_score
                })
                print(f"DEBUG: Added recommendation {i+1}: {painting_names[idx]} (confidence: {confidence_percentage:.1f}%)")
                
                # Track this painting as shown
                shown_paintings.add(painting_names[idx])

        # Save updated shown paintings to session
        request.session['shown_paintings'] = list(shown_paintings)
        
        # Clean up uploaded file
        default_storage.delete(file_path)
        print("DEBUG: Cleaned up uploaded file")

        return Response({
            'success': True,
            'recommendations': recommendations,
            'message': f'Found {len(recommendations)} AI-powered artwork recommendations',
            'ai_model': 'CLIP ViT-B/32',
            'total_paintings_analyzed': len(painting_embeddings)
        })

    except Exception as e:
        import traceback
        print("ERROR in wall_scanner_recommend:", e)
        traceback.print_exc()
        return Response({
            'error': str(e),
            'message': 'Error processing wall scanner request'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def wall_scanner_status(request):
    """
    Check if wall scanner model is available
    """
    try:
        model_path = os.path.join(settings.BASE_DIR, 'wall_scanner_model', 'MiDaS')
        embeddings_path = os.path.join(model_path, 'artwork_new_embeddings.pkl')
        paintings_dir = os.path.join(settings.BASE_DIR, 'wall_scanner_model', 'MiDaS', 'new_paintings')

        
        # Check if CLIP model can be loaded
        try:
            model_clip, preprocess = load_clip_model()
            clip_available = True
        except Exception as e:
            print(f"CLIP model error: {e}")
            clip_available = False
        
        status_info = {
            'embeddings_loaded': os.path.exists(embeddings_path),
            'paintings_dir_exists': os.path.exists(paintings_dir),
            'clip_model_available': clip_available,
            'device': device,
            'model_ready': os.path.exists(embeddings_path) and os.path.exists(paintings_dir) and clip_available
        }
        
        return Response(status_info)
        
    except Exception as e:
        return Response({
            'error': str(e),
            'model_ready': False
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


ARTWORK_INFO = {
    "starry night": "Starry Night is a famous painting by Vincent van Gogh, painted in 1889. It depicts the view from his asylum room at Saint-Rémy-de-Provence, just before sunrise. The painting shows a swirling sky, a village, and a cypress tree in the foreground.",
    "mona lisa": "The Mona Lisa is a portrait by Leonardo da Vinci, painted between 1503 and 1506. It's one of the most famous paintings in the world, known for the subject's enigmatic smile and the sfumato technique used by da Vinci.",
    "the scream": "The Scream is a series of paintings by Norwegian artist Edvard Munch, created between 1893 and 1910. It depicts a figure with an agonized expression against a landscape with a tumultuous orange sky.",
    "guernica": "Guernica is a large oil painting by Pablo Picasso, created in 1937. It depicts the suffering of people and animals caused by war and violence, specifically the bombing of Guernica during the Spanish Civil War.",
    "the persistence of memory": "The Persistence of Memory is a 1931 painting by Salvador Dalí. It features melting clocks draped over a barren landscape, symbolizing the relativity of time and space.",
    "the night watch": "The Night Watch is a 1642 painting by Rembrandt van Rijn. It's a group portrait of a militia company, notable for its dramatic use of light and shadow.",
    "girl with a pearl earring": "Girl with a Pearl Earring is a 1665 painting by Johannes Vermeer. It's a tronie (a type of Dutch portrait) featuring a young woman wearing a blue and gold turban and a large pearl earring.",
    "the birth of venus": "The Birth of Venus is a painting by Sandro Botticelli, created in the 1480s. It depicts the goddess Venus emerging from the sea as a fully grown woman.",
    "the last supper": "The Last Supper is a mural painting by Leonardo da Vinci, created between 1495 and 1498. It depicts the scene of Jesus's last meal with his disciples before his crucifixion.",
    "the kiss": "The Kiss is a 1908 painting by Gustav Klimt. It depicts a couple embracing, wrapped in a gold robe decorated with elaborate patterns.",
}

ART_HISTORY_INFO = {
    "renaissance": "The Renaissance was a period of European cultural, artistic, political, and scientific rebirth after the Middle Ages, spanning roughly from the 14th to the 17th century. It began in Italy and was characterized by a renewed interest in classical learning and values.",
    "impressionism": "Impressionism was an art movement that emerged in the 1870s and 1880s, primarily in Paris. Artists like Claude Monet, Pierre-Auguste Renoir, and Edgar Degas focused on capturing light and movement, often painting outdoors (en plein air).",
    "cubism": "Cubism was an early 20th-century avant-garde art movement pioneered by Pablo Picasso and Georges Braque. It revolutionized European painting and sculpture by breaking objects into geometric forms and showing multiple perspectives simultaneously.",
    "surrealism": "Surrealism was a cultural movement that began in the early 1920s, featuring the element of surprise and unexpected juxtapositions. Artists like Salvador Dalí and René Magritte created dreamlike, fantastical imagery.",
    "abstract expressionism": "Abstract Expressionism was a post-World War II art movement in American painting, developed in New York in the 1940s. Artists like Jackson Pollock and Mark Rothko created large-scale, abstract works that expressed emotional intensity.",
    "pop art": "Pop Art emerged in the mid-1950s in Britain and the late 1950s in the United States. Artists like Andy Warhol and Roy Lichtenstein drew inspiration from commercial culture, using imagery from popular media and consumer products.",
    "modernism": "Modernism was a broad movement in Western art, architecture, and literature from the late 19th to mid-20th century. It rejected traditional forms and embraced innovation, experimentation, and new ways of seeing.",
    "postmodernism": "Postmodernism emerged in the late 20th century as a reaction against modernism. It's characterized by skepticism, irony, and rejection of universal truths, often mixing different styles and cultural references.",
}

ART_TECHNIQUES = {
    "oil painting": "Oil painting is a technique using pigments mixed with drying oils like linseed oil. It allows for rich colors, smooth blending, and long working time. Famous oil painters include Leonardo da Vinci, Rembrandt, and Vincent van Gogh.",
    "watercolor": "Watercolor uses pigments suspended in water-soluble mediums. It's known for its transparency and luminosity. Artists like J.M.W. Turner and John Singer Sargent were masters of this medium.",
    "acrylic": "Acrylic paint is a fast-drying paint made of pigment suspended in acrylic polymer emulsion. It's versatile, water-soluble when wet, and becomes water-resistant when dry.",
    "tempera": "Tempera is a painting medium made by mixing colored pigments with a water-soluble binder medium, usually egg yolk. It was the primary medium for panel painting during the Middle Ages and Renaissance.",
    "fresco": "Fresco is a technique where water-based pigments are applied to fresh, wet plaster. The colors become part of the wall as the plaster dries. Michelangelo's Sistine Chapel ceiling is a famous example.",
    "etching": "Etching is a printmaking technique that uses chemical action to produce incised lines in a metal printing plate. Rembrandt was a master of this technique.",
    "lithography": "Lithography is a printing process based on the principle that oil and water don't mix. It was invented by Alois Senefelder in 1796 and became popular for reproducing artwork.",
    "sculpture": "Sculpture is the art of creating three-dimensional forms by carving, modeling, casting, or assembling materials. Famous sculptors include Michelangelo, Auguste Rodin, and Constantin Brâncuși.",
}

ART_STYLES = {
    "realism": "Realism in art aims to represent subjects truthfully, without artificiality and avoiding artistic conventions, implausible, exotic, and supernatural elements. Gustave Courbet was a leading figure in this movement.",
    "romanticism": "Romanticism emphasized emotion, individualism, and nature. It was a reaction against the Industrial Revolution and Enlightenment rationalism. Artists like Caspar David Friedrich and Eugène Delacroix were key figures.",
    "neoclassicism": "Neoclassicism drew inspiration from classical art and culture, emphasizing order, clarity, and idealized beauty. Jacques-Louis David was a prominent neoclassical painter.",
    "baroque": "Baroque art is characterized by dramatic, exuberant, and dynamic movement. It often features intense emotion, theatrical lighting, and elaborate ornamentation. Caravaggio and Peter Paul Rubens were masters of this style.",
    "rococo": "Rococo is an 18th-century artistic movement that emerged in France. It's characterized by lightness, elegance, and an exuberant use of curving natural forms in ornamentation.",
    "minimalism": "Minimalism in art emphasizes simplicity and focuses on the essential elements. Artists like Donald Judd and Agnes Martin created works with minimal visual elements.",
    "expressionism": "Expressionism seeks to express emotional experience rather than physical reality. Artists like Edvard Munch and Egon Schiele used distortion and exaggeration to convey emotion.",
    "fauvism": "Fauvism was characterized by bold, undisguised brushstrokes and vibrant, non-naturalistic colors. Henri Matisse and André Derain were leading figures in this movement.",
}

def get_art_recommendations(category=None, style=None, price_range=None):
    """Get art recommendations based on user preferences"""
    recommendations = []
    
    if category:
        # Filter by category
        if category.lower() in ["landscape", "landscape photography"]:
            recommendations.append("Consider 'A Foggy Forest A Forest Pathway' - a beautiful landscape photography piece that captures the serene beauty of nature.")
        elif category.lower() in ["seascape", "seascape photography"]:
            recommendations.append("Check out 'Echoes of A Sunset At The Pier' - stunning seascape photography that captures the dramatic colors of sunset over water.")
        elif category.lower() in ["botanical", "botanical photography"]:
            recommendations.append("Explore 'Wildflowers In A Meadow' - exquisite botanical photography showcasing nature's delicate beauty.")
    
    if style:
        if style.lower() in ["impressionist", "impressionism"]:
            recommendations.append("For impressionist style, try 'Dream of A Forest Pathway' - it captures the essence of impressionist painting with its dreamy, atmospheric quality.")
        elif style.lower() in ["black and white", "monochrome"]:
            recommendations.append("For black and white photography, consider 'A Foggy Forest A Forest Pathway' - it showcases the dramatic contrast and timeless appeal of monochrome images.")
    
    if price_range:
        if price_range == "budget":
            recommendations.append("For budget-friendly options, look at pieces under $200 like 'Echoes of A Sunset At The Pier' ($170.28) or 'Wildflowers In A Meadow' ($186.56).")
        elif price_range == "premium":
            recommendations.append("For premium pieces, consider 'Dream of A Forest Pathway' ($328.13) or 'A Sunrise Over Mountains in Snowy Mountains' ($254.28).")
    
    return recommendations

@csrf_exempt
def chatbot_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "").strip().lower()
            
            # Check for specific artwork queries
            for key, info in ARTWORK_INFO.items():
                if key in user_message:
                    return JsonResponse({"reply": info})
            
            # Check for art history queries
            for key, info in ART_HISTORY_INFO.items():
                if key in user_message:
                    return JsonResponse({"reply": info})
            
            # Check for art technique queries
            for key, info in ART_TECHNIQUES.items():
                if key in user_message:
                    return JsonResponse({"reply": info})
            
            # Check for art style queries
            for key, info in ART_STYLES.items():
                if key in user_message:
                    return JsonResponse({"reply": info})
            
            # Handle recommendation requests
            if any(word in user_message for word in ["recommend", "suggestion", "suggest", "find", "looking for"]):
                recommendations = []
                
                if "landscape" in user_message:
                    recommendations.extend(get_art_recommendations(category="landscape"))
                if "seascape" in user_message:
                    recommendations.extend(get_art_recommendations(category="seascape"))
                if "botanical" in user_message:
                    recommendations.extend(get_art_recommendations(category="botanical"))
                if "impressionist" in user_message:
                    recommendations.extend(get_art_recommendations(style="impressionist"))
                if "budget" in user_message or "cheap" in user_message:
                    recommendations.extend(get_art_recommendations(price_range="budget"))
                if "premium" in user_message or "expensive" in user_message:
                    recommendations.extend(get_art_recommendations(price_range="premium"))
                
                if recommendations:
                    return JsonResponse({"reply": "Here are some recommendations for you:\n\n" + "\n\n".join(recommendations)})
            
            # Handle greeting and general questions
            if any(word in user_message for word in ["hello", "hi", "hey", "help", "what can you do"]):
                return JsonResponse({
                    "reply": "Hello! I'm your Art Gallery Assistant. I can help you with:\n\n" +
                            "• Information about famous artworks and artists\n" +
                            "• Art history and movements\n" +
                            "• Art techniques and styles\n" +
                            "• Recommendations based on your preferences\n" +
                            "• General art knowledge\n\n" +
                            "Just ask me anything about art!"
                })
            
            # Handle price inquiries
            if any(word in user_message for word in ["price", "cost", "how much", "expensive"]):
                return JsonResponse({
                    "reply": "Our artwork prices range from around $150 to $350. You can find budget-friendly options under $200, mid-range pieces between $200-$250, and premium artwork above $250. Would you like specific recommendations based on your budget?"
                })
            
            # Handle category inquiries
            if any(word in user_message for word in ["category", "type", "style", "what kinds"]):
                return JsonResponse({
                    "reply": "We offer various categories including:\n\n" +
                            "• Landscape Photography\n" +
                            "• Seascape Photography\n" +
                            "• Botanical Photography\n" +
                            "• Nature Photography\n" +
                            "• Black and White Photography\n" +
                            "• Impressionist Painting\n\n" +
                            "What interests you most?"
                })
            
            # Default response with helpful suggestions
            return JsonResponse({
                "reply": "I'd be happy to help you learn about art! You can ask me about:\n\n" +
                        "• Specific artworks (like 'Starry Night' or 'Mona Lisa')\n" +
                        "• Art movements (like 'Impressionism' or 'Renaissance')\n" +
                        "• Art techniques (like 'oil painting' or 'watercolor')\n" +
                        "• Recommendations for specific styles or categories\n" +
                        "• General art history and knowledge\n\n" +
                        "What would you like to know?"
            })
            
        except json.JSONDecodeError:
            return JsonResponse({"reply": "I couldn't understand your message. Please try again."}, status=400)
        except Exception as e:
            return JsonResponse({"reply": "Sorry, I encountered an error. Please try again."}, status=500)
    
    return JsonResponse({"error": "POST request required."}, status=400)


@api_view(['POST'])
def send_order_email(request):
    try:
        data = request.data
        print(f"DEBUG: Received data: {data}")
        
        email_to = data.get('email')
        artwork_name = data.get('artwork_name')  # Changed from artworkName to artwork_name
        quantity = data.get('quantity')
        total_price = data.get('total_price')    # Changed from total to total_price
        
        print(f"DEBUG: email_to: {email_to}")
        print(f"DEBUG: artwork_name: {artwork_name}")
        print(f"DEBUG: quantity: {quantity}")
        print(f"DEBUG: total_price: {total_price}")
        print(f"DEBUG: All required fields present: {all([email_to, artwork_name, quantity, total_price])}")

        if not all([email_to, artwork_name, quantity, total_price]):
            missing_fields = []
            if not email_to: missing_fields.append('email')
            if not artwork_name: missing_fields.append('artwork_name')
            if not quantity: missing_fields.append('quantity')
            if not total_price: missing_fields.append('total_price')
            
            return Response({
                'error': 'Missing data',
                'missing_fields': missing_fields,
                'received_data': data
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create the order in the database first
        from .models import Order
        order = Order.objects.create(
            full_name=data.get('full_name', 'Unknown'),
            email=email_to,
            artwork_name=artwork_name,
            quantity=quantity,
            total_price=total_price,
            address=data.get('address', ''),
            pincode=data.get('pincode', ''),
            payment_method=data.get('payment_method', 'COD')
        )

        subject = f'Your Order Confirmation - {artwork_name}'
        
        # HTML version of the email
        html_message = f"""
        <html>
            <body>
                <h2>Thank you for your order from Kalamrut!</h2>
                <p>Order Details:</p>
                <ul>
                    <li><strong>Order ID:</strong> {order.id}</li>
                    <li><strong>Artwork:</strong> {artwork_name}</li>
                    <li><strong>Quantity:</strong> {quantity}</li>
                    <li><strong>Total:</strong> ₹{float(total_price):.2f}</li>
                </ul>
                <p>We'll process your order shortly and keep you updated on the status.</p>
                <p>If you have any questions about your order, please reply to this email.</p>
                <p>Best regards,<br>The Kalamrut Team</p>
            </body>
        </html>
        """
        
        # Plain text version for email clients that don't support HTML
        plain_message = f"""
        Thank you for your order from Kalamrut!

        Order Details:
        - Order ID: {order.id}
        - Artwork: {artwork_name}
        - Quantity: {quantity}
        - Total: ${float(total_price):.2f}

        We'll process your order shortly and keep you updated on the status.

        If you have any questions about your order, please reply to this email.

        Best regards,
        The Kalamrut Team
        """
        
        # Create the email
        from django.core.mail import EmailMultiAlternatives
        from django.conf import settings

        email = EmailMultiAlternatives(
            subject,
            plain_message,  # This is the plain text version
            settings.EMAIL_HOST_USER,
            [email_to]
        )
        email.attach_alternative(html_message, "text/html")  # This is the HTML version
        email.send(fail_silently=False)

        return Response({
            'success': 'Order created and email sent successfully',
            'order_id': order.id
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        logger.error(f"[ORDER CREATION/EMAIL SENDING FAILED] An error occurred: {str(e)}", exc_info=True)
        return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def subscribe_email(request):
    """Send a subscription confirmation email to the user email provided from Learning.js"""
    try:
        email_to = request.data.get('email')
        if not email_to:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        subject = 'Subscription Confirmed - Kalamrut Learning'
        html_message = (
            '<html><body>'
            '<h2>Welcome to Kalamrut Learning!</h2>'
            '<p>Thank you for subscribing. You will receive exclusive learning resources, event invites, '
            'and tutorials directly in your inbox.</p>'
            '<p>Stay inspired!<br/>Team Kalamrut</p>'
            '</body></html>'
        )
        plain_message = (
            'Welcome to Kalamrut Learning!\n\n'
            'Thank you for subscribing. You will receive exclusive learning resources, event invites, '
            'and tutorials directly in your inbox.\n\n'
            'Stay inspired!\nTeam Kalamrut'
        )

        email = EmailMultiAlternatives(
            subject,
            plain_message,
            settings.EMAIL_HOST_USER,
            [email_to],
        )
        email.attach_alternative(html_message, 'text/html')
        email.send(fail_silently=False)

        return Response({'success': True, 'message': 'Confirmation email sent'}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"[SUBSCRIBE EMAIL FAILED] {str(e)}", exc_info=True)
        return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def contact_message(request):
    """Forward contact form details to admin email"""
    try:
        name = request.data.get('name')
        email_from = request.data.get('email')
        message = request.data.get('message')
        if not all([name, email_from, message]):
            return Response({'error': 'Name, email and message are required'}, status=status.HTTP_400_BAD_REQUEST)

        admin_email = 'mannsoni181@gmail.com'
        subject = f'New Contact Message from {name}'
        html_message = f"""
        <html>
            <body>
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email_from}</p>
                <p><strong>Message:</strong><br/>{message}</p>
            </body>
        </html>
        """
        plain_message = (
            f"New Contact Message\n\nName: {name}\nEmail: {email_from}\n\nMessage:\n{message}"
        )

        email = EmailMultiAlternatives(
            subject,
            plain_message,
            settings.EMAIL_HOST_USER,
            [admin_email],
            reply_to=[email_from] if email_from else None,
        )
        email.attach_alternative(html_message, 'text/html')
        email.send(fail_silently=False)

        return Response({'success': True, 'message': 'Message sent to admin'}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"[CONTACT EMAIL FAILED] {str(e)}", exc_info=True)
        return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)