import React from 'react';

const Exhibitions2 = () => (
  <>
    <header className="exhibition1-hero" style={{backgroundImage: "url(/assets/exhibition2.jpg)"}}>
      <div className="overlay">
        <h1>Venice Modern Art Biennale</h1>
        <p className="subheading">Exploring the Boundaries of Art & Innovation</p>
      </div>
    </header>
    <section className="container my-5">
      <article>
        <h2 className="mb-3">A Fusion of Tradition & Futurism in Venice</h2>
        <p className="text-muted"> Date: September 5 - October 20, 2024 | Location: Venice, Italy</p>
        <p>The Venice Modern Art Biennale is an international art exhibition that celebrates cutting-edge artistic expressions, blending tradition with modernity in one of the world's most culturally rich cities.</p>
        <h3 className="mt-4"> Highlights</h3>
        <ul>
          <li>Featuring over 300 contemporary artworks from global artists.</li>
          <li>Interactive AI-driven art installations.</li>
          <li>Live sculpting & digital art performances.</li>
        </ul>
        <h3 className="mt-4"> Featured Artists</h3>
        <p>This year's exhibition will showcase work from:</p>
        <ul>
          <li><b>Marco Bellini</b> - Abstract Surrealism</li>
          <li><b>Sofia Delgado</b> - Environmental & Eco-Art</li>
          <li><b>Tobias Nakamura</b> - AI & Digital Media</li>
        </ul>
        <h3 className="mt-4"> Visitor Information</h3>
        <p>Secure your tickets in advance to witness the future of art at this extraordinary biennale.</p>
        <p> Contact Us: For details, email <a href="mailto:info@veniceartbiennale.com">info@veniceartbiennale.com</a></p>
      </article>
    </section>
  </>
);

export default Exhibitions2; 