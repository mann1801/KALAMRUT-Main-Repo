import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artists from './pages/Artists';
import ArtFairs from './pages/ArtFairs';
import Exhibitions from './pages/Exhibitions';
import Exhibitions1 from './pages/Exhibitions1';
import Exhibitions2 from './pages/Exhibitions2';
import Exhibitions3 from './pages/Exhibitions3';
import Exhibitions4 from './pages/Exhibitions4';
import Learning from './pages/Learning';
import Media from './pages/Media';
import Contact from './pages/Contact';
import AI from './pages/AI';
import AIArt from './pages/AIArt';
import Paintings from './pages/Paintings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import AIChatbotModal from './components/AIChatbotModal';
// import other pages as you convert them
import './styles/style.css';

// Auth wrapper
function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppRoutes() {
  const location = useLocation();
  
  // Standalone pages (no Navbar/Footer)
  if (location.pathname === '/paintings') {
    return <Paintings />;
  }
  if (location.pathname === '/checkout' || location.pathname === '/cart' || location.pathname === '/wishlist') {
    return (
      <>
        {location.pathname === '/checkout' ? <Checkout /> : location.pathname === '/cart' ? <Cart /> : <Wishlist />}
        <AIChatbotModal />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<Artists />} />
        <Route path="/artfair" element={<ArtFairs />} />
        <Route path="/exhibition" element={<Exhibitions />} />
        <Route path="/exhibition1" element={<Exhibitions1 />} />
        <Route path="/exhibition2" element={<Exhibitions2 />} />
        <Route path="/exhibition3" element={<Exhibitions3 />} />
        <Route path="/exhibition4" element={<Exhibitions4 />} />
        <Route path="/learn" element={<Learning />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/ai-art" element={
          <RequireAuth>
            <AIArt />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/paintings" element={<Paintings />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* Add other routes here as you convert pages */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
      {/* Place the chatbot at the root so it appears on all pages */}
      <AIChatbotModal />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
