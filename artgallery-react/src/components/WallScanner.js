import React, { useState, useRef } from 'react';
import ArtworkPopup from './ArtworkPopup';
import axios from 'axios';

const WallScanner = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Cleanup camera stream on modal close
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;

    setIsLoading(true);
    setError('');
    setRecommendations([]);

    const formData = new FormData();
    formData.append('image', file);

    try {
            const response = await axios.post('http://localhost:8000/api/wall-scanner/recommend/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds timeout
      });

      if (response.data.success) {
        setRecommendations(response.data.recommendations);
        setUploadedImage(URL.createObjectURL(file));
      } else {
        // Handle case where no wall is detected
        if (response.data.wall_detected === false) {
          setError(response.data.message || 'No wall detected in the image. Please upload a photo of a wall.');
        } else {
          setError('Failed to get recommendations');
        }
      }
    } catch (error) {
      console.error('Wall scanner error:', error);
      setError(error.response?.data?.message || 'Error processing image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const startCamera = async () => {
    setError("");
    setCapturedPhoto(null);
    setShowCamera(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera error:', error);
      setError('Camera error: ' + error.message);
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      
      // Flip the canvas horizontally to correct the mirroring
      context.scale(-1, 1);
      context.translate(-canvasRef.current.width, 0);
      
      context.drawImage(videoRef.current, 0, 0);
      canvasRef.current.toBlob((blob) => {
        const file = new File([blob], 'wall-photo.jpg', { type: 'image/jpeg' });
        setCapturedPhoto({ file, url: URL.createObjectURL(blob) });
        stopCamera();
      }, 'image/jpeg');
    }
  };

  const handleUseCapturedPhoto = () => {
    if (capturedPhoto && capturedPhoto.file) {
      handleImageUpload(capturedPhoto.file);
      setCapturedPhoto(null);
    }
  };

  const handleRetakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleClosePopup = () => {
    setSelectedArtwork(null);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(30,30,30,0.7)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#fff',
      backdropFilter: 'blur(12px) saturate(120%)',
      WebkitBackdropFilter: 'blur(12px) saturate(120%)',
      animation: 'fadeIn 0.5s ease',
      overflow: 'auto',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1001
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#f3f3e6',
          textShadow: 'none',
          margin: 0,
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          letterSpacing: '1.5px',
        }}>
          AI Wall Scanner
        </h2>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#f3f3e6',
            fontSize: '2rem',
            fontFamily: 'Playfair Display, serif',
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 0,
            transition: 'color 0.2s',
          }}
        >
          ×
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        maxWidth: '1200px',
        width: '100%',
        marginTop: '80px'
      }}>
        {/* Upload Section */}
        {!isLoading && recommendations.length === 0 && !showCamera && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '40px',
            border: 'none',
            borderRadius: '20px',
            background: 'rgba(30,30,30,0.55)',
            boxShadow: '0 2px 16px #0008',
          }}>
            <h3 style={{ color: '#ffd700', margin: 0 }}>Upload Your Wall Photo</h3>
            <p style={{ color: '#b2fefa', textAlign: 'center', margin: 0 }}>
              Take a photo of your wall or upload an existing image to get AI-powered artwork recommendations
            </p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '15px 30px',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(90deg, #00fff7 0%, #4ecdc4 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px #00fff7'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                📁 Upload Image
              </button>
              
              <button
                onClick={startCamera}
                style={{
                  padding: '15px 30px',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(90deg, #4ecdc4 0%, #00fff7 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px #4ecdc4'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                📷 Take Photo
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
        )}

        {/* Camera Interface */}
        {showCamera && !capturedPhoto && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            border: '1.5px solid #ffd700',
            borderRadius: '20px',
            background: 'rgba(30,30,30,0.7)',
          }}>
            <video 
              ref={videoRef}
              width="400" 
              height="300" 
              autoPlay 
              playsInline 
              style={{
                borderRadius: '10px',
                border: '1.5px solid #ffd700',
                background: '#000',
                transform: 'scaleX(-1)'
              }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={capturePhoto}
                style={{
                  padding: '12px 25px',
                  fontSize: '1rem',
                  background: 'rgba(30,30,30,0.85)',
                  border: '1.5px solid #ffd700',
                  borderRadius: '25px',
                  color: '#ffd700',
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                📸 Capture
              </button>
              <button
                onClick={stopCamera}
                style={{
                  padding: '12px 25px',
                  fontSize: '1rem',
                  background: 'rgba(30,30,30,0.85)',
                  border: '1.5px solid #fff',
                  borderRadius: '25px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Captured Photo Preview */}
        {capturedPhoto && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
            padding: '20px', border: '1.5px solid #ffd700', borderRadius: '20px', background: 'rgba(30,30,30,0.7)'
          }}>
            <img src={capturedPhoto.url} alt="Captured wall" style={{ maxWidth: '400px', maxHeight: '300px', borderRadius: '10px', border: '1.5px solid #ffd700' }} />
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={handleUseCapturedPhoto}
                style={{
                  padding: '12px 25px',
                  fontSize: '1rem',
                  background: 'rgba(30,30,30,0.85)',
                  border: '1.5px solid #ffd700',
                  borderRadius: '25px',
                  color: '#ffd700',
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ✅ Use Photo
              </button>
              <button
                onClick={handleRetakePhoto}
                style={{
                  padding: '12px 25px',
                  fontSize: '1rem',
                  background: 'rgba(30,30,30,0.85)',
                  border: '1.5px solid #fff',
                  borderRadius: '25px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                🔄 Retake
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '40px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #00fff7',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: '#00fff7', fontSize: '1.2rem' }}>
              Analyzing your wall and finding perfect artwork matches...
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div style={{
            padding: '20px',
            background: 'rgba(255, 107, 107, 0.2)',
            border: '2px solid #ff6b6b',
            borderRadius: '10px',
            color: '#ff6b6b',
            textAlign: 'center'
          }}>
            <p>{error}</p>
            <button
              onClick={() => setError('')}
              style={{
                padding: '8px 16px',
                background: '#ff6b6b',
                border: 'none',
                borderRadius: '5px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Display */}
        {recommendations.length > 0 && (
          <div style={{ width: '100%' }}>
            <h3 style={{ 
              color: '#f3f3e6',
              textAlign: 'center', 
              marginBottom: '30px',
              fontSize: '2rem',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
            }}>
              🎨 Recommended Artworks
            </h3>
            {uploadedImage && (
              <div style={{
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <h4 style={{ color: '#f3f3e6', marginBottom: '10px', fontFamily: 'Playfair Display, serif' }}>Your Wall:</h4>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded wall" 
                  style={{
                    maxWidth: '300px',
                    maxHeight: '200px',
                    borderRadius: '10px',
                    border: '1.5px solid #ffd700'
                  }}
                />
              </div>
            )}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              maxHeight: '60vh',
              overflowY: 'auto',
              padding: '20px'
            }}>
              {recommendations.map((rec, index) => (
                <div key={rec.id} style={{
                  background: 'rgba(30,30,30,0.7)',
                  border: '1.5px solid #ffd700',
                  borderRadius: '15px',
                  padding: '15px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  color: '#f3f3e6',
                  fontFamily: 'Merriweather, serif',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => handleArtworkClick(rec)}
                >
                  <img 
                    src={rec.image} 
                    alt={rec.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      marginBottom: '10px',
                      border: '1.5px solid #ffd700'
                    }}
                  />
                  <h4 style={{ 
                    color: '#f3f3e6', 
                    margin: '10px 0',
                    fontSize: '1.1rem',
                    fontFamily: 'Playfair Display, serif',
                  }}>
                    {rec.name}
                  </h4>
                  <p style={{ 
                    color: '#f3f3e6',
                    fontSize: '0.9rem',
                    margin: '5px 0',
                    fontFamily: 'Merriweather, serif',
                  }}>
                    Match: {rec.confidence.toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={() => {
                  setRecommendations([]);
                  setUploadedImage(null);
                  setError('');
                }}
                style={{
                  padding: '12px 25px',
                  fontSize: '1rem',
                  background: 'rgba(30,30,30,0.85)',
                  border: '1.5px solid #ffd700',
                  borderRadius: '25px',
                  color: '#ffd700',
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                🔄 Scan Another Wall
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <ArtworkPopup artwork={selectedArtwork} onClose={handleClosePopup} />
    </div>
  );
};

export default WallScanner; 