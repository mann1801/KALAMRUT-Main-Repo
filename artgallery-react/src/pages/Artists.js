import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ScrollToTop from '../components/ScrollToTop';
const artists = [
  { img: '/assets/artist1.jpg', name: 'Frida Kahlo', desc: 'Contemporary Painter', bio: 'Frida Kahlo is a famous contemporary painter known for abstract masterpieces.', style: 'Modern, Abstract', exhibitions: 'Art Expo 2024, Modern Art Museum' },
  { img: '/assets/artist2.jpg', name: 'Kara Walker', desc: 'Sculpture Artist', bio: 'Kara Walker is a sculpture artist specializing in stone and bronze sculptures.', style: 'Realistic Sculptures', exhibitions: 'Global Sculpture Fair, Art & Metal Expo' },
  { img: '/assets/artist3.jpg', name: 'Jackson Pollock', desc: 'Photographer', bio: 'Jackson Pollock captures the beauty of life through photography.', style: 'Street Photography, Landscape', exhibitions: 'World Photography Expo, Lens Festival' },
  { img: '/assets/artist4.jpg', name: 'Yayoi Kusama', desc: 'Oil Painting Expert', bio: 'Yayoi Kusama is renowned for her immersive installations and polka dot motifs.', style: 'Installation, Contemporary', exhibitions: 'Infinity Mirror Rooms, Tate Modern' },
  { img: '/assets/artist5.jpg', name: 'Andy Warhol', desc: 'Digital Illustrator', bio: 'Andy Warhol was a leading figure in the pop art movement.', style: 'Pop Art, Digital', exhibitions: 'The Factory, MoMA' },
  { img: '/assets/artist6.jpg', name: 'Mary Cassatt', desc: 'Street Graffiti Artist', bio: 'Mary Cassatt is known for her vibrant street murals.', style: 'Graffiti, Urban', exhibitions: 'Urban Walls, Street Art Expo' },
  { img: '/assets/artist7.jpg', name: 'Salvador Dalí', desc: 'Watercolor Specialist', bio: 'Salvador Dalí is celebrated for his surrealist watercolors.', style: 'Surrealism, Watercolor', exhibitions: 'Dreamscapes, Surrealist Gallery' },
  { img: '/assets/artist8.jpg', name: 'Frida Kahlo', desc: 'Conceptual Artist', bio: 'Frida Kahlo explores conceptual themes in her work.', style: 'Conceptual, Modern', exhibitions: 'Conceptual Art Fair, Modernist Museum' },
  { img: '/assets/artist9.jpg', name: 'Louise Bourgeois', desc: 'Minimalist Art Creator', bio: 'Louise Bourgeois is known for her minimalist sculptures.', style: 'Minimalism, Sculpture', exhibitions: 'Minimalist Expo, Sculpture Park' },
  { img: '/assets/artist10.jpg', name: 'Hilma af Klint', desc: 'Hyperrealism Expert', bio: 'Hilma af Klint pioneered abstract and hyperrealist art.', style: 'Abstract, Hyperrealism', exhibitions: 'Abstract Art Show, Hyperrealist Gallery' },
  { img: '/assets/artist11.jpg', name: 'Tamara de Lempicka', desc: 'Hyperrealism Expert', bio: 'Tamara de Lempicka is famous for her Art Deco portraits.', style: 'Art Deco, Hyperrealism', exhibitions: 'Art Deco Expo, Portrait Gallery' },
  { img: '/assets/artist12.jpg', name: 'Pablo Picasso', desc: 'Hyperrealism Expert', bio: 'Pablo Picasso revolutionized modern art with his unique style.', style: 'Cubism, Hyperrealism', exhibitions: 'Blue Period, Cubist Museum' },
];

const artworkImgs = ['/assets/artwork1.jpg', '/assets/artwork2.jpg', '/assets/artwork3.jpg'];

const Artists = () => {
  const sectionRef = useRef(null);
  const [openArtist, setOpenArtist] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('show');
      }
    }, 100);
  }, []);

  // Manage modal-open class on body
  useEffect(() => {
    if (openArtist !== null) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [openArtist]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) setOpenArtist(null);
  };

  return (
    <section
      ref={sectionRef}
      className="featured-artists section parallax"
      style={{ backgroundImage: "url(/assets/parallax2.jpg)" }}
    >
      <div className="container">
        <div className="row">
          {artists.map((artist, i) => (
            <div className="col-md-4 mt-4" key={i}>
              <div className="artist-card text-center" style={{cursor: 'pointer'}} onClick={() => setOpenArtist(i)}>
                <img src={artist.img} alt={artist.name} className="artist-img" />
                <h2 style={{color: 'aliceblue'}}>{artist.name}</h2>
                <p style={{color: 'aliceblue'}}>{artist.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for artist */}
      {openArtist !== null && ReactDOM.createPortal(
        <>
          <div className="modal fade show react-bootstrap-modal" tabIndex="-1" style={{display:'block'}} onClick={handleBackdropClick}>
            <div className="modal-dialog modal-dialog-centered" style={{maxWidth:700}}>
              <div className="modal-content" style={{color: 'black'}}>
                <div className="modal-header">
                  <h5 className="modal-title">{artists[openArtist].name} - {artists[openArtist].desc}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenArtist(null)}></button>
                </div>
                <div className="modal-body" style={{color: 'black'}}>
                  <img src={artists[openArtist].img} className="img-fluid mb-3 rounded" alt={artists[openArtist].name} />
                  <p><strong>Bio:</strong> {artists[openArtist].bio}</p>
                  <p><strong>Art Style:</strong> {artists[openArtist].style}</p>
                  <p><strong>Exhibitions:</strong> {artists[openArtist].exhibitions}</p>
                  <h4 style={{textAlign: 'center'}}>My Artworks</h4>
                  <div className="row justify-content-center">
                    {[...artworkImgs, ...artworkImgs].map((img, idx) => (
                      <div className="col-4 mb-3" key={idx}>
                        <a href={img} target="_blank" rel="noopener noreferrer">
                          <img src={img} className="artwork-img img-fluid" alt={`Artwork ${idx+1}`} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>,
        document.body
      )}
      <ScrollToTop />
    </section>
    
    
  );
};

export default Artists; 