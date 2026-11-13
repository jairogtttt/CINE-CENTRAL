import MovieCard from "./MovieCard.jsx";
import Button from "./Button.jsx";

export default function MovieList({
  peliculas,
  favoritas,
  onToggleFavorita,
  filtroTexto,
  onLimpiarFiltro,
}) {
  const peliculasFiltradas = peliculas.filter(
    (p) =>
      p.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      p.sinopsis.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  if (peliculasFiltradas.length === 0) {
    return (
      <div id="cartelera" className="empty-state">
        <h3>No se encontraron películas para "{filtroTexto}"</h3>
        <p>Intenta buscar con otro título o palabra clave diferente.</p>
        <Button variante="primary" onClick={onLimpiarFiltro}>
          Mostrar toda la cartelera
        </Button>
      </div>
    );
  }

  return (
    <div id="cartelera" className="movie-grid">
      {peliculasFiltradas.map((pelicula) => (
        <MovieCard
          key={pelicula.id}
          pelicula={pelicula}
          esFavorita={favoritas.includes(pelicula.id)}
          onToggleFavorita={onToggleFavorita}
        />
      ))}
    </div>
  );
}
