import { animate, AnimatePresence, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import barcaVideo from './assets/barca-video.mp4';
import FotoChampions from './assets/champions.jpg';
import FotoCopa from './assets/copa.jpg';
import FotoLiga from './assets/liga.jpg';
import Navbar from './components/Navbar';
import Jugadores from './Jugadores';

// --- Componente 1: Animación de revelado al hacer scroll ---
const ScrollReveal = ({ children, delay = 0, y = 50 }) => (
  <motion.div
    initial={{ opacity: 0, y: y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
    transition={{ duration: 0.9, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
);

// --- Componente 2: Contador Animado para los trofeos ---
const Counter = ({ to, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        animate(count, to, { duration: 2, ease: "easeOut" });
      }, delay * 1000);
    }
  }, [isInView, to, count, delay]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- Componente de la Página de Inicio ---
const Inicio = () => {
  const [fraseIndex, setFraseIndex] = useState(0);
  const frases = [
    "Més que un club.",
    "El talento es innegociable.",
    "Un legado eterno."
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      {/* 1. SECCIÓN INICIO (HERO) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        
        <ScrollReveal y={30}>
          <h2 className="text-[#FDE694] text-sm md:text-xl tracking-[0.4em] uppercase mb-4 font-medium drop-shadow-lg">
            Desde 1899
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2} y={50}>
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
            <span className="relative z-10">FC Barcelona</span>
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-clip-text text-transparent blur-sm z-0"
            >
              FC Barcelona
            </motion.span>
          </h1>
        </ScrollReveal>

        <div className="h-10 relative flex justify-center items-center overflow-visible">
          <AnimatePresence mode="wait">
            <motion.p
              key={fraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute text-xl md:text-3xl font-light italic tracking-widest text-gray-200 drop-shadow-xl whitespace-nowrap"
            >
              {frases[fraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-light">Descubre</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-white"
            />
          </div>
        </motion.div>

      </section>

      {/* 2. SECCIÓN FILOSOFÍA */}
      <section className="min-h-screen flex items-center px-6 md:px-24 max-w-7xl mx-auto w-full">
        <div className="w-full md:w-2/3 text-left">
          <ScrollReveal>
            <span className="text-[#FDE694] font-bold tracking-widest uppercase mb-4 block text-lg">01 / Filosofía</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              El Balón <br /> Es Nuestro.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-200 drop-shadow-md">
              No se trata solo de ganar, se trata del <em>cómo</em>. Creemos en el talento, en la posesión y en el fútbol ofensivo como bandera. Un estilo de juego innegociable que ha cautivado al mundo entero.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SECCIÓN LA MASIA */}
      <section className="min-h-screen flex items-center justify-end px-6 md:px-24 max-w-7xl mx-auto w-full pb-24">
        <div className="w-full md:w-2/3 text-right">
          <ScrollReveal>
            <span className="text-[#FDE694] font-bold tracking-widest uppercase mb-4 block text-lg">02 / La Masia</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              Donde Nacen <br /> Las Leyendas.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-200 drop-shadow-md">
              Más que una academia, es una escuela de vida. Aquí forjamos a los mejores jugadores del mundo bajo los valores del respeto, el esfuerzo, la ambición y la humildad.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. SECCIÓN LEGADO (TARJETA BLANCA SUPERPUESTA) */}
      <section className="relative z-20 bg-white text-black rounded-t-[50px] md:rounded-t-[80px] w-full min-h-screen py-24 px-6 md:px-24 shadow-[0_-20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center">
        
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#A50044] font-bold tracking-[0.3em] uppercase mb-4 block text-sm md:text-lg">03 / Legado Eterno</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-[#004D98]">
              Vitrina de Campeones
            </h2>
          </div>
        </ScrollReveal>

        {/* Grid de Trofeos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-7xl w-full">
          
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-48 h-64 md:w-64 md:h-80 bg-gray-50 rounded-[40px] mb-8 flex items-center justify-center overflow-hidden shadow-xl border border-gray-100 transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                 <img src={FotoChampions} alt="Champions League" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              </div>
              <span className="text-7xl md:text-8xl font-black text-[#A50044] mb-2 drop-shadow-sm">
                <Counter to={5} delay={0.2} />
              </span>
              <span className="text-2xl font-bold tracking-wider text-[#004D98] uppercase">Champions</span>
              <p className="mt-4 text-gray-500 font-light leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-gray-800">Los reyes de Europa. Reinando con magia en escenarios míticos como París, Roma, Londres y Berlín.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-48 h-64 md:w-64 md:h-80 bg-gray-50 rounded-[40px] mb-8 flex items-center justify-center overflow-hidden shadow-xl border border-gray-100 transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                 <img src={FotoLiga} alt="La Liga" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              </div>
              <span className="text-7xl md:text-8xl font-black text-[#A50044] mb-2 drop-shadow-sm">
                <Counter to={27} delay={0.4} />
              </span>
              <span className="text-2xl font-bold tracking-wider text-[#004D98] uppercase">Ligas</span>
              <p className="mt-4 text-gray-500 font-light leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-gray-800">Dominio doméstico indiscutible. Demostrando la constancia y el ADN culé semana tras semana.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-48 h-64 md:w-64 md:h-80 bg-gray-50 rounded-[40px] mb-8 flex items-center justify-center overflow-hidden shadow-xl border border-gray-100 transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                 <img src={FotoCopa} alt="Copa del Rey" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              </div>
              <span className="text-7xl md:text-8xl font-black text-[#A50044] mb-2 drop-shadow-sm">
                <Counter to={31} delay={0.6} />
              </span>
              <span className="text-2xl font-bold tracking-wider text-[#004D98] uppercase">Copas del Rey</span>
              <p className="mt-4 text-gray-500 font-light leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-gray-800">El auténtico Rey de Copas. Ningún otro club ha levantado este histórico trofeo en tantas ocasiones.</p>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
};

// --- COMPONENTE APP (ENRUTADOR Y ESTRUCTURA GLOBAL) ---
function App() {
  const location = useLocation();

  // Hace que la página vuelva arriba cada vez que navegas a otra sección
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative w-full text-white font-sans selection:bg-[#004D98] selection:text-white">
      
      {/* NAVBAR FLOTANTE GLOBAL */}
      <Navbar />
      
      {/* VIDEO DE FONDO GLOBAL (Solo visible en Inicio) */}
      {location.pathname === '/' && (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
          <video
            src={barcaVideo}
            className="w-full h-full object-cover saturate-150 contrast-110 opacity-80"
            playsInline
            muted
            autoPlay
            loop
          ></video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
        </div>
      )}

      {/* DEFINICIÓN DE RUTAS (PÁGINAS) */}
      <div className="relative z-10 w-full flex flex-col overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/jugadores" element={<Jugadores />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;