import MovieCard from "./MovieCard.jsx";
import Button from "./Button.jsx";
import { useWindowSize } from "../hooks/useWindowSize.js";

export default function MovieList({
  peliculas,
  favoritas,
  onToggleFavorita,
  filtroTexto,
  onLimpiarFiltro,
}) {
  const anchoPantalla = useWindowSize();
  const columnas = anchoPantalla >= 1200 ? 3 : anchoPantalla >= 768 ? 2 : 1;

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
    <section id="cartelera">
      <div className="catalog-header">
        <h2>Cartelera Disponible</h2>
        <span className="cols-badge">Vista: {columnas} {columnas === 1 ? "columna" : "columnas"} ({anchoPantalla}px)</span>
      </div>
      <div
        className="movie-grid"
        style={{ gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))` }}
      >
        {peliculasFiltradas.map((pelicula) => (
          <MovieCard
            key={pelicula.id}
            pelicula={pelicula}
            esFavorita={favoritas.includes(pelicula.id)}
            onToggleFavorita={onToggleFavorita}
          />
        ))}
      </div>
    </section>
  );
}
