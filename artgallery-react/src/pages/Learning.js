import React, { useState, useEffect, useRef } from 'react';
import ScrollToTop from '../components/ScrollToTop';
const youtubeVideos = [
  { src: 'https://www.youtube.com/embed/rcfMSeilPkg', title: 'Basics of Painting' },
  { src: 'https://www.youtube.com/embed/wt9FLM1h35Y', title: 'Mastering Brush Strokes' },
  { src: 'https://www.youtube.com/embed/p0rVUhXnmpY', title: 'Understanding Color Theory' },
  { src: 'https://www.youtube.com/embed/DaxL4gYwUrU', title: 'Mastering Pencil Sketch' },
  { src: 'https://www.youtube.com/embed/cDzcoyeaRKI', title: 'Acrylic Painting Techniques' },
  { src: 'https://www.youtube.com/embed/FkjNbTCFY1Q', title: 'Mastering Ceramics(Pottery Art)' },
  { src: 'https://www.youtube.com/embed/OzemCeywKOM', title: 'Digital Art ESSENTIALS' },
  { src: 'https://www.youtube.com/embed/HVqSY_sHuyI', title: 'HOW TO INK' },
];

const Learning = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const videosRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('show');
      }
      if (videosRef.current) {
        videosRef.current.classList.add('show');
      }
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/ai-art/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setEmail('');
      } else {
        alert(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <>
      <section ref={sectionRef} className="learning-techniques py-5 section parallax" style={{backgroundImage: "url(/assets/parallax5.jpg)"}}>
        <div className="container mt-5">
          <h2 className="text-center mb-4">Our Learning Approach at कलामृत</h2>
          <p className="text-center">Discover, explore, and create through our interactive learning experiences.</p>
          <div className="row mt-4">
            <div className="col-md-6">
              <img src="/assets/learn1.jpg" className="img-fluid rounded" alt="Learning Art" />
            </div>
            <div className="col-md-6">
              <p style={{fontSize: 'larger', textAlign: 'justify'}}>
                At <strong>कलामृत</strong>, we believe that art is more than just visuals—it's a journey of <strong>self-expression, discovery, and innovation</strong>. Our learning initiative is designed to inspire both beginners and experienced artists by offering a diverse range of <strong>interactive workshops, expert-led tutorials, and hands-on experiences</strong>.Join us, unleash your creativity, and become part of a passionate community that celebrates the power of artistic expression! 🎭
              </p>
              <ul style={{fontSize: 'large'}}>
                <li> Workshops - Learn from expert artists through step-by-step tutorials.</li>
                <li> Live Demonstrations - Watch professional artists create stunning pieces in real-time.</li>
                <li> Gallery Walkthroughs - Deep dive into the history and significance of each artwork.</li>
                <li> Creative Challenges - Participate in art challenges to refine your skills.</li>
              </ul>
            </div>
          </div>
          <div className="row mt-5 subscribe-form">
            <div className="col-md-8 mx-auto">
              <div className="card shadow-lg text-center custom-card">
                <div className="card-body subscription-card">
                  <h4 className="card-title"> Stay Updated with Art & Learning</h4>
                  <p className="card-text">Subscribe to receive exclusive learning resources, event invites, and tutorials directly in your inbox.</p>
                  {submitted && <div className="alert alert-success">Thank you for subscribing!</div>}
                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input type="email" name="email" className="form-control" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
                      <button type="submit" className="btn btn-primary">Subscribe</button>
                    </div>
                  </form>
                  <small className="text-muted d-block mt-2">We respect your privacy. No spam, ever! </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section ref={videosRef} className="learning-videos py-5 bg-light section parallax fade-in" style={{backgroundImage: "url(/assets/parallax2.jpg)"}}>
        <div className="container">
          <h2 className="text-center mb-4">Learn Art with Youtube</h2>
          <div className="row">
            {youtubeVideos.map((video, idx) => (
              <div className="col-md-4 mb-4 d-flex flex-column align-items-center" key={video.src}>
                <div className="embed-responsive embed-responsive-16by9 w-100" style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%'}}>
                  <iframe
                    width="100%"
                    height="250"
                    src={video.src}
                    title={video.title}
                    allowFullScreen
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  ></iframe>
                </div>
                <p className="text-center mt-2">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
};

export default Learning; 