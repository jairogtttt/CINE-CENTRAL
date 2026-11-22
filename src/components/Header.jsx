export default function Header({ totalFavoritas }) {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="icon">🎬</span>
        <h1>CineCentral</h1>
      </div>
      <nav>
        <a href="#cartelera">Cartelera</a>
        <span className="fav-counter">❤️ Favoritas: {totalFavoritas}</span>
      </nav>
    </header>
  );
}
