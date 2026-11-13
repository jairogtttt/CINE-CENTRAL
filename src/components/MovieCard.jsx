import Button from "./Button.jsx";

export default function MovieCard({ pelicula, esFavorita, onToggleFavorita }) {
  return (
    <div className="movie-card">
      <img src={pelicula.imagen} alt={pelicula.titulo} className="movie-img" />
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
