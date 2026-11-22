import { useState } from "react";
import { crearExamen } from "../services/api.js";
import Button from "./Button.jsx";

export default function ExamForm({ onGuardadoExitoso, onCancelar }) {
  const [titulo, setTitulo] = useState("");
  const [curso, setCurso] = useState("");
  const [fecha, setFecha] = useState("");
  const [puntaje, setPuntaje] = useState(20);
  const [enviando, setEnviando] = useState(false);
  const [erroresApi, setErroresApi] = useState(null);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErroresApi(null);

    try {
      await crearExamen({
        titulo,
        curso,
        fecha: fecha || null,
        puntaje: Number(puntaje),
      });
      onGuardadoExitoso(`✅ Registro "${titulo}" guardado en Django`);
    } catch (err) {
      if (err.response && err.response.data) {
        setErroresApi(err.response.data);
      } else {
        setErroresApi({ general: ["Error de red: no se pudo contactar con el servidor."] });
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="api-section">
      <div className="form-card">
        <div className="section-header">
          <h2>Registrar Nueva Evaluación</h2>
          <Button variante="secondary" onClick={onCancelar}>
            ← Volver al listado
          </Button>
        </div>

        {erroresApi && (
          <div className="validation-box">
            <strong>⚠️ La API rechazó el envío por validación:</strong>
            <ul>
              {Object.entries(erroresApi).map(([campo, mensajes]) => (
                <li key={campo}>
                  <strong>{campo}:</strong> {Array.isArray(mensajes) ? mensajes.join(", ") : String(mensajes)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={manejarSubmit} className="api-form">
          <div className="form-group">
            <label>Título de la evaluación (obligatorio):</label>
            <input
              type="text"
              className="search-input"
              placeholder="Ej. Práctica Calificada 3"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Curso (obligatorio):</label>
            <input
              type="text"
              className="search-input"
              placeholder="Ej. Desarrollo de Aplicaciones Empresariales"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha (obligatorio):</label>
              <input
                type="date"
                className="search-input"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Puntaje máximo:</label>
              <input
                type="number"
                className="search-input"
                value={puntaje}
                onChange={(e) => setPuntaje(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button type="submit" variante="primary">
              {enviando ? "Guardando..." : "Guardar en API"}
            </Button>
            <Button type="button" variante="secondary" onClick={onCancelar}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
