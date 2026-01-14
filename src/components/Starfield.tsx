import React, { useState, useEffect, useMemo } from 'react';

const Starfield: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const { stars, nebulas } = useMemo(() => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    // Estrellas (Partículas de viaje)
    const starArray = Array.from({ length: 150 }, (_, i) => {
      const speedMult = rand(0.5, 2.5);
      return {
        id: i,
        x: rand(0, 100),
        y: rand(0, 100),
        size: rand(1, 2) * (speedMult > 1.5 ? 1.5 : 1),
        opacity: rand(0.4, 0.8),
        duration: rand(15, 25) / speedMult,
        delay: rand(-25, 0),
      };
    });

    // Nebulosas / Nubes grises
    const nebulaArray = Array.from({ length: 3 }, (_, i) => ({
      id: i + 500,
      x: rand(10, 80),
      size: rand(500, 800), // Un poco más grandes para que parezcan bruma
      duration: rand(50, 80),
      delay: rand(-80, 0),
      color: i === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
    }));

    return { stars: starArray, nebulas: nebulaArray };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ background: 'transparent' }}>
        
        {/* NEBULOSAS (Nubes de color en Dark / Nubes Grises en Light) */}
        {nebulas.map((neb) => (
          <div
            key={neb.id}
            className="absolute rounded-full animate-nebula-float nebula-element"
            style={{
              left: `${neb.x}%`,
              top: '-20%',
              width: `${neb.size}px`,
              height: `${neb.size}px`,
              animationDuration: `${neb.duration}s`,
              animationDelay: `${neb.delay}s`,
              // El color base se asigna aquí pero se sobreescribe en CSS para modo claro
              backgroundColor: `rgb(${neb.color})`, 
            }}
          />
        ))}

        {/* ESTRELLAS */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-star-travel star-element"
            style={{
              left: `${star.x}%`,
              top: '-5%',
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes star-travel {
          0% { transform: translateY(0vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }

        @keyframes nebula-float {
          0% { transform: translateY(0vh) scale(1); opacity: 0; }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { transform: translateY(120vh) scale(1.3); opacity: 0; }
        }

        .animate-star-travel {
          animation: star-travel linear infinite;
          will-change: transform;
        }

        .animate-nebula-float {
          animation: nebula-float linear infinite;
          will-change: transform;
        }

        /* --- MODO DARK (Espacio de Neon) --- */
        [data-theme="dark"] .nebula-element {
          mix-blend-mode: screen;
          filter: blur(120px);
          opacity: 0.12;
        }
        
        [data-theme="dark"] .star-element {
          background-color: rgb(var(--color-text-base));
          box-shadow: 0 0 5px rgb(var(--color-text-base));
        }

        /* --- MODO LIGHT (Nubes Grises / Bruma) --- */
        [data-theme="light"] .nebula-element {
          /* Sobreescribimos el color a un gris suave */
          background-color: #d1d5db !important; /* Gris suave (Gray 300) */
          filter: blur(140px); /* Desenfoque mayor para efecto nube gaseosa */
          opacity: 0.25; /* Un poco más opaca porque el gris es sutil */
          mix-blend-mode: normal;
        }

        [data-theme="light"] .star-element {
          background-color: rgb(var(--color-text-muted));
          box-shadow: none;
        }
      `}</style>
    </>
  );
};

export default Starfield;