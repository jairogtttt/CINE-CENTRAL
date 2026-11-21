import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import PremieresCarousel from "./components/PremieresCarousel.jsx";
import MovieList from "./components/MovieList.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import { peliculasData } from "./data/peliculas.js";
import { adaptarListaPeliculas } from "./utils/movieAdapter.js";

export default function App() {
  const peliculasAdaptadas = useMemo(() => adaptarListaPeliculas(peliculasData), []);

  const [favoritas, setFavoritas] = useState(() => {
    const guardadas = localStorage.getItem("cine_favoritas");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [filtroTexto, setFiltroTexto] = useState("");
  const [avisoToast, setAvisoToast] = useState("");

  useEffect(() => {
    localStorage.setItem("cine_favoritas", JSON.stringify(favoritas));
  }, [favoritas]);

  const mostrarAviso = (mensaje) => {
    setAvisoToast(mensaje);
    setTimeout(() => {
      setAvisoToast("");
    }, 2500);
  };

  const toggleFavorita = (id) => {
    const pelicula = peliculasAdaptadas.find((p) => p.id === id);
    const nombre = pelicula ? pelicula.titulo : "Película";

    setFavoritas((prev) => {
      const yaEsFavorita = prev.includes(id);
      if (yaEsFavorita) {
        mostrarAviso(`💔 Quitada de favoritas: ${nombre}`);
        return prev.filter((favId) => favId !== id);
      } else {
        mostrarAviso(`❤️ Agregada a favoritas: ${nombre}`);
        return [...prev, id];
      }
    });
  };

  const destacada = peliculasAdaptadas[0];

  return (
    <div>
      {/* Paso 9: Header recibe solo el conteo calculado, no el arreglo completo */}
      <Header totalFavoritas={favoritas.length} />

      {/* Paso 10: Banner recibe filtroTexto y onLimpiarFiltro sincronizados */}
      <Hero
        pelicula={destacada}
        filtroTexto={filtroTexto}
        onBuscar={setFiltroTexto}
        onLimpiarFiltro={() => setFiltroTexto("")}
      />

      {/* Paso 8: Sección de estrenos con usePremieres y esqueleto */}
      <PremieresCarousel />

      <MovieList
        peliculas={peliculasAdaptadas}
        favoritas={favoritas}
        onToggleFavorita={toggleFavorita}
        filtroTexto={filtroTexto}
        onLimpiarFiltro={() => setFiltroTexto("")}
      />

      <Footer />

      {/* Paso 4: Aviso emergente controlado desde la raíz */}
      <Toast mensaje={avisoToast} />
    </div>
  );
}
