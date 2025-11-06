import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ScrollToTop from '../components/ScrollToTop';
const newsItems = [
  {
    img: '/assets/news1.jpg',
    title: 'The Rise of Space Art Galleries',
    date: 'Published: February 2025',
    modalContent: (
      <>
        <img style={{width: 400, height: 350}} src="/assets/news1.jpg" className="center mb-3 rounded" alt="Exploring Space Art" />
        <p>Art is no longer confined to Earth. As space travel becomes a reality, futuristic art galleries are emerging beyond our planet. Imagine floating exhibitions aboard space stations or lunar museums showcasing cosmic-inspired masterpieces. Leading artists and visionaries are working to merge technology with artistic expression, redefining how we experience art in zero gravity.</p>
      </>
    )
  },
  {
    img: '/assets/news6.jpg',
    title: 'First Art Exhibit on the Moon Announced!',
    date: 'Published: January 2025',
    modalContent: (
      <>
        <img style={{width: 400, height: 350}} src="/assets/news6.jpg" className="center mb-3 rounded" alt="Exploring Space Art" />
        <p>The world's first lunar कलामृत is set to launch in 2026! A collaboration between top space agencies and renowned artists, this project will feature sculptures designed to withstand the harsh lunar environment. Visitors—whether astronauts or future space tourists—will witness art like never before.</p>
      </>
    )
  },
  {
    img: '/assets/news3.jpg',
    title: 'Virtual Reality Meets Space Art',
    date: 'Published: December 2024',
    modalContent: (
      <>
        <img style={{width: 400, height: 350}} src="/assets/news3.jpg" className="center mb-3 rounded" alt="Exploring Space Art" />
        <p>What if you could visit a कलामृत orbiting Earth from your home? With advancements in virtual reality, space-inspired exhibits are now accessible to anyone. Explore stunning 3D-rendered galleries filled with artwork that reacts to cosmic data, like solar flares and planetary movements.</p>
      </>
    )
  },
  {
    img: '/assets/news4.jpg',
    title: 'AI-Generated Art Travels to Space',
    date: 'Published: March 2025',
    modalContent: (
      <>
        <img style={{width: 400, height: 350}} src="/assets/news4.jpg" className="center mb-3 rounded" alt="Exploring Space Art" />
        <p>For the first time in history, AI-generated artwork is being displayed aboard the International Space Art Station (ISAS). Created using machine learning algorithms that analyze cosmic patterns, these digital masterpieces reflect the beauty of the universe in a way never seen before.</p>
      </>
    )
  },
  {
    img: '/assets/news5.jpg',
    title: 'The First Zero-Gravity Art Performance',
    date: 'Published: February 2025',
    modalContent: (
      <>
        <img style={{width: 400, height: 350}} src="/assets/news5.jpg" className="center mb-3 rounded" alt="Exploring Space Art" />
        <p>A team of space travelers and artists have just conducted the world's first zero-gravity art performance aboard a commercial spaceflight. Using floating paint droplets and slow-motion brush techniques, they created an otherworldly masterpiece—proving that creativity knows no boundaries, even in microgravity!</p>
      </>
    )
  },
  {
    img: '/assets/news2.jpg',
    title: 'Mars to Host First Human Art Installation in 2030',
    date: 'Published: January 2025',
    modalContent: (
      <>
        <img style={{width: 400, height: 350}} src="/assets/news2.jpg" className="center mb-3 rounded" alt="Exploring Space Art" />
        <p>As Mars colonization plans advance, artists are already preparing for the first permanent art installation on the Red Planet. The project, named "Echoes of Earth", will feature sculptures and paintings designed to withstand Martian conditions while telling the story of humanity's journey into space.</p>
      </>
    )
  },
];

const galleryImages = [
  'gwork.jpg', 'gwork2.jpg', 'gwork3.jpg', 'gwork4.jpg', 'gwork5.jpg', 'gwork6.jpg',
  'gwork7.jpg', 'gwork8.jpg', 'gwork9.jpg', 'gwork10.jpg', 'gwork11.jpg', 'gwork12.jpg',
  'gwork13.jpg', 'gwork14.jpg'
];

const Media = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) sectionRef.current.classList.add('show');
      if (galleryRef.current) galleryRef.current.classList.add('show');
    }, 100);
  }, []);

  // Modal open/close body scroll lock
  useEffect(() => {
    if (openModal !== null) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [openModal]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) setOpenModal(null);
  };

  return (
    <>
      <section ref={sectionRef} id="featured-media" className="py-5 text-white text-center fade-in section parallax" style={{backgroundImage: "url(/assets/parallax3.jpg)", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mt-2">
          <h2 className="mb-4 mt-5">Media & Press</h2>
          <p>Stay updated with our latest news, events, and media coverage.</p>
          <div className="row justify-content-center g-4">
            {newsItems.map((item, i) => (
              <div className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch" key={i}>
                <div className="card w-100 h-100 d-flex flex-column justify-content-between">
                  <img src={item.img} className="card-img-top" alt={item.title} />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title" style={{color: 'black'}}>{item.title}</h5>
                      <p className="card-text" style={{color: 'black'}}>{item.date}</p>
                    </div>
                    <button className="btn btn-primary mt-auto" onClick={() => setOpenModal(i)}>Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modals */}
        {openModal !== null && ReactDOM.createPortal(
          <>
            <div className="modal fade show react-bootstrap-modal" tabIndex="-1" style={{display:'block'}} onClick={handleBackdropClick}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{newsItems[openModal].title}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setOpenModal(null)}></button>
                  </div>
                  <div className="modal-body">
                    {newsItems[openModal].modalContent}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>,
          document.body
        )}
      </section>

      {/* Gallery Highlights Section */}
      <section ref={galleryRef} className="py-5 fade-in section parallax" style={{backgroundImage: "url(/assets/parallax4.jpg)", backgroundSize: 'cover'}}>
        <div className="container text-center">
          <h2 className="mb-4 mt-2">Gallery Highlights</h2>
          <div className="row">
            {galleryImages.map((img, idx) => (
              <div className="col-6 col-md-4 col-lg-3 mb-3 fade-in" key={img}>
                <a href={`/assets/${img}`} target="_blank" rel="noopener noreferrer">
                  <img src={`/assets/${img}`} className="gallery-img img-fluid" alt={`Gallery Highlight ${idx+1}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
};

export default Media; 
 