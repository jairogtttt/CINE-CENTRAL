import { useState, useEffect, useCallback } from "react";

const ESTRENOS_MOCK = [
  {
    id: 101,
    titulo: "Avatar: Fuego y Ceniza",
    fechaEstreno: "19 Dic 2026",
    genero: "Ciencia Ficción / Aventura",
    imagen: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
  },
  {
    id: 102,
    titulo: "Gladiator II: El Imperio",
    fechaEstreno: "15 Ene 2027",
    genero: "Acción / Drama Histórico",
    imagen: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
  },
  {
    id: 103,
    titulo: "Mufasa: El Rey León",
    fechaEstreno: "04 Mar 2027",
    genero: "Animación / Familiar",
    imagen: "https://image.tmdb.org/t/p/w500/jbOSUAWMGzGL1L4EaUF8K6zYFo7.jpg",
  },
];

export function usePremieres() {
  const [estrenos, setEstrenos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarEstrenos = useCallback((forzarError = false) => {
    setCargando(true);
    setError(null);

    const timer = setTimeout(() => {
      if (forzarError) {
        setError("No se pudo conectar con el servidor de estrenos.");
        setEstrenos([]);
      } else {
        setEstrenos(ESTRENOS_MOCK);
      }
      setCargando(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const limpiar = cargarEstrenos(false);
    return limpiar;
  }, [cargarEstrenos]);

  return { estrenos, cargando, error, recargar: cargarEstrenos };
}
