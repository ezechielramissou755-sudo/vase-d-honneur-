import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', page: 'Home' },
    { name: 'Événements', page: 'Evenements' },
    { name: 'Messages', page: 'Messages' },
    { name: 'Galerie', page: 'Galerie' },
    { name: 'Contact', page: 'Contact' },
    { name: 'Offrande', page: 'Don' },
    { name: 'Admin', page: 'Admin' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blue-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-4">
            <img 
              src="/vase d'honneur.png"
              alt="Vase d'Honneur"
              className="h-16 w-auto drop-shadow-lg object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={createPageUrl(link.page)}
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-900/95 backdrop-blur-md rounded-lg mt-2 p-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={createPageUrl(link.page)}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
