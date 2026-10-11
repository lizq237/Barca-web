import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation(); // Hook para saber en qué página estamos

  // Ahora las tabs usan 'path' (rutas) en lugar de 'id'
  const tabs = [
    { name: 'Inicio', path: '/' },
    { name: 'Jugadores', path: '/jugadores' },
    { name: 'Estadísticas', path: '/estadisticas' }, // Para cuando la crees
    { name: 'Partidos', path: '/partidos' }          // Para cuando la crees
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}>
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#002B5C]/20 backdrop-blur-md border border-white/10 shadow-2xl">
        
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ease-out
              ${location.pathname === tab.path 
                ? 'text-white shadow-lg' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {location.pathname === tab.path && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#004D98]/80 to-[#A50044]/80 rounded-full -z-10"></div>
            )}
            <span className="relative z-10">{tab.name}</span>
          </Link>
        ))}
        
      </div>
    </nav>
  );
};

export default Navbar;