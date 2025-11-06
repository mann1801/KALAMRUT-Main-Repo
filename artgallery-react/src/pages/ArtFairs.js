import React, { useEffect, useRef, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
const fairs = [
  { img: '/assets/fair1.jpg', name: 'New York Art Fair', desc: 'Experience the heart of contemporary art in NYC.' },
  { img: '/assets/fair2.jpg', name: 'Paris Art Expo', desc: 'Explore the elegance of French artistic expression.' },
  { img: '/assets/fair3.jpg', name: 'Tokyo Creative Festival', desc: 'A celebration of innovation in art and design.' },
  { img: '/assets/fair4.jpg', name: 'London Art Week', desc: 'Showcasing the best of British and international art.' },
  { img: '/assets/fair5.jpg', name: 'Berlin Art Fair', desc: 'Discover avant-garde and contemporary masterpieces.' },
  { img: '/assets/fair6.jpg', name: 'Venice Biennale', desc: 'A global platform for artistic innovation.' },
  { img: '/assets/fair7.jpg', name: 'Dubai Art Season', desc: 'Where tradition meets modernity in the Middle East.' },
  { img: '/assets/fair8.jpg', name: 'Sydney Art Month', desc: 'Celebrating creativity down under.' },
  { img: '/assets/fair9.jpg', name: 'Art Basel Miami', desc: 'The premier destination for modern and contemporary art.' },
  { img: '/assets/fair10.jpg', name: 'Hong Kong Art Central', desc: "Asia's leading art fair for contemporary talent." },
];

const ArtFairs = () => {
  const sectionRef = useRef(null);
  const [flipped, setFlipped] = useState(Array(fairs.length).fill(false));

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('show');
      }
    }, 100);
  }, []);

  const handleFlip = idx => {
    setFlipped(f => f.map((val, i) => (i === idx ? !val : val)));
  };

  return (<>
    <section
      ref={sectionRef}
      className="art-fairs py-5 section parallax"
      style={{ backgroundImage: "url(/assets/parallax4.jpg)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {fairs.map((fair, i) => (
            <div className="col-md-4 mt-5 text-center fair-card" key={i}>
              <div className={`flip-card2${flipped[i] ? ' flipped' : ''}`} onClick={() => handleFlip(i)}>
                <div className="flip-card2-inner">
                  <div className="flip-card2-front">
                    <img src={fair.img} alt={fair.name} className="img-fluid card-img-top" />
                    <h3>{fair.name}</h3>
                  </div>
                  <div className="flip-card2-back">
                    <h3>{fair.name}</h3>
                    <p style={{color: 'black', background: 'rgba(255,255,255,0.8)', borderRadius: '8px', padding: '8px'}}>{fair.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <ScrollToTop />
    </>
  );
};

export default ArtFairs; 