import { useState } from "react";
import Button from "./Button.jsx";

const IMAGEN_RESPALDO = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80";

export default function MovieCard({ pelicula, esFavorita, onToggleFavorita }) {
  const [rotacion, setRotacion] = useState({ x: 0, y: 0 });

  const manejarMovimiento = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centroX = rect.width / 2;
    const centroY = rect.height / 2;
    const rotarX = ((y - centroY) / centroY) * -7;
    const rotarY = ((x - centroX) / centroX) * 7;
    setRotacion({ x: rotarX, y: rotarY });
  };

  const reiniciarRotacion = () => {
    setRotacion({ x: 0, y: 0 });
  };

  return (
    <div
      className="movie-card"
      onMouseMove={manejarMovimiento}
      onMouseLeave={reiniciarRotacion}
      style={{
        transform: `perspective(1000px) rotateX(${rotacion.x}deg) rotateY(${rotacion.y}deg)`,
      }}
    >
      <div className="movie-img-wrapper">
        <img
          src={pelicula.imagen}
          alt={pelicula.titulo}
          className="movie-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = IMAGEN_RESPALDO;
          }}
        />
      </div>
      <div className="movie-info">
        <span className="badge">{pelicula.clasificacion}</span>
        <h3>{pelicula.titulo}</h3>
        <p className="rating">⭐ {pelicula.valoracion}</p>
        <p className="sinopsis">{pelicula.sinopsis}</p>
        <div className="horarios">
          <strong>Horarios:</strong>
          <div className="tags">
            {pelicula.horarios.map((h, i) => (
              <span key={i} className="time">{h}</span>
            ))}
          </div>
        </div>
        <Button
          variante={esFavorita ? "fav-active" : "outline"}
          onClick={() => onToggleFavorita(pelicula.id)}
        >
          {esFavorita ? "★ En Favoritas" : "☆ Agregar a Favoritas"}
        </Button>
      </div>
    </div>
  );
}
