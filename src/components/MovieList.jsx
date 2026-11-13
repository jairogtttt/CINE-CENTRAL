import MovieCard from "./MovieCard.jsx";

export default function MovieList({ peliculas }) {
  return (
    <div id="cartelera" className="movie-grid">
      {peliculas.map((pelicula) => (
        <MovieCard key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
}
