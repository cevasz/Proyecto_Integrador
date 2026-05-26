import { useEffect, useRef, useState } from 'react';
import './InteractiveBackground.css';

export default function InteractiveBackground() {
  const [shapes, setShapes] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const containerRef = useRef(null);
  const shapeIdRef = useRef(0);
  const explosionIdRef = useRef(0);

  // Crear nuevas figuras periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (shapes.length < 15) { // Máximo 15 figuras a la vez
        createShape();
      }
    }, 2000); // Cada 2 segundos

    return () => clearInterval(interval);
  }, [shapes.length]);

  // Limpiar figuras que salen de la pantalla
  useEffect(() => {
    const cleanup = setInterval(() => {
      setShapes((prev) =>
        prev.filter((shape) => {
          const element = document.getElementById(`shape-${shape.id}`);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight + 100 && rect.bottom > -100;
        })
      );
    }, 3000);

    return () => clearInterval(cleanup);
  }, []);

  // Limpiar explosiones después de la animación
  useEffect(() => {
    explosions.forEach((explosion) => {
      setTimeout(() => {
        setExplosions((prev) => prev.filter((e) => e.id !== explosion.id));
      }, 1000);
    });
  }, [explosions]);

  function createShape() {
    const types = ['circle', 'square', 'triangle', 'star', 'heart'];
    const colors = [
      '#7a1a72', // plum
      '#c4268c', // magenta
      '#f26f4f', // coral
      '#11a9df', // cyan
      '#2bc4a2', // mint
    ];

    const newShape = {
      id: shapeIdRef.current++,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 90 + 5, // 5% a 95%
      size: Math.random() * 30 + 30, // 30px a 60px
      duration: Math.random() * 10 + 15, // 15s a 25s
      delay: Math.random() * 2, // 0s a 2s
      rotation: Math.random() * 360,
    };

    setShapes((prev) => [...prev, newShape]);
  }

  function handleShapeClick(shape, event) {
    event.stopPropagation();
    
    // Crear explosión
    const rect = event.currentTarget.getBoundingClientRect();
    const explosion = {
      id: explosionIdRef.current++,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      color: shape.color,
    };

    setExplosions((prev) => [...prev, explosion]);

    // Eliminar la figura
    setShapes((prev) => prev.filter((s) => s.id !== shape.id));
  }

  function renderShape(shape) {
    const style = {
      left: `${shape.left}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      backgroundColor: shape.color,
      animationDuration: `${shape.duration}s`,
      animationDelay: `${shape.delay}s`,
      transform: `rotate(${shape.rotation}deg)`,
    };

    const shapeClass = `floating-shape shape-${shape.type}`;

    return (
      <div
        key={shape.id}
        id={`shape-${shape.id}`}
        className={shapeClass}
        style={style}
        onClick={(e) => handleShapeClick(shape, e)}
        role="button"
        tabIndex={-1}
        aria-label="Figura interactiva"
      />
    );
  }

  function renderExplosion(explosion) {
    const style = {
      left: `${explosion.x}px`,
      top: `${explosion.y}px`,
    };

    return (
      <div
        key={explosion.id}
        className="explosion"
        style={style}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="explosion-particle"
            style={{
              backgroundColor: explosion.color,
              transform: `rotate(${i * 30}deg) translateY(-50px)`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="interactive-background">
      {shapes.map(renderShape)}
      {explosions.map(renderExplosion)}
    </div>
  );
}
