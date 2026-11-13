import { useState, useEffect } from "react";
import Button from "./Button.jsx";

export default function MovieSearch({ onBuscar }) {
  // Paso 6: Entrada controlada en el estado local
  const [texto, setTexto] = useState("");

  // Paso 7: Retardo (debounce) de 400ms antes de ejecutar el filtrado
  useEffect(() => {
    const temporizador = setTimeout(() => {
      console.log("Ejecutando filtrado con retardo para:", texto);
      onBuscar(texto);
    }, 400);

    return () => clearTimeout(temporizador);
  }, [texto, onBuscar]);

  const manejarSubmit = (e) => {
    e.preventDefault();
    onBuscar(texto);
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
    </form>
  );
}
