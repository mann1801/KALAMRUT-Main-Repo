# Wall Scanner AI Model Integration

This guide explains how to integrate your wall scanner AI model into the Art Gallery project.

## 🎯 Overview

The wall scanner allows users to:
- Upload or capture photos of their walls
- Get AI-powered artwork recommendations based on wall characteristics
- View recommended paintings with confidence scores

## 📁 Project Structure

```
Artgallery Sem 3 Project copy/
├── ai_backend/                    # Django backend
│   ├── ai_app/
│   │   ├── views.py              # Wall scanner API endpoints
│   │   └── urls.py               # URL routing
│   └── ai_backend/
│       ├── settings.py           # Django settings
│       └── urls.py               # Main URL configuration
├── artgallery-react/             # React frontend
│   └── src/
│       ├── components/
│       │   └── WallScanner.js    # Wall scanner component
│       └── pages/
│           └── AIArt.js          # Updated with wall scanner
├── wall scanner copy/            # Your AI model files
│   ├── MiDaS/
│   │   ├── artwork_embeddings.pkl
│   │   ├── paintings/            # Artwork images
│   │   └── wall_art_recommender.py
│   └── yolov8n-seg.pt
└── setup_wall_scanner.py         # Setup script
```

## 🚀 Quick Setup

### Step 1: Run the Setup Script

```bash
python setup_wall_scanner.py
```

This script will:
- Check Python version compatibility
- Install required dependencies
- Set up media directories
- Verify model files exist
- Create a test script

### Step 2: Start the Backend

```bash
cd ai_backend
python manage.py runserver
```

The Django server will start on `http://localhost:8000`

### Step 3: Start the Frontend

```bash
cd artgallery-react
npm start
```

The React app will start on `http://localhost:3000`

### Step 4: Test the Integration

1. Navigate to `http://localhost:3000`
2. Click on the "AI" section
3. Click "Dive into Art"
4. Click the "🎨 Painting" button
5. Upload or capture a wall photo
6. View AI-generated artwork recommendations

## 🔧 API Endpoints

### Wall Scanner Status
- **URL**: `GET /api/wall-scanner/status/`
- **Purpose**: Check if wall scanner model is available
- **Response**: Model readiness status

### Wall Scanner Recommendations
- **URL**: `POST /api/wall-scanner/recommend/`
- **Purpose**: Get artwork recommendations for uploaded wall image
- **Input**: Multipart form with image file
- **Response**: List of recommended artworks with images and confidence scores

## 🎨 Frontend Features

### WallScanner Component
- **File**: `artgallery-react/src/components/WallScanner.js`
- **Features**:
  - Image upload via file selection
  - Camera capture functionality
  - Real-time image processing
  - Gallery display of recommendations
  - Loading states and error handling

### Integration Points
- **AIArt.js**: Main page that launches the wall scanner
- **AI.js**: Entry point that navigates to AIArt page

## 🔍 Model Integration Details

### Current Implementation
The current implementation provides a simplified version that:
1. Loads artwork embeddings from the pickle file
2. Returns a subset of paintings as recommendations
3. Simulates confidence scores

### Full Model Integration (Future Enhancement)
To integrate the complete wall scanner model:

1. **Install Additional Dependencies**:
   ```bash
   pip install clip-by-openai torch torchvision
   ```

2. **Update the Backend**:
   - Load CLIP model for image encoding
   - Load YOLOv8 model for wall detection
   - Load MiDaS model for depth estimation
   - Implement full recommendation algorithm

3. **Model Loading**:
   ```python
   # In views.py
   import clip
   from ultralytics import YOLO
   import torch
   
   # Load models
   device = "cuda" if torch.cuda.is_available() else "cpu"
   model_clip, preprocess = clip.load("ViT-B/32", device=device)
   model_yolo = YOLO("yolov8n-seg.pt")
   midas = torch.hub.load("intel-isl/MiDaS", "DPT_Hybrid")
   ```

## 🧪 Testing

### Test the Setup
```bash
python test_wall_scanner.py
```

### Manual Testing
1. **Backend Test**: Visit `http://localhost:8000/api/wall-scanner/status/`
2. **Frontend Test**: Use the wall scanner interface in the React app
3. **Integration Test**: Upload a wall image and verify recommendations

## 🐛 Troubleshooting

### Common Issues

1. **Model Files Not Found**
   - Ensure `wall scanner copy` directory exists
   - Check that `artwork_embeddings.pkl` and `paintings/` directory are present

2. **Dependencies Installation Failed**
   - Try installing packages individually
   - Check Python version (3.8+ required)
   - Use virtual environment if needed

3. **CORS Errors**
   - Ensure Django CORS settings are configured
   - Check that frontend and backend ports match

4. **Image Upload Issues**
   - Verify media directory permissions
   - Check file size limits
   - Ensure proper MIME type handling

### Debug Mode
Enable Django debug mode in `ai_backend/ai_backend/settings.py`:
```python
DEBUG = True
```

## 📈 Performance Considerations

### Current Limitations
- Simplified recommendation algorithm
- No GPU acceleration for model inference
- Limited artwork database

### Optimization Opportunities
1. **GPU Acceleration**: Use CUDA for faster model inference
2. **Caching**: Cache model embeddings and recommendations
3. **Async Processing**: Handle image processing asynchronously
4. **CDN**: Serve artwork images from CDN for faster loading

## 🔮 Future Enhancements

1. **Advanced AI Models**: Integrate full CLIP, YOLO, and MiDaS models
2. **Real-time Processing**: Implement WebSocket for real-time updates
3. **User Preferences**: Allow users to set style preferences
4. **Artwork Database**: Expand the artwork collection
5. **Mobile Optimization**: Improve mobile camera experience

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Run the test script to verify setup
3. Check browser console for frontend errors
4. Check Django logs for backend errors

## 🎯 Next Steps

1. **Complete Model Integration**: Implement full wall scanner algorithm
2. **UI/UX Improvements**: Enhance the user interface
3. **Performance Optimization**: Add caching and GPU support
4. **Feature Expansion**: Add more AI art generation features 