import MovieSearch from "./MovieSearch.jsx";

export default function Hero({ pelicula, onBuscar }) {
  if (!pelicula) return null;
  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.6)), url(${pelicula.imagen})`,
      }}
    >
      <div className="hero-content">
        <span className="featured-badge">Pelicula Destacada</span>
        <h2>{pelicula.titulo}</h2>
        <p>{pelicula.sinopsis}</p>
        <p className="rating">⭐ {pelicula.valoracion} / 5</p>
        <MovieSearch onBuscar={onBuscar} />
      </div>
    </section>
  );
}
