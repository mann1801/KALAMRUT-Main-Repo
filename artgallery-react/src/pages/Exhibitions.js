import React, { useEffect, useRef, useState } from 'react';

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

const Exhibitions = () => {
  const sectionRef = useRef(null);
  const [activeIndexes, setActiveIndexes] = useState(Array(exhibitions.length).fill(0));

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.classList.add('show');
      }
    }, 100);
  }, []);

  const goTo = (exIdx, imgIdx) => {
    setActiveIndexes(idxArr => idxArr.map((v, i) => (i === exIdx ? imgIdx : v)));
  };
  const prev = (exIdx) => {
    setActiveIndexes(idxArr => idxArr.map((v, i) => (
      i === exIdx ? (v === 0 ? exhibitions[exIdx].images.length - 1 : v - 1) : v
    )));
  };
  const next = (exIdx) => {
    setActiveIndexes(idxArr => idxArr.map((v, i) => (
      i === exIdx ? (v === exhibitions[exIdx].images.length - 1 ? 0 : v + 1) : v
    )));
  };

  return (
    <section ref={sectionRef} className="upcoming-exhibitions py-5 section parallax" style={{backgroundImage: "url(/assets/parallax3.jpg)"}}>
      <div className="container">
        <div className="row">
          {exhibitions.map((ex, exIdx) => (
            <div className="col-md-6 mt-5" key={exIdx}>
              <div className="excard d-flex flex-column mb-4">
                <div className="carousel slide" style={{position:'relative'}}>
                  <div className="carousel-inner">
                    {ex.images.map((img, imgIdx) => (
                      <div className={`carousel-item${imgIdx === activeIndexes[exIdx] ? ' active' : ''}`} key={imgIdx}>
                        <img src={img} className="d-block h-25 w-100 rounded" alt={`${ex.title} Image ${imgIdx+1}`} style={{maxHeight: '300px', objectFit: 'cover'}} />
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" onClick={() => prev(exIdx)} style={{width: '10%'}}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button className="carousel-control-next" type="button" onClick={() => next(exIdx)} style={{width: '10%'}}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                  <div className="carousel-indicators mt-2">
                    {ex.images.map((_, imgIdx) => (
                      <button key={imgIdx} type="button" className={imgIdx === activeIndexes[exIdx] ? 'active' : ''} style={{borderRadius: '50%', width: 10, height: 10, margin: 2, border: 0, background: imgIdx === activeIndexes[exIdx] ? '#333' : '#bbb'}} onClick={() => goTo(exIdx, imgIdx)} aria-label={`Go to slide ${imgIdx+1}`}></button>
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
      </div>
    </section>
  );
};

export default Exhibitions; 