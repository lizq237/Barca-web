import { motion } from 'framer-motion';

const Jugadores = () => {
  return (
    // Se agregó 'bg-[#001A36]' para el fondo azul oscuro, y 'pt-32' para bajar el contenido
    <section className="min-h-screen bg-[#001A36] flex items-center px-6 md:px-24 w-full pt-32 pb-20">
      
      <div className="max-w-7xl mx-auto w-full md:w-2/3 text-left">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[#FDE694] font-bold tracking-widest uppercase mb-4 block text-lg">
            01 / Plantilla
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-8 drop-shadow-xl text-white">
            Nuestros <br /> Jugadores.
          </h2>
          <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-200">
            Aquí puedes poner las fotos en cuadrícula de tus jugadores favoritos o el diseño que tengas en mente.
          </p>
        </motion.div>
      </div>

    </section>
  );
};

export default Jugadores;