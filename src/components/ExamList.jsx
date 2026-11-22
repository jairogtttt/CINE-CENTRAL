import { useState, useEffect, useCallback } from "react";
import { listarExamenes, eliminarExamen } from "../services/api.js";
import Button from "./Button.jsx";

export default function ExamList({ refrescarTrigger, onIrCrear, onNotificar }) {
  const [examenes, setExamenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const lista = await listarExamenes();
      setExamenes(lista);
    } catch (err) {
      setError("No se pudo conectar con el servidor de Django (localhost:8000). Verifica que esté encendido y con CORS habilitado.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let cancelado = false;
    const iniciar = async () => {
      setCargando(true);
      setError(null);
      try {
        const lista = await listarExamenes();
        if (!cancelado) setExamenes(lista);
      } catch (err) {
        if (!cancelado) {
          setError("Error al obtener los registros desde la API de Django.");
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    };
    iniciar();
    return () => {
      cancelado = true;
    };
  }, [refrescarTrigger]);

  const manejarEliminar = async (id, titulo) => {
    try {
      await eliminarExamen(id);
      if (onNotificar) onNotificar(`🗑️ Registro eliminado: ${titulo}`);
      await cargarDatos();
    } catch (err) {
      setError("No se pudo eliminar el registro en el servidor.");
    }
  };

  return (
    <section className="api-section">
      <div className="section-header">
        <h2>Evaluaciones y Servicios Web (API Django)</h2>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button variante="secondary" onClick={cargarDatos}>
            ↻ Recargar Lista
          </Button>
          <Button variante="primary" onClick={onIrCrear}>
            + Nuevo Registro
          </Button>
        </div>
      </div>

      {/* Estado 1: Cargando (Esqueleto) */}
      {cargando && (
        <div className="table-skeleton">
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
          <div className="skeleton-row"></div>
        </div>
      )}

      {/* Estado 2: Error con botón de reintento */}
      {!cargando && error && (
        <div className="error-box">
          <span>❌ {error}</span>
          <Button variante="primary" onClick={cargarDatos}>
            Reintentar conexión
          </Button>
        </div>
      )}

      {/* Estado 3: Tabla con los datos */}
      {!cargando && !error && (
        <div className="table-wrapper">
          <table className="api-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Curso</th>
                <th>Fecha</th>
                <th>Puntaje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {examenes.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                    No hay registros en la base de datos. Crea el primero con "+ Nuevo Registro".
                  </td>
                </tr>
              ) : (
                examenes.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td><strong>{item.titulo}</strong></td>
                    <td>{item.curso}</td>
                    <td>{item.fecha}</td>
                    <td><span className="badge">{item.puntaje} pts</span></td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => manejarEliminar(item.id, item.titulo)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
