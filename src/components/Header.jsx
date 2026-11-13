export default function Header() {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="icon">🎬</span>
        <h1>CineCentral</h1>
      </div>
      <nav>
        <a href="#cartelera">Cartelera</a>
        <a href="#promociones">Promociones</a>
      </nav>
    </header>
  );
}
