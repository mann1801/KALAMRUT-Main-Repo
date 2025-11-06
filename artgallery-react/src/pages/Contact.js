import React, { useState, useEffect, useRef } from 'react';
import ScrollToTop from '../components/ScrollToTop';
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('show');
      }
    }, 100);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/ai-art/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        alert(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <>
      <section ref={sectionRef} className="featured-artists section parallax" style={{backgroundImage: "url(/assets/parallax2.jpg)"}}>
        <div className="container">
          <div className="row">
            <h2 className="mb-5">Follow Us on Social Media</h2>
            <div className="row mt-2">
              <div className="col-md-4">
                <h3>Instagram Highlights</h3>
                <iframe src="https://www.instagram.com/p/DFc8AT4IPya/embed" width="300" height="400" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
              </div>
              <div className="col-md-4">
                <h3>Spotify Podcast</h3>
                <iframe style={{borderRadius:'12px'}} src="https://open.spotify.com/embed/show/7cDCcEVMxvEZ8FJ5jeSvog?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </div>
              <div className="col-md-3">
                <h3>Twitter Highlights</h3>
                <blockquote class="twitter-tweet">
                    <p lang="en" dir="ltr">
                      Trick or Treat:<br/>10 Masterpieces for a Spooky Halloween 🎃<br/><br/>
                      1. Hieronymus Bosch - Hell
                      <a href="https://t.co/ax3bOKfFgh">pic.twitter.com/ax3bOKfFgh</a>
                    </p>
                    — Art Gallery (@X_ArtGallery)
                    <a href="https://twitter.com/X_ArtGallery/status/1984275871856021531">October 31, 2025</a>
                  </blockquote>
                  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid py-5 fade-in section parallax" style={{backgroundImage: "url(/assets/parallax4.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 style={{color: 'aliceblue'}}>Contact Us</h2>
              <p style={{color: 'aliceblue'}}>Fill out the form below, and we'll get back to you as soon as possible.</p>
              {submitted && <div className="alert alert-success">Thank you for contacting us!</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{color: 'aliceblue'}}>Name</label>
                  <input type="text" name="name" className="form-control" id="name" placeholder="Enter Your Name" required value={form.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{color: 'aliceblue'}}>Email</label>
                  <input type="email" name="email" className="form-control" id="email" placeholder="Enter Email" required value={form.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label" style={{color: 'aliceblue'}}>Message</label>
                  <textarea className="form-control" name="message" id="message" rows="4" placeholder="Enter Any Message" required value={form.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
            <div className="col-md-6 fade-in">
              <h2 style={{color: 'aliceblue'}}>Our Location</h2>
              <p style={{color: 'aliceblue'}}>Visit our gallery or contact us for more details.</p>
              <ul className="list-unstyled" style={{color: 'aliceblue'}}>
                <li><strong>📍 Address:</strong> कलामृत Mumbai, Mahalaxmi Racecourse</li>
                <li><strong>📞 Phone:</strong> +91 9874679381</li>
                <li><strong>📧 Email:</strong> contact@mumbaiartgallery.com</li>
              </ul>
              <div className="ratio ratio-16x9" style={{maxWidth: '100%', height: '350px'}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4735.779140980193!2d72.8138164863337!3d18.979891036322016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf00067e37fd%3A0xec4f4d1c9df764c4!2sART%20MUMBAI%20(%20Mahalaxmi%20Racecourse)!5e1!3m2!1sen!2sin!4v1740136903402!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
      {/* ...rest of the sections (Follow Us, etc.) can be added similarly... */}
    </>
  );
};

export default Contact; 