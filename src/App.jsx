import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MovieList from "./components/MovieList.jsx";
import Footer from "./components/Footer.jsx";
import { peliculasData } from "./data/peliculas.js";

export default function App() {
  const destacada = peliculasData[0];

  return (
    <div>
      <Header />
      <Hero pelicula={destacada} />
      <MovieList peliculas={peliculasData} />
      <Footer />
    </div>
  );
}
