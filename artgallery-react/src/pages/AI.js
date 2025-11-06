import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AI = () => {
  const sectionRef = useRef(null);
  const [apiStatus, setApiStatus] = useState('Testing...');
  const [testResult, setTestResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('show');
      }
    }, 100);
  }, []);

  const testAPI = async () => {
    try {
      setApiStatus('Testing connection...');
      console.log('Attempting to connect to Django API...');
      
      // Try with fetch first as a backup
      try {
        const fetchResponse = await fetch('http://localhost:8000/api/ai-art/test/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (fetchResponse.ok) {
          const fetchData = await fetchResponse.json();
          console.log('Fetch Response:', fetchData);
          setTestResult(fetchData);
          setApiStatus('✅ Connected to Django API! (via fetch)');
          return;
        }
      } catch (fetchError) {
        console.log('Fetch failed, trying axios...', fetchError);
      }
      
      const response = await axios.get('http://localhost:8000/api/ai-art/test/', {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('API Response:', response);
      setTestResult(response.data);
      setApiStatus('✅ Connected to Django API!');
    } catch (error) {
      console.error('API Error Details:', {
        message: error.message,
        code: error.code,
        response: error.response,
        request: error.request
      });
      setApiStatus('❌ Failed to connect to Django API');
      setTestResult({ 
        error: error.message,
        details: {
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText
        }
      });
    }
  };

  const generateArt = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/ai-art/generate/', {
        prompt: 'A beautiful sunset over mountains',
        style: 'realistic'
      });
      console.log('AI Art Generation:', response.data);
      alert('AI Art generation endpoint working! Check console for details.');
    } catch (error) {
      console.error('Generation Error:', error);
      alert('Error generating AI art. Check console for details.');
    }
  };

  const handleDiveClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page without any redirect parameter
      navigate('/login');
    } else {
      navigate('/ai-art');
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="ai-page section parallax fade-in classic-art-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
        background: "url('/assets/classic-ceiling.jpg') center center / cover no-repeat fixed"
      }}
    >
      {/* Remove blobs for clarity */}
      <div className="classic-art-objects-bg"></div>
      <div className="classic-art-overlay"></div>
      <div className="classic-art-frame">
        <div className="container text-center" style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          <h1 className="classic-art-title mb-4">AI कलामृत</h1>
          <p className="classic-art-lead mb-5">
            Experience the harmony of technology and timeless art.<br />
            Explore, create, and connect with AI-powered creativity.
          </p>
          {/* API Status */}
          <div className="mb-4">
            <p className="classic-art-status mb-2">{apiStatus}</p>
            <button
              className="classic-art-btn me-2"
              onClick={testAPI}
            >
              Test API Connection
            </button>
            <button
              className="classic-art-btn"
              onClick={generateArt}
            >
              Test AI Generation
            </button>
          </div>
          {/* Test Results */}
          {testResult && (
            <div className="classic-art-alert text-start">
              <strong>API Response:</strong>
              <pre className="mt-2" style={{ fontSize: '0.9rem', background: 'none', border: 'none', color: '#fff' }}>
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
          <button
            className="classic-art-btn classic-art-main-btn mt-4"
            onClick={handleDiveClick}
          >
            🎨 Dive into AI Art
          </button>
        </div>
      </div>
    </section>
  );
};

export default AI; 