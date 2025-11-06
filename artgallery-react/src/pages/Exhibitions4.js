import React from 'react';

const Exhibitions4 = () => (
  <>
    <header className="exhibition1-hero" style={{backgroundImage: "url(/assets/exhibition11.jpg)"}}>
      <div className="overlay">
        <h1>London Street Art Showcase</h1>
        <p className="subheading">Urban Expression in the Heart of the City</p>
      </div>
    </header>
    <section className="container my-5">
      <article>
        <h2 className="mb-3">A Celebration of Graffiti & Urban Art</h2>
        <p className="text-muted"> Date: May 20 - 30, 2024 | Location: Shoreditch, London</p>
        <p>Experience the raw energy of London's street art scene with live mural paintings, graffiti battles, and interactive installations.</p>
        <h3 className="mt-4"> Highlights</h3>
        <ul>
          <li> Live graffiti battles featuring top artists.</li>
          <li> Interactive street art tours & workshops.</li>
          <li> Augmented reality-enhanced murals.</li>
        </ul>
        <h3 className="mt-4"> Featured Artists</h3>
        <ul>
          <li><b>Max Styles</b> - Graffiti Master</li>
          <li><b>Emily Fox</b> - 3D Street Art</li>
          <li><b>Javier Cruz</b> - Mixed Media Urban Art</li>
        </ul>
        <h3 className="mt-4"> Visitor Information</h3>
        <p>Don't miss this celebration of raw, unfiltered street creativity!</p>
        <p> Contact Us: <a href="mailto:info@londonstreetartshow.com">info@londonstreetartshow.com</a></p>
      </article>
    </section>
  </>
);

export default Exhibitions4; 