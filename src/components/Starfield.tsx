import React from 'react';

const Starfield: React.FC = () => {
  const stars = Array.from({ length: 100 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star}
          className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;