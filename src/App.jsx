import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MovieList from "./components/MovieList.jsx";
import Footer from "./components/Footer.jsx";
import { peliculasData } from "./data/peliculas.js";

export default function App() {
  // Paso 10: Recuperar favoritas desde localStorage al iniciar
  const [favoritas, setFavoritas] = useState(() => {
    const guardadas = localStorage.getItem("cine_favoritas");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  // Estado del texto filtrado que baja hacia MovieList
  const [filtroTexto, setFiltroTexto] = useState("");

  // Paso 10: Guardar en localStorage cada vez que cambian las favoritas
  useEffect(() => {
    localStorage.setItem("cine_favoritas", JSON.stringify(favoritas));
  }, [favoritas]);

  // Paso 4: Función para agregar o quitar una película de favoritas
  const toggleFavorita = (id) => {
    setFavoritas((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const destacada = peliculasData[0];

  return (
    <div>
      <Header totalFavoritas={favoritas.length} />
      <Hero pelicula={destacada} onBuscar={setFiltroTexto} />
      <MovieList
        peliculas={peliculasData}
        favoritas={favoritas}
        onToggleFavorita={toggleFavorita}
        filtroTexto={filtroTexto}
        onLimpiarFiltro={() => setFiltroTexto("")}
      />
      <Footer />
    </div>
  );
}
