import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ExamList from "./components/ExamList.jsx";
import ExamForm from "./components/ExamForm.jsx";
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
  const [vistaApi, setVistaApi] = useState("listado");
  const [refrescarApi, setRefrescarApi] = useState(0);

  useEffect(() => {
    localStorage.setItem("cine_favoritas", JSON.stringify(favoritas));
  }, [favoritas]);

  const mostrarAviso = (mensaje) => {
    setAvisoToast(mensaje);
    setTimeout(() => setAvisoToast(""), 3000);
  };

  const toggleFavorita = (id) => {
    const pelicula = peliculasAdaptadas.find((p) => p.id === id);
    const nombre = pelicula ? pelicula.titulo : "Película";
    setFavoritas((prev) => {
      if (prev.includes(id)) {
        mostrarAviso(`💔 Quitada de favoritas: ${nombre}`);
        return prev.filter((favId) => favId !== id);
      } else {
        mostrarAviso(`❤️ Agregada a favoritas: ${nombre}`);
        return [...prev, id];
      }
    });
  };

  return (
    <div>
      <Header totalFavoritas={favoritas.length} />

      <Hero
        pelicula={peliculasAdaptadas[0]}
        filtroTexto={filtroTexto}
        onBuscar={setFiltroTexto}
        onLimpiarFiltro={() => setFiltroTexto("")}
      />

      {/* Módulo de Servicios Web con Axios y Django REST Framework */}
      {vistaApi === "listado" ? (
        <ExamList
          refrescarTrigger={refrescarApi}
          onIrCrear={() => setVistaApi("formulario")}
          onNotificar={mostrarAviso}
        />
      ) : (
        <ExamForm
          onCancelar={() => setVistaApi("listado")}
          onGuardadoExitoso={(msg) => {
            mostrarAviso(msg);
            setRefrescarApi((n) => n + 1);
            setVistaApi("listado");
          }}
        />
      )}

      <PremieresCarousel />

      <MovieList
        peliculas={peliculasAdaptadas}
        favoritas={favoritas}
        onToggleFavorita={toggleFavorita}
        filtroTexto={filtroTexto}
        onLimpiarFiltro={() => setFiltroTexto("")}
      />

      <Footer />
      <Toast mensaje={avisoToast} />
    </div>
  );
}
