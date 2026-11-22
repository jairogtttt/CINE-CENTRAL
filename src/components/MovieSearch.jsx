import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import { useDebounce } from "../hooks/useDebounce.js";

export default function MovieSearch({ valorActual, onBuscar, onLimpiar }) {
  const [texto, setTexto] = useState(valorActual || "");
  const textoDebounced = useDebounce(texto, 400);

  // Sincronizar si el filtro se limpia desde afuera (ej. botón en MovieList o Banner)
  useEffect(() => {
    setTexto(valorActual);
  }, [valorActual]);

  // Notificar al padre cuando vence el debounce
  useEffect(() => {
    onBuscar(textoDebounced);
  }, [textoDebounced, onBuscar]);

  const manejarSubmit = (e) => {
    e.preventDefault();
    onBuscar(texto);
  };

  const manejarLimpiar = () => {
    setTexto("");
    onLimpiar();
  };

  return (
    <form className="search-box" onSubmit={manejarSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar película por título o sinopsis..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <Button type="submit" variante="primary">
        🔍 Buscar
      </Button>
      {texto.length > 0 && (
        <Button type="button" variante="secondary" onClick={manejarLimpiar}>
          ✕ Limpiar
        </Button>
      )}
    </form>
  );
}
