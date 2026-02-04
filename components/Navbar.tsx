
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onBuyClick?: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onBuyClick, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Basic Scroll-Spy logic
      const sections = ['ventajas', 'produccion', 'historia', 'exportaciones', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ventajas', href: '#ventajas', id: 'ventajas' },
    { name: 'Producción', href: '#produccion', id: 'produccion' },
    { name: 'Historia', href: '#historia', id: 'historia' },
    { name: 'Exportaciones', href: '#exportaciones', id: 'exportaciones' },
    { name: 'Contacto', href: '#contacto', id: 'contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
      // Close mobile menu if it was open (not implemented here, but good practice)
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-olive-dark rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg">
             <span className="text-gold font-serif text-2xl font-bold">O</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-serif font-bold leading-none ${isScrolled ? 'text-olive-dark' : 'text-white'}`}>
              Oro Líquido
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">España</span>
          </div>
        </div>
        
        <div className="hidden lg:flex space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-bold uppercase tracking-wider transition-all relative group ${
                isScrolled ? 'text-stone-700' : 'text-white'
              } ${activeSection === link.id ? 'text-gold' : ''}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onBuyClick}
            className="relative bg-gold hover:bg-yellow-600 text-stone-900 px-6 py-2.5 rounded-full text-sm font-black transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 group"
          >
            <span className="hidden sm:inline">Tienda Gourmet</span>
            <span className="sm:hidden">Tienda</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-olive-dark text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
            <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
