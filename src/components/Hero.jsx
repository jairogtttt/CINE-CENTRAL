import MovieSearch from "./MovieSearch.jsx";

const BANNER_PANORAMICO = "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg";

export default function Hero({ pelicula, filtroTexto, onBuscar, onLimpiarFiltro }) {
  if (!pelicula) return null;
  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `linear-gradient(105deg, rgba(7, 10, 18, 0.97) 38%, rgba(11, 15, 25, 0.72) 68%, rgba(7, 10, 18, 0.92) 100%), url(${BANNER_PANORAMICO})`,
      }}
    >
      <div className="hero-glow"></div>
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badges">
            <span className="featured-badge">🔥 Estreno Destacado</span>
            <span className="format-badge">IMAX • 4DX • DOLBY ATMOS</span>
          </div>
          <h2>{pelicula.titulo}</h2>
          <div className="hero-meta">
            <span className="rating">⭐ {pelicula.valoracion} / 5</span>
            <span>•</span>
            <span className="meta-pill">{pelicula.clasificacion}</span>
            <span>•</span>
            <span>2h 46m • Ciencia Ficción / Épica</span>
          </div>
          <p className="hero-sinopsis">{pelicula.sinopsis}</p>
          <MovieSearch
            valorActual={filtroTexto}
            onBuscar={onBuscar}
            onLimpiar={onLimpiarFiltro}
          />
        </div>

        <div className="hero-poster-box">
          <img
            src={pelicula.imagen}
            alt={pelicula.titulo}
            className="hero-poster-3d"
          />
        </div>
      </div>
    </section>
  );
}
