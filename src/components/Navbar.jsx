import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    setMobileMenu(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-cyber-black/90 shadow-lg backdrop-blur-md border-b border-cyber-border' : 'bg-cyber-black/70 backdrop-blur-md border-b border-cyber-border'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <img src="/logo.jpeg" alt="ARC Drive Logo" className="w-8 h-8 rounded group-hover:animate-pulse" />
          <span className="font-heading font-bold text-2xl text-white tracking-widest">ARC<span className="text-cyber-neon">DRIVE</span></span>
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
          <Link to="/" className="hover:text-cyber-neon transition-colors cursor-pointer text-gray-300">Home</Link>
          <a onClick={() => handleNavClick('problem')} className="hover:text-cyber-neon transition-colors cursor-pointer text-gray-300">The Problem</a>
          <a onClick={() => handleNavClick('solution')} className="hover:text-cyber-neon transition-colors cursor-pointer text-gray-300">Solution</a>
          <a onClick={() => handleNavClick('features')} className="hover:text-cyber-neon transition-colors cursor-pointer text-gray-300">Features</a>
          <Link to="/purchase" className="hover:text-cyber-neon transition-colors cursor-pointer text-gray-300">Buy Now</Link>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <button onClick={toggleTheme} className="text-gray-300 hover:text-cyber-neon transition-colors p-2 rounded-full hover:bg-white/5">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/cart" className="relative text-gray-300 hover:text-cyber-neon transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyber-alert text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <Link to="/purchase" className="btn-primary">
            Get Now
          </Link>
        </div>
        
        {/* Mobile Menu Btn */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-gray-300 hover:text-cyber-neon transition-colors p-2 rounded-full hover:bg-white/5">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/cart" className="relative text-gray-300">
            <ShoppingCart className="w-5 h-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyber-alert text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white focus:outline-none">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {mobileMenu && (
        <div className="md:hidden bg-cyber-dark border-b border-cyber-border absolute w-full top-full left-0 p-4 flex flex-col space-y-4">
          <Link to="/" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-cyber-neon block w-full">Home</Link>
          <a onClick={() => handleNavClick('problem')} className="text-gray-300 hover:text-cyber-neon block w-full cursor-pointer">The Problem</a>
          <a onClick={() => handleNavClick('solution')} className="text-gray-300 hover:text-cyber-neon block w-full cursor-pointer">Solution</a>
          <Link to="/purchase" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-cyber-neon block w-full">Buy Now</Link>
        </div>
      )}
    </nav>
  );
}
