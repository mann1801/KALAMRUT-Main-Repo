import React from 'react';

const Exhibitions1 = () => (
  <>
    <header className="exhibition1-hero" style={{backgroundImage: "url(/assets/exhibition1.jpg)"}}>
      <div className="overlay">
        <h1>Panama Grand Art Revival</h1>
        <p className="subheading">A Journey Through Contemporary Art</p>
      </div>
    </header>
    <section className="container my-5">
      <article>
        <h2 className="mb-3">An Artistic Celebration in the Heart of NYC</h2>
        <p className="text-muted"> Date: June 10, 2024 | Location: The Metropolitan Art Center,Panama</p>
        <p>The New York Art Fair is one of the most anticipated art exhibitions of the year, bringing together visionary artists, contemporary masterpieces, and a passionate audience.</p>
        <h3 className="mt-4"> Highlights</h3>
        <ul>
          <li>Over 200+ artists showcasing unique artworks.</li>
          <li>Live painting sessions with renowned painters.</li>
          <li>Exclusive virtual reality art experiences.</li>
          <li>Panama - The art world is abuzz with excitement as The Grand Art Revival opens its doors at the Metropolitan Art Center. This much-anticipated exhibition brings together masterpieces from the Renaissance to the contemporary era, offering visitors a unique opportunity to experience the evolution of artistic expression.</li>
        </ul>
        <h3 className="mt-4"> Featured Artists</h3>
        <p>Meet world-famous and emerging artists, including:</p>
        <ul>
          <li><b>Lisa Monroe</b> - Modern Impressionist</li>
          <li><b>David Chen</b> - Abstract & Street Art</li>
          <li><b>Isabella Romero</b> - Digital & AI-Generated Art</li>
        </ul>
        <h3 className="mt-4">Interactive Installations & Live Demonstrations</h3>
        <p>One of the major highlights of the exhibition is the immersive digital room, where guests can "step into" paintings using augmented reality. Visitors can also watch live painting demonstrations by contemporary artists, who will recreate classical techniques in a modern setting.
          In addition, there will be exclusive workshops where attendees can try their hand at traditional oil painting, charcoal sketching, and digital art techniques under the guidance of expert artists.</p>
        <h3 className="mt-4"> Visitor Information</h3>
        <p>Tickets are available online and at the venue. Secure your spot for an unforgettable art experience.</p>
        <p> Contact Us: For inquiries, email us at <a href="mailto:info@artgallery.com">info@artgallery.com</a></p>
      </article>
    </section>
  </>
);

export default Exhibitions1; 