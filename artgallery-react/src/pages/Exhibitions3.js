import React from 'react';

const Exhibitions3 = () => (
  <>
    <header className="exhibition1-hero" style={{backgroundImage: "url(/assets/exhibition7.jpg)"}}>
      <div className="overlay">
        <h1>Tokyo Digital Art Festival</h1>
        <p className="subheading">Where Technology Meets Creativity</p>
      </div>
    </header>
    <section className="container my-5">
      <article>
        <h2 className="mb-3">The Future of Digital Art in Tokyo</h2>
        <p className="text-muted"> Date: August 12 - 18, 2024 | Location: Tokyo, Japan</p>
        <p>The Tokyo Digital Art Festival is a cutting-edge exhibition featuring AI-generated art, interactive installations, and groundbreaking digital creations.</p>
        <h3 className="mt-4"> Highlights</h3>
        <ul>
          <li> AI-powered art that evolves in real-time.</li>
          <li> Holographic projections and immersive VR experiences.</li>
          <li> Interactive gaming-inspired artworks.</li>
        </ul>
        <h3 className="mt-4"> Featured Artists</h3>
        <ul>
          <li><b>Hiroshi Tanaka</b> - Cyberpunk Digital Art</li>
          <li><b>Mei Chang</b> - AI-Generated Visuals</li>
          <li><b>Liam Foster</b> - Augmented Reality Art</li>
        </ul>
        <h3 className="mt-4"> Visitor Information</h3>
        <p>Join this unique experience and witness the evolution of digital creativity.</p>
        <p> Contact Us: <a href="mailto:info@tokyodigitalartfest.com">info@tokyodigitalartfest.com</a></p>
      </article>
    </section>
  </>
);

export default Exhibitions3; 