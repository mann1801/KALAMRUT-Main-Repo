import React, { useEffect, useRef, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
const featuredArtists = [
  {
    img: '/assets/artist1.jpg',
    name: 'Frida Kahlo',
    desc: 'Contemporary Painter',
    bio: 'Frida Kahlo is a famous contemporary painter known for abstract masterpieces.',
    style: 'Modern, Abstract',
    exhibitions: 'Art Expo 2024, Modern Art Museum',
  },
  {
    img: '/assets/artist2.jpg',
    name: 'Kara Walker',
    desc: 'Sculpture Artist',
    bio: 'Kara Walker is a sculpture artist specializing in stone and bronze sculptures.',
    style: 'Realistic Sculptures',
    exhibitions: 'Global Sculpture Fair, Art & Metal Expo',
  },
  {
    img: '/assets/artist3.jpg',
    name: 'Jackson Pollock',
    desc: 'Photographer',
    bio: 'Jackson Pollock captures the beauty of life through photography.',
    style: 'Street Photography, Landscape',
    exhibitions: 'World Photography Expo, Lens Festival',
  },
];

const artworkImgs = ['/assets/artwork1.jpg', '/assets/artwork2.jpg', '/assets/artwork3.jpg'];

const exhibitions = [
  {
    title: 'Panama Grand Art Revival',
    date: 'June 10, 2024',
    link: '/exhibition1',
    images: ['/assets/exhibition1.jpg', '/assets/exhibition3.jpg', '/assets/exhibition4.jpg'],
  },
  {
    title: 'Venice Modern Art Biennale',
    date: 'September 5 - October 20, 2024',
    link: '/exhibition2',
    images: ['/assets/exhibition2.jpg', '/assets/exhibition5.jpg', '/assets/exhibition6.jpg'],
  },
  {
    title: 'Tokyo Digital Art Festival',
    date: 'August 12 - 18, 2024',
    link: '/exhibition3',
    images: ['/assets/exhibition7.jpg', '/assets/exhibition8.jpg', '/assets/exhibition10.jpg'],
  },
  {
    title: 'London Street Art Showcase',
    date: 'May 20 - 30, 2024',
    link: '/exhibition4',
    images: ['/assets/exhibition11.jpg', '/assets/exhibition9.jpg', '/assets/exhibition12.jpg'],
  },
];

const Home = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const exhibitionsRef = useRef(null);
  const fairsRef = useRef(null);
  const learningRef = useRef(null);
  const mediaRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Flip state for each art fair card
  const [flipped, setFlipped] = useState([false, false, false]);
  // Modal state for featured artists
  const [openArtist, setOpenArtist] = useState(null);
  const [exhIndexes, setExhIndexes] = useState([0, 0]);
  const [hovered, setHovered] = useState([false, false]);

  useEffect(() => {
    setTimeout(() => heroRef.current?.classList.add('show'), 100);
    setTimeout(() => featuredRef.current?.classList.add('show'), 200);
    setTimeout(() => exhibitionsRef.current?.classList.add('show'), 300);
    setTimeout(() => fairsRef.current?.classList.add('show'), 400);
    setTimeout(() => learningRef.current?.classList.add('show'), 500);
    setTimeout(() => mediaRef.current?.classList.add('show'), 600);
    setTimeout(() => testimonialsRef.current?.classList.add('show'), 700);
    setTimeout(() => ctaRef.current?.classList.add('show'), 800);
  }, []);

  // Auto-advance logic for home carousels
  useEffect(() => {
    const timers = [0,1].map((exIdx) => {
      if (!hovered[exIdx]) {
        return setTimeout(() => {
          setExhIndexes(idxArr => idxArr.map((v, i) => (
            i === exIdx ? (v === exhibitions[exIdx].images.length - 1 ? 0 : v + 1) : v
          )));
        }, 3000);
      }
      return null;
    });
    return () => timers.forEach(timer => timer && clearTimeout(timer));
  }, [exhIndexes, hovered]);

  const handleFlip = idx => {
    setFlipped(f => f.map((val, i) => (i === idx ? !val : val)));
  };

  // Modal close on background click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) setOpenArtist(null);
  };

  return (
    <>
      {/* Navbar will be a shared component */}
      <section ref={heroRef} className="hero-section text-center text-white section parallax" style={{backgroundImage: "url(/assets/parallax1.jpg)"}}>
        <div className="container">
          <h1 className="display-4">Discover the World of Art</h1>
          <p>Explore our collections, exhibitions, and events.</p>
        </div>
      </section>
      <section ref={featuredRef} className="featured-artists section py-5 parallax" style={{backgroundImage: "url(/assets/parallax2.jpg)"}}>
        <div className="container">
          <h2 className="text-center mb-5" style={{color: 'aliceblue'}}>Featured Artists</h2>
          <div className="row">
            {featuredArtists.map((artist, i) => (
              <div className="col-md-4" key={i}>
                <div className="artist-card text-center" style={{cursor: 'pointer'}} onClick={() => setOpenArtist(i)}>
                  <img src={artist.img} alt={artist.name} className="artist-img" />
                  <h2 style={{color: 'aliceblue'}}>{artist.name}</h2>
                  <p style={{color: 'aliceblue'}}>{artist.desc}</p>
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <a href="/artist" className="btn btn-light">View More</a>
            </div>
          </div>
        </div>
      </section>
      {/* Modal for featured artist */}
      {openArtist !== null && (
        <>
          <div className="modal fade show react-bootstrap-modal" tabIndex="-1" style={{display:'block'}} onClick={handleBackdropClick}>
            <div className="modal-dialog modal-dialog-centered" style={{maxWidth:700}}>
              <div className="modal-content" style={{color: 'black'}}>
                <div className="modal-header">
                  <h5 className="modal-title">{featuredArtists[openArtist].name} - {featuredArtists[openArtist].desc}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenArtist(null)}></button>
                </div>
                <div className="modal-body" style={{color: 'black'}}>
                  <img src={featuredArtists[openArtist].img} className="img-fluid mb-3 rounded" alt={featuredArtists[openArtist].name} />
                  <p><strong>Bio:</strong> {featuredArtists[openArtist].bio}</p>
                  <p><strong>Art Style:</strong> {featuredArtists[openArtist].style}</p>
                  <p><strong>Exhibitions:</strong> {featuredArtists[openArtist].exhibitions}</p>
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
        </>
      )}
      <section ref={exhibitionsRef} className="upcoming-exhibitions py-5 section parallax" style={{backgroundImage: "url(/assets/parallax3.jpg)"}}>
        <div className="container">
          <h2 className="text-center mb-5 text-white">Exhibitions</h2>
          <div className="row">
            {exhibitions.slice(0,2).map((ex, exIdx) => (
              <div className="col-md-6 mt-5" key={exIdx}>
                <div className="excard d-flex flex-column mb-4">
                  <div className="carousel slide" style={{position:'relative'}}>
                    <div className="carousel-inner">
                      {ex.images.map((img, imgIdx) => (
                        <div className={`carousel-item${imgIdx === exhIndexes[exIdx] ? ' active' : ''}`} key={imgIdx}>
                          <img src={img} className="d-block h-25 w-100 rounded" alt={`${ex.title} Image ${imgIdx+1}`} style={{maxHeight: '300px', objectFit: 'cover'}} />
                        </div>
                      ))}
                    </div>
                    <button className="carousel-control-prev" type="button" onClick={() => setExhIndexes(idxArr => idxArr.map((v, i) => i === exIdx ? (v === 0 ? ex.images.length - 1 : v - 1) : v))} style={{width: '10%'}}>
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" onClick={() => setExhIndexes(idxArr => idxArr.map((v, i) => i === exIdx ? (v === ex.images.length - 1 ? 0 : v + 1) : v))} style={{width: '10%'}}>
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                    <div className="carousel-indicators mt-2">
                      {ex.images.map((_, imgIdx) => (
                        <button key={imgIdx} type="button" className={imgIdx === exhIndexes[exIdx] ? 'active' : ''} style={{borderRadius: '50%', width: 10, height: 10, margin: 2, border: 0, background: imgIdx === exhIndexes[exIdx] ? '#333' : '#bbb'}} onClick={() => setExhIndexes(idxArr => idxArr.map((v, i) => i === exIdx ? imgIdx : v))} aria-label={`Go to slide ${imgIdx+1}`}></button>
                      ))}
                    </div>
                  </div>
                  <div className="excard-body">
                    <h3 className="excard-title">{ex.title}</h3>
                    <p className="excard-text"> Date: {ex.date}</p>
                    <a href={ex.link} className="btn btn-dark">Learn More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a href="/exhibition" className="btn btn-light">See More</a>
          </div>
        </div>
      </section>
      <section ref={fairsRef} className="art-fairs py-5 section parallax" style={{backgroundImage: "url(/assets/parallax4.jpg)"}}>
        <div className="container">
          <h2 className="text-center mb-5">Art Fairs</h2>
          <div className="row">
            {[{
              img: '/assets/fair1.jpg',
              title: 'New York Art Fair',
              details: [
                'Location: New York',
                'Date: June 10, 2024',
                'Highlights: Modern & Classic Art',
                'Description: The New York Art Fair is one of the largest art festivals in the world, featuring contemporary artists, rare collections, and live painting sessions.'
              ]
            }, {
              img: '/assets/fair2.jpg',
              title: 'Paris Art Expo',
              details: [
                'Location: Paris',
                'Date: July 5, 2024',
                'Special Feature: Live Art Performance',
                'Description: The New York Art Fair is one of the largest art festivals in the world, featuring contemporary artists, rare collections, and live painting sessions.'
              ]
            }, {
              img: '/assets/fair3.jpg',
              title: 'Tokyo Creative Festival',
              details: [
                'Location: Tokyo',
                'Date: August 20, 2024',
                'Art Style: Contemporary & Digital Art',
                'Description: The New York Art Fair is one of the largest art festivals in the world, featuring contemporary artists, rare collections, and live painting sessions.'
              ]
            }].map((fair, idx) => (
              <div className="col-md-4 text-center" key={idx}>
                <div className={`flip-card${flipped[idx] ? ' flipped' : ''}`} onClick={() => handleFlip(idx)}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={fair.img} alt={fair.title} className="img-fluid" />
                    </div>
                    <div className="flip-card-back">
                      <h3>{fair.title}</h3>
                      {fair.details.map((d, i) => <p key={i}>{d}</p>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <a href="/artfair" className="btn btn-light">See More</a>
            </div>
          </div>
        </div>
      </section>
      <section ref={learningRef} className="learning-initiative bg-light py-5 section parallax" style={{backgroundImage: "url(/assets/parallax5.jpg)"}}>
        <div className="container">
          <h2 className="text-center mb-5">Learning Initiative</h2>
          <div className="row">
            <div className="col-md-6">
              <h3>Workshops</h3>
              <p>Join our art workshops and learn from the best.</p>
            </div>
            <div className="col-md-6">
              <h3>Classes</h3>
              <p>Enrol in our art classes and improve your skills.</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="/learn" className="btn btn-light">Join Us</a>
          </div>
        </div>
      </section>
      <section ref={mediaRef} className="media py-5 section parallax" style={{backgroundImage: "url(/assets/parallax6.jpg)"}}>
        <div className="container">
          <h2 className="text-center mb-5">Media</h2>
          <div className="row">
            <div className="col-md-6">
              <a href="/assets/fair10.jpg" target="_blank" rel="noopener noreferrer">
                <img src="/assets/fair10.jpg" alt="Media 1" className="img-fluid mb-3" />
              </a>
            </div>
            <div className="col-md-6">
              <a href="/assets/gwork6.jpg" target="_blank" rel="noopener noreferrer">
                <img src="/assets/gwork6.jpg" alt="Media 2" className="img-fluid mb-3" />
              </a>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="/media" className="btn btn-light">See More</a>
          </div>
        </div>
      </section>
      <section ref={testimonialsRef} className="testimonials bg-light py-5 section parallax" style={{backgroundImage: "url(/assets/parallax7.jpg)"}}>
        <div className="container">
          <h2 className="text-center mb-5">Visitor Reviews</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <blockquote className="blockquote">
                <p>"An amazing experience! The art is breathtaking."</p>
                <footer className="blockquote-footer">Aarti Patel</footer>
              </blockquote>
            </div>
            <div className="col-md-4 text-center">
              <blockquote className="blockquote">
                <p>"A must-visit for art lovers. Highly recommended!"</p>
                <footer className="blockquote-footer">Mann Soni</footer>
              </blockquote>
            </div>
            <div className="col-md-4 text-center">
              <blockquote className="blockquote">
                <p>"The exhibitions are world-class. Truly inspiring."</p>
                <footer className="blockquote-footer">Rajesh Parmar</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <section ref={ctaRef} className="cta-section text-center text-white py-5 section parallax" style={{backgroundImage: "url(/assets/parallax8.jpg)"}}>
        <div className="container">
          <h2 className="mb-4">Plan Your Visit Today!</h2>
          <a href="/contact" className="btn btn-light btn-lg">Contact Us</a>
        </div>
      </section>
      <ScrollToTop />
      {/* Footer will be a shared component */}
    </>
  );
};

export default Home; 